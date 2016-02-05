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
  import Container = PIXI.Container;

  export class DestroySystem implements ISetPool, IExecuteSystem {

    protected pool:Pool;
    protected group:Group;

    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.Destroy));
    }
    
    public execute() {
      var entities = this.group.getEntities();
      var view:Container = bosco.viewContainer;
      
      for (var i = 0, l = entities.length; i < l; i++) {
        var e:Entity = entities[i];
        if (e.hasSprite) view.removeChild(e.sprite.object);
        this.pool.destroyEntity(e);
      }
    }
  }
}