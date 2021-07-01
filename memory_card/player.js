class Player{
    constructor(elementGetName, nameEasy, timeEasy, nameMedium, timeMedium, nameHard, timeHard, msgTimeWin){
        this.elementGetName = elementGetName;
        this.timePlay = 0;
        this.level = "";
        this.nameEasy = nameEasy;
        this.timeEasy = timeEasy;
        this.nameMedium = nameMedium;
        this.timeMedium = timeMedium;
        this.nameHard = nameHard;
        this.timeHard = timeHard;
        this.msgTimeWin = msgTimeWin;
    }

    setLevel(level){
        this.level = level;
    }

    countingTime(){
        this.timePlay++;
    }

    getTimeData(level){
        if(JSON.parse(localStorage.getItem(level))){
            return JSON.parse(localStorage.getItem(level));
        };
        return [];
    }

    saveTimeData(){
        let data = JSON.stringify(this.dataTime);
        localStorage.setItem(this.level, data);
    }

    getNameData(level){
        if(JSON.parse(localStorage.getItem(level + "player"))){
            return JSON.parse(localStorage.getItem(level + "player"));
        }
        return [];
    }

    saveNameData(){
        let data = JSON.stringify(this.dataNamePlayer);
        localStorage.setItem(this.level + "player", data);
    }

    getData(level){
        this.dataTime = this.getTimeData(level);
        this.dataNamePlayer = this.getNameData(level);
    }

    checkRankings(){
        if(this.checkTime()){
            this.elementGetName.css("left", "30%");
            this.elementGetName.css("opacity", "1");
            // this.elementGetName.css("animation", "showGetName 0.3s ease-out");
        }
    }

    checkTime(){
        if(this.dataTime.length < 3){
            this.dataTime.push(this.timePlay);
            return true;
        }
        else{
            for(let i = 0; i < this.dataTime.length; i++){
                if(this.timePlay < this.dataTime[i]){
                    this.dataTime[2] = this.timePlay;
                    return true;
                }
            }
        }
        return false;
    }

    showTimeWin(){
        this.msgTimeWin.html("Thời gian thắng: " + this.timePlay + " giây");
        this.msgTimeWin.css("animation","showTime 5s ease-in");
        setTimeout(() =>{
            this.msgTimeWin.hide();
        }, 5000);
    }

    setName(name){
        if(this.dataNamePlayer.length < 3){
            this.dataNamePlayer.push(name);
        }
        else{
            this.dataNamePlayer[2] = name;
        }
        this.elementGetName.css("left", "-40%");
        this.elementGetName.css("opacity", "0");
    }

    sortData(){
        let value;
        for(let i = 0; i < 3; i++){
            for(let j = i + 1; j < 3; j++){
                if(this.dataTime[i] > this.dataTime[j]){
                    value = this.dataTime[i];
                    this.dataTime[i] = this.dataTime[j];
                    this.dataTime[j] = value;
                    value = this.dataNamePlayer[i];
                    this.dataNamePlayer[i] = this.dataNamePlayer[j];
                    this.dataNamePlayer[j] = value;
                }
            }
        }
        this.saveTimeData();
        this.saveNameData();
    }

    printDataPlayer(){
        let dataTimeEasy = this.getTimeData("easy");
        let dataNameEasy = this.getNameData("easy");
        let dataTimeMedium = this.getTimeData("medium");
        let dataNameMedium = this.getNameData("medium");
        let dataTimeHard = this.getTimeData("hard");
        let dataNameHard = this.getNameData("hard");
        for(let i = 0; i < 3; i++){
            if(dataNameEasy && dataNameEasy[i]){
                this.nameEasy[i].innerHTML = dataNameEasy[i];
                this.timeEasy[i].innerHTML = dataTimeEasy[i] + " giây";
            }
            if(dataNameMedium && dataNameMedium[i]){
                this.nameMedium[i].innerHTML = dataNameMedium[i];
                this.timeMedium[i].innerHTML = dataTimeMedium[i] + " giây";
            }
            if(dataNameHard && dataNameHard[i]){
                this.nameHard[i].innerHTML = dataNameHard[i];
                this.timeHard[i].innerHTML = dataTimeHard[i] + " giây";
            }
        }
    }
}