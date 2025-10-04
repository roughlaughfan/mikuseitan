// Phaser移植版 - 元の ham.js と同等の挙動を再現します
// Phaser単体移植版：ham.js の挙動をできるだけ忠実に再現します
// ====== 画像/音声パス ======
const IMG_PATHS = {
    player: 'asset/images/player.png',
    playerAlt: 'asset/images/player_alt.png',
    candy: 'asset/images/candy.png',
    donut: 'asset/images/donut.png',
    bomb: 'asset/images/bomb.png',
    heart: 'asset/images/heart.png',
    heartEmpty: 'asset/images/heart_empty.png',
    star: 'asset/images/star.png',
    bg_h01: 'asset/images/hint_bg.png',
    bg_h02: 'asset/images/hint_bg02.png',
    bg_h03: 'asset/images/hint_bg03.png'
};

const SOUND_PATHS = {
    jump: 'asset/sounds/jump.mp3',
    damage: 'asset/sounds/damage.mp3',
    item: 'asset/sounds/item.mp3',
    heart: 'asset/sounds/heart.mp3',
    gameover: 'asset/sounds/gameover.mp3',
    clear: 'asset/sounds/clear.mp3',
    bgm: 'asset/sounds/bgm.mp3',
    star: 'asset/sounds/star.mp3',
    btn: 'asset/sounds/btn.mp3',
    se: 'asset/sounds/konami_se.mp3'
};

// ====== DOM 要素 ======
// const difficultyDisplay = document.getElementById('difficultyDisplay');
// const heartsDiv = document.getElementById('hearts');
// const scoreDiv = document.getElementById('score');

