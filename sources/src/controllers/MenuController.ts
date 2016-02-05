module schmupwarz {
  "use strict";

  import Rnd = bosco.utils.Rnd;
  import Label = EZGUI.Component.Label;
  import Button = EZGUI.Component.Button;

  export class MenuController  {

    protected gui;
    public title:Label;
    public play:Button;
    public highScore:Button;
    public credits:Button;
    public about:Button;

    start() {
      this.gui = EZGUI.create(bosco.config.ezgui.menu, bosco.config.theme);
      this.title = EZGUI.components.labelTitle;
      this.play = EZGUI.components.buttonPlay;
      this.highScore = EZGUI.components.buttonHighScore;
      this.credits = EZGUI.components.buttonCredits;

      this.play.on('click', (e) => bosco.controller('game'));
      this.highScore.on('click', (e) => bosco.controller('leaderboard'));
      this.credits.on('click', (e) => bosco.controller('credits'));
      bosco.viewContainer.addChild(this.gui);
      this.show();
    };

    public show(next?) {

      this.title.visible = true;
      this.title.position.x = ((window.innerWidth - this.title.settings.width) / 2);
      this.title.position.y = -20 - this.title.settings.height;
      this.title.animatePosTo(this.title.position.x, 10, 500, EZGUI.Easing.Back.Out, () => {

        this.play.visible = true;
        this.play.position.x = ((window.innerWidth - this.play.settings.width) / 2) + 100;
        this.play.position.y = -20 - this.play.settings.height;
        var targetY = ((window.innerHeight - this.play.settings.height) / 2) - 40;
        this.play.animatePosTo(this.play.position.x, targetY, 200, EZGUI.Easing.Circular.Out, () => {

          this.highScore.visible = true;
          this.highScore.position.x = ((window.innerWidth - this.highScore.settings.width) / 2) + 100;
          this.highScore.position.y = -20 - this.highScore.settings.height;
          var targetY = ((window.innerHeight - this.highScore.settings.height) / 2) + 28;
          this.highScore.animatePosTo(this.highScore.position.x, targetY, 200, EZGUI.Easing.Circular.Out, () => {

            this.credits.visible = true;
            this.credits.position.x = ((window.innerWidth - this.credits.settings.width) / 2) + 100;
            this.credits.position.y = -20 - this.credits.settings.height;
            var targetY = ((window.innerHeight - this.credits.settings.height) / 2) + 28 + 66;
            this.credits.animatePosTo(this.credits.position.x, targetY, 200, EZGUI.Easing.Circular.Out, () => {
              if (next) next();
            });
          });
        });
      });
    }


    stop() {
      bosco.viewContainer.removeChild(this.gui);
      this.gui.destroy();
    }

    update(delta:number) {
    }
  }
}