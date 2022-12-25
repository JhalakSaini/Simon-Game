
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// starting the game on the first key press
$(document).keypress(function() {
    // !started = (!false) = (true) , for the first key press
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});


$(".btn").click(function() {
    // getting the id{red,yellow,green,blue} of the button clicked
    var userChosenColour = $(this).attr("id");

    // adding the color name to the user clicked pattern array
    userClickedPattern.push(userChosenColour);

    // playing sound and animation
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // checking whether the right button is clicked or not
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    // checking if the clicked box and the game pattern color matches
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // checking if the pattern clicked is completed ? if yes , then asking the next sequence otherwise keep completing the pattern by clicking the boxes. When we click the next box for completing the pattern code from line 21 executes again.
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {
        // when we click the wrong box or exceed the clicks of the pattern
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        // reseting the variables and starting the game again
        startOver();
    }
}


function nextSequence() {
    // clearing out the sequence we have pressed before knowing the next box to bse clicked
    userClickedPattern = [];
    // increasing the level
    level++;
    $("#level-title").text("Level " + level);

    // getting a random number from 0-3 and getting the corresponding color from the array based on the random number~index
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    // adding the random color chosen into the game pattern
    gamePattern.push(randomChosenColour);
    // applying the animation to the next chosen color and playing the respective sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// function to add the effects when we press a box
function animatePress(currentColor) {
    // adding the class 'pressed' to the box with specific id of the color
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    // taking the level to zero again at restarting
    level = 0;
    // empting the game pattern so that new pattern can be recored for the new game
    gamePattern = [];
    started = false;
}
