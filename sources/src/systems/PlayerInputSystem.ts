module schmupwarz {
  "use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import ISetPool = entitas.ISetPool;
  import IExecuteSystem = entitas.IExecuteSystem;
  import IInitializeSystem = entitas.IInitializeSystem;
  import Input = bosco.utils.Input;

  export class PlayerInputSystem implements ISetPool, IExecuteSystem, IInitializeSystem {
    protected pool:Pool;
    protected group:Group;
    private static FireRate = .1;

    protected timeToFire:number=0;

    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.Player));
    }

    public initialize() {
      this.pool.createPlayer();
      for (var life=0; life<3; life++) {
        this.pool.createLife(life);
      }
      this.pool.createStatus();
    }
    
    public execute() {
      var mousePosition = Input.mousePosition;
      if (mousePosition === undefined) return;
      
      var entities = this.group.getEntities();
      if (entities.length === 0) return;

      var e:Entity = entities[0];
      var position:PositionComponent = e.position;
      position.x = mousePosition.x;
      position.y = mousePosition.y-60;


      if (Input.getMouseButtonDown(0)) {
        if (this.timeToFire <= 0) {
          this.pool.createBullet(position.x - 27, position.y + 2);
          this.pool.createBullet(position.x + 27, position.y + 2);
          this.timeToFire = PlayerInputSystem.FireRate;
        }
      }
      if (this.timeToFire > 0) {
        this.timeToFire -= bosco.delta;
        if (this.timeToFire < 0) {
          this.timeToFire = 0;
        }
      }
    }
  }
}