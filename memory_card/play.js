class Play{
    constructor(setupGame, start, end, msgEnd){
        this.checkWin = 0;
        this.elementSetupGame = setupGame;
        this.elementStart = start;
        this.elementEnd = end;
        this.elementMsgEnd = msgEnd;
    }
    
    setupListCard(numberCard, classAudio){
        let listCard = [];
        for(let i = 0; i < 2; i++){
            for(let j = numberCard*i; j < (i+1)*numberCard; j++){
                listCard[j] = new Card("card" + (j - numberCard*i), "img/front" + (j - numberCard*i) + ".png", classAudio[(j - numberCard*i)], j);
            }
        }
        return listCard;
    }

    changeLocationCard(listCard){
        let valueTransport;
        for(let i = 0; i < 200; i++){
            let numberRandom1 = Math.floor(Math.random()*listCard.length);
            let numberRandom2 = Math.floor(Math.random()*listCard.length);
            valueTransport = listCard[numberRandom1];
            listCard[numberRandom1] = listCard[numberRandom2];
            listCard[numberRandom2] = valueTransport;
        }
    }

    drawListCard(listCard, element, row, column){
        let html = "";
        for(let i = 0; i < row; i++){
            html += "<div class='row'>";
            for(let j = i*column; j < (i + 1)*column; j++){
                html += listCard[j].drawCard();
                listCard[j].index = j;
            }
            html += "</div>";
        }
        element.html(html);
    }

    setElementCard(listCard, elementCard, elementFront, elementBack){
        for(let i of listCard)
        {
            i.setElement(elementCard, elementFront, elementBack);
        };
    }

    checkTheSameCard(card1, card2){
        if(card1.name == card2.name){
            card1.hideCard();
            card2.hideCard();
            card1.playAudioCard();
            this.checkWin++;
        }
        else{
            card1.faceDown();
            card2.faceDown();
        }
    }
    startGame(){
        this.elementStart.hide();
    }

    startCountDownTimeOut(){
        this.elementSetupGame.hide();
    }

    endWin(){
        this.elementSetupGame.show();
        this.elementEnd.css("display", "block");
        this.elementMsgEnd.text("Bạn thắng");
    }
    endLose(){
        this.elementSetupGame.show();
        this.elementEnd.css("display", "block");
        this.elementMsgEnd.text("Bạn thua");
    }
}