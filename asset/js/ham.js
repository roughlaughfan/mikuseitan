// Phaser移植版 - 元の ham.js と同等の挙動を再現します
// Phaser単体移植版：ham.js の挙動をできるだけ忠実に再現します
(function () {
    // ====== 画像/音声パス ======
    const IMG_PATHS = {
        player: 'asset/images/player.png',
        candy: 'asset/images/candy.png',
        donut: 'asset/images/donut.png',
        bomb: 'asset/images/bomb.png',
        heart: 'asset/images/heart.png',
        heartEmpty: 'asset/images/heart_empty.png',
        star: 'asset/images/star.png'
    };

    const SOUND_PATHS = {
        jump: 'asset/sounds/jump.mp3',
        damage: 'asset/sounds/damage.mp3',
        item: 'asset/sounds/item.mp3',
        heart: 'asset/sounds/heart.mp3',
        gameover: 'asset/sounds/gameover.mp3',
        clear: 'asset/sounds/clear.mp3',
        bgm: 'asset/sounds/bgm.mp3',
        star: 'asset/sounds/star.mp3'
    };

    // ====== DOM 要素 ======
    const difficultyDisplay = document.getElementById('difficultyDisplay');
    const heartsDiv = document.getElementById('hearts');
    const scoreDiv = document.getElementById('score');

    // ====== カタカナパターン（ham.js から移植） ======
    const katakanaPatterns = {
        "フ": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ジ": [[0, 0], [2, 0], [4, 0], [6, 0], [1, 1], [0, 2], [4, 2], [1, 3], [5, 3], [4, 4], [3, 5], [0, 6], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
        "サ": [[2, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [2, 2], [5, 2], [2, 3], [5, 3], [5, 4], [4, 5], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
        "キ": [[3, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [3, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [3, 5], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ミ": [[1, 0], [2, 0], [3, 0], [4, 1], [5, 1], [2, 2], [3, 3], [4, 3], [1, 5], [2, 5], [3, 5], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ク": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
        "オ": [[4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [4, 2], [3, 3], [4, 3], [2, 4], [4, 4], [0, 5], [1, 5], [4, 5], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
        "タ": [[2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [0, 3], [2, 3], [4, 3], [6, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ン": [[1, 0], [2, 1], [6, 2], [6, 3], [5, 4], [4, 5], [1, 6], [2, 6], [3, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ョ": [[1, 2], [2, 2], [3, 2], [4, 2], [4, 3], [2, 4], [3, 4], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ウ": [[2, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [0, 2], [5, 2], [5, 3], [4, 4], [3, 5], [1, 6], [2, 6]].map(([x, y]) => [x * 30, y * 30]),
        "ビ": [[0, 0], [3, 0], [5, 0], [7, 0], [0, 1], [0, 2], [3, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3], [0, 4], [0, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]].map(([x, y]) => [x * 30, y * 30]),
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
            minSpeed: 6, maxSpeed: 10, speedInterval: 20,
            dropIntervalBase: 400, dropIntervalReduction: 200,
            bgFirst: 'asset/images/hint_bg.png',
            bgImages: ['asset/images/bg01.png', 'asset/images/bg02.png', 'asset/images/bg03.png', 'asset/images/bg04.png', 'asset/images/bg05.png'],
            bgmKey: 'bgm', defaultBg: 'asset/images/default_bg03.png',
            katakanaWords: [
["サ", "シ", "ミ", "ス", "キ"],
["ト", "ウ", "シ", "デ", "チ", "ャ", "ー", "ジ"]
            ]
        },
        2: {
            minSpeed: 4, maxSpeed: 8, speedInterval: 20,
            dropIntervalBase: 600, dropIntervalReduction: 200,
            bgFirst: 'asset/images/hint_bg02.png',
            bgImages: ['asset/images/bg06.png', 'asset/images/bg07.png', 'asset/images/bg08.png', 'asset/images/bg09.png', 'asset/images/bg10.png'],
            bgmKey: 'bgm', defaultBg: 'asset/images/default_bg02.png',
            katakanaWords: [
["ミ", "ス", "タ", "ー", "チ", "ャ", "ン", "ス"],
["ビ", "ジ", "ン", "ト", "ク"]
            ]
        },
        1: {
            minSpeed: 2, maxSpeed: 6, speedInterval: 20,
            dropIntervalBase: 1000, dropIntervalReduction: 200,
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
    let lastChangeTime = 0;
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

    function pauseBackgroundLoop() {
        if (!bgIntervalId) return;

        clearInterval(bgIntervalId);
        clearTimeout(bgTimeoutId);
        bgIntervalId = null;

        // 次の切り替えまでの残り時間を計算
        const elapsed = Date.now() - lastChangeTime;
        remainingTime = Math.max(0, 10000 - elapsed);
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
    let currentDifficulty = 1;
    let bgImageList = [];
    let shuffledImages = [];
    const backToStartBtn = document.getElementById('backToStartBtn_phaser'); if (backToStartBtn) backToStartBtn.addEventListener('click', () => { stopAllSounds(); resetBackgroundLoop(); document.getElementById('gameOverScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; try { document.getElementById('hearts').style.display = 'none'; } catch (e) { } try { document.getElementById('score').style.display = 'none'; } catch (e) { } try { document.getElementById('difficultyDisplay').style.display = 'none'; } catch (e) { } });
    const backToStartTop = document.getElementById('backToStartBtn_top'); if (backToStartTop) backToStartTop.addEventListener('click', () => { stopAllSounds(); resetBackgroundLoop(); document.getElementById('clearScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; try { document.getElementById('hearts').style.display = 'none'; } catch (e) { } try { document.getElementById('score').style.display = 'none'; } catch (e) { } try { document.getElementById('difficultyDisplay').style.display = 'none'; } catch (e) { } });
    let inKatakanaEvent = false;
    let katakanaPatternIndex = 0;

    // speed/time control
    let minSpeed = 3, maxSpeed = 7, speedLevel = 3, speedInterval = 20;
    let gameStartTime = Date.now();

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
        player = scene.add.image(240, 580, 'player').setDisplaySize(42, 50).setOrigin(0, 0);
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

        document.querySelectorAll('.diffBtn_phaser').forEach(btn => btn.addEventListener('click', (e) => {
            currentDifficulty = parseInt(e.target.dataset.level);
            initBackgroundLoop(currentDifficulty);
            document.getElementById('difficultyModal_phaser').style.display = 'none';
            startGame(scene);
        }));
        const retryBtn = document.getElementById('retryBtn_phaser'); if (retryBtn) retryBtn.addEventListener('click', () => { stopAllSounds(scene); resetBackgroundLoop(); startGame(scene); });
        const backToStartBtn = document.getElementById('backToStartBtn_phaser'); if (backToStartBtn) backToStartBtn.addEventListener('click', () => { document.getElementById('gameOverScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; });
        const backToStartTop = document.getElementById('backToStartBtn_top'); if (backToStartTop) backToStartTop.addEventListener('click', () => { document.getElementById('clearScreen').style.display = 'none'; document.getElementById('startScreen').style.display = 'flex'; });

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

        // initial UI
        updateHearts(); updateScore();
        // bind sound toggle button
        bindSoundToggle();
        // hide sound toggle on initial (start) screen
        try { const st = document.getElementById('soundToggleContainer'); if (st) st.style.display = 'none'; } catch (e) { }
    }

    // helper: is game running
    function gameRunning() {
        return !gamePaused && !!dropTimer;
    }

    function update(time, delta) {
        const scene = game.scene.scenes[0];
        if (!scene) return;
        if (!gameRunning()) return;

        const keys = scene._keys;
        // horizontal movement: scale by delta/30 to match ham.js per-tick motion
        const deltaScale = delta / 30;
        const movePerTick = 5; // pixels per ham.js tick
        let moved = false;

        if ((keys.LEFT && keys.LEFT.isDown) || (keys.A && keys.A.isDown)) {
            player.x = Math.max(0, player.x - movePerTick * deltaScale);
            player.flipX = false; // 左向きに設定
            moved = true;
        }

        if ((keys.RIGHT && keys.RIGHT.isDown) || (keys.D && keys.D.isDown)) {
            player.x = Math.min(480 - player.width, player.x + movePerTick * deltaScale);
            player.flipX = true; // 右向きに設定 (反転)
            moved = true;
        }
        // jump detection (single-press) — UP / W / SPACE
        try {
            if (Phaser.Input.Keyboard.JustDown(keys.UP) || Phaser.Input.Keyboard.JustDown(keys.W) || Phaser.Input.Keyboard.JustDown(keys.SPACE)) {
                playerJump(scene);
            }
        } catch (e) { }

        // gravity (units: dy is px per ham.js tick) — apply gravity scaled by delta
        const gravity = 1;
        player.dy += gravity * deltaScale;
        player.y += player.dy * deltaScale;
        if (player.y + player.height >= 640) { player.y = 640 - player.height; player.dy = 0; player.onGround = true; }

        // invincible blinking
        if (isInvincible) { blinkFrame++; player.alpha = (blinkFrame % 6 < 3) ? 0.3 : 1; } else { player.alpha = 1; }

        // speed adjustment by elapsed time (same formula as ham.js)
        const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        const newSpeed = minSpeed + Math.floor(elapsed / speedInterval);
        if (newSpeed !== speedLevel) { speedLevel = newSpeed; adjustDropRate(false, scene); }

        // move items and collision check (scale vertical movement by delta)
        const children = itemsGroup.getChildren().slice();
        for (let i = children.length - 1; i >= 0; i--) {
            const it = children[i];
            const downKey = (keys.S && keys.S.isDown) || (keys.DOWN && keys.DOWN.isDown);
            const spd = speedLevel * (downKey ? 2 : 1);
            it.y += spd * deltaScale;

            if (it.active && rectsOverlap({ x: player.x, y: player.y, w: player.width, h: player.height }, { x: it.x, y: it.y, w: it.displayWidth, h: it.displayHeight })) {
                const type = it.getData('type') || 'candy';
                // If player is invincible, bombs should NOT be removed on collision (other items still collected)
                if (type === 'bomb' && isInvincible) {
                    // skip handling so bomb remains in play
                    continue;
                }
                handleItemCollision(type);
                recycleItem(it);
                continue;
            }
            if (it.y > 700) recycleItem(it);
        }

        // UI
        difficultyDisplay.textContent = 'Level: ' + currentDifficulty;
        scoreDiv.textContent = 'Score: ' + score;
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
                const int = scene.time.addEvent({ delay: 5000, loop: true, callback: () => { spawnPatternRow(scene); if (++count >= 3) int.remove(false); } });
                eventTimers.push(int);
                const t = scene.time.delayedCall(20000, runEvent); eventTimers.push(t);
            } else {
                // katakana
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
                        const t = scene.time.delayedCall(2000, nextChar); eventTimers.push(t);
                    } else {
                        inKatakanaEvent = false;
                        const resetT = scene.time.delayedCall(2000, () => {
                            resetBackgroundWithFlip();
                            minSpeed += 1; speedLevel = minSpeed; adjustDropRate(true, scene); gameStartTime = Date.now();
                        }); eventTimers.push(resetT);
                        const t = scene.time.delayedCall(10000, runEvent); eventTimers.push(t);
                        katakanaPatternIndex = (katakanaPatternIndex + 1) % setting.katakanaWords.length;
                    }
                };
                const firstT = scene.time.delayedCall(2000, nextChar);
                eventTimers.push(firstT);
            }
        };

        const initial = scene.time.delayedCall(20000, runEvent); eventTimers.push(initial);
    }

    function clearEventTimers() {
        eventTimers.forEach(t => { try { t.remove(false); } catch (e) { } }); eventTimers = [];
    }
    // ====== 一時停止・復帰管理 ======

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

    // function clearBgTimeouts() {
    //     bgTimeouts.forEach(h => clearTimeout(h.id));
    //     bgTimeouts = [];
    // }

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
        eventTimers.forEach(t => { try { t.paused = true; } catch (e) { } });

        // pauseGameForTab に追加
        try {
            if (bgIntervalId) {
                bgIntervalWasRunning = true;
                clearInterval(bgIntervalId);
                bgIntervalId = null;
            } else {
                bgIntervalWasRunning = false;
            }

            // ==== 背景クロスフェード中も止める ====
            const d_bg1 = document.querySelector('#bgLayer .bg1');
            const d_bg2 = document.querySelector('#bgLayer .bg2');
            if (d_bg1 && d_bg2) {
                // 強制的に現在の状態に固定
                if (activeLayer === 0) {
                    d_bg1.classList.add('active');
                    d_bg2.classList.remove('active');
                } else {
                    d_bg2.classList.add('active');
                    d_bg1.classList.remove('active');
                }
            }
        } catch (e) { }

        pauseBgTimeouts();
        pauseAllSoundsForPause(game.scene.scenes[0]);
    }

    function resumeGameForTab() {
        if (!gamePaused) return;
        gamePaused = false;

        if (dropTimer) dropTimer.paused = false;
        eventTimers.forEach(t => { try { t.paused = false; } catch (e) { } });

        // 背景ループ再開（currentBgIndex の状態から継続）
        try {
            if (bgIntervalWasRunning) {
                // 背景ループを再開
                resumeBackgroundLoop();
                bgIntervalWasRunning = false;
            }
        } catch (e) { }

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
        // resetがtrue (startGameからのリスタート) の場合は minSpeed/speedLevel を初期値として使う
        const currentSpeedLevel = Math.max(1, speedLevel);

        // interval の計算を統一 (reset=true の場合も速度を反映)
        const interval = Math.max(300, setting.dropIntervalBase / currentSpeedLevel);

        dropTimer = scene.time.addEvent({
            delay: interval,
            loop: true,
            callback: () => spawnItem(scene)
        });
    }

    // game start / init
    function startGame(scene) {
        // ensure any lingering timers/items from previous run are fully cleared
        try { if (dropTimer) { try { dropTimer.remove(false); } catch (e) { } dropTimer = null; } } catch (e) { }
        clearEventTimers();
        try { if (invincibleTimer) { clearTimeout(invincibleTimer); invincibleTimer = null; isInvincible = false; } } catch (e) { }
        try { if (game && game.scene && game.scene.scenes[0] && game.scene.scenes[0]._bgm) { try { game.scene.scenes[0]._bgm.stop(); } catch (e) { } } } catch (e) { }
        // stop any active SFX recorded on the scene (clear/gameover, star, etc.)
        try { const s = (scene || (game && game.scene && game.scene.scenes[0])); if (s && s._activeSfx) { s._activeSfx.forEach(so => { try { so.stop && so.stop(); } catch (e) { } }); s._activeSfx = []; } } catch (e) { }
        // destroy existing items and rebuild pool
        try { clearAllItems(scene); } catch (e) { }

        // hide screens
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('clearScreen').style.display = 'none';
        document.getElementById('difficultyModal_phaser').style.display = 'none';

        const setting = difficultySettings[currentDifficulty];
        minSpeed = setting.minSpeed; speedLevel = setting.minSpeed; maxSpeed = setting.maxSpeed; speedInterval = setting.speedInterval;
        bgImageList = setting.bgImages.slice(); shuffledImages = shuffleArray(bgImageList); firstBgUsed = false; katakanaWords = setting.katakanaWords; katakanaPatternIndex = 0;
        document.getElementById('bgLayer').style.backgroundImage = `url(${setting.defaultBg})`;

        // 特殊イベント用背景(bgLayer2)のリセット処理
        const bgLayer2 = document.getElementById('bgLayer2');
        if (bgLayer2) {
            bgLayer2.style.display = "none";
            bgLayer2.style.zIndex = "-1";
            bgLayer2.style.backgroundImage = "url('asset/images/t.png')"; // resetBackgroundWithFlipで設定されているデフォルトに戻す
            bgLayer2.style.transform = '';
        }


        // reset state
        score = 0; lives = 3; isInvincible = false; blinkFrame = 0; gameStartTime = Date.now();
        inKatakanaEvent = false;
        // clear any remaining items (defensive)
        try { itemsGroup.getChildren().forEach(it => recycleItem(it)); } catch (e) { }

        // reset player position/velocity to initial values (important on restart)
        try {
            if (player) {
                player.x = 240; player.y = 580; player.dy = 0; player.onGround = true;
            }
        } catch (e) { }

        // show HUD and controls
        try { document.getElementById('hearts').style.display = 'flex'; } catch (e) { }
        try { document.getElementById('score').style.display = 'block'; } catch (e) { }
        try { document.getElementById('difficultyDisplay').style.display = 'block'; } catch (e) { }
        try {
            // Show touch controls only on touch-capable devices (mobile/tablet)
            const controlsEl = document.getElementById('controls');
            if (controlsEl) {
                const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));
                controlsEl.style.display = isTouch ? 'flex' : 'none';
            }
        } catch (e) { }
        try { const st = document.getElementById('soundToggleContainer'); if (st) st.style.display = 'block'; } catch (e) { }

        // start drop timer & events
        // Use non-reset behavior so initial drop interval is scaled by speedLevel (matches ham.js)
        adjustDropRate(true, scene); // 既存のタイマーをリセット（再生成）する挙動を強制する
        clearEventTimers(); scheduleEvents(scene);

        // BGM: only start if not muted and game is running
        try {
            if (!isMuted) {
                try { if (scene._bgm) { try { scene._bgm.stop(); } catch (e) { } scene._bgm.destroy && scene._bgm.destroy(); scene._bgm = null; } } catch (e) { }
                if (setting.bgmKey) {
                    try { scene._bgm = scene.sound.add(setting.bgmKey, { loop: true, volume: 0.1 }); scene._bgm.play(); } catch (e) { }
                }
            }
        } catch (e) { }

        updateHearts(); updateScore();
    }

    function endGame(status) {
        // stop timers
        if (dropTimer) { try { dropTimer.remove(false); } catch (e) { } dropTimer = null; }
        clearEventTimers();
        // stop bgm
        try { const s = game.scene.scenes[0]; if (s._bgm) s._bgm.stop(); } catch (e) { }

        // hide HUD/controls
        try { document.getElementById('controls').style.display = 'none'; } catch (e) { }
        try { document.getElementById('hearts').style.display = 'none'; } catch (e) { }
        try { document.getElementById('score').style.display = 'none'; } catch (e) { }
        try { document.getElementById('difficultyDisplay').style.display = 'none'; } catch (e) { }
        try { const st = document.getElementById('soundToggleContainer'); if (st) st.style.display = 'none'; } catch (e) { }

        if (status === 'ゲームクリア！') {
            playSound('clear'); document.getElementById('clearTitle').textContent = '100億点達成！'; document.getElementById('finalClearScore').textContent = 'Score: ' + score; document.getElementById('clearScreen').style.display = 'flex';
        } else {
            playSound('gameover'); document.getElementById('endTitle').textContent = status; document.getElementById('finalScore').textContent = 'Score: ' + score; document.getElementById('gameOverScreen').style.display = 'flex';
        }
    }

    function handleItemCollision(type) {
        if (type === 'candy') { score += 3; playSound('item'); }
        else if (type === 'donut') { score += 9; playSound('item'); }
        else if (type === 'star') { score += 50000000; playSound('star'); }
        else if (type === 'heart') { if (lives < 3) { lives++; updateHearts(); } playSound('heart'); }
        else if (type === 'bomb') {
            if (!isInvincible) {
                lives--; updateHearts(); playSound('damage');
                if (lives <= 0) { endGame('ゲームオーバー'); return; }
                isInvincible = true; blinkFrame = 0; if (invincibleTimer) clearTimeout(invincibleTimer); invincibleTimer = setTimeout(() => { isInvincible = false; }, 3000);
            }
        }
        updateScore();
        if (score >= 10000000000) endGame('ゲームクリア！');
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

    // sound toggle binding (DOM)
    function bindSoundToggle() {
        const btn = document.getElementById('soundToggleBtn');
        if (!btn) return;
        const applyState = () => {
            btn.classList.toggle('muted', isMuted);
            btn.classList.toggle('unmuted', !isMuted);
            //btn.textContent = isMuted ? '音: OFF' : '音: ON';
            btn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
            try {
                const s = (game && game.scene && game.scene.scenes && game.scene.scenes[0]) ? game.scene.scenes[0] : null;
                const running = !!dropTimer; // gameplay indicator
                if (isMuted) {
                    // Pause BGM and active SFX rather than destroying so we can resume
                    try { pauseAllSoundsForMute(s); } catch (e) { }
                } else {
                    // Unmuted: resume paused sounds if game running; otherwise do nothing
                    try { resumeAllSounds(s, running); } catch (e) { }
                }
            } catch (e) { }
        };
        btn.addEventListener('click', () => { isMuted = !isMuted; applyState(); });
        applyState();
    }

    // Pause BGM and active SFX on mute (do not destroy) so they can be resumed
    function pauseAllSoundsForMute(scene) {
        try {
            const s = scene || (game && game.scene && game.scene.scenes && game.scene.scenes[0]);
            if (!s) return;
            try { if (s._bgm) { try { s._bgm.pause && s._bgm.pause(); } catch (e) { } } } catch (e) { }
            if (s._activeSfx && s._activeSfx.length) {
                s._activeSfx.forEach(so => { try { so.pause && so.pause(); } catch (e) { } });
            }
        } catch (e) { }
    }

    // Resume paused sounds when unmuting. If BGM didn't exist and game is running, start it from beginning.
    function resumeAllSounds(scene, running) {
        try {
            const s = scene || (game && game.scene && game.scene.scenes && game.scene.scenes[0]);
            if (!s) return;
            // Resume BGM if paused
            try {
                if (s._bgm) {
                    try { s._bgm.resume && s._bgm.resume(); } catch (e) { }
                } else if (running) {
                    // if game running and no bgm yet, create and start
                    try {
                        const setting = difficultySettings[currentDifficulty] || {};
                        if (setting.bgmKey) { s._bgm = s.sound.add(setting.bgmKey, { loop: true, volume: 0.1 }); s._bgm.play(); }
                    } catch (e) { }
                }
            } catch (e) { }
            // Resume SFX
            if (s._activeSfx && s._activeSfx.length) {
                s._activeSfx.forEach(so => { try { so.resume && so.resume(); } catch (e) { } });
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

    function updateHearts() {
        heartsDiv.innerHTML = '';
        for (let i = 0; i < 3; i++) { const img = document.createElement('img'); img.src = (i < lives) ? IMG_PATHS.heart : IMG_PATHS.heartEmpty; heartsDiv.appendChild(img); }
    }
    function updateScore() { scoreDiv.textContent = 'Score: ' + score; }

    // share button bindings (reuse original share code)
    function bindShareButtons() {
        // prefer the original IDs used in ham.js; fall back to _phaser suffixed IDs
        const shareBtn = document.getElementById('shareBtn') || document.getElementById('shareBtn_phaser');
        const shareBtnTop = document.getElementById('shareBtn_top') || document.getElementById('shareBtn_top_phaser');
        const gameUrl = encodeURIComponent('https://www.google.com');
        const hashtags = ["牡蠣サーモンキャッチゲーム", "テストプレイ", "HTML5ゲーム"];
        const formattedHashtags = hashtags.map(t => `#${t}`).join(' ');

        const shareHandler = (e) => { // クリック時に実行される関数を定義
            // クリック時にscore変数を参照する
            const shareText = encodeURIComponent(`牡蠣サーモンキャッチゲームでスコア${score}点を達成しました！\n${formattedHashtags}`);
            const shareUrlApp = `twitter://post?text=${shareText}&url=${gameUrl}`;
            const shareUrlWeb = `https://twitter.com/intent/tweet?text=${shareText}&url=${gameUrl}`;

            // If this is an <a>, ensure href is set (for long-press or non-JS fallback)
            try { if (e && e.currentTarget && e.currentTarget.tagName === 'A') e.currentTarget.href = shareUrlWeb; } catch (err) { }

            const nw = window.open(shareUrlWeb, '_blank');
            try {
                if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && nw) nw.location.href = shareUrlApp;
            } catch (e) { }
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
    const _origPause = typeof pauseGameForTab === 'function' ? pauseGameForTab : null;
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
    const _origResume = typeof resumeGameForTab === 'function' ? resumeGameForTab : null;
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
})();

