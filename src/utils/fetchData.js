export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  params: { limit: '10' },
  headers: {
    'X-RapidAPI-Key': '29b0dc7c63msh3f62d2ac8e8db0fp17a9f7jsn402d2a1e3fb3',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  url: 'https://youtube-search-and-download.p.rapidapi.com/channel/about',
  params: {
    id: 'UCE_M8A5yxnLfW0KghEeajjw',
  },
  headers: {
    'X-RapidAPI-Key': '29b0dc7c63msh3f62d2ac8e8db0fp17a9f7jsn402d2a1e3fb3',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

export async function fetchData(url, options, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) { // Check if it's a rate limit issue and retries are left
        await new Promise((resolve) => { setTimeout(resolve, backoff); });
        // Wait for the backoff period
        return fetchData(url, options, retries - 1, backoff * 2); // Retry with increased backoff
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error('Failed to fetch data: ', e.message);
    throw e; // Rethrow the error after logging or handle it as needed
  }
}
