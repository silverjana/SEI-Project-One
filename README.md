# SEI Project 1  - the Game: Orc Invaders

## Overview

### Description

Three weeks into the course, we were tasked to choose a simple JavaScript grid game, build it and deploy it on GitHub. By that time, we covered HTML, CSS and started with JavaScript.  
I decided for a Space Invaders type of game, with a Lord of the Rings Lego theme. Saved in a GitHub repository and coded on VSCode. I also used Google Chrome Dev Tools to preview changes and check why some things didn’t run as I expected.  

### Deployment link:  

https://silverjana.github.io/SEI-Project1-OrcInvaders/


### Github repository:

https://github.com/silverjana/SEI-Project1-OrcInvaders

### Timeframe & Working Team:

This was a solo project and we had one week to complete it.

### Technologies Used:

#### HTML
Favicon to display in browser tab  
Start and reset buttons  
Audio element for sound effects  
Game over, next level and game won screens overlay divs  
#### CSS
Personalised fonts   
Flex-box design  
Screens with position: absolute and display: none over the grid and display: block class to show them  
Classes for all moving elements of the game  

#### JavaScript  
Elements to display the grid, score, lives and name of player, and the game over screens  
Click events to start and reset game, keydown event to play   
SetInterval to move enemy and shoot arrows  
 Functions to show screens and sounds and to change level  
 
### Brief:

Technical Requirements
 
Your app must:
 
* Render a game in the browser
* Be built on a grid: do not use HTML Canvas for this
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use JavaScript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)


#### Space Invaders
 
Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.
 
The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.
 
Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.
 
Requirements
 
* The player should be able to clear at least one wave of aliens
* The player's score should be displayed at the end of the game
 
Suggested enhancements
 
* Responsive design
* Each wave gets more difficult
* Persistent leaderboard using `localStorage`

## Planning

I started with a rough Excalidraw sketch of the game  

<img src="https://i.imgur.com/gabDjuP.png" alt="excalidraw sketch" width="250"/>
 
and some very basic HTML, just to be able to have something to see on the browser while working on JavaScript.

**h1  
section  
&nbsp;&nbsp;start button  
&nbsp;&nbsp;div     
&nbsp;&nbsp;&nbsp;&nbsp;score, lives  
div.grid**


I also flex- boxed the grid div in CSS, to have a square grid.

Then I made a bullet point list of all the functions I needed for a basic version:

* Building grid
* Player movement and shooting
* Enemy movement and random bomb dropping
* What happens when player gets shot
* What happens when enemy gets shot
* How to end game when player wins / loses

I then started on a rough draft of the JS ( pseudocoding)

<img src="https://i.imgur.com/cU1GWGG.png" alt="pseudocode" width="1050"/>

## Process

#### Day 0
Choice of which game to build
Rough plan of dynamics and elements

#### Day 1 - 2
Detailed wire-framing of the project that got approved.
Wrote basic HTML:

<img src="https://i.imgur.com/xOEuFs4.png" alt="html" width="550"/>

Basic CSS with all the classes to display player/ enemies/lasers with placeholder images.
Started with simple functions in JS:

Added elements and events (I had all on keydown instead of timer, easier to check frequently while coding )  
<img src="https://i.imgur.com/wINWWTY.png" alt="keydown" width="550"/>

Started on functions:
* created grid
* created enemies
* added enemies at starting position
* started on moving the aliens  


#### Day 3

**JS:**  
Spent some time thinking about the mechanics of collisions  
Enemy moving in S pattern: decided for a 2 steps process (more in challenges)  
Player moves with arrow keys  
Put everything in a timer   

Started on a visual concept for the game in CSS, very rough colour scheme and flex-boxed position of section and divs

#### Day  4
**JS:**
Player laser added and moving upwards
If laser hits something, both classes get removed:
No more enemies -> level is over  

<img src="https://i.imgur.com/qvX7wEw.png" alt="laser" width="750"/>

Added explosion effect  

