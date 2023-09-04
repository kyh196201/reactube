import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../api/search';
import SearchVideoItem from '../components/SearchVideoItem';
import { getChannels } from '../api/channels';

export default function Search() {
  // TODO: hook으로 분리
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  // 검색 api 쿼리
  const searchQuery = useQuery(
    ['search', query],
    () => searchVideos({ query }),
    {
      retry: 0,
      enabled: !!query,
    },
  );

  const videoList = searchQuery.data ?? [];
  const channelIds = videoList.map(video => video.channel.id);

  // 채널 api 쿼리
  // TODO: hook으로 분리
  const channelQuery = useQuery(
    ['channel'],
    () => getChannels(channelIds.join(',')),
    {
      retry: 0,
      enabled: !!channelIds.length,
    },
  );

  const channels = channelQuery.data ?? [];

  function getChannelInfoById(channelId) {
    const matched = channels.find(channel => channel.id === channelId);

    return matched ?? null;
  }

  if (searchQuery.isLoading || channelQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (searchQuery.error || channelQuery.error) {
    return (
      <div>Error: {(searchQuery.error || channelQuery.error).message}</div>
    );
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

  return <div className="w-[1096px] mx-auto">{content}</div>;
}
