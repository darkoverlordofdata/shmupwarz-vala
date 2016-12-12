[indent=4]

namespace Bosco.ECS

    delegate OnGroupChanged(g : Group, e : Entity, i : int, c : IComponent)

    class GroupChanged : DarkMatter

        class Listener : DarkMatter
            prop event : unowned OnGroupChanged
            construct(event : OnGroupChanged)
                _event = event

        _listeners : array of Listener = new array of Listener[0]

        def add(event : OnGroupChanged)
            _listeners += new Listener(event)

        def remove(event : OnGroupChanged)
            for var i=0 to (_listeners.length-1)
                if _listeners[i].event == event
                    _listeners[i] = _listeners[_listeners.length-1]
                    _listeners[_listeners.length-1] = null
                    _listeners.length -= 1
                    return

        def clear()
            _listeners = new array of Listener[0] //new list of Listener

        def dispatch(g : Group, e : Entity, i : int, c : IComponent)
            for var listener in _listeners
                listener.event(g, e, i, c)
