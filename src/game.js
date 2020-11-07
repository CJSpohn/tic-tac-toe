class Game {
  constructor(player1, player2, plays) {
    this.players = [player1, player2];
    this.board = [[1],[2],[3],
                  [4],[5],[6],
                  [7],[8],[9]];
    this.plays = plays || 0;
    this.playable = true;
    console.log("plays", this.plays)
    if (this.plays % 2 === 0) {
      this.turn = this.players[0]
    } else {
      this.turn = this.players[1]
    }
    console.log("turn", this.turn)
    this.drawCount = 0
  }

  changeTurn() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1]
    } else {
      this.turn = this.players[0]
    }
  }

  checkGameWinner() {
    if (this.checkRows() || this.checkCols() || this.checkDiags()) {
      this.playable = !this.playable;
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
    if (this.board[0][0] === this.board[4][0] && this.board[0][0] === this.board[8][0]) {
      return true
    } else if (this.board[2][0] === this.board[4][0] && this.board[2][0] === this.board[6][0]) {
      return true
    }
  }

  checkDraw() {
    if (this.drawCount === 9) {
      game.plays++
      this.playable = !this.playable;
      return true
    }
  }

  giveWinToPlayer() {
    this.turn.wins++
    var winningPlayer = this.turn
    winningPlayer.saveWinsToStorage(winningPlayer)
  }

  resetGameData(first) {
    var player1 = new Player(game.players[0].id, game.players[0].token, game.players[0].wins)
    var player2 = new Player(game.players[1].id, game.players[1].token, game.players[1].wins)
    game = new Game(player1, player2, game.plays)
    game.clearBoard();
  }

  clearBoard() {
    var boardSpaces = document.querySelectorAll('.square');
    for (var i = 0; i < boardSpaces.length; i++) {
      boardSpaces[i].innerHTML = ""
    }
  }
}
