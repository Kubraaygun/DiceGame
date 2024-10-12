"use strict";

// HTML'den gerekli elementleri seç
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Oyun için gerekli değişkenler
let scores, currentScore, activePlayer, playing;

// Oyunu başlatan fonksiyon
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Oyunu başlat
init();

// Oyuncu değiştiren fonksiyon
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Zar atma butonuna tıklanma olayı
btnRoll.addEventListener("click", function () {
  if (playing) {
    console.log("At butonuna tıklandı");
    // Zarın 1 ile 6 arasında rastgele bir değer alması
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Zar resmini göster
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Eğer zar 1 değilse, mevcut puanı güncelle
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Zar 1 ise, oyuncuyu değiştir
      switchPlayer();
    }
  }
});

// Tutma butonuna tıklanma olayı
btnHold.addEventListener("click", function () {
  if (playing) {
    // Mevcut puanı toplam puana ekle
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Eğer toplam puan 100 veya daha fazlaysa, oyunu bitir
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Aksi takdirde, oyuncuyu değiştir
      switchPlayer();
    }
  }
});

// Yeni oyun butonuna tıklanma olayı
btnNew.addEventListener("click", init);
