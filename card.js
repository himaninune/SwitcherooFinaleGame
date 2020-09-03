class card {

  constructor() {
    this.cardID = null;//unique identifier
    this.cardType = null;//subject card/letter card
    this.cardContent = null;//written on card
    this.cardWith = null;//player1/player2/deck/face up card

  }

  async getCardInfo() {
    var cardInfoRef = await database.ref('cardsInGame').once("value");
    cardInfo = cardInfoRef.val();

    return cardInfo;


  }


  addCard() {
    database.ref("cardsInGame").update(
      {
        "cardContent": "s card",
        "cardID": 8,
        "cardType": "subject"
      }
    );

  }



}


