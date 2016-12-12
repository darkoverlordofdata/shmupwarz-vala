[indent=4]

namespace Bosco.ECS

    delegate OnGroupUpdated(g : Group, e : Entity, i : int, c : IComponent, u : IComponent)

    class GroupUpdated : DarkMatter

        class Listener : DarkMatter
            prop event : unowned OnGroupUpdated
            construct(event : OnGroupUpdated)
                _event = event

        _listeners : array of Listener = new array of Listener[0]

        def add(event : OnGroupUpdated)
            _listeners += new Listener(event)

        def remove(event : OnGroupUpdated)
            for var i=0 to (_listeners.length-1)
                if _listeners[i].event == event
                    _listeners[i] = _listeners[_listeners.length-1]
                    _listeners[_listeners.length-1] = null
                    _listeners.length -= 1
                    return

        def clear()
            _listeners = new array of Listener[0] //new list of Listener

        def dispatch(g : Group, e : Entity, i : int, c : IComponent, u : IComponent)
            for var listener in _listeners
                listener.event(g, e, i, c, u)
