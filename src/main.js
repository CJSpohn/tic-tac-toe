var game = new Game(new Player(`player1`, `sponge`),
                    new Player(`player2`, `starfish`));

var player1Wins = document.querySelector('.js-player1-wins');
var player2Wins = document.querySelector('.js-player2-wins');

window.onload = getWins();
var clearWinsBtn = document.querySelector('.js-clear-wins')
var gameBoard = document.querySelector('.js-board');
var turnImage = document.querySelector('.js-turn-image');
var winnerImage = document.querySelector('.js-winner-image')
var winnerDisplay = document.querySelector('.js-winner');
var turnDisplay = document.querySelector('.js-turn-display');
var endGameDisplay = document.querySelector('.js-end-game')
var drawDisplay = document.querySelector('.js-draw')
var allSquares = document.querySelectorAll('.js-space');

gameBoard.addEventListener('click', function(event) {
  takeTurn(event);
})

clearWinsBtn.addEventListener('click', clearWins);

function takeTurn(event) {
  if (event.target.classList.contains('js-space') && game.playable) {
    playToken(event);
    checkGameResults();
    game.changeTurn();
    toggleToken(turnImage);
  }
}

function checkGameResults() {
  if (game.checkGameWinner()) {
    establishWinner();
    return resetGameBoard();
  } else if (game.checkDraw()) {
    displayEndGame();
    return resetGameBoard();
  }
}

function toggleToken(image) {
  var currentPiece = game.turn.gamePieceName;
  if (currentPiece === `starfish`) {
    image.classList.add('starfish');
  } else {
    image.classList.remove('starfish');
  }
  image.attributes.src.nodeValue = `./assets/${currentPiece}.svg`
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
  game.board[squareNumber].splice(0, 1, playerImage);
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

function getWins() {
  game.players[0].retrieveWinsFromStorage();
  game.players[1].retrieveWinsFromStorage();
  updateWinDisplay();
}

function updateWinDisplay() {
  player1Wins.innerText = `wins: ${game.players[0].wins}`;
  player2Wins.innerText = `wins: ${game.players[1].wins}`;
}

function resetGameBoard() {
  setTimeout(function() {
    endGameDisplay.classList.add('hidden');
    drawDisplay.classList.add('hidden');
    winnerDisplay.classList.add('hidden');
    turnDisplay.classList.remove('hidden');
    game.resetGameData(game.first);
    toggleToken(turnImage);
  }, 2000);
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
