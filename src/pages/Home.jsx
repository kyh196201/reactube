import { useEffect, useState, useCallback } from 'react';
import VideoItem from '../components/VideoItem';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  // 비디오 목록 조회
  async function fetchPopularVideos() {
    const response = await fetch('videos/popular.json');
    const { items } = await response.json();

    const videoItems = items.map(video => {
      const { id, snippet } = video;

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
      };
    });

    setVideos(prev => {
      return [...prev, ...videoItems];
    });

    return videoItems ?? [];
  }

  // 채널 목록 조회
  // eslint-disable-next-line no-unused-vars
  async function fetchChannels(channelIds = []) {
    const response = await fetch('videos/channel.json');
    const { items } = await response.json();

    const channelItems = items.map(channel => {
      const { id, snippet } = channel;

      const thumbnail =
        snippet.thumbnails.high?.url ??
        snippet.thumbnails.medium?.url ??
        snippet.thumbnails.default?.url;

      return {
        id,
        thumbnail,
        title: snippet.title,
        description: snippet.description,
      };
    });

    setChannels(prev => {
      return [...prev, ...channelItems];
    });
  }

  const fetchVideosAndChannels = useCallback(async () => {
    const videoList = await fetchPopularVideos();
    const channelIds = videoList.map(video => video.channel.id);

    await fetchChannels(channelIds);
  }, []);

  useEffect(() => {
    fetchVideosAndChannels();
  }, [fetchVideosAndChannels]);

  function getChannelInfoById(channelId) {
    const matched = channels.find(channel => channel.id === channelId);

    return matched ?? null;
  }

  return (
    <div>
      <h2 className="sr-only">홈 페이지</h2>

      <section className="my-8 mx-4">
        <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
          {videos.map(video => (
            <li key={video.id}>
              <VideoItem
                video={video}
                channel={getChannelInfoById(video.channel.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
