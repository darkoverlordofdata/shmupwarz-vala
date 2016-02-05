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

  import Sprite = PIXI.Sprite;

  export class SpriteRenderSystem implements ISetPool, IExecuteSystem {

    protected pool:Pool;
    protected group:Group;
    
    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.Position, Matcher.Sprite));
    }

    public execute() {
      var entities = this.group.getEntities();
      for (var i = 0, l = entities.length; i < l; i++) {
        var e:Entity = entities[i];
        var sprite:Sprite = e.sprite.object;
        var position = e.position;
        sprite.position.set(position.x, position.y);
      }
    }
  }
}