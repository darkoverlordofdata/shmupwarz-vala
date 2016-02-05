module schmupwarz {
  //"use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import Container = PIXI.Container;
  import BitmapText = PIXI.extras.BitmapText;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import IInitializeSystem = entitas.IInitializeSystem;
  import ISetPool = entitas.ISetPool;
  import Sprite = PIXI.Sprite;

  export class HudRenderSystem implements ISetPool, IInitializeSystem, IExecuteSystem {

    protected pool:Pool;
    protected group:Group;
    private activeEntities:BitmapText;
    private totalCreated:BitmapText;
    private totalDeleted:BitmapText;
    private players:Group;

    public setPool(pool:Pool) {
      this.pool = pool;
    }

    public initialize() {
      var font = {font: '36px Radio Stars', align: 'left'};
      this.activeEntities = new BitmapText("Active entitiez:           ", font);
      this.totalCreated = new BitmapText("Total created:          ", font);
      this.totalDeleted = new BitmapText("Total deleted:          ", font);

      this.activeEntities.scale.set(0.5/window.devicePixelRatio);
      this.totalCreated.scale.set(0.5/window.devicePixelRatio);
      this.totalDeleted.scale.set(0.5/window.devicePixelRatio);

      this.activeEntities.position.set(0, 40);
      this.totalCreated.position.set(0, 60);
      this.totalDeleted.position.set(0, 80);

      bosco.viewContainer.addChild(this.activeEntities);
      bosco.viewContainer.addChild(this.totalCreated);
      bosco.viewContainer.addChild(this.totalDeleted);
      this.players = this.pool.getGroup(Matcher.Player);
      

    }

    public execute() {
      var pool:Pool = this.pool;
      var size:number = pool.count;

      this.activeEntities.text = "Active entities: " + size;
      this.totalCreated.text = "Total created: " + pool.reusableEntitiesCount;
      this.totalDeleted.text = "Total deleted: " + (pool._creationIndex-size);
      
    }
  }
}
