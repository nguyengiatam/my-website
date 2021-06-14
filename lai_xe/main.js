const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
let stopGame = false;
let stopSpeedUp;
let stopUpdateDistance;
let reverseCar = [];
let pointImpactX;
let pointImpactY;
let timeCreatContraryCar = Math.floor(Math.random()*1500) + 3000;
let myCanvas = document.getElementById("street").getContext("2d");
let myCar = new Car(40, 80, 620, 220, myCanvas, "img/mycar.png");
let street = new Street(myCanvas, "img/street.png");
for(let i = 0; i < 12; i++){
    reverseCar[i] = new Car(40, 80, 700, 0, myCanvas, "img/vatcan" + i + ".png");
}

window.onload = function loadPicturesStartGame(){
    street.drawStreet(street.top);
    myCar.drawCar();
    myCar.explosion.src = "img/explosion.png";
}

function restart(){
    $(".end").css("display", "none");
    $("#street").css("opacity", "1");
    $("#distance").text("0");
    stopGame = false;
    myCar = new Car(40, 80, 620, 220, myCanvas, "img/mycar.png");
    street = new Street(myCanvas, "img/street.png");
    for(let i = 0; i < reverseCar.length; i++){
        reverseCar[i].top = 700;
        reverseCar[i].left = 0;
    }
    carMove();
    creatCar();
    speedUp();
    updateDistanceAndSpeed();
}

function startGame(){
    carMove();
    creatCar();
    speedUp();
    updateDistanceAndSpeed();
}

function carMove(){
    $("#start").css("display", "none");
    $("#restart").css("display", "block");
    setTimeout(function(){
        street.movingCarOnTheRoad(myCar);
        updateLocation();
        if(stopGame == false){
            carMove();
        }
        else{
            myCar.carExplosion();
            clearTimeout(stopSpeedUp);
            clearTimeout(stopUpdateDistance);
            $(".end").css("display", "block");
            $("#street").css("opacity", "0.5");
        }
    },12);
}

function speedUp(){
    stopSpeedUp = setTimeout(function(){
        myCar.carSpeedUp();
        for(let i = 0; i < reverseCar.length; i++){
            if(reverseCar[i].top <= 700){
                reverseCar[i].carSpeedUp();
            }
        }
        speedUp();
    }, 5000);
}

function creatCar(){
    setTimeout(function(){
        timeCreatContraryCar = Math.floor(Math.random()*1800) + 700;
        while(true){
            let i = Math.floor(Math.random()*12);
            if(reverseCar[i].top > 700){
                reverseCar[i].creatCoordinates(myCar);
                break;
            }
        }
        if(stopGame == false){
            creatCar();
        }
    },timeCreatContraryCar);
}

function updateLocation(){
    for(let i = 0; i < reverseCar.length; i++){
        if(reverseCar[i].top <= 700){
            reverseCar[i].updateLocationOfTheCar();
            if(myCar.checkImpactByCar(reverseCar[i]) == true){
                stopGame = true;
            }
        }
    }
}

function updateDistanceAndSpeed(){
    stopUpdateDistance = setTimeout(function(){
        $("#distance").text(street.updateDistanceTraveled(myCar));
        $("#speed").text(myCar.carSpeedUpdate());
        updateDistanceAndSpeed();
    },1000);
}

window.addEventListener("keydown", function(){
    myCar.carControl(event.keyCode);
});