class endGame extends Phaser.Scene {
	constructor() {
		super("endGame");
	}
	preload() {



	}
	init(data) {
		this.score = data.score
		this.outcome = data.outcome;

	}
	create() {
		this.cameras.main.fadeIn(1000, 0, 0, 0)
		this.cameras.main.setBackgroundColor(0xf7eac6);
		var back = this.add.image(0, 0, 'back').setOrigin(0)

		if (gameMode == 0) { //classic
			var mode = 'Classic'
			var highScore = gameSettings.classicHigh
		} else if (gameMode == 1) { //search
			var mode = 'Search'
			var highScore = gameSettings.searchHigh
		} else { //adventure
			var mode = 'Adventure'
			var highScore = gameSettings.adventureHigh
		}

		var title = this.add.bitmapText(150, 100, 'lato', 'GAME OVER', 100).setOrigin(0, .5).setTint(0xfa983c);
		var title2 = this.add.bitmapText(150, 175, 'lato', mode, 80).setOrigin(0, .5).setTint(0xFFFFFF);
		if (gameMode == 1) {
			if (this.outcome == 'win') {
				if (onLevel > gameSettings.highestSolved) {
					gameSettings.highestSolved = onLevel
				}
				if (this.score > gameSettings.results[levels[onLevel].key].best) {
					gameSettings.results[levels[onLevel].key].best = this.score
				}
				var outcome = this.add.bitmapText(450, 375, 'lato', 'Puzzle Solved!', 120).setOrigin(.5).setTint(0xFFFFFF);
				if (this.score < 2000) {
					var stars = '*'
					gameSettings.results[levels[onLevel].key].stars = 1
				} else if (this.score < 4000) {
					var stars = '* *'
					gameSettings.results[levels[onLevel].key].stars = 2
				} else {
					var stars = '* * *'
					gameSettings.results[levels[onLevel].key].stars = 3
				}
				var starText = this.add.bitmapText(1150, 525, 'lato', stars, 200).setOrigin(.5).setTint(0xfa983c);
				var tween = this.tweens.add({
					targets: starText,
					x: 450,
					duration: 300,
					delay: 2500,
					ease: 'Bounce'
				})

			} else {
				var outcome = this.add.bitmapText(450, 375, 'lato', 'Keep Trying', 120).setOrigin(.5).setTint(0xFFFFFF);

			}
		}
		this.scoreText = this.add.bitmapText(1450, 675, 'lato', this.score.toLocaleString(), 160).setOrigin(.5).setTint(0xFFFFFF);
		var tween = this.tweens.add({
			targets: this.scoreText,
			x: 450,
			duration: 750,
			delay: 1000,
			ease: 'Bounce'
		})


		var scoreHigh = this.add.bitmapText(450, 875, 'lato', 'High: ' + highScore.toLocaleString(), 100).setOrigin(.5).setTint(0xFFFFFF);

		if (gameMode == 0) { //classic
			if (gameSettings.classicHigh < this.score) {
				gameSettings.classicHigh = this.score
				this.newHigh()
			}
		} else if (gameMode == 1) { //search
			if (gameSettings.searchHigh < this.score) {
				gameSettings.searchHigh = this.score
				this.newHigh()
			}
		} else { //adventure
			if (gameSettings.adventureHigh < this.score) {
				gameSettings.adventureHigh = this.score
				this.newHigh()
			}
		}
		this.saveSettings()
		this.newBest = false;

		var homeText = this.add.bitmapText(450, 1475, 'lato', '[home]', 80).setOrigin(.5).setTint(0xFFFFFF).setInteractive();
		homeText.on('pointerdown', function () {
			this.scene.start('startGame')
		}, this)
		//this.previewBox.add(star); 


	}
	newHigh() {
		this.newText = this.add.bitmapText(900, -150, 'lato', 'NEW', 70).setOrigin(.5).setTint(0xfa983c);
		var tween = this.tweens.add({
			targets: this.newText,
			x: 725,
			y: 645,
			angle: 360,
			duration: 500,
			delay: 1500
		})
	}
	play() {
		this.scene.stop('playGame');
		this.scene.stop('endGame');
		this.scene.stop('UI');
		if (gameMode == 'challenge') {
			this.scene.start('selectGame')
		} else {
			this.scene.start('startGame')
		}
	}
	cancel() {
		this.scene.stop();
		this.scene.restart('playGame');
		this.scene.restart('UI');
	}
	saveSettings() {
		localStorage.setItem('waSave', JSON.stringify(gameSettings))
	}

}

