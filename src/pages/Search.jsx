import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../api/search';
import SearchVideoItem from '../components/SearchVideoItem';

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

  if (searchQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (searchQuery.error) {
    return <div>Error: {searchQuery.error.message}</div>;
  }

  const videoList = searchQuery.data ?? [];

  let content = '';

  if (videoList.length) {
    content = (
      <ul>
        {videoList.map(video => (
          <li key={video.id} className="mt-4">
            <SearchVideoItem video={video} />
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
