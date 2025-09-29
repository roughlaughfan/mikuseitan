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


let score = 0;
let inputState = { left: false, right: false, up: false };
let lives = 3;
let hearts;
let items;
let gameOver = false;
let gameClear = false;
let maxNormalItems = 15;  // 通常アイテムの上限
let normalItems;
let eventItems;
let gameTime = 0;
let wasd;
let player;

let gameScene;

let backgrounds = [];
let activeBgIndex = 0;

let backgrounds_str = [];

const phaserGame = new Phaser.Game(config);

// ---------- 追加グローバル変数（ファイル上部に置く） ----------
let eventTimers = [];              // Phaser.TimerEvent を格納
let inSpecialEvent = false;        // 汎用イベントフラグ（①②③全部）
let inKatakanaEvent = false;       // イベント③フラグ（通常アイテム停止用）
let katakanaPatternIndex = 0;      // どの単語を使うか
let specialCycleCount = 0;         // イベントサイクルの回数（2回目で順番変える判定に使う）
let katBgQueue = [];               // 背景キュー（シャッフルして回す）
let katBgFirstIndexByDifficulty = { easy: 0, normal: 1, hard: 2 }; // 例：難易度に応じた最初の背景インデックス
let maxCols = 0;                   // 横列生成で使う列数（create() で初期化）
const cellSize = 30;               // 1マス幅（爆弾の見た目に合わせて調整）
// katakanaWords は既存の参照JSから引っ張れます。ここでは既存の配列を使う前提。

let gameStarted = false; // ゲーム開始フラグ
let bgm = null;


function preload() {
  this.load.image("ground", "asset/images/ground.png");
  this.load.image("star", "asset/images/star.png");
  this.load.spritesheet("ham", "asset/images/ham.png", { frameWidth: 42, frameHeight: 50 });
  this.load.image("donut", "asset/images/donut.png");
  this.load.image("candy", "asset/images/candy.png");
  this.load.image("bomb", "asset/images/bomb.png");
  this.load.image("heart", "asset/images/heart.png");
  this.load.image("heart_empty", "asset/images/heart_empty.png");
  this.load.image("bg01", "asset/images/default_bg03.png");
  this.load.image("bg02", "asset/images/default_bg02.png");
  this.load.image("bg03", "asset/images/default_bg.png");
  this.load.image("s_bg01", "asset/images/bg01.png");
  this.load.image("s_bg02", "asset/images/bg02.png");
  this.load.image("s_bg03", "asset/images/bg03.png");
  this.load.image("s_bg04", "asset/images/bg04.png");
  this.load.image("s_bg05", "asset/images/bg05.png");
  this.load.audio('bgm', 'asset/sounds/bgm.mp3');
  this.load.audio('se_item', 'asset/sounds/item.mp3');     // ドーナツ & キャンディ
  this.load.audio('se_star', 'asset/sounds/star.mp3');     // 星
  this.load.audio('se_bomb', 'asset/sounds/bomb.mp3');     // 爆弾
  this.load.audio('se_gameover', 'asset/sounds/gameover.mp3');
  this.load.audio('se_clear', 'asset/sounds/clear.mp3');
  this.load.audio('se_jump', 'asset/sounds/jump.mp3');
}



