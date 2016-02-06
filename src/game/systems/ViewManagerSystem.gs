[indent=4]
uses
    SDL
    Bosco
    Bosco.ECS

class ViewManagerSystem : DarkMatter implements ISystem, IInitializeSystem, ISetWorld

    _renderer : unowned Renderer
    _sprites : GenericArray of Sprite
    _group : Group
    _world : World
    _game : Game

    construct(game : Game)
        _game = game
        _renderer = _game.renderer

    def setWorld(world : World)
        _world = world

    /**
     * Listen for resources to be added
     * and then load them in from the file
     */
    def initialize()
        _group = _world.getGroup(Matcher.AllOf({Component.Resource}))
        _group.onEntityAdded.add(onEntityAdded)
        _game.sprites = new GenericArray of Sprite
        _sprites = _game.sprites


    /**
     *  OnEntityAdded event:
     */
    def onEntityAdded(g : Group, e : Entity, ix : int, c : IComponent)

        scale : ScaleComponent
        layer : LayerComponent
        ordinal : int = 0

        var res = (ResourceComponent)c
        res.sprite = Sprite.fromFile(_renderer, res.path)

        try
            if e.hasComponent(Component.Scale)
                scale = (ScaleComponent)e.getComponent(Component.Scale)
                res.sprite.scale = scale.x

            if e.hasComponent(Component.Layer)
                layer = (LayerComponent)e.getComponent(Component.Layer)
                res.sprite.layer = layer.ordinal
                ordinal = layer.ordinal

        except e : Exception
            print e.message

        if res.sprite == null
            print "Failed to load %s", res.path
        else
            if res.bgd
                res.sprite.centered = false

            _sprites.add(res.sprite)
            /**
             * Insert sprite in layer order
             */
            // if _sprites.length == 0
            //     _sprites.add(res.sprite)
            // else
            //     for var i=0 to (_sprites.length-1)
            //         print "Sprite? %d) %d/%d", i, ordinal, _sprites[i].layer
            //         if ordinal <= _sprites[i].layer
            //             _sprites.insert(i, res.sprite)
            //             break

        // Add res.sprite to _game.sprites
