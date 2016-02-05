bosco.start({
    namespace: "schmupwarz",
    controllers: {
      main: "MenuController",
      game: ["GameController", "ScoreLabelController"],
      gameover: "GameOverController",
      credits: "CreditsController",
      leaderboard: "LeaderboardController"
    },
    width: window.innerWidth,
    height: window.innerHeight,
    // fullScreen: false,
    scale: false,
    stats: false,
    input: true,
    tween: false,
    storage: false,
    /** PIXI options */
    options: {
      antialiasing: false,
      transparent: false,
      resolution: window.devicePixelRatio,
      autoResize: true,
      backgroundColor: 0x3c3c3c
    },
    /** Local storage properties  */
    properties: {
      skip: "false",
      leaderboard: "off",
      player: "",
      userId: "",
      playMusic: "true",
      playSfx: "true"
    },
    /** PIXI Loader assets */
    assets: {
      images: (window.devicePixelRatio >= 2) ? "res/images.json" : "res/images.json",
      normal_fnt          : "res/fonts/normal.fnt",
      hud_fnt             : "res/fonts/hud.fnt",
      asplode             : "res/sounds/asplode.ogg",
      pew                 : "res/sounds/pew.ogg",
      smallasplode        : "res/sounds/smallasplode.ogg",
      parallaxStars_frag  : 'res/glsl/parallaxStars.shader',
      opendyslexic20_fnt  : 'res/ezgui/fonts/OpenDyslexic20.fnt',
      opendyslexic24_fnt  : 'res/ezgui/fonts/OpenDyslexic24.fnt',
      opendyslexic32_fnt  : 'res/ezgui/fonts/OpenDyslexic32.fnt',
      skranji_fnt         : 'res/ezgui/fonts/Skranji-Bold-40.fnt'

    },
    /** Bosco prefabs */
    resources: {
      status : [
        {
          path: "status_red.png",
          anchor: {x:0.5, y:0.5}
        },
        {
          path: "status_yellow.png",
          anchor: {x:0.5, y:0.5}
        }    
      ],
      bullet : {
        path: "bullet.png",
        tint: 0xffd800ff,
        anchor: {x:0.5, y:0.5}
      },
      enemy1  : {
        path: "enemy1.png",
        tint: 0xff008e,
        anchor: {x:0.5, y:0.5}

      },
      enemy2  : {
        path: "enemy2.png",
        tint: 0xff008e,
        anchor: {x:0.5, y:0.5}

      },
      enemy3  : {
        path: "enemy3.png",
        tint: 0xff008e,
        anchor: {x:0.5, y:0.5}

      },
      explosion  : {
        path: "explosion.png",
        tint: 0xffd80080,
        anchor: {x:0.5, y:0.5}

      },
      fighter  : {
        path: "fighter.png",
        tint: 0x5dff81,
        anchor: {x:0.5, y:0.5}

      },
      life: {
        path: "life.png",
        anchor: {x:0.5, y:0.5}
      },
      mine1: {
        path: "mine1.png",
        anchor: {x:0.5, y:0.5}
      },
      mine2: {
        path: "mine2.png",
        anchor: {x:0.5, y:0.5}
      },
      particle  : {
        path: "particle.png",
        tint: 0xffd800ff,
        anchor: {x:0.5, y:0.5}

      },
      star  : {
        path: "particle.png",
        tint: 0xffd800ff,
        anchor: {x:0.5, y:0.5}

      },
      status_red: {
        path: "status_red.png",
        anchor: {x:0.5, y:0.5}
      },
      status_yellow: {
        path: "status_yellow.png",
        anchor: {x:0.5, y:0.5}
      }
    },
    /** EZGUI */
    theme: "kenney",
    ezgui: {
      menu: { /** EZGUI Main Menu */
        id: 'mainScreen',
        component: 'Window',
        padding: 4,
        color: '#bcd8fe',
        position: {x: 0, y: 0},
        width: window.innerWidth,
        height: window.innerHeight,
        layout: [1, 7],
        children: [
          {
            id: 'labelTitle',
            component: 'label',
            position: {x: -1000, y: -1000},
            height: 120,
            width: 380,
            color: '#c0c0c0',
            text: 'Schmup Warz',
            font: {
              size: '44px',
              family: 'Skranji',
              color: 'white'
            }
          },
          {
            id: 'buttonPlay',
            text: 'PLAY',
            component: 'Button',
            position: {x: -1000, y: -1000},
            color: '#c0c0c0',
            font: {
              size: '32px',
              family: 'Skranji',
              color: 'white'
            },
            anchor: {x: 0.5, y: 0.5},
            width: 200,
            height: 50
          },
          {
            id: 'buttonHighScore',
            text: 'HIGHSCORE',
            component: 'Button',
            position: {x: -1000, y: -1000},
            color: '#c0c0c0',
            font: {
              size: '32px',
              family: 'Skranji',
              color: 'white'
            },
            anchor: {x: 0.5, y: 0.5},
            width: 200,
            height: 50
          },
          {
            id: 'buttonCredits',
            text: 'ABOUT',
            component: 'Button',
            position: {x: -1000, y: -1000},
            color: '#c0c0c0',
            font: {
              size: '32px',
              family: 'Skranji',
              color: 'white'
            },
            anchor: {x: 0.5, y: 0.5},
            width: 200,
            height: 50
          }
        ]
      },
      credits: { /** EZGUI Credits */
        id: 'creditsScreen',
        component: 'Window',
        padding: 4,
        color: '#bcd8fe',
        position: {x: 0, y: 0},
        width: window.innerWidth,
        height: window.innerHeight,
        layout: [1,4],
        children: [
          {
            id: 'labelTitle',
            component: 'label',
            position: {x: (window.innerWidth-380) / 2, y: 20},
            height: 120,
            width: 380,
            color: '#c0c0c0',
            text: 'Schmup Warz',
            font: {
              size: '44px',
              family: 'Skranji',
              color: 'white'
            }
          },null,null,
          {
            id: 'buttonCreditsBack',
            text: 'BACK',
            component: 'Button',
            position: {x: (window.innerWidth-200)/2, y: 0},
            color: '#c0c0c0',
            font: {
              size: '24px',
              family: 'Skranji',
              color: 'white'
            },
            anchor: {x: 0.5, y: 0.5},
            width: 200,
            height: 50
          }
        ]
      },
      leaderboard: { /** EZGUI Leaderboard */
        id: 'scoreScreen',
        component: 'Window',
        padding: 4,
        color: '#bcd8fe',
        position: {x: 0, y: 0},
        //header: { position: { x: 20, y: 20 }, height: 120, width: 360, image:'res/images/Logo.png', },
        width: window.innerWidth,
        height: window.innerHeight,
        layout: [1,4],
        children: [
          {
            id: 'labelTitle',
            component: 'label',
            position: {x: (window.innerWidth-380) / 2, y: 20},
            height: 120,
            width: 380,
            color: '#c0c0c0',
            text: 'Schmup Warz',
            font: {
              size: '44px',
              family: 'Skranji',
              color: 'white'
            }
          },
          null,null,
          {
            id: 'buttonLeaderboardBack',
            text: 'BACK',
            component: 'Button',
            position: {x: (window.innerWidth-200)/2, y: 0},
            color: '#c0c0c0',
            font: {
              size: '24px',
              family: 'Skranji',
              color: 'white'
            },
            anchor: {x: 0.5, y: 0.5},
            width: 200,
            height: 50
          }
        ]
      }
    },
    credits: `
    Built by darkoverlordofdata, using entitas, pixi.js,
    localStorageDB, howler, and ezgui.

    Schmup Warz is a demo of Entitas-TS, and is based on
    Spaceship Warrior by @Flet
    (https://github.com/Flet/spaceship-warrior-gradle)

    MIT License

                            [tap for legend]
    `,
    about: `
    Destroy colony ships from the BEM homeworld
    before they can land on Earth.
    They don't fire guns. They use sub-space
    mines that our bullets can't seem to hit.

    Clearing all the ships from the screen resets
    your current health to 100%. You won't be able
    to clear the screen *and* dodge mines.

    Space/Touch to fire  |  Mouse/Touch to move.

                            [tap for credits]
    `


  });