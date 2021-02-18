var text = document.getElementById("text");
var restart = document.getElementById("restart");
var timeEnd = false;
var score = 0;
var timeMoleUp;

if (moleUpTimeStorage == null) {
  timeMoleUp = 4;
} else {
  timeMoleUp = moleUpTimeStorage;
}

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
var option = document.querySelectorAll(".option");

function options(status) {
  if (!status) {
    optionsDiv.style.display = "block";
    mainPage.style.display = "none";
    for (var i = 0; i < 2; i++) {
      optionsIcons[i].style.display = "static";
    }
  } else {
    optionsDiv.style.display = "none";
    mainPage.style.display = "block";
    for (var i = 0; i < 2; i++) {
      option[i].style.display = "none";
    }
  }
}
var moleUpTimeStorage = parseInt(localStorage.getItem("mole-up-time"));
var rangeNumber = document.getElementById("range-number");
var range = document.getElementById("range");

range.value = timeMoleUp;
rangeNumber.innerHTML = timeMoleUp;
timeMoleUp = timeMoleUp;

function moleTime(e) {
  var rangeValue = e.target.value;
  localStorage.setItem("mole-up-time", e.target.value);
  rangeNumber.innerHTML = rangeValue;
  timeMoleUp = rangeValue;
}

var moleSoundStorage = localStorage.getItem("mole-sound");

var sound;

if (moleSoundStorage == "true" || moleSoundStorage == null) {
  sound = true;
} else {
  sound = false;
}

function playAudio(file) {
  if (sound) {
    var audio = new Audio("media/" + file + ".wav");
    audio.className = "audio";
    for (var i = 0; i < audio.length; i++) {
      audio[i].pause();
      audio[i].currentTime = 0;
    }
    if (savedVolume == null) {
      audio.volume = rangeVolume.value;
    } else {
      setInterval(function () {
        audio.volume = parseFloat(localStorage.getItem("mole-game-volume"));
      });
    }
    audio.play();
  }
}

var rangeVolume = document.getElementById("volume");
var changeVolumeText = document.getElementById("change-volume");
var savedVolume = localStorage.getItem("mole-game-volume");

if (savedVolume == null) {
  rangeVolume.value = 1;
  changeVolumeText.innerHTML = Math.floor(rangeVolume.value * 100) + " %";
} else {
  rangeVolume.value = savedVolume;
  changeVolumeText.innerHTML = Math.floor(parseFloat(savedVolume) * 100) + " %";
}

function changeVolume(e) {
  var volume = e.target.value;
  localStorage.setItem("mole-game-volume", volume);
  changeVolumeText.innerHTML = Math.floor(volume * 100) + " %";
}

var soundButtons = document.querySelectorAll(".sound-button");

if (moleSoundStorage == "true" || moleSoundStorage == null) {
  setSoundButtonColor(0);
} else {
  setSoundButtonColor(1);
}

for (let i = 0; i < soundButtons.length; i++) {
  soundButtons[i].addEventListener("click", function () {
    soundButtons.forEach((soundButtons) => {
      soundButtons.style.background = "#ffffff";
      soundButtons.style.color = "#000000";
    });
    if (soundButtons[i].innerHTML == "ON") {
      localStorage.setItem("mole-sound", true);
      sound = true;
    } else {
      localStorage.setItem("mole-sound", false);
      sound = false;
    }
    soundButtons[i].style.background = "#2ecc71";
    soundButtons[i].style.color = "#ffffff";

    return sound;
  });
}

function setSoundButtonColor(num) {
  if (num == 0) {
    soundButtons[num].style.background = "#2ecc71";
    soundButtons[num].style.color = "#ffffff";
    soundButtons[1].style.background = "#ffffff";
    soundButtons[1].style.color = "#000000";
  } else {
    soundButtons[num].style.background = "#2ecc71";
    soundButtons[num].style.color = "#ffffff";
    soundButtons[0].style.background = "#ffffff";
    soundButtons[0].style.color = "#000000";
  }
}

var optionsForMole = document.querySelectorAll(".option");
var optionsIcons = document.querySelectorAll(".option-icon");

function menu(option) {
  for (var i = 0; i < optionsForMole.length; i++) {
    optionsForMole[i].style.display = "none";
  }
  optionsForMole[option].style.display = "block";
}

var skinShop = document.getElementById("skin-shop");
var cards = document.getElementById("skin-cards");

var skins = [
  {
    id: 0,
    name: "Mole",
    price: 0,
    img: "mole",
  },
  {
    id: 1,
    name: "Mole Birthday",
    price: 2000,
    img: "mole-birthday",
  },
];

var userPrice = 2000;
var priceText = document.getElementById("price-text");
priceText.innerHTML = "Price: " + userPrice;

function shop(status) {
  if (!status) {
    mainPage.style.display = "none";
    skinShop.style.display = "block";
    for (var i = 0; i < skins.length; i++) {
      cards.innerHTML += `<div class="card">
      <div class="skin-img">
        <img src="media/mole-skins/${skins[i].img}.png" alt="" />
      </div>
      <div class="skin-details">
        <h4>${skins[i].name}</h4>
        <h5>Price: ${skins[i].price}</h5>
        <button id="${skins[i].id}" onclick="buySkin(${skins[i].id})">Buy</button>
        <button id="${skins[i].id}" style="display: none">Equip</button>
      </div>
    </div>`;
    }
  } else {
    mainPage.style.display = "block";
    skinShop.style.display = "none";
    cards.innerHTML = "";
  }
}

function buySkin(skinId) {
  for (var i = 0; i < skins.length; i++) {
    if (skins[i].id == skinId) {
      if (userPrice >= skins[i].price) {
        var savedObject = {
          id: skins[i].id,
          status: true,
        };
        saveSkins(savedObject);
        document.getElementById(skins[i].id).remove();
        document.getElementById(skins[i].id).style.display = "initial";
        userPrice -= skins[i].price;
        mainMole.src = `media/mole-skins/${skins[i].img}.png`;
        for (var j = 0; j < mole.length; j++) {
          mole[j].src = `media/mole-skins/${skins[i].img}.png`;
        }
      } else {
        console.log(false);
      }
    }
  }
}

function saveSkins(id) {
  var saveSkin = JSON.parse(localStorage.getItem("mole-skins")) || [];
  saveSkin.push(id);
  localStorage.setItem("mole-skins", JSON.stringify(saveSkin));
}
