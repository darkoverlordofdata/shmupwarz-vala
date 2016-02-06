[indent=4]
uses
    Bosco
    Bosco.ECS
    SDL

const SCREEN_WIDTH:int = 640
const SCREEN_HEIGHT:int = 480

init
    print "Application started"

    var game = new Game()
    game.OnExecute()

class Game : AbstractGame

    world : World
    player : PlayerInputSystem

    construct()
        name = "Shmup Warz"
        width = SCREEN_WIDTH
        height = SCREEN_HEIGHT
        running = true

    /**
     *  OnLoop
     *
     * Process the game engine
     */
    def override OnLoop()
        world.execute()

    /**
     *  OnRender
     *
     * Render the screen
     */
    // def override OnRender()
        // renderer.set_draw_color(0x0, 0x0, 0x0, SDL.Alpha.OPAQUE)
        // renderer.clear()
        //
        // for var i=0 to (sprites.length-1)
        //     var sprite = sprites[i]
        //     sprite.render(renderer, sprite.x, sprite.y)
        //
        // if showFps do fpsTexture().render(renderer, 0, 0)
        //
        // renderer.present()

    /**
     *  OnInit
     *
     * load assets
     */
    def override OnInit():bool
        if super.OnInit()

            world = new World(components)
            world.add(new MovementSystem(this))
            world.add(player = new PlayerInputSystem(this))
            // world.add(new SoundEffectSystem())
            world.add(new CollisionSystem(this))
            world.add(new ExpiringSystem(this))
            world.add(new EntitySpawningTimerSystem(this))
            // world.add(ParallaxStarRepeatingSystem())
            // world.add(ColorAnimationSystem())
            world.add(new ScaleAnimationSystem(this))
            // world.add(RemoveOffscreenShipsSystem())
            world.add(new ViewManagerSystem(this))
            world.add(new RenderPositionSystem(this))
            // world.add(HealthRenderSystem())
            // world.add(HudRenderSystem())
            world.add(new DestroySystem(this))
            world.initialize()

            createBackground()
            createPlayer()

        return true

    /**
     *  OnEvent
     *
     * Handle events
     */
    def override OnEvent(e:SDL.Event)

        if e.type == SDL.EventType.QUIT
            running = false

        if e.type != EventType.MOUSEMOTION && e.type != EventType.MOUSEBUTTONDOWN && e.type != EventType.MOUSEBUTTONUP
            return
        /* Mouse Events*/
        x:int
        y:int
        SDL.Cursor.get_state(out x, out y)
        player.onMouseEvent(e.type, x, y)

    /**
     *  OnCleanup
     *
     * release assets
     */
    def override OnCleanup()
        SDL.quit()
        SDLImage.quit()
