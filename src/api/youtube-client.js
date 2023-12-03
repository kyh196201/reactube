import axios from 'axios';
import { mapVideo, mapChannel } from '../utils/youtube';

export default class YoutubeService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      timeout: 1000,
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  // #region videos
  async getVideo(id) {
    const response = await this.apiClient.get('videos', {
      params: {
        part: 'snippet,statistics',
        maxResults: 1,
        id,
      },
    });

    const { items } = response.data;

    return items.length ? mapVideo(items[0]) : null;
  }

  async getPopularVideos() {
    const response = await this.apiClient.get('videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 25,
        regionCode: 'KR',
      },
    });

    return response.data.items.map(item => mapVideo(item));
  }
  // #endregion

  // #region search
  async searchVideos({ query = '', size = 10, pageToken }) {
    const { data } = await this.apiClient.get('search', {
      params: {
        q: query,
        maxResults: size,
        part: 'snippet',
        type: 'video',
        pageToken,
      },
    });

    const items = data.items.map(item =>
      mapVideo({
        ...item,
        id: item.id.videoId,
      }),
    );

    return {
      items,
      nextPageToken: data.nextPageToken,
      pageInfo: data.pageInfo,
    };
  }

  async getChannelVideos({ channelId, size = 10 }) {
    const response = await this.apiClient.get('search', {
      params: {
        channelId,
        maxResults: size,
        part: 'snippet',
        type: 'video',
      },
    });

    return response.data.items.map(item =>
      mapVideo({
        ...item,
        id: item.id.videoId,
      }),
    );
  }
  // #endregion

  // #region channels
  async getChannels(channelId) {
    const response = await this.apiClient.get('channels', {
      params: {
        id: channelId,
        part: 'snippet,statistics',
        maxResults: 25,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map(item => mapChannel(item));
  }
  // #endregion
}
