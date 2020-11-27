import { fetchVideos } from './lib/videos';
import { loadVideoPage } from './lib/play';
import { el, element, formatDate } from './lib/utils';

function msToTime(curDate, dateCreated) {
  var elapsed = curDate - dateCreated;
  var timi = "";
  var hours = Math.floor(elapsed / (1000 * 60 * 60));
  if (hours < 24) {
    if (hours === 1) {
      timi = "klukkustund";
    } else {
      timi = "klukkustundum";
    }
    return "Fyrir " + hours + " " + timi + " síðan";
  } else if (hours/24 >= 1 && hours/24 < 7) {
    if (Math.floor(hours/24) === 1) {
      timi = "degi";
    } else {
      timi = "dögum";
    }
    return "Fyrir " + Math.floor(hours/24) + " " + timi + " síðan";
  } else if (hours/24 >= 7 && hours/24 < 30) {
    if (Math.floor(hours/24/7) === 1) {
      timi = "viku";
    } else {
      timi = "vikum";
    }
    return "Fyrir " + Math.floor(hours/24/7) + " " + timi + " síðan";
  } else if (hours/24 >= 30 && hours/24 < 365) {
    if (Math.floor(hours/24/30) === 1) {
      timi = "mánuði";
    } else {
      timi = "mánuðum";
    }
    return "Fyrir " + Math.floor(hours/24/30) + " " + timi + " síðan";
  } else {
    if (Math.floor(hours/24/365) === 1) {
      timi = "ári";
    } else {
      timi = "árum";
    }
    return "Fyrir " + Math.floor(hours/24/365) + " " + timi + " síðan";
  }
}

function sToMinSec(duration) {
  var min = Math.floor(duration/60);
  var sec = duration-min*60;
  if (sec.toString().length == 1) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}

document.addEventListener('DOMContentLoaded', async () => {

  const data = await fetchVideos();

  // Fjarlægjum loading skilaboð eftir að við höfum sótt gögn
  const loading = document.querySelector('.loading');
  const parent = loading.parentNode;
  parent.removeChild(loading);

  // Óþarfi?
  if (!data) {
    parent.appendChild(
      el('p', 'Villa við að sækja gögn')
    );
  }

  const currentPage = document.querySelector('body');

  if (currentPage.classList.contains('video__page')){
    console.log('Þetta er video page, til hammó');
    loadVideoPage(data);
  }

  if (currentPage.classList.contains('video__page')) {
    console.log('Þetta er index.html, tal hammó');
    loadVideoList(data);
  }



  function loadVideoList(data) {
    console.log(data);
    // console.log(data);

    const videos = data.videos;
    const categories = data.categories;

    console.log(videos);
    console.log(categories);

    const div = document.querySelector('.videos');

    categories.forEach((category) => {

      const title = category.title;
      const catVideos = category.videos;

      const catDiv = el('div');
      catDiv.classList.add('video__category');
      div.appendChild(catDiv);

      const heading = el('h2', title);
      heading.classList.add('category__title');
      catDiv.appendChild(heading);

      catVideos.forEach((catVideo) => {

        const catVidDiv = el('div');
        catVidDiv.classList.add('video__eachvideo');
        catDiv.appendChild(catVidDiv);

        videos.forEach((video) => {

          const id = video.id;

          if (catVideo === id) {

            const imgDiv = el('div');
            imgDiv.classList.add('video__image');
            catVidDiv.appendChild(imgDiv);

            const contDiv = el('div');
            contDiv.classList.add('video__content');
            catVidDiv.appendChild(contDiv);

            const img = el('img');
            img.setAttribute('src', video.poster);
            imgDiv.appendChild(img);

            const dateCreated = video.created;
            const curDate = new Date().getTime();

            const vidTitle = el('h3', video.title);
            const vidCreated = el('h4', msToTime(curDate, dateCreated).toString());
            //console.log(msToTime(curDate, dateCreated).toString());
            contDiv.appendChild(vidTitle);
            contDiv.appendChild(vidCreated);

            const duration = video.duration;
            const vidDuration = el('h5', sToMinSec(duration).toString());
            contDiv.appendChild(vidDuration);

          }

        })

      })

    })
  }

});

