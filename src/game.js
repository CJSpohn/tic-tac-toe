class Game {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.turn = this.players[0];
  }

  changeTurn() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1]
    } else {
      this.turn = this.players[0]
    }
    turnImage.attributes.src.nodeValue = this.turn.playerImage
  }

  checkGameWinner(board) {

  }

  giveWinToPlayer(play) {

  }

  resetGameBoard() {

  }
}
