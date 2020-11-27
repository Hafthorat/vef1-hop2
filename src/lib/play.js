import { fetchVideos } from '../lib/videos';
import { el, element, formatDate } from '../lib/utils';

/* document.addEventListener('DOMContentLoaded', async () => {
}) */

export function loadVideoPage(data) {

  /**
   * TODO:
   * Vinna rétt með inntakið data
   * Gera ekki aftur fetch
   */

  const videoId = getVideoIdFromUrl();
  const videoUrl = getvideoUrlfromId(data, videoId);
  console.log("video ID: " + videoId);

  const elbody = document.querySelector("body");
  const playdiv = document.createElement("div");
  const controldiv = document.createElement("div");
  const videodiv = document.createElement("div");
  const videoel = document.createElement("video");

  playdiv.classList.add('play__container');
  videodiv.classList.add('video__container');
  controldiv.classList.add('video__controls');
  videoel.classList.add('video__target');

  videoel.setAttribute('src', );

  elbody.appendChild(playdiv);
  playdiv.appendChild(videodiv);
  videodiv.appendChild(videoel);
  playdiv.appendChild(controldiv);

}


function getVideoIdFromUrl(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log('Þetta er video ID frá URL: ' + urlParams.get('id'));
  return urlParams.get('id');
}

function getvideoUrlfromId(data, videoId){
  const videos = data.videos;

  console.log('Þetta er data' + data);
  console.log('Þetta er videos úr data' + videos);

  for (let video of videos) {
    if (parseInt(video.id) === parseInt(id)) { //TODO: staðfesta að if condition virkar
      console.log('Skilagildi úr getVideoUrlfromId() :' + video);
      return video;
    }
  }
}
