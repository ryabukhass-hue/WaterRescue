const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const endPage = document.getElementById("endPage");

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const timeDisplay = document.getElementById("time");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const gameArea = document.getElementById("gameArea");
const gameMessage = document.getElementById("gameMessage");
const finalScore = document.getElementById("finalScore");
const endMessage = document.getElementById("endMessage");

let score = 0;
let lives = 3;
let timeLeft = 30;
let progress = 0;

let dropInterval;
let timerInterval;

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", restartGame);

function startGame() {
  startPage.classList.add("hidden");
  endPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  score = 0;
  lives = 3;
  timeLeft = 30;
  progress = 0;

  updateScreen();

  gameMessage.textContent = "Tap the clean water drops!";

  dropInterval = setInterval(createDrop, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateScreen();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function createDrop() {
  const drop = document.createElement("div");

  const isClean = Math.random() > 0.3;

  drop.classList.add("drop");

  if (isClean) {
    drop.classList.add("clean");
    drop.textContent = "💧";
  } else {
    drop.classList.add("polluted");
    drop.textContent = "⚫";
  }

  const randomLeft = Math.floor(Math.random() * 85);
  drop.style.left = randomLeft + "%";

  const fallSpeed = Math.random() * 2 + 3;
  drop.style.animationDuration = fallSpeed + "s";

  gameArea.appendChild(drop);

  drop.addEventListener("click", () => {
    if (isClean) {
      score += 10;
      progress += 10;
      gameMessage.textContent = "+10 clean water!";
    } else {
      lives--;
      gameMessage.textContent = "Polluted drop! You lost a life.";
    }

    drop.remove();
    updateScreen();

    if (progress >= 100) {
      endGame(true);
    }

    if (lives <= 0) {
      endGame();
    }
  });

  setTimeout(() => {
    if (drop.parentElement) {
      drop.remove();
    }
  }, fallSpeed * 1000);
}

function updateScreen() {
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  if (lives === 3) {
    livesDisplay.textContent = "❤️❤️❤️";
  } else if (lives === 2) {
    livesDisplay.textContent = "❤️❤️";
  } else if (lives === 1) {
    livesDisplay.textContent = "❤️";
  } else {
    livesDisplay.textContent = "0";
  }

  if (progress > 100) {
    progress = 100;
  }

  progressFill.style.width = progress + "%";
  progressText.textContent = progress + "%";
}

function endGame(won = false) {
  clearInterval(dropInterval);
  clearInterval(timerInterval);

  const allDrops = document.querySelectorAll(".drop");
  allDrops.forEach(drop => drop.remove());

  gamePage.classList.add("hidden");
  endPage.classList.remove("hidden");

  finalScore.textContent = "Your score: " + score;

  if (won) {
    endMessage.textContent = "Great job! You filled the well and helped the village get clean water!";
  } else if (lives <= 0) {
    endMessage.textContent = "You ran out of lives, but you still helped spread awareness about clean water!";
  } else {
    endMessage.textContent = "Time is up! You collected clean water and helped the village!";
  }
}

function restartGame() {
  endPage.classList.add("hidden");
  startGame();
}