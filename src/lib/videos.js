// const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
const URL = '../videos.json';

export async function fetchVideos() {
  // Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  let result;

  try {
    result = await fetch(URL);
  } catch (e) {
    console.error('Villa við að sækja', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }

  const data = await result.json();

  return data;
}
