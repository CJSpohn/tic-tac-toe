var game = new Game(new Player(`player1`, `sponge`), new Player(`player2`, `starfish`));

var gameBoard = document.querySelector('.game-board');
var turnImage = document.querySelector('.turn-image');

gameBoard.addEventListener('click', function(event) {
  if (event.target.classList.contains('square')) {
    event.target.insertAdjacentHTML('afterbegin', game.turn.tokenId);
    game.changeTurn();
  }
})
