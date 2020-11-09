var game = new Game(new Player(`player1`, `sponge`, JSON.parse(localStorage.getItem('player1'))),
                    new Player(`player2`, `starfish`, JSON.parse(localStorage.getItem('player2'))));

var player1Wins = document.querySelector('.player-1-wins');
var player2Wins = document.querySelector('.player-2-wins');

window.onload = updateWinDisplay();
var gameBoard = document.querySelector('.game-board');
var turnImage = document.querySelector('.turn-image');
var winnerDisplay = document.querySelector('.winner-display');
var turnDisplay = document.querySelector('.turn-display');
var allSquares = document.querySelectorAll('.square');

gameBoard.addEventListener('click', function(event) {
  takeTurn(event);
})

function takeTurn(event) {
  var spaceIsOpen = event.target.innerHTML === ""
  if (event.target.classList.contains('square') && spaceIsOpen && game.playable) {
    playToken(event);
    checkGameResults();
    game.changeTurn();
    toggleToken();
  }
}

function checkGameResults() {
  if (game.checkGameWinner()) {
    establishWinner();
    return resetGameBoard();
  } else if (game.checkDraw()) {
    displayDraw();
    return resetGameBoard();
  }
}

function displayDraw() {
  winnerDisplay.innerText = "It's a draw!";
  winnerDisplay.classList.remove('hidden');
  turnDisplay.classList.add('hidden');
}

function toggleToken() {
  var currentPiece = game.turn.token;
  var currentSource = game.turn.playerImage
  if (currentPiece === `starfish`) {
    turnImage.classList.add('starfish');
  } else {
    turnImage.classList.remove('starfish');
  }
  turnImage.attributes.src.nodeValue = currentSource;
}

function playToken(event) {
  game.drawCount++;
  insertToken(event);
}

function insertToken(event) {
  var squareNumber = parseInt(event.target.dataset.id);
  var playerImage = game.turn.token;
  event.target.insertAdjacentHTML('afterbegin', game.turn.tokenId);
  game.board[squareNumber].splice(0, 1, playerImage);
}

function establishWinner() {
  game.plays++;
  displayWinner();
  game.giveWinToPlayer();
  updateWinDisplay();
}

function displayWinner() {
  winnerDisplay.classList.remove('hidden');
  turnDisplay.classList.add('hidden');
  winnerDisplay.innerText = 'won!';
  var winnerImage = `<img class="board-img ${game.turn.token} winner"
    src="./assets/${game.turn.token}.svg" alt="${game.id}s piece">`;
  winnerDisplay.insertAdjacentHTML('afterbegin', winnerImage);
}

function updateWinDisplay() {
  player1Wins.innerText = `wins: ${game.players[0].wins}`;
  player2Wins.innerText = `wins: ${game.players[1].wins}`;
}

function resetGameBoard() {
  setTimeout(function() {
    winnerDisplay.classList.add('hidden');
    turnDisplay.classList.remove('hidden');
    game.resetGameData(game.first);
    toggleToken();
  }, 2000);
}

function animateWinner(winningSpaces) {
  for (var i = 0; i < allSquares.length; i++) {
    var id = parseInt(allSquares[i].dataset.id);
    var isWinningSquare= winningSpaces.includes(id)
    if (isWinningSquare) {
      allSquares[i].firstElementChild.classList.add('shake');
    }
  }
}
