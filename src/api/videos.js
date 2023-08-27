import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/videos',
  timeout: 1000,
});

function mapVideo(videoResponse) {
  const { id, snippet, statistics } = videoResponse;

  const thumbnail =
    snippet.thumbnails.high?.url ??
    snippet.thumbnails.medium?.url ??
    snippet.thumbnails.default?.url;

  return {
    id,
    thumbnail,
    categoryId: snippet.categoryId,
    publishedAt: snippet.publishedAt,
    title: snippet.title,
    description: snippet.description,
    tags: snippet.tags ?? [],
    channel: {
      id: snippet.channelId,
      title: snippet.channelTitle,
    },
    viewCount: statistics?.viewCount ?? 0,
    likeCount: statistics?.likeCount ?? 0,
    commentCount: statistics?.commentCount ?? 0,
  };
}

export async function getPopularVideos() {
  const response = await instance.get('', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 25,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const { items } = response.data;

  return items.map(mapVideo);
}

export async function getLocalPopularVideos() {
  const response = await fetch('/videos/popular.json');
  const { items } = await response.json();

  return items.map(mapVideo);
}

/**
 * 비디오 상세 정보 조회
 *
 * @param {string} id video id
 * @returns 비디오 상세 정보
 */
export async function getVideo(id) {
  const response = await instance.get('', {
    params: {
      part: 'snippet,statistics',
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      id,
    },
  });

  const { items } = response.data;

  return items.length ? mapVideo(items[0]) : null;
}

export async function getLocalVideo() {
  const response = await fetch('/videos/detail.json');
  const { items } = await response.json();

  console.log('items', items);

  return mapVideo(items[0]);
}

export default {};
