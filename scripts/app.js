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
  //document.addEventListener('keydown', moveEnemyRight) //listen for keys
  document.addEventListener('keydown', movePlayer)



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
  console.log(enemyClass)

  //enemy positions 
  const enemies = []
  const enemyStartingPosition = [1,2,3]// array of starting positions
  // put for every position an alien as an object in array, with position and index as keys
  enemyStartingPosition.forEach((item, i) => {
    enemies[i] = {position: enemyStartingPosition[i],index: i }
    console.log(enemies)
  })
  let enemyDir = +1

  //score

  const enemyPoints = 100//each enemy
  let currentScore = 0 // to be added to + displayed
  //high score -  local storage -> mole

  const lives = 3
  livesSpan.innerHTML = lives



  //? FUNCTIONS

  function createGrid(){
    for(let i = 0; i < cellCount; i++){
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
    
    placeEnemy() 

  }
  createGrid()

  function placeEnemy(){  // place enemies on grid at start
    enemies.forEach((item, i) => {
      cells[item.position].classList.add(enemyClass)
      console.log(item.position)
    })
  }

  function moveEnemyRight(){  //testing movement
    
    enemies.forEach((item) => {
      cells[item['position']].classList.remove(enemyClass)
    })

    
    // IF loop for each direction it moves
    enemies.forEach((item, i) => {
      
     
      item['position'] = item['position'] + enemyDir // change number

      if (item.position % width === width - 1 ){
        console.log('touchesright')
      }

      cells[item['position']].classList.add(enemyClass)
    })

  }

  // if (vendors.filter(e => e.Name === 'Magenic').length > 0) {
  //   /* vendors contains the element we're looking for */
  // }


// Remove cat from current position
//     removeCat(currentPosition)

//     // Check the keyCode on the event and match with the direction
//     } else if (down === keyCode && currentPosition + width <= cellCount - 1){
//       console.log('CLICKED DOWN')
//       currentPosition += width
//     } else if (left === keyCode && currentPosition % width !== 0){
//       console.log('CLICKED LEFT')
//       console.log(currentPosition % width)
//       currentPosition -= 1
//     } else if (right === keyCode && currentPosition % width !== width - 1){
//       console.log('CLICKED RIGHT')
//       currentPosition += 1
//     } else {
//       console.log('INVALID KEY')
//     }

//     addCat(currentPosition)



//place player on grid
  addPlayer(playerCurrentPosition)

  // add player
  function addPlayer(position){
    cells[position].classList.add(playerClass)
  }
  // remove player
  function removePlayer(position){
    cells[position].classList.remove(playerClass)
  }
  //move player with 2 keys
  function movePlayer(event){
    // get keys
    const keyPressed = event.keyCode
    const right = 39
    const left = 37

    removePlayer(playerCurrentPosition)

    if (left === keyPressed && playerCurrentPosition % width !== 0 ) {
      console.log('move left ok')
      playerCurrentPosition -= 1
    } else if ( right === keyPressed && playerCurrentPosition % width !== width - 1){
      console.log('move right ok')
      playerCurrentPosition += 1
    }

    addPlayer(playerCurrentPosition)

  }



}

window.addEventListener('DOMContentLoaded', init)