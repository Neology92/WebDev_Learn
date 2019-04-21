
////////////////////////////////////////////////////////
//                                                    //
// File bubble.js contains definition of class Bubble //
//                                                    //
////////////////////////////////////////////////////////

class Bubble
{
    constructor(x,y,r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = 0;
    }

    //Allows to change bubble color
    changeBrightness(bright)
    {
        this.brightness = bright;
    }

    //Allows to draw bubble on canvas
    show()
    {
        fill(this.brightness, 127);
        stroke(255);
        strokeWeight(3);

        ellipse(this.x, this.y, this.r*2);
    }

    //Makes bubble vibrating
    move()
    {
        const strength = 2; //Of vibrations

        this.x += random(-strength, strength);
        this.y += random(-strength, strength);
    }

    // Checks if bubble intersects with other bubble
    intersects(other)
    { 
        let distance = dist(this.x, this.y, other.x, other.y);
        return (this.r + other.r > distance);
    }
};