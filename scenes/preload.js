class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {



    this.load.image("particle", "assets/sprites/particle.png");



    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('lato', 'assets/fonts/lato_0.png', 'assets/fonts/lato.xml');
    this.load.spritesheet("menu_icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });

    this.load.spritesheet("letters_", "assets/sprites/letter-alt.png", {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet("letters", "assets/sprites/letter-alt-no_border.png", {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet("particle_color", "assets/sprites/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });


    this.load.image('blank', 'assets/sprites/blank.png');
    this.load.image('back', 'assets/sprites/background.png');
    this.load.image('menu', 'assets/sprites/menu.png');
    this.load.image('timer', 'assets/sprites/timer.png');
    this.load.image('view', 'assets/sprites/view.png');
    this.load.image('play', 'assets/sprites/play.png');
    this.load.image('coin', 'assets/sprites/coin.png');
    this.load.image('lock', 'assets/sprites/lock.png');

  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








