[indent=4]

namespace Bosco.ECS

    delegate OnWorldChanged(w : World, e : Entity)

    class WorldChanged : DarkMatter

        class Listener : DarkMatter
            prop event : unowned OnWorldChanged
            construct(event : OnWorldChanged)
                _event = event

        _listeners : array of Listener = new array of Listener[0]

        def add(event : OnWorldChanged)
            _listeners += new Listener(event)

        def remove(event : OnWorldChanged)
            for var i=0 to (_listeners.length-1)
                if _listeners[i].event == event
                    _listeners[i] = _listeners[_listeners.length-1]
                    _listeners[_listeners.length-1] = null
                    _listeners.length -= 1
                    return

        def clear()
            _listeners = new array of Listener[0] //new list of Listener

        def dispatch(w : World, e : Entity)
            for var listener in _listeners
                listener.event(w, e)
