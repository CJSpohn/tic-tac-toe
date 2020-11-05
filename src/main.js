var game = new Game(new Player(`player1`, `sponge`), new Player(`player2`, `starfish`));

var turnDisplay = document.querySelector('.turn-display')
var gameBoard = document.querySelector('.game-board');
var turnImage = document.querySelector('.turn-image');
var squareOne = document.querySelector('.one')
var squareTwo = document.querySelector('.two')
var squareThree = document.querySelector('.three')
var squareFour = document.querySelector('.four')
var squareFive = document.querySelector('.five')
var squareSix = document.querySelector('.six')
var squareSeven = document.querySelector('.seven')
var squareEight = document.querySelector('.eight')
var squareNine = document.querySelector('.nine')


gameBoard.addEventListener('click', function(event) {
  if (event.target.classList.contains('square') && event.target.innerHTML === "") {
    event.target.insertAdjacentHTML('afterbegin', game.turn.tokenId);
    game.board[parseInt(event.target.dataset.id)].splice(0, 1, game.turn.token)
    if (game.checkGameWinner()) {
      game.resetGameBoard();
    };
    game.changeTurn();
  }
})
