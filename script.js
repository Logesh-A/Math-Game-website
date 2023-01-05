var play=false
var score=0
var action
var timeremaining
var correctans
// if we click on start/reset button:
document.getElementById("btn").onclick = function()
{
    if ( play )
    {
        location.reload() //reload page
        document.getElementById("btn").innerHTML="Start game"
    }
    else //if we are not playing :
    {
        play=true //change mode
        score=0 //set score to zero
        document.getElementById("scorevalue").innerHTML=score //set score to 0
        show("time")//show countdown box
        timeremaining=60
        document.getElementById("timeremainingvalue").innerHTML=timeremaining
        hide("gameover")//to hide gameover box after game starts
        document.getElementById("btn").innerHTML="Reset game"
        startcountdown()
        generate()
    }

}


function startcountdown() //start counter
{ 
     action = setInterval(function(){
        timeremaining-=1
        document.getElementById("timeremainingvalue").innerHTML=timeremaining
        if(timeremaining==0)//game over
        {
            stopcountdown()
        }
     },1000)
}
function stopcountdown() //stop counter
{
    clearInterval(action)
    show("gameover")
    document.getElementById("gameover").innerHTML="<p>GAME OVER!</p> <p>YOUR SCORE IS "+score+".</p>"
    hide("time")
    hide("correct")
    hide("wrong")
    play=false
    document.getElementById("btn").innerHTML="Reset Game"
}

function hide(id) //to hide an element
{
    document.getElementById(id).style.display="none"
}

function show(id) //to show an element
{
    document.getElementById(id).style.display="block"
}

function generate()//generate Q&A
{
    var x=1+Math.round(Math.random()*9)
    var y=1+Math.round(Math.random()*9)
    correctans=x*y
    document.getElementById("question").innerHTML=x+'x'+y
    var correctpos=1+Math.round(Math.random()*3)
    document.getElementById("b"+correctpos).innerHTML=correctans //fill one box with correct answer

    //fill other boxes with wrong boxes
    var ans=[correctans]
    for(i=1; i<5; i++)
    {
        if(i != correctpos)
        {
            var wrongans
            do{
                wrongans=(1+Math.round(Math.random()*9)) * (1+Math.round(Math.random()*9))
            }
            while(ans.indexOf(wrongans)>-1)
            
            document.getElementById("b"+i).innerHTML=wrongans
            ans.push(wrongans)
        }
    }
}

for(i=1; i<5; i++)
{
    document.getElementById("b"+i).onclick = function()
{
    if(play) //to check whether we are playing or not
    {
        if(this.innerHTML == correctans) // check for correct answer
        {
            score+=1
            document.getElementById("scorevalue").innerHTML=score // to update score
            hide("wrong") //to hide try again box
            show("correct") // to show correct box
            setTimeout(function(){hide("correct")},1000)
            generate()
        }
        else //if answer is wrong
        {
            hide("correct")
            show("wrong")
            setTimeout(function(){hide("wrong")},1000)
        }
    }
}

}
