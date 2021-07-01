let cardOne;
let waitForTest = false;
let gameStatus;
let game = new Play($(".setupGame"), $(".start"), $(".end"), $("#msgEnd"));
let time = new Time($(".audioStart"), $(".audioEnd"), $(".backgroundSound"), $("#timeStart"), $(".timeEnd"))
let image = new Image($("#imgStart"), $("#imgEnd"));
let player = new Player($("#inputNamePlayer"),$(".nameEasy"), $(".timeEasy"), $(".nameMedium"), $(".timeMedium"), $(".nameHard"), $(".timeHard"), $("#msgTimeWin"));
let listCard = game.setupListCard(12, $(".character"));
game.changeLocationCard(listCard);
game.drawListCard(listCard, $(".game"), 3, 8);
game.setElementCard(listCard, $(".card"), $(".front"), $(".back"));
image.setImageStart(3);
image.setImageWin(4);
image.setImageLose(4);
image.showImageStart();
player.printDataPlayer();

$(".card").click(function(){
    if(waitForTest == true || $(this).css("opacity") == "0"){

    }
    else{
        let i = $(".card").index(this);
        listCard[i].faceUp();
        if(cardOne !== undefined && listCard[i].index != cardOne.index){
            waitForTest = true;
            setTimeout(function(){
                game.checkTheSameCard(listCard[i], cardOne);
                cardOne = undefined;
                waitForTest = false;
            }, 450);
        }
        else{
            cardOne = listCard[i];
        }
    }
})

function startGame(timeEnd, level){
    time.startGame(timeEnd);
    player.setLevel(level);
    player.getData(level);
    game.startGame();
    countDownBegins();
}

function countDownBegins(){
    setTimeout(function(){
        time.countDownBegins();
        if(time.start < -1){
            game.startCountDownTimeOut();
            countDownTimeOut();
        }
        else{
            countDownBegins();
        }
    }, 1000);
}

function countDownTimeOut(){
    setTimeout(function(){
        time.countDownTimeOut();
        player.countingTime();
        if(game.checkWin == 12){
            endGame("win");
        }
        else if(time.end < 0){
            endGame("lose");
        }
        else{
            countDownTimeOut();
        }
    }, 1000);
}

function endGame(status){
    for(let card of listCard){
        card.stopAudioCard();
    }
    switch(status){
        case "win": 
            player.checkRankings();
            player.showTimeWin();
            game.endWin();
            image.showImageWin();
            time.endWin();
            break;
        case "lose":
            game.endLose()
            image.showImageLose();
            time.endLose();
            break; 
    }
}

function restart(){
    location.reload();
}

function setNamePlayer(){
    let name = $("#getNamePlayer").val();
    if(name){
        player.setName(name);
        player.sortData();
        player.printDataPlayer();
    }
}
