class Player {
  constructor(player, token) {
    this.id = player;
    this.token = token;
    this.playerImage = `./assets/${token}.svg`;
    this.tokenId = `<img class="board-img ${token}" src="./assets/${token}.svg" alt="${this.id}'s piece'">`;
    this.wins = [];
  }

  saveWinsToStorage() {

  }

  retrieveWinsFromStorage() {

  }

}
