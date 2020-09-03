// class Player{
class Player {
    constructor(){
      this.index = null;
      this.name = null;
      this.status=null;
      this.score=null;
      this.playerCards=null;
      //this.answer=null;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        status:this.status,
        score:this.score,
        playerCards:this.playerCards
        
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }

    //update answer entered by current user
    static updateAnswer(useranswer){
      if(useranswer !== undefined){
        database.ref("/").update({
          answer:useranswer
          
        });
      }
      
    }

    //update answer entered by current user
    static updateQues(ques){
      if(ques !== undefined){
        database.ref("/").update({
          question:ques
          
        });
      }
      
    }
    //other user can get answer from DB
    static async getAnswer(){
      var answer;
      var ansref=await database.ref("answer")
      ansref.on("value",  (data)=>
        answer=data.val())
        return answer;
    }
    static async getQues(){
      var question;
      var qref=await database.ref("question")
      qref.on("value",  (data)=>
      question=data.val())
        return question;
    }
    
  }
  