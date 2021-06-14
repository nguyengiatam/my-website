class Game{
    constructor(time){
        this.arrayCard = [];
        this.time = time;
    }

    setArrayCard(cardNumber){
        for(let i = 0; i < cardNumber; i++){
            this.arrayCard[i] = new Card("card" + i, "img/back.png", "img/front" + i + ".png");
        }
        this.arrayCard = this.arrayCard.concat(this.arrayCard);
    }

    derangeCard(){
        let random1;
        let random2;
        let intermediary;
        for(let i = 0; i < 100; i++){
            random1 = Math.floor(Math.random()*this.arrayCard.length);
            random2 = Math.floor(Math.random()*this.arrayCard.length);
            if(random1 == random2){
                i--;
                continue;
            }
            intermediary = this.arrayCard[random1];
            this.arrayCard[random1] = this.arrayCard[random2];
            this.arrayCard[random2] = intermediary;
        }
    }

    drawArrayCard(element,row,column){
        let html = "";
        for(let i = 0; i < row; i++){
            html += "<div class='row'>";
            for(let j = i * column; j <(i + 1) * column; j++){
                html += this.arrayCard[j].drawCard();
            }
            html += "</div>";
        }
        element.html(html);
    }
}
