// ? As a user I want to see a Start Game page where I can click a button to begin
// in HTML create a div with class of game-container
// Create 4 divs inside this container with classes of logo, results-display, grid-container and footer

// ? On this page, I want to see a chart showing how many points each of my enemies are worth
// HTML <p> on page showing enemies and points
// position fixed
// When startButton is clicked, display: none to hide this
// Cache button element as startButton - use query selector
// Add click event to button
// Create a function called gameStart that is triggered when button is clicked

// ? As a user, when I press Start Game button I want to see my grid appear
// Create a function called createGrid that is called in the gameStart function
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

// ? As a user I want to see a block of enemies on the screen
// Create CSS property with class of enemy - alien image
// Define an array of enemies to give each enemy an index
// ! This block will move right-down-left-down-right-down etc across the screen - if this block touches my player - trigger game over
// Use a forEach loop move the array
// Use iteration method to check every cell in array to see if they reach the left / right side - if yes then the array moves down a row
// ! look at iteration methods - is every alien able to move?
// ! This block will shoot at my player at random intervals - these bullets fall downwards in a vertical line
// Create a function called enemyShoot with a set interval of 3000 - every 3 seconds a bullet falls
// Nest another setInterval, 500 - move the bullet.
// use Math.random to find a random position in the array
// Then add the class from current enemy position, remove it, find the next position and update class of that cell with .enemy - bullet
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
// If no - enemy grid reset
// Create function enemyReset()
// reset enemiesStartPosition

// ? As a user I want to be able to reset the game and my score??
//

// ? bonus?? - As a user I want to be able to hide underneath the 4 elements protecting my player
// - bullets from the enemies break these down each time they are hit

/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
