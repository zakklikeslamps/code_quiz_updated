var highScores = document.querySelector("#highScores");
var clearScores = document.querySelector("#clear");
var returnToQuiz = document.querySelector("#return");

//clear high scores 
clearInterval.addEventListener("click", function () {
localStorage.cleara();
location.reload();
});

// check/pull scores from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores != null) {
    for (var i=0; i < allScores.length; i++) {
        var createli = document.createElement("li");
        createli.textContent = allScores[i].initials + " " + allScores[i].score;
        highScores.appendChild(createli);
    }
}

addEventListener("click", function () {
    window.location.replace("index.html");
});

/*highScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allscores");
allscores = JSON.parse(allscores);

if (allScores != null) {
    for (var i = 0; i < allScores.length; i++) {
        var createli = document.createElement("li");
        createli.textContent = allScores[i].initials + " " + allScores[i].score;
        highscore.appendChild(createli);
    }
}

addEventListener("click", function () {
    window.location.replace("index.html");
});*/

