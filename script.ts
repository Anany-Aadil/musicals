console.log("This is Musical");

var songIndex = 0;
const mainPlay = document.getElementById("mainPlay");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const mainProgressBar = <HTMLInputElement>document.getElementById("mainProgressBar");
const gif1 = document.getElementById("gif1");
const gif2 = document.getElementById("gif2");
const songItemPlaying = Array.from(
  document.getElementsByClassName("songItemPlay")
);
const songItemName = Array.from(document.getElementsByClassName("songItem"));
const mainSong1 = document.getElementById("mainSongPlaying1");
const mainSong2 = document.getElementById("mainSongPlaying2");
const volBar = <HTMLInputElement>document.getElementById("volumeBar");
const volBtn = document.getElementById("vol");
const loopBtn = document.getElementById("loop");
const loopChk = document.getElementById("checkMark");

const songPath = "public/songs/";
const songCoverPath = "public/covers/";

const songs = [
  {
    songName: "Believer - Imagine Dragons",
    filePath: `${songPath}1.mp3`,
    coverPath: `${songCoverPath}believer.jpg`,
  },
  {
    songName: "Believer - Cover By Tommee Profitt",
    filePath: `${songPath}2.mp3`,
    coverPath: `${songCoverPath}believer-tp.jpg`,
  },
  {
    songName: "Dream - Road Trip (Remix)",
    filePath: `${songPath}3.mp3`,
    coverPath: `${songCoverPath}dreamroadtrip.jpg`,
  },
  {
    songName: "Unstoppable - TheScore",
    filePath: `${songPath}4.mp3`,
    coverPath: `${songCoverPath}unstoppable.jpg`,
  },
  {
    songName: "Stronger - TheScore",
    filePath: `${songPath}5.mp3`,
    coverPath: `${songCoverPath}stronger.jpg`,
  },
  {
    songName: "SpiderMan - Sam Raimi Theme",
    filePath: `${songPath}6.mp3`,
    coverPath: `${songCoverPath}spider-man.jpg`,
  },
  {
    songName: "Warriors - Imagine Dragons",
    filePath: `${songPath}7.mp3`,
    coverPath: `${songCoverPath}warriors2016.jpg`,
  },
  {
    songName: "Warriors - 2WEI Cover",
    filePath: `${songPath}8.mp3`,
    coverPath: `${songCoverPath}warriors2wei.jpg`,
  },
];
const audioElement = new Audio(songs[songIndex].filePath);

mainPlay.addEventListener("click", playBtn);

nextBtn.addEventListener("click", nextSong);

previousBtn.addEventListener("click", previousSong);

volBar.addEventListener("change", volChange);

loopBtn.addEventListener("click", loopVid);

songItemPlaying.forEach((element) => {
  element.addEventListener("click", makePlay);
});

songItemName.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("jSName")[0].innerHTML = songs[i].songName;
});

audioElement.addEventListener("timeupdate", () => {
  var progress = (audioElement.currentTime / audioElement.duration) * 1000;

  mainProgressBar.value = progress;
  if (mainProgressBar.value == '1000' && loopChk.style.opacity == '1') {
    mainProgressBar.value = '0';
    playBtn();
  } else if (mainProgressBar.value == '1000') {
    nextSong();
  }
  
});

mainProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (mainProgressBar.value * audioElement.duration) / 1000;
});

// ========================All Functions======================||>

function playBtn() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    songPlayText();
  } else {
    audioElement.pause();
    mainPlay.classList.remove("fa-pause-circle");
    mainPlay.classList.add("fa-play-circle");
    gif1.style.opacity = "0";
    gif2.style.opacity = "0";
  }
}

function volChange() {
  audioElement.volume = volBar.value / 100;
  if (volBar.value < 50) {
    volBtn.classList.remove("fa-volume-up");
    volBtn.classList.add("fa-volume-down");
  } else {
    volBtn.classList.remove("fa-volume-down");
    volBtn.classList.add("fa-volume-up");
  }
}

function previousSong() {
  if (songIndex <= 0) {
    songIndex = 7;
  } else {
    songIndex -= 1;
  }
  manyThings();
}

function nextSong() {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  manyThings();
}

function makePlay(e) {
  makeAllPlays();
  songIndex = parseInt(e.target.id);
  e.target.classList.remove("fa-play-circle");
  e.target.classList.add("fa-pause-circle");
  gif1.style.opacity = "1";
  gif2.style.opacity = "1";
  manyThings();
}

function loopVid() {
  if (loopChk.style.opacity == "0") {
    loopChk.style.opacity = "1";
  } else {
    loopChk.style.opacity = "0";
  }
}

const manyThings = () => {
  audioElement.src = `${songPath}${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayText();
};

const makeAllPlays = () => {
  songItemPlaying.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    gif1.style.opacity = "0";
    gif2.style.opacity = "0";
  });
};

const songPlayText = () => {
  mainSong1.innerText = songs[songIndex].songName;
  mainSong2.innerText = songs[songIndex].songName;
  gif1.style.opacity = "1";
  gif2.style.opacity = "1";
  mainPlay.classList.remove("fa-play-circle");
  mainPlay.classList.add("fa-pause-circle");
};