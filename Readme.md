# Space Invaders

### Description

Our first project of the course commenced during week 3 where I recreated the arcade game, Space Invaders using HTML, CSS and JavaScript. The game involves moving your player left and right using the arrow keys on your keyboard, shooting at your enemy; a grid of aliens who slowly move down the screen to earn points. Your player can lose lives by being hit by the alien's missiles. Your player needs to kill all aliens before they reach you otherwise it is game over.

![SpaceInvaders](<Readme images /start-screen.png>)

### Deployment link

https://maiadee.github.io/project-1-spaceinvaders/

### Timeframe

We were been given 1 week to work on this project individually

### Technologies Used

HTML
CSS
JavaScript

### Brief

Create a browser-based game using DOM manipulation techniques

- Render the game in the browser using the DOM manipulation techniques demonstrated in lecture.
- Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition.
- Include separate HTML, CSS, JavaScript, and JavaScript data files organized in an appropriate directory structure.
- Include all required features specific to your game. Game-specific required features are defined in the Required Features column in the table in the Recommended Games document, or as discussed with your instructor. If you want to build a game that is not on this list, you will need to present and discuss your game’s features with the instructional team for approval.
- The game is deployed online so that the rest of the world can play it.

### Planning

Wireframes

![SpaceInvaders](<Readme images /spaceinvaders-wireframe.png>)

### Build/Code Process

Monday

I created the grid using JavaScript, assigning each <div> a class of cell and pushing them into cellsArray. I created CSS classes for the alien and player elements using background images, allowing me to add/remove them from array indices to simulate movement. The player's starting position was set by adding the player class to the initial cell. For the aliens, I used for loops to create a block of aliens, pushed their indices into the alienIndices array, and assigned the alien class to each cell.
I wrote a function to move the player left/right with the arrow keys, using a keydown event listener. Inside this function, I added an if statement to trigger shooting when the spacebar is pressed.
I then worked on the alien movement, creating separate "move right" and "move left" functions. After getting the aliens to move together, I focused on stopping them at the walls. By the end of the day, the aliens would move right but wrap around the screen, and the same happened for left movement.

Tuesday

I focused on finishing the alien movement and tried a few different approaches. I realised that I wasn’t targeting my alien array correctly; instead, I was targeting the DOM element (div) because I had pushed my aliens into cellsArray[i] rather than into the alienIndices array. I then tried using a forEach loop instead of a for loop, but this didn’t update the alien indices as expected. After that, I used a setInterval with a 1-second delay and applied some() to iterate through the array, checking if any of the aliens had reached the right side of the grid. If they had, I used a for loop to update each alien’s index by adding the number of columns in the grid (+= gridColumns), effectively moving them down a row.

``` javascript
if (alienIndices.some((alien) => alien % gridColumns === gridColumns - 1)) {
      clearInterval(rightInterval);

      for (let i = 0; i < alienIndices.length; i++) {
        alienIndices[i] += gridColumns;
      }
```
- This code detects when any alien reaches the far right, stops their rightward movement, and then moves all aliens down by one row.

``` javascript 
 for (let i = 0; i < alienIndices.length; i++) {
        const alienCurrentIndex = alienIndices[i];
        const alienNextIndex = alienCurrentIndex + 1;
        alienIndices[i] = alienNextIndex;
      }
```
- If the aliens haven’t reached the wall, this code uses another loop to move each alien one step to the right by incrementing its position in the alienIndices array. The aliens’ positions are updated by adding 1 to each index.

I used the same logic for moving the aliens left and called that function after they hit the right wall and moved down a row, applying the same process for the reverse movement. I created a CSS class for .bonus-enemy and used a setInterval to add and remove this class, updating the position of the bonus enemy every interval. I applied the same logic to stop the enemy at the left wall and used a setTimeout to restart their movement every 8 seconds. For the player, I implemented a shooting function triggered by the spacebar, which was called within the player’s movement function. I created a CSS class for .player-bullet to add and remove it from the cellsArray indices. I set an interval of 200 milliseconds to add and remove the bullet class, and in the bullet movement function, I used classList.contains to check if the bullet hit an alien, then removed the bullet with classList.remove and cleared the interval to stop the bullet. Next, I need to figure out how to permanently remove the alien class from the cell once the bullet hits, and I’ll also need to add another if statement to check whether the bullet hit the bonus enemy.

Wednesday

On Wednesday, I debugged my enemy and player shoot functions, which were working but causing classList undefined errors in the console after a few seconds of gameplay. The issue with the playerShoot function was that I hadn’t accounted for the bullet leaving the grid, so I added a check to ensure that if the bullet’s next position was less than 0 (off the grid), it would call clearInterval.
The same issue occurred with the enemy shoot function. I had an if statement to check if the enemy bullet was off the grid, but it was in the wrong order. I needed to check the index position before the interval began.
The most challenging task of the day was ensuring aliens permanently disappear when hit by the player’s bullet. Previously, they disappeared temporarily but reappeared when the interval repeated. I resolved this by removing the alien from the array permanently using splice(), as shown below:

