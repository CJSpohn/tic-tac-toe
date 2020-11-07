var game = new Game(new Player(`player1`, `sponge`, JSON.parse(localStorage.getItem('player1'))),
           new Player(`player2`, `starfish`, JSON.parse(localStorage.getItem('player2'))));

var player1Wins = document.querySelector('.player-1-wins');
var player2Wins = document.querySelector('.player-2-wins');


var squareOne = document.querySelector('.one')
var squareTwo = document.querySelector('.two')
var squareThree = document.querySelector('.three')
var squareFour = document.querySelector('.four')
var squareFive = document.querySelector('.five')
var squareSix = document.querySelector('.six')
var squareSeven = document.querySelector('.seven')
var squareEight = document.querySelector('.eight')
var squareNine = document.querySelector('.nine')

window.onload = updateWinDisplay();
var gameBoard = document.querySelector('.game-board');
var turnImage = document.querySelector('.turn-image');
var winnerDisplay = document.querySelector('.winner-display');
var turnDisplay = document.querySelector('.turn-display')
gameBoard.addEventListener('click', function(event) {
  takeTurn(event)
})

function takeTurn(event) {
if (event.target.classList.contains('square') && event.target.innerHTML === "" && game.playable) {
    playPiece(event);
    checkGameResults()
    game.changeTurn();
    turnImage.attributes.src.nodeValue = game.turn.playerImage
  }
}

function checkGameResults() {
  if (game.checkGameWinner()) {
    establishWinner();
    return resetGameBoard();
  } else if (game.checkDraw()) {
    winnerDisplay.innerText = "It's a draw!"
    winnerDisplay.classList.remove('hidden')
    turnDisplay.classList.add('hidden')
    return resetGameBoard()
  }
}

function playPiece(event) {
  game.drawCount++;
  togglePiece(event)
}

function togglePiece(event) {
  var squareNumber = parseInt(event.target.dataset.id);
  var playerImage = game.turn.token;
  event.target.insertAdjacentHTML('afterbegin', game.turn.tokenId);
  game.board[squareNumber].splice(0, 1, playerImage)
}

function establishWinner() {
  game.plays++
  displayWinner();
  game.giveWinToPlayer();
  updateWinDisplay()
  resetGameBoard();
}

function displayWinner() {
  winnerDisplay.classList.remove('hidden')
  turnDisplay.classList.add('hidden')
  winnerDisplay.innerText = 'won!';
  winnerDisplay.insertAdjacentHTML('afterbegin', game.turn.tokenId);
}

function updateWinDisplay() {
  player1Wins.innerText = `wins: ${game.players[0].wins}`
  player2Wins.innerText = `wins: ${game.players[1].wins}`
}

function resetGameBoard() {
  setTimeout(function() {
    winnerDisplay.classList.add('hidden')
    turnDisplay.classList.remove('hidden')
    game.resetGame(game.first)
  }, 2000)
}
