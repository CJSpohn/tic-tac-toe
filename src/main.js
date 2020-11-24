var game = new Game(new Player(`player1`, `sponge`), new Player(`player2`, `starfish`));
let huPlayer = "<img class=\"game__board--square-image sponge\"\n    src=\"./assets/sponge.svg\" alt=\"player1's piece\">"
let aiPlayer = "<img class=\"game__board--square-image starfish\"\n    src=\"./assets/starfish.svg\" alt=\"player2's piece\">"



var player1Wins = document.querySelector('.js-player1-wins');
var player2Wins = document.querySelector('.js-player2-wins');

window.onload = loadWins();
var clearWinsBtn = document.querySelector('.js-clear-wins');
var gameBoard = document.querySelector('.js-board');
var turnImage = document.querySelector('.js-turn-image');
var winnerImage = document.querySelector('.js-winner-image');
var winnerDisplay = document.querySelector('.js-winner');
var turnDisplay = document.querySelector('.js-turn-display');
var endGameDisplay = document.querySelector('.js-end-game');
var drawDisplay = document.querySelector('.js-draw');
var allSquares = document.querySelectorAll('.js-space');
var computerBtn = document.querySelector('.js-computer');
var radioBtnsDisplay = document.querySelector('.js-radio-display');
var radioBtnEasy = document.querySelector('#easy');
var radioBtnHard = document.querySelector('#hard');

//Event Listeners
gameBoard.addEventListener('click', function(event) {
  takeTurn(event);
})

clearWinsBtn.addEventListener('click', clearWins);

computerBtn.addEventListener('click', toggleComputer);


//Event Handlers and Helpers

//Computer Stuff
function toggleComputer() {
  toggleComputerBtnText();
  if (game.players[1].id === 'player2') {
    game = new Game(new Player(`player1`, `sponge`), new Player(`computer`, `starfish`));
  } else {
    game = new Game(new Player(`player1`, `sponge`), new Player(`player2`, `starfish`));
  }
  loadWins();
  resetGameBoard();
}

function toggleComputerBtnText() {
  if (computerBtn.innerText === "Play against computer") {
    radioBtnsDisplay.classList.remove("hidden")
    computerBtn.innerText = "Play against human";
  } else {
    radioBtnsDisplay.classList.add("hidden")
    computerBtn.innerText = "Play against computer";
  }
}

function updateBoardDom(squareNumber, starfishImage) {
  allSquares.forEach(square => {
    if (parseInt(square.dataset["id"]) === squareNumber ) {
      square.innerHTML += starfishImage
    }
  })
}


//Player Stuff
function takeTurn(event) {
  if (event.target.classList.contains('js-space') && game.playable) {
    playToken(event);
    evaluateTurn();
  }
}

function evaluateTurn() {
  checkGameResults();
  game.changeTurn();
  toggleToken(turnImage);
}


function checkGameResults() {
  if (game.checkGameWinner()) {
    establishWinner();
    resetGameBoardDelay()
  } else if (game.checkDraw()) {
    displayEndGame();
    resetGameBoardDelay();
  }
}

function toggleToken(image) {
  var currentPiece = game.turn.gamePieceName;
  if (currentPiece === `starfish`) {
    image.classList.add('starfish');
  } else {
    image.classList.remove('starfish');
  }
  image.attributes.src.nodeValue = `./assets/${currentPiece}.svg`;
  image.attributes.alt.nodeValue = `${currentPiece}'s token`;
}

function playToken(event) {
  game.drawCount++;
  insertToken(event);
}

function insertToken(event) {
  var squareNumber = parseInt(event.target.dataset.id);
  var playerImage = `<img class="game__board--square-image ${game.turn.gamePieceName}"
    src="./assets/${game.turn.gamePieceName}.svg" alt="${game.turn.id}'s piece">`;
  event.target.insertAdjacentHTML('afterbegin', playerImage);
  game.board[squareNumber] = playerImage;
  disableSpace(event);
}

function disableSpace(event) {
  event.target.disabled = true;
}

function establishWinner() {
  game.plays++;
  displayEndGame();
  game.giveWinToPlayer();
  updateWinDisplay();
}

function displayEndGame() {
  turnDisplay.classList.add('hidden');
  endGameDisplay.classList.remove('hidden');
  if (game.drawCount === 9 && game.isWon === false) {
    drawDisplay.classList.remove('hidden');
  } else {
    toggleToken(winnerImage);
    winnerDisplay.classList.remove('hidden');
  }
}

function loadWins() {
  game.players[0].retrieveWinsFromStorage();
  game.players[1].retrieveWinsFromStorage();
  updateWinDisplay();
}

function updateWinDisplay() {
  player1Wins.innerText = `wins: ${game.players[0].wins}`;
  player2Wins.innerText = `wins: ${game.players[1].wins}`;
}

function resetGameBoard() {
    endGameDisplay.classList.add('hidden');
    drawDisplay.classList.add('hidden');
    winnerDisplay.classList.add('hidden');
    turnDisplay.classList.remove('hidden');
    game.resetGameData();
    toggleToken(turnImage);
    if (game.players[1].id === `computer` && game.turn === game.players[1]) {
      game.takeCpuTurn();
    }
}

function resetGameBoardDelay() {
  setTimeout(function () {
    resetGameBoard()
  }, 2000)
}

function clearBoard() {
  var boardSpaces = document.querySelectorAll('.js-space');
  for (var i = 0; i < boardSpaces.length; i++) {
    boardSpaces[i].innerHTML = "";
    boardSpaces[i].disabled = false;
  }
}

function clearWins() {
  localStorage.clear();
  location.reload();
}

function animateWinner(winningSpaces) {
  var id;
  var isWinningSquare;
  for (var i = 0; i < allSquares.length; i++) {
    id = parseInt(allSquares[i].dataset.id);
    isWinningSquare = winningSpaces.includes(id);
    if (isWinningSquare) {
      allSquares[i].firstElementChild.classList.add('dance');
    }
  }
}