``` javascript
const alienIndex = alienIndices.indexOf(bulletPosition);
      if (alienIndex !== -1) {
        alienIndices.splice(alienIndex, 1);
      }
```
- This code checks if the bullet’s position matches an alien’s position in the alienIndices array. If it does, it removes that alien from the array, simulating the alien being "hit" by the bullet.

I needed to decrease the player's lives every time they were hit by a bullet, so I nested this logic inside the enemy shoot function. I cached the lives span to update the HTML and created a lives variable, initially set to 3. Using an if statement, I checked whether the bullet's current index contained the player class, and if so, I decreased the lives count and updated the innerHTML with the new value.
I repeated the process for the score, adding 20 to the score variable within the player shoot function.
Next, I worked on the reset game function and displaying win/lose conditions based on the game result. I added a reset button to the footer, but to keep it hidden until the player wins or loses, I applied the hide-button class to the reset button before calling the gameStart function, similar to how I hid the start button when the game starts.

Thursday

This morning, I focused on finalising my CSS. Before the start button is clicked, the space for the grid wasn't visible, so I created that space on the landing page and centered the start button. I adjusted the grid container's height and width properties and used position: relative to move the button 200px to the right.
After testing the game, I noticed some bugs that appeared when all aliens were killed. The console was searching for indices outside the cellsArray. To fix this, I added an if statement at the top of the enemyShoot function to prevent it from running when no aliens are left.
I also applied the same logic to the moveBullet timer. I checked if the bullet had moved beyond the grid's boundaries, and if so, I cleared the interval to stop further execution of the function.

``` javascript 
if (startingCellIndex >= cellsArray.length || startingCellIndex < 0) {
    clearInterval(moveBullet);
    return;
  }
```
- This check ensures that the bullet doesn’t move outside the grid, and stops the interval when it reaches the grid’s edge.

I focused on finalising the reset function, where I reset the score and lives by updating the innerHTML and set gameActive to true. I added an event listener to the reset button to trigger the reset game function.
When I tested the reset, I noticed duplicates of the player, aliens, and bonus enemy. After reflecting on this, I realised I needed to ensure the player was returned to the starting position and that all intervals were cleared within the reset function. I also had to reset the cells and alien arrays, clearing the grid container before recreating the grid, which I handled within the createGrid function.
Finally, I made sure the game was centered in the browser using Flexbox and set a black background for the body. I adjusted the width of the game container and grid container to ensure everything was properly contained within their parent elements.

![SpaceInvaders](<Readme images /play-screen.png>)

### Challenges

- One thing I found challenging was choosing which iteration method to use and how. I knew this was a weaker spot of mine and doing this project allowed me to build on that knowledge and become more confident with iteration methods.

- Using the right syntax when targetting indices in arrays, especially when it came to finding out current and next positions of these indices. It was a case of confusing the difference between targetting the aliens array rather than the whole cells array. I gave my arrays more defined names such as changing aliens to alienIndices, this made my code more readable when understanding the process I was going through.

- Creating my reset function was a challenge as I had so many timers within my code, some nested within others. I now know that I need to remember every single timer needs to be cleared indivdually for the game to reset.

### Wins

- I encountered a lot of bugs during the process of building this game and I feel as though repeating that debugging process has built more confidence in my abilities.
- I’ve solved complex problems around arrays and loops.
- Key win is successfully building my first project!


### Key Learnings/Takeaways

- I feel more confident using arrays and loops and iterating through them.

- I really enjoyed the Pseudocode process and found it extremely helpful to break things down. However I feel that as the project went on there were things I had not thought about within my pseudocode that tripped me up. I think next time I would benefit from more detail within my pseudocode and breaking down the project further. I also feel a personal timeline would help me to manage my project better

### Future Improvements

- With more time I would like to store my current score within a highscore variable that I can update

- I would also like to give each row of aliens a different number of points when hit by the player

- The most challenging feature I would like to add would be the 4 protective elements as these would take up 4 cells each and also breakdown each time a missile hits them

### Bugs

- As the project progressed, I encountered an increasing number of bugs. It seemed that every time I added a new feature, another issue would surface. I realised that many of these bugs stemmed from recurring issues, often related to naming conventions and the order of my code. By refining the naming conventions and reordering certain code sections, I was able to resolve most of the problems, ensuring that each part of the game functioned correctly

### Attributes/Assets

https://www.deviantart.com/scpthunder/art/Pixel-rocket-358437926

https://www.pngall.com/space-invaders-png/

https://www.pngkey.com/maxpic/u2w7w7a9y3y3i1e6/

https://vsbattles.fandom.com/wiki/Space_Invaders_(Characters)

https://dosgames.com/game/space-invaders-/
