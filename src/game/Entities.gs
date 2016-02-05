[indent=4]
uses
    Bosco
    Bosco.ECS
    Component

/**
 *  Create Background
 */
def createBackground():Entity
    var entity = World.instance.createEntity("background")
    try
        entity.addComponent(Resource, new ResourceComponent("resources/Images/BackdropBlackLittleSparkBlack.png", true))
        entity.addComponent(Component.Position, new PositionComponent(0, 0))
    except e:Exception
        print e.message
    return entity

/**
 *  Create Player
 */
def createPlayer():Entity
    var entity = World.instance.createEntity("player")
    try
        entity.addComponent(Component.Player,   new PlayerComponent())
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/fighter.png"))
        entity.addComponent(Component.Position, new PositionComponent(SCREEN_WIDTH/2, SCREEN_HEIGHT-80))
        entity.addComponent(Component.Bounds,   new BoundsComponent(43))
        entity.addComponent(Component.Health,   new HealthComponent(100))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, 0))
        entity.addComponent(Component.Layer,    new LayerComponent(3))
    except e:Exception
        print e.message
    return entity
