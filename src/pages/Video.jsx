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
import useChannelData from '../hooks/useChannelData';

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

  const channelIdList = new Set(channelVideos.map(video => video.channel.id));
  if (typeof channelId === 'string') {
    channelIdList.add(channelId);
  }

  const { getChannelInfoById } = useChannelData([...channelIdList]);

  const channel = getChannelInfoById(channelId);

  if (videoQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (videoQuery.error || channelVideosQuery.error) {
    return (
      <div>Error: {(videoQuery.error || channelVideosQuery.error).message}</div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* 비디오 영역 */}
      <section className="grow p-4 lg:p-6 lg:w-2/3">
        {/* 비디오 플레이어 */}
        <div className="mb-3">
          <VideoPlayer videoId={videoId} videoTitle={videoQuery.data.title} />
        </div>

        {/* 비디오 정보 영역 */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg lg:text-xl font-semibold text-custom-black">
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
      <section className="grow p-4 lg:p-6 lg:w-1/3 lg:pl-0">
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
