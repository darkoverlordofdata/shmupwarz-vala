[indent=4]

namespace Bosco.ECS

    delegate OnComponentReplaced(e : Entity, index : int, component : IComponent, replacement : IComponent)

    class ComponentReplaced : DarkMatter

        _listeners : array of Listener = new array of Listener[0]

        class Listener : DarkMatter
            prop event : unowned OnComponentReplaced
            construct(event : OnComponentReplaced)
                _event = event

        def add(event : OnComponentReplaced)
            _listeners += new Listener(event)

        def remove(event : OnComponentReplaced)
            for var i=0 to (_listeners.length-1)
                if _listeners[i].event == event
                    _listeners[i] = _listeners[_listeners.length-1]
                    _listeners[_listeners.length-1] = null
                    _listeners.length -= 1
                    return

        def clear()
            _listeners = new array of Listener[0] //new list of Listener

        def dispatch(e : Entity, index : int, component : IComponent, replacement : IComponent)
            for var listener in _listeners
                listener.event(e, index, component, replacement)
