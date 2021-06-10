class Card{
    constructor(name, front, back){
        this.name = name;
        this.back = back;
        this.front = front;
    }
    drawCard(){
        let card = "<div class='card'><div class='front'><img src='" + this.back + "'></div>";
        card += "<div class='back'><img src='" + this.front + "'></div></div>";
        return card;
    }
}