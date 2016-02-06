[indent=4]
uses
    Bosco
    Bosco.ECS

class MovementSystem : DarkMatter implements ISystem, ISetWorld, IInitializeSystem, IExecuteSystem
    _world : World
    _group : Group
    _game : Game

    construct(game : Game)
        _game = game

    def setWorld(world : World)
        _world = world

    def initialize()
        _group = _world.getGroup(Matcher.AllOf({Component.Position, Component.Velocity}))

    def execute()
        for var entity in _group.getEntities()
            try
                var pos = (PositionComponent)entity.getComponent(Component.Position)
                var vel = (VelocityComponent)entity.getComponent(Component.Velocity)
                pos.x += (vel.x * _game.delta);
                pos.y += (vel.y * _game.delta);

            except e:Exception
                print e.message
