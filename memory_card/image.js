class Image{
    constructor(elemnetStart, elementEnd){
        this.elemnetStart = elemnetStart;
        this.elementEnd = elementEnd;
        this.start = [];
        this.win = [];
        this.lose = [];
    }

    setImageStart(number){
        for(let i = 0; i < number; i++){
            this.start[i] = "<img src='img/start" + i + ".gif'>";
        }
    }
    setImageWin(number){
        for(let i = 0; i < number; i++){
            this.win[i] = "<img src='img/win" + i + ".gif'>";
        }
    }
    setImageLose(number){
        for(let i = 0; i < number; i++){
            this.lose[i] = "<img src='img/lose" + i + ".gif'>";
        }
    }
    showImageStart(){
        this.elemnetStart.html(this.start[Math.floor(Math.random()*this.start.length)]);
    }

    showImageLose(random){
        this.elementEnd.html(this.lose[Math.floor(Math.random()*this.lose.length)]);
    }

    showImageWin(random){
        this.elementEnd.html(this.win[Math.floor(Math.random()*this.win.length)]);
    }
}