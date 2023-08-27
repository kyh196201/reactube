import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import VideoItem from '../components/VideoItem';
import VideoDescription from '../components/VideoDescription';
import VideoPlayer from '../components/VideoPlayer';
import { getLocalVideo } from '../api/videos';
import { getChannels } from '../api/channels';

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

  const relatedVideos = [
    {
      id: '4fikvcuirtY',
      thumbnail: 'https://i.ytimg.com/vi/4fikvcuirtY/hqdefault.jpg',
      categoryId: '24',
      publishedAt: '2022-09-25T11:07:59Z',
      title: 'BLACKPINK(블랙핑크) - Shut Down @인기가요 inkigayo 20220925',
      description:
        'BLACKPINK - Shut Down #SBSInkigayo_EP1155\n블랙핑크 - Shut Down #BLACKPINK #ShutDown\n\nSBS Inkigayo(인기가요) is a Korean music program broadcast by SBS. \n\nThe show features some of K-pop artists’ performance every Sunday.\nCheck out this week’s Inkigayo Line up and meet your favorite artist!\n🔗bit.ly/3epKoUp',
      tags: [
        'Inkigayo',
        '인기가요직캠',
        '안방1열직캠',
        '스브스케이팝',
        '스브스 직캠',
        '인기가요',
        '인가',
        '음방',
        '음악방송',
        '블랙핑크',
        'BLACKPINK',
        'Shut Down',
        '블랙핑크 컴백',
        '블랙핑크 정규',
        '블랙핑크 인기가요',
        '블랙핑크 인가',
        '블랙핑크 무대',
        '블랙핑크 안무',
        '블랙핑크 직캠',
        '블랙핑크 페이스캠',
        '블랙핑크 풀캠',
        '블랙핑크 신곡',
        '핑크베놈',
        '셧다운',
        '지수',
        '제니',
        '로제',
        '리사',
        'JISOO',
        'JENNIE',
        'ROSÉ',
        'LISA',
      ],
      channel: {
        id: 'UCS_hnpJLQTvBkqALgapi_4g',
        title: '스브스케이팝 X INKIGAYO',
      },
      viewCount: 0,
    },
    {
      id: '4fikvcuirtY2',
      thumbnail: 'https://i.ytimg.com/vi/4fikvcuirtY/hqdefault.jpg',
      categoryId: '24',
      publishedAt: '2022-09-25T11:07:59Z',
      title: 'BLACKPINK(블랙핑크) - Shut Down @인기가요 inkigayo 20220925',
      description:
        'BLACKPINK - Shut Down #SBSInkigayo_EP1155\n블랙핑크 - Shut Down #BLACKPINK #ShutDown\n\nSBS Inkigayo(인기가요) is a Korean music program broadcast by SBS. \n\nThe show features some of K-pop artists’ performance every Sunday.\nCheck out this week’s Inkigayo Line up and meet your favorite artist!\n🔗bit.ly/3epKoUp',
      tags: [
        'Inkigayo',
        '인기가요직캠',
        '안방1열직캠',
        '스브스케이팝',
        '스브스 직캠',
        '인기가요',
        '인가',
        '음방',
        '음악방송',
        '블랙핑크',
        'BLACKPINK',
        'Shut Down',
        '블랙핑크 컴백',
        '블랙핑크 정규',
        '블랙핑크 인기가요',
        '블랙핑크 인가',
        '블랙핑크 무대',
        '블랙핑크 안무',
        '블랙핑크 직캠',
        '블랙핑크 페이스캠',
        '블랙핑크 풀캠',
        '블랙핑크 신곡',
        '핑크베놈',
        '셧다운',
        '지수',
        '제니',
        '로제',
        '리사',
        'JISOO',
        'JENNIE',
        'ROSÉ',
        'LISA',
      ],
      channel: {
        id: 'UCS_hnpJLQTvBkqALgapi_4g',
        title: '스브스케이팝 X INKIGAYO',
      },
      viewCount: 0,
    },
  ];

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
        {relatedVideos.length && (
          <ul>
            {relatedVideos.map((video, index) => (
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
