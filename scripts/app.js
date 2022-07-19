function init() {
  //!ELEMENTS
  const grid = document.querySelector('.grid')
  //start button
  const startButton = document.getElementById('start')
  //lives span
  let livesSpan = document.getElementById('lives')
  //score span
  let currentScoreSpan = document.getElementById('currentScore')
  //high score span LATER

  //!EVENTS
  //startButton.addEventListener('click', startGame) 
  document.addEventListener('keydown', moveEnemyKeys) //listen for keys
  document.addEventListener('keydown', movePlayer)

  document.addEventListener('keydown', laserMovement)
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
  const enemyChoice = ['demogorgon', 'mindFlayer'] //array with available enemies

  let enemyClass = enemyChoice[0] // must change: array of enemies
  console.log(enemyClass + 'enemyclass')

  //enemy positions 
  let enemies = []
  const enemyStartingPosition = [1,2,3]// array of starting positions
  // put for every position an alien as an object in array, with position and index as keys
  enemyStartingPosition.forEach((item, i) => {
    enemies[i] = { position: enemyStartingPosition[i],ind: i }
    console.log(enemies )
  })
  let enemyDir = 'goright'   //start going right

  //shooting lasers
  const laserClass = 'laser'
  const laserArr = []

  //score
  const enemyPoints = 100//each enemy
  let currentScore = 0 // to be added to + displayed
  //high score -  local storage -> mole


  //lives
  const lives = 3
  livesSpan.innerHTML = lives


  //? FUNCTIONS

  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      // Add innerText to cell for development purposes
      cell.innerText = i
      // add index to a data attribute on the element
      cell.dataset.index = i
      // Add cell element into the cells array
      cells.push(cell)
      // Take the grid element and append the cell
      grid.appendChild(cell)
    }
    console.log('grid function ok')

    //place player + enemies on grid
    addItem(playerCurrentPosition, playerClass )

    placeEnemy() 

  }
  createGrid()

  function placeEnemy(){  // place enemies on grid at start
    enemies.forEach((item) => {
      cells[item.position].classList.add(enemyClass)
      console.log(item.position)
    })
  }

  //move enemy
  let movesDownCounter = 0
  function moveEnemyKeys(){  //testing movement with any key instead of timer
    
    //remove class for all
    enemies.forEach((item) => {
      cells[item['position']].classList.remove(enemyClass)
    })

    // move aliens sideways or down
    enemies.forEach((item) => {
      if (enemyDir === 'touchright' || enemyDir === 'touchleft'){
        item['position'] = item['position'] + width
      } else if ( enemyDir === 'goleft'){
        item['position'] = item['position'] - 1
      } else if ( enemyDir === 'goright'){
        item['position'] = item['position'] + 1
      }
      console.log(enemyDir)
      cells[item['position']].classList.add(enemyClass)
    })
    
    //check borders
    if (enemies.filter(item => item.position % width === width - 1 ).length > 0){  // at least one element exist that touches right
      enemyDir = 'touchright'
      movesDownCounter += 1
      console.log('something touches right!')
    } else if (enemies.filter(item => item.position % width === 0 ).length > 0){ // " " " touches left
      enemyDir = 'touchleft'
      movesDownCounter += 1
    }
    // after moving down once, move sideways next
    if (enemyDir === 'touchright' && movesDownCounter > 1){
      enemyDir = 'goleft'
      movesDownCounter = 0
    } else if (enemyDir === 'touchleft' && movesDownCounter > 1 ){
      enemyDir = 'goright'
      movesDownCounter = 0
    }
    console.log(enemyDir)

  }

  // if (vendors.filter(e => e.Name === 'Magenic').length > 0) {
  //   /* vendors contains the element we're looking for */
  // }

  // add Item
  function addItem(position,item){
    cells[position].classList.add(item)
  }
  // removeItem
  function removeItem(position, item){
    cells[position].classList.remove(item)
  }
  //move player with 2 keys inside last row
  function movePlayer(event){
    // get keys
    const keyPressed = event.keyCode
    const right = 39
    const left = 37

    removeItem(playerCurrentPosition, playerClass)

    if (left === keyPressed && playerCurrentPosition % width !== 0 ) {
      console.log('move left ok')
      playerCurrentPosition -= 1
    } else if ( right === keyPressed && playerCurrentPosition % width !== width - 1){
      console.log('move right ok')
      playerCurrentPosition += 1
    }
    addItem(playerCurrentPosition, playerClass)

  }

  //? player shoots laser  

  // laser moves 1 up every tick, now with keys
  function laserMovement(){
    console.log('laser movement go')
    //remove
    laserArr.forEach((item) => {
      console.log(item)
      cells[item['position']].classList.remove(laserClass)
    })

    //update position
    laserArr.forEach((item,i) => {
      console.log(item) // 
      if (item.position < width){ // remove it if reaches top of grid
        laserArr.splice(i, 1)

      } else if (enemies.filter(alien => alien.position === item.position ).length > 0){ // there is an enemy in that position 
        console.log('BOTH HERE!')
        laserArr.splice(i,1) // delete this laser
        const posit = item.position
        console.log(posit)
        enemies = enemies.filter(item => item.position !== posit) // delete this alien from arr
        cells[posit].classList.remove(enemyClass)// delete enemy class from this cell

      } else {
        console.log(item.position + 'before update') 
        item['position'] = item['position'] - width //move one up
        console.log('moved to' + item.position)
      }
    })

    // add again
    laserArr.forEach((item) => {
      cells[item['position']].classList.add(laserClass)
    })
  } 

  function newLaser(event){ 
    //grab key pressed
    const keyPressed = event.keyCode
    const spaceKey = 32
    const firedLocation = playerCurrentPosition - width 
    console.log(firedLocation + 'firedlocation') 
    // if space pressed and cell free, add laser, push item into laserArray 
    if ( spaceKey === keyPressed && !cells[firedLocation].classList.contains(laserClass)){
      addItem(firedLocation, laserClass) 
      laserArr.push({ position: playerCurrentPosition - width, ind: laserArr.length })

      console.log(laserArr)
    }
  } 





}

window.addEventListener('DOMContentLoaded', init)