class Location{
    constructor(width, height, top, left, canvas, url){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.photo = new Image();
        this.photo.src = url;
        this.canvas = canvas;
    }
}