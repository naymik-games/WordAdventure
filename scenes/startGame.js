class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {


  }
  create() {

    gameSettings = JSON.parse(localStorage.getItem('waSavePWA'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('waSavePWA', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }
    gameMode = 0
    this.scene.start('playGame');
  }
  clickHandler() {


    //this.scene.launch('UI');
  }

}