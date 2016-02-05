module schmupwarz {
  "use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import IInitializeSystem = entitas.IInitializeSystem;
  import ISetPool = entitas.ISetPool;
  import Rnd = bosco.utils.Rnd;
  import Timer = bosco.utils.Timer;

  export class EntitySpawningTimerSystem implements ISetPool, IExecuteSystem, IInitializeSystem {

    protected pool:Pool;
    private timer1:Timer;
    private timer2:Timer;
    private timer3:Timer;
    private timer4:Timer;
    private ai:number=0;
    private mine:number=0;
    private offset:number=0;
    private pos:number[][] = [
      [20, 20],
      [50, 20],
      [80, 20]
    ];

    public setPool(pool:Pool) {
      this.pool = pool;
    }

    public initialize() {
      this.timer4 = new Timer(.85/(window.innerWidth/640), true);
      this.timer4.execute = () => {
        this.ai = (this.ai+1)%3;
        this.mine = (this.mine+1)%2;
        var m = this.mine+1;

        this.offset+=100;
        if (this.offset>window.innerWidth) this.offset = 0;

        var v = -Rnd.nextInt(50)-50;
        var x = this.offset+this.pos[this.ai][0];
        var y = this.pos[this.ai][1];
        this.pool.createMine(m, x, y, v, 10);

      };

      this.timer1 = new Timer(2, true);
      this.timer1.execute = () => this.pool.createEnemy1();

      this.timer2 = new Timer(6, true);
      this.timer2.execute = () => this.pool.createEnemy2();

      this.timer3 = new Timer(12, true);
      this.timer3.execute = () => this.pool.createEnemy3();
    }


    public execute() {
      var rnd = Math.random();
      if (rnd<.5) rnd = 1-rnd;
      var delta = rnd*bosco.delta;

      this.timer1.update(delta);
      this.timer2.update(delta);
      this.timer3.update(delta);
      this.timer4.update(delta);
    }
  }
}