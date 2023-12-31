import { Link } from 'react-router-dom';
import { getElapsedTime } from '../utils/date';
import Avatar from './Avatar';
import { formatCount } from '../utils';
import { unescapeHtmlEntities } from '../utils/format';

export default function VideoItem(props) {
  const { video, channel, type = 'vertical', showViewCount = true } = props;

  const videoDetailPath = `/video/${video.id}`;
  const elapsedTime = getElapsedTime(video.publishedAt);
  const viewCount = video.viewCount ? formatCount(video.viewCount) : 0;
  const videoTitle = unescapeHtmlEntities(video.title);

  // 가로 타입
  if (type === 'horizontal') {
    return (
      <div className="flex flex-row">
        {/* 비디오 썸네일 */}
        <Link to={videoDetailPath} className="shrink-0 basis-44 mr-2">
          <figure className="aspect-video overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={video.thumbnail}
              alt={videoTitle}
            />
          </figure>
        </Link>

        {/* 비디오 정보 */}
        <div className="grow min-w-0">
          <Link to={videoDetailPath} className="block pr-6">
            <h3 className="line-clamp-2 text-custom-black text-sm mb-1">
              {videoTitle}
            </h3>
            <strong className="text-custom-gray text-xs font-normal">
              {channel && channel.title}
            </strong>
            <div className="items-center text-custom-gray text-xs overflow-hidden whitespace-nowrap text-ellipsis">
              {showViewCount && (
                <span className="align-middle after:content-['•'] after:mx-1">
                  조회수 {viewCount}회
                </span>
              )}
              <span className="align-middle">{elapsedTime}</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // 세로 타입
  return (
    <div>
      {/* 비디오 썸네일 */}
      <Link to={videoDetailPath} className="block">
        <figure className="aspect-video mb-3 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={video.thumbnail}
            alt={videoTitle}
          />
        </figure>
      </Link>

      {/* 비디오 정보 */}
      <div className="flex">
        {channel && (
          <Link to="/">
            <Avatar thumbnail={channel.thumbnail} title={channel.title} />
          </Link>
        )}

        <Link to={videoDetailPath} className="pl-3 pr-6">
          <h3 className="line-clamp-2 text-custom-black">{videoTitle}</h3>
          <strong className="text-custom-gray text-sm font-normal">
            {channel && channel.title}
          </strong>
          <div className="flex items-center text-custom-gray text-sm">
            {showViewCount && (
              <span className="after:content-['•'] after:mx-1">
                조회수 {viewCount}회
              </span>
            )}
            <span>{elapsedTime}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
