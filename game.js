let game;



window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, startGame, selectGame, playGame, endGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {
    if (gameMode == 0) { //classic
      gameOptions.rows = 8
      gameOptions.cols = 6
      this.initialTime = 90;
      this.replace = false;
    } else if (gameMode == 1) { //search
      gameOptions.rows = levels[onLevel].size.rows //13
      gameOptions.cols = levels[onLevel].size.cols //10
      this.initialTime = 120;
      this.replace = false;
    } else { //adventure
      gameOptions.cols = Phaser.Math.Between(5, 9)
      gameOptions.rows = Phaser.Math.Between(5, 9)
      this.initialTime = 90;
      this.replace = true;
    }
    this.dragging = false;

    this.cameras.main.setBackgroundColor(0x000000);
    var back = this.add.image(0, 0, 'back').setOrigin(0).setAlpha(.7)
    this.wordBack = this.add.image(gameOptions.offsetX, 175, 'blank').setOrigin(0, .5).setAlpha(.9)
    this.wordBack.displayWidth = 550;
    this.wordBack.displayHeight = 100;
    this.guessWordText = this.add.bitmapText(gameOptions.offsetX + 15, 175, 'lato', 'WORD', 92).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
    this.totalScoreText = this.add.bitmapText(game.config.width - gameOptions.offsetX, 70, 'lato', '0', 100).setOrigin(1, .5).setTint(0xff8045).setAlpha(1);
    this.wordValueText = this.add.bitmapText(game.config.width - gameOptions.offsetX, 175, 'lato', '0', 100).setOrigin(1, .5).setTint(0xffffff).setAlpha(1);
    this.statusText = this.add.bitmapText(gameOptions.offsetX, 90, 'lato', 'ready to begin', 50).setOrigin(0, .5).setTint(0xf5f5f5).setAlpha(1);
    this.puzzleProgress = 0
    this.foundWords = []
    this.totalScore = 0;
    this.scoreBuffer = 0
    this.tempCoinCount = gameSettings.coins
    this.puzzleCompleted = false

    this.blockSize = (game.config.width - (gameOptions.offsetX * 2)) / gameOptions.cols;
    this.createBoard()

    this.input.on("pointerdown", this.tileStart, this);
    this.input.on("pointermove", this.tileSelect, this);
    this.input.on("pointerup", this.tileEnd, this);
    this.graphics = this.add.graphics({
      lineStyle: {
        width: 10,
        color: 0x2db33c,
        alpha: 1
      }
    });
    this.graphicsSearch = this.add.graphics({
      lineStyle: {
        width: 10,
        color: 0x878787,
        alpha: .5
      }
    });
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
    this.makeMenu()
    //timer stuff

    this.timerText = this.add.bitmapText(gameOptions.offsetX, 1585, 'lato', this.formatTime(this.initialTime), 100).setOrigin(0, .5).setTint(0xff8045).setAlpha(1);
    //text = this.add.text(32, 32, 'Countdown: ' + formatTime(this.initialTime));
    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    //help icons
    this.timerIcon = this.add.image(675, 1585, 'timer').setInteractive()
    this.timerIcon.on('pointerdown', this.buyTime, this)
    //coin display
    this.coinIcon = this.add.image(game.config.width - gameOptions.offsetX, 1385, 'coin').setOrigin(1, .5).setScale(1.5);
    this.coinText = this.add.bitmapText(game.config.width - (gameOptions.offsetX + 60), 1385, 'lato', gameSettings.coins, 65).setOrigin(.5).setTint(0xf5f5f5).setAlpha(1);

    //search stuff
    if (gameMode == 1) {
      this.hintIcon = this.add.image(825, 1585, 'view').setInteractive()
      this.hintIcon.on('pointerdown', this.doHintWord, this)
      this.categoryText = this.add.bitmapText(gameOptions.offsetX, 1420, 'lato', groups[onGroup].title, 50).setOrigin(0, .5).setTint(0xff8045).setAlpha(1);
      this.clueText = this.add.bitmapText(gameOptions.offsetX, 1485, 'lato', levels[onLevel].theme, 65).setOrigin(0, .5).setTint(0xf5f5f5).setAlpha(1);
      this.puzzleCount = levels[onLevel].words.length
      this.puzzleCountText = this.add.bitmapText(game.config.width - 100, 1485, 'lato', this.puzzleCount, 65).setOrigin(0, .5).setTint(0xf5f5f5).setAlpha(1);
      this.tempWords = JSON.parse(JSON.stringify(levels[onLevel].words));

    }

  }
  update() {
    if (this.scoreBuffer > 0) {
      this.incrementScore();
      this.scoreBuffer--;
    }
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }
  onEvent() {
    this.initialTime -= 1; // One second

    this.timerText.setText(this.formatTime(this.initialTime));
    if (this.initialTime == 0) {
      this.timedEvent.paused = true;
      //alert('game over')
      gameSettings.coins = this.tempCoinCount;
      this.saveSettings()
      var data = {
        score: this.totalScore,
        outcome: 'lose'
      }
      if (gameMode == 1) {
        if (this.puzzleCompleted) {
          data.outcome = 'win'
        }
      }
      this.scene.start('endGame', data)
    }
  }
  incrementScore() {
    this.totalScore += 1;
    this.totalScoreText.setText(this.totalScore);
  }
  buyTime() {
    if (this.tempCoinCount >= 10) {
      var tween = this.tweens.add({
        targets: this.timerIcon,
        scale: .1,
        yoyo: true,
        duration: 125
      })
      this.initialTime += 25;
      this.subtractCoins(10)

    }

  }

  doHintWord() {
    if (gameMode != 1) {
      return
    }
    var tween = this.tweens.add({
      targets: this.hintIcon,
      scale: .1,
      yoyo: true,
      duration: 125
    })
    //for cheating/testing purposes
    for (var i = 0; i < this.tempWords.length; i++) {
      //console.log(this.tempWords[0]);
    }
    // if (this.coinCount > 10 && this.tempWords.length > 0) {
    // this.coinCount -= 10;
    // this.coinText.setText(this.coinCount);
    if (this.puzzleCount - this.puzzleProgress > 0) {
      var temptext = this.tempWords[0].toUpperCase() + ' (-10)';
      this.showToast(temptext);
    } else {
      this.showToast('Puzzle Completed')
    }



    //}
  }
  subtractCoins(count) {
    this.tempCoinCount -= 10;
    var tween = this.tweens.add({
      targets: this.coinText,
      scale: .1,
      yoyo: true,
      duration: 200,
      onYoyoScope: this,
      onYoyo: function () {
        this.coinText.setText(this.tempCoinCount)
      }
    })
    gameSettings.coins = this.tempCoinCount
    this.saveSettings()
  }
  addCoinCount(count) {
    this.tempCoinCount += count;
    var tween = this.tweens.add({
      targets: this.coinText,
      scale: .1,
      yoyo: true,
      duration: 200,
      onYoyoScope: this,
      onYoyo: function () {
        this.coinText.setText(this.tempCoinCount)
      }
    })

  }
  tileStart(e) {
    this.selected = [];
    this.coins = []
    this.traps = []
    this.guessWord = '';
    this.wordValue = 0;
    this.wordValueFinal = 0;
    this.currentBonus = 1

    this.base = 10
    let row = Math.floor((e.downY - gameOptions.offsetY) / this.blockSize);
    let col = Math.floor((e.downX - gameOptions.offsetX) / this.blockSize);
    if (this.validPick(row, col)) {
      //console.log(this.board[row][col].letter)
      this.guessWord += this.board[row][col].letter
      if (this.board[row][col].bonus > this.currentBonus) {
        this.currentBonus = this.board[row][col].bonus
      }
      if (this.board[row][col].coin) {
        this.coins.push({ row: row, col: col })
      }
      if (this.board[row][col].trap) {
        this.traps.push({ row: row, col: col })
      }
      this.wordValue += this.board[row][col].value
      this.guessWordText.setText(this.guessWord.toUpperCase())
      this.wordValueText.setText((this.wordValue * this.currentBonus) * this.base)
      this.addSelectedTile(row, col, this.board[row][col].value)
      this.board[row][col].image.setAlpha(1)
      this.board[row][col].image.displayWidth = this.blockSize - 15;
      this.board[row][col].image.displayHeight = this.blockSize - 15;

      this.dragging = true
    }

  }
  tileSelect(e) {
    if (this.dragging) {
      let row = Math.floor((e.y - gameOptions.offsetY) / this.blockSize);
      let col = Math.floor((e.x - gameOptions.offsetX) / this.blockSize);
      if (this.validPick(row, col)) {
        let distance = Phaser.Math.Distance.Between(e.x, e.y, this.board[row][col].image.x, this.board[row][col].image.y);
        if (distance < this.blockSize * 0.4) {
          if (this.notSelected(col, row) && this.areNext(col, row)) {
            //console.log('row' + row + ' col' + col);
            this.board[row][col].image.setAlpha(1)
            this.board[row][col].image.displayWidth = this.blockSize - 15;
            this.board[row][col].image.displayHeight = this.blockSize - 15;
            this.guessWord += this.board[row][col].letter
            if (this.board[row][col].bonus > this.currentBonus) {
              this.currentBonus = this.board[row][col].bonus
            }
            if (this.board[row][col].coin) {
              this.coins.push({ row: row, col: col })
            }
            if (this.board[row][col].trap) {
              this.traps.push({ row: row, col: col })
            }
            this.wordValue += this.board[row][col].value
            //console.log(this.guessWord.length)
            if (this.guessWord.length >= 6) {
              this.base = 20;
            }
            // this.wordValueFinal = (this.wordValue * this.currentBonus) * this.base
            this.wordValueFinal = (this.wordValue * this.base) * this.currentBonus
            this.guessWordText.setText(this.guessWord.toUpperCase())
            this.wordValueText.setText(this.wordValueFinal)
            var line = new Phaser.Geom.Line(this.board[this.selected[this.selected.length - 1].row][this.selected[this.selected.length - 1].col].image.x, this.board[this.selected[this.selected.length - 1].row][this.selected[this.selected.length - 1].col].image.y, this.board[row][col].image.x, this.board[row][col].image.y);
            //console.log(line)
            this.graphics.strokeLineShape(line);
            this.graphics.fillStyle(0x2db33c);

            this.graphics.fillPointShape(line.getPointA(), 10);
            this.graphics.fillStyle(0x2db33c);
            this.graphics.fillPointShape(line.getPointB(), 10);
            this.addSelectedTile(row, col, this.board[row][col].value)
          }
        }
      }

    }
  }
  tileEnd(e) {
    //console.log(this.selected)
    if (this.dragging) {
      this.dragging = false
      this.graphics.clear()
      var i = 0;

      var wordType = this.checkWord()
      //console.log(wordType)
      if (wordType == 0) { //too short
        this.wordValueText.setText('0')
        this.guessWordText.setText('')
        if(gameMode == 2){
          //console.log(this.selected)
          //this.swapTiles(this.selected)
        }
      } else if (wordType == 1 || wordType == 4) { //found puzzle or new word
        this.collectCoins()
        this.collectTraps()
        var six = (this.base == 20) ? ' + 6 bonus' : ''
        var text = this.currentBonus + 'x' + six
        if (Math.random() < .25) {
          this.addCoins(1)
        }
        if (gameMode == 2) {

          if (this.currentBonus == 2) {
            console.log('double')
            this.addDoubles(1)
          } else if (this.currentBonus == 3) {
            console.log('tripple')
            this.addTripples(1)
          }
        }
        this.statusText.setText(text)
        this.foundWords.push(this.guessWord)
        this.scoreBuffer += this.wordValueFinal
        if (wordType == 4) {
          var line = new Phaser.Geom.Line(this.board[this.selected[0].row][this.selected[0].col].image.x, this.board[this.selected[0].row][this.selected[0].col].image.y, this.board[this.selected[this.selected.length - 1].row][this.selected[this.selected.length - 1].col].image.x, this.board[this.selected[this.selected.length - 1].row][this.selected[this.selected.length - 1].col].image.y);
          this.graphicsSearch.strokeLineShape(line);
          var index = this.tempWords.indexOf(this.guessWord);
          if (index > -1) {
            this.tempWords.splice(index, 1);
          }
          //this.wordFindEmit(2);
          this.puzzleProgress++;
          var tween = this.tweens.add({
            targets: this.puzzleCountText,
            scale: 2,
            yoyo: true,
            duration: 250,
            onYoyoScope: this,
            onYoyo: function () {
              this.puzzleCountText.setText(this.puzzleCount - this.puzzleProgress)
            }
          })

          if (this.puzzleCount - this.puzzleProgress == 0) {
            this.puzzleCompleted = true
            this.showToast('Puzzle Completed')
            var tween = this.tweens.add({
              targets: this.clueText,
              alpha: 0,
              yoyo: true,
              duration: 250,
              delay: 500,
              onYoyoScope: this,
              onYoyo: function () {
                this.clueText.setText('Done!')
              }
            })
          }
        }
        var tween = this.tweens.add({
          targets: this.wordValueText,
          alpha: 0,
          duration: 150,
          yoyo: true,
          onYoyo: function () {
            this.wordValueText.setText('0')
          },
          onYoyoScope: this,
        })
      } else if (wordType == 2) { //word already found
        this.statusText.setText('already found')
        this.wordValueText.setText('0')
        this.guessWordText.setText('')

      } else if (wordType == 3) { //not a word
        this.statusText.setText('not a word')
        var tween = this.tweens.add({
          targets: this.guessWordText,
          x: '+=15',
          duration: 50,
          yoyo: true,
          onComplete: function () {
            this.wordValueText.setText('0')
            this.guessWordText.setText('')
          },
          onCompleteScope: this,
        })
      }
      for (i; i < this.selected.length; i++) {
        this.board[this.selected[i].row][this.selected[i].col].image.setAlpha(.9)
        this.board[this.selected[i].row][this.selected[i].col].image.displayWidth = this.blockSize;
        this.board[this.selected[i].row][this.selected[i].col].image.displayHeight = this.blockSize;
        /* if (this.board[this.selected[i].row][this.selected[i].col].bonus == 2) {
          console.log('double bonus')
        } else if (this.board[this.selected[i].row][this.selected[i].col].bonus == 3) {
          console.log('triple bonus')
        } */

        if (wordType == 1) {

          if (this.replace) {
            var img = this.board[this.selected[i].row][this.selected[i].col].image
            var tween = this.tweens.add({
              targets: img,
              x: game.config.width,
              y: 0,
              alpha: 0,
              duration: 250,
              onCompleteScope: this,
              onComplete: function () {

              }
            })

          }
        }

      }

      if (this.replace && wordType == 1) {
        this.replaceTiles()
      }


    }

  }

  checkWord() {
    if (this.guessWord.length < 3) {
      return 0
    } else if (this.foundWords.indexOf(this.guessWord) > -1) {
      //already found
      return 2
    } else if (gameMode == 1 && levels[onLevel].words.indexOf(this.guessWord) > -1) {
      //puzzle word
      return 4
    } else if (ScrabbleWordList.indexOf(this.guessWord) > -1) {
      //found word  
      return 1

    } else {
      //not a word
      return 3

    }
  }

  addSelectedTile(row, col, value) {
    var temp = { row: row, col: col, value: value }
    this.selected.push(temp)
  }
  replaceTiles() {
    console.log('replacing')
    for (var i = 0; i < this.selected.length; i++) {
      var row = this.selected[i].row
      var col = this.selected[i].col
      console.log(row + ',' + col)
      this.addTile(row, col)
    }
  }
  addTile(row, col) {
    var wLetter = this.getRandomLetter();
    var letterPosition = tileLetters.indexOf(wLetter);
    var block = this.add.image(gameOptions.offsetX + (this.blockSize * col) + this.blockSize / 2, gameOptions.offsetY + this.blockSize / 2 + (this.blockSize * row), 'letters', letterPosition).setAlpha(.9);
    block.displayWidth = 10;
    block.displayHeight = 10;

    this.board[row][col].image = block
    this.board[row][col].letter = wLetter
    this.board[row][col].index = letterPosition
    this.board[row][col].value = tileLettersValues[letterPosition]
    this.board[row][col].bonus = 1
    this.board[row][col].trap = false
    var tweens = this.tweens.add({
      targets: block,
      displayHeight: this.blockSize,
      displayWidth: this.blockSize,
      duration: 250
    })
  }
  swapTiles(tiles){
    var row1 = tiles[0].row
    var col1 = tiles[0].col
    var row2 = tiles[1].row
    var col2 = tiles[1].col
    var tween1 = this.tweens.add({
      targets: this.board[row1][col1].image,
      x: this.board[row2][col2].image.x,
      y: this.board[row2][col2].image.y,
      duration: 200,
    })
    var tween2 = this.tweens.add({
      targets: this.board[row2][col2].image,
      x: this.board[row1][col1].image.x,
      y: this.board[row1][col1].image.y,
      duration: 200,
    })
  }
  collectCoins() {
    if (this.coins.length == 0) { return }
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (this.boardPU[coin.row][coin.col] != null) {
        this.addCoinCount(1)
        var tween = this.tweens.add({
          targets: this.boardPU[coin.row][coin.col],
          scale: 0,
          angle: 360,
          x: this.coinText.x,
          y: this.coinText.y,
          duration: 650,
          onCompleteScope: this,
          onComplete: function () {
            this.boardPU[coin.row][coin.col].destroy()
            this.boardPU[coin.row][coin.col] = null;
          }
        })
      }

    }
  }
  collectTraps() {
    if (this.traps.length == 0) { return }
    for (let i = 0; i < this.traps.length; i++) {
      const trap = this.traps[i];
      if (this.boardPU[trap.row][trap.col] != null) {
        //this.addCoinCount(1)
        var tween = this.tweens.add({
          targets: this.boardPU[trap.row][trap.col],
          scale: 0,
          angle: 360,
          x: this.coinText.x,
          y: this.coinText.y,
          duration: 650,
          onCompleteScope: this,
          onComplete: function () {
            this.boardPU[trap.row][trap.col].destroy()
            this.boardPU[trap.row][trap.col] = null;
          }
        })
      }

    }
  }
  addDoubles(count) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, gameOptions.rows - 1)
      var col = Phaser.Math.Between(0, gameOptions.cols - 1)
      if (this.board[row][col].bonus == 1) {
        this.board[row][col].bonus = 2;
        this.board[row][col].image.setTint(0xd5f7d9)
        i++
      }
    }
  }
  addTripples(count) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, gameOptions.rows - 1)
      var col = Phaser.Math.Between(0, gameOptions.cols - 1)
      if (this.board[row][col].bonus == 1) {
        this.board[row][col].bonus = 3;
        this.board[row][col].image.setTint(0xffaba8)
        i++
      }
    }
  }
  addTraps(count) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, gameOptions.rows - 1)
      var col = Phaser.Math.Between(0, gameOptions.cols - 1)
      if (!this.board[row][col].coin && !this.board[row][col].trap) {
        this.board[row][col].trap = true;
        var block = this.add.image(gameOptions.offsetX + (this.blockSize * col) + this.blockSize / 2, gameOptions.offsetY + this.blockSize / 2 + (this.blockSize * row), 'trap').setAlpha(1).setDepth(3);
        block.displayWidth = this.blockSize;
        block.displayHeight = this.blockSize;
        this.boardPU[row][col] = block
        i++
      }
    }
  }
  addCoins(count) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, gameOptions.rows - 1)
      var col = Phaser.Math.Between(0, gameOptions.cols - 1)
      if (!this.board[row][col].coin) {
        this.board[row][col].coin = true;
        var block = this.add.image(gameOptions.offsetX + (this.blockSize * col) + this.blockSize / 2, gameOptions.offsetY + this.blockSize / 2 + (this.blockSize * row), 'coin').setAlpha(1);
        block.displayWidth = this.blockSize;
        block.displayHeight = this.blockSize;
        this.boardPU[row][col] = block
        i++
      }
    }
  }
  createBoard() {
    let orientationTypes = [['horizontal', 'vertical', 'diagonal'], ['horizontal', 'vertical', 'diagonal'], ['horizontal', 'horizontalBack', 'vertical', 'verticalUp', 'diagonal'], ['horizontal', 'horizontalBack', 'vertical', 'verticalUp', 'diagonal', 'diagonalUp', 'diagonalBack', 'diagonalUpBack']]
    puzzle = wordfind.newPuzzle(levels[onLevel].words, {
      height: gameOptions.rows,
      width: gameOptions.cols,
      orientations: orientationTypes[levels[onLevel].orient],
      fillBlanks: false,
      preferOverlap: levels[onLevel].overlap
    });
    this.board = [];
    this.boardPU = []
    for (var i = 0; i < gameOptions.rows; i++) {
      var col = [];
      var colPU = []
      for (var j = 0; j < gameOptions.cols; j++) {
        var wLetter = this.makeLetter(i, j)
        var letterPosition = tileLetters.indexOf(wLetter);
        var block = this.add.image(gameOptions.offsetX + (this.blockSize * j) + this.blockSize / 2, -75, 'letters', letterPosition).setAlpha(.9);
        block.displayWidth = this.blockSize;
        block.displayHeight = this.blockSize;
        var tile = {
          letter: wLetter,
          index: letterPosition,
          value: tileLettersValues[letterPosition],
          trap: false,
          image: block,
          coin: false,
          bonus: 1
        }
        var tween = this.tweens.add({
          targets: block,
          y: gameOptions.offsetY + this.blockSize / 2 + (this.blockSize * i),
          duration: 500,
          delay: j * 25
        })
        // block.value = 50
        col.push(tile);
        colPU.push(null)
      }
      this.board.push(col);
      this.boardPU.push(colPU)
    }
    this.addDoubles(3)
    this.addTripples(2)
    this.addCoins(4)
    if (gameMode == 2) {
      this.addTraps(2)
    }
    //
    //console.log(this.boardPU)
  }
  makeLetter(row, col) {
    if (gameMode == 1) {
      if (puzzle[row][col] == '') {
        return this.getRandomLetter();
      } else {
        return puzzle[row][col]
      }
    } else {
      return this.getRandomLetter();
    }

  }
  getRandomLetter() {
    let total = 0;
    for (let i = 0; i < lettersWeight.length; ++i) {
      total += lettersWeight[i][1];
    }

    const threshold = Math.random() * total;

    total = 0;
    for (let i = 0; i < lettersWeight.length - 1; ++i) {
      // Add the weight to our running total.
      total += lettersWeight[i][1];

      // If this value falls within the threshold, we're done!
      if (total >= threshold) {
        return lettersWeight[i][0];
      }
    }
  }
  validPick(row, col) {
    return row >= 0 && row < gameOptions.rows && col >= 0 && col < gameOptions.cols && this.board[row][col] != undefined;
  }//&& this.board[col][row].empty == false 
  notSelected(col, row) {
    for (var i = 0; i < this.selected.length; i++) {

      if (row == this.selected[i].row && col == this.selected[i].col) {
        return false;
      }
    }
    return true;
  }
  areNext(column, row) {
    var row2 = this.selected[this.selected.length - 1].row;
    var column2 = this.selected[this.selected.length - 1].col;
    return (Math.abs(row - row2) + Math.abs(column - column2) == 1) || (Math.abs(row - row2) == 1 && Math.abs(column - column2) == 1);
  }
  addScore() {
    this.events.emit('score');
  }
  toggleMenu() {

    if (this.menuGroup.y == 0) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: -270,
        duration: 500,
        ease: 'Bounce'
      })

    }
    if (this.menuGroup.y == -270) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: 0,
        duration: 500,
        ease: 'Bounce'
      })
    }
  }
  makeMenu() {
    ////////menu
    this.menuGroup = this.add.container().setDepth(3);
    var menuBG = this.add.image(game.config.width / 2, game.config.height - 85, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.8)
    menuBG.displayWidth = 300;
    menuBG.displayHeight = 600
    this.menuGroup.add(menuBG)
    var menuButton = this.add.image(game.config.width / 2, game.config.height - 40, "menu").setInteractive().setDepth(3);
    menuButton.on('pointerdown', this.toggleMenu, this)
    menuButton.setOrigin(0.5);
    this.menuGroup.add(menuButton);
    var homeButton = this.add.bitmapText(game.config.width / 2, game.config.height + 50, 'lato', 'HOME', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    homeButton.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('startGame')
    }, this)
    this.menuGroup.add(homeButton);
    var wordButton = this.add.bitmapText(game.config.width / 2, game.config.height + 140, 'lato', 'WORDS', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    wordButton.on('pointerdown', function () {
      var data = {
        yesWords: this.foundWords,
        noWords: this.notWords
      }
      this.scene.pause()
      this.scene.launch('wordsPlayed', data)
    }, this)
    this.menuGroup.add(wordButton);
    var helpButton = this.add.bitmapText(game.config.width / 2, game.config.height + 230, 'lato', 'RESTART', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    helpButton.on('pointerdown', function () {


      this.scene.start('playGame')
    }, this)
    this.menuGroup.add(helpButton);
    //var thankYou = game.add.button(game.config.width / 2, game.config.height + 130, "thankyou", function(){});
    // thankYou.setOrigin(0.5);
    // menuGroup.add(thankYou);    
    ////////end menu
  }
  showToast(text) {
    if (this.toastBox) {
      this.toastBox.destroy(true);
    }
    var toastBox = this.add.container().setDepth(2);
    var backToast = this.add.image(0, 0, 'blank').setDepth(2).setTint(0x000000);
    backToast.setAlpha(.9);
    backToast.displayWidth = 700;
    backToast.displayHeight = 90;
    toastBox.add(backToast);
    toastBox.setPosition(game.config.width / 2, -100);
    var toastText = this.add.bitmapText(20, 0, 'lato', text, 70,).setTint(0xfafafa).setOrigin(.5, .5).setDepth(2);
    toastText.setMaxWidth(game.config.width - 10);
    toastBox.add(toastText);
    this.toastBox = toastBox;
    this.tweens.add({
      targets: this.toastBox,
      //alpha: .5,
      y: 95,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.time.addEvent({
          delay: 2500,
          callback: this.hideToast,
          callbackScope: this
        });
      }
    });
    //this.time.addEvent({delay: 2000, callback: this.hideToast, callbackScope: this});
  }
  hideToast() {
    this.tweens.add({
      targets: this.toastBox,
      //alpha: .5,
      y: -95,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.toastBox.destroy(true);
      }
    });

  }
  saveSettings() {
    localStorage.setItem('waSave', JSON.stringify(gameSettings))
  }
}
