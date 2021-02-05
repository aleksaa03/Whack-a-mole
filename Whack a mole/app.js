var text = document.getElementById("text");
var restart = document.getElementById("restart");
var timeEnd = false;
var score = 0;
var time = 4;

var random = Math.floor(Math.random() * 6);

function moleSpawn(move) {
  var moleId = document.getElementById(random);
  if (move == "up") {
    moleId.style.animation = `up .${time}s forwards`;
  } else {
    moleId.style.animation = `down .${time}s forwards`;
  }
}

moleSpawn("up");

var mole = document.querySelectorAll(".mole");

function check(num) {
  if (!timeEnd) {
    if (num == random) {
      score++;
      mole.forEach((mole) => {
        mole.style.animation = "";
      });
      message(`Score: ${score}`);
      moleSpawn("down");
      setTimeout(startTime, 500);
    } else {
      timeEnd = true;
      message(`You hit the wrong one. Score: ${score}`, "on");
      restart.style.display = "block";
      clearInterval(intervalTime);
      moleSpawn("down");
    }
  }
}

var intervalTime, seconds;

function startTime() {
  seconds = 0;
  clearInterval(intervalTime);
  intervalTime = setInterval(time, 1000);
  random = Math.floor(Math.random() * 6);
  moleSpawn("up");
}

function time() {
  if (seconds > 0) {
    clearInterval(intervalTime);
    timeEnd = true;
    message(`Time is up. Score: ${score}`, "on");
    restart.style.display = "block";
    moleSpawn("down");
  } else {
    seconds++;
  }
}

function message(displayText, on) {
  text.innerHTML = displayText;

  if (on == "on") {
    restart.style.display = "block";
  }
}

var mainMole = document.getElementById("main-mole");
var mainPage = document.getElementById("main-page");

function mainStart(status) {
  mainMole.style.animation = "";
  if (status) {
    mainMole.style.animation = "up .4s forwards";
  } else {
    mainMole.style.animation = "down .4s forwards";
  }
}

var dirts = document.getElementById("dirts");
var gameScore = document.getElementById("game-score");

function startGame() {
  mainPage.style.display = "none";
  dirts.style.display = "flex";
  gameScore.style.display = "block";
}

var optionsDiv = document.getElementById("options");

function options() {
  optionsDiv.style.display = "block";
  mainPage.style.display = "none";
}

var rangeNumber = document.getElementById("range-number");

function moleTime(e) {
  var rangeValue = e.target.value;
  rangeNumber.innerHTML = rangeValue;
  time = rangeValue;
}

function saveOptions() {
  optionsDiv.style.display = "none";
  mainPage.style.display = "block";
}
