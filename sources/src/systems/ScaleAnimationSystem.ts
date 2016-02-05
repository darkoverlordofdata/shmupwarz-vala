module schmupwarz {
  "use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;
  import ScaleAnimation = schmupwarz.ScaleAnimationComponent;
  import Sprite = PIXI.Sprite;

  export class ScaleAnimationSystem implements ISetPool, IExecuteSystem {

    protected pool:Pool;
    protected group:Group;

    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.ScaleAnimation));
    }
    
    public execute() {
      var delta = bosco.delta;
      var entities = this.group.getEntities();
      for (var i = 0, l = entities.length; i < l; i++) {
        var e:Entity = entities[i];

        var scaleAnimation:ScaleAnimationComponent = e.scaleAnimation;

        if (scaleAnimation.active) {
          var scale = e.sprite.object.scale;

          scale.x += scaleAnimation.speed * delta;
          scale.y = scale.x;

          if (scale.x > scaleAnimation.max) {
            scale.x = scaleAnimation.max;
            scale.y = scale.x;
            scaleAnimation.active = false;
          } else if (scale.x < scaleAnimation.min) {
            scale.x = scaleAnimation.min;
            scale.y = scale.x;
            scaleAnimation.active = false;
          }
        }
      }
    }
  }
}