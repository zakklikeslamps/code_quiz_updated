var showScores = document.querySelector("#score-list");
var clearScores = document.querySelector("#clear");
var returnToQuiz = document.querySelector("#return");

clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allscores");
allscores = JSON.parse(allscores);

if (allscores != null) {
    for (var i = 0; i < allscores.length; i++) {
        var createli = document.createElement("li");
        createli.textContent = allscores[i].initials + " " + allscores[i].score;
        highscore.appendChild(createli);
    }
}

addEventListener("click", function () {
    window.location.replace("index.html");
});

