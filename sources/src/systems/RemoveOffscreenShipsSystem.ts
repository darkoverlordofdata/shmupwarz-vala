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

  //declare var viewContainer;

  export class RemoveOffscreenShipsSystem implements ISetPool, IExecuteSystem {

    protected pool:Pool;
    protected group:Group;

    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.Velocity, Matcher.Position, Matcher.Health, Matcher.Bounds));
    }
    
    public execute() {
      var height = bosco.config.height;
      var pool = this.pool;
      var entities = this.group.getEntities();
      for (var i = 0, l = entities.length; i < l; i++) {
        var e:Entity = entities[i];
        if (e.position.y > height - e.bounds.radius) {
          if (!e.isPlayer) e.isDestroy = true;
        }
      }
    }
  }
}