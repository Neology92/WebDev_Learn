
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
        this.shakingRadius = 2;
    }

    //Allows to change bubble color
    changeBrightness(bright)
    {
        this.brightness = bright;
    }

    changeShakingStrength(power)
    {
        this.shakingRadius = power;
    }

    clicked()
    {
        this.r++;
    }

    //Allows to draw bubble on canvas
    show()
    {
        fill(this.brightness, 127);
        stroke(255);
        strokeWeight(2);

        ellipse(this.x, this.y, this.r*2);
    }

    //Makes bubble vibrating
    move()
    {
        this.x += random(-this.shakingRadius, this.shakingRadius);
        this.y += random(-this.shakingRadius, this.shakingRadius);
    }

    // Checks if bubble intersects with other bubble
    intersects(other)
    { 
        let distance = dist(this.x, this.y, other.x, other.y);
        return (this.r + other.r > distance);
    }
};