module schmupwarz {
  "use strict";

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import IInitializeSystem = entitas.IInitializeSystem;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;
  import Timer = bosco.utils.Timer;
  import Properties = bosco.Properties;
  import Sprite = PIXI.Sprite;
  import InvertFilter = PIXI.filters.InvertFilter;

  const POWERUP_BONUS = 500;
  const POWERUP_IMMUNITY = 2;
  
  export class CollisionSystem implements ISetPool, IInitializeSystem, IExecuteSystem {

    protected pool: Pool;
    protected group: Group;
    protected collisionPairs: Array<CollisionPair>;
    private timer:Timer;
    private status:Sprite;
    private enemies:Group;
    private first:boolean=true;

    public setPool(pool: Pool) {
      this.pool = pool;
    }
    /**
     * Create collision handlers
     */
    public initialize() {
      
      this.status = this.pool.statusEntity.sprite.object.children[1];
      
      this.pool.setScore(0);
      var bullets = this.pool.getGroup(Matcher.Bullet);
      var enemies = this.enemies = this.pool.getGroup(Matcher.Enemy);
      var mines = this.pool.getGroup(Matcher.Mine);
      var players = this.pool.getGroup(Matcher.Player);
      
      this.collisionPairs = [];
      
      /** Check for bullets hitting enemy ship */
      this.collisionPairs.push(new CollisionPair(bullets, enemies, {

        handleCollision: (bullet: Entity, ship: Entity) => {
          var bp: PositionComponent = bullet.position;
          var health: HealthComponent = ship.health;
          var position: PositionComponent = ship.position;
          var x = bp.x;
          var y = bp.y;

          this.pool.createExplosion(x, y, .1);
          var i = 5;
          while (--i > 0) this.pool.createParticle(x, y);

          bullet.setDestroy(true);
          health.health -= 1;
          if (health.health < 0) {
            this.pool.score.value += ship.health.maximumHealth;
            ship.setDestroy(true);
            this.pool.createExplosion(position.x, position.y, .5);
          }
        }
      }));
      
      /** Check for enemy mines hitting player ship */
      this.collisionPairs.push(new CollisionPair(mines, players, {

        handleCollision: (mine:Entity, ship:Entity) => {
          var health: HealthComponent = ship.health;
          var position: PositionComponent = ship.position;

          mine.setDestroy(true);
          var status = this.pool.status;
          if (status.immunity > 0) {
            /** 
             * We have immunity 
             */
            status.immunity -= 1;
            if (status.immunity <= 0) {
              var sprite:Sprite = this.pool.playerEntity.sprite.object;
              sprite.filters = null;
              sprite.alpha = 1;
            }
            return;
          }

          /**
           * todo: pixi.js issue #2159
           * Sprite doesn't display after sprite.width = 0 and sprite.width = nonzero number 
           * 
           * as a workaround, when the value will be zero, set visibility off. 
           * Reset visibility when width is > 0. 
           */
          health.health -= mine.health.health;
          if (health.health > 0) {
            this.status.visible = true;            
            var pc = ~~Math.round(health.health / health.maximumHealth * 100);
            this.status.width = this.pool.status.percent = Math.max(10, pc);
          } else {
            health.health = 0;
            this.status.visible = false;            
            ship.setDestroy(true);
            this.pool.createExplosion(position.x, position.y, 1);
            var lives = this.pool.getGroup(Matcher.Life);
            if (lives.count === 0) {
              /** Game Over!! */
              Properties.setScore(this.pool.score.value);
              bosco.controller('gameover', this.pool.score.value);

            } else {
              var life:Entity = lives.getEntities()[0];
              life.setDestroy(true);
              this.timer = new Timer(1, true);
              this.timer.execute = () => {
                this.pool.createPlayer();
                health.health = health.maximumHealth;
                this.status.visible = true;            
                this.status.width = 100;
                this.timer = null;
              }
            }
          }
        }
      }));
      
    }
    /**
     * Check for Collision
     */
    public execute() {
      
      if (this.enemies.count === 0) {
        if (!this.first) {
          /**
          * You cleared the screen - Get a POWER-UP!!
          *  +500 points!
          *  immunity 2 hits
          */
          var status = this.pool.status;
          if (status.immunity <= 0) {
            this.pool.score.value += POWERUP_BONUS;
            status.immunity = POWERUP_IMMUNITY;
            var sprite:Sprite = this.pool.playerEntity.sprite.object;
            sprite.filters = [new InvertFilter()];
            sprite.alpha = .5;
          }
        }
      } else {
        this.first = false;
      }
         
      var collisionPairs = this.collisionPairs;
      for (var i = 0, l = collisionPairs.length; l > i; i++) {
        collisionPairs[i].checkForCollisions();
      }
      
      if (this.timer) {
        this.timer.update(bosco.delta);
      }
    }
  }


  /**
   *
   */
  class CollisionPair {
    private groupEntitiesA: Group;
    private groupEntitiesB: Group;
    private handler: CollisionHandler;

    constructor(group1:Group, group2:Group, handler: CollisionHandler) {
      this.groupEntitiesA = group1;
      this.groupEntitiesB = group2;
      this.handler = handler;
    }

    public checkForCollisions() {
      var handler = this.handler;
      var groupEntitiesA = this.groupEntitiesA.getEntities();
      var groupEntitiesB = this.groupEntitiesB.getEntities();
      var sizeA = groupEntitiesA.length;
      var sizeB = groupEntitiesB.length;

      for (var a = 0; sizeA > a; a++) {
        var entityA: Entity = groupEntitiesA[a];
        for (var b = 0; sizeB > b; b++) {
          var entityB: Entity = groupEntitiesB[b];
          if (this.collisionExists(entityA, entityB)) {
            handler.handleCollision(entityA, entityB);
          }
        }
      }
    }

    private collisionExists(e1: Entity, e2: Entity): boolean {

      if (e1 === null || e2 === null) return false;

      var p1: PositionComponent = e1.position;
      var p2: PositionComponent = e2.position;

      var b1: BoundsComponent = e1.bounds;
      var b2: BoundsComponent = e2.bounds;

      var a = p1.x - p2.x;
      var b = p1.y - p2.y;
      return Math.sqrt(a * a + b * b) - (b1.radius) < (b2.radius);
    }
  }

  interface CollisionHandler {
    handleCollision(a: Entity, b: Entity);
  }
}
