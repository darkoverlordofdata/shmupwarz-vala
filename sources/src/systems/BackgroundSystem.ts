module schmupwarz {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Rnd = bosco.utils.Rnd;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IInitializeSystem = entitas.IInitializeSystem;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;
  import Sprite = PIXI.Sprite;

  export class BackgroundSystem implements ISetPool, IExecuteSystem, IInitializeSystem {

    protected pool:Pool;
    protected entity:Entity;

    public setPool(pool:Pool) {
      this.pool = pool;
    }

    public initialize() {
      this.entity = this.pool.createBackground();
    }

    public execute() {
      var e = this.entity;
      var uniforms = e.background.filter.uniforms;
      var time = uniforms.time;

      if (time.value === 0) {
        time.value = Rnd.nextInt(1000)+500;
      } else {
        time.value += bosco.delta;
      }
      var value = uniforms.resolution.value = [window.innerHeight, window.innerWidth];
      var sprite:Sprite = e.sprite.object;
      sprite.height = value[0] = window.innerHeight;
      sprite.width = value[1] = window.innerWidth;
    }
  }
}