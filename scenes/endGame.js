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
		} else if (gameMode == 1) { //search
			var mode = 'Search'
		} else { //adventure
			var mode = 'Adventure'
		}

		var title = this.add.bitmapText(150, 100, 'lato', 'GAME OVER', 100).setOrigin(0, .5).setTint(0xfa983c);
		var title2 = this.add.bitmapText(150, 175, 'lato', mode, 80).setOrigin(0, .5).setTint(0xFFFFFF);

		var score = this.add.bitmapText(150, 675, 'lato', this.score, 100).setOrigin(0, .5).setTint(0xFFFFFF);

		if (gameMode == 0) { //classic
			if (gameSettings.classicHigh < this.score) {
				gameSettings.classicHigh = this.scroe
			}
		} else if (gameMode == 1) { //search
			if (gameSettings.searchHigh < this.score) {
				gameSettings.searchHigh = this.scroe
			}
		} else { //adventure
			if (gameSettings.adventureHigh < this.score) {
				gameSettings.adventureHigh = this.scroe
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

