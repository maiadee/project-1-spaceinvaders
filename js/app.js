// ? As a user I want to see a Start Game page where I can click a button to begin
// in HTML create a div with class of game-container
// Create 4 divs inside this container with classes of logo, results-display, grid-container and footer

// ? On this page, I want to see a chart showing how many points each of my enemies are worth
// HTML <p> on page showing enemies and points
// position fixed
// When startButton is clicked, display: none to hide this
// Cache button element as startButton - use query selector
// Add click event to startButton
// Create a function called gameStart that is triggered when button is clicked

// ? As a user, when I press Start Game button I want to see my grid appear
// Create a function called createGrid that is called in the gameStart function
// Declare constants gridRows and gridColumns
// Create a grid in JS using gridRows and gridColumns - totalCellCount = gridRows * gridColumns
// In the function use a for loop to create the grid - for(let i=0; i < totalCellCount;i++)
// Cache the grid as gridContainer - use query selector

// ? As a user I want to move my player left and right across the bottom of the page using the left and right keys
// Create a css property with class of player - player image
// Declare playerStartPosition
// Create function addPlayer to add the class of player to the grid cell
// Create function removePlayer to remove the class of player from the grid cell
// Create function movePlayer
// Define variable pressedKey = event.code (in global scope?)
// use if statement - if pressedKey === ArrowLeft/ArrowRight to remove class from current player position and add player class to next player position

// ? As a user I want to see a block of aliens on the screen
// Create CSS property with class of .alien - background image of alien asset
// Define an array of aliens to give each alien an index
// create function aliensMove
// ! This block will move right-down-left-down-right-down etc across the screen - if this block touches my player - trigger game over
// Use a forEach loop move the array
// Use iteration method to check every cell in array to see if they reach the left / right side - if yes then the array moves down a row
// ! look at iteration methods - is every alien able to move?
// ! This block will shoot at my player at random intervals - these bullets fall downwards in a vertical line
// Create a function called enemyShoot with a set interval of 3000 - every 3 seconds a bullet falls
// Nest another setInterval, 500 - move the bullet.
// use Math.random to find a random position in the array
// Then add the class from current alien position, remove it, find the next position and update class of that cell with .alien - bullet
// ! after and before - look at this for giving cell multiple background images

// ? As a user I want to shoot upwards at my enemies to score points using the spacebar
// Create function playerShoot
// add window.addEventListener("space", (event) => {})
// Use an if statement - if pressedKey === space, call playerShoot function
// playerShoot function adds class of player-bullet to current player position
// In a setInterval, 500, class is removed from current position and added to the position in row above
// using an if statement check if any of the aliens in my array contain a class of player-bullet using an iteration method
// If the bullet hits an alien, both the alien and the bullet disappear (remove class of enemy and player-bullet) and my score goes up 20 points - update innerHTML score

// ? As a user I want to see bonus-enemy fly across the page from right-left every 5 seconds
// Create css with class of bonus-enemy - background image of bonus - enemy asset
// declare starting position of bonus-enemy
// Create function bonusEnemy()
// setInterval, 5000
// Nest another setInterval,500 - this would add the class of bonus-enemy to starting position, remove it, find the next position and add the class of bonus-enemy to that cell

// ? As a user I want to see my lives go down each time I get hit
// Create div inside results-display div <div>Lives: <span id="lives"></span></div>
// Create function livesLost
// Use an if statement - if the bullet hits my player - 1 life is lost - update the innerHTML of #lives
// Use classList.contains to check if the player contains a class list of enemy-bullet
// Create function gameOver
// using an if statement - if lives === 0 - game over
// option to play again

// ? As a user I want to see my score go up each time I hit an enemy with my bullets
// Create function - points()
// Use a forEach(?) loop that checks if any enemy has a class of player-bullet
// ! Basic level -
// If class of player-bullet exists - update innerHTML of score - points go up +20
// ! Level-up -
// Branching statements check each enemy - number of points added correlates to whichever enemy contains the class

