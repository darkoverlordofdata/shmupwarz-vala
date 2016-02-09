[indent=4]
uses
    Bosco
    Bosco.ECS
    GLib

class CollisionSystem : DarkMatter implements ISystem, ISetWorld, IInitializeSystem, IExecuteSystem
    _world : World
    _game : Game
    _collisionPairs: array of CollisionPair

    construct(game : Game)
        _game = game

    def setWorld(world : World)
        _world = world

    def initialize()
        var bullets = _world.getGroup(Matcher.AllOf({Component.Bullet}))
        var enemies = _world.getGroup(Matcher.AllOf({Component.Enemy}))
        // var bullets = _world.getGroup(Matching.Bullet)
        // var enemies = _world.getGroup(Matching.Enemy)

        _collisionPairs = {
            new CollisionPair(bullets, enemies)
        }


    def execute()
        for var pair in  _collisionPairs
          pair.checkForCollisions();

class CollisionPair : CollisionHandler
    prop groupEntitiesA : Group
    prop groupEntitiesB : Group
    construct(group1 : Group, group2 : Group)
        _groupEntitiesA = group1
        _groupEntitiesB = group2

    def handleCollision(bullet: Entity, ship: Entity)
        try
            var bp = (PositionComponent)bullet.getComponent(Component.Position)
            var health = (HealthComponent)ship.getComponent(Component.Health)
            var position = (PositionComponent)ship.getComponent(Component.Position)
            var x = bp.x
            var y = bp.y

            createExplosion(x, y, 0.1)
            var i = 5
            while --i > 0 do createParticle(x, y)

            bullet.addComponent(Component.Destroy, new DestroyComponent())
            health.health -= 1
            if health.health < 0
              ship.addComponent(Component.Destroy, new DestroyComponent())
              createExplosion(position.x, position.y, 0.2)

        except e : Exception
            print e.message

interface CollisionHandler

    prop abstract groupEntitiesA : Group
    prop abstract groupEntitiesB : Group

    def abstract handleCollision(a: Entity, b: Entity)

    def checkForCollisions()
        var groupEntitiesA = groupEntitiesA.getEntities()
        var groupEntitiesB = groupEntitiesB.getEntities()

        for var entityA in groupEntitiesA
            for var entityB in groupEntitiesB
                if collisionExists(entityA, entityB)
                    handleCollision(entityA, entityB)

    def collisionExists(e1: Entity, e2: Entity): bool
        var result = false

        if e1 == null || e2 == null do return result

        try
            var p1 = (PositionComponent)e1.getComponent(Component.Position)
            var p2 = (PositionComponent)e2.getComponent(Component.Position)

            var b1 = (BoundsComponent)e1.getComponent(Component.Bounds)
            var b2 = (BoundsComponent)e2.getComponent(Component.Bounds)

            var a = p1.x - p2.x
            var b = p1.y - p2.y
            result = Math.sqrt(a * a + b * b) - (b1.radius) < (b2.radius)

        except e : Exception
            print e.message

        return result
