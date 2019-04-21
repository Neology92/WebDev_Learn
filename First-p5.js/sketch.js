var pos = {
    x: 100,
    y: 100
};

let col = {
    r: 255,
    g: 0,
    b: 0
};

let col2 = {
    r: 0,
    g: 0,
    b: 0
};

let layer1;
let layer2;

let circleX = 0;
let circleY = 50;
let circleSpeedX = 2;
let circleSpeedY = 1;

function setup()
{
    createCanvas(600,600);
    layer1 = createGraphics(600, 600);
    layer1.clear();
    layer2 = createGraphics(600, 600);
    layer2.clear();
    background(255);
}

function draw()
{
    pos.x = random(0, width);
    pos.y = random(0, height);

    col.r = random(0,10);
    col.g = random(0,100);
    col.b = random(100,255);

    image(layer2,0,0);
    layer2.fill(col2.r,col2.g,col2.b, 100);
    layer2.noStroke();
    layer2.ellipse(circleX, circleY, 200);

    fill(col.r, col.g, col.b, 100);
    noStroke();
    ellipse(pos.x, pos.y, 24);

    image(layer1,0,0);
    layer1.fill(255,0,0);
    layer1.stroke(0);
    layer1.rect(200,200,200,200);


    
    if(circleX > width)
    {
        circleSpeedX *= -1;
        col2.r = random(0,255);
        col2.g = random(0,255);
        col2.b = random(0,255);

    }
    else if(circleX < 0)
    {
        circleSpeedX *= -1;
        col2.r = random(0,255);
        col2.g = random(0,255);
        col2.b = random(0,255);
    }
    else if(circleY > width - 50)
    {
        circleSpeedY *= -1;
    }
    else
    {
        circleSpeedY++;
    }

    circleX += circleSpeedX;
    circleY += circleSpeedY;    


}