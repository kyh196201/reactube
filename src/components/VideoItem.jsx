import { Link } from 'react-router-dom';

export default function VideoItem(props) {
  const { video: _video } = props;

  const video = _video || {
    id: '4fikvcuirtY',
    thumbnail: 'https://i.ytimg.com/vi/4fikvcuirtY/hqdefault.jpg',
    categoryId: '24',
    publishedAt: '2022-09-24T19:59:59Z',
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
      id: 'UCFL1sCAksD6_7JIZwwHcwjQ',
      title: 'JTBC Entertainment',
      customUrl: '@jtbcentertainment',
      thumbnail:
        'https://yt3.ggpht.com/Xfjhq84VhhTQ2UDHPoHKypmbm-3qA5J3Oo2Qvg6dmIOdDOlznkuBA28fvT_aLVv9vXZh5TMIwQ=s800-c-k-c0x00ffffff-no-rj',
    },
  };

  return (
    <div>
      {/* 비디오 썸네일 */}
      <Link to="video" className="block">
        <figure className="aspect-video mb-3 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={video.thumbnail}
            alt={video.title}
          />
        </figure>
      </Link>

      {/* 비디오 정보 */}
      <div className="flex">
        {/* 채널 컴포넌트 */}
        <Link to="video" className="shrink-0 w-9 h-9">
          <img
            className="w-full h-full object-cover rounded-full"
            src={video.channel.thumbnail}
            alt={video.channel.title}
          />
        </Link>

        <Link to="video" className="pl-3 pr-6">
          <h3 className="line-clamp-2 text-custom-black">{video.title}</h3>
          <strong className="text-custom-gray text-sm font-normal">
            {video.channel.title}
          </strong>
          <div className="flex items-center text-custom-gray text-sm">
            <span>조회수 525회</span>
            <span className="before:content-['•'] before:mx-1">
              {video.publishedAt}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
