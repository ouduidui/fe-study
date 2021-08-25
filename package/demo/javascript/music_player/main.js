// 获取节点
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// 歌曲名称
const songs = ["hey", "summer", "ukulele"];

// 创建下标追踪歌曲
let songIndex = 2;

// 初始化页面时加载歌曲到DOM节点中
loadsong(songs[songIndex]);

// loadsong函数
function loadsong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//  playSong
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

// pauseSong
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}

// prevSong
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadsong(songs[songIndex]);
    playSong();
}

// nextSong
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadsong(songs[songIndex]);
    playSong();
}

// 设置updateProgress
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// 设置setProgress
function setProgress(e) {
    const width = this.clientWidth;
    //   console.log(width);
    const clickX = e.offsetX;
    //   console.log(clickX);
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// 事件监听
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// 切换歌曲
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// 更新进度条
audio.addEventListener("timeupdate", updateProgress);

// 点击进度条容器，更新歌曲播放
progressContainer.addEventListener("click", setProgress);

// 播放结束自动切换
audio.addEventListener("ended", nextSong);
