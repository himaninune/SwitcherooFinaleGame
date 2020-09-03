class game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })
  

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
        var username = document.querySelector("#username")
        player.name = username.value
        playerCount += 1;
        player.index = playerCount;
        if (playerCount === 1) {
          player.status = "current"
          player.playerCards = arrplayer1;
          
        } else {
          player.playerCards = arrplayer2;
          player.status = "other"
          

        }
        player.score = 0;
        player.update();
        player.updateCount(playerCount);
        document.querySelector(".userdetailform").style.display = "none";
        //display greetings logic
        if (gameState === 0 && playerCount === 1) {
          document.querySelector("#usergreetings").textContent = `WELCOME ${player.name} to the exciting world of Sketchroo.`
        }
        else if (gameState === 0 && playerCount === 2) {
          document.querySelector("#usergreetings").textContent = `WELCOME ${player.name} to the exciting world of Sketchroo.`

        }

      }
    }

  }

  play(userans,target) {
    Player.getPlayerInfo();
    if (allPlayers !== undefined && player!== undefined) {
      for (var i in allPlayers) {
        if (i === "player" + player.index) {

           
          var count = 0;
          cardsdisplay = "";
          player.playerCards.forEach((carditem) => {
            if (count <= 10) {
              cardsdisplay += `<div class="card" style="width: 15rem;display:"inline-block">
                <div class="card-body">
                  <p class="card-text">${carditem.cardContent}</p>
                </div>
              </div>
              `;
            }
            count++;
          });
          cardcontainer.innerHTML = cardsdisplay;
          
          if (allPlayers[i].status === "current") {
            document.querySelector("#selectcard").style.display="block";
            Player.updateAnswer(userans);
            if(target !== undefined){
              Player.updateQues(target.textContent);}
            
          }
          else {

            document.querySelector("#selectcard").style.display="none";
           var chatncp= document.querySelector("#chatncp");
            chatncp.style.display = "block";
            Player.getAnswer()
            .then((data)=>{

              currentuserans.textContent=data;
            })
            .catch((err)=> console.log(err))
            
            Player.getQues()
            .then((data)=>{
              currentuserques.textContent=data;
            })
            .catch((err)=> console.log(err))


          }
            
        }
      }

    }


   
  }

}

