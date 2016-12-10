[indent=4]
uses
    Bosco
    Bosco.ECS


enum Component
    Background
    Bounds
    Bullet
    ColorAnimation
    Destroy
    Enemy
    Expires
    Firing
    Health
    Layer
    Life
    Mine
    Mouse
    Player
    Position
    Resource
    ScaleAnimation
    Scale
    Score
    SoundEffect
    Status
    // Text
    Velocity
    TotalComponents

const components: array of string = {
    "BackgroundComponent",
    "BoundsComponent",
    "BulletComponent",
    "ColorAnimationComponent",
    "DestroyComponent",
    "EnemyComponent",
    "ExpiresComponent",
    "FiringComponent",
    "HealthComponent",
    "LayerComponent",
    "LifeComponent",
    "MineComponent",
    "MouseComponent",
    "PlayerComponent",
    "PositionComponent",
    "ResourceComponent",
    "ScaleAnimationComponent",
    "ScaleComponent",
    "ScoreComponent",
    "SoundEffectComponent",
    "StatusComponent",
    "VelocityComponent"
}



class BoundsComponent : DarkMatter implements IComponent
    construct(radius:double)
        this.radius = radius
    radius:double


class BulletComponent : DarkMatter implements IComponent
    construct()
        this.bullet = true
    bullet:bool


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

class DestroyComponent : DarkMatter implements IComponent
    construct()
        this.destroy = true
    destroy:bool

class EnemyComponent : DarkMatter implements IComponent
    construct()
        this.enemy = true
    enemy:bool


class ExpiresComponent : DarkMatter implements IComponent
    construct(delay:double)
        this.delay = delay
    delay:double


class FiringComponent : DarkMatter implements IComponent
    construct()
        this.firing = true
    firing:bool


class HealthComponent : DarkMatter implements IComponent
    construct(health:double)
        this.health = health
        this.maximumHealth = health

    health:double
    maximumHealth:double

class LayerComponent : DarkMatter implements IComponent
    construct(ordinal:Layer)
        this.ordinal = ordinal
    ordinal:Layer

class LifeComponent : DarkMatter implements IComponent
    construct(count:int)
        this.count = count
    count:int

class MineComponent : DarkMatter implements IComponent
    construct()
        this.mine = true
    mine:bool

class MouseComponent : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

class PlayerComponent : DarkMatter implements IComponent
    construct()
        this.player = true
    player:bool

class PositionComponent  : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

class ResourceComponent : DarkMatter implements IComponent
    construct(path:string, bgd:bool=false)
        this.path = path
        this.bgd = bgd
    path:string
    sprite:Sprite
    bgd:bool

class ScaleComponent : DarkMatter implements IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double

class ScaleAnimationComponent : DarkMatter implements IComponent
    construct(min:double, max:double, speed:double, repeat:bool, active:bool)
        this.min = min
        this.max = max
        this.speed = speed
        this.repeat =repeat
        this.active = active
    min:double
    max:double
    speed:double
    repeat:bool
    active:bool

class SoundEffectComponent : DarkMatter implements IComponent
    construct(effect:Effect)
        this.effect = effect
    effect:Effect

class ScoreComponent : DarkMatter implements IComponent
    construct(value:double)
        this.value = value
    value:double

class StatusComponent : DarkMatter implements IComponent
    construct(percent:double, immunity:double)
        this.percent = percent
        this.immunity = immunity
    percent:double
    immunity:double

// class TextComponent : DarkMatter implements IComponent
//     construct(font : string, text : string)
//         this.font = font
//         this.text = text
//     text:string
//     font:SDLTTF.Font
//     sprite:Sprite

class VelocityComponent  : DarkMatter implements  IComponent
    construct(x : double, y : double)
        this.x = x
        this.y = y
    x:double
    y:double