// ? As a user, if all enemies are killed I want my game to reset but keep my score
// Use a forEach loop to check if any cells in my array have class of enemy
// If no - alien grid reset
// Create function enemyReset()
// reset enemiesStartPosition

// ? As a user I want to be able to reset the game and my score??
//

// ? bonus?? - As a user I want to be able to hide underneath the 4 elements protecting my player
// - bullets from the enemies break these down each time they are hit

/*-------------------------------- Constants --------------------------------*/
const startButton = document.querySelector(".start-button");

const resetButton = document.querySelector(".reset-button");

const gridContainer = document.querySelector("#grid-container");

const livesElement = document.querySelector("#lives");

const scoreElement = document.querySelector("#current-score");

const alienIndices = [];
const hitAliens = [];

const cellsArray = [];
const gridRows = 10;
const gridColumns = 20;
const totalCellCount = gridRows * gridColumns;

/*-------------------------------- Variables --------------------------------*/
let playerStartPosition = 183;

let currentPlayerPosition = 183;

let lives = 3;

let score = 0;
/*-------------------------------- Functions --------------------------------*/
resetButton.classList.add("hide-button");
function gameStart() {
  createGrid();
  moveAliensRight();
  bonusEnemy();
  setInterval(() => {
    enemyShoot();
  }, 3000);
  // if lives === 0 - show game over - reset game

  // if alien block touches my player - game over - reset game
  // use loop - if no cells in alien array contain alien - show you win - reset game
  if (alienIndices.length == 0) {
    console.log("you win");
  }
}

