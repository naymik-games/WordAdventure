class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0x000000);
    var back = this.add.image(0, 0, 'back').setOrigin(0).setAlpha(1)
    this.startGroup = onGroup;

    /*  this.playText.on('pointerdown', function(){
        this.scene.start("PlayGame");
      }, this);*/
    this.swipe = false;

    this.showGroup(this.startGroup, 'left');
    //this.return = this.add.image(game.config.width / 2, 1550, 'icons', 5).setScale(1.5).setInteractive().setTint(0xc76210);
    var homeText = this.add.bitmapText(125, 1550, 'lato', '[home]', 60).setOrigin(.5).setTint(0xFFFFFF).setInteractive();
    homeText.on('pointerdown', function () {
      this.scene.start('startGame')
      //this.play()
    }, this)
    //this.backText = this.add.bitmapText(game.config.width / 2, 1500, 'atari', '< back', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    //this.return.level = -2;

    //this.input.on('gameobjectup', this.clickHandler, this);
    // this.input.on('poimterdown', this.down,this);
    // this.input.on('pointermove', this.move,this);
    this.input.on('pointerup', this.endSwipe, this);

  }


  endSwipe(e, obj) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
      this.swipe = true
      if (swipeNormal.x > 0.8) {
        console.log('right')
        //this.handleMove(0, 1, );
        this.preGroup('right')
      }
      if (swipeNormal.x < -0.8) {
        console.log('left')
        this.nextGroup('left')

      }
      if (swipeNormal.y > 0.8) {

        //this.handleMove(1, 0);
      }
      if (swipeNormal.y < -0.8) {

        //this.handleMove(-1, 0);
      }
    } else {

      this.swipe = false

    }
  }

  showGroup(groupNum, dir) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempGroup = groupNum + 1;
    var groupTitle = this.add.bitmapText(game.config.width / 2, 150, 'lato', groups[groupNum].title, 100).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1550, 'lato', tempGroup + '/' + groups.length, 60).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);
    //console.log(gameSettings.highestSolved)
    for (var i = 0; i < groups[groupNum].puzzleCount; i++) {
      var tempLevel = groups[groupNum].levelStart + i
      var levelBack = this.add.image(game.config.width / 2, 300 + i * 250, 'blank')
      levelBack.displayWidth = 800
      levelBack.displayHeight = 100
      groupBox.add(levelBack);
      var levelTitle = this.add.bitmapText(150, 300 + i * 250, 'lato', (tempLevel + 1) + ' - ' + levels[tempLevel].theme, 70).setTint(0x000000).setOrigin(0, .5).setInteractive();
      if (levels[tempLevel].key in gameSettings.results) {

      } else {
        gameSettings.results[levels[tempLevel].key] = { best: 0, stars: 0 }
      }
      console.log(gameSettings.results[levels[onLevel].key].best)
      if (levels[tempLevel].level < gameSettings.highestSolved) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', gameSettings.results[levels[tempLevel].key].stars, 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else if (levels[tempLevel].level == gameSettings.highestSolved) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', gameSettings.results[levels[tempLevel].key].stars, 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else if (levels[tempLevel].level == gameSettings.highestSolved + 1) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', 'Not Solved', 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', 'Locked', 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        var lock = this.add.image(levelTitle.x - 45, levelTitle.y, 'lock').setScale(1.5).setDepth(5).setAlpha(1)
        groupBox.add(lock)
        groupBox.bringToTop(lock)
      }

      levelTitle.level = tempLevel

      groupBox.add(levelTitle);
      groupBox.add(status)

    }
    this.saveSettings()

    if (dir == 'left') {
      var xstart = 850
    } else {
      var xstart = -850
    }
    groupBox.setPosition(xstart, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {

      }
    });
  }

  hideGroup(num, dir) {
    if (dir == 'left') {
      var xmove = -850
    } else {
      var xmove = 850
    }
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: xmove,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.groupBox.destroy(true);
        this.showGroup(num, dir);
      }
    });

  }
  nextGroup(dir) {
    if (this.startGroup < groups.length - 1) {
      this.startGroup++;
    } else {
      this.startGroup = 0
    }
    this.hideGroup(this.startGroup, dir);
  }
  preGroup(dir) {
    if (this.startGroup > 0) {
      this.startGroup--;
    } else {
      this.startGroup = groups.length - 1
    }
    this.hideGroup(this.startGroup, dir);
  }

  selectLevel(t) {
    if (this.swipe) { return }
    console.log(t.level)
    onLevel = t.level
    onGroup = this.startGroup
    this.scene.start('playGame')
  }

  saveSettings() {
    localStorage.setItem('waSavePWA', JSON.stringify(gameSettings))
  }

}