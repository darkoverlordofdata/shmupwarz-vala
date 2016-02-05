module schmupwarz {
  "use strict";

  import Pools = schmupwarz.Pools;
  import Matcher = entitas.Matcher;
  import Text = PIXI.Text;
  import BitmapText = PIXI.extras.BitmapText;
  import ScoreComponent = schmupwarz.ScoreComponent;

  /**
   * Score Label Controller
   */
  export class ScoreLabelController {

    public label:BitmapText;
    protected fps:BitmapText;
    protected _fps:number;
    protected _score:number;

    start() {

      var font = {font: '36px Radio Stars', align: 'left'};

      this.label = new BitmapText('Score 0', font);
      this.label.position.set((bosco.config.width - this.label.width) / 2, 10);
      bosco.viewContainer.addChild(this.label);
      this.fps = new BitmapText('FPS', font);
      this.fps.position.set(0, 10);
      this.fps.scale.set(0.5);
      bosco.viewContainer.addChild(this.fps);

    }

    stop() {
      bosco.viewContainer.removeChild(this.label);
      bosco.viewContainer.removeChild(this.fps);
    }

    update(delta:number) {
      var fps = bosco.fps;
      if (this._fps !== fps) {
        this.fps.text = 'FPS ' + fps;
        this._fps = fps;
      }
      
      if (Pools.pool.hasScore) {
        var score = Pools.pool.score.value;
        if (this._score !== score) {
          this.label.text = "Score " + score;
          this._score = score;
        }
      }
    }

  }
}