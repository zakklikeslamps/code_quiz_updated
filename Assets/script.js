//Selects all ID elements to be interacted with via HTML
var header = document.getElementById("main-head");
var scoresContainer = document.getElementById("scores");
var timer = document.getElementById("countdown");
var quizContainer = document.getElementById("quiz");
var quizQuestions = document.getElementById("question");
var currentIndex = 0;
var seeResults = document.getElementById("results");
var startQuiz = document.getElementById("quiz-start");
var finishQuiz = document.getElementById("quiz-end");
var finalScore = document.getElementById("final-score");
var time;
var timeDisplayP = document.createElement("p");
timer.append(timeDisplayP);
timeDisplayP.innerHTML = "";

//Storing score & user input to localstorage
var userInfo = document.getElementById("initials");
userInfo.textContent = "";

//Creates access to the highscore page
var scoresText = document.createElement("a");
scoresText.setAttribute("href", "highscores.html");
scoresText.innerHTML = "See High Scores";
scores.appendChild(scoresText);

//User's task; Header/main text
var headText = document.createElement("p");
headText.innerHTML =
  "Try to answer the questions correctly within the time limit. If you answer incorrectly you will lose time.";

//Start Quiz
quizContainer.appendChild(headText);
var startButton = document.createElement("button");
startButton.setAttribute("class", "btn-info");
startButton.innerHTML = "Start Quiz";
startQuiz.appendChild(startButton);
timer.textContent = "Timer : ";

//Start Button
startQuiz.addEventListener("click", function () {
  timer = setInterval(startTimer, 1000);
  console.log("Start");

  //Starts timer
  function startTimer() {
    var timeLeft = 30;
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timer.textContent = "Time: " + timeLeft + "seconds";
        timeLeft -= 1;
      } else if (timeLeft === 1) {
        timer.textContent = "Time: " + timeLeft + "second";
        timeLeft -= 1;
      } else {
        timer.textContent = timeLeft + " ";
        clearInterval(timeInterval);
      }
      //Showing Questions
      function showquestion() {
        var currentQuestion = questions[currentIndex];
        currentQuestion.answers.forEach(function( userChoices, currentIndex)
        var userQuestion = questions[questionsIndex].question;
        var userchoices = questions[questionsIndex].answers;


        quizContainer.textContent = userQuestion;
    
        for (i = 0; i < userchoices.length; i++) {
          var choicesButton = document.createElement("button");
          //choicesButton.setAttribute();
          choicesButton.textContent = userchoices[i];
          quizContainer.appendChild(choicesButton);
          choicesButton.addEventListener("click", checkAnswer);
        }
      }
      showquestion();

      //Checking Answers
      function checkAnswer(event) {
        var quizQuestions = questions.length;
        var answer = questions[questionsIndex].answer;
        var correctAnswer = event.target.correctAnswer;

        if (correctAnswer === answer) {
          seeResults.textContent = "Correct";
          score++;
          console.log(score);
          finalScore.textContent = "You scored " + score + "!";
        } else {
          seeResults.textContent = "Wrong";
          secondsLeft -= 6;
        }

        if (questions.length === quizQuestions) {
          timeLeft = 0;
          quizContainer.classList.add("d-none");
          results.classList.add("d-none");
          finishQuiz.classList.remove("d-none");
        } else {
          questionIndex++;
          showQuestion();
        }
      }
    });
  }
  startTimer();

  //Set Variables
  var questionsIndex = 0;
  var score = 0;

  /*var timer = document.querySelector("#start");
var holdInterval = 0;

timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);

                timer.textContent = "GAME OVER";
            }
        }, 1000);
    }*/

  /*var timeInterval = setInterval(function () {
    timer.innerHTML = "Timer: Only" + timeLeft + "seconds left!"
    if (timeLeft === 0) {
        clearInterval(timeInterval);

        console.log("Time's Up.");
    }
    if (timeLeft <= 0) {
        clearInterval;
    }
    else {
        timeLeft--;
        timer.textContent = "Time Left " + timeLeft;
    }
}, 1000);*/

  //Submit Button
  var userScore;
  var submitInfoButton = document.getElementById("submit");
  submitInfoButton.addEventListener("click", function () {
    var initialText = userInfo.value;
    if (initialText.length === 0) {
      alert("Error: Please enter your initials.");
    } else {
      var finalText = {
        initials: initialText,
        score: userScore,
      };
      console.log(finalText);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalText);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      window.location.href = "highscores.html";
    }
  });
});
