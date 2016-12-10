[indent=4]
uses SDL

namespace Bosco
    class AbstractGame : DarkMatter

        name : string
        width : int
        height : int
        running : bool
        window : Window
        renderer : Renderer
        sprites : GenericArray of Sprite
        keys : array of uint8

        prop readonly delta : double

        showFps : bool = true
        _fpsFont: SDLTTF.Font
        _fpsSprite : Sprite
        _currentTime: double = 0.0
        _lastTime: double = 0.0
        _currentFps: double = 0.0
        _elapsed: double = 0.0
        _frames: int = 0

        _t1: double = 0.0
        _t2: double = 0.0
        _t3: double = 0.0

        def Run() : int
            if Initialize() == false
                return -1

            e : Event
            _currentTime = (double)GLib.get_real_time()/1000000.0 
            keys = Keyboard.get_state()
            while running
                while Event.poll(out e) != 0
                    Events(e)
                keys = Keyboard.get_state()


                _lastTime = _currentTime
                _currentTime = (double)GLib.get_real_time()/1000000.0
                _delta = _currentTime - _lastTime

                //_t1 = (double)GLib.get_real_time()/1000000.0 

                Update(_delta)
                //_t2 = (double)GLib.get_real_time()/1000000.0 
                GLib.Thread.usleep(1000)
                Draw(_delta)
                //_t3 = (double)GLib.get_real_time()/1000000.0 

                
                if showFps
                    _frames++
                    _elapsed = _elapsed + _delta

                    if _elapsed > 1.0
                        _currentFps = (double)_frames / _elapsed
                        _elapsed = 0.0
                        _frames = 0
                        var s = "%2.2f".printf(_currentFps)
                        _fpsSprite = Sprite.fromRenderedText(renderer, _fpsFont, s.substring(0, 5), {250, 250, 250})
                        _fpsSprite.centered = false
                    else
                        _fpsSprite = Sprite.fromRenderedText(renderer, _fpsFont, "60.00", {250, 250, 250})
                        _fpsSprite.centered = false

                //stdout.printf("%f -- %f \n", (_t2-_t1), (_t3-_t2))

            Dispose()
            return 0

        def virtual Events(e: Event)
            pass

        def virtual Update(delta: double)
            pass

        def virtual Draw(delta: double)
            renderer.set_draw_color(0x0, 0x0, 0x0, SDL.Alpha.OPAQUE)
            renderer.clear()

            for var i=0 to (sprites.length-1)
                var sprite = sprites[i]
                sprite.render(renderer, sprite.x, sprite.y)

            if showFps do _fpsSprite.render(renderer, 0, 0)
            renderer.present()

        def virtual Dispose()
            pass

        /**
         * Initialize SDL
         */
        def virtual Initialize() : bool

            if SDL.init(SDL.InitFlag.VIDEO) < 0
                print "SDL could not initialize! SDL Error: %s", SDL.get_error()
                return false

            if SDLImage.init(SDLImage.InitFlags.PNG) < 0
                print "SDL_image could not initialize! SDL_image Error: %s", SDLImage.get_error()
                return false

            if !SDL.Hints.set(Hints.RENDER_SCALE_QUALITY, "1")
                print "Warning: Linear texture filtering not enabled!"

            window = Window.create(name, Window.POS_CENTERED, Window.POS_CENTERED, width, height, Window.Flags.SHOWN)
            if window == null
                print "Window could not be created! SDL Error: %s", SDL.get_error()
                return false

            renderer = Renderer.create_renderer(window, -1, Renderer.Flags.ACCELERATED | Renderer.Flags.PRESENTVSYNC)
            if renderer == null
                print "Renderer could not be created! SDL Error: %s", SDL.get_error()
                return false

            renderer.set_draw_color(0xFF, 0xFF, 0xFF, Alpha.OPAQUE)

            if SDLTTF.init() == -1
                print "SDL_ttf could not initialize! SDL_ttf Error: %s", SDLTTF.get_error()
                return false

            _fpsFont = SDLTTF.Font.open("resources/Starjedi.ttf", 16)
            if _fpsFont == null
                print "Failed to load font!, SDL_ttf Error: %s", SDLTTF.get_error()

            return true


