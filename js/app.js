/*-------------------------------- Constants --------------------------------*/
const startButton = document.querySelector(".start-button");

const resetButton = document.querySelector(".reset-button");

const gridContainer = document.querySelector("#grid-container");

const livesElement = document.querySelector("#lives");

const scoreElement = document.querySelector("#current-score");

const resultElement = document.querySelector(".result");

const gridRows = 10;
const gridColumns = 20;
const totalCellCount = gridRows * gridColumns;
const bottomRow = gridRows - 1;

/*-------------------------------- Variables --------------------------------*/

let alienIndices = [];
let cellsArray = [];
let playerStartPosition = 183;
let currentPlayerPosition = 183;
let lives = 3;
let score = 0;
let gameActive = true;
let enemyShootInterval;
let rightInterval;
let leftInterval;
let moveUfo;

/*-------------------------------- Functions --------------------------------*/
resetButton.classList.add("hide-button");
function gameStart() {
  createGrid();
  moveAliensRight();
  bonusEnemy();
  playerShoot();
  enemyShootInterval = setInterval(() => {
    enemyShoot();
  }, 1000);
}

function createGrid() {
  cellsArray = [];
  alienIndices = [];
  gridContainer.innerHTML = "";

  startButton.classList.add("hide-button");
  gridContainer.style.setProperty("--grid-columns", gridColumns);
  gridContainer.style.setProperty("--grid-rows", gridRows);
  for (let i = 0; i < totalCellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridContainer.appendChild(cell);

    cellsArray.push(cell);
  }

  cellsArray[playerStartPosition].classList.add("player");

  for (let i = 45; i < 115; i += 20) {
    for (let j = i; j < i + 10; j++) {
      alienIndices.push(j);
    }
  }

  alienIndices.forEach((alien) => {
    cellsArray[alien].classList.add("alien");
  });

  enemyShoot();
}

function addPlayer() {
  cellsArray[currentPlayerPosition].classList.add("player");
}

function removePlayer() {
  cellsArray[currentPlayerPosition].classList.remove("player");
}

function movePlayer(event) {
  const pressedKey = event.code;
  if (!gameActive) return;
  if (pressedKey === "ArrowLeft" && currentPlayerPosition % gridColumns !== 0) {
    removePlayer(currentPlayerPosition);
    currentPlayerPosition--;
    addPlayer(currentPlayerPosition);
  } else if (
    pressedKey === "ArrowRight" &&
    currentPlayerPosition % gridColumns !== gridColumns - 1
  ) {
    removePlayer(currentPlayerPosition);
    currentPlayerPosition++;
    addPlayer(currentPlayerPosition);
  } else if (pressedKey === "Space") {
    playerShoot();
  }
}

function addAlien() {
  alienIndices.forEach((alien) => {
    cellsArray[alien].classList.add("alien");
  });
}

function removeAlien() {
  alienIndices.forEach((alien) => {
    cellsArray[alien].classList.remove("alien");
  });
}

function moveAliensRight() {
  if (!gameActive) return;
  rightInterval = setInterval(() => {
    removeAlien();

    if (alienIndices.some((alien) => alien % gridColumns === gridColumns - 1)) {
      clearInterval(rightInterval);

      for (let i = 0; i < alienIndices.length; i++) {
        alienIndices[i] += gridColumns;
      }
      addAlien();
      moveAliensLeft();
    } else {
      for (let i = 0; i < alienIndices.length; i++) {
        const alienCurrentIndex = alienIndices[i];
        const alienNextIndex = alienCurrentIndex + 1;
        alienIndices[i] = alienNextIndex;
      }
    }
    addAlien();
  }, 1000);

  if (
    alienIndices.some((alien) => {
      const row = Math.floor(alien / gridColumns);
      return row === bottomRow;
    })
  ) {
    gameOver();
  }
}

function moveAliensLeft() {
  leftInterval = setInterval(() => {
    removeAlien();

    if (alienIndices.some((alien) => alien % gridColumns === 0)) {
      clearInterval(leftInterval);

      for (let i = 0; i < alienIndices.length; i++) {
        alienIndices[i] += gridColumns;
      }
      addAlien();
      moveAliensRight();
    } else {
      for (let i = 0; i < alienIndices.length; i++) {
        const alienCurrentIndex = alienIndices[i];
        const alienNextIndex = alienCurrentIndex - 1;
        alienIndices[i] = alienNextIndex;
      }
    }
    addAlien();
  }, 1000);
}

