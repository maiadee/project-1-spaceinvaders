// * As a user I want to see a Start Game page where I can click a button to begin
// in HTML create a div with class of game-container
// Create 4 divs inside this container with classes of logo, results-display, grid-container and footer
// * On this page, I want to see a chart showing how many points each of my enemies are worth
// HTML <p> on page showing enemies and points
// position fixed
// Cache button element as startButton - use query selector
// Add click event to button
// Create a function called gameStart that is triggered when button is clicked

// * As a user, when I press Start Game button I want to see my grid appear
// Create a function called createGrid that is called in the gameStart function
// Create a grid in JS using gridRows and gridColumns - totalCellCount = gridRows * gridColumns
// In the function use a for loop to create the grid - for(let i=0; i < totalCellCount;i++)
// Cache the grid as gridContainer - use query selector

// * As a user I want to see a block of enemies on the screen
//  - This block will move right-down-left-down-right-down etc across the screen - if this block touches my player - trigger game over
// Define an array of enemies to give each enemy an index
// look at iteration methods - is every alien able to move? 
//  - This block will shoot at my player at random intervals - these bullets fall downwards in a vertical line
// Cache enemyBullet - use query selctor (not needed?)
// Create a function called enemyShoot with a set interval of 3000
// Nest another setInterval, 500 - this would remove the class from current position, find the next position and update class of that cell with .enemy-bullet
// after and before

// * As a user I want to move my player left and right across the bottom of the page using the left and right keys
// Cache player element- use query selector
// Create a css property with class of player
// Create function addPlayer to add the class of player to the grid cell
// Create function removePlayer to remove the class of player to the grid cell
// Create function movePlayer
// Define variable pressedKey = event.code in global scope
// use if statement - if pressedKey === ArrowLeft/ArrowRight to remove or add player class to current player position(where to declare current positon??)

// * As a user I want to shoot upwards at my enemies to score points using the spacebar
// Cache playerBullet - use query selector (not-needed?)
// Create function playerShoot
//
// add window.addEventListener("space", (event) => {})
// Use an if statement - if pressedKey === space, call playerShoot function

// * As a user I want to see bonus-enemy fly across the page from right-left every 5 seconds
// create function bonusEnemy()
// setInterval, 5000
// Nest another setInterval,500 - this would remove the class from current position, find the next position and update class of that cell with .bonus-enemy
// start position?

// * bonus?? - As a user I want to be able to hide underneath the 4 elements protecting my player
// - bullets from the enemies break these down each time they are hit

// * As a user I want to see my lives go down each time I get hit
// create function livesLost
// Use an if statement - if the bullet hits my player - 1 life is lost - update the innerHTML of #lives
// Use classList.contains to check if the player contains a class list of enemy-bullet
// Create function gameOver - if statement - if lives === 0 - game over

// * As a user I want to see my score go up each time I hit an enemy with my bullets
// Create function points()
// Use an if statement that checks if each enemy has a class of player-bullet
// Branching statements check each enemy - number of points added correlates to whichever enemy contains the class
// update innerHTML of score

// * As a user, if all enemies are killed I want my game to reset but keep my score
// Create function enemyReset()
// use an if statement using && to check if each enemy grid cell has a class of
//

// * As a user I want to be able to reset the game and my score??
//

/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
