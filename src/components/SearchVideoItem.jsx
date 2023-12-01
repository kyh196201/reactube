import { Link } from 'react-router-dom';
import { getElapsedTime } from '../utils/date';
import { formatCount } from '../utils';
import Avatar from './Avatar';
import { unescapeHtmlEntities } from '../utils/format';

export default function SearchVideoItem(props) {
  const { video, channel } = props;

  const videoDetailPath = `/video/${video.id}`;
  const elapsedTime = getElapsedTime(video.publishedAt);
  const viewCount = video.viewCount ? formatCount(video.viewCount) : 0;
  const videoTitle = unescapeHtmlEntities(video.title);

  return (
    <div className="flex flex-col md:flex-row">
      {/* 비디오 썸네일 */}
      <Link to={videoDetailPath} className="shrink-0 w-full md:w-[360px] mr-4">
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
          <h3 className="line-clamp-2 text-custom-black text-lg mb-1">
            {videoTitle}
          </h3>

          <div className="items-center text-custom-gray text-xs overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="align-middle after:content-['•'] after:mx-1">
              조회수 {viewCount}회
            </span>
            <span className="align-middle">{elapsedTime}</span>
          </div>

          {channel && (
            <Link to="/" className="flex items-center my-3">
              <Avatar
                thumbnail={channel.thumbnail}
                title={channel.title}
                className="mr-2 w-6 h-6"
              />

              <strong className="text-custom-gray text-xs font-normal">
                {channel.title}
              </strong>
            </Link>
          )}

          {video.description && (
            <p className="text-custom-gray line-clamp-2 text-xs">
              {video.description}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
