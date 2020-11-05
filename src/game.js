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
    if (this.checkRows() || this.checkCols() || this.checkDiags()) {
      return true
    }
  }

  checkRows() {
    for (var i = 0; i < 9; i++) {
      if (this.board[i][0] === this.board[i+1][0] && this.board[i][0] === this.board[i+2][0]) {
        return true
      }
      i += 2
    }
  }

  checkCols() {
    for (var i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i+3][0] && this.board[i][0] === this.board[i+6][0]) {
        return true
      }
    }
  }

  checkDiags() {
    if ((this.board[0][0] === this.board[4][0] && this.board[0][0] === this.board[8][0]) ||
       (this.board[2][0] === this.board[4][0] && this.board[2][0] === this.board[6][0])) {
      return true
    }
  }


  giveWinToPlayer(play) {

  }

  resetGameBoard() {
    
  }
}
