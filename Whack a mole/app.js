var text = document.getElementById("text");
var restart = document.getElementById("restart");
var timeEnd = false;
var score = 0;
var timeMoleUp = 4;

var random = Math.floor(Math.random() * 6);

function moleSpawn(move) {
  var moleId = document.getElementById(random);
  if (move == "up") {
    moleId.style.animation = `up .${timeMoleUp}s forwards`;
    playAudio("mole-up");
  } else {
    moleId.style.animation = `down .${timeMoleUp}s forwards`;
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
      playAudio("bonk");
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

function options(status) {
  if (!status) {
    optionsDiv.style.display = "block";
    mainPage.style.display = "none";
  } else {
    optionsDiv.style.display = "none";
    mainPage.style.display = "block";
  }
}

var rangeNumber = document.getElementById("range-number");

function moleTime(e) {
  var rangeValue = e.target.value;
  rangeNumber.innerHTML = rangeValue;
  timeMoleUp = rangeValue;
}

function playAudio(file) {
  var audio = new Audio("media/" + file + ".wav");
  audio.className = "audio";

  for (var i = 0; i < audio.length; i++) {
    audio[i].pause();
    audio[i].currentTime = 0;
  }

  audio.play();
}
