class Card{
    constructor(name, front, audio, index){
        this.name = name;
        this.front = front;
        this.audio = audio;
        this.index = index;
    }
    setElement(elementCard, elementFront, elementBack){
        this.elementCard = elementCard;
        this.elementFront = elementFront;
        this.elementBack = elementBack;
    }

    drawCard(){
        let thisCard = "<div class='card'><div class='front'><img src='"  + this.front +"'></div><div class='back'><img src='img/back.png'></div></div>";
        return thisCard;
    }

    playAudioCard(){
        this.audio.play();
    }

    stopAudioCard(){
        this.audio.pause();
    }

    faceUp(){
        this.elementFront[this.index].style.transform = "rotateY(0deg)";
        this.elementBack[this.index].style.transform = "rotateY(180deg)";
    }

    faceDown(){
        this.elementFront[this.index].style.transform = "rotateY(180deg)";
        this.elementBack[this.index].style.transform = "rotateY(0deg)";
    }

    hideCard(){
        this.elementCard[this.index].style.opacity = "0";
    }
}