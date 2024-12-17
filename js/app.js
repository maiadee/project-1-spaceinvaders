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

const gridContainer = document.querySelector("#grid-container");

const aliens = [];

const cellsArray = [];
const gridRows = 10;
const gridColumns = 20;
const totalCellCount = gridRows * gridColumns;

/*-------------------------------- Variables --------------------------------*/
let playerStartPosition = 183;

let currentPlayerPosition = 183;

/*-------------------------------- Functions --------------------------------*/
// * Create a function called gameStart that is triggered when button is clicked
function gameStart() {
  createGrid();
  moveAliensRight();
}

// * Create a function called createGrid that is called in the gameStart function
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
    aliens.push(cellsArray[i]);
  }
  for (let i = 65; i < 75; i++) {
    aliens.push(cellsArray[i]);
  }
  for (let i = 85; i < 95; i++) {
    aliens.push(cellsArray[i]);
  }
  for (let i = 105; i < 115; i++) {
    aliens.push(cellsArray[i]);
  }

  aliens.forEach((cell) => {
    cell.classList.add("alien");
  });
}

// * Create function addPlayer to add the class of player to the grid cell
function addPlayer() {
  cellsArray[currentPlayerPosition].classList.add("player");
}

// * Create function removePlayer to remove the class of player from the grid cell
function removePlayer() {
  cellsArray[currentPlayerPosition].classList.remove("player");
}

// * Create function movePlayer
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
    console.log("shoot");
  }
}
function addAlien() {
  aliens.forEach((alien) => {
    alien.classList.add("alien");
  });
}

function removeAlien() {
  aliens.forEach((alien) => {
    alien.classList.remove("alien");
  });
}

// create function aliensMove?

function moveAliensRight() {
  const moveRight = setInterval(() => {
    removeAlien();

    for (let i = 0; i < aliens.length; i++) {
      const currentIndex = cellsArray.indexOf(aliens[i]);
      const nextIndex = currentIndex + 1;

      aliens[i] = cellsArray[nextIndex];
    }

    addAlien();
  }, 800);
}

// setInterval
// remove class of alien from current position
// iterate through cells, check if any of the cells reach right wall ( if current positon +1 is % grid columns )
// if no, position++ and add class, if yes, position += 20 grid columns add class and clearInterval

// function moveAliensLeft()
// setInterval
// remove class of alien from current position
// iterate through cells, check if any of the cells reach left wall (if current position is % grid columns )
// if no, position-- and add class, if yes, position += 20 grid columns add class and clear interval

// ! This block will move right-down-left-down-right-down etc across the screen - if this block touches my player - trigger game over
// ! look at iteration methods - is every alien able to move?

// *Create a function called enemyShoot with a set interval of 3000 - every 3 seconds a bullet falls
// Nest another setInterval, 500 - move the bullet.
// use Math.random to find a random position in the array
// Then add the class from current alien position, remove it, find the next position and update class of that cell with .alien - bullet

// create function to make aliens appear - 10 along the rows and 4 down the columns - starting at 44
function addAlien() {
  aliens.classList.add("alien");
}

function removeAlien() {
  aliens.classList.remove("alien");
}

// create function aliensMove

// function moveAliensRight()
function moveAliensRight() {
  setInterval(() => {
    cellsArray.forEach(() => {});
  }, 800);
}
// setInterval
// remove class of alien from current position
// iterate through cells, check if any of the cells reach right wall ( if current positon +1 is % grid columns )
// if no, position++ and add class, if yes, position += 20 grid columns add class and clearInterval

// function moveAliensLeft()
// setInterval
// remove class of alien from current position
// iterate through cells, check if any of the cells reach left wall (if current position is % grid columns )
// if no, position-- and add class, if yes, position += 20 grid columns add class and clear interval

// ! This block will move right-down-left-down-right-down etc across the screen - if this block touches my player - trigger game over
// ! look at iteration methods - is every alien able to move?

/*----------------------------- Event Listeners -----------------------------*/
// Add click event to startButton
startButton.addEventListener("click", gameStart);
document.addEventListener("keydown", movePlayer);
