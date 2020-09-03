var gameState = 0;
var fm, chatcp, chatncp;
var allPlayers;
var database, shuffledCards = [], cards, y = 10, count = 0, div, playerCount, player, totalCards = 0;
var arrplayer1, arrplayer2;
var cardsdisplay;
var cardcontainer;
var cardInfo;
let fr = 10; 
var usera;
var string;
var reset = document.querySelector("#reset");
var currentuserans=document.querySelector("#currentuserans");
var currentuserques=document.querySelector("#currentuserques");
var yesreply=document.querySelector("#yes");
var Noreply=document.querySelector("#no");

/* Obtain player name*/
var userform = document.querySelector("#userdetails-form")
userform.addEventListener("submit", (e) => {

  e.preventDefault();
  
  game.start();
})


cardcontainer = document.querySelector(".displaycards");
cardcontainer.addEventListener("click",(e)=>{
  if(e.target.tagName === "DIV" || e.target.tagName=== "P"){
   // userans.enterans.disabled=false;
    console.log(e.target.textContent);
  var person = prompt("Please enter your reply:", "enter answer");
  if (person == null || person == "") {
    txt = "User cancelled the prompt.";
  } else {
    console.log(person);
    game.play(person,e.target);
    
  }
}
  
    
   

});

function setup() {
  frameRate(fr);
  database = firebase.database();
  reset.addEventListener("click",()=>{
    database.ref("/").update({
      playerCount:0,
      gameState:0,
      players:null,
      answer:"",
      question:""
    })
    
  })
  game = new game();
  game.getState();
  cards = new card();

  ////shuffle and distribute logic
  cards.getCardInfo()
    .then((data) => {
      shuffledCards = shuffle(data);
      distributeCards();
    })
    .catch((err) => {console.log(err) });
}

function draw() {

  if (playerCount === 2) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play(usera);
  }

  
}

function distributeCards() {

  arrplayer1 = [];
  arrplayer2 = [];
  if (shuffledCards !== undefined) {
    for (var i = 1; i <= 20; i++) {
      if (i === 0 || i % 2 === 0) {
        arrplayer1.push(shuffledCards[i]);
      }
      else {
        arrplayer2.push(shuffledCards[i]);
      }
    }

  }
}

