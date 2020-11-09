var game = new Game(new Player(`player1`, `sponge`, JSON.parse(localStorage.getItem('player1'))),
                    new Player(`player2`, `starfish`, JSON.parse(localStorage.getItem('player2'))));

var player1Wins = document.querySelector('.js-p1-wins');
var player2Wins = document.querySelector('.js-p2-wins');

window.onload = updateWinDisplay();
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
    displayEndGame(drawDisplay);
    return resetGameBoard();
  }
}

function toggleToken(image) {
  var currentPiece = game.turn.token;
  var currentSource = game.turn.playerImage
  if (currentPiece === `starfish`) {
    image.classList.add('starfish');
  } else {
    image.classList.remove('starfish');
  }
  image.attributes.src.nodeValue = currentSource;
}

function playToken(event) {
  game.drawCount++;
  insertToken(event);
}

function insertToken(event) {
  var squareNumber = parseInt(event.target.dataset.id);
  var playerImage = game.turn.tokenId;
  event.target.insertAdjacentHTML('afterbegin', playerImage);
  game.board[squareNumber].splice(0, 1, playerImage);
  disableSpace(event);
}

function disableSpace(event) {
  event.target.disabled = true;
}

function establishWinner() {
  game.plays++;
  displayEndGame(winnerDisplay);
  game.giveWinToPlayer();
  updateWinDisplay();
}

function displayEndGame(gameResultDisplay) {
  turnDisplay.classList.add('hidden');
  endGameDisplay.classList.remove('hidden');
  gameResultDisplay.classList.remove('hidden')
  if (gameResultDisplay === winnerDisplay) {
    toggleToken(winnerImage)
  }
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

function animateWinner(winningSpaces) {
  for (var i = 0; i < allSquares.length; i++) {
    var id = parseInt(allSquares[i].dataset.id);
    var isWinningSquare = winningSpaces.includes(id);
    if (isWinningSquare) {
      allSquares[i].firstElementChild.classList.add('dance');
    }
  }
}
