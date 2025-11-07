function enterGame() {
  const overlay = document.getElementById('warningOverlay');
  const wrapper = document.getElementById('gameWrapper');
  const remainingEl = document.getElementById('remainingAttempts');
  const attemptsEl = document.getElementById('attempts');
  const input = document.getElementById('ran');

  try {
    if (overlay) {
      overlay.style.transition = 'opacity 360ms ease, transform 360ms ease';
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(0.98)';
      setTimeout(() => { overlay.style.display = 'none'; }, 380);
    }

    if (wrapper) {
      wrapper.style.display = 'block';
      wrapper.style.opacity = '0';
      wrapper.style.transition = 'opacity 360ms ease';
      setTimeout(() => { wrapper.style.opacity = '1'; }, 40);
    }

    if (remainingEl) remainingEl.innerText = '3';
    if (attemptsEl) attemptsEl.innerText = '0';

    if (input) input.focus({ preventScroll: true });
  } catch (e) {
    console.error('enterGame error', e);
  }
}

let ranNumber = Math.floor(Math.random() * 1000) + 1;
let attempts = 0;
const maxAttempts = 3;
console.log(ranNumber);

const soundMap = {
  low: "voice/ah-patiyo-kohomada.mp3",
  high: "voice/audio0.mp3",
  win: "voice/happy-happy-happy-song.mp3",
  lose: "voice/parakramabahu-gamma-ganin.mp3",
};

const singlePlayer = new Audio(soundMap.win);
singlePlayer.preload = "auto";
singlePlayer.volume = 0.9;

function playKeyedSound(key) {
  const src = soundMap[key] || soundMap.fallback;
  if (singlePlayer.src && singlePlayer.src.endsWith(src)) {
    try {
      singlePlayer.pause();
      singlePlayer.currentTime = 0;
    } catch (e) {}
  } else {
    singlePlayer.src = src;
    try {
      singlePlayer.load();
    } catch (e) {}
  }
  try {
    const p = singlePlayer.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch (_) {}
}

function guess() {
  const guessNumber = Number(document.getElementById("ran").value);

  if (attempts < maxAttempts) {
    if (ranNumber > guessNumber) {
      attempts++;
      document.getElementById("attempts").innerText = attempts;

      Swal.fire({
        title: "Oops...",
        text: "Guessed Number Tooo Low!! Try Higher",
        imageUrl: "img/WhatsApp Image 2025-11-06 at 14.53.08_71435d04.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        didOpen: () => playKeyedSound("low"),
      });
    } else if (ranNumber < guessNumber) {
      attempts++;
      document.getElementById("attempts").innerText = attempts;
      Swal.fire({
        title: "Wrong",
        text: "Guessed number too high — try lower.",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZgni8AoLpGN1m7qk_VGI4cKPNwfpLq2Kr7Q&s",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        didOpen: () => playKeyedSound("high"),
      });
    } else {
      // correct guess
      attempts = 0;
      document.getElementById("attempts").innerText = attempts;
      Swal.fire({
        title: "You Won!",
        imageUrl: "img/download.jpeg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        didOpen: () => playKeyedSound("win"),
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "easyMode.html";
        }
      });
    }
  } else {
    Swal.fire({
      title: "Game Over",
      text: `You have exceeded the maximum number of attempts (${maxAttempts}).`,
      imageUrl:
        "data:image/jpeg;base64,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",
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: "Custom image",
      didOpen: () => playKeyedSound("lose"),
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "hardMode.html";
      }
    });
  }
}
