/**
 * Extensions for schmupwarz
 */
module schmupwarz.extensions {
  "use strict";

  const Tau = Math.PI*2;

  import Pool = entitas.Pool;
  import Entity = entitas.Entity;
  import Layer = schmupwarz.Layer;
  import Effect = schmupwarz.Effect;
  import Rnd = bosco.utils.Rnd;
  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  import AbstractFilter = PIXI.AbstractFilter;

  /**
   * Create the player
   */
  Pool.prototype.createPlayer = function() {
    this.createEntity('Player')
      .addBounds(43)
      .addHealth(100, 100)
      .addVelocity(0, 0)
      .addPosition(~~(bosco.config.width/4), ~~(bosco.config.height-80))
      .addLayer(Layer.ACTORS_3)
      .addResource('fighter')
      .setPlayer(true);
  };

  /**
   * Create a bullet at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createBullet = function (x: number, y: number) {
    this.createEntity('Bullet')
      .addPosition(~~x, ~~y)
      .addVelocity(0, 800)
      .addBounds(5)
      .addExpires(1)
      .addSoundEffect(Effect.PEW)
      .addLayer(Layer.PARTICLES)
      .addResource('bullet')
      .setBullet(true);

  };

  /**
   * Create a particle at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createParticle = function (x: number, y: number) {
    var radians: number = Math.random() * Tau;
    var magnitude: number = Rnd.random(200);
    var velocityX = magnitude * Math.cos(radians);
    var velocityY = magnitude * Math.sin(radians);
    var scale = Rnd.random(0.5, 1);

    this.createEntity('Particle')
      .addExpires(1)
      .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, false, false, false, true, true)
      .addPosition(~~x, ~~y)
      .addVelocity(velocityX, velocityY)
      .addScale(scale, scale)
      .addLayer(Layer.PARTICLES)
      .addResource('particle');
  };

  /**
   * Create a small explosion at (x,y)
   *
   * @param x
   * @param y
   * @param scale
   */
  Pool.prototype.createExplosion = function (x: number, y: number, scale:number) {
    this.createEntity('explosion')
      .addSoundEffect(scale < .5 ? Effect.SMALLASPLODE : Effect.ASPLODE)
      .addExpires(0.5)
      .addScaleAnimation(scale / 100, scale, -3, false, true)
      .addPosition(~~x, ~~y)
      .addScale(scale, scale)
      .addLayer(Layer.PARTICLES)
      .addResource('explosion');
  };

  /**
   * Create enemy ship #1
   *
   */
  Pool.prototype.createEnemy1 = function() {
    var x = Rnd.nextInt(bosco.config.width);
    var y = bosco.config.height/2 - 200;
    this.createEntity("Enemy1")
      .addBounds(20)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -40)
      .addLayer(Layer.ACTORS_1)
      .addResource('enemy1')
      .addHealth(10, 10)
      .setEnemy(true);

  };

  /**
   * Create enemy ship #2
   */
  Pool.prototype.createEnemy2 = function() {
    var x = Rnd.nextInt(bosco.config.width);
    var y = bosco.config.height/2 - 100;
    this.createEntity("Enemy2")
      .addBounds(40)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -30)
      .addLayer(Layer.ACTORS_2)
      .addResource('enemy2')
      .addHealth(20, 20)
      .setEnemy(true);
  };

  /**
   * Create enemy ship #3
   */
  Pool.prototype.createEnemy3 = function() {
    var x = Rnd.nextInt(bosco.config.width);
    var y = bosco.config.height/2 - 50;
    this.createEntity("Enemy3")
      .addBounds(70)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -20)
      .addLayer(Layer.ACTORS_3)
      .addResource('enemy3')
      .addHealth(60, 60)
      .setEnemy(true);
  };

  /**
   * Create the background filter
   */
  Pool.prototype.createBackground = function():Entity {
    var shader = new AbstractFilter(null, bosco.resources.parallaxStars_frag.data, {
      time: {
        type: 'f', value: performance.now()
      },
      resolution: {
        type: '2f', value: [window.innerHeight, window.innerWidth]
      }
    });
    var sprite = new Sprite();
    sprite.position.set(0,0);
    sprite.filters = [shader];
    sprite.height = window.innerHeight;
    sprite.width = window.innerWidth;
    sprite['layer'] = Layer.BACKGROUND;
    bosco.viewContainer.addChild(sprite);

    return this.createEntity("Background")
      .addPosition(0, 0)
      .addLayer(Layer.BACKGROUND)
      .addSprite(Layer.BACKGROUND, sprite)
      .addBackground(shader);

  };

  /**
   *
   * @param ordinal
   */
  Pool.prototype.createLife = function(ordinal:number) {
    var x = (bosco.config.width/2)-((ordinal+1) * 40)+87;
    var y = 80;

    this.createEntity("Life")
      .addPosition(~~x, ~~y)
      .addLayer(Layer.LIVES)
      .addResource('life')
      .addLife(ordinal);
  }

  /**
   *
   * @param health
   * @param x
   * @param y
   * @param velocity
   * @param radius
   */
  Pool.prototype.createMine = function(health:number, x:number, y:number, velocity:number, radius:number) {
    this.createEntity("Mine")
      .addBounds(radius)
      .addPosition(~~x, ~~y)
      .addVelocity(0, velocity)
      .addLayer(Layer.MINES)
      .addResource(`mine${health}`)
      .addHealth(health*10, health*10)
      .setMine(true);

  }

  /**
   * Status Bar
   * 100% = all yellow
   *   0% = all red
   */
  Pool.prototype.createStatus = function() {
    var x = (bosco.config.width/2);
    var y = 120;

    this.setStatus(100, 0)
      .addPosition(~~x, ~~y)
      .addLayer(Layer.LIVES)
      .addResource('status');
  }
}