// カタカナ形状定義（7×7ドット、1マス=30px）
const katakanaPatterns = {
  "フ": [
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [5, 2],
    [5, 3],
    [4, 4],
    [3, 5],
    [1, 6], [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ジ": [
    [0, 0], [2, 0], [4, 0], [6, 0],
    [1, 1],
    [0, 2], [4, 2],
    [1, 3], [5, 3],
    [4, 4],
    [3, 5],
    [0, 6], [1, 6], [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "サ": [
    [2, 0], [4, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
    [2, 2], [4, 2],
    [2, 3], [4, 3],
    [5, 4],
    [4, 5],
    [2, 6], [3, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "キ": [
    [3, 0],
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [3, 2],
    [3, 3],
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
    [3, 5],
    [3, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ミ": [
    [1, 0], [2, 0], [3, 0],
    [4, 1], [5, 1],
    [2, 2],
    [3, 3], [4, 3],
    [1, 5], [2, 5], [3, 5],
    [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ク": [
    [2, 0],
    [2, 1], [3, 1], [4, 1], [5, 1],
    [1, 2], [5, 2],
    [0, 3], [6, 3],
    [4, 4],
    [3, 5],
    [1, 6], [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "オ": [
    [4, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
    [4, 2],
    [3, 3], [4, 3],
    [2, 4], [4, 4],
    [0, 5], [1, 5], [4, 5],
    [3, 6], [4, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "タ": [
    [2, 0],
    [2, 1], [3, 1], [4, 1], [5, 1],
    [1, 2], [5, 2],
    [0, 3], [2, 3], [4, 3], [6, 3],
    [4, 4],
    [3, 5],
    [1, 6], [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ン": [
    [1, 0],
    [2, 1],
    [6, 2],
    [6, 3],
    [5, 4],
    [4, 5],
    [1, 6], [2, 6], [3, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ョ": [
    [1, 2], [2, 2], [3, 2], [4, 2],
    [4, 3],
    [2, 4], [3, 4], [4, 4],
    [4, 5],
    [1, 6], [2, 6], [3, 6], [4, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ウ": [
    [2, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [0, 2], [5, 2],
    [5, 3],
    [4, 4],
    [3, 5],
    [1, 6], [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ビ": [
    [0, 0], [3, 0], [5, 0], [7, 0],
    [0, 1],
    [0, 2], [3, 2], [4, 2],
    [0, 3], [1, 3], [2, 3], [3, 3],
    [0, 4],
    [0, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "メ": [
    [5, 0],
    [5, 1],
    [1, 2], [2, 2], [3, 2], [5, 2],
    [4, 3],
    [3, 4], [5, 4],
    [2, 5], [5, 5],
    [0, 6], [1, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "デ": [
    [1, 0], [2, 0], [3, 0], [4, 0], [6, 0],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),

  "ト": [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3], [3, 3], [4, 3],
    [2, 4], [4, 4],
    [2, 5],
    [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "チ": [
    [4, 0], [5, 0],
    [1, 1], [2, 1], [3, 1],
    [3, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [3, 4],
    [3, 5],
    [2, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ャ": [
    [2, 2],
    [2, 3], [3, 3], [4, 3], [5, 3],
    [2, 4], [5, 4],
    [2, 5], [5, 5],
    [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "セ": [
    [2, 0],
    [2, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
    [2, 3], [6, 3],
    [2, 4], [5, 4],
    [2, 5],
    [3, 6], [4, 6], [5, 6], [6, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "イ": [
    [5, 0],
    [4, 1],
    [3, 2],
    [2, 3], [3, 3],
    [0, 4], [1, 4], [3, 4],
    [3, 5],
    [3, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "2": [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
    [0, 1], [6, 1],
    [6, 2],
    [3, 3], [4, 3],
    [1, 4], [2, 4],
    [0, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "0": [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
    [0, 1], [6, 1],
    [0, 2], [4, 2], [5, 2],
    [0, 3], [1, 3], [4, 3], [5, 3],
    [0, 4], [1, 4], [6, 4],
    [0, 5], [6, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "5": [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
    [0, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [0, 3], [5, 3],
    [5, 4],
    [0, 5], [5, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ポ": [
    [3, 0], [5, 0],
    [3, 1], [4, 1], [6, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [5, 2],
    [3, 3],
    [1, 4], [3, 4], [5, 4],
    [0, 5], [3, 5], [6, 5],
    [2, 6], [3, 6],
  ].map(([x, y]) => [x * 30, y * 30]),
  "ス": [
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [5, 2],
    [4, 3],
    [4, 4],
    [2, 5], [3, 5], [5, 5],
    [0, 6], [1, 6], [6, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ー": [
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ハ": [
    [2, 1], [4, 1],
    [2, 2], [5, 2],
    [2, 3], [5, 3],
    [1, 4], [6, 4],
    [1, 5], [6, 5],
    [0, 6], [6, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ュ": [
    [2, 3], [3, 3], [4, 3],
    [4, 4],
    [4, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "シ": [
    [1, 0], [6, 0],
    [2, 1], [6, 1],
    [1, 2], [6, 2],
    [2, 3], [6, 3],
    [5, 4],
    [4, 5],
    [1, 6], [2, 6], [3, 6],
  ].map(([x, y]) => [x * 30, y * 30]),
  "ブ": [
    [3, 0], [5, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [5, 2],
    [5, 3],
    [4, 4],
    [3, 5],
    [1, 6], [2, 6],
  ].map(([x, y]) => [x * 30, y * 30]),
  "ヤ": [
    [2, 0],
    [2, 1], [4, 1], [5, 1], [6, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [6, 2],
    [2, 3], [5, 3],
    [3, 4],
    [3, 5],
    [3, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "エ": [
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]
  ].map(([x, y]) => [x * 30, y * 30]),
  "コ": [
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ].map(([x, y]) => [x * 30, y * 30]),
  "ナ": [
    [3, 0],
    [3, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
    [3, 3],
    [3, 4],
    [2, 5],
    [1, 6],
  ].map(([x, y]) => [x * 30, y * 30]),
};

// ========= 出す順番（単語リスト） =========
let katakanaWords = [
  ["フ", "ジ", "サ", "キ", "ミ", "ク"],
  ["タ", "ン", "ジ", "ョ", "ウ", "ビ"],
  ["オ", "メ", "デ", "ト", "ウ"]
];

class FlipPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  constructor(game) {
    super({
      game,
      fragShader: `
      precision mediump float;
      uniform sampler2D uMainSampler;
      uniform float uRotation;
      varying vec2 outTexCoord;
      void main() {
        vec2 uv = outTexCoord - 0.5;
        float a = uRotation; // expecting radians
        float ca = cos(a);
        float sa = sin(a);
        float rx = uv.x * ca;
        float depth = abs(uv.x * sa);
        float perspective = 1.0 / (1.0 + 0.5 * depth);
        vec2 mapped = vec2(rx, uv.y) * perspective + 0.5;
        if (mapped.x < 0.0 || mapped.x > 1.0 || mapped.y < 0.0 || mapped.y > 1.0) {
          gl_FragColor = vec4(0.0,0.0,0.0,0.0);
          return;
        }
        vec4 color = texture2D(uMainSampler, mapped);
        float shading = 0.5 + 0.5 * ca;
        color.rgb *= mix(0.6, 1.0, shading);
        gl_FragColor = color;
      }
      `,
      uniforms: ['uProjectionMatrix', 'uMainSampler', 'uRotation']
    });
    // pipeline 用プロパティ（任意）
    this.rotation = 0;
  }

  onPreRender() {
    // Phaser のバージョンに合わせて set1f を使用する例（安定）
    if (typeof this.set1f === 'function') {
      this.set1f('uRotation', this.rotation || 0);
    } else if (typeof this.setFloat1 === 'function') {
      this.setFloat1('uRotation', this.rotation || 0);
    }
  }
}


function create() {
  console.log('this.renderer:', this.renderer);
  console.log('this.game.renderer:', this.game && this.game.renderer);
  console.log('renderer.addPipeline exists?:', this.game && this.game.renderer && typeof this.game.renderer.addPipeline);
  console.log('Renderer type (number):', this.game && this.game.renderer && this.game.renderer.type);
  console.log('Phaser.WEBGL constant:', Phaser.WEBGL);
  console.log('Is WebGL available on window:', !!window.WebGLRenderingContext);



  // 効果音を変数に保持（後で呼び出しやすくする）
  this.se_item = this.sound.add('se_item');
  this.se_star = this.sound.add('se_star');
  this.se_bomb = this.sound.add('se_bomb');
  this.se_gameover = this.sound.add('se_gameover');
  this.se_clear = this.sound.add('se_clear');
  this.se_jump = this.sound.add('se_jump');



  gameScene = this;
  gameScene.physics.resume();

  // ★追加★ ここで変数を初期化
  lives = 3;
  score = 0;
  gameOver = false;
  gameClear = false;
  gameTime = 0;
  setDifficulty(difficulty);



  gameOverScreen = document.getElementById('game-over-screen');
  gameClearScreen = document.getElementById('game-clear-screen');

  const bg1 = this.add.image(0, 0, "bg01").setOrigin(0, 0).setAlpha(0);
  const bg2 = this.add.image(0, 0, "bg02").setOrigin(0, 0).setAlpha(0);
  const bg3 = this.add.image(0, 0, "bg03").setOrigin(0, 0).setAlpha(0);
  backgrounds = [bg1, bg2, bg3];


  const s_bg1 = this.add.image(0, 0, "s_bg01").setOrigin(0, 0).setAlpha(0);
  const s_bg2 = this.add.image(0, 0, "s_bg02").setOrigin(0, 0).setAlpha(0);
  const s_bg3 = this.add.image(0, 0, "s_bg03").setOrigin(0, 0).setAlpha(0);
  const s_bg4 = this.add.image(0, 0, "s_bg04").setOrigin(0, 0).setAlpha(0);
  const s_bg5 = this.add.image(0, 0, "s_bg05").setOrigin(0, 0).setAlpha(0);
  backgrounds_str = [s_bg1, s_bg2, s_bg3, s_bg4, s_bg5];

  // create() の先頭付近に入れる（FlipPipeline クラス定義の後）
  const renderer = (this.game && this.game.renderer) ? this.game.renderer : this.renderer;

  // Try modern pipelines API first, then legacy addPipeline, else fallback
  // if (renderer && renderer.pipelines && typeof renderer.pipelines.add === 'function') {
  //   this.flipPipeline = renderer.pipelines.add('FlipY', new FlipPipeline(this.game));
  //   console.log('Flip pipeline registered (pipelines.add):', !!this.flipPipeline);
  // } else if (renderer && typeof renderer.addPipeline === 'function') {
  //   // 古いバージョンの互換処理（稀）
  //   this.flipPipeline = renderer.addPipeline('FlipY', new FlipPipeline(this.game));
  //   console.log('Flip pipeline registered (addPipeline):', !!this.flipPipeline);
  // } else {
  //   console.warn('Flip pipeline not available — falling back to scaleX flip.');
  //   this.flipPipeline = null;
  // }


  if (renderer && typeof renderer.addPipeline === 'function') {
    // WebGL renderer で addPipeline が使える場合
    try {
      this.flipPipeline = this.renderer.pipelines.add(
        'flipPipeline',
        new FlipPipeline(this.game)
      );
      console.log('Flip pipeline registered (pipelines.add):', !!this.flipPipeline);
    } catch (e) {
      console.warn('Pipeline unavailable, falling back to scaleX flip:', e);
      this.flipPipeline = null;
    }
  } else {
    // Pipeline API が無い -> Canvas renderer の可能性または環境依存
    console.warn('addPipeline not available. Renderer:', renderer);
    console.warn('Pipeline (WebGL) is unavailable — falling back to scaleX flip.');
  }




  // ★初期化処理：リスタートでも最初の背景に戻す
  activeBgIndex = 0;
  backgrounds.forEach((bg, i) => bg.setAlpha(i === 0 ? 1 : 0));

  // アニメーションを一度だけ作成
  setupAnimations(this);

  // player 生成
  player = this.physics.add.sprite(100, 100, "ham");
  player.setBounce(0.2);
  player.setDepth(10);
  player.setCollideWorldBounds(true);

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

  normalItems = this.physics.add.group();
  eventItems = this.physics.add.group();

  // normalItems と地面の衝突判定
  this.physics.add.overlap(normalItems, ground, destroyItem, null, this);
  // eventItems と地面の衝突判定
  this.physics.add.overlap(eventItems, ground, destroyItem, null, this);

  this.physics.add.overlap(player, normalItems, collectItem, null, this);
  this.physics.add.overlap(player, eventItems, collectEventItem, null, this);


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

  startSpawnTimer(this);

  this.input.once('pointerdown', () => {
    this.sound.context.resume();
  });

  setupMobileControls();

  // 特殊イベント用初期化
  maxCols = Math.floor(config.width / cellSize);
  katBgQueue = [];
  startSpecialEventLoop(this);

  if (!gameStarted) {
    this.physics.pause();
  }
}



// ===== 難易度設定用パラメータ =====
let difficulty = "normal";  // "easy", "normal", "hard" など切替予定
let speedBase = 100;        // 初期スピード
let speedIncrease = 20;     // 上昇幅
let speedInterval = 10000;  // 上昇間隔（ms）

// 難易度ごとにパラメータを調整
function setDifficulty(level) {
  difficulty = level;
  if (level === "easy") {
    speedBase = 80;
    speedIncrease = 15;
    speedInterval = 12000;
  } else if (level === "normal") {
    speedBase = 100;
    speedIncrease = 20;
    speedInterval = 10000;
  } else if (level === "hard") {
    speedBase = 120;
    speedIncrease = 25;
    speedInterval = 8000;
  }
}

// ===== 無敵関連 =====
let isInvincible = false;
let invincibleTimer = null;
let blinkFrame = 0;


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

// ---------- ヘルパー：全てのイベントタイマーをクリア ----------
function clearAllEventTimers(scene) {
  // Phaser の TimerEvent をキャンセル
  eventTimers.forEach(t => {
    try { t.remove(false); } catch (e) { /* ignore */ }
  });
  eventTimers = [];
}

// ---------- 特殊列（イベント①／②）を生成（Phaser 用） ----------
function spawnPatternRowPhaser(scene) {
  // 横に爆弾を並べる。穴はランダムに 3 マス分開ける（プレイヤーがすり抜ける幅）
  const cols = maxCols || Math.floor(config.width / cellSize);
  const hole = Phaser.Math.Between(0, Math.max(0, cols - 3)); // hole は 0..cols-3
  const startX = (config.width - cols * cellSize) / 2; // 中央寄せ
  // 速度は現在の経過時間に基づく
  const levelUp = Math.floor(gameTime / speedInterval);
  const currentSpeed = speedBase + levelUp * speedIncrease;

  for (let i = 0; i < cols; i++) {
    // hole..hole+2 が空く
    if (i >= hole && i <= hole + 2) continue;
    const x = startX + i * cellSize + cellSize / 2;
    const bomb = eventItems.create(x, -40, 'bomb'); // ★ eventItems を使用
    bomb.setDepth(5);
    bomb.body.allowGravity = false;
    // 元コードに合わせて originalSpeed を持たせる
    bomb.originalSpeed = currentSpeed;
    bomb.setVelocityY(currentSpeed);
  }
}

// ---------- イベント③：カタカナ文字を 1 文字ずつ落とすロジック ----------
function computeKatakanaIntervalMs() {
  // 現在の落下スピード（spawnItem と同じ計算）
  const levelUp = Math.floor(gameTime / speedInterval);
  const currentSpeed = speedBase + levelUp * speedIncrease;
  // currentSpeed が速ければ文字の間隔は短くして相対感を維持
  const baseMs = 1000; // 基準（チューニング可）
  const ms = Math.max(200, Math.round(baseMs * (speedBase / currentSpeed)));
  return ms;
}

function spawnKatakanaPhaser(scene, char, isLastChar = false) {
  // katakanaPatterns は参照JS側の定義を使う想定
  const pattern = (typeof katakanaPatterns !== 'undefined' && katakanaPatterns[char]) ? katakanaPatterns[char] : null;
  if (!pattern) {
    console.warn('no pattern for', char);
    return;
  }

  const centerX = config.width / 2;
  // pattern は参照JSで [dx, dy] に変換済み（もし未変換なら適宜変換）
  pattern.forEach(([dx, dy]) => {
    const x = centerX - (3 * cellSize) + dx + cellSize / 2; // 中央寄せ（7x7想定）
    const y = dy - 200; // 表示開始位置（上の方から落とす）
    const star = eventItems.create(x, y, 'star'); // ★ eventItems を使用
    star.body.allowGravity = false;
    // 落下速度は通常アイテムと同じ計算
    const levelUp = Math.floor(gameTime / speedInterval);
    const currentSpeed = speedBase + levelUp * speedIncrease;
    star.originalSpeed = currentSpeed;
    star.setVelocityY(currentSpeed);
  });
}

function showKatakanaBackground(scene) {
  if (!backgrounds_str || backgrounds_str.length === 0) return;

  // === キューが空なら初期化 ===
  if (katBgQueue.length === 0) {
    const d = difficulty || 'normal';
    const fixedIndex = katBgFirstIndexByDifficulty[d] !== undefined
      ? katBgFirstIndexByDifficulty[d]
      : 0;

    // 残りをシャッフル
    const otherIndices = backgrounds_str.map((_, i) => i).filter(i => i !== fixedIndex);
    Phaser.Utils.Array.Shuffle(otherIndices);

    // 最初だけ固定 → その後シャッフル
    katBgQueue = [fixedIndex].concat(otherIndices);
  }

  // === 次に使う背景を取得 ===
  let imgKeyIndex = katBgQueue.shift();

  // === キューが空になったら再構築（連続同一防止あり） ===
  if (katBgQueue.length === 0) {
    const allIndices = backgrounds_str.map((_, i) => i);
    Phaser.Utils.Array.Shuffle(allIndices);
    if (allIndices[0] === imgKeyIndex && allIndices.length > 1) {
      // 先頭が直前と同じなら入れ替え
      [allIndices[0], allIndices[1]] = [allIndices[1], allIndices[0]];
    }
    katBgQueue = allIndices;
  }

  // === 実際の sprite ===
  const targetSprite = backgrounds_str[imgKeyIndex];

  // 背景を登場させる
  flipInBackground(scene, targetSprite, targetSprite.texture.key);

  // return しておくと、特殊イベント終了時に flipOutBackground を呼べる
  return targetSprite;
}


// === 背景登場 ===
function flipInBackground(scene, bgSprite, newTextureKey, duration = 700) {
  bgSprite.setOrigin(0.5, 0.5);
  bgSprite.setPosition(scene.scale.width / 2, scene.scale.height / 2);
  bgSprite.displayWidth = scene.scale.width;
  bgSprite.displayHeight = scene.scale.height;
  bgSprite.setVisible(true);

  if (scene.flipPipeline) {
    bgSprite.setPipeline(scene.flipPipeline);
    scene.flipPipeline.rotation = 0;
    if (typeof scene.flipPipeline.set1f === 'function') {
      scene.flipPipeline.set1f('uRotation', 0);
    }

    let swapped = false;
    scene.tweens.addCounter({
      from: 0,
      to: Math.PI,
      duration: duration,
      ease: 'Cubic.easeInOut',
      onUpdate: (tween) => {
        const val = tween.getValue();
        if (typeof scene.flipPipeline.set1f === 'function') {
          scene.flipPipeline.set1f('uRotation', val);
        } else {
          scene.flipPipeline.rotation = val;
        }
        if (!swapped && val >= Math.PI / 2) {
          swapped = true;
          bgSprite.setTexture(newTextureKey);
        }
      }
      // onComplete では pipeline をリセットせず保持
    });
  } else {
    // フォールバック
    bgSprite.setScale(0, 1);
    bgSprite.setTexture(newTextureKey);
    scene.tweens.add({
      targets: bgSprite,
      scaleX: 1,
      duration: duration,
      ease: 'Cubic.easeOut'
    });
  }
}


// === 背景退場 ===
function flipOutBackground(scene, bgSprite, duration = 700) {
  if (scene.flipPipeline) {
    scene.flipPipeline.rotation = 0;
    if (typeof scene.flipPipeline.set1f === 'function') {
      scene.flipPipeline.set1f('uRotation', 0);
    }

    scene.tweens.addCounter({
      from: 0,
      to: Math.PI,
      duration: duration,
      ease: 'Cubic.easeInOut',
      onUpdate: (tween) => {
        const val = tween.getValue();
        if (typeof scene.flipPipeline.set1f === 'function') {
          scene.flipPipeline.set1f('uRotation', val);
        } else {
          scene.flipPipeline.rotation = val;
        }
      },
      onComplete: () => {
        bgSprite.setVisible(false);
        try { bgSprite.resetPipeline(); } catch (e) {}
      }
    });
  } else {
    scene.tweens.add({
      targets: bgSprite,
      scaleX: 0,
      duration: duration,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        bgSprite.setVisible(false);
      }
    });
  }
}


// ---------- メイン：特殊イベントの流れ制御 ----------
function startSpecialEventLoop(scene) {
  clearAllEventTimers(scene);
  specialCycleCount = 0;
  // 初回はゲーム開始から 40 秒後に開始
  const t = scene.time.delayedCall(40000, () => {
    runSpecialCycle(scene);
  }, [], scene);
  eventTimers.push(t);
}

function runSpecialCycle(scene) {
  specialCycleCount++;
  // フェーズ1（横一列）を開始
  spawnPatternRowPhaser(scene);

  // フェーズ2 は「横一列終了から 20 秒後」で、3 回連続（5 秒間隔）
  const t2 = scene.time.delayedCall(20000, () => {
    // 5 秒ごとに 3 回 spawnPatternRowPhaser
    const int = scene.time.addEvent({
      delay: 5000,
      callback: () => spawnPatternRowPhaser(scene),
      repeat: 2 // 合計 3 回
    });
    eventTimers.push(int);
    // 終了後にフェーズ3 を 20秒待って開始（元仕様に合わせる）
    const t3 = scene.time.delayedCall(20000 + 5000 * 2, () => {
      inKatakanaEvent = true; // ★修正：カタカナイベントの開始
      startKatakanaPhase(scene);
    }, [], scene);
    eventTimers.push(t3);
  }, [], scene);
  eventTimers.push(t2);
}

function startKatakanaPhase(scene) {
  const d = difficulty || 'normal';
  const fixedIndex = katBgFirstIndexByDifficulty[d] !== undefined
    ? katBgFirstIndexByDifficulty[d]
    : 0;
  const targetSprite = backgrounds_str[fixedIndex];
  targetSprite.setVisible(true);

  flipInBackground(scene, targetSprite, targetSprite.texture.key);

  console.log("Katakana Phase Started!");
  inKatakanaEvent = true; // ★追加：カタカナイベント開始時にフラグを立てる
  // checkAndSpawn 停止は inKatakanaEvent を参照している前提
  // 背景切替（最初の背景は難易度固定）

  // 出すカタカナ単語は、specialCycleCount に応じて変えたい（2回目は指定順）
  // 既存の katakanaWords が配列 of arrays で定義されている想定
  let wordsList = katakanaWords; // 参照JSで定義済み
  // もし 2 回目のループで「順番を変える」など仕様があるならここで並び替え
  if (specialCycleCount >= 2 && typeof katakanaWordsSecondLoopOrder !== 'undefined') {
    // ユーザー指定の順序配列がある場合使う
    wordsList = katakanaWordsSecondLoopOrder;
  }

  // ここでは単語リストから順に 1 単語（複数文字）を取り、その文字を逐次落とす
  const word = wordsList[katakanaPatternIndex % wordsList.length];
  katakanaPatternIndex = (katakanaPatternIndex + 1) % wordsList.length;

  let charIndex = 0;
  const spawnNextChar = () => {
    if (!gameScene || gameOver) {
      // ゲームが終了してたら中断
      inKatakanaEvent = false;
      return;
    }
    if (charIndex < word.length) {
      const ch = word[charIndex];
      spawnKatakanaPhaser(scene, ch);

      // ★ ポーリングで監視：前の文字が消えたら次へ
      const checker = scene.time.addEvent({
        delay: 500, // 0.5秒ごとに確認
        callback: () => {
          // activeな eventItems が残っているか？
          if (eventItems.countActive(true) === 0) {
            checker.remove(); // 監視を止める
            charIndex++;
            spawnNextChar(); // 次の文字へ
          }
        },
        loop: true
      });
      eventTimers.push(checker);
    } else {
      // すべての文字を出し終えた → 全て落ちて壊れるまで表示させたいので、
      // 安全側で「十分な待ち時間」を置いてから終了処理に入る（文字数や速度で変わるため余裕を持たせる）
      const waitMs = 3000; // 実機で調整してください（文字が落ち切る目安）
      const endT = scene.time.delayedCall(waitMs, () => {
        inKatakanaEvent = false; // ★修正：カタカナイベントも終了
        flipOutBackground(scene, targetSprite)
        backgrounds_str.forEach((bg) => {
          scene.tweens.add({
            targets: bg,
            alpha: 0,
            duration: 500,
          });
        });
        backgrounds.forEach((bg, i) => bg.setAlpha(i === activeBgIndex ? 1 : 0));
        // ここでは activeBgIndex を次の通常画面背景に戻す処理とする
        //backgrounds.forEach((bg, i) => bg.setAlpha(i === activeBgIndex ? 1 : 0));
        // イベント終了後、40秒後に再度イベントサイクルを始める（仕様どおり）
        const nextCycleT = scene.time.delayedCall(40000, () => runSpecialCycle(scene), [], scene);
        eventTimers.push(nextCycleT);
      }, [], scene);
      eventTimers.push(endT);
    }
  };

  // まずは単語背景を表示してから最初の文字を出す（少し遅延を置く）
  const startT = scene.time.delayedCall(250, spawnNextChar, [], scene);
  eventTimers.push(startT);
}

function destroyItem(item) {
  item.disableBody(true, true);
}


function checkAndSpawn() {

  if (inKatakanaEvent) return; // ★このフラグで停止を制御

  if (normalItems.countActive(true) < maxNormalItems) { // ★ normalItems をチェック
    if (gameTime < 3000) {
      if (normalItems.countActive(true) < 1) { // ★ normalItems をチェック
        spawnItem.call(this);
      }
    } else {
      spawnItem.call(this);
    }
  }
}

// アイテム生成を開始する関数
function startSpawnTimer(scene) {
  let baseDelay = 500; // 初期生成間隔(ms)

  function scheduleNext() {
    checkAndSpawn.call(scene);

    // 経過時間に応じて生成間隔を短縮（最短200msまで）
    const levelUp = Math.floor(gameTime / speedInterval);
    const newDelay = Math.max(baseDelay - levelUp * 20, 200);

    scene.time.addEvent({
      delay: newDelay,
      callback: scheduleNext,
      callbackScope: scene
    });
  }

  scheduleNext(); // 最初の呼び出し
}


function spawnItem(group = normalItems) { // ★ デフォルト引数を normalItems に変更
  if (gameOver) return;

  const itemKeys = ['donut', 'candy', 'bomb'];
  const randomItemKey = Phaser.Utils.Array.GetRandom(itemKeys);
  const x = Phaser.Math.Between(0, 480);
  const item = group.create(x, 0, randomItemKey);
  item.body.allowGravity = false;

  // ★ 経過時間からスピード計算
  const levelUp = Math.floor(gameTime / speedInterval);
  const currentSpeed = speedBase + levelUp * speedIncrease;

  // ★ 落下速度にランダム性を追加（例：±50%の幅）
  const randomFactor = Phaser.Math.FloatBetween(0.1, 3.0);
  const finalSpeed = currentSpeed * randomFactor;

  item.setVelocityY(currentSpeed);
  item.originalSpeed = currentSpeed;
}

function collectEventItem(player, item) {
  item.disableBody(true, true);
  // ★ ここに collectItem() からの爆弾処理を移動
  if (item.texture.key === 'bomb') {
    if (!isInvincible) {
      this.se_bomb.play(); // ★ 爆弾音
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
      } else {
        isInvincible = true;
        blinkFrame = 0;
        if (invincibleTimer) clearTimeout(invincibleTimer);
        invincibleTimer = setTimeout(() => {
          isInvincible = false;
          player.clearTint();
        }, 3000);
      }
    }
  } else {
    // キャンディ・ドーナツ・星は普通に消す＆スコア加算
    item.disableBody(true, true);
    this.time.delayedCall(Phaser.Math.Between(300, 800), checkAndSpawn, [], this)
    if (item.texture.key === 'star') {
      this.se_star.play(); // ★ 星専用音
      score += 1000; // ← 星は1000点！
    }
    document.getElementById("score").textContent = "SCORE: " + score;
  }
}

function collectItem(player, item) {

  // アイテムが爆弾かどうかをチェック
  if (item.texture.key === 'bomb') {
    // 爆弾の場合の処理
    if (!isInvincible) { // 無敵状態でない場合のみダメージを受ける
      item.disableBody(true, true); // ← 無敵でなければ消す
      this.se_bomb.play(); // ★ 爆弾音
      if (lives > 0) {
        lives--;
        hearts.children.entries[lives].setActive(false).setVisible(false);
      }

      if (lives === 0 && !gameOver) {
        // ゲームオーバー処理
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
        gameScreen.style.display = 'none';
        gameOverScreen.style.display = 'flex';
        document.getElementById('final-score-over').textContent = score;
        this.se_gameover.play(); // ★ ゲームオーバー音
        // ★BGM停止ロジック: BGMがロードされ、かつ再生中であれば停止する
        if (bgm && bgm.isPlaying) {
          bgm.stop();
        }
      } else {
        // 無敵状態を開始
        isInvincible = true;
        blinkFrame = 0;
        if (invincibleTimer) clearTimeout(invincibleTimer);
        invincibleTimer = setTimeout(() => {
          isInvincible = false;
          player.clearTint();
        }, 3000);
      }
      // 次のアイテムを出す処理は、爆弾を消した場合のみ呼ぶ
      this.time.delayedCall(Phaser.Math.Between(300, 800), checkAndSpawn, [], this);
    }
  } else {
    // キャンディ・ドーナツは普通に消す＆スコア加算
    item.disableBody(true, true);
    this.time.delayedCall(Phaser.Math.Between(300, 800), checkAndSpawn, [], this)
    if (item.texture.key === 'candy') {
      this.se_item.play(); // ★ 共通音
      score += 3;
    } else if (item.texture.key === 'donut') {
      this.se_item.play(); // ★ 共通音
      score += 9;
    }
    document.getElementById("score").textContent = "SCORE: " + score;
  }
}

function update(time, delta) {
  if (!gameStarted) return;
  gameTime += delta;

  if (gameOver) {
    return;
  }

  // === 無敵点滅処理 ===
  if (isInvincible) {
    blinkFrame++;
    if (blinkFrame % 10 < 5) {
      player.setVisible(false);
    } else {
      player.setVisible(true);
    }
  } else {
    player.setVisible(true);
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
    this.se_jump.play(); // ★ ジャンプ音を鳴らす
  }

  if (down) {
    // ★ items.children ではなく normalItems と eventItems を使うように修正
    normalItems.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed * 2);
      }
    });
    eventItems.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed * 2);
      }
    });
  } else {
    // ★ items.children ではなく normalItems と eventItems を使うように修正
    normalItems.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed);
      }
    });
    eventItems.children.each(item => {
      if (item.active) {
        item.setVelocityY(item.originalSpeed);
      }
    });

  }

  if (score >= 100000000 && !gameClear) {
    this.physics.pause();
    gameClear = true;

    gameScreen.style.display = 'none';
    gameClearScreen.style.display = 'flex';
    document.getElementById('final-score-clear').textContent = score;
    this.se_clear.play(); // ★ クリア音
    // ★BGM停止ロジック: BGMがロードされ、かつ再生中であれば停止する
    if (bgm && bgm.isPlaying) {
      bgm.stop();
    }
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
    gameStarted = true;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    playBGM();

    // 物理エンジンを再開
    gameScene.scene.restart();

  });

  restartButtonOver.addEventListener('click', () => {
    gameScene.sound.stopAll();
    restartGame();
  });
  restartButtonClear.addEventListener('click', () => {
    gameScene.sound.stopAll();
    restartGame();
  });

  backButtonOver.addEventListener('click', () => {
    gameScene.sound.stopAll();
    backToStart();
  });
  backButtonClear.addEventListener('click', () => {
    gameScene.sound.stopAll();
    backToStart();
  });

  // restartButtonOver.addEventListener('click', restartGame);
  // restartButtonClear.addEventListener('click', restartGame);

  // ★追加：スタートに戻るボタン
  // backButtonOver.addEventListener('click', backToStart);
  // backButtonClear.addEventListener('click', backToStart);

});

function playBGM() {
  // gameSceneが未定義の場合（ロード完了前など）は処理しない
  if (!gameScene || !gameScene.sound) return;

  // BGMがまだ作成されていない場合のみ作成する
  if (bgm === null || !bgm.key) {
    // Phaserのサウンドシステムを使ってBGMオブジェクトを作成
    // { loop: true } でループ再生を設定
    bgm = gameScene.sound.add('bgm', { loop: true, volume: 0.5 });
  }

  // BGMが停止中の場合のみ再生（すでに再生中の場合は何もしない）
  if (!bgm.isPlaying) {
    bgm.play();
  }
}



function restartGame() {
  // 画面
  gameOverScreen.style.display = 'none';
  gameClearScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  document.getElementById("score").textContent = "Score: 0";
  playBGM();

  // 古いイベントタイマー類を消す
  clearAllEventTimers(gameScene);

  // 無敵タイマー（setTimeout）を残さない
  if (invincibleTimer) {
    clearTimeout(invincibleTimer);
    invincibleTimer = null;
  }
  isInvincible = false;

  // 再スタート前に「ゲーム開始フラグ」を立てる（create() の条件分岐で参照される）
  gameStarted = true;

  // シーン再起動
  gameScene.scene.restart();


  // （保険）短時間後に物理エンジンが停止していたら再開する処理
  // create() の修正を入れたなら不要だが、安全策として入れておくとデバッグが楽になります
  setTimeout(() => {
    if (gameScene && gameScene.physics && gameScene.physics.world && gameScene.physics.world.isPaused) {
      gameScene.physics.resume();
    }
  }, 120);
}

function backToStart() {
  // 画面の表示をスタート画面に戻す
  try {
    gameOverScreen.style.display = 'none';
    gameClearScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
  } catch (e) {
    // DOM が未定義なら無視
    console.warn('DOM hide/show failed:', e);
  }

  // --- グローバル状態を確実に初期化 ---
  // 既存のタイマー類を全て消す（Phaser の TimerEvent と setTimeout）
  try {
    clearAllEventTimers(gameScene);
  } catch (e) { console.warn('clearAllEventTimers failed', e); }

  if (invincibleTimer) {
    clearTimeout(invincibleTimer);
    invincibleTimer = null;
  }
  isInvincible = false;

  // ゲーム状態の基本値をリセット
  lives = 3;
  score = 0;
  gameOver = false;
  gameClear = false;
  gameTime = 0;
  gameStarted = false;

  // イベント管理用変数も初期化
  eventTimers = [];
  inSpecialEvent = false;
  inKatakanaEvent = false;
  katakanaPatternIndex = 0;
  specialCycleCount = 0;
  katBgQueue = [];
  activeBgIndex = 0;

  // UI 表示リセット
  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.textContent = "Score: 0";

  // **重要**: phaserGame.loop.stop() は取り除く（これが残ると再稼働できなくなることがある）
  // （もし既に呼んでいる箇所があれば削除してください）

  // シーンを再起動して完全に再作成させる（create() が再度走る）
  if (gameScene && gameScene.scene) {
    try {
      gameScene.scene.restart();
    } catch (e) {
      console.error('scene.restart failed:', e);
    }
  } else {
    console.warn('gameScene is not ready for restart.');
  }

  // 保険で短時間後に物理エンジンを停止（create の動作に依存するが安全策）
  setTimeout(() => {
    if (gameScene && gameScene.physics && !gameStarted) {
      try { gameScene.physics.pause(); } catch (e) { /* ignore */ }
    }
  }, 150);
}


function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}

window.addEventListener('DOMContentLoaded', () => {
  if (isTouchDevice()) {
    document.getElementById('controls').style.display = 'flex';
  }
});
