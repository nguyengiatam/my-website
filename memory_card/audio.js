class Audio{
    constructor(audioStart, audioEnd, backgroundSound){
        this.audioStart = audioStart;
        this.audioEnd = audioEnd;
        this.backgroundSound = backgroundSound;
    }

    playBackgroundSound(){
        let random = Math.floor(Math.random()*this.backgroundSound.length);
        this.backgroundSound[random].play();
    }

    playBa(){
        this.audioStart[3].play();
    }

    playHai(){
        this.audioStart[2].play();
    }

    playMot(){
        this.audioStart[1].play();
    }

    playBatDau(){
        this.audioStart[0].play();
    }

    play10s(){
        this.audioEnd[0].play();
    }

    play5s(){
        this.audioEnd[1].play();
    }

    playBanThang(){
        this.audioEnd[2].play();
    }

    playBanThua(){
        this.audioEnd[3].play();
    }

    playHetGio(){
        this.audioEnd[4].play(); 
    }

    stopBackgroundSound(){
        for(let i of this.backgroundSound){
            i.pause();
        }
    }
}