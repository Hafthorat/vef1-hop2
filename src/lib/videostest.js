

const currVideo = document.getElementById('currVideo');
const btnPlayPause = document.getElementById('btnPlay');
const btnPausePause = document.getElementById('btnPause');
const btnMutemute = document.getElementById('btnMute');
const btnMuteUnmute = document.getElementById('btnUnmute');

const btnFullscreen = document.getElementById('btnFullscreen');
const btnBack3sec = document.getElementById('btnBack3sec');
const btnForward3sec = document.getElementById('btnForward3sec');
const overlay = document.getElementById('overlay');



//btnPlayPause.addEventListener('click', playPause);
//btnPausePause.addEventListener('click', playPause);
//overlay.addEventListener('click', playPause);
btnMutemute.addEventListener('click', muteUnmute);
btnMuteUnmute.addEventListener('click', muteUnmute);

btnFullscreen.addEventListener('click', openFullscreen);
btnBack3sec.addEventListener('click', back3Sec);
btnForward3sec.addEventListener('click', forward3Sec);



[btnPlayPause, btnPausePause, currVideo].forEach((el) => {
  el.addEventListener('click', () => {
    if (currVideo.paused) {
      currVideo.play();
      overlay.classList.remove('overlay');
      overlay.classList.add('overlay-hidden');
      btnPlayPause.classList.remove('Playclass-button-visable');
    btnPlayPause.classList.add('Playclass-button');
    btnPausePause.classList.add('Pauseclass-button-visable');
    btnPausePause.classList.remove('Pauseclass-button');
      
     
    } else {
      currVideo.pause();
      overlay.classList.remove('overlay-hidden');
      overlay.classList.add('overlay');
      btnPlayPause.classList.add('Playclass-button-visable');
      btnPlayPause.classList.remove('Playclass-button');
      btnPausePause.classList.remove('Pauseclass-button-visable');
      btnPausePause.classList.add('Pauseclass-button');
    }
  })
})



function muteUnmute() {
  if (currVideo.muted) {
    currVideo.muted = false;
    btnMutemute.classList.add('Muteclass-button-visable');
    btnMutemute.classList.remove('Muteclass-button');
    btnMuteUnmute.classList.remove('unmuteclass-button-visable');
    btnMuteUnmute.classList.add('unmuteclass-button');
  }
  else {
    currVideo.muted = true;
    btnMutemute.classList.remove('Muteclass-button-visable');
    btnMutemute.classList.add('Muteclass-button');
    btnMuteUnmute.classList.add('unmuteclass-button-visable');
    btnMuteUnmute.classList.remove('unmuteclass-button');
  }

}

function openFullscreen() {

  if (currVideo.requestFullscreen) {
    currVideo.requestFullscreen();
  }
  else if (currVideo.mozRequestFullscreen) {

    currVideo.mozRequestFullscreen();
  }
  else if (currVideo.webkitRequestFullscreen) {
    currVideo.webkitRequestFullscreen();
  }
  else if (currVideo.msRequestFullscreen) {
    currVideo.msRequestFullscreen();
  }
}

function back3Sec(event) {
  let vid_currenttime = currVideo.currentTime;
  if (vid_currenttime == 0) {
    currVideo.currentTime = 0;
  }
  else {
    currVideo.currentTime = vid_currenttime - 3;
  }
}

function forward3Sec(event) {
  let vid_currenttime = currVideo.currentTime;
  let vid_length = currVideo.duration;
  if (vid_currenttime == vid_length) {
    currVideo.currentTime = vid_length;
  }
  else {
    currVideo.currentTime = vid_currenttime + 3;
  }
}

/**
function update(){
  timeOut.innerHTML = "Time: " + myTime(currVideo.currentTime) + "/" + myTime(currVideo.duration);
}
*/