// ====== カタカナパターン（ham.js から移植） ======
const katakanaPatterns = {
    "フ": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ジ": [[0, 0], [3, 0], [5, 0], [1, 1], [0, 2], [5, 2], [1, 3], [5, 3], [4, 4], [3, 5], [0, 6], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "サ": [[2, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [2, 2], [5, 2], [2, 3], [5, 3], [5, 4], [4, 5], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "キ": [[3, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [3, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ミ": [[1, 0], [2, 0], [3, 0], [4, 1], [5, 1], [2, 2], [3, 3], [4, 3], [1, 5], [2, 5], [3, 5], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ク": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "オ": [[4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [4, 2], [3, 3], [4, 3], [2, 4], [4, 4], [0, 5], [1, 5], [4, 5], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "タ": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [2, 3], [3, 3], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ン": [[1, 0], [2, 1], [6, 2], [6, 3], [5, 4], [4, 5], [1, 6], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ョ": [[1, 2], [2, 2], [3, 2], [4, 2], [4, 3], [2, 4], [3, 4], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ウ": [[2, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [0, 2], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ビ": [[0, 0], [3, 0], [5, 0], [0, 1], [0, 2], [4, 2], [5, 2], [0, 3], [1, 3], [2, 3], [3, 3], [0, 4], [0, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "メ": [[5, 0], [5, 1], [1, 2], [2, 2], [3, 2], [5, 2], [4, 3], [3, 4], [5, 4], [2, 5], [5, 5], [0, 6], [1, 6]].map(([x, y]) => [x * 30, y * 30]),
    "デ": [[1, 0], [2, 0], [3, 0], [4, 0], [6, 0], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [3, 3], [3, 4], [3, 5], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ト": [[1, 0], [1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [1, 4], [4, 4], [1, 5], [1, 6]].map(([x, y]) => [x * 30, y * 30]),
    "チ": [[4, 0], [5, 0], [1, 1], [2, 1], [3, 1], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [3, 4], [3, 5], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ャ": [[2, 2], [2, 3], [3, 3], [4, 3], [5, 3], [1, 4], [2, 4], [5, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "セ": [[2, 0], [2, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [2, 3], [6, 3], [2, 4], [5, 4], [2, 5], [3, 6], [4, 6], [5, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "イ": [[5, 0], [4, 1], [3, 2], [2, 3], [3, 3], [0, 4], [1, 4], [3, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "2": [[1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [5, 1], [5, 2], [3, 3], [4, 3], [1, 4], [2, 4], [0, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "0": [[1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [5, 1], [0, 2], [4, 2], [5, 2], [0, 3], [2, 3], [3, 3], [5, 3], [0, 4], [1, 4], [5, 4], [0, 5], [5, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "5": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [5, 3], [5, 4], [0, 5], [5, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ポ": [[3, 0], [5, 0], [3, 1], [4, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [3, 3], [1, 4], [3, 4], [5, 4], [0, 5], [3, 5], [6, 5], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ス": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [4, 3], [4, 4], [2, 5], [3, 5], [5, 5], [0, 6], [1, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ー": [[0, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]].map(([x, y]) => [x * 30, y * 30]),
    "ハ": [[2, 1], [4, 1], [2, 2], [5, 2], [2, 3], [5, 3], [1, 4], [6, 4], [1, 5], [6, 5], [0, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ュ": [[2, 3], [3, 3], [4, 3], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "シ": [[1, 0], [6, 0], [2, 1], [6, 1], [1, 2], [6, 2], [2, 3], [6, 3], [5, 4], [4, 5], [1, 6], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ブ": [[3, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ヤ": [[2, 0], [2, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [6, 2], [2, 3], [5, 3], [3, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "エ": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [3, 3], [3, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]].map(([x, y]) => [x * 30, y * 30]),
    "コ": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "ナ": [[3, 0], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [3, 3], [3, 4], [2, 5], [1, 6]].map(([x, y]) => [x * 30, y * 30])
};

// ====== 難易度設定（ham.js と同一） ======
const difficultySettings = {
    3: {
        displayName: '難しい', // 追加: 難易度表示用
        sharePrefix: '【難しいレベル】', // 追加: Xシェア用
        minSpeed: 6, speedInterval: 20,
        dropIntervalBase: 1000, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg.png',
        bgImages: ['asset/images/bg01.png', 'asset/images/bg02.png', 'asset/images/bg03.png', 'asset/images/bg04.png', 'asset/images/bg05.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg03.png',
        katakanaWords: [
            ["サ", "シ", "ミ", "ス", "キ"],
            ["ト", "ウ", "シ", "デ", "チ", "ャ", "ー", "ジ"]
        ]
    },
    2: {
        displayName: '普通', // 追加: 難易度表示用
        sharePrefix: '【普通レベル】', // 追加: Xシェア用
        minSpeed: 4, speedInterval: 20,
        dropIntervalBase: 1000, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg02.png',
        bgImages: ['asset/images/bg06.png', 'asset/images/bg07.png', 'asset/images/bg08.png', 'asset/images/bg09.png', 'asset/images/bg10.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg02.png',
        katakanaWords: [
            ["ミ", "ス", "タ", "ー", "チ", "ャ", "ン", "ス"],
            ["ビ", "ジ", "ン", "ト", "ク"]
        ]
    },
    1: {
        displayName: '簡単', // 追加: 難易度表示用
        sharePrefix: '【簡単レベル】', // 追加: Xシェア用
        minSpeed: 2, speedInterval: 30,
        dropIntervalBase: 1200, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg03.png',
        bgImages: ['asset/images/bg11.png', 'asset/images/bg12.png', 'asset/images/bg13.png', 'asset/images/bg14.png', 'asset/images/bg15.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg.png',
        katakanaWords: [
            ["ハ", "サ", "ミ", "ト", "イ", "ス"],
            ["シ", "ュ", "ウ", "ト", "ク"]
        ]
    }
};

// ====== 背景リスト（ループ順固定） ======
const backgroundList = [
    'asset/images/default_bg.png',
    'asset/images/default_bg02.png',
    'asset/images/default_bg03.png'
];

let bgIntervalId = null;
let bgTimeoutId = null;
let activeLayer = 0;
let currentBgIndex = 0;
let remainingTime = 0;

// ====== 難易度開始時に初期化 ======
function initBackgroundLoop(difficulty) {
    const d_setting = difficultySettings[difficulty];
    if (!d_setting) return;

    // 難易度から開始インデックスを決定（1→0, 2→1, 3→2）
    currentBgIndex = difficulty - 1;
    if (currentBgIndex < 0 || currentBgIndex >= backgroundList.length) {
        currentBgIndex = 0; // 保険
    }

    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');

    // 初期化（bg1を表示）
    d_bg1.style.backgroundImage = `url(${backgroundList[currentBgIndex]})`;
    d_bg1.classList.add('active');
    d_bg2.classList.remove('active');

    activeLayer = 0;

    clearInterval(bgIntervalId);
    clearTimeout(bgTimeoutId);
    lastChangeTime = Date.now();

    bgIntervalId = setInterval(changeBackgroundWithCrossfade, 10000);
}

// ====== 一時停止からの復帰用 ======
function resumeBackgroundLoop() {
    if (bgIntervalId) return;

    if (remainingTime > 0) {
        // 残り時間だけ待ってからループ再開
        bgTimeoutId = setTimeout(() => {
            changeBackgroundWithCrossfade();
            bgIntervalId = setInterval(changeBackgroundWithCrossfade, 10000);
        }, remainingTime);
    } else {
        // すぐ再開
        bgIntervalId = setInterval(changeBackgroundWithCrossfade, 10000);
    }
}


function changeBackgroundWithCrossfade() {
    currentBgIndex = (currentBgIndex + 1) % backgroundList.length;
    const d_nextBg = backgroundList[currentBgIndex];

    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');

    const nextLayer = activeLayer === 0 ? d_bg2 : d_bg1;
    const prevLayer = activeLayer === 0 ? d_bg1 : d_bg2;

    nextLayer.style.backgroundImage = `url(${d_nextBg})`;
    nextLayer.classList.add('active');
    prevLayer.classList.remove('active');

    activeLayer = activeLayer === 0 ? 1 : 0;
    lastChangeTime = Date.now();
}

function resetBackgroundLoop(fullReset = true) {
    if (bgIntervalId) {
        clearInterval(bgIntervalId);
        bgIntervalId = null;
    }
    clearTimeout(bgTimeoutId);
    bgTimeoutId = null;

    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');

    if (d_bg1) {
        d_bg1.style.backgroundImage = '';
        d_bg1.classList.remove('active');
    }
    if (d_bg2) {
        d_bg2.style.backgroundImage = '';
        d_bg2.classList.remove('active');
    }

    if (fullReset) {
        currentBgIndex = 0;
        activeLayer = 0;
    }
}


// ====== Phaser 設定 ======
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: 480, height: 640,
    transparent: true,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);

// ====== ゲーム状態 ======
let player = null;
let itemsGroup = null; // group for falling items
let itemPool = [];
let score = 0;
let lives = 3;
let clearscore = 10000000000;
let scoreText;
let difficultyText;
let heartImages = [];
let soundToggleBtn; // Phaser.GameObjects.Text (またはImage)
let soundToggleContainer; // Phaser.GameObjects.Container
let currentDifficulty = 1;
let bgImageList = [];
let shuffledImages = [];
const backToStartBtn = document.getElementById('backToStartBtn_phaser'); if (backToStartBtn) backToStartBtn.addEventListener('click', () => {
    stopAllSounds(); resetBackgroundLoop(); document.getElementById('gameOverScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; try {
        if (difficultyText) difficultyText.setVisible(false);
        if (scoreText) scoreText.setVisible(false);
        if (heartImages.length > 0) heartImages.forEach(h => h.setVisible(false));
    } catch (e) { }
});
// const backToStartTop = document.getElementById('backToStartBtn_top'); if (backToStartTop) backToStartTop.addEventListener('click', () => { stopAllSounds(); resetBackgroundLoop(); document.getElementById('startScreen').style.display = 'flex'; try { document.getElementById('hearts').style.display = 'none'; } catch (e) { } try { document.getElementById('score').style.display = 'none'; } catch (e) { } try { document.getElementById('difficultyDisplay').style.display = 'none'; } catch (e) { } });
let inKatakanaEvent = false;
let katakanaPatternIndex = 0;

// speed/time control
let minSpeed = 3, maxSpeed = 7, speedLevel = 3, speedInterval = 20;
let gameStartTime = 0;      // Phaser 内部クロック基準
let pauseStartTime = 0;     // ポーズ開始時刻
let pauseAccumulated = 0;   // 累積ポーズ時間

let pauseTime = 0; // ポーズしたシステム時刻 (Date.now()) を記録



// timers & events
const retryTop = document.getElementById('retryBtn_top_phaser');
if (retryTop) {
    // create a safe handler that captures the current active scene at click-time and stops sounds
    const handler = () => { const s = (game && game.scene && game.scene.scenes && game.scene.scenes[0]) ? game.scene.scenes[0] : null; stopAllSounds(s); resetBackgroundLoop(); if (s) startGame(s); };
    try { const newNode = retryTop.cloneNode(true); retryTop.parentNode.replaceChild(newNode, retryTop); newNode.addEventListener('click', handler); }
    catch (e) { retryTop.addEventListener('click', handler); }
}
let dropTimer = null;
let eventTimers = [];

// invincible
let isInvincible = false;
let invincibleTimer = null;
let blinkFrame = 0;
// sound mute state
let isMuted = false;

function preload() {
    // images
    for (const k in IMG_PATHS) this.load.image(k, IMG_PATHS[k]);
    // sounds
    for (const s in SOUND_PATHS) this.load.audio(s, SOUND_PATHS[s]);
}

function create() {
    const scene = this;

    // create player as image with manual physics-like update
    // set origin to top-left so x/y represent top-left corner (matches original ham.js coordinates)
    const textureKey = isKonamiUnlocked() ? "playerAlt" : "player"
    player = scene.add.image(240, 580, textureKey).setDisplaySize(42, 50).setOrigin(0, 0);
    player.x = 240; player.y = 580; player.width = 42; player.height = 50; player.dy = 0; player.onGround = true;

    // group for items (no arcade body necessary; we'll move manually)
    itemsGroup = scene.add.group();

    // pooling warmup
    for (let i = 0; i < 30; i++) {
        const img = scene.add.image(-1000, -1000, 'candy').setDisplaySize(30, 30).setVisible(false).setOrigin(0, 0);
        itemPool.push(img);
    }

    // keyboard: create and store keys for consistent checks
    scene._keys = scene.input.keyboard.addKeys('W,A,S,D,LEFT,RIGHT,UP,DOWN,SPACE');

    // DOM buttons
    const startBtnEl = document.getElementById('startBtn_phaser');
    if (startBtnEl) startBtnEl.addEventListener('click', () => {
        const modal = document.getElementById('difficultyModal_phaser'); modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    });

    document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', (e) => {
        if (scene && scene.sound) {
            scene.sound.play('btn');
        }
    }));

    document.querySelectorAll('.diffBtn_phaser').forEach(btn => btn.addEventListener('click', (e) => {
        currentDifficulty = parseInt(e.target.dataset.level);
        initBackgroundLoop(currentDifficulty);
        document.getElementById('difficultyModal_phaser').style.display = 'none';
        startGame(scene);
    }));
    const retryBtn = document.getElementById('retryBtn_phaser'); if (retryBtn) retryBtn.addEventListener('click', () => { stopAllSounds(scene); resetBackgroundLoop(); startGame(scene); });
    const backToStartBtn = document.getElementById('backToStartBtn_phaser'); if (backToStartBtn) backToStartBtn.addEventListener('click', () => { document.getElementById('gameOverScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; });

    // touch controls
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');

    if (leftBtn) {
        leftBtn.addEventListener('pointerdown', () => {
            scene._keys.LEFT.isDown = true;
            scene._keys.RIGHT.isDown = false; // 右をキャンセル
        });
        leftBtn.addEventListener('pointerup', () => {
            scene._keys.LEFT.isDown = false;
        });
        leftBtn.addEventListener('pointerout', () => {
            scene._keys.LEFT.isDown = false;
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('pointerdown', () => {
            scene._keys.RIGHT.isDown = true;
            scene._keys.LEFT.isDown = false; // 左をキャンセル
        });
        rightBtn.addEventListener('pointerup', () => {
            scene._keys.RIGHT.isDown = false;
        });
        rightBtn.addEventListener('pointerout', () => {
            scene._keys.RIGHT.isDown = false;
        });
    }

    if (jumpBtn) {
        jumpBtn.addEventListener('pointerdown', () => {
            if (gameRunning()) playerJump(scene);
        });
    }
    // 【1. スコア表示 (#score)】
    const scoreStyle = {
        fontSize: '16px',
        fill: '#000', // テキスト本体の色は黒（枠線用）
        fontFamily: 'Noto Sans JP, sans-serif', // CSSで指定がないので一般的なフォントを設定
        stroke: '#FFF', // CSSのtext-shadowをPhaserのstrokeで代替
        strokeThickness: 2 // text-shadowの広がりをstrokeThicknessで代替 (2*1px + 1px)
    };
    // CSS: right: 10px, top: 10px に対応。Phaserのキャンバスサイズに基づき配置
    const CAM_W = this.sys.game.config.width; // キャンバス幅を取得
    scoreText = this.add.text(CAM_W - 10, 12, 'スコア: 0点', scoreStyle).setOrigin(1, 0);
    scoreText.setDepth(10020).setVisible(false); // z-indexとdisplay:none

    // 【3. ライフ表示 (#hearts)】
    // CSS: top: 10px, left: 10px。幅30px/高さ30pxの画像を並べる
    const heartSpacing = 35; // 30px(width) + 5px(gap)
    for (let i = 0; i < 3; i++) {
        const heart = this.add.image(10 + (i * heartSpacing), 10, 'heart').setOrigin(0, 0);
        heart.setDepth(10020).setDisplaySize(30, 30).setVisible(false);
        heartImages.push(heart);
    }

    // 【2. 難易度表示 (#difficultyDisplay)】
    // CSSで指定がないため、スコアと同じスタイルで一時的に作成
    const difficultyX = 10 + (3 * heartSpacing) + 10; // (左端10) + (3つ分の間隔と幅) + (難易度との間隔10) = 125

    difficultyText = this.add.text(difficultyX, 14, 'Level: 1', scoreStyle)
        .setOrigin(0, 0); // 左上を基準 (left: 10px と同じ)
    difficultyText.setDepth(10020).setVisible(false);


    // 【4. サウンドトグル (#soundToggleContainer)】
    // CSS: top: 50px, right: 7px。FontAwesomeのアイコンをTextで代替
    const soundStyle = {
        fontSize: '24px',
        fill: '#FFF',
        fontFamily: 'Arial, sans-serif' // FontAwesomeは使えないため、プレースホルダー
    };
    soundToggleBtn = this.add.text(0, 0, '🔊', soundStyle).setInteractive({ cursor: 'pointer' });

    // コンテナを作成し、ボタンを格納 (right: 7px, top: 50px に対応)
    soundToggleContainer = this.add.container(CAM_W - 40, 45, [soundToggleBtn]);
    soundToggleContainer.setDepth(10020).setVisible(false);

    // トグルボタンのクリックイベントを設定 (既存の bindSoundToggle が参照できれば、この処理は不要かもしれません)
    // もし bindSoundToggle() がDOMを参照している場合は、その処理をPhaser用に書き換える必要があります。
    soundToggleBtn.on('pointerdown', bindSoundTogglePhaser, this);

    // -----------------------------------------------------------------

    // initial UI
    updateHeartsPhaser(); updateScorePhaser(); // Phaser用に修正した関数を呼ぶ
    // bind sound toggle button (DOM版は不要)
    // bindSoundToggle(); 

}

// Phaser用にサウンドトグルの切り替え処理を定義
// (元の bindSoundToggle がDOM操作のみで完結していた場合、これを代わりに使用)
function bindSoundTogglePhaser() {
    const isMuted = !game.sound.mute;
    game.sound.mute = isMuted;
    // アイコンを切り替え
    soundToggleBtn.setText(isMuted ? '🔇' : '🔊');
}

// helper: is game running
function gameRunning() {
    return !gamePaused && !!dropTimer;
}

// === update() 内の累積時間版速度計算 ===
function update(time, delta) {
    const scene = game.scene.scenes[0];
    if (!scene) return;

    const keys = scene._keys;
    const deltaScale = delta / 30; // 基準フレーム補正
    const movePerTick = 5;

    // -----------------------
    // 1. ポーズ中はゲーム時間を加算せずスキップ
    // -----------------------
    if (!gamePaused) {
        accumulatedGameTime += delta;
    }

    // -----------------------
    // 2. プレイヤー水平移動
    // -----------------------
    if (!gamePaused) {
        if ((keys.LEFT && keys.LEFT.isDown) || (keys.A && keys.A.isDown)) {
            player.x = Math.max(0, player.x - movePerTick * deltaScale);
            player.flipX = false;
        }
        if ((keys.RIGHT && keys.RIGHT.isDown) || (keys.D && keys.D.isDown)) {
            player.x = Math.min(480 - player.width, player.x + movePerTick * deltaScale);
            player.flipX = true;
        }
    }

    // -----------------------
    // 3. ジャンプ判定
    // -----------------------
    try {
        if (!gamePaused && (Phaser.Input.Keyboard.JustDown(keys.UP) || Phaser.Input.Keyboard.JustDown(keys.W) || Phaser.Input.Keyboard.JustDown(keys.SPACE))) {
            playerJump(scene);
        }
    } catch (e) {}

    // -----------------------
    // 4. 重力適用
    // -----------------------
    if (!gamePaused) {
        const gravity = 1;
        player.dy += gravity * deltaScale;
        player.y += player.dy * deltaScale;
        if (player.y + player.height >= 640) {
            player.y = 640 - player.height;
            player.dy = 0;
            player.onGround = true;
        }
    }

    // -----------------------
    // 5. 無敵点滅
    // -----------------------
    if (isInvincible) {
        blinkFrame++;
        player.alpha = (blinkFrame % 6 < 3) ? 0.3 : 1;
    } else {
        player.alpha = 1;
    }

    // -----------------------
    // 6. 速度計算（ポーズ中は更新しない）
    // -----------------------
    if (!gamePaused) {
        const elapsed = Math.floor(accumulatedGameTime / 1000);
        const newSpeed = minSpeed + Math.floor(elapsed / speedInterval);
        if (newSpeed !== speedLevel) {
            speedLevel = newSpeed;
            adjustDropRate(false, scene);

        }
    }

    // -----------------------
    // 7. アイテム移動・衝突判定（ポーズ中は落下停止）
    // -----------------------
    if (!gamePaused) {
        const children = itemsGroup.getChildren().slice();
        for (let i = children.length - 1; i >= 0; i--) {
            const it = children[i];
            const downKey = (keys.S && keys.S.isDown) || (keys.DOWN && keys.DOWN.isDown);
            const spd = speedLevel * (downKey ? 2 : 1);
            it.y += spd * deltaScale;

            if (it.active && rectsOverlap({ x: player.x, y: player.y, w: player.width, h: player.height },
                                         { x: it.x, y: it.y, w: it.displayWidth, h: it.displayHeight })) {
                const type = it.getData('type') || 'candy';
                if (type === 'bomb' && isInvincible) continue;
                handleItemCollision(type);
                recycleItem(it);
                continue;
            }

            if (it.y > 700) recycleItem(it);
        }
    }

    // -----------------------
    // 8. UI更新（常時）
    // -----------------------
    if (difficultyText) {
        const difficultyName = difficultySettings[currentDifficulty]?.displayName || '不明';
        difficultyText.setText('レベル: ' + difficultyName);
    }
    if (scoreText) {
        scoreText.setText('スコア: ' + score + '点');
    }
}





// collision helper
function rectsOverlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

// item pooling
function allocateItem(scene, type, x, y, speed) {
    let it = null;
    // reuse from pool
    if (itemPool.length > 0) {
        it = itemPool.pop();
        it.setTexture(type);
        it.setDisplaySize(30, 30);
        it.setOrigin(0, 0);
        it.x = x; it.y = y; it.setVisible(true); it.setActive(true);
    } else {
        it = scene.add.image(x, y, type).setDisplaySize(30, 30).setOrigin(0, 0);
        itemsGroup.add(it);
    }
    it.setData('type', type);
    if (!itemsGroup.contains(it)) itemsGroup.add(it);
    return it;
}

function recycleItem(it) {
    try { it.setVisible(false); it.setActive(false); it.x = -1000; it.y = -1000; } catch (e) { }
    // remove from group if present
    try { itemsGroup.remove(it); } catch (e) { }
    itemPool.push(it);
}

// completely destroy existing items and rebuild pool (used on restart to avoid leftovers)
function clearAllItems(scene) {
    try {
        // destroy children in group
        const children = itemsGroup.getChildren().slice();
        children.forEach(ch => {
            try { ch.destroy(); } catch (e) { }
        });
        // clear group
        try { itemsGroup.clear(true); } catch (e) { }
    } catch (e) { }

    // destroy pooled images
    try {
        itemPool.forEach(p => { try { p.destroy(); } catch (e) { } });
    } catch (e) { }
    itemPool = [];

    // recreate warmup pool images (same as in create)
    try {
        for (let i = 0; i < 30; i++) {
            const img = scene.add.image(-1000, -1000, 'candy').setDisplaySize(30, 30).setVisible(false).setOrigin(0, 0);
            itemPool.push(img);
        }
    } catch (e) { }
}

// spawn logic
function spawnItem(scene) {
    if (inKatakanaEvent) return;
    const r = Math.random(); let type = (r < 0.4) ? 'candy' : (r < 0.8) ? 'donut' : 'bomb';
    // spawn X so item top-left ranges from 0 to (width - itemWidth)
    const itemW = 30;
    const x = Math.random() * (480 - itemW);
    allocateItem(scene, type, x, -30);
}

function spawnPatternRow(scene) {
    const itemW = 30;
    const cols = Math.floor(480 / itemW);
    const hole = Math.floor(Math.random() * (cols - 2));
    for (let i = 0; i < cols; i++) {
        if (i < hole || i > hole + 2) allocateItem(scene, 'bomb', i * itemW, -itemW);
    }
}

function spawnKatakanaChar(scene, char, isLastChar) {
    const pattern = katakanaPatterns[char] || [];
    const startX = 240 - 90; // center-ish anchor like original
    // choose random heart position if last char and lives<3
    let heartIndex = -1; if (isLastChar && lives < 3) heartIndex = Math.floor(Math.random() * pattern.length);
    pattern.forEach((p, idx) => {
        const type = (idx === heartIndex) ? 'heart' : 'star';
        // p[0],p[1] are already multiples of 30; allocate using top-left origin
        allocateItem(scene, type, startX + p[0], p[1] - 100);
    });
}

// events scheduling (match ham.js phases)
// === scheduleEvents() 修正版（カタカナイベント後の安全補正付き） ===
function scheduleEvents(scene) {
    clearEventTimers();
    let eventPhase = 0;

    const runEvent = () => {
        eventPhase++;
        if (eventPhase % 3 === 1) {
            spawnPatternRow(scene);
            const t = scene.time.delayedCall(20000, runEvent); eventTimers.push(t);
        } else if (eventPhase % 3 === 2) {
            let count = 0;
            const int = scene.time.addEvent({
                delay: 5000,
                loop: true,
                callback: () => {
                    spawnPatternRow(scene);
                    if (++count >= 3) int.remove(false);
                }
            });
            eventTimers.push(int);
            const t = scene.time.delayedCall(20000, runEvent); eventTimers.push(t);
        } else {
            // カタカナイベント
            inKatakanaEvent = true;
            const setting = difficultySettings[currentDifficulty];
            setBackgroundShuffledWithFlip();
            const chars = setting.katakanaWords[katakanaPatternIndex] || [];
            let kidx = 0;

            const nextChar = () => {
                if (!gameRunning()) return;
                if (kidx < chars.length) {
                    const isLast = (kidx === chars.length - 1);
                    spawnKatakanaChar(scene, chars[kidx], isLast);
                    kidx++;
                    const t = scene.time.delayedCall(2000, nextChar);
                    eventTimers.push(t);
                } else {
                    inKatakanaEvent = false;

                    const resetT = scene.time.delayedCall(2000, () => {
                        resetBackgroundWithFlip();
                        speedLevel = minSpeed + 1;
                        accumulatedGameTime = (speedLevel - minSpeed) * speedInterval * 1000;
                    });
                    eventTimers.push(resetT);

                    const t = scene.time.delayedCall(10000, runEvent);
                    eventTimers.push(t);

                    katakanaPatternIndex = (katakanaPatternIndex + 1) % setting.katakanaWords.length;
                }
            };

            const firstT = scene.time.delayedCall(2000, nextChar);
            eventTimers.push(firstT);
        }
    };

    const initial = scene.time.delayedCall(20000, runEvent);
    eventTimers.push(initial);
}

function clearEventTimers() {
    eventTimers.forEach(t => { try { t.remove(false); } catch (e) { } }); eventTimers = [];
}
// ====== 一時停止・復帰管理 ======

let accumulatedGameTime = 0; // ポーズを除いた経過時間（ms）
// ゲーム一時停止フラグ
let gamePaused = false;

// 背景フリップ用のカスタムタイマー管理
let bgTimeouts = []; // {id, cb, delay, start, remain}

// ---- 背景 flip 用の安全な timeout ----
function scheduleBgTimeout(cb, delay) {
    const h = {
        id: setTimeout(cb, delay),
        cb: cb,
        delay: delay,
        start: performance.now(),
        remain: delay
    };
    bgTimeouts.push(h);
    return h;
}


function pauseBgTimeouts() {
    const now = performance.now();
    bgTimeouts.forEach(h => {
        clearTimeout(h.id);
        h.remain = h.delay - (now - h.start);
    });
}

function resumeBgTimeouts() {
    const now = performance.now();
    bgTimeouts.forEach(h => {
        h.start = now;
        h.id = setTimeout(h.cb, h.remain);
    });
}

// background flip DOM functions
function setBackgroundShuffledWithFlip() {
    const bgLayer2 = document.getElementById('bgLayer2');
    if (!bgLayer2) return;
    bgLayer2.style.display = "block";
    bgLayer2.style.zIndex = "1";

    const setting = difficultySettings[currentDifficulty];
    let img;
    if (!firstBgUsed) {
        img = setting.bgFirst;
        firstBgUsed = true;
    } else {
        if (shuffledImages.length === 0) {
            shuffledImages = shuffleArray(bgImageList);
            if (shuffledImages[0] === lastUsedImage) {
                shuffledImages = shuffleArray(bgImageList);
            }
        }
        img = shuffledImages.shift();
    }
    lastUsedImage = img;

    bgLayer2.style.transform = 'rotateY(180deg)';

    scheduleBgTimeout(() => {
        bgLayer2.style.backgroundImage = `url(${img})`;
        bgLayer2.style.transform = 'rotateY(360deg)';
    }, 300);
}

function resetBackgroundWithFlip() {
    const bgLayer2 = document.getElementById('bgLayer2');
    if (!bgLayer2) return;
    bgLayer2.style.display = "block";
    bgLayer2.style.zIndex = "1";
    bgLayer2.style.transform = 'rotateY(180deg)';

    scheduleBgTimeout(() => {
        bgLayer2.style.backgroundImage = "url('asset/images/t.png')";
        bgLayer2.style.transform = 'rotateY(360deg)';
    }, 300);

    scheduleBgTimeout(() => {
        bgLayer2.style.display = "none";
        bgLayer2.style.zIndex = "-1";
        bgLayer2.style.transform = '';
    }, 1000);
}

// ---- pause / resume 実装 ----
function pauseGameForTab() {
    if (gamePaused) return;
    gamePaused = true;

    if (dropTimer) dropTimer.paused = true;
    eventTimers.forEach(t => { try { t.paused = true; } catch(e){ } });
    pauseBgTimeouts();
    pauseAllSoundsForPause(game.scene.scenes[0]);
}

function resumeGameForTab() {
    if (!gamePaused) return;
    gamePaused = false;

    if (dropTimer) dropTimer.paused = false;
    eventTimers.forEach(t => { try { t.paused = false; } catch(e){ } });
    resumeBgTimeouts();
    resumeAllSoundsForPause(game.scene.scenes[0]);
}

// ---- BGM/SFX 一時停止・復帰 ----
function pauseAllSoundsForPause(scene) {
    try {
        const s = scene || (game && game.scene && game.scene.scenes && game.scene.scenes[0]);
        if (!s) return;
        if (s._bgm && s._bgm.isPlaying) { try { s._bgm.pause(); } catch (e) { } }
        if (s._activeSfx && s._activeSfx.length) {
            s._activeSfx.forEach(so => { try { so.pause(); } catch (e) { } });
        }
    } catch (e) { }
}

function resumeAllSoundsForPause(scene) {
    try {
        const s = scene || (game && game.scene && game.scene.scenes && game.scene.scenes[0]);
        if (!s) return;
        if (!isMuted) {
            if (s._bgm) { try { s._bgm.resume(); } catch (e) { } }
        }
        if (s._activeSfx && s._activeSfx.length) {
            s._activeSfx.forEach(so => { try { so.resume(); } catch (e) { } });
        }
    } catch (e) { }
}


function shuffleArray(a) { const arr = a.slice(); for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// adjust drop rate
function adjustDropRate(reset, sceneParam) {
    const scene = sceneParam || game.scene.scenes[0];
    if (!scene) return;
    if (dropTimer) { try { dropTimer.remove(false); } catch (e) { } dropTimer = null; }

    const setting = difficultySettings[currentDifficulty];
    if (reset) {
        speedLevel = setting.minSpeed;
    }
    const currentSpeedLevel = Math.max(1, speedLevel);
    const interval = Math.max(300, setting.dropIntervalBase / currentSpeedLevel);

    dropTimer = scene.time.addEvent({
        delay: interval,
        loop: true,
        callback: () => spawnItem(scene)
    });
}

// game start / init
function startGame(scene) {
    // -----------------------
    // 1. 既存タイマー・SFX の完全クリア
    // -----------------------
    try { if (dropTimer) { dropTimer.remove(false); dropTimer = null; } } catch (e) {}
    clearEventTimers();
    try { if (invincibleTimer) { clearTimeout(invincibleTimer); invincibleTimer = null; isInvincible = false; } } catch (e) {}
    try { if (scene._bgm) { try { scene._bgm.stop(); } catch(e){} scene._bgm.destroy && scene._bgm.destroy(); scene._bgm = null; } } catch(e) {}
    try { if (scene._activeSfx) { scene._activeSfx.forEach(s => { try{s.stop && s.stop();} catch(e){} }); scene._activeSfx = []; } } catch(e) {}
    try { clearAllItems(scene); } catch(e) {}

    // -----------------------
    // 2. 画面非表示
    // -----------------------
    ['startScreen','gameOverScreen','difficultyModal_phaser'].forEach(id=>{
        try{ document.getElementById(id).style.display='none'; } catch(e){}
    });

    // -----------------------
    // 3. 難易度設定・背景・カタカナ初期化
    // -----------------------
    const setting = difficultySettings[currentDifficulty];
    minSpeed = setting.minSpeed;
    speedLevel = setting.minSpeed;
    maxSpeed = setting.maxSpeed;
    speedInterval = setting.speedInterval;

    bgImageList = setting.bgImages.slice();
    shuffledImages = shuffleArray(bgImageList);
    firstBgUsed = false;

    katakanaWords = setting.katakanaWords;
    katakanaPatternIndex = 0;

    try { document.getElementById('bgLayer').style.backgroundImage = `url(${setting.defaultBg})`; } catch(e){}

    // bgLayer2 初期化
    const bgLayer2 = document.getElementById('bgLayer2');
    if(bgLayer2){
        bgLayer2.style.display = "none";
        bgLayer2.style.zIndex = "-1";
        bgLayer2.style.backgroundImage = "url('asset/images/t.png')";
        bgLayer2.style.transform = '';
    }

    // -----------------------
    // 4. ゲーム状態リセット
    // -----------------------
    score = 0; lives = 3; isInvincible = false; blinkFrame = 0;
    accumulatedGameTime = 0;
    gamePaused = false;
    inKatakanaEvent = false;
    try { itemsGroup.getChildren().forEach(it=>recycleItem(it)); } catch(e){}

    // プレイヤー位置・速度リセット
    try { if(player){ player.x=240; player.y=580; player.dy=0; player.onGround=true; } } catch(e){}

    // -----------------------
    // 5. タッチ操作UI
    // -----------------------
    try {
        const controlsEl = document.getElementById('controls');
        if(controlsEl){
            const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints>0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));
            controlsEl.style.display = isTouch?'flex':'none';
        }
    } catch(e){}

    // -----------------------
    // 6. HUD表示
    // -----------------------
    if(scoreText) scoreText.setVisible(true);
    if(difficultyText) difficultyText.setVisible(true);
    if(soundToggleContainer) soundToggleContainer.setVisible(true);
    if(heartImages.length>0) heartImages.forEach(h=>h.setVisible(true));

    // -----------------------
    // 7. dropTimer / イベント生成
    // -----------------------
    adjustDropRate(true, scene);       // minSpeed にリセットしてタイマー再生成
    clearEventTimers();
    scheduleEvents(scene);             // Katakanaイベント含む

    // -----------------------
    // 8. BGM再生
    // -----------------------
    if(!isMuted && setting.bgmKey){
        try {
            scene._bgm = scene.sound.add(setting.bgmKey, {loop:true, volume:0.1});
            scene._bgm.play();
        } catch(e){}
    }

    // -----------------------
    // 9. UI更新
    // -----------------------
    updateHeartsPhaser();
    updateScorePhaser();
}

function endGame(status) {
    // stop timers
    if (dropTimer) { try { dropTimer.remove(false); } catch (e) { } dropTimer = null; }
    clearEventTimers();
    // stop bgm
    try { const s = game.scene.scenes[0]; if (s._bgm) s._bgm.stop(); } catch (e) { }

    // hide HUD/controls
    try { document.getElementById('controls').style.display = 'none'; } catch (e) { }

    if (scoreText) scoreText.setVisible(false);
    if (difficultyText) difficultyText.setVisible(false);
    if (soundToggleContainer) soundToggleContainer.setVisible(false);
    if (heartImages.length > 0) heartImages.forEach(h => h.setVisible(false));

    playSound('gameover');
    document.getElementById('endTitle').textContent = status;

    // スコア表示を「億」「万」付きに
    document.getElementById('finalScore').textContent = 'スコア: ' + formatScoreKanji(score) + '点';

    // スコア100億以上ならclear_imgを表示
    if (score >= clearscore) {
        document.querySelector('#gameOverScreen .clear_img').style.display = 'block';
        document.getElementById('gameOverScreen').style.backgroundImage = "url('asset/images/clear.png')";

        const clearImageElement = document.getElementById('clearImage');

        // 要素が存在することを確認してから src を変更
        if (clearImageElement) {
            clearImageElement.src = 'asset/images/clear_ham.png';
            // ↑ ここに新しい画像ファイルのパスを指定します。
        }
    } else {
        document.querySelector('#gameOverScreen .clear_img').style.display = 'none';
        document.getElementById('gameOverScreen').style.backgroundImage = "url('asset/images/gameover.png')";
        const clearImageElement = document.getElementById('clearImage');

        // 要素が存在することを確認してから src を変更
        if (clearImageElement) {
            clearImageElement.src = 'asset/images/gameover_img.png';
            // ↑ ここに新しい画像ファイルのパスを指定します。
        }
    }

    document.getElementById('gameOverScreen').style.display = 'flex';

}


function handleItemCollision(type) {
    if (type === 'candy') { score += 3; playSound('item'); }
    else if (type === 'donut') { score += 9; playSound('item'); }
    else if (type === 'star') { score += 50000000; playSound('star'); }
    else if (type === 'heart') { if (lives < 3) { lives++; updateHeartsPhaser(); } playSound('heart'); }
    else if (type === 'bomb') {
        if (!isInvincible) {
            lives--; updateHeartsPhaser(); playSound('damage');
            if (lives <= 0) { endGame('ゲームオーバー'); return; }
            isInvincible = true; blinkFrame = 0; if (invincibleTimer) clearTimeout(invincibleTimer); invincibleTimer = setTimeout(() => { isInvincible = false; }, 3000);
        }
    }
    updateScorePhaser();
    if (score >= clearscore) {
        const s = game.scene.scenes[0];
        if (s) showBillionAchievement(s);
    }
}

// 100億点達成演出用フラグ
let achievementShown = false;

// 100億点達成演出（Phaser上で右→左に流す）
function showBillionAchievement(scene) {
    if (achievementShown) return;
    achievementShown = true;

    // 効果音（既存のclear音を流用）
    playSound('clear');

    // 画面中央にテキストを右端の外から配置
    const text = scene.add.text(scene.scale.width + 200, scene.scale.height / 2, '100億点達成！100億点達成！100億点達成！', {
        fontFamily: "Noto Sans JP, sans-serif",
        fontSize: '48px',
        color: '#fff',
        fontStyle: '400',
        stroke: '#333',
        strokeThickness: 2
    }).setOrigin(0.5);

    // Tweenで右→左へ流す
    scene.tweens.add({
        targets: text,
        x: -500,             // 左の外まで移動
        duration: 5000,      // 移動速度 (ms) 調整可
        ease: 'Linear',
        onComplete: () => { text.destroy(); }
    });

    // 点滅アニメーション
    scene.tweens.add({
        targets: text,
        alpha: 0,            // 透明に
        duration: 500,       // 0.5秒で消える
        yoyo: true,          // 戻る（点滅する）
        repeat: -1           // 無限繰り返し
    });

    // ====== 花火の追加 ======
    // 小さな丸をパーティクルに使う
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(8, 8, 8);
    graphics.generateTexture("particle", 16, 16);

    // 花火を打ち上げる関数
    function launchFirework(scene) {
        // ==== 打ち上げ開始位置 ====
        const groundY = scene.scale.height - 150;

        // ==== 爆発位置 ====
        // 左右どちらかの端寄りに発生
        const side = Phaser.Math.Between(0, 1); // 0=左, 1=右
        const startX = side === 0
            ? Phaser.Math.Between(50, scene.scale.width / 3)
            : Phaser.Math.Between((scene.scale.width * 2) / 3, scene.scale.width - 50);

        const targetY = Phaser.Math.Between(100, scene.scale.height / 3);

        // === 打ち上げの火の玉 ===
        const rocket = scene.add.particles(startX, groundY, "particle", {
            speedY: { min: -500, max: -600 },
            lifespan: 800,
            scale: { start: 0.3, end: 0.1 },
            alpha: { start: 1, end: 0.5 },
            quantity: 1,
            frequency: 50,
            tint: 0xffffcc
        });

        // 打ち上げ後に破裂
        scene.time.delayedCall(800, () => {
            rocket.stop();
            rocket.destroy();

            // === 爆発パーティクル ===
            const explosion = scene.add.particles(startX, targetY, "particle", {
                speed: { min: -400, max: 400 },
                angle: { min: 0, max: 360 },
                lifespan: 1200,
                scale: { start: 0.48, end: 0 }, // ← サイズ80％
                alpha: { start: 1, end: 0 },
                gravityY: 300,
                blendMode: "ADD",
                tint: [0xff6666, 0x66ff66, 0x6666ff, 0xffff66]
            });

            // 爆発後のキラキラ（余韻）
            scene.time.delayedCall(200, () => {
                const sparkle = scene.add.particles(startX, targetY, "particle", {
                    speed: { min: -150, max: 150 },
                    angle: { min: 0, max: 360 },
                    lifespan: 2000,
                    scale: { start: 0.16, end: 0 }, // ← キラキラも少し小さめ
                    alpha: { start: 1, end: 0 },
                    gravityY: 100,
                    quantity: 2,
                    frequency: 80,
                    blendMode: "ADD",
                    tint: [0xffffff, 0xffffcc, 0xffccff]
                });

                scene.time.delayedCall(3000, () => {
                    sparkle.stop();
                    sparkle.destroy();
                });
            });

            scene.time.delayedCall(1500, () => {
                explosion.stop();
                explosion.destroy();
            });
        });
    }

    for (let i = 0; i < 5; i++) {
        scene.time.delayedCall(500 * i, () => {
            const startX = Phaser.Math.Between(100, scene.scale.width - 100);
            launchFirework(scene, startX);
        });
    }
}

function playerJump(scene) {
    if (player.onGround) { player.dy = -15; player.onGround = false; playSound('jump'); }
}

function playSound(key) {
    try {
        const s = game.scene.scenes[0];
        if (isMuted) return;
        if (!s) return;
        // create an explicit Sound instance so we can stop/destroy it later
        let snd = null;
        try {
            snd = s.sound.add(key, { volume: 0.4 });
        } catch (e) {
            // fallback: try play directly
            try { s.sound.play(key, { volume: 0.4 }); } catch (e) { }
        }
        if (snd) {
            try { snd.play(); } catch (e) { }
            try {
                if (!s._activeSfx) s._activeSfx = [];
                s._activeSfx.push(snd);
                // remove from list when finished
                try { snd.once && snd.once('complete', () => { const idx = s._activeSfx.indexOf(snd); if (idx >= 0) s._activeSfx.splice(idx, 1); snd.destroy && snd.destroy(); }); } catch (e) { }
            } catch (e) { }
        }
    } catch (e) { }
}



// helper to stop bgm and active sfx for a given scene
function stopAllSounds(scene) {
    try {
        const s = scene || (game && game.scene && game.scene.scenes && game.scene.scenes[0]);
        if (!s) return;
        try { if (s._bgm) { try { s._bgm.stop(); } catch (e) { } try { s._bgm.destroy && s._bgm.destroy(); } catch (e) { } s._bgm = null; } } catch (e) { }
        if (s._activeSfx && s._activeSfx.length) {
            s._activeSfx.forEach(so => { try { so.stop && so.stop(); } catch (e) { } try { so.destroy && so.destroy(); } catch (e) { } });
            s._activeSfx = [];
        }
    } catch (e) { }
}

function updateHeartsPhaser() {
    if (heartImages.length > 0) {
        for (let i = 0; i < 3; i++) {
            // lives変数に基づき画像を切り替える
            const textureKey = (i < lives) ? 'heart' : 'heartEmpty'; // 'heartEmpty'はpreloadでロードされている必要があります
            heartImages[i].setTexture(textureKey).setVisible(true);
        }
    }
}
function updateScorePhaser() {
    if (scoreText) {
        scoreText.setText('Score: ' + score + '点');
    }
}


// 数値を「億」「万」を使った表現に変換する関数
function formatScoreKanji(num) {
    const oku = Math.floor(num / 100000000);      // 億
    const man = Math.floor((num % 100000000) / 10000); // 万
    const ichi = num % 10000;                     // 余り

    let result = '';
    if (oku > 0) result += oku + '億';
    if (man > 0) result += man + '万';
    if (ichi > 0 || result === '') result += ichi; // 全部0の時は0表示
    return result;
}


// share button bindings (reuse original share code)
function bindShareButtons() {
    // prefer the original IDs used in ham.js; fall back to _phaser suffixed IDs
    const shareBtn = document.getElementById('shareBtn') || document.getElementById('shareBtn_phaser');
    const shareBtnTop = document.getElementById('shareBtn_top') || document.getElementById('shareBtn_top_phaser');
    const gameUrl = encodeURIComponent('https://www.google.com');
    const hashtags = ["牡蠣サーモンキャッチゲーム", "テストプレイ", "HTML5ゲーム"];
    const formattedHashtags = hashtags.map(t => `#${t}`).join(' ');

    const shareHandler = (e) => { // クリック時に実行される関数を定義
        const difficultyPrefix = difficultySettings[currentDifficulty]?.sharePrefix || '';
        const formattedScore = formatScoreKanji(score);
        const scorePrefix = score >= clearscore ? '【100億点！】' : '';
        const prefix = scorePrefix + difficultyPrefix;

        const shareText = encodeURIComponent(
            `${prefix}牡蠣サーモンキャッチゲームでスコア${formattedScore}点を達成しました！\n${formattedHashtags}`
        );

        const shareUrlApp = `twitter://post?text=${shareText}&url=${gameUrl}`;
        const shareUrlWeb = `https://twitter.com/intent/tweet?text=${shareText}&url=${gameUrl}`;

        // 1. モバイル判定
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

        // 2. リンク要素の場合の処理 (元のコードから維持)
        try {
            // アンカータグのhrefはWeb版を設定（長押しフォールバック用）
            if (e && e.currentTarget && e.currentTarget.tagName === 'A') e.currentTarget.href = shareUrlWeb;
        } catch (err) { }


        if (isMobile) {
            // モバイルの場合:
            // まずアプリ起動を試みる (現在のタブを上書き)
            window.location.href = shareUrlApp;

            // アプリが開かなかった場合（失敗または未インストール）に、
            // 現在のタブをWeb版のURLに上書きするフォールバック
            // window.open()ではないため、ポップアップブロックは発生しない
            const fallbackTimer = setTimeout(() => {
                window.location.href = shareUrlWeb;
            }, 500); // 500ミリ秒に延長して、アプリ起動の猶予を与える

            // **重要:** アプリ起動が成功した場合（ブラウザがバックグラウンドに回る）、
            // このタイマーが残ったままゲームに戻ると、Web版に勝手に遷移してしまうため、
            // ページが非表示になったとき（アプリに遷移した可能性が高い）にタイマーをクリアするロジックが必要です。

            // ページ可視性APIを使用して、ブラウザが最小化されたり別のアプリに切り替わったりしたときにタイマーをクリア
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    clearTimeout(fallbackTimer);
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                }
            };
            document.addEventListener('visibilitychange', handleVisibilityChange);

        } else {
            // PCの場合、直接Web版を新しいタブで開く (window.openを使用)
            window.open(shareUrlWeb, '_blank');
        }
    };
    if (shareBtn) {
        // use addEventListener so we don't accidentally overwrite other handlers
        shareBtn.addEventListener('click', shareHandler);
        if (shareBtn.tagName === 'A') { shareBtn.href = '#'; shareBtn.target = '_blank'; shareBtn.rel = 'noopener noreferrer'; }
    }
    if (shareBtnTop) {
        shareBtnTop.addEventListener('click', shareHandler);
        if (shareBtnTop.tagName === 'A') { shareBtnTop.href = '#'; shareBtnTop.target = '_blank'; shareBtnTop.rel = 'noopener noreferrer'; }
    }
}



// expose startGame to window for manual triggers
window.phaserStartGame = function () { const s = game.scene.scenes[0]; if (s) startGame(s); };

// init bind share and fallback UI bindings via splash flow
window.addEventListener('load', () => {
    try { showSplashThenInit(); } catch (e) { try { bindShareButtons(); } catch (e) { } }
});

// export some helper for debugging
window._phaserGame = { game };


// --- visibility/blur listeners をここで登録（IIFE 内で定義済みの関数にアクセス可能） ---
(function registerVisibilityHandlers() {

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseGameForTab(); else resumeGameForTab();
    });

    // blur / focus は補助的に（モバイルや一部ブラウザの挙動に備える）
    window.addEventListener('blur', () => {
        pauseGameForTab();
    });
    window.addEventListener('focus', () => {
        resumeGameForTab();
    });
})();

// -------------------------------------------
// 追加修正：pause/resume が bgIntervalId (setInterval) も制御するようにする
// bgIntervalWasRunning を利用して復帰時に initBackgroundLoop を呼ぶ
// -------------------------------------------
let bgIntervalWasRunning = false;

// 拡張：pauseGameForTab の内部処理に bgInterval 停止を追加
// （既に関数があるので上書きする形で定義し直します）
// const _origPause = typeof pauseGameForTab === 'function' ? pauseGameForTab : null;
function pauseGameForTab() {
    if (gamePaused) return;
    gamePaused = true;

    // dropTimer (Phaser TimerEvent) を pause
    if (dropTimer) {
        try { dropTimer.paused = true; } catch (e) { }
    }

    // eventTimers (配列) の pause
    try { eventTimers.forEach(t => { try { t.paused = true; } catch (ee) { } }); } catch (e) { }

    // clear interval-based background loop if running (remember to restart)
    try {
        if (bgIntervalId) {
            bgIntervalWasRunning = true;
            clearInterval(bgIntervalId);
            bgIntervalId = null;
        } else {
            bgIntervalWasRunning = false;
        }
    } catch (e) { }

    // 背景 flip の DOM timeout 管理も pause
    try { pauseBgTimeouts(); } catch (e) { }

    // BGM / SFX の pause
    try { pauseAllSoundsForPause(game.scene && game.scene.scenes && game.scene.scenes[0]); } catch (e) { }

    // Arcade Physics の一時停止（落下中アイテムも停止）
    try {
        const scene = game.scene && game.scene.scenes && game.scene.scenes[0];
        if (scene && scene.physics && scene.physics.world) {
            scene.physics.world.pause();
        }
    } catch (e) { }

    // optional overlay
    try { const p = document.getElementById('pauseOverlay'); if (p) p.style.display = 'flex'; } catch (e) { }
}

// 拡張：resumeGameForTab の内部処理に bgInterval 再開を追加
// const _origResume = typeof resumeGameForTab === 'function' ? resumeGameForTab : null;
function resumeGameForTab() {
    if (!gamePaused) return;
    gamePaused = false;

    // dropTimer resume
    if (dropTimer) {
        try { dropTimer.paused = false; } catch (e) { }
    }

    // eventTimers resume
    try { eventTimers.forEach(t => { try { t.paused = false; } catch (ee) { } }); } catch (e) { }

    // resume background interval loop if it was running
    try {
        if (bgIntervalWasRunning) {
            // 再初期化（initBackgroundLoop は難易度も再設定するので currentDifficulty を渡す）
            try { initBackgroundLoop(currentDifficulty); } catch (e) { }
            bgIntervalWasRunning = false;
        }
    } catch (e) { }

    // resume DOM background timeouts
    try { resumeBgTimeouts(); } catch (e) { }

    // resume BGM / SFX (ミュート状態は考慮)
    try { resumeAllSoundsForPause(game.scene && game.scene.scenes && game.scene.scenes[0]); } catch (e) { }

    // Arcade Physics の再開（落下中アイテムも動き出す）
    try {
        const scene = game.scene && game.scene.scenes && game.scene.scenes[0];
        if (scene && scene.physics && scene.physics.world) {
            scene.physics.world.resume();
        }
    } catch (e) { }

    // optional overlay hide
    try { const p = document.getElementById('pauseOverlay'); if (p) p.style.display = 'none'; } catch (e) { }
}

