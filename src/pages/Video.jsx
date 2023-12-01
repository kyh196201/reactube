import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Avatar from '../components/Avatar';
import VideoItem from '../components/VideoItem';
import VideoDescription from '../components/VideoDescription';
import VideoPlayer from '../components/VideoPlayer';
import { formatCount } from '../utils';
// import YoutubeClient from '../api/fake-youtube-client';
import YoutubeClient from '../api/youtube-client';
import YoutubeService from '../api/youtube-service';

export default function Video() {
  const { videoId } = useParams();
  const youtubeClient = useMemo(() => new YoutubeClient(), []);
  const youtubeService = useMemo(
    () => new YoutubeService(youtubeClient),
    [youtubeClient],
  );

  // 비디오 api 쿼리
  const videoQuery = useQuery(
    ['video', videoId],
    () => youtubeService.getVideo(videoId),
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  const channelId = videoQuery.data?.channel?.id;

  // 채널 api 쿼리
  const channelQuery = useQuery(
    ['channel', channelId],
    () => youtubeService.getChannels(channelId),
    {
      enabled: !!channelId,
      staleTime: 1000 * 60 * 5,
    },
  );

  const channel = channelQuery.data?.[0] ?? null;

  // 채널에 속한 비디오 목록 api 쿼리
  const channelVideosQuery = useQuery(
    ['channelVideos', channelId],
    () => youtubeService.getChannelVideos({ channelId }),
    {
      enabled: !!channelId,
      staleTime: 1000 * 60 * 5,
    },
  );

  const channelVideos = channelVideosQuery.data ?? [];

  // 2. 조회한 비디오 목록에서 채널 ID를 추출
  const channelIdsFromVideos = channelVideos
    .map(video => video.channel.id)
    .join(',');

  // 3. 채널 ID를 파라미터로 전달해서 채널 정보 조회
  const channelsFromVideosQuery = useQuery(
    'channelsFromVideos',
    () => youtubeService.getChannels(channelIdsFromVideos),
    {
      enabled: channelIdsFromVideos.length > 0,
      staleTime: 1000 * 60 * 1,
    },
  );

  function getChannelInfoById(id) {
    const { data: channels } = channelsFromVideosQuery;

    const matched = channels?.find(item => item.id === id);

    return matched ?? null;
  }

  if (
    videoQuery.isLoading ||
    channelQuery.isLoading ||
    channelsFromVideosQuery.isLoading
  ) {
    return <div>loading...</div>;
  }

  if (videoQuery.error || channelQuery.error || channelsFromVideosQuery.error) {
    return (
      <div>
        Error:{' '}
        {
          (videoQuery.error || channelQuery.error || channelVideosQuery.error)
            .message
        }
      </div>
    );
  }

  return (
    <div className="flex">
      {/* 비디오 영역 */}
      <section className="grow w-2/3 p-6">
        {/* 비디오 플레이어 */}
        <div className="mb-3">
          <VideoPlayer videoId={videoId} videoTitle={videoQuery.data.title} />
        </div>

        {/* 비디오 정보 영역 */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-custom-black">
            {videoQuery.data.title}
          </h2>
          {/* 비디오 채널, 구독, 좋아요 공유 ... */}
          {channel && (
            <div className="mb-3">
              {/* 채널 정보 */}
              <div className="flex">
                <Link to="/" className="mr-3">
                  <Avatar thumbnail={channel.thumbnail} title={channel.title} />
                </Link>

                <div className="flex flex-1 flex-col">
                  <em className="text-custom-black">{channel.title}</em>
                  <span className="text-xs text-custom-gray">
                    구독자 {formatCount(channel.subscriberCount)}명
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 비디오 조회수, 시간, 상세 정보 */}
          <VideoDescription video={videoQuery.data} />
        </div>
      </section>

      {/* 연관 비디오 목록 영역 */}
      <section className="grow w-1/3 p-6 pl-0">
        <h2 className="sr-only">연관된 비디오 목록</h2>
        {channelVideos.length > 0 && (
          <ul>
            {channelVideos.map((video, index) => (
              <li key={video.id} className={index > 0 ? 'mt-2' : ''}>
                <VideoItem
                  video={video}
                  channel={getChannelInfoById(video.channel.id)}
                  type="horizontal"
                  showViewCount={false}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
