const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: "#FFF",
  parent: "game-screen",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: { preload, create, update }
};

let player, cursors;
let score = 0;
let inputState = { left: false, right: false, up: false };
let lives = 3;
let hearts;
let items;
let gameOver = false;
let gameClear = false;
let maxItems = 10;
let gameTime = 0;
let wasd;

let gameScene;

let backgrounds = [];
let activeBgIndex = 0;

new Phaser.Game(config);

function preload() {
  this.load.image("ground", "asset/images/ground.png");
  this.load.image("star", "https://labs.phaser.io/assets/sprites/star.png");
  this.load.spritesheet("ham", "asset/images/ham.png", { frameWidth: 42, frameHeight: 50 });
  this.load.image("donut", "asset/images/donut.png");
  this.load.image("candy", "asset/images/candy.png");
  this.load.image("bomb", "asset/images/bomb.png");
  this.load.image("heart", "asset/images/heart.png");
  this.load.image("heart_empty", "asset/images/heart_empty.png");
  this.load.image("bg01", "asset/images/default_bg03.png");
  this.load.image("bg02", "asset/images/default_bg02.png");
  this.load.image("bg03", "asset/images/default_bg.png");
}

function create() {
  gameScene = this;

  gameScreen = document.getElementById('game-screen');
  startScreen = document.getElementById('start-screen');
  gameOverScreen = document.getElementById('game-over-screen');
  gameClearScreen = document.getElementById('game-clear-screen');

  const bg1 = this.add.image(0, 0, "bg01").setOrigin(0, 0).setAlpha(0);
  const bg2 = this.add.image(0, 0, "bg02").setOrigin(0, 0).setAlpha(0);
  const bg3 = this.add.image(0, 0, "bg03").setOrigin(0, 0).setAlpha(0);
  backgrounds = [bg1, bg2, bg3];

  // ★初期化処理：リスタートでも最初の背景に戻す
  activeBgIndex = 0;
  backgrounds.forEach((bg, i) => bg.setAlpha(i === 0 ? 1 : 0));

  // アニメーションを一度だけ作成
  setupAnimations(this);

  // player 生成
  player = this.physics.add.sprite(100, 100, "ham");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);


  const ground = this.physics.add.staticGroup();
  ground.create(240, 639, "ground").setScale(2).refreshBody();

  cursors = this.input.keyboard.createCursorKeys();

  wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  this.physics.add.collider(player, ground);

  const emptyHearts = this.add.group({
    key: 'heart_empty',
    repeat: lives - 1,
    setXY: { x: 20, y: 20, stepX: 35 }
  });

  hearts = this.add.group({
    key: 'heart',
    repeat: lives - 1,
    setXY: { x: 20, y: 20, stepX: 35 }
  });

  items = this.physics.add.group();

  this.physics.add.overlap(items, ground, destroyItem, null, this);
  this.physics.add.overlap(player, items, collectItem, null, this);

  this.time.addEvent({
    delay: 10000,
    callback: () => {
      const currentBg = backgrounds[activeBgIndex];
      const nextBgIndex = (activeBgIndex + 1) % backgrounds.length;
      const nextBg = backgrounds[nextBgIndex];

      this.tweens.add({
        targets: nextBg,
        alpha: 1,
        duration: 2000,
      });

      this.tweens.add({
        targets: currentBg,
        alpha: 0,
        duration: 2000,
      });

      activeBgIndex = nextBgIndex;
    },
    loop: true
  });

  this.time.addEvent({
    delay: 500,
    callback: checkAndSpawn,
    callbackScope: this,
    loop: true
  });

  this.input.once('pointerdown', () => {
    this.sound.context.resume();
  });

  setupMobileControls();
}

