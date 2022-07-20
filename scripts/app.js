function init() {
  //!ELEMENTS
  const grid = document.querySelector('.grid')
  //start button
  const startButton = document.getElementById('start')
  //reset button
  const resetButton = document.getElementById('reset')
  //lives span
  let livesSpan = document.getElementById('lives')
  //score span
  let currentScoreSpan = document.getElementById('currentScore')

  //high score span
  let bestScore = localStorage.getItem('score')// from local storage
  const highSpan = document.getElementById('high') //grab high score span
  highSpan.innerHTML = bestScore //show high score

  //screen game over
  const GameOverScreen = document.getElementById('gameOver')
  const show = 'show'
  let finalSpan = document.getElementById('final')
  //screen game won
  const GameWonScreen = document.getElementById('gameWon')
  const nextScreen = document.getElementById('next')


  //!EVENTS
  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', reset)
  //document.addEventListener('keydown', moveEnemyKeys) //listen for keys
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keydown', newLaser)


  //!EXECUTION

  //?VARIABLES
  // grid
  const width = 10
  const cellCount = width * width
  const cells = []

  //player position
  const PlayerStartingPosition = 95
  let playerCurrentPosition = PlayerStartingPosition
  const playerClass = 'player'

  //enemy choice 
  const enemyChoice = ['orc', 'nazgul'] //array with available enemies

  let enemyClass = enemyChoice[0] // must change: array of enemies
  console.log(enemyClass + 'enemyclass')

  //enemy positions 
  let enemies = []
  const enemyStartingPosition = [ 2, 3, 4, 5,6,7,13,16]// array of starting positions
  // put for every position an alien as an object in array, with position and index as keys
  enemyStartingPosition.forEach((item, i) => {
    enemies[i] = { position: enemyStartingPosition[i], ind: i }
    console.log(enemies)
  })

  let enemyDir = 'goright'   //start going right
  let movesDownCounter = 0

  //shooting lasers
  const laserClass = 'laser'
  let laserArr = []

  //bombs
  let bombClass = 'bomb'
  let bombArr = []

  //score
  const enemyPoints = 100//each enemy
  let currentScore = 0 // to be added to + displayed
  currentScoreSpan.innerText = currentScore
  //high score -  local storage -> mole


  //lives
  let lives = 3
  livesSpan.innerHTML = lives

  //timer
  let timer

  //level counter
  let levelCounter = 0

  // explosion
  const explosionClass = 'explosion' 


  //? FUNCTIONS
  // clear storage - high score, level, reload
  function reset(){
    localStorage.clear()
    levelCounter = 0
    location.reload()
  }

  // add Item
  function addItem(position, item) {
    cells[position].classList.add(item)
  }
  // remove Item
  function removeItem(position, item) {
    cells[position].classList.remove(item)
  }

  //move player with 2 keys inside last row
  function movePlayer(event) {
    // get keys
    const keyPressed = event.keyCode
    const right = 39
    const left = 37

    removeItem(playerCurrentPosition, playerClass)

    if (left === keyPressed && playerCurrentPosition % width !== 0) {
      console.log('move left ok')
      playerCurrentPosition -= 1
    } else if (right === keyPressed && playerCurrentPosition % width !== width - 1) {
      console.log('move right ok')
      playerCurrentPosition += 1
    }
    addItem(playerCurrentPosition, playerClass)

  }

  // shoot laser with space 
  function newLaser(event) {
    //grab key pressed
    const keyPressed = event.keyCode
    const spaceKey = 32
    const firedLocation = playerCurrentPosition - width
    //console.log(firedLocation + 'firedlocation')
    // if space pressed and cell free, add laser, push item into laserArray 
    if (spaceKey === keyPressed && !cells[firedLocation].classList.contains(laserClass)) {
      addItem(firedLocation, laserClass)
      laserArr.push({ position: playerCurrentPosition - width, ind: laserArr.length })

      console.log(laserArr)
    }
  }

  function placeEnemy() {  // place enemies on grid
    enemies.forEach((item) => {
      cells[item.position].classList.add(enemyClass)
      console.log(item.position)
    })
  }

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // Add innerText to cell for development purposes
      //cell.innerText = i
      // add index to a data attribute on the element
      cell.dataset.index = i
      // Add cell element into the cells array
      cells.push(cell)
      // Take the grid element and append the cell
      grid.appendChild(cell)
    }
    console.log('grid function ok')

    //place player + enemies on grid
    addItem(playerCurrentPosition, playerClass)

    placeEnemy()

  }
  createGrid()

  function explode (position){
    cells[position].classList.add(explosionClass)
    setTimeout(() => {
      cells[position].classList.remove(explosionClass)
    }, 900);

  }





  //!  function startGame + TIMER  

  function startGame(event) {
    if (event) {
      event.target.blur()
    }
    
    console.log('startgame ok')

    clearInterval(timer)

    timer = setInterval(() => {
      console.log('interval')

      //move enemy

      function moveEnemy() {  //

        //remove class for all
        enemies.forEach((item) => {
          cells[item['position']]?.classList.remove(enemyClass)
        })

        // move aliens sideways or down
        enemies.forEach((item) => {
          if (enemyDir === 'touchright' || enemyDir === 'touchleft') {
            item['position'] = item['position'] + width
          } else if (enemyDir === 'goleft') {
            item['position'] = item['position'] - 1
          } else if (enemyDir === 'goright') {
            item['position'] = item['position'] + 1
          }


          //add class again
          cells[item['position']]?.classList.add(enemyClass)
        })

        if (enemies.some(item => item.position >= width * width - width)) {
          //} else if (enemies.filter(item => item.position > (width * width - 1)).length > 0) {// in last row - end of game
          console.log('GAME OVER')
          clearInterval(timer)
          gameLost()
          //! GAME OVER LOST
        }


        console.log('enemies', enemies.map(e => e.position))
        //check borders
        if (enemies.filter(item => item.position % width === width - 1).length > 0) {  // at least one element exist that touches right
          enemyDir = 'touchright'
          movesDownCounter += 1
          console.log('something touches right!')
        } else if (enemies.filter(item => item.position % width === 0).length > 0) { // " " " touches left
          enemyDir = 'touchleft'
          movesDownCounter += 1
        }



        // after moving down once, move sideways next
        if (enemyDir === 'touchright' && movesDownCounter > 1) {
          enemyDir = 'goleft'
          movesDownCounter = 0
        } else if (enemyDir === 'touchleft' && movesDownCounter > 1) {
          enemyDir = 'goright'
          movesDownCounter = 0
        }
        console.log(enemyDir)

      }
      moveEnemy()

      //? player shoots laser  

      // laser moves 1 up every tick, now with keys
      function laserMovement() {
        console.log('laser movement go')
        //remove
        laserArr.forEach((item) => {
          //console.log(item)
          cells[item['position']]?.classList.remove(laserClass)
        })

        //update position
        laserArr.forEach((item, i) => {
          //console.log(item) // 
          if (item.position < width) { // remove it if reaches top of grid
            item.position = -1

          } else if (enemies.filter(alien => alien.position === item.position).length > 0) { // there is an enemy in that position 
            console.log('BOTH HERE!')
            const posit = item.position
            item.position = -1  // delete this laser
            enemies = enemies.filter(item => item.position !== posit) // delete this alien from arr
            cells[posit].classList.remove(enemyClass)// delete enemy class from this cell
            explode(posit)
            currentScore = currentScore + enemyPoints //add points to total
            currentScoreSpan.innerHTML = currentScore // display total
            if ( currentScore > bestScore) { localStorage.setItem('score', currentScore)} //add to high score

            if (enemies.length === 0) { // no more enemies left
              console.log('ALL ENEMIES KILLED')
              //levelCounter += 1
              clearInterval(timer)
              // if (levelCounter < 1){
              //   replay()
              // } else {
              //   gameWon()
              // }
              gameWon()
              
              //! GAME WON / LEVEL SCREEN
            }

          } else if (bombArr.filter(bomb => bomb.position === item.position).length > 0) {  //! check
            const posit = item.position
            item.position = -1  // delete this laser
            bombArr = bombArr.filter(bomb => bomb.position !== posit) // delete this bomb from arr
            cells[posit].classList.remove(bombClass)// delete bomb class from this cel

          } else {
            console.log(item.position + 'before update')
            item['position'] = item['position'] - width //move one up
            console.log('moved to' + item.position)
          }
        })

        // add again
        laserArr.forEach((item) => {
          cells[item['position']]?.classList.add(laserClass)
        })
      }
      laserMovement()


      //ALIENS SHOOTING 

      function bombMovement() {
        //remove class
        bombArr.forEach((item) => {
          cells[item.position]?.classList.remove(bombClass)
        })

        //move and delete if reaches bottom
        bombArr.forEach((item) => {
          //console.log(item)
          if (item.position > (width * width - 1)) { // remove it if reaches bottom of grid
            item.position = 100
          } else {
            item.position = item.position + width //move one down
          }

          if (playerCurrentPosition === item.position) { // there is the player in new position 
            console.log('PLAYER HIT!')
            item.position = 100  // delete this bomb
            lives -= 1 // player has 1 less life
            livesSpan.innerHTML = lives
            if (lives === 0) {
              console.log('GAME OVER 0 LIVES')
              clearInterval(timer)
              gameLost() //! GAMEOVER SCREEN
            }
          }
        })

        // add again
        bombArr.forEach((item) => {
          cells[item['position']]?.classList.add(bombClass)
        })
      }
      bombMovement()

      function newBomb() {
        const rate = Math.floor(Math.random() * enemies.length * 2) //number between 0 and enemies*2 
        //console.log(enemies[rate].position + width)
        const enemyFiredLoc = enemies[rate]?.position + width
        //console.log(enemyFiredLoc + 'fireloc')
        if (!enemies.some(item => item.position >= width * width - width * 2) && rate < enemies.length && !cells[enemyFiredLoc].classList.contains(enemyClass)) {//if enemy is not in last row, and if there is no enemy below
          addItem(enemyFiredLoc, bombClass) //add class
          bombArr.push({ position: enemyFiredLoc }) // put in array with location
          //console.log(bombArr)
        }
      }
      newBomb()

    }, 900)

  }

  // function replay(){
  //   clearInterval(timer)
  //   playerCurrentPosition = PlayerStartingPosition
  //   enemyClass = enemyChoice[1]
  //   bombClass = 'spear'
  //   laserArr = []
  //   bombArr = []
  //   createGrid()
  //   placeEnemy()
  //   nextScreen.classList.add(show)
  //   setTimeout(() => {
  //     nextScreen.classList.remove(show)//hide screen div
  //     startGame()
  //   }, 1000 * 5)
  // }

  function gameLost(){
    GameOverScreen.classList.add(show)
    finalSpan.innerHTML = currentScore
    setTimeout(() => {
      location.reload()
    }, 1000 * 10)
  }

  function gameWon(){
    highSpan.innerHTML = bestScore
    GameWonScreen.classList.add(show)
  }



}

window.addEventListener('DOMContentLoaded', init)