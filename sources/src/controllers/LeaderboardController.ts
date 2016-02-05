module schmupwarz {
  "use strict";

  import Rnd = bosco.utils.Rnd;
  import Label = EZGUI.Component.Label;
  import Button = EZGUI.Component.Button;
  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  import Properties = bosco.Properties;
  import BitmapText = PIXI.extras.BitmapText;

  const font = {
    font: '40px Skranji',
    tint: 0xfffff
  };

  /**
   * Leaderboard Controller
   */
  export class LeaderboardController  {

    protected gui;
    protected sprite:Container;

    start() {
      this.gui = EZGUI.create(bosco.config.ezgui.leaderboard, bosco.config.theme);
      EZGUI.components.buttonLeaderboardBack.on('click', (e) => bosco.controller('main'));
      bosco.viewContainer.addChild(this.gui);

      var x = window.innerWidth/2;
      var y = window.innerHeight/2;

      var s = this.sprite = new Sprite(Texture.fromFrame('panel.png'));
      s.anchor.set(0.5, 0.5);
      var data = Properties.getLeaderboard(6);
      for (var k in data) {
        var row = data[k];
        var i = parseInt(k) + 1;
        var mmddyyyy = row.date.substr(4, 2) + '/' + row.date.substr(6, 2) + '/' + row.date.substr(0, 4);

        var text = new BitmapText(mmddyyyy+'', font);        
        text.position.set(-200,-200+(i*40));
        s.addChild(text);

        var text = new BitmapText(row.score+'', font);
        text.position.set(100,-200+(i*40));
        s.addChild(text);
      }

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