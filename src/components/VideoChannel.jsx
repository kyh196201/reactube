import { Link } from 'react-router-dom';

export default function VideoChannel(props) {
  const { channel } = props;

  return (
    <Link to="video" className="shrink-0 w-9 h-9">
      <img
        className="w-full h-full object-cover rounded-full"
        src={channel.thumbnail}
        alt={channel.title}
      />
    </Link>
  );
}
