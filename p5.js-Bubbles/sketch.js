let bubbles = [];

function setup()
{
    createCanvas(600, 600);

    for(let i=0; i<5; i++)
    {
        let x = random(10, 590);
        let y = random(10, 590);
        let r = random(10, 60);

        bubbles[i] = new Bubble(x,y,r);
    }
}

function draw()
{
    background(0);

    let bubblesIntersects = [];   

    for(let i = 0; i < bubbles.length; i++)
    {
        bubbles[i].move();
    
        // Check if two bubbles are overlapping
        for(let j = i+1; j<bubbles.length; j++)
        {
            if( bubbles[i].intersects(bubbles[j]) )
            {
                bubblesIntersects[i] = 1;
                bubblesIntersects[j] = 1;
            }
        }  
        
        // set collor of bubble based on whether it is intersecting with other one;
        if(bubblesIntersects[i])
            bubbles[i].changeBrightness(127);
        else
            bubbles[i].changeBrightness(0);
            
            
        //checking if mouse hovers bubble
        let distance = dist(bubbles[i].x, bubbles[i].y, mouseX, mouseY); 
        if(distance < bubbles[i].r)
        {
            bubbles[i].changeShakingStrength(0);          
        }
        else
        {
            bubbles[i].changeShakingStrength(2); 
        }

        bubbles[i].show();        
    }
}


function mousePressed()
{
    let insideBubble = false;

    for(let i=0; i<bubbles.length; i++)
    {
        let distance = dist(bubbles[i].x, bubbles[i].y, mouseX, mouseY); 
        if(distance < bubbles[i].r)
        {
            bubbles[i].clicked();    
            insideBubble = true;    
        }
    }   

    if(!insideBubble)
    {
        let r = random(10, 30);
        let b = new Bubble(mouseX, mouseY, r);
        bubbles.push(b); 
    }
}