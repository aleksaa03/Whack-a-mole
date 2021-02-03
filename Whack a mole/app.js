var text = document.getElementById("text");
var restart = document.getElementById("restart");
var timeEnd = false;
var score = 0;

var random = Math.floor(Math.random() * 6);

function moleSpawn(move) {
  var moleId = document.getElementById(random);
  if (move == "up") {
    moleId.style.animation = "up .5s forwards";
  } else {
    moleId.style.animation = "down .5s forwards";
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
  if (seconds > 1) {
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

function restartGame() {
  location.reload();
}
