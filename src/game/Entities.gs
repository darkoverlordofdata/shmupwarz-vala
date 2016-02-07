[indent=4]
uses
    Bosco
    Bosco.ECS
    GLib
    Utils

const Tau : double = 2 * Math.PI


/**
 *  Create Background
 */
def createBackground() : Entity
    var entity = World.instance.createEntity("background")
    try
        entity.addComponent(Component.Position, new PositionComponent(0, 0))
        entity.addComponent(Component.Scale,    new ScaleComponent(2, 1))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/Images/BackdropBlackLittleSparkBlack.png", true))
    except e:Exception
        print e.message
    return entity

// def createText(x : int, y : int, text : string, font : string, size : int) : Entity
//     var font = SDLTTF.Font.open(font, size)
//     var entity = World.instance.createEntity("text")
//     try
//         entity.addComponent(Component.Position, new PositionComponent(x, y))
//     except e:Exception
//         print e.message
//     return entity
//
//

/**
 *  Create Player
 */
def createPlayer() : Entity
    var entity = World.instance.createEntity("player")
    try
        entity.addComponent(Component.Player,   new PlayerComponent())
        entity.addComponent(Component.Bounds,   new BoundsComponent(43))
        entity.addComponent(Component.Health,   new HealthComponent(100))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, 0))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.PLAYER))
        entity.addComponent(Component.Position, new PositionComponent(SCREEN_WIDTH/2, SCREEN_HEIGHT-80))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/fighter.png"))
    except e:Exception
        print e.message
    return entity

/**
 *  Create Bullet
 */
def createBullet(x : double, y : double) : Entity
    var entity = World.instance.createEntity("bullet")
    try
        entity.addComponent(Component.Bullet,   new BulletComponent())
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, -800))
        entity.addComponent(Component.Bounds,   new BoundsComponent(5))
        entity.addComponent(Component.Expires,  new ExpiresComponent(1))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.BULLET))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/bullet.png"))
        entity.addComponent(Component.SoundEffect, new SoundEffectComponent(Effect.PEW))
    except e:Exception
        print e.message
    return entity

/**
 *  Create Particle
 */
def createParticle(x : double, y : double) : Entity
    var radians = UUID.random.next_double() * Tau
    var magnitude = UUID.random.int_range(0, 200)
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = UUID.random.double_range(0.5, 1)
    var entity = World.instance.createEntity("particle")
    try
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Velocity, new VelocityComponent(velocityX, velocityY))
        entity.addComponent(Component.Expires,  new ExpiresComponent(1))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.PARTICLE))
        entity.addComponent(Component.Scale,    new ScaleComponent(scale, scale))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/particle.png"))
    except e:Exception
        print e.message
    return entity

/**
 *  Create Explosion
 */
def createExplosion(x: double, y: double, scale:double) : Entity
    var entity = World.instance.createEntity("explosion")
    try
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Expires,  new ExpiresComponent(0.5))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.PARTICLE))
        entity.addComponent(Component.Scale,    new ScaleComponent(scale, scale))
        entity.addComponent(Component.SoundEffect,    new SoundEffectComponent(scale < 0.5 ? Effect.SMALLASPLODE : Effect.ASPLODE))
        entity.addComponent(Component.ScaleAnimation, new ScaleAnimationComponent(scale / 100, scale, -3, false, true))
        entity.addComponent(Component.Resource,       new ResourceComponent("resources/res/images/explosion.png"))
    except e:Exception
        print e.message
    return entity

def createEnemy1() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 200
    var entity = World.instance.createEntity("enemy1")
    try
        entity.addComponent(Component.Enemy,    new EnemyComponent())
        entity.addComponent(Component.Bounds,   new BoundsComponent(20))
        entity.addComponent(Component.Health,   new HealthComponent(10))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, 40))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.ACTORS_1))
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/enemy1.png"))
    except e:Exception
        print e.message
    return entity

def createEnemy2() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 100
    var entity = World.instance.createEntity("enemy2")
    try
        entity.addComponent(Component.Enemy,    new EnemyComponent())
        entity.addComponent(Component.Bounds,   new BoundsComponent(40))
        entity.addComponent(Component.Health,   new HealthComponent(20))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, 30))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.ACTORS_2))
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/enemy2.png"))
    except e:Exception
        print e.message
    return entity

def createEnemy3() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 50
    var entity = World.instance.createEntity("enemy3")
    try
        entity.addComponent(Component.Enemy,    new EnemyComponent())
        entity.addComponent(Component.Bounds,   new BoundsComponent(70))
        entity.addComponent(Component.Health,   new HealthComponent(60))
        entity.addComponent(Component.Velocity, new VelocityComponent(0, 20))
        entity.addComponent(Component.Layer,    new LayerComponent(Layer.ACTORS_3))
        entity.addComponent(Component.Position, new PositionComponent(x, y))
        entity.addComponent(Component.Resource, new ResourceComponent("resources/res/images/enemy3.png"))
    except e:Exception
        print e.message
    return entity
