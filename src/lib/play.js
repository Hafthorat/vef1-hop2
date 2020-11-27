import { fetchVideos } from '../lib/videos';
import { el, element, formatDate } from '../lib/utils';

document.addEventListener('DOMContentLoaded', async () => {

  const videoId = getVideoIdFromUrl();
  const videoUrl = getvideoUrlfromId(videoId);
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

  videoel.setAttribute('src', )

  elbody.appendChild(playdiv);
  playdiv.appendChild(videodiv);
  videodiv.appendChild(videoel);
  playdiv.appendChild(controldiv);

})

function getVideoIdFromUrl(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('id'));
  return urlParams.get('id');
}


function getvideoUrlfromId(videoId){
  const data = fetchVideos();
  const videos = data.videos;

  console.log(data);
  console.log(videos);

  for (let video of videos ) {
    if (parseInt(video.id) === parseInt(id)) {
      console.log("jayy þetta virkjaðitst");


    }
  }




}
