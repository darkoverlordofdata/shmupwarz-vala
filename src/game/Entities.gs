[indent=4]
uses
    Bosco
    Bosco.ECS
    GLib
    Utils

const Tau : double = 2 * Math.PI

enum Layer
    DEFAULT
    BACKGROUND
    TEXT
    LIVES
    MINES
    ACTORS_1
    ACTORS_2
    ACTORS_3
    PLAYER
    BULLET
    PARTICLE
    HUD

enum Effect
    PEW
    ASPLODE
    SMALLASPLODE



/**
 *  Create Background
 */
def createBackground() : Entity
    var entity = World.instance.createEntity("background")
    try
        //entity.addPosition, new PositionComponent(0, 0))
        entity.addPosition(0, 0)
        entity.addScale(2, 1)
        entity.addResource("resources/Images/BackdropBlackLittleSparkBlack.png", null, true)
    except e:Exception
        print e.message
    return entity

/**
 *  Create Player
 */
def createPlayer() : Entity
    var entity = World.instance.createEntity("player")
    try
        entity.setPlayer(true)
        entity.addBounds(43)
        entity.addHealth(100, 100)
        entity.addVelocity(0, 0)
        entity.addLayer(Layer.PLAYER)
        entity.addPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT-80)
        entity.addResource("resources/res/images/fighter.png", null, false)
    except e:Exception
        print e.message
    return entity

/**
 *  Create Bullet
 */
def createBullet(x : double, y : double) : Entity
    var entity = World.instance.createEntity("bullet")
    try
        entity.setBullet(true)
        entity.addPosition(x, y)
        entity.addVelocity(0, -800)
        entity.addBounds(5)
        entity.addExpires(1)
        entity.addLayer(Layer.BULLET)
        entity.addResource("resources/res/images/bullet.png", null, false)
        entity.addSoundEffect(Effect.PEW)
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
        entity.addPosition(x, y)
        entity.addVelocity(velocityX, velocityY)
        entity.addExpires(1)
        entity.addLayer(Layer.PARTICLE)
        entity.addScale(scale, scale)
        entity.addResource("resources/res/images/particle.png", null, false)
    except e:Exception
        print e.message
    return entity

/**
 *  Create Explosion
 */
def createExplosion(x: double, y: double, scale:double) : Entity
    var entity = World.instance.createEntity("explosion")
    try
        entity.addPosition(x, y)
        entity.addExpires(0.5)
        entity.addLayer(Layer.PARTICLE)
        entity.addScale(scale, scale)
        entity.addSoundEffect(scale < 0.5 ? Effect.SMALLASPLODE : Effect.ASPLODE)
        entity.addScaleAnimation(scale / 100, scale, -3, false, true)
        entity.addResource("resources/res/images/explosion.png", null, false)
    except e:Exception
        print e.message
    return entity

def createEnemy1() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 200
    var entity = World.instance.createEntity("enemy1")
    try
        entity.setEnemy(true)
        entity.addBounds(20)
        entity.addHealth(10, 10)
        entity.addVelocity(0, 40)
        entity.addLayer(Layer.ACTORS_1)
        entity.addPosition(x, y)
        entity.addResource("resources/res/images/enemy1.png", null, false)
    except e:Exception
        print e.message
    return entity

def createEnemy2() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 100
    var entity = World.instance.createEntity("enemy2")
    try
        entity.setEnemy(true)
        entity.addBounds(40)
        entity.addHealth(20, 20)
        entity.addVelocity(0, 30)
        entity.addLayer(Layer.ACTORS_2)
        entity.addPosition(x, y)
        entity.addResource("resources/res/images/enemy2.png", null, false)
    except e:Exception
        print e.message
    return entity

def createEnemy3() : Entity
    var x = UUID.random.int_range(0, SCREEN_WIDTH)
    var y = SCREEN_HEIGHT/2 - 50
    var entity = World.instance.createEntity("enemy3")
    try
        entity.setEnemy(true)
        entity.addBounds(70)
        entity.addHealth(60, 60)
        entity.addVelocity(0, 20)
        entity.addLayer(Layer.ACTORS_3)
        entity.addPosition(x, y)
        entity.addResource("resources/res/images/enemy3.png", null, false)
    except e:Exception
        print e.message
    return entity
