// --- konami.js ---
const secret_k = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
];

let inputSequence = [];
let konamiUnlocked = false;

document.addEventListener("keydown", (event) => {
    inputSequence.push(event.code);

    if (inputSequence.length > secret_k.length) {
        inputSequence.shift();
    }

    if (inputSequence.join(",") === secret_k.join(",")) {
        konamiUnlocked = true;

        // 効果音再生（1回だけ）
        playSound('se');

        if (player) {
            player.setTexture("playerAlt"); // プレイヤーオブジェクトのテクスチャを新しいキーに設定
        }
    }
});

function isKonamiUnlocked() {
    return konamiUnlocked;
}


//huwahuwalogo

(() => {
  const elems = Array.from(document.querySelectorAll('.float'));
  if (!elems.length) return;

  // グローバル設定（px / ms）
  const amplitude = 3;      // 振幅（上下の最大移動量 px）
  const period = 2800;       // 周期（ms） — 小さいと速くなる

  // 各要素に位相差や個別設定を付与（自然さのためにランダム化）
  elems.forEach((el, i) => {
    // 位相差（ラジアン）
    el._phase = (i * 0.7) % (2 * Math.PI);
    // 少しだけ個別の振幅・周期を与えて自然に
    el._amp = amplitude * (0.85 + Math.random() * 0.3);
    el._period = period * (0.9 + Math.random() * 0.3);
  });

  // アニメーション本体
  function step(now) {
    // now は ms（performance.now()）
    elems.forEach(el => {
      const t = now / el._period * 2 * Math.PI; // 角周波数 * time
      const y = Math.sin(t + el._phase) * el._amp;
      // translateY を使う（レイアウトを壊さず GPU 加速）
      el.style.transform = `translateY(${y.toFixed(2)}px)`;
    });
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

  // オプション: ホバーで停止する例
  elems.forEach(el => {
    el.addEventListener('mouseenter', () => el.style.animationPlayState = 'paused');
  });
})();