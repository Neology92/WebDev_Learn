window.onload = initGame;

var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"

var quizWord = "";
var hiddenWord = "";
var gibbet = 0;


function initGame()
{
    document.getElementById("board").style.color = "white";
    document.getElementById("gibbet").innerHTML = '<img src="img/s0.jpg"/>';
    quizWord = "Chrząszcz brzmi w trzcinie";
    quizWord = quizWord.toUpperCase();
    hiddenWord = "";
    gibbet = 0;

    for( i=0; i<quizWord.length; i++)
    {
        if(quizWord.charAt(i) == " ")
            hiddenWord = hiddenWord + " ";
        else
            hiddenWord = hiddenWord + "_";
    }
    
    showLetters();
    showQWord(hiddenWord);
}


function showLetters()
{
    var letter_board = {content: ""};

    for(i=0; i<35; i++)
    {

        letter_board.content += '<div class="letter" onclick="checkLetter('+ i +')" id="letter'+ i +'">'+ alphabet.charAt(i) +"</div>";
        
        if(!((i+1) % 7) )
            letter_board.content += '<div style="clear: both;"></div>';    
    }

    document.getElementById("alphabet").innerHTML = letter_board.content;

}


function showQWord(qword)
{
    document.getElementById("board").innerHTML = qword;
}


function checkLetter(nr)
{
    var hit = false;

    for(i=0; i<quizWord.length; i++)
    {
        if(quizWord.charAt(i) == alphabet.charAt(nr))
        {
            hiddenWord = hiddenWord.setChar(i, alphabet.charAt(nr));
            hit = true;
        }
    }

    if(hit)
    {
        document.getElementById("letter"+nr).style.borderColor = "limegreen";
        document.getElementById("letter"+nr).style.color = "limegreen";
        document.getElementById("letter"+nr).style.backgroundColor = "green";
        document.getElementById("letter"+nr).style.cursor = "default";
        document.getElementById("letter"+nr).setAttribute("onclick",";");
        
        showQWord(hiddenWord);

        if(hiddenWord == quizWord)
        {
            document.getElementById("board").style.color = "limegreen";
            var button = '<div class="letter" style="width: 100px; height: 80px;" onclick="initGame();">Play Again</div>';
            document.getElementById("alphabet").innerHTML = button;
        }

    }
    else
    {
        document.getElementById("letter"+nr).style.borderColor = "red";
        document.getElementById("letter"+nr).style.color = "red";
        document.getElementById("letter"+nr).style.backgroundColor = "maroon";
        document.getElementById("letter"+nr).style.cursor = "default";
        document.getElementById("letter"+nr).setAttribute("onclick",";");

        gibbet++;
        if(gibbet < 10)
            document.getElementById("gibbet").innerHTML = '<img src="img/s'+ gibbet +'.jpg"/>';
        else
        {
            document.getElementById("board").innerHTML = 'Game Over';
            var button = '<div class="letter" style="width: 100px; height: 80px;" onclick="initGame();">Play Again</div>';
            document.getElementById("alphabet").innerHTML = button;
        }

    }


}


String.prototype.setChar = function(position, newChar)
{
    if(position > this.length-1 || position < 0)
    {
        console.error("Error: Position out of range!");
        return this.toString();
    }
    else
    {
        return this.substr(0,position) + newChar + this.substr(position+1);
    }
}