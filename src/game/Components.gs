[indent=4]
uses
    Bosco
    Bosco.ECS

enum Component
    Position
    Velocity
    Resource
    Bounds
    Bullet
    ColorAnimation
    Enemy
    Expires
    Firing
    Health
    Player
    ScaleAnimation
    SoundEffect
    Score
    Destroy
    Mouse
    Scale
    Layer
    Background
    Mine
    Status
    Life
    TotalComponents

const components: array of string = {
    "PositionComponent",
    "VelocityComponent",
    "ResourceComponent",
    "BoundsComponent",
    "BulletComponent",
    "ColorAnimationComponent",
    "EnemyComponent",
    "ExpiresComponent",
    "FiringComponent",
    "HealthComponent",
    "PlayerComponent",
    "ScaleAnimationComponent",
    "SoundEffectComponent",
    "ScoreComponent",
    "DestroyComponent",
    "MouseComponent",
    "ScaleComponent",
    "LayerComponent",
    "BackgroundComponent",
    "MineComponent",
    "StatusComponent",
    "LifeComponent"

}

[Compact]
class PositionComponent  : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

[Compact]
class VelocityComponent  : DarkMatter implements  IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

[Compact]
class ResourceComponent : DarkMatter implements IComponent
    construct(path:string, bgd:bool=false)
        this.path = path
        this.bgd = bgd
    path:string
    image:Texture
    bgd:bool

[Compact]
class BoundsComponent : DarkMatter implements IComponent
    construct(radius:double)
        this.radius = radius
    radius:double

[Compact]
class BulletComponent : DarkMatter implements IComponent
    construct()
        this.bullet = true
    bullet:bool

[Compact]
class ColorAnimationComponent : DarkMatter implements IComponent
    redMin:double
    redMax:double
    redSpeed:double
    greenMin:double
    greenMax:double
    greenSpeed:double
    blueMin:double
    blueMax:double
    blueSpeed:double
    alphaMin:double
    alphaMax:double
    alphaSpeed:double
    redAnimate:bool
    greenAnimate:bool
    blueAnimate:bool
    alphaAnimate:bool
    repeat:bool

[Compact]
class EnemyComponent : DarkMatter implements IComponent
    construct()
        this.enemy = true
    enemy:bool

[Compact]
class ExpiresComponent : DarkMatter implements IComponent
    construct(delay:double)
        this.delay = delay
    delay:double

[Compact]
class FiringComponent : DarkMatter implements IComponent
    construct()
        this.firing = true
    firing:bool

[Compact]
class HealthComponent : DarkMatter implements IComponent
    construct(health:double)
        this.health = health
        this.maximumHealth = health

    health:double
    maximumHealth:double

[Compact]
class PlayerComponent : DarkMatter implements IComponent
    construct()
        this.player = true
    player:bool

[Compact]
class ScaleAnimationComponent : DarkMatter implements IComponent
    min:double
    max:double
    speed:double
    repeat:bool
    active:bool

[Compact]
class SoundEffectComponent : DarkMatter implements IComponent
    construct(effect:double)
        this.effect = effect
    effect:double

[Compact]
class ScoreComponent : DarkMatter implements IComponent
    construct(value:double)
        this.value = value
    value:double

[Compact]
class DestroyComponent : DarkMatter implements IComponent
    construct()
        this.destroy = true
    destroy:bool

[Compact]
class MouseComponent : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

[Compact]
class ScaleComponent : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

[Compact]
class LayerComponent : DarkMatter implements IComponent
    construct(ordinal:double)
        this.ordinal = ordinal
    ordinal:double

[Compact]
class MineComponent : DarkMatter implements IComponent
    construct()
        this.mine = true
    mine:bool

[Compact]
class StatusComponent : DarkMatter implements IComponent
    construct(percent:double, immunity:double)
        this.percent = percent
        this.immunity = immunity
    percent:double
    immunity:double

[Compact]
class LifeComponent : DarkMatter implements IComponent
    construct(count:int)
        this.count = count
    count:int
