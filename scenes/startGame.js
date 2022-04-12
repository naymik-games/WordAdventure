class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    /*
      gameSettings = JSON.parse(localStorage.getItem('SDsave'));
      if (gameSettings === null || gameSettings.length <= 0) {
        localStorage.setItem('SDsave', JSON.stringify(defaultValues));
        gameSettings = defaultValues;
      }
    */
    this.cameras.main.setBackgroundColor(0x000000);
    var back = this.add.image(0, 0, 'back').setOrigin(0)
    var title = this.add.bitmapText(game.config.width / 2, 50, 'lato', 'WORD', 85).setOrigin(.5).setTint(0x000000);
    var title2 = this.add.bitmapText(game.config.width / 2, 100, 'lato', 'ADVENTURE', 85).setOrigin(.5).setTint(0xFFFFFF);
    var classic = this.add.bitmapText(game.config.width / 2 - 50, 275, 'lato', 'Classic', 80).setOrigin(0, .5).setTint(0xfafafa).setInteractive();
    classic.on('pointerdown', function () {
      gameMode = 0
      this.scene.start('playGame');
    }, this);

    var adventure = this.add.bitmapText(game.config.width / 2 - 50, 575, 'lato', 'Adventure', 80).setOrigin(0, .5).setTint(0xfafafa).setInteractive();
    adventure.on('pointerdown', function () {
      gameMode = 2
      this.scene.start('playGame');
    }, this);

    var search = this.add.bitmapText(game.config.width / 2 - 50, 875, 'lato', 'Search', 80).setOrigin(0, .5).setTint(0xfafafa).setInteractive();
    search.on('pointerdown', function () {
      gameMode = 1
      this.scene.start('selectGame');
    }, this);

  }
  clickHandler() {


    //this.scene.launch('UI');
  }

}