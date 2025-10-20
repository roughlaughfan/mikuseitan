


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
    // bg_h02: 'asset/images/hint_bg02.png',
    // bg_h03: 'asset/images/hint_bg03.png'
};

const SOUND_PATHS = {
    jump: 'asset/sounds/jump.mp3',
    damage: 'asset/sounds/damage.mp3',
    item: 'asset/sounds/item.mp3',
    heart: 'asset/sounds/heart.mp3',
    gameover: 'asset/sounds/gameover.mp3',
    clear: 'asset/sounds/clear.mp3',
    bgm: 'asset/sounds/bgm2.mp3',
    star: 'asset/sounds/star.mp3',
    btn: 'asset/sounds/btn.mp3',
    se: 'asset/sounds/konami_se.mp3'
};



const katakanaPatterns = {
    "a1": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "a2": [[0, 0], [3, 0], [5, 0], [1, 1], [0, 2], [5, 2], [1, 3], [5, 3], [4, 4], [3, 5], [0, 6], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "a3": [[2, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [2, 2], [5, 2], [2, 3], [5, 3], [5, 4], [4, 5], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "a4": [[3, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [3, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "a5": [[1, 0], [2, 0], [3, 0], [4, 1], [5, 1], [2, 2], [3, 3], [4, 3], [1, 5], [2, 5], [3, 5], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "a6": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b1": [[4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [4, 2], [3, 3], [4, 3], [2, 4], [4, 4], [0, 5], [1, 5], [4, 5], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b2": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [2, 3], [3, 3], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b3": [[1, 0], [2, 1], [6, 2], [6, 3], [5, 4], [4, 5], [1, 6], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b4": [[1, 2], [2, 2], [3, 2], [4, 2], [4, 3], [2, 4], [3, 4], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b5": [[2, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [0, 2], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "b6": [[0, 0], [3, 0], [5, 0], [0, 1], [0, 2], [4, 2], [5, 2], [0, 3], [1, 3], [2, 3], [3, 3], [0, 4], [0, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "c1": [[5, 0], [5, 1], [1, 2], [2, 2], [3, 2], [5, 2], [4, 3], [3, 4], [5, 4], [2, 5], [5, 5], [0, 6], [1, 6]].map(([x, y]) => [x * 30, y * 30]),
    "c2": [[1, 0], [2, 0], [3, 0], [4, 0], [6, 0], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [3, 3], [3, 4], [3, 5], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "c3": [[1, 0], [1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [1, 4], [4, 4], [1, 5], [1, 6]].map(([x, y]) => [x * 30, y * 30]),
    "d1": [[4, 0], [5, 0], [1, 1], [2, 1], [3, 1], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [3, 4], [3, 5], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "d2": [[2, 2], [2, 3], [3, 3], [4, 3], [5, 3], [1, 4], [2, 4], [5, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "d3": [[2, 0], [2, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [2, 3], [6, 3], [2, 4], [5, 4], [2, 5], [3, 6], [4, 6], [5, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "d4": [[5, 0], [4, 1], [3, 2], [2, 3], [3, 3], [0, 4], [1, 4], [3, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "e1": [[1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [5, 1], [5, 2], [3, 3], [4, 3], [1, 4], [2, 4], [0, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "e2": [[1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [5, 1], [0, 2], [4, 2], [5, 2], [0, 3], [2, 3], [3, 3], [5, 3], [0, 4], [1, 4], [5, 4], [0, 5], [5, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "e3": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [5, 3], [5, 4], [0, 5], [5, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
    "f1": [[3, 0], [5, 0], [3, 1], [4, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [3, 3], [1, 4], [3, 4], [5, 4], [0, 5], [3, 5], [6, 5], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "f2": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [4, 3], [4, 4], [2, 5], [3, 5], [5, 5], [0, 6], [1, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "f3": [[0, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]].map(([x, y]) => [x * 30, y * 30]),
    "f4": [[2, 1], [4, 1], [2, 2], [5, 2], [2, 3], [5, 3], [1, 4], [6, 4], [1, 5], [6, 5], [0, 6], [6, 6]].map(([x, y]) => [x * 30, y * 30]),
    "f5": [[2, 3], [3, 3], [4, 3], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "g1": [[1, 0], [6, 0], [2, 1], [6, 1], [1, 2], [6, 2], [2, 3], [6, 3], [5, 4], [4, 5], [1, 6], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "g2": [[3, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
    "g3": [[2, 0], [2, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [6, 2], [2, 3], [5, 3], [3, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
    "g4": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [3, 3], [3, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]].map(([x, y]) => [x * 30, y * 30]),
    "g5": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
    "g6": [[3, 0], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [3, 3], [3, 4], [2, 5], [1, 6]].map(([x, y]) => [x * 30, y * 30])
};


const difficultySettings = {
    3: {
        displayName: 'むずかしい', 
        sharePrefix: '【むずかしい】', 
        minSpeed: 6, speedInterval: 20,
        dropIntervalBase: 1000, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg.png',
        bgImages: ['asset/images/bg01.png', 'asset/images/bg02.png', 'asset/images/bg03.png', 'asset/images/bg04.png', 'asset/images/bg05.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg03.png',
        katakanaWords: [
            ["a1", "a2", "a3", "a4", "a5", "a6"],
            ["d3", "d4", "b2", "b3", "a3", "d4"],
            ["e1", "e2", "e1", "e3"],
            ["a5", "a6", "d1", "d2", "b3"],
            ["b1", "b2", "b3", "a2", "b4", "b5", "b6"],
            ["b1", "c1", "c2", "c3", "b5"]
        ]
    },
    2: {
        displayName: 'ふつう', 
        sharePrefix: '【ふつう】', 
        minSpeed: 4, speedInterval: 20,
        dropIntervalBase: 1000, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg02.png',
        bgImages: ['asset/images/bg06.png', 'asset/images/bg07.png', 'asset/images/bg08.png', 'asset/images/bg09.png', 'asset/images/bg10.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg02.png',
        katakanaWords: [
            ["a5", "a6", "d1", "d2", "b3"],
            ["b1", "b2", "b3", "a2", "b4", "b5", "b6"],
            ["b1", "c1", "c2", "c3", "b5"],
            ["a1", "a2", "a3", "a4", "a5", "a6"],
            ["d3", "d4", "b2", "b3", "a3", "d4"],
            ["e1", "e2", "e1", "e3"]
        ]
    },
    1: {
        displayName: 'かんたん', 
        sharePrefix: '【かんたん】', 
        minSpeed: 2, speedInterval: 30,
        dropIntervalBase: 1200, dropIntervalReduction: 200,
        bgFirst: 'asset/images/hint_bg03.png',
        bgImages: ['asset/images/bg11.png', 'asset/images/bg12.png', 'asset/images/bg13.png', 'asset/images/bg14.png', 'asset/images/bg15.png'],
        bgmKey: 'bgm', defaultBg: 'asset/images/default_bg.png',
        katakanaWords: [
                ["d3", "d4", "b2", "b3", "f1", "f2", "b2", "f3"],
                ["c3", "b5", "a4", "f5", "b5", "g1", "g2", "g3"],
                ["g4", "a4", "g5", "b5", "g6", "d4"],
                ["a5", "a6", "d1", "d2", "b3"],
                ["b1", "b2", "b3", "a2", "b4", "b5", "b6"],
                ["b1", "c1", "c2", "c3", "b5"]
        ]
    }
};


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

const bgInterval = 10000;
const BG_INTERVAL = 10000;
let lastChangeTime = 0;


function initBackgroundLoop(difficulty) {
    const d_setting = difficultySettings[difficulty];
    if (!d_setting) return;

    
    currentBgIndex = difficulty - 1;
    if (currentBgIndex < 0 || currentBgIndex >= backgroundList.length) {
        currentBgIndex = 0;
    }

    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');

    
    if (d_bg1) d_bg1.style.backgroundImage = `url(${backgroundList[currentBgIndex]})`;
    if (d_bg1) d_bg1.classList.add('active');
    if (d_bg2) d_bg2.classList.remove('active');

    activeLayer = 0;

    
    clearTimeout(bgTimeoutId);
    bgTimeoutId = null;

    lastChangeTime = Date.now();
    remainingTime = bgInterval; 

    
    bgTimeoutId = setTimeout(changeBackgroundWithCrossfade, bgInterval);
}


function pauseBackgroundLoop() {
    if (bgTimeoutId) {
        clearTimeout(bgTimeoutId);
        bgTimeoutId = null;

        const elapsed = Date.now() - lastChangeTime;
        remainingTime = Math.max(0, bgInterval - elapsed);

        
        if (fadeInProgress) {
            fadeProgress = Math.min(1, (Date.now() - fadeStartTime) / fadeDuration);
        }
    }
}


function resumeBackgroundLoop() {

    
    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');
    if (d_bg1 && d_bg2) {
        const currentBg = backgroundList[currentBgIndex];
        const nextBgIndex = (currentBgIndex + 1) % backgroundList.length;
        const nextBg = backgroundList[nextBgIndex];

        
        if (activeLayer === 0) {
            d_bg1.style.backgroundImage = `url(${currentBg})`;
            d_bg1.classList.add('active');
            d_bg2.style.backgroundImage = `url(${nextBg})`;
            d_bg2.classList.remove('active');
        } else {
            d_bg2.style.backgroundImage = `url(${currentBg})`;
            d_bg2.classList.add('active');
            d_bg1.style.backgroundImage = `url(${nextBg})`;
            d_bg1.classList.remove('active');
        }
    }

    if (bgTimeoutId) return;

    
    if (fadeInProgress && fadeProgress < 1) {
        const remainingFade = fadeDuration * (1 - fadeProgress);
        const prevLayer = activeLayer === 0
            ? document.querySelector('#bgLayer .bg2')
            : document.querySelector('#bgLayer .bg1');

        
        if (prevLayer) {
            prevLayer.style.transition = `opacity ${remainingFade}ms ease-in-out`;
        }

        setTimeout(() => {
            if (prevLayer) prevLayer.classList.remove('active');
            fadeInProgress = false;
            fadeProgress = 0;
        }, remainingFade);
    }

    
    if (remainingTime > 0) {
        bgTimeoutId = setTimeout(() => {
            changeBackgroundWithCrossfade();
        }, remainingTime);
    } else {
        bgTimeoutId = setTimeout(changeBackgroundWithCrossfade, bgInterval);
    }
}


let fadeStartTime = 0;
let fadeDuration = 3000; 
let fadeInProgress = false;
let fadeProgress = 0; 


function changeBackgroundWithCrossfade() {
    fadeInProgress = true;
    fadeStartTime = Date.now();
    fadeProgress = 0;

    currentBgIndex = (currentBgIndex + 1) % backgroundList.length;
    const d_nextBg = backgroundList[currentBgIndex];

    const d_bg1 = document.querySelector('#bgLayer .bg1');
    const d_bg2 = document.querySelector('#bgLayer .bg2');

    const nextLayer = activeLayer === 0 ? d_bg2 : d_bg1;
    const prevLayer = activeLayer === 0 ? d_bg1 : d_bg2;

    
    if (nextLayer) {
        nextLayer.style.backgroundImage = `url(${d_nextBg})`;
        nextLayer.classList.add('active');
    }

    
    const fadeOutDelay = fadeDuration / 2;
    setTimeout(() => {
        if (prevLayer) prevLayer.classList.remove('active');
    }, fadeOutDelay);

    
    activeLayer = activeLayer === 0 ? 1 : 0;
    lastChangeTime = Date.now();
    remainingTime = bgInterval;

    
    clearTimeout(bgTimeoutId);
    bgTimeoutId = setTimeout(changeBackgroundWithCrossfade, bgInterval);

    
    setTimeout(() => {
        fadeInProgress = false;
        fadeProgress = 0;
    }, fadeDuration);
}



function resetBackgroundLoop(fullReset = true) {
    if (bgTimeoutId) {
        clearTimeout(bgTimeoutId);
        bgTimeoutId = null;
    }

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
        remainingTime = 0;
        lastChangeTime = 0;
    }
    const bgLayer = document.getElementById('bgLayer');
    if (bgLayer) {
        bgLayer.removeAttribute('data-initialized');
    }
}



const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: 480, height: 640,
    transparent: true,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);


let player = null;
let itemsGroup = null; 
let itemPool = [];
let score = 0;
let lives = 3;
let clearscore = 10000000000;
let scoreText;
let difficultyText;
let heartImages = [];
let soundToggleBtn; 
let soundToggleContainer; 
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

let inKatakanaEvent = false;
let katakanaPatternIndex = 0;


let minSpeed = 3, maxSpeed = 7, speedLevel = 3, speedInterval = 20;
let gameStartTime = 0;      
let pauseStartTime = 0;     
let pauseAccumulated = 0;   

let pauseTime = 0; 

let eventLoopCount = 0; 



const retryTop = document.getElementById('retryBtn_top_phaser');
if (retryTop) {
    
    const handler = () => { const s = (game && game.scene && game.scene.scenes && game.scene.scenes[0]) ? game.scene.scenes[0] : null; stopAllSounds(s); resetBackgroundLoop(); if (s) startGame(s); };
    try { const newNode = retryTop.cloneNode(true); retryTop.parentNode.replaceChild(newNode, retryTop); newNode.addEventListener('click', handler); }
    catch (e) { retryTop.addEventListener('click', handler); }
}
let dropTimer = null;
let eventTimers = [];


let isInvincible = false;
let invincibleTimer = null;
let blinkFrame = 0;

let isMuted = false;

function preload() {
    
    for (const k in IMG_PATHS) this.load.image(k, IMG_PATHS[k]);
    
    for (const s in SOUND_PATHS) this.load.audio(s, SOUND_PATHS[s]);
}

function create() {
    const scene = this;

    
    
    const textureKey = isKonamiUnlocked() ? "playerAlt" : "player"
    player = scene.add.image(240, 580, textureKey).setDisplaySize(42, 50).setOrigin(0, 0);
    player.x = 240; player.y = 580; player.width = 42; player.height = 50; player.dy = 0; player.onGround = true;

    
    itemsGroup = scene.add.group();

    
    for (let i = 0; i < 30; i++) {
        const img = scene.add.image(-1000, -1000, 'candy').setDisplaySize(30, 30).setVisible(false).setOrigin(0, 0);
        itemPool.push(img);
    }

    
    scene._keys = scene.input.keyboard.addKeys('W,A,S,D,LEFT,RIGHT,UP,DOWN,SPACE');

    
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
        resetBackgroundLoop();
        initBackgroundLoop(currentDifficulty);
        document.getElementById('difficultyModal_phaser').style.display = 'none';
        startGame(scene);
        gamePaused = false;
    }));
    const retryBtn = document.getElementById('retryBtn_phaser'); if (retryBtn) retryBtn.addEventListener('click', () => { stopAllSounds(scene); gamePaused = false; resetBackgroundLoop(); initBackgroundLoop(currentDifficulty); startGame(scene); });
    const backToStartBtn = document.getElementById('backToStartBtn_phaser'); if (backToStartBtn) backToStartBtn.addEventListener('click', () => { document.getElementById('gameOverScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; });

    
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');

    if (leftBtn) {
        leftBtn.addEventListener('pointerdown', () => {
            scene._keys.LEFT.isDown = true;
            scene._keys.RIGHT.isDown = false; 
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
            scene._keys.LEFT.isDown = false; 
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
            
            if (!gameRunning()) return;
            playerJump(scene);
        });
    }
    
    const scoreStyle = {
        fontSize: '16px',
        fill: '#000', 
        fontFamily: 'Noto Sans JP, sans-serif', 
        stroke: '#FFF', 
        strokeThickness: 2 
    };
    
    const CAM_W = this.sys.game.config.width; 
    scoreText = this.add.text(CAM_W - 10, 12, 'スコア: 0点', scoreStyle).setOrigin(1, 0);
    scoreText.setDepth(10020).setVisible(false); 

    
    
    const heartSpacing = 35; 
    for (let i = 0; i < 3; i++) {
        const heart = this.add.image(10 + (i * heartSpacing), 10, 'heart').setOrigin(0, 0);
        heart.setDepth(10020).setDisplaySize(30, 30).setVisible(false);
        heartImages.push(heart);
    }

    
    
    const difficultyX = 10 + (3 * heartSpacing) + 10; 

    difficultyText = this.add.text(difficultyX, 14, 'Level: 1', scoreStyle)
        .setOrigin(0, 0); 
    difficultyText.setDepth(10020).setVisible(false);


    
    
    const soundStyle = {
        fontSize: '24px',
        fill: '#FFF',
        fontFamily: 'Arial, sans-serif' 
    };
    soundToggleBtn = this.add.text(0, 0, '🔊', soundStyle).setInteractive({ cursor: 'pointer' });

    
    soundToggleContainer = this.add.container(CAM_W - 40, 45, [soundToggleBtn]);
    soundToggleContainer.setDepth(10020).setVisible(false);

    
    
    soundToggleBtn.on('pointerdown', bindSoundTogglePhaser, this);

    

    
    updateHeartsPhaser(); updateScorePhaser(); 
    
    
    gamePaused = true;

}



function bindSoundTogglePhaser() {
    const isMuted = !game.sound.mute;
    game.sound.mute = isMuted;
    
    soundToggleBtn.setText(isMuted ? '🔇' : '🔊');
}


function gameRunning() {
    return !gamePaused && !!dropTimer;
}


function update(time, delta) {
    const scene = game.scene.scenes[0];
    if (!scene) return;

    const keys = scene._keys;
    const deltaScale = delta / 30; 
    const movePerTick = 5;

    
    
    
    if (!gamePaused) {
        accumulatedGameTime += delta;
    }

    
    
    
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

    
    
    
    try {
        if (
            gameRunning() && 
            (Phaser.Input.Keyboard.JustDown(keys.UP) || Phaser.Input.Keyboard.JustDown(keys.W) || Phaser.Input.Keyboard.JustDown(keys.SPACE))
        ) {
            playerJump(scene);
        }
    } catch (e) { }

    
    
    
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

    
    
    
    if (isInvincible) {
        blinkFrame++;
        player.alpha = (blinkFrame % 6 < 3) ? 0.3 : 1;
    } else {
        player.alpha = 1;
    }

    
    
    
    if (!gamePaused) {
        const elapsed = Math.floor(accumulatedGameTime / 1000);
        const newSpeed = minSpeed + Math.floor(elapsed / speedInterval);
        if (newSpeed !== speedLevel) {
            speedLevel = newSpeed;
            adjustDropRate(false, scene);

        }
    }

    
    
    
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

    
    
    
    if (difficultyText) {
        const difficultyName = difficultySettings[currentDifficulty]?.displayName || '不明';
        difficultyText.setText('レベル: ' + difficultyName);
    }
    if (scoreText) {
        scoreText.setText('スコア: ' + score + '点');
    }

}


function rectsOverlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }


function allocateItem(scene, type, x, y, speed) {
    let it = null;
    
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
    
    try { itemsGroup.remove(it); } catch (e) { }
    itemPool.push(it);
}


function clearAllItems(scene) {
    try {
        
        const children = itemsGroup.getChildren().slice();
        children.forEach(ch => {
            try { ch.destroy(); } catch (e) { }
        });
        
        try { itemsGroup.clear(true); } catch (e) { }
    } catch (e) { }

    
    try {
        itemPool.forEach(p => { try { p.destroy(); } catch (e) { } });
    } catch (e) { }
    itemPool = [];

    
    try {
        for (let i = 0; i < 30; i++) {
            const img = scene.add.image(-1000, -1000, 'candy').setDisplaySize(30, 30).setVisible(false).setOrigin(0, 0);
            itemPool.push(img);
        }
    } catch (e) { }
}


function spawnItem(scene) {
    if (inKatakanaEvent) return;
    const r = Math.random(); let type = (r < 0.4) ? 'candy' : (r < 0.8) ? 'donut' : 'bomb';
    
    const itemW = 30;
    const x = Math.random() * (480 - itemW);
    allocateItem(scene, type, x, -30);
}

function spawnPatternRow(scene) {
    const itemW = 30;
    const cols = Math.floor(480 / itemW); 

    
    const holeSize = eventLoopCount === 0 ? 8 : 3;

    
    const hole = Math.floor(Math.random() * (cols - holeSize));

    for (let i = 0; i < cols; i++) {
        
        if (i < hole || i >= hole + holeSize) {
            allocateItem(scene, 'bomb', i * itemW, -itemW);
        }
    }
}

function spawnKatakanaChar(scene, char, isLastChar) {
    const pattern = katakanaPatterns[char] || [];
    const startX = 240 - 90; 
    
    let heartIndex = -1; if (isLastChar && lives < 3) heartIndex = Math.floor(Math.random() * pattern.length);
    pattern.forEach((p, idx) => {
        const type = (idx === heartIndex) ? 'heart' : 'star';
        
        allocateItem(scene, type, startX + p[0], p[1] - 100);
    });
}



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
                    eventLoopCount++;
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


let accumulatedGameTime = 0; 

let gamePaused = false;


let bgTimeouts = []; 


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


function pauseGameForTab() {
    if (gamePaused) return;
    gamePaused = true;

    if (dropTimer) dropTimer.paused = true;
    eventTimers.forEach(t => { try { t.paused = true; } catch (e) { } });
    pauseBgTimeouts();
    pauseAllSoundsForPause(game.scene.scenes[0]);
    pauseBackgroundLoop();
}

function resumeGameForTab() {
    if (!gameRunning()) {
        console.log('非アクティブ復帰：ゲーム中ではないため入力無効');
        return;
    }

    if (!gamePaused) return;
    gamePaused = false;

    if (dropTimer) dropTimer.paused = false;
    eventTimers.forEach(t => { try { t.paused = false; } catch (e) { } });
    resumeBgTimeouts();
    resumeAllSoundsForPause(game.scene.scenes[0]);
    resumeBackgroundLoop();
}


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


function startGame(scene) {
    
    
    
    try { if (dropTimer) { dropTimer.remove(false); dropTimer = null; } } catch (e) { }
    clearEventTimers();
    try { if (invincibleTimer) { clearTimeout(invincibleTimer); invincibleTimer = null; isInvincible = false; } } catch (e) { }
    try { if (scene._bgm) { try { scene._bgm.stop(); } catch (e) { } scene._bgm.destroy && scene._bgm.destroy(); scene._bgm = null; } } catch (e) { }
    try { if (scene._activeSfx) { scene._activeSfx.forEach(s => { try { s.stop && s.stop(); } catch (e) { } }); scene._activeSfx = []; } } catch (e) { }
    try { clearAllItems(scene); } catch (e) { }

    
    
    
    ['startScreen', 'gameOverScreen', 'difficultyModal_phaser'].forEach(id => {
        try { document.getElementById(id).style.display = 'none'; } catch (e) { }
    });

    
    
    
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

    const bgLayer = document.getElementById('bgLayer');

    
    if (bgLayer && !bgLayer.dataset.initialized) {
        bgLayer.dataset.initialized = "true";
        bgLayer.style.backgroundImage = `url(${setting.defaultBg})`;
    }
    
    const bgLayer2 = document.getElementById('bgLayer2');
    if (bgLayer2) {
        bgLayer2.style.display = "none";
        bgLayer2.style.zIndex = "-1";
        bgLayer2.style.backgroundImage = "url('asset/images/t.png')";
        bgLayer2.style.transform = '';
    }

    
    
    
    score = 0; lives = 3; isInvincible = false; blinkFrame = 0;
    accumulatedGameTime = 0;
    
    inKatakanaEvent = false;
    eventLoopCount = 0;
    try { itemsGroup.getChildren().forEach(it => recycleItem(it)); } catch (e) { }

    
    try { if (player) { player.x = 240; player.y = 580; player.dy = 0; player.onGround = true; } } catch (e) { }

    
    
    
    try {
        const controlsEl = document.getElementById('controls');
        if (controlsEl) {
            const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));
            controlsEl.style.display = isTouch ? 'flex' : 'none';
        }
    } catch (e) { }

    
    
    
    if (scoreText) scoreText.setVisible(true);
    if (difficultyText) difficultyText.setVisible(true);
    if (soundToggleContainer) soundToggleContainer.setVisible(true);
    if (heartImages.length > 0) heartImages.forEach(h => h.setVisible(true));

    
    
    
    adjustDropRate(true, scene);       
    clearEventTimers();
    scheduleEvents(scene);             

    
    
    
    if (!isMuted && setting.bgmKey) {
        try {
            scene._bgm = scene.sound.add(setting.bgmKey, { loop: true, volume: 0.3 });
            scene._bgm.play();
        } catch (e) { }
    }

    
    
    
    updateHeartsPhaser();
    updateScorePhaser();
}

function endGame(status) {
    
    if (dropTimer) { try { dropTimer.remove(false); } catch (e) { } dropTimer = null; }
    clearEventTimers();
    
    try { const s = game.scene.scenes[0]; if (s._bgm) s._bgm.stop(); } catch (e) { }

    
    try { document.getElementById('controls').style.display = 'none'; } catch (e) { }

    if (scoreText) scoreText.setVisible(false);
    if (difficultyText) difficultyText.setVisible(false);
    if (soundToggleContainer) soundToggleContainer.setVisible(false);
    if (heartImages.length > 0) heartImages.forEach(h => h.setVisible(false));

    document.getElementById('endTitle').textContent = status;

    
    document.getElementById('diff_level').textContent = 'レベル： ' + difficultySettings[currentDifficulty]?.displayName || '不明';
    document.getElementById('finalScore').textContent = 'スコア： ' + formatScoreKanji(score) + '点';

    
    if (score >= clearscore) {
        playSound('clear'); 

        document.querySelector('#gameOverScreen .clear_img').style.display = 'block';
        document.getElementById('gameOverScreen').style.backgroundImage = "url('asset/images/clear.png')";

        const clearImageElement = document.getElementById('clearImage');

        
        if (clearImageElement) {
            clearImageElement.src = 'asset/images/clear_ham.png';
            
        }
    } else {
        playSound('gameover'); 

        document.querySelector('#gameOverScreen .clear_img').style.display = 'none';
        document.getElementById('gameOverScreen').style.backgroundImage = "url('asset/images/gameover.png')";
        const clearImageElement = document.getElementById('clearImage');

        
        if (clearImageElement) {
            clearImageElement.src = 'asset/images/gameover_img.png';
            
        }
    }

    document.getElementById('gameOverScreen').style.display = 'flex';

    pauseBackgroundLoop();       
    gamePaused = true;

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


let achievementShown = false;


function showBillionAchievement(scene) {
    if (achievementShown) return;
    achievementShown = true;

    
    playSound('clear');

    
    const text = scene.add.text(scene.scale.width + 200, scene.scale.height / 2, '100億点達成！100億点達成！100億点達成！', {
        fontFamily: "Noto Sans JP, sans-serif",
        fontSize: '48px',
        color: '#fff',
        fontStyle: '400',
        stroke: '#333',
        strokeThickness: 2
    }).setOrigin(0.5);

    
    scene.tweens.add({
        targets: text,
        x: -500,             
        duration: 5000,      
        ease: 'Linear',
        onComplete: () => { text.destroy(); }
    });

    
    scene.tweens.add({
        targets: text,
        alpha: 0,            
        duration: 500,       
        yoyo: true,          
        repeat: -1           
    });

    
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(8, 8, 8);
    graphics.generateTexture("particle", 16, 16);

    
    function launchFirework(scene) {
        
        const groundY = scene.scale.height - 150;

        
        
        const side = Phaser.Math.Between(0, 1); 
        const startX = side === 0
            ? Phaser.Math.Between(50, scene.scale.width / 3)
            : Phaser.Math.Between((scene.scale.width * 2) / 3, scene.scale.width - 50);

        const targetY = Phaser.Math.Between(100, scene.scale.height / 3);

        
        const rocket = scene.add.particles(startX, groundY, "particle", {
            speedY: { min: -500, max: -600 },
            lifespan: 800,
            scale: { start: 0.3, end: 0.1 },
            alpha: { start: 1, end: 0.5 },
            quantity: 1,
            frequency: 50,
            tint: 0xffffcc
        });

        
        scene.time.delayedCall(800, () => {
            rocket.stop();
            rocket.destroy();

            
            const explosion = scene.add.particles(startX, targetY, "particle", {
                speed: { min: -400, max: 400 },
                angle: { min: 0, max: 360 },
                lifespan: 1200,
                scale: { start: 0.48, end: 0 }, 
                alpha: { start: 1, end: 0 },
                gravityY: 300,
                blendMode: "ADD",
                tint: [0xff6666, 0x66ff66, 0x6666ff, 0xffff66]
            });

            
            scene.time.delayedCall(200, () => {
                const sparkle = scene.add.particles(startX, targetY, "particle", {
                    speed: { min: -150, max: 150 },
                    angle: { min: 0, max: 360 },
                    lifespan: 2000,
                    scale: { start: 0.16, end: 0 }, 
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
    if (!gameRunning()) return; 
    if (player.onGround) { player.dy = -15; player.onGround = false; playSound('jump'); }
}

function playSound(key) {
    try {
        const s = game.scene.scenes[0];
        if (isMuted) return;
        if (!s) return;
        
        let snd = null;
        try {
            snd = s.sound.add(key, { volume: 0.4 });
        } catch (e) {
            
            try { s.sound.play(key, { volume: 0.4 }); } catch (e) { }
        }
        if (snd) {
            try { snd.play(); } catch (e) { }
            try {
                if (!s._activeSfx) s._activeSfx = [];
                s._activeSfx.push(snd);
                
                try { snd.once && snd.once('complete', () => { const idx = s._activeSfx.indexOf(snd); if (idx >= 0) s._activeSfx.splice(idx, 1); snd.destroy && snd.destroy(); }); } catch (e) { }
            } catch (e) { }
        }
    } catch (e) { }
}




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
            
            const textureKey = (i < lives) ? 'heart' : 'heartEmpty'; 
            heartImages[i].setTexture(textureKey).setVisible(true);
        }
    }
}
function updateScorePhaser() {
    if (scoreText) {
        scoreText.setText('Score: ' + score + '点');
    }
}



function formatScoreKanji(num) {
    const oku = Math.floor(num / 100000000);      
    const man = Math.floor((num % 100000000) / 10000); 
    const ichi = num % 10000;                     

    let result = '';
    if (oku > 0) result += oku + '億';
    if (man > 0) result += man + '万';
    if (ichi > 0 || result === '') result += ichi; 
    return result;
}














































































window.phaserStartGame = function () { const s = game.scene.scenes[0]; if (s) startGame(s); };


window.addEventListener('load', () => {
    try { showSplashThenInit(); } catch (e) { try { bindShareButtons(); } catch (e) { } }
});


window._phaserGame = { game };



(function registerVisibilityHandlers() {

    function shouldStayPaused() {
        const startVisible = document.getElementById('startScreen')?.style.display === 'flex';
        const overVisible = document.getElementById('gameOverScreen')?.style.display === 'flex';
        const modalVisible = document.getElementById('difficultyModal_phaser')?.style.display === 'block';
        
        return startVisible || overVisible || modalVisible;
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseGameForTab();
        } else {
            if (!shouldStayPaused()) resumeGameForTab();
        }
    });

    
    window.addEventListener('blur', () => {
        pauseGameForTab();
    });

    window.addEventListener('focus', () => {
        if (!shouldStayPaused()) resumeGameForTab();
    });

})();





let bgIntervalWasRunning = false;




function pauseGameForTab() {
    if (gamePaused) return;
    gamePaused = true;

    
    if (dropTimer) {
        try { dropTimer.paused = true; } catch (e) { }
    }

    
    try { eventTimers.forEach(t => { try { t.paused = true; } catch (ee) { } }); } catch (e) { }

    
    try {
        if (bgTimeoutId) {
            bgIntervalWasRunning = true;
            clearInterval(bgTimeoutId);
            bgTimeoutId = null;
        } else {
            bgIntervalWasRunning = false;
        }
    } catch (e) { }

    
    try { pauseBgTimeouts(); } catch (e) { }

    
    try { pauseAllSoundsForPause(game.scene && game.scene.scenes && game.scene.scenes[0]); } catch (e) { }

    
    try {
        const scene = game.scene && game.scene.scenes && game.scene.scenes[0];
        if (scene && scene.physics && scene.physics.world) {
            scene.physics.world.pause();
        }
    } catch (e) { }

    
    try {
        if (player) {
            if (player.body) {
                player.body.setVelocity(0, 0);
                player.body.moves = false; 
            }
            player.canMove = false; 
        }
    } catch (e) { }

    
    try { const p = document.getElementById('pauseOverlay'); if (p) p.style.display = 'flex'; } catch (e) { }
}



function resumeGameForTab() {
    if (!gamePaused) return;
    gamePaused = false;

    
    if (dropTimer) {
        try { dropTimer.paused = false; } catch (e) { }
    }

    
    try { eventTimers.forEach(t => { try { t.paused = false; } catch (ee) { } }); } catch (e) { }

    
    try {
        if (bgIntervalWasRunning) {
            
            try { initBackgroundLoop(currentDifficulty); } catch (e) { }
            bgIntervalWasRunning = false;
        }
    } catch (e) { }

    
    try { resumeBgTimeouts(); } catch (e) { }

    
    try { resumeAllSoundsForPause(game.scene && game.scene.scenes && game.scene.scenes[0]); } catch (e) { }

    
    try {
        const scene = game.scene && game.scene.scenes && game.scene.scenes[0];
        if (scene && scene.physics && scene.physics.world) {
            scene.physics.world.resume();
        }
    } catch (e) { }

    
    try {
        if (player) {
            if (player.body) {
                player.body.moves = true;
            }
            player.canMove = true; 
        }
    } catch (e) { }


    
    try { const p = document.getElementById('pauseOverlay'); if (p) p.style.display = 'none'; } catch (e) { }
}

