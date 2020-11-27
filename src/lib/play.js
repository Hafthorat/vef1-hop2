import {
  el,
  element,
  formatDate
} from './utils';
import {
  loadHelper
} from './index';

/**
 * TODO:
 * Gera fall sem checkar hvort það hafi tekist að ná í id frá
 *  URL í getVideoFromUrl(), mögulega bara setja try catch í getVideoFromUrl()
 */

export function loadVideoPage(data) {

  const videoId = getVideoIdFromUrl();
  const videoForPlayback = getVideoFromId(data, videoId);
  const elbody = document.querySelector("body");

  // Búum til elements
  const playdiv = document.createElement("div");
  const playButtons = document.createElement("div");
  const videodiv = document.createElement("div");
  const videoPlayer = document.createElement("video");
  const videoh1 = document.createElement("h2");
  const videoDesc = document.createElement("p");

  // Búum til button element
  const btnBack3sec = document.createElement("button");
  const btnPlayPause = document.createElement("button");
  const btnMuteUnmute = document.createElement("button");
  const btnFullscreen = document.createElement("button");
  const btnForward3sec = document.createElement("button");

  // Setjum id á buttons

  btnBack3sec.id = "btnBack3sec";
  btnPlayPause.id = "btnPlayPause";
  btnMuteUnmute.id = "btnMuteUnmute";
  btnFullscreen.id = "btnFullscreen";
  btnForward3sec.id = "btnForward3sec";

  // Setjum class á element
  playdiv.classList.add('play__container');
  videodiv.classList.add('video__container');
  playButtons.classList.add('playButtons');
  videoPlayer.classList.add('video__target');
  videoh1.classList.add('video__title');
  videoDesc.classList.add('video__description');

  // Setjum viðeigandi attributes á element
  videoh1.innerHTML = videoForPlayback.title.toString();
  videoDesc.innerHTML = videoForPlayback.description.toString();
  videoPlayer.setAttribute('src', ( '.' + videoForPlayback.video.toString()))

  // Setjum element undir foreldri
  elbody.appendChild(playdiv);
  playdiv.appendChild(videoh1);
  playdiv.appendChild(videodiv);
  videodiv.appendChild(videoPlayer);
  playdiv.appendChild(playButtons);
  playButtons.appendChild(btnBack3sec);
  playButtons.appendChild(btnPlayPause);
  playButtons.appendChild(btnMuteUnmute);
  playButtons.appendChild(btnFullscreen);
  playButtons.appendChild(btnForward3sec);
  playdiv.appendChild(videoDesc);

  // Sendum gögn af videos og fylki af related videos í fall sem birtir þau
  loadRelatedVideoThumbnails(data, videoId);

}

function getVideoIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

function getVideoFromId(data, videoId) {
  const videos = data.videos;
  for (let video of videos) {
    if (video.id == videoId) { //Viljandi haft == en ekki === svo að JS casti types
      console.log('Þetta er video sem á að spila: ');
      console.log(video);
      return video;
    }
  }
}

function loadRelatedVideoThumbnails(data, videoId) {

  const videos = data.videos;

  videos.forEach((video) => {
    if (video.id == videoId) {

      const related = video.related;

      console.log(related);

      const body = document.querySelector('.video__page');

      const div = el('div');
      div.classList.add('videos');
      body.appendChild(div);

      const title = el('h2', 'Tengd myndbönd');
      div.appendChild(title);

      /*const catDiv = el('div');
      catDiv.classList.add('video__category');
      div.appendChild(catDiv);*/

      const cataDiv = el('div');
      cataDiv.classList.add('video__category__outer' , 'row');
      div.appendChild(cataDiv);

      loadHelper(videos, related, cataDiv);

    }
  })

}
