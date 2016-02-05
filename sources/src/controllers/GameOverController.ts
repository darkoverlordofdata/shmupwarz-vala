module schmupwarz {
  "use strict";

  import Rnd = bosco.utils.Rnd;
  import Properties = bosco.Properties;
  import Label = EZGUI.Component.Label;
  import Button = EZGUI.Component.Button;
  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  import BitmapText = PIXI.extras.BitmapText;

  const font64 = {
    font: '64px Skranji',
    tint: 0xfffff
  };

  const font = {
    font: '40px Skranji',
    tint: 0xfffff
  };

  /**
   * Game Over Controller
   */
  export class GameOverController  {

    protected gui;
    protected sprite:Container;

    start(score:number) {
      this.gui = EZGUI.create(bosco.config.ezgui.leaderboard, bosco.config.theme);
      EZGUI.components.buttonLeaderboardBack.on('click', (e) => bosco.controller('main'));
      bosco.viewContainer.addChild(this.gui);

      var x = window.innerWidth/2;
      var y = window.innerHeight/2;

      var s = this.sprite = new Sprite(Texture.fromFrame('panel.png'));
      s.anchor.set(0.5, 0.5);
      
      var text = new BitmapText('Game Over', font64);
      text.position.set(-150, -100);
      s.addChild(text);
      
      var text = new BitmapText(`${score} points`, font);
      text.position.set(-100, 0);
      s.addChild(text);
      
      s.width = window.innerWidth * .75;
      s.height = window.innerHeight/2;
      s.position.set(~~x, ~~y);
      bosco.viewContainer.addChild(s);
    }

    stop() {
      bosco.viewContainer.removeChild(this.sprite);
      bosco.viewContainer.removeChild(this.gui);
      this.gui.destroy();
    }

    update(delta:number) {
    }
  }
}