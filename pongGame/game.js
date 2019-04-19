const canvasElem = document.querySelector('canvas');
const ctx = canvasElem.getContext('2d');

canvasElem.width = 1000;
canvasElem.height = 500;

const cw = canvasElem.width;
const ch = canvasElem.height; 


let ball = {
    size:20,
    X:cw/2,
    Y:ch/2,
    speedX: 3,
    speedY: 3
}

let paddle = {
    height:100,
    width:10
}


function drawPaddle()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(pad.X,pad.Y,paddle.height,paddle.width);
}


function drawBall()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(ball.X-ball.size/2,ball.Y-ball.size/2,ball.size,ball.size);
}

function drawTable()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch); 

    ctx.fillStyle = '#333333';

    let lineH = 20;
    let lineW = 6;
    let space = 20;

    for(let pos=0; (pos+2*space)<ch; pos+=(space+lineH))
    {
        ctx.fillRect((cw-lineW)/2,space+pos,lineW,lineH); 
    }

}

function gameLoop() 
{ 
    drawTable();

    ball.X += ball.speedX;
    ball.Y += ball.speedY;

    drawBall();
}

setInterval(gameLoop, 16);
