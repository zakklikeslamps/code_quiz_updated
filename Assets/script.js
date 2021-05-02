// Questions/Choices contained as objects within array
var questions = [

  {
    question: "What does HTML stand for?",
    answers: [
      "Hitmonlee",
      "Hitman Lives",
      "Happytime-Makeup-Language",
      "Hypertext-Markup-Language",
    ],
    correctAnswer: "Hypertext-Markup-Language",
  },

  {
    question: "What does CSS stand for?",
    answers: [
      "Come See the Show",
      "Catch Some Surf",
      "Corrupt Section Secured",
      "Cascading Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },

  {
    question: "What is the relationship between HTML & CSS?",
    answers: [
      "They work in tandem to make powerful, interactive webpages.",
      "CSS creates a web page while HTML provies it's functionality.",
      "HTML is a web page's basic elemental structure, while CSS styles those elements.",
      "None: They're independent of each other.",
    ],
    correctAnswer:
      "HTML is a web page's basic elemental structure, while CSS styles those elements.",
  },

  {
    question: "What does JavaScript do for a web page?",
    answers: [
      "Provides basic interactivity & functionality for users.",
      "Creates links to other web pages.",
      "Opens new tabs in a browser.",
      "All the above",
    ],
    correctAnswer: "Provides basic interactivity & functionality for users.",
  },

  {
    question: "BONUS! Quiz custodiet ipsos custodes?",
    answers: ["JLU", "Avengers", "TMNT", "All the above"],
    correctAnswer: "All the above",
  },

];

//Initialize: set vars. to zero
var quesIndex = 0;
var score = 0;
var dataIndex = 0;

//Begin Quiz w/ 60 sec.
var presentTime = document.querySelector("#presentTime");
var time = document.querySelector("#start");
var dataDiv = document.querySelector("#dataDiv");
var container = document.querySelector("#container");
var secLeft = 60;
var interval = 0;

//Adds <ul> element when needed
var ulCreate = document.querySelector("#choices");

//Timer starts when button is clicked
time.addEventListener("click", function () {

  if (interval === 0) {
    interval = setInterval(function () {
      secLeft--;
      presentTime.textContent = "Time: " + secLeft;

      if (secLeft <= 0) {
        clearInterval(interval);
        timeUp();
        presentTime.textContent = "Sorry, your time is up.";
      }

    }, 1000);

  }

  render(quesIndex);

});

//pulls questions & answers from array
function render(quesIndex) {
  dataDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var userQues = questions[quesIndex].question;
    var userChoice = questions[quesIndex].answers;
    dataDiv.textContent = userQues;
  }

  userChoice.forEach(function (newItem) {
    var item = document.createElement("li");
    item.textContent = newItem;
    dataDiv.appendChild(ulCreate);
    ulCreate.appendChild(item);
    item.addEventListener("click", compare);
  });
}

//compares user's answer choice to correct answer
//correct-move on incorrect-time deduction
function compare (event) {
  var element = event.target;

  if(element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (element.textContent == questions[quesIndex].correctAnswer) {
      score++;
      createDiv.textContent = "Correct!";

    } else {
      secLeft = secLeft - 10;
      createDiv.textContent = "Sorry. The correct answer was" + questions[quesIndex].correctAnswer
    }
    
  }

  //proceeds with quiz after each question is answered
  //if the final question is answered the finish function is called 
  quesIndex++;

  if (quesIndex >= questions.length) {
    finish();
    createDiv.textContent = "You answered " + score + "!";

  } else {
    render(quesIndex);

  }
  dataDiv.appendChild(createDiv);

}

//if quiz is finished data is cleared 
function finish() {
  dataDiv.innerHTML = "";
  time.innerHTML = "";

  // header

  var createHead = document.createElement("h1");
  createHead.setAttribute("id", "createHead");
  createHead.textContent = "GAME OVER";
  dataDiv.appendChild(createHead);

  // p
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");
  dataDiv.appendChild(createP);

  //add time + score for final score
  if (secLeft >= 0) {
    var timeLeft = secLeft;
    var createP2 = document.createElement("p");
    clearInterval(interval);
    if (timeLeft === undefined) {
      timeLeft = 0
    }
    createP2.textContent ="Final Score: " + timeLeft;
    dataDiv.appendChild(createP2);
  }

  //require initials for high scores page
  var label = document.createElement("label");
  label.setAttribute("id", "label");
  label.textContent = "Enter Your Initiails";
  dataDiv.appendChild(label);

  //get initials
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "initials");
  input.textContent = "";
  dataDiv.appendChild(input);

  //submit initials
  var submit = dofcument.creatElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "Submit");
  submit.textContent = "Submit";
  dataDiv.appendChild(submit);

  submit.eventListener("click", function () {
    var initials = input.value;
    if (initials === null) {
      alert("Please enter valid initials (3)");

    } else if (initials > 3) {
      alert("Please enter valid initials (3)");

    } else {
      var finalScore = {
        initials: initials, 
        score: timeLeft
      }

      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores=JSON.parse(allScores);
      }

      if(finalScore.score === null) {
        finalScore.score = 0;
      }

      allScores.push(finalScore);
      var nextScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", nextScore);
      window.location.replace("highscores.html");
    }
    
  });

}