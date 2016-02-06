[indent=4]

namespace Utils
    class abstract Timer
        _delay : double
        _repeat : bool
        _acc : double
        _done : bool
        _stopped : bool

        construct(delay : double, repeat : bool=false)
            _delay = delay
            _repeat = repeat
            _acc = 0

        def update(delta : double)
            if !_done && !_stopped
                _acc += delta
                if _acc >= _delay
                    _acc -= _delay
                    if _repeat
                        reset()
                    else
                        _done = true
                    execute()

        def reset()
            _stopped = false
            _done = false
            _acc = 0

        def isDone() : bool
            return _done

        def isRunning() : bool
            return !_done && _acc < _delay && !_stopped

        def stop()
            _stopped = true

        def setDelay(delay : double)
            _delay = delay

        def abstract execute()

        def getPercentageRemaining() : double
            if _done
                return 100
            else if _stopped
                return 0
            else
                return 1 - (_delay - _acc) / _delay

        def getDelay() : double
            return _delay
