[indent=4]

namespace Bosco.ECS

    delegate OnEntityChanged(e : Entity, index : int, component : IComponent)

    class EntityChanged : DarkMatter

        class Listener : DarkMatter
            prop event : unowned OnEntityChanged
            construct(event : OnEntityChanged)
                _event = event

        _listeners : array of Listener = new array of Listener[0]

        def add(event : OnEntityChanged)
            _listeners += new Listener(event)

        def remove(event : OnEntityChanged)
            for var i=0 to (_listeners.length-1)
                if _listeners[i].event == event
                    _listeners[i] = _listeners[_listeners.length-1]
                    _listeners[_listeners.length-1] = null
                    _listeners.length -= 1
                    return

        def clear()
            _listeners = new array of Listener[0]

        def dispatch(e : Entity, index : int, component : IComponent)
            for var listener in _listeners
                listener.event(e, index, component)
