class Game {
  constructor(player1, player2, plays) {
    this.players = [player1, player2];
    this.board = [[0],[1],[2],
                  [3],[4],[5],
                  [6],[7],[8]];
    this.plays = plays || 0;
    this.playable = true;
    if (this.plays % 2 === 0) {
      this.turn = this.players[0];
    } else {
      this.turn = this.players[1];
    }
    this.drawCount = 0;
    this.isWon = false;
  }

  changeTurn() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1];
      if (this.players[1].id === 'computer' && game.playable) {
        this.takeCpuTurn();
      }
    } else {
      this.turn = this.players[0];
    }
  }

  checkGameWinner() {
    if (this.checkRows() || this.checkCols() || this.checkDiags()) {
      this.playable = !this.playable;
      this.isWon = true;
      return true;
    }
  }

  checkRows() {
    for (var i = 0; i < 9; i++) {
      if (this.board[i][0] === this.board[i+1][0] && this.board[i][0] === this.board[i+2][0]) {
        animateWinner([i, i+1, i+2]);
        return true;
      }
      i += 2;
    }
  }

  checkCols() {
    for (var i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i+3][0] && this.board[i][0] === this.board[i+6][0]) {
        animateWinner([i, i+3, i+6]);
        return true;
      }
    }
  }

  checkDiags() {
    if (this.board[0][0] === this.board[4][0] && this.board[0][0] === this.board[8][0]) {
      animateWinner([0, 4, 8]);
      return true;
    } else if (this.board[2][0] === this.board[4][0] && this.board[2][0] === this.board[6][0]) {
      animateWinner([2, 4, 6]);
      return true;
    }
  }

  checkDraw() {
    if (this.drawCount === 9) {
      game.plays++;
      this.playable = !this.playable;
      return true;
    }
  }

  giveWinToPlayer() {
    this.turn.wins++;
    var winningPlayer = this.turn;
    winningPlayer.saveWinsToStorage();
  }

  resetGameData() {
    var player1 = new Player(game.players[0].id, game.players[0].gamePieceName, game.players[0].wins);
    var player2 = new Player(game.players[1].id, game.players[1].gamePieceName, game.players[1].wins);
    game = new Game(player1, player2, game.plays);
    clearBoard();
  }

  takeCpuTurn() {
    let starfishImage = `<img class="game__board--square-image starfish"
      src="./assets/starfish.svg" alt="starfish's piece">`;
    let availSpots = this.board.filter(board => typeof board[0] === 'number');
    console.log(availSpots)
    let cpuMove = availSpots[Math.floor(Math.random() * availSpots.length)];
    this.board[this.board.findIndex(square => square[0] === cpuMove[0])] = [starfishImage];
    updateBoardDom(cpuMove[0], starfishImage);
    this.changeTurn()
  }

}
