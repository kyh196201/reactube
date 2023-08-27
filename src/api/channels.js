import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/channels',
  timeout: 1000,
});

function mapChannel(channelResponse) {
  const { id, snippet, statistics } = channelResponse;

  const thumbnail =
    snippet.thumbnails.high?.url ??
    snippet.thumbnails.medium?.url ??
    snippet.thumbnails.default?.url;

  return {
    id,
    thumbnail,
    title: snippet.title,
    description: snippet.description,
    viewCount: statistics?.viewCount ?? 0,
    subscriberCount: statistics?.subscriberCount ?? 0,
    videoCount: statistics?.videoCount ?? 0,
  };
}

export async function getChannels(channelId) {
  const response = await instance.get('', {
    params: {
      id: channelId,
      part: 'snippet,statistics',
      maxResults: 25,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const { items } = response.data;

  return items.map(mapChannel);
}

export async function getLocalChannels() {
  const response = await fetch('/videos/channel.json');
  const { items } = await response.json();

  return items.map(mapChannel);
}

export default {};
