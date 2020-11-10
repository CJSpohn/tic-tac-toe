class Player {
  constructor(player, gamePiece, wins) {
    this.id = player;
    this.gamePieceName = gamePiece;
    this.wins = wins || 0;
  }

  saveWinsToStorage(player) {
    var savedWins = JSON.parse(localStorage.getItem(player.id)) || 0;
    savedWins = player.wins;
    localStorage.setItem(player.id, savedWins);
  }

}
