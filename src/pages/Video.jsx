import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import VideoItem from '../components/VideoItem';
import VideoDescription from '../components/VideoDescription';
import VideoPlayer from '../components/VideoPlayer';
import { getLocalVideo } from '../api/videos';
import { getChannels } from '../api/channels';
import { getLocalChannelVideos } from '../api/search';

export default function Video() {
  const { videoId } = useParams();

  // 비디오 api 쿼리
  const {
    data: videoData,
    error,
    isLoading,
  } = useQuery('video', () => getLocalVideo(videoId), {
    retry: 0,
  });

  const channelId = videoData?.channel?.id ?? null;

  // 채널 api 쿼리
  const channelQuery = useQuery('channel', () => getChannels(channelId), {
    retry: 0,
    enabled: !!channelId,
  });

  const channel = channelQuery.data?.[0] ?? null;

  // 채널에 속한 비디오 목록 api 쿼리
  const channelVideosQuery = useQuery(
    'channelVideos',
    () => getLocalChannelVideos({ channelId }),
    {
      retry: 0,
      enabled: !!channelId,
    },
  );

  const channelVideos = channelVideosQuery.data ?? [];

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || !videoData) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      {/* 비디오 영역 */}
      <section className="grow w-2/3 p-6">
        {/* 비디오 플레이어 */}
        <div className="mb-3">
          <VideoPlayer videoId={videoId} videoTitle={videoData.title} />
        </div>

        {/* 비디오 정보 영역 */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-custom-black">
            {videoData.title}
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
                    구독자 {channel.subscriberCount}명
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 비디오 조회수, 시간, 상세 정보 */}
          <VideoDescription video={videoData} />
        </div>
      </section>

      {/* 연관 비디오 목록 영역 */}
      <section className="grow w-1/3 p-6 pl-0">
        <h2 className="sr-only">연관된 비디오 목록</h2>
        {channelVideos.length && (
          <ul>
            {channelVideos.map((video, index) => (
              <li key={video.id} className={index > 0 ? 'mt-2' : ''}>
                <VideoItem video={video} type="horizontal" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
