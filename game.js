// $("#level-title").text("Press A Key to Start");
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var gameStarted = false;
var level=0;
var userInputIndex=0;
// var isGameOver=false;
$(document).keydown(function(){
    if(gameStarted===false){
        gameStarted=true;
        level=0;
        setTimeout(nextSequence,500);
    }
});
function checkAnswer(currentLevel,userChosenColor){
    if(userChosenColor===gamePattern[userInputIndex]){
        userInputIndex++;
        if(userInputIndex===currentLevel){
            userInputIndex=0;
            // console.log("sequence mathced");
            setTimeout(nextSequence,1000);
            // nextSequence();
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level=0;
    gamePattern.length=0;
    userInputIndex=0;
    gameStarted=false;
    playSound("wrong");
}

function nextSequence(){
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    var aud=new Audio("./sounds/"+randomChosenColor+".mp3");
    aud.play();
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    clickAnimation(userChosenColor);

    // userClickedPattern.push(userChosenColor);
    if(gameStarted===true){
    checkAnswer(level,userChosenColor);
    } else {
        gameOver();
    }

});

function playSound(colorName){
    var aud=new Audio("./sounds/"+colorName+".mp3");
    aud.play();
}

function clickAnimation(colorName){
    $("#"+colorName).addClass("pressed");
    setTimeout(function(){
        $("#"+colorName).removeClass("pressed");    
    },100);
}

// nextSequence();
