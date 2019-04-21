let bubbles = [];
let ticker = 0;

function setup()
{
    createCanvas(600, 600);

    for(let i=0; i<100; i++)
    {
        let x = random(10, 590);
        let y = random(10, 590);
        let r = random(10, 40);

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
            
        bubbles[i].show();        
    }

}