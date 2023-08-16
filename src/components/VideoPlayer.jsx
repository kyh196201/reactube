import YouTube from 'react-youtube';

export default function VideoPlayer(props) {
  const { videoId, videoTitle } = props;

  const options = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  return (
    <figure className="aspect-video relative">
      <figcaption className="sr-only">{videoTitle}</figcaption>

      <YouTube
        className="absolute top-0 right-0 bottom-0 left-0"
        videoId={videoId}
        opts={options}
      />
    </figure>
  );
}
