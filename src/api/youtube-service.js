export default class YoutubeService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // #region videos
  async getVideo(id) {
    return this.apiClient.getVideo(id);
  }

  async getPopularVideos() {
    return this.apiClient.getPopularVideos();
  }
  // #endregion

  // #region search
  async searchVideos(params) {
    return this.apiClient.searchVideos(params);
  }

  async getChannelVideos(params) {
    return this.apiClient.getChannelVideos(params);
  }
  // #endregion

  // #region channels
  async getChannels(channelId) {
    return this.apiClient.getChannels(channelId);
  }
  // #endregion
}
