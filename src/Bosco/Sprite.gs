/**
 * Image.gs
 *
 * Wrapper for SDLImage surface
 *
 *
 */
[indent=4]
namespace Bosco

    struct Scale
        x : double
        y : double

    class Sprite : DarkMatter
        uniqueId : static int = 0

        texture : SDL.Texture
        width : int
        height : int
        x : int
        y : int
        scale : Scale = Scale() {
          x = 1.0,
          y = 1.0
        }
        centered : bool = true
        layer : int = 0
        id : int = ++uniqueId

        def static fromRenderedText(renderer : SDL.Renderer, font : SDLTTF.Font, text : string, color : SDL.Color) : Sprite?
            var mt = new Sprite()
            var textSurface = font.render(text, color)

            if textSurface == null
                print "Unable to render text surface! SDL_ttf Error: %s", SDLTTF.get_error()
                return null
            else
                mt.texture = SDL.Texture.create_from_surface(renderer, textSurface)
                if mt.texture == null
                    print "Unable to create texture from rendered text! SDL Error: %s", SDL.get_error()
                    return null
                else
                    mt.width = textSurface.w
                    mt.height = textSurface.h
            return mt

        def setText(renderer : SDL.Renderer, font : SDLTTF.Font, text : string, color : SDL.Color)
            var textSurface = font.render(text, color)

            if textSurface == null
                print "Unable to render text surface! SDL_ttf Error: %s", SDLTTF.get_error()

            else
                this.texture = SDL.Texture.create_from_surface(renderer, textSurface)
                if this.texture == null
                    print "Unable to create texture from rendered text! SDL Error: %s", SDL.get_error()
                else
                    this.width = textSurface.w
                    this.height = textSurface.h


        def static fromFile(renderer : SDL.Renderer, path : string) : Sprite?
            var mt = new Sprite()
            var loadedSurface = SDLImage.load(path)

            if loadedSurface == null
                print "Unable to load image %s! SDL_image Error: %s", path, SDLImage.get_error()
                return null
             else
                loadedSurface.set_colorkey(true, loadedSurface.format.map_rgb(0, 0xFF, 0xFF))

                mt.texture = SDL.Texture.create_from_surface(renderer, loadedSurface)
                mt.texture.set_blendmode(SDL.BlendMode.BLEND)
                if mt.texture == null
                    print "Unable to create texture from %s! SDL Error: %s", path, SDL.get_error()
                 else
                    mt.width = loadedSurface.w
                    mt.height = loadedSurface.h
            return mt

        def render(renderer : SDL.Renderer, x : int, y : int, clip : SDL.Rectangle? = null)
            var w = (int)((clip == null ? width : clip.w) * scale.x)
            var h = (int)((clip == null ? height : clip.h) * scale.y)

            x = centered ? x-(w/2) : x
            y = centered ? y-(h/2) : y

            renderer.copy(texture, null, {x, y, w, h})
