import { useQuery } from 'react-query';
import { useMemo } from 'react';
import VideoItem from '../components/VideoItem';
// import YoutubeClient from '../api/fake-youtube-client';
import YoutubeClient from '../api/youtube-client';
import YoutubeService from '../api/youtube-service';

export default function Home() {
  const youtubeClient = useMemo(() => new YoutubeClient(), []);
  const youtubeService = useMemo(
    () => new YoutubeService(youtubeClient),
    [youtubeClient],
  );

  const { data: videos } = useQuery(
    ['videos'],
    () => youtubeService.getPopularVideos(),
    {
      staleTime: 1000 * 60 * 5, // 300000ms
    },
  );

  const channelIds = (videos || []).map(video => video.channel.id).join(',');

  const { data: channels } = useQuery(
    ['channels', channelIds],
    () => {
      // 비디오 목록을 조회한 후 채널 목록을 조회하기 위해 추가
      if (!videos?.length) {
        return [];
      }

      return youtubeService.getChannels(channelIds);
    },
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  function getChannelInfoById(channelId) {
    const matched = (channels || []).find(channel => channel.id === channelId);

    return matched ?? null;
  }

  return (
    <div>
      <h2 className="sr-only">홈 페이지</h2>

      <section className="my-8 mx-4">
        {!videos && <div>loading...</div>}
        {videos?.length && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4">
            {videos.map(video => (
              <li key={video.id}>
                <VideoItem
                  video={video}
                  channel={getChannelInfoById(video.channel.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
