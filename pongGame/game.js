const canvasElem = document.querySelector('canvas');
const ctx = canvasElem.getContext('2d');

canvasElem.width = 1000;
canvasElem.height = 500;

const cw = canvasElem.width;
const ch = canvasElem.height; 


let ball;
let pad1;
let pad2;


function setup()
{
    ball = new Ball();
    pad1 = new Paddle(70);
    pad2 = new Paddle(910);

    window.addEventListener("mousemove", function(e){ pad1.movePlayer(e);});
}


function gameLoop() 
{ 
    drawTable();

    pad1.draw();

    pad2.moveAI();
    pad2.draw();

    ball.move();
    ball.draw();
}


function drawTable()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch); 

    ctx.fillStyle = '#333333';

    let lineH = 15;
    let lineW = 8;
    let space = 25;

    for(let posY=space; (posY+space)<ch; posY+=(space+lineH))
    {
        let posX = (cw-lineW)/2;
        ctx.fillRect(posX, posY, lineW, lineH); 
    }

}

class Ball
{
    constructor()
    {
        this.d = 20;
        this.x = cw/2 - this.d/2;
        this.y = ch/2 - this.d/2;
        this.speedX = 3;
        this.speedY = 3;
    }

    draw()
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.d, this.d);
    }

    move()
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }
};

class Paddle
{
    constructor(x)
    {
        this.height = 100;
        this.width = 10;
        this.x = x;
        this.y = ch/2 - this.height/2;
    }

    draw()
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    movePlayer(e)
    {
        let y = e.clientY - canvasElem.offsetTop
        let r = this.height/2;
        if( y+r >= canvasElem.height)
        {
            this.y = canvasElem.height - this.height;
        }
        else if( y-r <= 0)
        {
            this.y = 0;
        }
        else
        {
            this.y = y - r;
        }
    }

    moveAI()
    {
        this.y = ball.y - this.height/2;
    }
};


setup();
setInterval(gameLoop, 16);