import { fetchVideos } from './videos';
import { loadVideoPage } from './play';
import { el } from './utils';

function msToTime(curDate, dateCreated) {
  const elapsed = curDate - dateCreated;
  let timi = '';
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  if (hours < 24) {
    if (hours === 1) {
      timi = 'klukkustund';
    } else {
      timi = 'klukkustundum';
    }
    return `Fyrir ${hours} ${timi} síðan`;
  } if (hours / 24 >= 1 && hours / 24 < 7) {
    if (Math.floor(hours / 24) === 1) {
      timi = 'degi';
    } else {
      timi = 'dögum';
    }
    return `Fyrir ${Math.floor(hours / 24)} ${timi} síðan`;
  } if (hours / 24 >= 7 && hours / 24 < 30) {
    if (Math.floor(hours / 24 / 7) === 1) {
      timi = 'viku';
    } else {
      timi = 'vikum';
    }
    return `Fyrir ${Math.floor(hours / 24 / 7)} ${timi} síðan`;
  } if (hours / 24 >= 30 && hours / 24 < 365) {
    if (Math.floor(hours / 24 / 30) === 1) {
      timi = 'mánuði';
    } else {
      timi = 'mánuðum';
    }
    return `Fyrir ${Math.floor(hours / 24 / 30)} ${timi} síðan`;
  }
  if (Math.floor(hours / 24 / 365) === 1) {
    timi = 'ári';
  } else {
    timi = 'árum';
  }
  return `Fyrir ${Math.floor(hours / 24 / 365)} ${timi} síðan`;
}

function sToMinSec(duration) {
  const min = Math.floor(duration / 60);
  let sec = duration - min * 60;
  if (sec.toString().length === 1) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

export default function loadHelper(videos, classVideos, cataDiv) {
  classVideos.forEach((classVideo) => {
    const catDiv = el('div');
    catDiv.classList.add('video-category-inner', 'col', 'col-4', 'col-sm-12');
    cataDiv.appendChild(catDiv);

    const ahref = el('a');

    catDiv.appendChild(ahref);

    if (window.location.href.indexOf('pages') > -1) {
      ahref.setAttribute('href', (`video.html?id=${classVideo}`));
    } else {
      ahref.setAttribute('href', (`pages/video.html?id=${classVideo}`));
    }

    const catVidDiv = el('div');
    catVidDiv.classList.add('video-eachvideo');

    ahref.appendChild(catVidDiv);

    videos.forEach((video) => {
      const { id } = video;

      if (classVideo === id) {
        const imgDiv = el('div');
        imgDiv.classList.add('video-image');
        catVidDiv.appendChild(imgDiv);

        const contDiv = el('div');
        contDiv.classList.add('video-content');
        catVidDiv.appendChild(contDiv);

        const img = el('img');
        img.setAttribute('src', (`.${video.poster.toString()}`));

        imgDiv.appendChild(img);

        const dateCreated = video.created;
        const curDate = new Date().getTime();

        const vidTitle = el('h3', video.title);
        //

        const vidCreated = el('h4', msToTime(curDate, dateCreated).toString());
        contDiv.appendChild(vidTitle);
        contDiv.appendChild(vidCreated);

        const { duration } = video;
        const vidDuration = el('h5', sToMinSec(duration).toString());
        imgDiv.appendChild(vidDuration);
      }
    });
  });
}

function loadVideoList(data) {
  const { videos } = data;
  const { categories } = data;

  const div = document.querySelector('.videos');

  categories.forEach((category) => {
    const { title } = category;
    const catVideos = category.videos;

    const heading = el('h2', title);
    heading.classList.add('category-title');
    div.appendChild(heading);

    const cataDiv = el('div');
    cataDiv.classList.add('video-category-outer', 'row');
    div.appendChild(cataDiv);

    loadHelper(videos, catVideos, cataDiv);

    const catLine = el('hr');
    catLine.classList.add('line');
    div.appendChild(catLine);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchVideos();

  // Fjarlægjum loading skilaboð eftir að við höfum sótt gögn
  const loading = document.querySelector('.loading');
  const parent = loading.parentNode;
  parent.removeChild(loading);

  // Checkað hvort að gögn hafi skilað sér, býr til skilaboð til notenda ef það klikkar
  if (!data) {
    parent.appendChild(
      el('p', 'Villa við að sækja gögn'),
    );
  }

  const currentPage = document.querySelector('body');

  if (currentPage.classList.contains('video-page')) {
    loadVideoPage(data);
  }

  if (currentPage.classList.contains('video-index')) {
    loadVideoList(data);
  }
});
