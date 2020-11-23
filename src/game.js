class Game {
  constructor(player1, player2, plays) {
    this.players = [player1, player2];
    this.board = [0,1,2,
                  3,4,5,
                  6,7,8];
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
      if (this.board[i] === this.board[i+1] && this.board[i] === this.board[i+2]) {
        animateWinner([i, i+1, i+2]);
        return true;
      }
      i += 2;
    }
  }

  checkCols() {
    for (var i = 0; i < 3; i++) {
      if (this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6]) {
        animateWinner([i, i+3, i+6]);
        return true;
      }
    }
  }

  checkDiags() {
    if (this.board[0] === this.board[4] && this.board[0] === this.board[8]) {
      animateWinner([0, 4, 8]);
      return true;
    } else if (this.board[2] === this.board[4] && this.board[2] === this.board[6]) {
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
    // let cpuChoice = this.pickCpuMove();
    //MINIMAX
    let cpuChoice = this.minimax(game.board, aiPlayer);
    //MINIMAX
    this.board[this.board.findIndex(square => square === cpuChoice)] = starfishImage;
    this.drawCount++;
    updateBoardDom(cpuChoice, starfishImage);
    evaluateTurn();
  }

  pickCpuMove() {
    let availSpots = this.board.filter(space => typeof space === 'number');
    let cpuMove = availSpots[Math.floor(Math.random() * availSpots.length)];
    return cpuMove
  }

  checkWin(board, player) {
    if (this.checkCpuRows(board, player) || this.checkCpuCols(board, player) || this.checkCpuDiags(board, player)) {
      return true;
    }
  }

  checkCpuRows(board, player) {
    for (var i = 0; i < 9; i++) {
      if (board[i] === board[i+1] && board[i] === board[i+2] && board[i] === player) {
        return true;
      }
      i += 2;
    }
  }

  checkCpuCols(board, player) {
    for (var i = 0; i < 3; i++) {
      if (board[i] === board[i+3] && board[i] === board[i+6] && board[i] === player) {
        return true;
      }
    }
  }

  checkCpuDiags(board, player) {
    if (board[0] === board[4] && board[0] === board[8] && board[0] === player) {
      return true;
    } else if (board[2] === board[4] && board[2] === board[6] && board[2] === player) {
      return true;
    }
  }

  minimax(newBoard, player) {
    let availSpots = this.board.filter(space => typeof space === 'number');
    console.log(availSpots)

    if (this.checkWin(newBoard, huPlayer)) {
      return {score: -10};
    } else if (this.checkWin(newBoard, aiPlayer)) {
      return {score: 10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player

      if (player === aiPlayer) {
        let result = this.minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        let result = this.minimax(newBoard, aiPlayer);
        move.score = result.score
      }
      newBoard[availSpots[i]] = move.index;

      moves.push(move)
    }

    let bestMove;
  	if (player === aiPlayer) {
  		var bestScore = -10000;
  		for (let i = 0; i < moves.length; i++) {
  			if (moves[i].score > bestScore) {
  				bestScore = moves[i].score;
  				bestMove = i;
  			}
  		}
  	} else {
  		let bestScore = 10000;
  		for (var i = 0; i < moves.length; i++) {
  			if (moves[i].score < bestScore) {
  				bestScore = moves[i].score;
  				bestMove = i;
  			}
  		}
  	}

  	return moves[bestMove];
  }

}
