import { fetchVideos } from './lib/videos';
import { loadVideoPage } from './lib/play';
import { el, element, formatDate } from './lib/utils';
//import List from './lib/list';
//import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', async () => {

  const data = await fetchVideos();

  // Fjarlægjum loading skilaboð eftir að við höfum sótt gögn
  const loading = document.querySelector('.loading');
  const parent = loading.parentNode;
  parent.removeChild(loading);

  //kannski óþarfi?
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


  /**
   * Hér þarf að setja neðangreindan kóða í sitt eigið fall sem
   * kallað er á þegar 'DOMContentLoaded' virkjast ef page er
   * index síða
   *
   * Kata gerði kóðann hér fyrir neðan.
   */




  console.log(data);

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



    })

  })

  /*earthquakes.forEach((quake) => {

    const { title, mag, time, url } = quake.properties;

    const link = element('a', { href: url, target: '_blank' }, null, 'Skoða nánar');

    const markerContent =
      el('div',
        el('h3', title),
        el('p', formatDate(time)),
        el('p', link)
      );
    const marker = createPopup(quake.geometry, markerContent.outerHTML);

    const onClick = () => {
      marker.openPopup()
    };

    const li = el('li');

    li.appendChild(
      el('div',
        el('h2', title),
        el('dl',
          el('dt', 'Tími'),
          el('dd', formatDate(time)),
          el('dt', 'Styrkur'),
          el('dd', `${mag} á richter`),
          el('dt', 'Nánar'),
          el('dd', url.toString()),
        ),
        element('div', { 'class': 'buttons' }, null,
          element('button', null, { 'click': onClick }, 'Sjá á korti'),
          link,
        ),
      ),
    );

    ul.appendChild(li);
  });*/

  /*const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
  }*/

});
