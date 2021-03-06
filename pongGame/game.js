const canvasElem = document.querySelector('canvas');
const ctx = canvasElem.getContext('2d');

canvasElem.width = 1000;
canvasElem.height = 500;

const cw = canvasElem.width;
const ch = canvasElem.height; 


let ball;
let pad1;
let pad2;
let collisions;
let board;


function setup()
{
    board = new GameBoard();
    ball = new Ball();
    pad1 = new Paddle();
    pad2 = new Paddle(910);
    collisions = new CollisionsDetector();


      window.addEventListener("keydown", function (e) {

        if(e.keyCode == 38)
            pad1.moveUp = true;
        
        if(e.keyCode == 40)
            pad1.moveDown = true;
      })

    window.addEventListener("keyup", function (e) {

        if(e.keyCode == 38)
            pad1.moveUp = false;


        
        if(e.keyCode == 40)
            pad1.moveDown = false;
      })
}

function gameLoop() 
{ 
    drawTable();

    collisions.check();

    pad1.movePlayer()
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

    ctx.font = "80px Arial";
    ctx.fillText(board.scoreL, cw/2 - cw/10 - 40, ch/6);
    ctx.fillText(board.scoreR, cw/2 + cw/10, ch/6);

}

class Ball
{
    constructor()
    {
        this.d = 20;
        this.x = cw/2 - this.d/2;
        this.y = ch/2 - this.d/2;
        this.speedX = -4;
        this.speedY = 4;
        this.speedLimit = 14;
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
        this.checkBorders();
    }

    checkBorders()
    {
        if(this.y <= 0)
        {
            this.speedY *= -1;
            this.y = 0;
        }
        else if( this.y + this.d >= ch)
        {
            this.speedY *= -1;
            this.y = ch - this.d;
        }

        if(this.x <= 0)
        {
            board.pointR();
            board.nextRound();
        }
        else if(this.x + this.d >= cw)
        {
            board.pointL();
            board.nextRound();
        }
    }

    speedUpX(acceleration)
    {
        if(this.speedX < this.speedLimit && this.speedX > -this.speedLimit)
        {
            if(this.speedX >= 0)
                this.speedX += acceleration;
            else 
                this.speedX -= acceleration;    
        }
    }

    changeSpeedY(acceleration)
    {
            this.speedY += acceleration;
    }
};

class Paddle
{
    constructor(x = 70)
    {
        this.height = 100;
        this.width = 10;
        this.x = x;
        this.y = ch/2 - this.height/2;

        this.moveUp = false;
        this.moveDown = false;

        this.speedY = 4;
    }

    draw()
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    movePlayer()
    {
        if(this.moveUp)
        {
            this.y -= this.speedY;
        }
        else if(this.moveDown)
        {
            this.y += this.speedY;
        }

        this.checkBorders();
    }

    moveAI()
    {
        let padMid = this.y + this.height/2;
        let ballMidY = ball.y + ball.d/2;
        let ballMidX = ball.x + ball.d/2;
        
        if(ballMidX > cw/2)
        {            
            if(padMid > ballMidY)
            {
                this.y -= this.speedY;
            }
            else if (padMid < ballMidY)
            {
                this.y += this.speedY;
            }
        }
        else if (ballMidX > cw/2 - cw/3)
        {
            if(ballMidY < ch/2 - ch/5)
            {
                if(padMid < ch/2 - ch/5)
                    this.y += this.speedY;
                else if  (padMid > ch/2 - ch/5)
                    this.y -= this.speedY;
            }
            else if (ballMidY > ch/2 - ch/5  &&  ballMidY < ch/2)
            {
                if(padMid < ch/2)
                    this.y += this.speedY;
                else if  (padMid > ch/2)
                    this.y -= this.speedY;            
            }
            else if(ballMidY > ch/2 + ch/5)
            {
                if(padMid > ch/2 + ch/5)
                    this.y -= this.speedY;
                else if  (padMid < ch/2 + ch/5)
                    this.y += this.speedY;
            }        
        }
        else
        {
            if(ballMidX > 200)
                this.y -= this.speedY;
            if(ballMidX > 100)
                this.y += this.speedY;
            if(ballMidX > 50)
                this.y -= this.speedY;
        }
        

        this.checkBorders();
    }

    checkBorders()
    {
        if( this.y + this.height >= ch)
        {
            this.y = ch - this.height;
        }
        else if( this.y <= 0)
        {
            this.y = 0;
        }
    }

};

class CollisionsDetector
{
    check()
    {
        this.paddleCollision(ball, pad1);
        this.paddleCollision(ball, pad2);
        // this.goalCollision(ball);
    }

    paddleCollision(ball, paddle)
    {
        let collision = false;

        // L-Collision
       if(ball.x + ball.d > paddle.x  &&  ball.x < paddle.x)
        {
            if(ball.y + ball.d > paddle.y  &&  ball.y < paddle.y + paddle.height)
            {
                ball.speedX *= -1;
                ball.x = paddle.x - ball.d;
                collision = true;
            }
        }

        // R-Collision
        if(ball.x <= paddle.x + paddle.width  &&  ball.x > paddle.x)
        {
            if(ball.y + ball.d > paddle.y  &&  ball.y < paddle.y + paddle.height)
            {
                ball.speedX *= -1;
                ball.x = paddle.x + paddle.width;
                collision = true;
            }
        }
        
        // Top-Collision
        if(ball.y + ball.d >= paddle.y  &&  ball.y < paddle.y)
        {
            if(ball.x < paddle.x + paddle.width  &&  ball.x + ball.d > paddle.x)
            {
                ball.speedY *= -1;
                ball.y = paddle.y - ball.d;  
                collision = true;
            }
        }

        // Bottom-Collision
        if(ball.y <= paddle.y + paddle.height  &&  ball.y + ball.d > paddle.y + paddle.height)
        {
            if(ball.x < paddle.x + paddle.width  &&  ball.x + ball.d > paddle.x)
            {
                ball.speedY *= -1;
                ball.y = paddle.y + paddle.height;  
                collision = true;             
            }
        }
        
        if(collision)
        {
            if(paddle.moveUp)
                ball.changeSpeedY(-2);
            else if(paddle.moveDown)
                ball.changeSpeedY(2);

            ball.speedUpX(1);
        }

    }
};

class GameBoard
{
    constructor()
    {
        this.scoreL = 0;
        this.scoreR = 0;
    }

    pointL()
    {
        this.scoreL++;
    }

    pointR()
    {
        this.scoreR++;
    }

    nextRound()
    {
        ball = new Ball();
        pad1 = new Paddle();
        pad2 = new Paddle(910);
    }
}


setup();
setInterval(gameLoop, 16);