import { mapVideo, mapChannel } from '../utils/youtube';

export default class FakeYoutubeService {
  // #region videos
  async getVideo() {
    const response = await fetch('/videos/detail.json');
    const { items } = await response.json();

    return items.length ? mapVideo(items[0]) : null;
  }

  async getPopularVideos() {
    const response = await fetch('/videos/popular.json');
    const { items } = await response.json();

    return items.map(item => mapVideo(item));
  }
  // #endregion

  // #region search
  async searchVideos() {
    const response = await fetch('/videos/search.json');
    const { items } = await response.json();

    return items.map(item =>
      mapVideo({
        ...item,
        id: item.id.videoId,
      }),
    );
  }

  async getChannelVideos() {
    const response = await fetch('/videos/channel-videos.json');
    const { items } = await response.json();

    return items.map(item =>
      mapVideo({
        ...item,
        id: item.id.videoId,
      }),
    );
  }
  // #endregion

  // #region channels
  async getChannels() {
    const response = await fetch('/videos/channel.json');
    const { items } = await response.json();

    return items.map(item => mapChannel(item));
  }
  // #endregion
}
