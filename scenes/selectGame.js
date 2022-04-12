class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0x000000);
    this.startGroup = onGroup;

    /*  this.playText.on('pointerdown', function(){
        this.scene.start("PlayGame");
      }, this);*/
    this.swipe = false;

    this.showGroup(this.startGroup, 'left');
    //this.return = this.add.image(game.config.width / 2, 1550,'menu_icons', 5).setScale(1.5).setInteractive().setTint(0xc76210);

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
    var groupTitle = this.add.bitmapText(game.config.width / 2, 200, 'lato', groups[groupNum].title, 100).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1400, 'lato', tempGroup + '/' + groups.length, 60).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);

    for (var i = 0; i < groups[groupNum].puzzleCount; i++) {
      var tempLevel = groups[groupNum].levelStart + i
      var levelBack = this.add.image(game.config.width / 2, 400 + i * 150, 'blank')
      levelBack.displayWidth = 800
      levelBack.displayHeight = 75
      var levelTitle = this.add.bitmapText(game.config.width / 2, 400 + i * 150, 'lato', (tempLevel + 1) + ' - ' + levels[tempLevel].theme, 70).setTint(0x000000).setOrigin(.5).setInteractive();
      levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      levelTitle.level = tempLevel
      groupBox.add(levelBack);
      groupBox.add(levelTitle);
    }
    //label.on('pointerdown', this.changeTile.bind(this, label));

    //	var levelNum = groupNum + (groups[groupNum].puzzleCount -1);
    /*
        var levelNum = groups[groupNum].startNum;
    
    
        for (var i = 0; i < groups[groupNum].numLevels; i++) {
          if(i < 3){
         var xpos = 50 + i * 275;
         var ypos = 400; 
        } else if(i < 6){
         var xpos = 50 + (i - 3) * 275;
         var ypos = 400 + 275; 
        } else if(i < 9){
         var xpos = 50 + (i - 6) * 275;
         var ypos = 400 + 550; 
        } else {
         var xpos = 50 + (i - 9) * 275;
         var ypos = 400 + 825; 
        }
           
          var tempLevel = levelNum + 1;
          var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'atari', tempLevel, 70).setOrigin(.5).setTint(0x298191);
        var levelTitle = this.add.image(xpos,ypos, 'select_icons', 0).setOrigin(0,.5).setScale(.75);
        levelTitle.level = levelNum;
    
    
    
          if (gameSettings.levelStatus[levelNum] < 0) {
            //levelTitle.setAlpha(.5)
          levelTitle.setFrame(4);
            
          } else {
            levelTitle.setInteractive();
            if (gameSettings.levelStatus[levelNum] == 0) {
              
            } else if (gameSettings.levelStatus[levelNum] == '*') {
              levelTitle.setFrame(1);
            } else if (gameSettings.levelStatus[levelNum] == '**') {
              levelTitle.setFrame(2);
    
            } else if (gameSettings.levelStatus[levelNum] == '***') {
              levelTitle.setFrame(3);
    
            }
    
          }
    
    
    
          levelNum++;
          groupBox.add(levelTitle);
          groupBox.add(statusText);
        }
    
    
    
    
        groupBox.add(groupText);
    */
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
    this.scene.start('playGame')
  }



}