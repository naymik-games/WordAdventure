class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {


  }
  create() {

    gameSettings = JSON.parse(localStorage.getItem('waSave'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('waSave', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }

    this.cameras.main.setBackgroundColor(0x000000);
    var back = this.add.image(0, 0, 'back').setOrigin(0)
    var title = this.add.bitmapText(150, 100, 'lato', 'WORD', 100).setOrigin(0, .5).setTint(0xfa983c);
    var title2 = this.add.bitmapText(150, 175, 'lato', 'ADVENTURE', 100).setOrigin(0, .5).setTint(0xFFFFFF);

    var classicIcon = this.add.image(game.config.width / 2 - 150, 475, 'play').setTint(0xfa983c).setScale(2).setInteractive()
    var classic = this.add.bitmapText(game.config.width / 2 - 40, 475, 'lato', 'Classic', 80).setOrigin(0, .5).setTint(0xfafafa).setInteractive();
    var classicBest = this.add.bitmapText(game.config.width / 2 - 40, 550, 'lato', 'Best: ' + gameSettings.classicHigh.toLocaleString(), 60).setOrigin(0, .5).setTint(0xfafafa).setInteractive();

    classicIcon.on('pointerdown', function () {
      gameMode = 0
      this.scene.start('playGame');
    }, this);

    var adventureIcon = this.add.image(game.config.width / 2 - 150, 775, 'play').setTint(0xfa983c).setScale(2).setInteractive()
    var adventure = this.add.bitmapText(game.config.width / 2 - 40, 775, 'lato', 'Adventure', 80).setOrigin(0, .5).setTint(0xfafafa);
    var adventureBest = this.add.bitmapText(game.config.width / 2 - 40, 850, 'lato', 'Best: ' + gameSettings.adventureHigh.toLocaleString(), 60).setOrigin(0, .5).setTint(0xfafafa).setInteractive();

    adventureIcon.on('pointerdown', function () {
      gameMode = 2
      this.scene.start('playGame');
    }, this);

    var searchIcon = this.add.image(game.config.width / 2 - 150, 1075, 'play').setTint(0xfa983c).setScale(2).setInteractive()
    var search = this.add.bitmapText(game.config.width / 2 - 40, 1075, 'lato', 'Search', 80).setOrigin(0, .5).setTint(0xfafafa);
    var searchBest = this.add.bitmapText(game.config.width / 2 - 40, 1150, 'lato', 'Best: ' + gameSettings.searchHigh.toLocaleString(), 60).setOrigin(0, .5).setTint(0xfafafa).setInteractive();

    searchIcon.on('pointerdown', function () {
      gameMode = 1
      this.scene.start('selectGame');
    }, this);

    this.coinIcon = this.add.image(game.config.width / 2, 1500, 'coin').setScale(2);
    this.coinText = this.add.bitmapText(game.config.width / 2, 1500, 'lato', gameSettings.coins, 68).setOrigin(.5).setTint(0xf5f5f5).setAlpha(1);

  }
  clickHandler() {


    //this.scene.launch('UI');
  }

}