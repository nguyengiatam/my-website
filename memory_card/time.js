class Time{
    constructor(audioStart, audioEnd, backgroundSound, elementStart, elementEnd){
        this.audio = new Audio(audioStart, audioEnd, backgroundSound)
        this.elementStart = elementStart;
        this.elementEnd = elementEnd;
        this.start = 2;
        this.end = 0;
    }

    startGame(time){
        this.end = time;
        this.elementEnd.text(time);
        this.audio.playBa();
    }

    countDownBegins(){
        switch(this.start){
            case 2: 
                this.audio.playHai();
                break;
            case 1: 
                this.audio.playMot();
                break;
            case 0: 
                this.audio.playBatDau();
                this.elementStart.text("Bắt Đầu");
                break;
        }
        if(this.start > 0){
            this.elementStart.text(this.start);
        }
        else if(this.start < 0){
            this.elementStart.hide();
            this.audio.playBackgroundSound();
        }
        this.start--;
    }

    countDownTimeOut(){
        this.end--;
        if(this.end == 20){
            this.elementEnd.css("color", "yellow");
        }
        else if(this.end == 10){
            this.audio.play10s();
            this.elementEnd.css("color", "red");
        }
        else if(this.end == 5){
            this.audio.play5s();
        }
        if(this.end > 0){
            this.elementEnd.text(this.end);
        }
        else{
            this.elementEnd.text("Hết Giờ");
            this.audio.playHetGio();
        }
    }

    endWin(){
        this.audio.stopBackgroundSound();
        this.audio.playBanThang();
    }

    endLose(){
        this.audio.stopBackgroundSound();
        this.audio.playBanThua();
    }
}