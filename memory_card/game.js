class Game{
    constructor(time){
        this.arrayCard = [];
        this.time = time;
    }

    setArrayCard(){
        for(let i = 0; i < 12; i++){
            this.arrayCard[i] = new Card("card" + i, "img/back.png", "img/front" + i + ".png");
        }
        this.arrayCard = this.arrayCard.concat(this.arrayCard);
    }

    changeCard(){
        let randomCard;
        let lengthArray = this.arrayCard.length;
        let intermediary;
        for(let i = 0;1 < lengthArray; i++){
            randomCard = Math.floor(Math.random()*lengthArray);
            lengthArray--;
            intermediary = this.arrayCard[lengthArray];
            this.arrayCard[lengthArray] = this.arrayCard[randomCard];
            this.arrayCard[randomCard] = intermediary;
        }
    }

    drawArrayCard(element){
        let html = "";
        for(let i = 0; i < 3; i++){
            html += "<div class='row'>";
            for(let j = i * 8; j <(i + 1) * 8; j++){
                html += this.arrayCard[j].drawCard();
            }
            html += "</div>";
        }
        element.innerHTML = html;
    }
}
