class Game {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.turn = this.players[0];
    this.board = [[1],[2],[3],
                  [4],[5],[6],
                  [7],[8],[9]];
    this.plays = 0;
    this.playable = true;
  }

  changeTurn() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1]
    } else {
      this.turn = this.players[0]
    }
    turnImage.attributes.src.nodeValue = this.turn.playerImage
  }

  checkGameWinner() {
    if (this.checkRows() || this.checkCols() || this.checkDiags()) {
      this.playable = !this.playable;
      return true
    } else {
      return this.checkDraw();
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
    if (this.plays === 9) {
      turnDisplay.innerText = "It's a draw!"
      this.resetGameBoard()
    }
  }

  giveWinToPlayer() {
    this.turn.wins++
  }

  resetGameBoard() {
    setTimeout(this.resetGame, 2000)
  }

  resetGame() {
    var player1 = new Player(game.players[0], game.players[0].token, game.players[0].wins)
    var player2 = new Player(game.players[1], game.players[1].token, game.players[1].wins)
    game = new Game(player1, player2)
    game.clearBoard();
  }

  clearBoard() {
    var boardSpaces = document.querySelectorAll('.square');
    for (var i = 0; i < boardSpaces.length; i++) {
      boardSpaces[i].innerHTML = ""
    }
    turnDisplay.innerHTML = `It's <img class="turn-image" src="./assets/${game.turn.token}.svg" alt="Player 1">'s turn`
  }
}
