import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export default function VideoItem(props) {
  const { video, channel, type = 'horizontal' } = props;

  const videoDetailPath = `video/${video.id}`;

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
              alt={video.title}
            />
          </figure>
        </Link>

        {/* 비디오 정보 */}
        <div className="grow min-w-0">
          <Link to={videoDetailPath} className="block pr-6">
            <h3 className="line-clamp-2 text-custom-black text-sm mb-1">
              {video.title}
            </h3>
            <strong className="text-custom-gray text-xs font-normal">
              {channel && channel.title}
            </strong>
            <div className="items-center text-custom-gray text-xs overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="align-middle">조회수 525회</span>
              <span className="align-middle before:content-['•'] before:mx-1">
                {video.publishedAt}
              </span>
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
            alt={video.title}
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
          <h3 className="line-clamp-2 text-custom-black">{video.title}</h3>
          <strong className="text-custom-gray text-sm font-normal">
            {channel && channel.title}
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
