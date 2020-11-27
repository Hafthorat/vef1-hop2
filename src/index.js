import { fetchVideos } from './lib/videos';
import { el, element, formatDate } from './lib/utils';

function msToTime(curDate, dateCreated) {
  var elapsed = curDate - dateCreated;
  var hours = Math.floor(elapsed / (1000 * 60 * 60));
  if (hours < 24) {
    return "Fyrir " + hours + " klukkustundum síðan";
  } else if (hours/24 >= 1 && hours/24 < 7) {
    return "Fyrir " + Math.floor(hours/24) + " dögum síðan";
  } else if (hours/24 >= 7 && hours/24 < 30) {
    return "Fyrir " + Math.floor(hours/24/7) + " vikum síðan";
  } else if (hours/24 >= 30 && hours/24 < 365) {
    return "Fyrir " + Math.floor(hours/24/30) + " mánuðum síðan";
  } else {
    return "Fyrir " + Math.floor(hours/24/365) + " árum síðan";
  }
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
          console.log(msToTime(curDate, dateCreated).toString());
          contDiv.appendChild(vidTitle);
          contDiv.appendChild(vidCreated);

        }

      })

    })

  })

});
