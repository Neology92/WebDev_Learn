
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

    // Allows to change bubbles shaking radius
    changeShakingStrength(power)
    {
        this.shakingRadius = power;
    }

    // Makes bubble grows
    grow()
    {
        this.r += 2;
    }

    // Checks if point is inside bubble
    contains(posX, posY)
    {
        let distance = dist(this.x, this.y, posX, posY);     
        return (distance < this.r);
    }

    //Allows to move bubble
    newPosition(x, y)
    {
        this.x = x;
        this.y = y;
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