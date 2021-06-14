class Car extends Location{
    constructor(width, height, top, left, canvas, url){
        super(width, height, top, left, canvas, url);
        this.speed = 2.5;
        this.bottom = this.top + this.height;
        this.right = this.left + this.width;
        this.explosion = new Image();
        this.explosion.src = "img/explosion.png";
    }

    drawCar(){
        this.canvas.drawImage(this.photo, this.left, this.top, this.width, this.height);
    }

    setRightBottom(){
        this.bottom = this.top + this.height;
        this.right = this.left + this.width;
    }
    
    carControl(keyCode){
        switch(keyCode){
            case UP: 
                if(this.top <= 0){}
                else{
                    this.top -= 15;
                }
                break;
            case DOWN: 
                if(this.top >= 620){}
                else{
                    this.top += 5;
                }
                break;
            case LEFT: 
                if(this.left <= 135){}
                else{
                    this.left -= 10;
                }
                break;
            case RIGHT: 
                if(this.left >= 315){}
                else{
                    this.left += 10;
                }
                break;
        }
        this.setRightBottom();
    }

    updateLocationOfTheCar(){
        this.top += this.speed;
        this.setRightBottom();
        this.drawCar();
    }

    creatCoordinates(myCar){
        let x = Math.floor(Math.random()*181) + 135;
        this.speed =  Math.floor(Math.random()*2) + myCar.speed + 0.5;
        this.left = x;
        this.top = -100;
    }

    checkImpactByCar(car){
        if(this.checkPoint(car.top, car.left) == true){
            pointImpactY = car.top;
            pointImpactX = car.left;
            return true;
        }
        if(this.checkPoint(car.top, car.right) == true){
            pointImpactY = car.top;
            pointImpactX = car.right;
            return true;
        }
        if(this.checkPoint(car.bottom, car.left) == true){
            pointImpactY = car.bottom;
            pointImpactX = car.left;
            return true;
        }
        if(this.checkPoint(car.bottom, car.right) == true){
            pointImpactY = car.bottom;
            pointImpactX = car.right;
            return true;
        }
        return false;
    }

    checkPoint(pointY , pointX){
        if(this.top < pointY && pointY < this.bottom){
            if(this.left < pointX && pointX < this.right){
                return true;
            }
        }
        return false;
    }
    carExplosion(){
        this.canvas.drawImage(this.explosion, 0, 0, 150, 150, pointImpactX - 40, pointImpactY - 50, 80, 80);
    }

    carSpeedUp(){
        this.speed += this.speed * 8/100;
    }

    carSpeedUpdate(){
        let speedOfCar = this.speed*5*3.6;
        return speedOfCar.toFixed(2);
    }
}