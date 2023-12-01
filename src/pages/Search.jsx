import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import SearchVideoItem from '../components/SearchVideoItem';
// import YoutubeClient from '../api/fake-youtube-client';
import YoutubeClient from '../api/youtube-client';
import YoutubeService from '../api/youtube-service';
import useChannelData from '../hooks/useChannelData';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const youtubeClient = useMemo(() => new YoutubeClient(), []);
  const youtubeService = useMemo(
    () => new YoutubeService(youtubeClient),
    [youtubeClient],
  );

  // 검색 api 쿼리
  const searchQuery = useQuery(
    ['search', query],
    () => youtubeService.searchVideos({ query }),
    {
      enabled: !!query,
      staleTime: 1000 * 60 * 1,
    },
  );

  const videoList = searchQuery.data ?? [];
  const channelIds = videoList.map(video => video.channel.id);
  const { getChannelInfoById } = useChannelData(channelIds);

  if (searchQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (searchQuery.error) {
    return <div>Error: {searchQuery.error.message}</div>;
  }

  let content = '';

  if (videoList.length) {
    content = (
      <ul>
        {videoList.map(video => (
          <li key={video.id} className="mt-4">
            <SearchVideoItem
              video={video}
              channel={getChannelInfoById(video.channel.id)}
            />
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <div className="mt-[140px]">
        <h2 className="text-center text-2xl mb-4">검색결과가 없습니다.</h2>
        <p className="text-center text-sm">
          다른 검색어를 시도해 보거나 검색 필터를 삭제하세요.
        </p>
      </div>
    );
  }

  return <div className="px-2 xl:w-[1096px] mx-auto">{content}</div>;
}
