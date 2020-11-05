class Game {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.turn = this.players[0];
    this.board = [[1],[2],[3],
                  [4],[5],[6],
                  [7],[8],[9]]
  }

  changeTurn() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1]
    } else {
      this.turn = this.players[0]
    }
    turnImage.attributes.src.nodeValue = this.turn.playerImage
  }

  checkGameWinner(path) {
    //check rows
    for (var i = 0; i < 9; i++) {
      if (this.board[i][0] === this.board[i+1][0] && this.board[i][0] === this.board[i+2][0]) {
        console.log("WINNER")
      }
      i += 2
    }

    //check columns
    for (var i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i+3][0] && this.board[i][0] === this.board[i+6][0]) {
        console.log("WINNER")
      }
    }
    
    //check diags


  }

  giveWinToPlayer(play) {

  }

  resetGameBoard() {

  }
}
