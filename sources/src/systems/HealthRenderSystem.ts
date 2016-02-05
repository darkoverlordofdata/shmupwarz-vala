module schmupwarz {
  "use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import IComponent = entitas.IComponent;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;

  import Container = PIXI.Container;
  import BitmapText = PIXI.extras.BitmapText;

  interface ILabelBMFont {
    [key: string]: BitmapText;
  }

  export class HealthRenderSystem implements ISetPool, IExecuteSystem {
    private texts:ILabelBMFont = {};
    protected pool:Pool;
    protected group:Group;

    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf(Matcher.Position, Matcher.Health));
      
      var enemies:Group = pool.getGroup(Matcher.Enemy);
      
      enemies.onEntityAdded.add((group:Group, e:Entity, index:number, component:IComponent) => {
        var b:BitmapText = new BitmapText('100%', {font: '20px Radio Stars', align: 'left'});
        b.scale.set(0.5, 0.5);
        bosco.viewContainer.addChild(b);
        this.texts[e.id] = b;
      });
      
      enemies.onEntityRemoved.add((group:Group, e:Entity, index:number, component:IComponent) => {
        bosco.viewContainer.removeChild(this.texts[e.id]);
        this.texts[e.id] = null;
        delete this.texts[e.id];
      });
    }

    public execute() {
      var entities = this.group.getEntities();
      for (var i = 0, l = entities.length; i < l; i++) {
        var e:Entity = entities[i];
        if (this.texts[e.id]) {
          var position:PositionComponent = e.position;
          var health:HealthComponent = e.health;
          var text:BitmapText = this.texts[e.id];

          var percentage:number = Math.round(health.health / health.maximumHealth * 100);
          text.position.set(position.x, position.y);
          text.text = `${percentage}%`;
        }
      }
    }
  }
}