function bonusEnemy() {
  if (!gameActive) return;
  let currentPosition = 39;
  cellsArray[currentPosition].classList.add("bonus-enemy");
  moveUfo = setInterval(() => {
    if (currentPosition % gridColumns === 0) {
      clearInterval(moveUfo);
      cellsArray[currentPosition].classList.add("bonus-enemy");
      cellsArray[currentPosition].classList.remove("bonus-enemy");
    } else {
      cellsArray[currentPosition].classList.remove("bonus-enemy");
      currentPosition--;
      cellsArray[currentPosition].classList.add("bonus-enemy");
    }
  }, 500);

  setTimeout(() => {
    bonusEnemy();
  }, 8000);
}

function playerShoot() {
  if (!gameActive) return;

  let bulletPosition = currentPlayerPosition;
  cellsArray[bulletPosition].classList.add("player-bullet");

  const shootEnemy = setInterval(() => {
    cellsArray[bulletPosition].classList.remove("player-bullet");
    bulletPosition -= gridColumns;
    cellsArray[bulletPosition].classList.add("player-bullet");
    if (alienIndices.length < 1) {
      console.log("you win");

      youWin();
    }

    if (cellsArray[bulletPosition].classList.contains("alien")) {
      console.log("alien hit");
      score += 20;
      scoreElement.innerHTML = score;
      cellsArray[bulletPosition].classList.remove("player-bullet");
      cellsArray[bulletPosition].classList.remove("alien");

      const alienIndex = alienIndices.indexOf(bulletPosition);

      if (alienIndex !== -1) {
        alienIndices.splice(alienIndex, 1);
      }

      clearInterval(shootEnemy);
      return;
      console.log(hitAliens);
    }

    if (cellsArray[bulletPosition].classList.contains("bonus-enemy")) {
      console.log("Bonus enemy hit!");
      score += 100;
      scoreElement.innerHTML = score;
      cellsArray[bulletPosition].classList.remove("player-bullet");
      cellsArray[bulletPosition].classList.remove("bonus-enemy");
      clearInterval(shootEnemy);
      return;
    }
    const nextPosition = bulletPosition - gridColumns;
    if (nextPosition < 0) {
      cellsArray[bulletPosition].classList.remove("player-bullet");
      clearInterval(shootEnemy);
      console.log("off board");
      return;
    }
  }, 200);
}

function enemyShoot() {
  if (!gameActive) return;
  if (alienIndices.length < 1) {
    return;
  }

  let randomAlienIndex = Math.floor(Math.random() * alienIndices.length);

  const startingCellIndex = alienIndices[randomAlienIndex];

  if (startingCellIndex >= cellsArray.length || startingCellIndex < 0) {
    clearInterval(moveBullet);
    return;
  }

  let currentCellIndex = startingCellIndex;

  const moveBullet = setInterval(() => {
    cellsArray[currentCellIndex].classList.remove("alien-bullet");
    currentCellIndex += gridColumns;

    if (currentCellIndex >= cellsArray.length) {
      clearInterval(moveBullet);
      return;
    }

    if (cellsArray[currentCellIndex].classList.contains("player")) {
      lives--;
      livesElement.innerHTML = lives;

      if (lives === 0) {
        gameOver();
      }

      clearInterval(moveBullet);
      return;
    }

    cellsArray[currentCellIndex].classList.add("alien-bullet");
  }, 300);
}

function gameOver() {
  clearIntervals();
  resultElement.innerHTML = "GAME OVER";
  resetButton.classList.remove("hide-button");
  gameActive = false;
}

function youWin() {
  clearIntervals();
  resultElement.innerHTML = "YOU WON!";
  resetButton.classList.remove("hide-button");
  gameActive = false;
}

function resetGame() {
  clearIntervals();
  resetButton.classList.add("hide-button");
  score = 0;
  scoreElement.innerHTML = score;
  lives = 3;
  livesElement.innerHTML = lives;
  gameActive = true;
  resultElement.innerHTML = "";
  currentPlayerPosition = playerStartPosition;

  gameStart();
}

function clearIntervals() {
  clearInterval(enemyShootInterval);
  clearInterval(leftInterval);
  clearInterval(rightInterval);
  clearInterval(moveUfo);
}

/*----------------------------- Event Listeners -----------------------------*/

startButton.addEventListener("click", gameStart);
document.addEventListener("keydown", movePlayer);
resetButton.addEventListener("click", resetGame);
