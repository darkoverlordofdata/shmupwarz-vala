[indent=4]
uses
    SDL
    Bosco
    Bosco.ECS

class PlayerInputSystem : DarkMatter implements ISystem, ISetWorld, IInitializeSystem, IExecuteSystem
    _group : Group
    _world : World
    _game : Game
    _mouseDown : bool
    _mouseDefined : bool = false
    _timeToFire : double = 0
    _fire : bool
    FireRate : static double = 0.1

    construct(game : Game)
        _game = game

    /**
     * Respond to mouse events
     */
    def onMouseEvent(e : EventType, x : int, y : int)
        _mouseDefined = true
        case e
            when EventType.MOUSEMOTION
                if _mouseDown == true
                    moveTo(x, y)

            when EventType.MOUSEBUTTONDOWN
                moveTo(x, y)
                _mouseDown = true

            when EventType.MOUSEBUTTONUP
                _mouseDown = false

    def setWorld(world:World)
        _world = world

    def initialize()
        _group = _world.getGroup(Matcher.AllOf({Component.Player}))

    /**
     * Move the player
     */
    def moveTo(x : int, y : int)
        try
            var entity = _group.getSingleEntity()
            var pos = (PositionComponent)entity.getComponent(Component.Position)

            pos.x = x
            pos.y = y

        except e:Exception
            print e.message

    /**
     * Do the keyboard polling
     */
    def execute()
        try
            var entity = _group.getSingleEntity()
            var pos = (PositionComponent)entity.getComponent(Component.Position)
            if _game.currentKeyStates[Scancode.UP] == 1
                pos.y -= 1
            else if _game.currentKeyStates[Scancode.DOWN] == 1
                pos.y += 1
            else if _game.currentKeyStates[Scancode.LEFT] == 1
                pos.x -= 1
            else if _game.currentKeyStates[Scancode.RIGHT] == 1
                pos.x += 1

            if _mouseDefined
                if _mouseDown
                    if _timeToFire <= 0
                        createBullet(pos.x - 27, pos.y + 2)
                        createBullet(pos.x + 27, pos.y + 2)
                        _timeToFire = FireRate

            if _timeToFire > 0
                _timeToFire -= _game.delta
                if _timeToFire < 0
                    _timeToFire = 0


        except e:Exception
            print e.message
