module schmupwarz {
  "use strict";

  import Rnd = bosco.utils.Rnd;
  import Label = EZGUI.Component.Label;
  import Button = EZGUI.Component.Button;
  import Text = PIXI.Text;
  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  const font = {font: 'bold 20px Arial', align: 'left'};

  /**
   * Credits Controller
   */
  export class CreditsController  {

    protected gui;
    protected sprite:Container;

    start() {
      this.gui = EZGUI.create(bosco.config.ezgui.credits, bosco.config.theme);
      EZGUI.components.buttonCreditsBack.on('click', (e) => bosco.controller('main'));
      bosco.viewContainer.addChild(this.gui);

      var x = window.innerWidth/2;
      var y = window.innerHeight/2;
      var index = 0;

      var texts = [bosco.config.about, bosco.config.credits];
      var logo:Sprite = new Sprite(Texture.fromFrame('d16a.png'));
      var text = new Text(texts[index], font);
      text.anchor.set(0.5,0.5);

      var panel = new Container();
      logo.position.set(225, 100);
      panel.addChild(text);
      panel.addChild(logo);
      text.text = texts[0];

      var s = this.sprite = new Sprite(Texture.fromFrame('panel.png'));
      bosco.viewContainer.addChild(s);
      s.addChild(panel);
      s.anchor.set(0.5, 0.5);
      s.width = window.innerWidth * .75;
      s.height = window.innerHeight/2;
      s.position.set(~~x, ~~y);

      var onTouchStart = () => {
        index = (index+1)%3;
        switch(index) {
          case 0: //  ABOUT
            panel.removeChildren();

            logo.position.set(225, 100);
            panel.addChild(text);
            panel.addChild(logo);
            text.text = texts[index];
            break;

          case 1: //  CREDITS
            panel.removeChildren();

            logo.position.set(225, 100);
            panel.addChild(text);
            panel.addChild(logo);
            text.text = texts[index];
            break;

          case 2: //  LEGEND
            panel.removeChildren();

            var text01:Text = new Text('Supply - 20', font);
            var enemy1:Sprite = new Sprite(Texture.fromFrame('enemy1.png'));
            text01.position.set(-300, -50);
            panel.addChild(text01);
            enemy1.width = 128; 
            enemy1.height = 128; 
            enemy1.anchor.set(1,1);
            enemy1.position.set(-150, -50);
            panel.addChild(enemy1);

            var text02:Text = new Text('Scout - 10', font);
            var enemy2:Sprite = new Sprite(Texture.fromFrame('enemy2.png'));
            text02.position.set(-50, -50);
            panel.addChild(text02);
            enemy2.width = 64; 
            enemy2.height = 64; 
            enemy2.anchor.set(1,1);
            enemy2.position.set(50, -50);
            panel.addChild(enemy2);

            var text03:Text = new Text('Creche - 60', font);
            var enemy3:Sprite = new Sprite(Texture.fromFrame('enemy3.png'));
            text03.position.set(150, -50);
            panel.addChild(text03);
            enemy3.width = 144; 
            enemy3.height = 144; 
            enemy3.anchor.set(1,1);
            enemy3.position.set(300, -50);
            panel.addChild(enemy3);

            var textNext:Text = new Text('[tap for about]', font);
            textNext.position.set(-50, 0);
            panel.addChild(textNext);

            var text11:Text = new Text('Damage - 10', font);
            var mine1:Sprite = new Sprite(Texture.fromFrame('mine1.png'));
            text11.position.set(-200, 100);
            panel.addChild(text11);
            mine1.anchor.set(1,1);
            mine1.position.set(-125, 100);
            panel.addChild(mine1);

            var text12:Text = new Text('Damage - 20', font);
            var mine2:Sprite = new Sprite(Texture.fromFrame('mine2.png'));
            text12.position.set(75, 100);
            panel.addChild(text12);
            mine2.anchor.set(1,1);
            mine2.position.set(150, 100);
            panel.addChild(mine2);

            logo.position.set(225, 100);
            panel.addChild(logo);
            break;
        }
      };
      s.interactive = true;
      s.on('mousedown', onTouchStart);
      s.on('touchstart', onTouchStart);
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