<img src="https://i.imgur.com/fiYWnHg.png" alt="explosion" width="450"/>

All interactions work  
Added a score counter  
Added level and game-over screens with overlay   
Started on adding a second level  


#### Day 5 
**JS:**
Second level with different enemy class and bombs
Second level is faster 
Added audio effects		

**HTML:** 	
Added favicon
**CSS:**
Title
Gave divs and buttons final look 
Added fonts
Created screens with Canva 

#### Day 6
**JS:**
Limited arrows per timer loop
Smoothed out some code loops
Cleaned code and console.logs
Added name request

**CSS:** last fixes


## Final Product
<img src="https://i.imgur.com/aupKBH9.png" alt="screenshot" width="500"/><img src="https://i.imgur.com/NV8hkwB.png" alt="screenshot" width="450"/>
<img src="https://i.imgur.com/RbQpneB.png" alt="screenshot" width="450"/><img src="https://i.imgur.com/B0pY0Zx.png" alt="screenshot" width="450"/>
<img src="https://i.imgur.com/t68m5Zo.png" alt="screenshot" width="450"/>

### Challenges:

I encountered an Issue with moving enemies in a group, as when removing, moving and adding the class all in one loop, removing the i+1  enemy would also remove the previously moved i enemy (now in the i+1 cell), and only the last enemy would remain on the grid. I had to write separate loops for removing, moving and then adding again:  
<img src="https://i.imgur.com/qNOJkip.png" alt="screenshot" width="450"/>

Then, I had to move the enemy rotating between 3 directions : down, right, down, left, down, right etc, and had to find a way to move down only once when touching the sides and then right or left to the other side. So I added a counter for moving down only once, and then started moving sideways until one enemy touched the opposite side.  
<img src="https://i.imgur.com/8gW0Wkg.png" alt="screenshot" width="450"/>  
+   
<img src="https://i.imgur.com/mMuoDeC.png" alt="screenshot" width="800"/>  

While testing the gameplay I realized that there was a bug with the Audio element of the screens, as it didn’t play music when arrows got shot too close to the game over and the sounds would overlap. I added a timer to the music to avoid that and also to give the screen image the fraction of time it needs to load.

<img src="https://i.imgur.com/7wK2bI4.png" alt="screenshot" width="310"/>

### Wins:

Even after just 3 weeks of lessons I built a working game and I solved all the issues I encountered while coding.
I am really happy I managed to build the game as I planned, and had the time to add some stretch goals like the player name window prompt, a second level and the screens with music.
I am also very satisfied with the styling, as I really enjoyed learning CSS during class, and I liked to play with gradients and borders to get the look I wanted, like on this side menu:  
<img src="https://i.imgur.com/ihYihnM.png" alt="screenshot" width="250"/><img src="https://i.imgur.com/bWKdqMl.png" alt="screenshot" width="700"/>


The screens were also something I never did before, I created them on Canvas, placed them with position:absolute  and shoved them by adding a show class to the element when needed.  

<img src="https://i.imgur.com/lCTPbhF.png" alt="screenshot" width="450"/>

### Key Learnings/Takeaways:

What I learned:
How to create complex mechanisms with JS by combining loops and functions.  
Add screens with overlay and absolute position.  
Planning roughly what is needed, then a draft, then basic functions and then final ones, checking functionality in between.  
That it is important to have good Time management, and account for errors and other blockers.  
Knowing what needs to be done before something else and doing things in order of importance.  



### Bugs:

Sometimes the enemy in the second level doesn’t move sideways, just down.   
The enemies sometimes don’t display all the time between the intervals, so it happens that an enemy bomb looks like it came from nowhere
On different screen sizes the styling is not perfectly adaptable.



### Future Improvements:

I would upgrade the Leaderboard with top scores from different players, and add a boss level with a bigger image than one grid cell.

Everything is on the same timer, so the effect is a bit rough. I would use different timers for each moving element to get less of the low framerate impression.
