$(function()
{    
    $(document).ready(initGame);

    var $firstCard;  
    var turn;
    var card;
    var pairsLeft;
    var lock = false;
    
    function initGame()
    {
        pairsLeft = 6;
        firstCard = 0;
        turn = 0;
        card = [];

        randomizeCards();

        $(".board").html('<div class="card" id="c0"></div><div class="card" id="c1"></div><div class="card" id="c2"></div><div class="card" id="c3"></div><div class="card" id="c4"></div><div class="card" id="c5"></div><div class="card" id="c6"></div><div class="card" id="c7"></div><div class="card" id="c8"></div><div class="card" id="c9"></div><div class="card" id="c10"></div><div class="card" id="c11"></div>');
        $(".score").html("Turn: 0");

        $('.board').on('click', function(e){ clickOnBoard(e); });
    }


    function randomizeCards()
    {
        var names = ["ciri.png",    "ciri.png",   "jaskier.png",  "jaskier.png",
                     "triss.png",   "yen.png",    "iorweth.png",  "geralt.png", 
                     "triss.png",   "yen.png",    "iorweth.png",  "geralt.png"];

        let lastElem = names.length-1;
        let pos = 0;
        
        while(lastElem >= 0)
        {
            let randNr = Math.floor(Math.random()*lastElem);

            card[pos] = names[randNr];
            names[randNr] = names[lastElem];

            lastElem--;
            pos++;
        }
    }


    function clickOnBoard(e)
    {
        if($(e.target).hasClass('card'))
        {

            if(!lock)
            {
                lock = true;

                var $currCard = $(e.target);

                if(!$firstCard)
                {
                    showCard($currCard);
                    $firstCard = $currCard;     
                    lock = false;
                }
                else
                {
                    let firstCardNr = $firstCard.attr('id').substring(1);
                    let currCardNr = $currCard.attr('id').substring(1);
                    
                    showCard($currCard);
    
                    if(card[firstCardNr] == card[currCardNr])
                    {
                        setTimeout(success, 750, $firstCard, $currCard);
                    }
                    else
                    {
                        setTimeout(failure, 1000,  $firstCard, $currCard);
                    }
                    
                    $firstCard = 0;
                    turn++;
                    $(".score").html("Turn: "+turn);
                }
            }
        }
        else if($(e.target).hasClass('againButton'))
        {
            initGame();
        }
    }

    function showCard($card)
    {
        let nr = $card.attr('id').substring(1);
        $card.css("background", "url(img/"+ card[nr] +")");
        $card.addClass("cardActive");
        $card.removeClass("card");
    }

    function success($c1, $c2)
    {
        $c1.css("opacity", "0");
        $c2.css("opacity", "0");
        pairsLeft--;

        if(!pairsLeft)
        {
            $(".board").html('<h1 style="color: #E9B64A">You win!</h1><br/><h2 style="text-decoration: underline">Took you: '+ turn +' turns</h2><br/><div class=\"againButton\">Again?</div>');
            $(".score").html("");
        }

        lock = false;
    }
    
    function failure($c1, $c2)
    {
        $c1.css("background", "url(img/karta.png)");
        $c1.addClass("card");
        $c1.removeClass("cardActive");

        $c2.css("background", "url(img/karta.png)");
        $c2.addClass("card");
        $c2.removeClass("cardActive");

        lock = false;
    }
    


});

