module schmupwarz {
  "use strict";

  import Pools = schmupwarz.Pools;
  import Systems = entitas.Systems;
  import Entity = entitas.Entity;

  /**
   * Game Controller
   */
  export class GameController {

    systems:Systems;

    start() {

      this.systems = this.createSystems(Pools.pool);
      this.systems.initialize();

    }

    createSystems(pool) {
      return new Systems()
        // .add(pool.createSystem(schmupwarz.BackgroundSystem))
        .add(pool.createSystem(schmupwarz.MovementSystem))
        .add(pool.createSystem(schmupwarz.PlayerInputSystem))
        .add(pool.createSystem(schmupwarz.SoundEffectSystem))
        .add(pool.createSystem(schmupwarz.CollisionSystem))
        .add(pool.createSystem(schmupwarz.ExpiringSystem))
        .add(pool.createSystem(schmupwarz.EntitySpawningTimerSystem))
        .add(pool.createSystem(schmupwarz.ParallaxStarRepeatingSystem))
        .add(pool.createSystem(schmupwarz.ColorAnimationSystem))
        .add(pool.createSystem(schmupwarz.ScaleAnimationSystem))
        .add(pool.createSystem(schmupwarz.RemoveOffscreenShipsSystem))
        .add(pool.createSystem(schmupwarz.SpriteRenderSystem))
        .add(pool.createSystem(schmupwarz.AddViewSystem))
        .add(pool.createSystem(schmupwarz.HealthRenderSystem))
        .add(pool.createSystem(schmupwarz.HudRenderSystem))
        .add(pool.createSystem(schmupwarz.DestroySystem));

    }

    update(delta:number) {
      this.systems.execute();
    }
    
    /**
     * Stop the entitas engine
     */
    stop() {
      var entities = Pools.pool.getEntities();
      for (var i = 0, entitiesLength = entities.length; i < entitiesLength; i++) {
        var e:Entity = entities[i];
        e.setDestroy(true);
      }
      /**
      * Reset entitas memory
      * todo: is there a better way to do this?
      */
      Pools._pool = null;
      Entity.alloc = null;    
    }
  }
}
