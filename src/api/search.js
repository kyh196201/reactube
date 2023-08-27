import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/search',
  timeout: 1000,
});

function mapSearchedVideo(videoResponse) {
  const { id, snippet } = videoResponse;

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
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
  };
}

/**
 * 채널에 속한 비디오 목록을 조회합니다
 *
 * @param {*} param0
 * @returns
 */
export async function getChannelVideos({ channelId, size = 10 }) {
  const response = await instance.get('', {
    params: {
      channelId,
      maxResults: size,
      part: 'snippet',
      type: 'video',
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const { items } = response.data;

  return items.map(mapSearchedVideo);
}

// eslint-disable-next-line no-unused-vars
export async function getLocalChannelVideos({ channelId, size = 10 }) {
  const response = await fetch('/videos/channel-videos.json');
  const { items } = await response.json();

  return items.map(mapSearchedVideo);
}

export default {};
