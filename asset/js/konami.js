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
        const se = new Audio("asset/sounds/konami_se.mp3");
        se.play();

        if (player) {
            player.setTexture("playerAlt"); // プレイヤーオブジェクトのテクスチャを新しいキーに設定
        }
    }
});

function isKonamiUnlocked() {
    return konamiUnlocked;
}
