import { Link } from 'react-router-dom';
import VideoChannel from './VideoChannel';

export default function VideoItem(props) {
  const { video, channel } = props;

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
        {channel && <VideoChannel channel={channel} />}

        <Link to="video" className="pl-3 pr-6">
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