function setupAnimations(scene) {
  if (!scene.anims.exists("left")) {
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("ham", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  if (!scene.anims.exists("turn")) {
    scene.anims.create({
      key: "turn",
      frames: [{ key: "ham", frame: 4 }],
      frameRate: 20
    });
  }

  if (!scene.anims.exists("right")) {
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("ham", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
}

function destroyItem(item) {
  item.disableBody(true, true);
}

function restartGame() {
  gameOverScreen.style.display = 'none';
  gameClearScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  score = 0;
  lives = 3;
  gameOver = false;
  gameClear = false;
  gameTime = 0;

  document.getElementById("score").textContent = "SCORE: 0";

  // シーンを再起動し、ゲームの状態をリセット
  gameScene.scene.restart();

  // ★追加★ 再開後に物理エンジンを resume
  gameScene.physics.resume();
}

function checkAndSpawn() {
  if (items.countActive(true) < maxItems) {
    if (gameTime < 3000) {
      if (items.countActive(true) < 1) {
        spawnItem.call(this);
      }
    } else {
      spawnItem.call(this);
    }
  }
}

function spawnItem() {
  if (gameOver) {
    return;
  }
  const itemKeys = ['donut', 'candy', 'bomb'];
  const randomItemKey = Phaser.Utils.Array.GetRandom(itemKeys);
  const x = Phaser.Math.Between(0, 480);
  const item = items.create(x, 0, randomItemKey);
  item.body.allowGravity = false;

  const slowSpeed = 50;
  const normalSpeed = 100;
  const fastSpeed = 150;
  const speeds = [slowSpeed, normalSpeed, fastSpeed];
  const randomSpeed = Phaser.Utils.Array.GetRandom(speeds);

  item.setVelocityY(randomSpeed);
  item.originalSpeed = randomSpeed;
}

function collectItem(player, item) {
  item.disableBody(true, true);
  this.time.delayedCall(Phaser.Math.Between(300, 800), checkAndSpawn, [], this);

  if (item.texture.key === 'bomb') {
    if (lives > 0) {
      lives--;
      hearts.children.entries[lives].setActive(false).setVisible(false);
    }

    if (lives === 0 && !gameOver) {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
      gameScreen.style.display = 'none';
      gameOverScreen.style.display = 'flex';
      document.getElementById('final-score-over').textContent = score;
    }
  } else {
    if (item.texture.key === 'candy') {
      score += 3;
    } else if (item.texture.key === 'donut') {
      score += 9;
    }
    document.getElementById("score").textContent = "SCORE: " + score;
  }
}

function update(time, delta) {
  gameTime += delta;

  if (gameOver) {
    return;
  }
  if (!cursors) {
    return;
  }
  const left = cursors.left.isDown || inputState.left || wasd.left.isDown;
  const right = cursors.right.isDown || inputState.right || wasd.right.isDown;
  const up = cursors.up.isDown || cursors.space.isDown || inputState.up || wasd.up.isDown;
  const down = cursors.down.isDown || wasd.down.isDown;

  if (left) {
    player.setVelocityX(-260);
    player.anims.play("left", true);
  } else if (right) {
    player.setVelocityX(260);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (up && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  if (down) {
    items.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed * 2);
      }
    });
  } else {
    items.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed);
      }
    });
  }

  if (score >= 100 && !gameClear) {
    this.physics.pause();
    gameClear = true;

    gameScreen.style.display = 'none';
    gameClearScreen.style.display = 'flex';
    document.getElementById('final-score-clear').textContent = score;
  }
}

function setupMobileControls() {
  document.getElementById("leftBtn").addEventListener("touchstart", () => inputState.left = true);
  document.getElementById("leftBtn").addEventListener("touchend", () => inputState.left = false);

  document.getElementById("rightBtn").addEventListener("touchstart", () => inputState.right = true);
  document.getElementById("rightBtn").addEventListener("touchend", () => inputState.right = false);

  document.getElementById("jumpBtn").addEventListener("touchstart", () => inputState.up = true);
  document.getElementById("jumpBtn").addEventListener("touchend", () => inputState.up = false);
}

window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const restartButtonOver = document.getElementById('restart-button-over');
    const restartButtonClear = document.getElementById('restart-button-clear');
    const backButtonOver = document.getElementById('back-button-over');   // ★追加
    const backButtonClear = document.getElementById('back-button-clear'); // ★追加

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        gameScene.physics.resume();
    });

    restartButtonOver.addEventListener('click', restartGame);
    restartButtonClear.addEventListener('click', restartGame);

    // ★追加：スタートに戻るボタン
    backButtonOver.addEventListener('click', backToStart);
    backButtonClear.addEventListener('click', backToStart);

    setupMobileControls(); // ← これも一度だけでOK
});

function backToStart() {
    // 全画面リセット
    gameOverScreen.style.display = 'none';
    gameClearScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';

    // ゲーム状態リセット
    score = 0;
    lives = 3;
    gameOver = false;
    gameClear = false;
    gameTime = 0;
    document.getElementById("score").textContent = "SCORE: 0";

    // シーン再起動
    gameScene.scene.restart();
    gameScene.physics.pause(); // ★スタート画面では止めておく
}

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}

window.addEventListener('DOMContentLoaded', () => {
  if (isTouchDevice()) {
    document.getElementById('controls').style.display = 'flex';
  }
});
