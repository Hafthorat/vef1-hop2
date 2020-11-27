const currVideo = document.getElementById('currVideo');
const btnPlayPause = document.getElementById('btnPlayPause');
const btnMuteUnmute = document.getElementById('btnMuteUnmute');
const btnFullscreen = document.getElementById('btnFullscreen');
const btnBack3sec = document.getElementById('btnBack3sec');
const btnForward3sec = document.getElementById('btnForward3sec');
//let timer = null;

btnPlayPause.addEventListener('click', playPause);
btnMuteUnmute.addEventListener('click', muteUnmute);
btnFullscreen.addEventListener('click', openFullscreen);
btnBack3sec.addEventListener('click', back3Sec);
btnForward3sec.addEventListener('click', forward3Sec);

function playPause() {
  if (currVideo.paused)
      currVideo.play();
  else
      currVideo.pause();
}

function muteUnmute(){
  if(currVideo.muted){
    currVideo.muted = false;
  }
  else{
    currVideo.muted = true;
  }

}

function openFullscreen(){
  currVideo.requestFullscreen();
}

function back3Sec(event){
  let vid_currenttime = currVideo.currentTime;
  if(vid_currenttime == 0){
    currVideo.currentTime = 0;
  }
  else{
    currVideo.currentTime = vid_currenttime - 3;
  }
}

function forward3Sec(event){
  let vid_currenttime = currVideo.currentTime;
  let vid_length = currVideo.duration;
  if(vid_currenttime == vid_length){
    currVideo.currentTime = vid_length;
  }
  else{
    currVideo.currentTime = vid_currenttime + 3;
  }
}

/**
function update(){
  timeOut.innerHTML = "Time: " + myTime(currVideo.currentTime) + "/" + myTime(currVideo.duration);
}
*/

