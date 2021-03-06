import { el } from './utils';
import { loadHelper } from './index';

export function loadVideoPage(data) {
  const videoId = getVideoIdFromUrl();
  const videoForPlayback = getVideoFromId(data, videoId);
  const elbody = document.querySelector('body');

  // Búum til element fyrir upplýsingar um video
  const videoTitleContainer = document.createElement('header');
  const videoTitle = document.createElement('h1');
  const videoDescContainer = document.createElement('div');
  const videoDesc = document.createElement('p');

  videoTitle.innerHTML = videoForPlayback.title.toString();
  videoDesc.innerHTML = videoForPlayback.description.toString();

  // Búum til element
  const container = document.createElement('div');
  const grid = document.createElement('div');
  const row = document.createElement('div');
  const col = document.createElement('div');
  const video = document.createElement('div');
  const currVideo = document.createElement('video');
  const source = document.createElement('source');
  const imidju = document.createElement('div');
  const overlay = document.createElement('img');
  const playButtonsContainer = document.createElement('div');
  const footer = document.createElement('footer');
  const afooter = document.createElement('a');

  // Setjum attribute og id á element
  container.id = 'container';
  grid.classList.add('grid');
  row.classList.add('row');
  col.classList.add('col', 'col-12');
  video.classList.add('video');
  currVideo.id = 'curr-video';
  source.setAttribute('src', (`.${videoForPlayback.video.toString()}`));
  imidju.classList.add('imidju');
  overlay.id = 'overlay';
  overlay.classList.add('overlay');
  overlay.setAttribute('src', '../img/play.svg');
  overlay.setAttribute('alt', 'play');
  playButtonsContainer.setAttribute('alt', 'playorpause');
  afooter.setAttribute('href', '../');
  footer.innerHTML = 'Til baka';
  footer.classList.add('footer-bar');

  // Búum til button element
  const btnBack3sec = document.createElement('img');
  const btnPause = document.createElement('img');
  const btnPlay = document.createElement('img');
  const btnMute = document.createElement('img');
  const btnUnmute = document.createElement('img');
  const btnFullscreen = document.createElement('img');
  const btnForward3sec = document.createElement('img');

  // Setjum id á buttons
  btnBack3sec.id = 'btnBack3sec';
  btnPause.id = 'btnPause';
  btnPlay.id = 'btnPlay';
  btnMute.id = 'btnMute';
  btnUnmute.id = 'btnUnmute';
  btnFullscreen.id = 'btnFullscreen';
  btnForward3sec.id = 'btnForward3sec';

  // Setjum class á buttons
  btnBack3sec.classList.add('Backclass-button-visable', 'videoimg');
  btnPlay.classList.add('playclass-button-visable', 'videoimg');
  btnPause.classList.add('pauseclass-button', 'videoimg');
  btnMute.classList.add('muteclass-button-visable', 'videoimg');
  btnUnmute.classList.add('unmuteclass-button', 'videoimg');
  btnFullscreen.classList.add('Fullscreenclass-button', 'videoimg');
  btnForward3sec.classList.add('Forwardclass-button-visable', 'videoimg');

  // Setjum src attributes á buttons
  btnBack3sec.setAttribute('src', ('../img/back.svg'));
  btnPlay.setAttribute('src', ('../img/play.svg'));
  btnPause.setAttribute('src', ('../img/pause.svg'));
  btnMute.setAttribute('src', ('../img/mute.svg'));
  btnUnmute.setAttribute('src', ('../img/unmute.svg'));
  btnFullscreen.setAttribute('src', ('../img/fullscreen.svg'));
  btnForward3sec.setAttribute('src', ('../img/next.svg'));

  // Setjum alt attributes á buttons
  btnBack3sec.setAttribute('alt', 'backwards 3 seconds');
  btnPlay.setAttribute('alt', 'play');
  btnPause.setAttribute('alt', 'pause');
  btnMute.setAttribute('alt', 'pause');
  btnUnmute.setAttribute('alt', 'mute');
  btnFullscreen.setAttribute('alt', 'fullscreen');
  btnForward3sec.setAttribute('alt', 'forward 3 seconds');

  // Setjum class og id á element
  playButtonsContainer.classList.add('play-buttons');
  playButtonsContainer.id = 'play-buttons';

  // Setjum viðeigandi element sem börn á element
  elbody.appendChild(videoTitleContainer);
  videoTitleContainer.appendChild(videoTitle);

  elbody.appendChild(container);
  container.appendChild(grid);
  grid.appendChild(row);
  row.appendChild(col);
  col.appendChild(video);
  video.appendChild(currVideo);
  currVideo.appendChild(source);
  video.appendChild(imidju);
  imidju.appendChild(overlay);
  container.appendChild(playButtonsContainer);
  playButtonsContainer.appendChild(btnBack3sec);
  playButtonsContainer.appendChild(btnPause);
  playButtonsContainer.appendChild(btnPlay);
  playButtonsContainer.appendChild(btnMute);
  playButtonsContainer.appendChild(btnUnmute);
  playButtonsContainer.appendChild(btnFullscreen);
  playButtonsContainer.appendChild(btnForward3sec);
  container.appendChild(videoDescContainer);
  videoDescContainer.appendChild(videoDesc);

  // Sendum gögn af videos og fylki af related videos í fall sem birtir þau
  loadRelatedVideoThumbnails(data, videoId);

  const footerLine = el('hr');
  footerLine.classList.add('line');
  elbody.appendChild(footerLine);

  afooter.appendChild(footer);
  elbody.appendChild(afooter);

  const currVideoel = document.getElementById('curr-video');
  const btnPlayPauseel = document.getElementById('btnPlay');
  const btnPausePauseel = document.getElementById('btnPause');
  const btnMutemuteel = document.getElementById('btnMute');
  const btnMuteUnmuteel = document.getElementById('btnUnmute');

  const btnFullscreenel = document.getElementById('btnFullscreen');
  const btnBack3secel = document.getElementById('btnBack3sec');
  const btnForward3secel = document.getElementById('btnForward3sec');
  const overlayel = document.getElementById('overlay');

  btnMutemuteel.addEventListener('click', muteUnmute);
  btnMuteUnmuteel.addEventListener('click', muteUnmute);

  btnFullscreenel.addEventListener('click', openFullscreen);
  btnBack3secel.addEventListener('click', back3Sec);
  btnForward3secel.addEventListener('click', forward3Sec);

  [btnPlayPauseel, btnPausePauseel, currVideoel, overlayel].forEach((el) => {
    el.addEventListener('click', () => {
      if (currVideoel.paused) {
        currVideoel.play();
        overlayel.classList.remove('overlay');
        overlayel.classList.add('overlay-hidden');
        btnPlayPauseel.classList.remove('playclass-button-visable');
        btnPlayPauseel.classList.add('playclass-button');
        btnPausePauseel.classList.add('pauseclass-button-visable');
        btnPausePauseel.classList.remove('pauseclass-button');
      } else {
        currVideoel.pause();
        overlayel.classList.remove('overlay-hidden');
        overlayel.classList.add('overlay');
        btnPlayPauseel.classList.add('playclass-button-visable');
        btnPlayPauseel.classList.remove('playclass-button');
        btnPausePauseel.classList.remove('pauseclass-button-visable');
        btnPausePauseel.classList.add('pauseclass-button');
      }
    });
  });

  function muteUnmute() {
    if (currVideoel.muted) {
      currVideoel.muted = false;
      btnMutemuteel.classList.add('muteclass-button-visable');
      btnMutemuteel.classList.remove('muteclass-button');
      btnMuteUnmuteel.classList.remove('unmuteclass-button-visable');
      btnMuteUnmuteel.classList.add('unmuteclass-button');
    } else {
      currVideoel.muted = true;
      btnMutemuteel.classList.remove('muteclass-button-visable');
      btnMutemuteel.classList.add('muteclass-button');
      btnMuteUnmuteel.classList.add('unmuteclass-button-visable');
      btnMuteUnmuteel.classList.remove('unmuteclass-button');
    }
  }

  function openFullscreen() {
    if (currVideoel.requestFullscreen) {
      currVideoel.requestFullscreen();
    } else if (currVideoel.mozRequestFullscreen) {
      currVideoel.mozRequestFullscreen();
    } else if (currVideoel.webkitRequestFullscreen) {
      currVideoel.webkitRequestFullscreen();
    } else if (currVideoel.msRequestFullscreen) {
      currVideoel.msRequestFullscreen();
    }
  }

  function back3Sec(event) {
    const vid_currenttime = currVideoel.currentTime;
    if (vid_currenttime == 0) {
      currVideoel.currentTime = 0;
    } else {
      currVideoel.currentTime = vid_currenttime - 3;
    }
  }

  function forward3Sec(event) {
    const vid_currenttime = currVideoel.currentTime;
    const vid_length = currVideoel.duration;
    if (vid_currenttime == vid_length) {
      currVideoel.currentTime = vid_length;
    } else {
      currVideoel.currentTime = vid_currenttime + 3;
    }
  }
}

function getVideoIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

function getVideoFromId(data, videoId) {
  const { videos } = data;
  for (const video of videos) {
    if (video.id == videoId) { /* eslint-disable-line */ // Viljandi haft == en ekki === svo að JS casti types
      console.log('Þetta er video sem á að spila: ');
      console.log(video);
      return video;
    }
  }
}

function loadRelatedVideoThumbnails(data, videoId) {
  const { videos } = data;

  videos.forEach((video) => {
    if (video.id == videoId) {
      const { related } = video;

      console.log(related);

      const body = document.querySelector('.video-page');

      const div = el('div');
      div.classList.add('videos');
      body.appendChild(div);

      const title = el('h2', 'Tengd myndbönd');
      div.appendChild(title);

      const cataDiv = el('div');
      cataDiv.classList.add('video-category-outer', 'row');
      div.appendChild(cataDiv);

      loadHelper(videos, related, cataDiv);
    }
  });
}
