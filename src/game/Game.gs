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

    frame : int = 0
    showFps : bool = true
    player : PlayerInputSystem

    construct()
        name = "GameFoo"
        width = SCREEN_WIDTH
        height = SCREEN_HEIGHT
        running = true

    /**
     *  OnLoop
     *
     * Process the physics
     */
    def override OnLoop()
        pass

    /**
     *  OnRender
     *
     * Render the screen
     */
    def override OnRender()
        renderer.set_draw_color(0xFF, 0xFF, 0xFF, SDL.Alpha.OPAQUE)
        renderer.clear()
        world.execute()
        if showFps do fpsTexture().render(renderer, 0, 0)
        renderer.present()

    /**
     *  OnInit
     *
     * load assets
     */
    def override OnInit():bool
        if super.OnInit()

            world = new World(components)
            world.add(new MovementSystem())
            world.add(new RenderPositionSystem(renderer))
            world.add(new ViewManagerSystem(renderer))
            world.add(player = new PlayerInputSystem(this))
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
