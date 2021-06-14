class Street extends Location{
    constructor(canvas, url){
        super(500, 701, 0, 0, canvas, url);
        this.distance = 0;
    }
    drawStreet(top){
        this.canvas.drawImage(this.photo, this.left, top, this.width, this.height);
    }
    movingCarOnTheRoad(car){
        let streetClone = this.top - this.height + car.speed;
        if(this.top >= 700){
            this.top = 0;
        }
        this.canvas.clearRect(0, 0, 500, 700);
        this.top += car.speed;
        this.drawStreet(streetClone);
        this.drawStreet(this.top);
        car.drawCar();
    }
    
    updateDistanceTraveled(car){
        this.distance += car.speed*5/1000;
        return this.distance.toFixed(2);
    }

}