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
  document.addEventListener('keydown', moveEnemyRight) //listen for keys



  //!EXECUTION

  //?VARIABLES
  // grid
  const width = 10
  const cellCount = width * width
  const cells = []

  //player position

  const PlayerStartingPosition = 95
  let playerCurrentPosition = PlayerStartingPosition

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
      item['position'] = item['position'] + 1 // change number
      cells[item['position']].classList.add(enemyClass)
    })

  }









}

window.addEventListener('DOMContentLoaded', init)