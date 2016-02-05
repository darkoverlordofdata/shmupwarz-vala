[indent=4]
uses
    SDL
    Bosco
    Bosco.ECS

class RenderPositionSystem : DarkMatter implements ISystem, ISetWorld, IExecuteSystem
    _renderer : unowned Renderer
    _group: Group

    construct(renderer : Renderer)
        _renderer = renderer

    def setWorld(world:World)
        _group = world.getGroup(Matcher.AllOf({Component.Resource, Component.Position}))

    def execute()
        for var entity in _group.getEntities()
            // TODO: Shouldn't need try/catch inside of a loop...
            try
                var res = (ResourceComponent)entity.getComponent(Component.Resource)
                var pos = (PositionComponent)entity.getComponent(Component.Position)
                if res.bgd
                    res.image.render(_renderer, (int)pos.x, (int)pos.y, {0, 0, SCREEN_WIDTH, SCREEN_HEIGHT})
                else
                    res.image.render(_renderer, (int)pos.x, (int)pos.y)

            except e:Exception
                print e.message
