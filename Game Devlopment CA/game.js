const gameBody = document.getElementById("game-body");
const chancess = document.getElementById("chances")
var secs = document.getElementById("timer").textContent;
var balloonId = 0;
const img = [
   "end_balloon-removebg-preview.png",
   "balloon 1.png",
   "balloon2.png",
   "balloon3.png",
   "balloon5.png"

];

const expAudio = new Audio(
    "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
  );
  expAudio.volume = 0.2;
  gameBody.onclick = () => {
    expAudio.pause();
    expAudio.currentTime = 0;
    expAudio.play();
  };

  const backgroundSound = new Audio(
    "shinchan_theme_song.mp3"
  );
  backgroundSound.play();
  backgroundSound.loop = true;

const maxchances = 4;
var chances = 4;

function makeBalloon() {
    randomImages = img[getRandomInt(0, img.length)];
    gameBody.innerHTML += `<img src="./assets/${randomImage}" class="balloon-image" id="balloon${balloonId}">`;
    let balloon = document.getElementById("balloon" + balloonId);
    balloon.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
    balloon.style.animationDuration = `${getRandomInt(2, 6)}s`;
    balloon.onclick = () => {
        balloonDestruct(balloon);
    };
}

function checkCollision(balloon) {
    if (balloon.getBoundingClientRect().top <= 0) {
      chances--;
      return true;
    }
    return false;
  }

  function balloonDestruct(balloon) {
    balloon.style.display = "none";
    balloonId++;
    makeBalloon();
  }

  var timer = setInterval(function () {
    secs--;
    document.getElementById("timer").textContent = secs;
    let balloon = document.getElementById("balloon" + balloonId);
    if (checkCollision(balloon) == true) {
      balloonDestruct(balloon);
      if (chances == 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
      }
    }
    if (secs == 0) {
      clearInterval(timer);
      location.href = "./win.html";
    }
  }, 1000);

  makeBalloon(balloonId);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  } 