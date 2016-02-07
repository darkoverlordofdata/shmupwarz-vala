[indent=4]
uses
    Bosco
    Bosco.ECS

class ScaleAnimationSystem : DarkMatter implements ISystem, ISetWorld, IInitializeSystem, IExecuteSystem
    _world : World
    _group : Group
    _game : Game

    construct(game : Game)
        _game = game

    def setWorld(world : World)
        _world = world

    def initialize()
        _group = _world.getGroup(Matcher.AllOf({Component.ScaleAnimation, Component.Resource}))

    def execute()
        try
            for var entity in _group.getEntities()
                var scaleAnimation = (ScaleAnimationComponent)entity.getComponent(Component.ScaleAnimation)
                var res = (ResourceComponent)entity.getComponent(Component.Resource)
                var scale = res.sprite.scale

                if scaleAnimation.active
                  res.sprite.scale.x += scaleAnimation.speed * _game.delta
                  res.sprite.scale.y += scaleAnimation.speed * _game.delta

                  if scale.x > scaleAnimation.max
                    res.sprite.scale.x = scaleAnimation.max
                    res.sprite.scale.y = scaleAnimation.max
                    scaleAnimation.active = false
                  else if scale.x < scaleAnimation.min
                    res.sprite.scale.x = scaleAnimation.min
                    res.sprite.scale.y = scaleAnimation.min
                    scaleAnimation.active = false

        except e:Exception
            print e.message
