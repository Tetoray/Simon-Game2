// Variables
var state = "pause";
var level = 1;
var color = ["green", "red", "yellow", "blue"];
var pattern = [];
var userPattern = [];
var sequenceIndex = 0; // Index to track the current position in the pattern sequence
var level_title = document.querySelector("#level-title");

// When a key is pressed
document.addEventListener("keydown", game);

// Add click listeners to the buttons
var btns = document.querySelectorAll(".btn");

for (var i = 0; i < btns.length; i++) {
    (function (index) {
        var eventBtn = btns[index];
        eventBtn.addEventListener("click", function () {
            buttonClicked(eventBtn);
        });
    })(i);
}

function game() {
    level_title.innerHTML = "Game started";
    state = "run";
    pattern = []; // Clear the pattern
    userPattern = []; // Clear the user's input
    level = 1;
    nextLevel();
}

function nextLevel() {
    level_title.innerHTML = "level " + level;
    state = "showPattern";
    sequenceIndex = 0;
    userPattern=[];
    addNextColorToPattern();
    showPattern();
}

function addNextColorToPattern() {
    pattern.push(color[generateRand(4)]);
}

function showPattern() {

    var btn = document.querySelector("#" + pattern[pattern.length - 1]);
    playEffect(btn);
    state = "userInput";

}

function buttonClicked(btn) {
    if (state === "userInput") {
        playEffect(btn);
        userPattern.push(btn.id);

        if (userPattern[sequenceIndex] !== pattern[sequenceIndex]) {
            // Wrong button pressed
            level_title.innerHTML = "Wrong pattern. Game over!";
            gameOver();
            return;
        }

        sequenceIndex++;

        if (sequenceIndex === pattern.length) {
            // User successfully repeated the pattern
            level++;
            setTimeout(nextLevel,600);

            
        }
    }
}

function playEffect(btn) {
    btn.classList.add("pressed");
    playSound(btn);
    setTimeout(function () {
        btn.classList.remove("pressed");
    }, 100);
}

function playSound(btn) {
    var sound = new Audio("sounds/" + btn.id + ".mp3");
    sound.play();
}

function gameOver() {
    
    level_title.innerHTML = "Game Over Press A Key To Try Again";
    setTimeout(function () {
        var sound = new Audio("sounds/lose.mp3");
        sound.play();
    }, 600);
    
   
    
    pattern=[];
    userPattern=[];
    
}

function generateRand(range) {
    return Math.floor(Math.random() * range);
}
