import { useEffect, useState } from 'react';
import VideoItem from '../components/VideoItem';

export default function Home() {
  const [videos, setVideos] = useState([]);

  // 비디오 목록 조회
  async function fetchPopularVideos() {
    const response = await fetch('videos/popular.json');
    const { items } = await response.json();

    const videoItems = items.map(video => {
      const { id, snippet } = video;

      const thumbnail =
        snippet.thumbnails.high?.url ??
        snippet.thumbnails.medium?.url ??
        snippet.thumbnails.default?.url;

      return {
        id,
        thumbnail,
        categoryId: snippet.categoryId,
        publishedAt: snippet.publishedAt,
        title: snippet.title,
        description: snippet.description,
        tags: snippet.tags,
        channel: null,
      };
    });

    setVideos(videoItems);
  }

  useEffect(() => {
    fetchPopularVideos();
  }, []);

  return (
    <div>
      <h2 className="sr-only">홈 페이지</h2>

      <section className="my-8 mx-4">
        <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
          {videos.map(video => (
            <li key={video.id}>
              <VideoItem video={video} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
