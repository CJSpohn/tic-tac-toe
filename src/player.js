class Player {
  constructor(player, gamePiece, wins) {
    this.id = player;
    this.gamePieceName = gamePiece;
    this.wins = wins || 0;
  }

  saveWinsToStorage() {
    var savedWins = JSON.parse(localStorage.getItem(this.id)) || 0;
    savedWins = this.wins;
    localStorage.setItem(this.id, savedWins);
  }

  retrieveWinsFromStorage() {
    var savedWins = JSON.parse(localStorage.getItem(this.id)) || 0;
    this.wins = savedWins;
  }

}