function createGrid() {
  startButton.classList.add("hide-button");
  gridContainer.style.setProperty("--grid-columns", gridColumns);
  gridContainer.style.setProperty("--grid-rows", gridRows);
  for (let i = 0; i < totalCellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = i;
    gridContainer.appendChild(cell);
    cellsArray.push(cell);
  }
  cellsArray[playerStartPosition].classList.add("player");

  for (let i = 45; i < 55; i++) {
    alienIndices.push(i);
  }
  for (let i = 65; i < 75; i++) {
    alienIndices.push(i);
  }
  for (let i = 85; i < 95; i++) {
    alienIndices.push(i);
  }
  for (let i = 105; i < 115; i++) {
    alienIndices.push(i);
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
  const moveRight = setInterval(() => {
    removeAlien();
    // alienIndices.some((alien) => {
    //   console.log(
    //     `${alien} % ${gridColumns}`,
    //     alien % gridColumns === gridColumns - 1
    //     );

    //   return alien % gridColumns === gridColumns - 1;
    // });
    //   check if aliens have hit the wall - if so stop interval
    if (alienIndices.some((alien) => alien % gridColumns === gridColumns - 1)) {
      clearInterval(moveRight);
      // move aliens down a row
      for (let i = 0; i < alienIndices.length; i++) {
        alienIndices[i] += gridColumns;
      }
      addAlien();
      moveAliensLeft();
    } else {
      // checking through array to give next indices - moving one cell right
      for (let i = 0; i < alienIndices.length; i++) {
        const alienCurrentIndex = alienIndices[i];
        const alienNextIndex = alienCurrentIndex + 1;
        alienIndices[i] = alienNextIndex;
      }
    }
    addAlien();
  }, 1000);
}

function moveAliensLeft() {
  const moveLeft = setInterval(() => {
    removeAlien();
    //  log to see if any aliens hit left wall
    // alienIndices.some((alien) => {
    //   console.log(`${alien} % ${gridColumns}`, alien % gridColumns === 0);
    //   return alien % gridColumns === 0;
    // });
    //   check if aliens have hit left wall - if so stop interval
    if (alienIndices.some((alien) => alien % gridColumns === 0)) {
      clearInterval(moveLeft);
      // move aliens down a row
      for (let i = 0; i < alienIndices.length; i++) {
        alienIndices[i] += gridColumns;
      }
      addAlien();
      moveAliensRight();
    } else {
      // checking through array to give next indices - moving one cell left
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
  let currentPosition = 39;
  cellsArray[currentPosition].classList.add("bonus-enemy");
  const moveUfo = setInterval(() => {
    // Check if the bonus enemy hits the left wall
    if (currentPosition % gridColumns === 0) {
      // Clear the interval
      clearInterval(moveUfo);
      cellsArray[currentPosition].classList.add("bonus-enemy");
      cellsArray[currentPosition].classList.remove("bonus-enemy");
    } else {
      // Remove the bonus-enemy class from the current position, move left
      cellsArray[currentPosition].classList.remove("bonus-enemy");
      currentPosition--;
      // Add the bonus-enemy class to the new position
      cellsArray[currentPosition].classList.add("bonus-enemy");
    }
  }, 500);

  // Restart the bonus enemy function every 8 seconds
  setTimeout(() => {
    bonusEnemy();
  }, 8000);
}

function playerShoot() {
  // add bullet to player position
  let bulletPosition = currentPlayerPosition;
  cellsArray[bulletPosition].classList.add("player-bullet");
  const shootEnemy = setInterval(() => {
    // add and remove class of bullet going up a row each time
    cellsArray[bulletPosition].classList.remove("player-bullet");
    bulletPosition -= gridColumns;
    cellsArray[bulletPosition].classList.add("player-bullet");

    //   check if bullet hits an alien - clear interval
    if (cellsArray[bulletPosition].classList.contains("alien")) {
      console.log("alien hit");
      score += 20;
      scoreElement.innerHTML = score;
      cellsArray[bulletPosition].classList.remove("player-bullet");
      cellsArray[bulletPosition].classList.remove("alien");

      // find the index
      const alienIndex = alienIndices.indexOf(bulletPosition);
      // check it exists in the array
      if (alienIndex !== -1) {
        // remove it permanently from the array
        alienIndices.splice(alienIndex, 1);
      }

      clearInterval(shootEnemy);
      return;
      console.log(hitAliens);
    }
    // Check if bullet hits a bonus enemy
    if (cellsArray[bulletPosition].classList.contains("bonus-enemy")) {
      console.log("Bonus enemy hit!");
      score += 100;
      scoreElement.innerHTML = score;
      cellsArray[bulletPosition].classList.remove("player-bullet");
      cellsArray[bulletPosition].classList.remove("bonus-enemy");
      clearInterval(shootEnemy);
      return;
    }
    // Check if next position is off the board
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
  // find random index from alien array
  let randomAlienIndex = Math.floor(Math.random() * alienIndices.length);
  // get grid cell index
  const startingCellIndex = alienIndices[randomAlienIndex];

  if (startingCellIndex >= cellsArray.length || startingCellIndex < 0) {
    clearInterval(moveBullet);
    return;
  }

  // bullet in starting cell
  // ! error here when all aliens are hit
  cellsArray[startingCellIndex].classList.add("alien-bullet");

  // move bullet down every 3 milliseconds
  let currentCellIndex = startingCellIndex;

  const moveBullet = setInterval(() => {
    cellsArray[currentCellIndex].classList.remove("alien-bullet");
    currentCellIndex += gridColumns;

    // clear interval when bullet leaves grid
    if (currentCellIndex >= cellsArray.length) {
      clearInterval(moveBullet);
      return;
    }
    // check if bullet hits player
    if (cellsArray[currentCellIndex].classList.contains("player")) {
      // update innerHTML of lives
      lives--;
      livesElement.innerHTML = lives;
      clearInterval(moveBullet);
      return;
    }
    // console.log(currentCellIndex, cellsArray.length);

    cellsArray[currentCellIndex].classList.add("alien-bullet");
  }, 300);
  if (lives === 0) {
    console.log("game over");
  }
}

// ? found hard - figuring out how to target the aliens array rather than whole cell array
// ?what happens within what interval, not nmesting them but calling it within another interval

// create function gameOver
//remove class of .hide-button from resetButton

/*----------------------------- Event Listeners -----------------------------*/
// Add click event to startButton
startButton.addEventListener("click", gameStart);
document.addEventListener("keydown", movePlayer);
