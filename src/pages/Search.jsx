import { useInfiniteQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { AiOutlineLoading3Quarters as LoadingIcon } from 'react-icons/ai';
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

  const observerElem = useRef(null);

  // 검색 api 쿼리
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['search', query],
    ({ pageParam: pageToken }) =>
      youtubeService.searchVideos({ query, pageToken }),
    {
      enabled: !!query,
      staleTime: 1000 * 60 * 1,
      getNextPageParam: lastPage => lastPage.nextPageToken,
    },
  );

  const videoList = data?.pages.flatMap(page => page.items) ?? [];
  const channelIds = videoList.map(video => video.channel.id);
  const { getChannelInfoById } = useChannelData(channelIds);

  const handleObserver = useCallback(
    entries => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);

    if (element) {
      observer.observe(element);
    }

    // TODO: clean up function
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [observerElem, handleObserver]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let content = '';

  if (videoList.length) {
    content = (
      <>
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

        <div className="flex justify-center" ref={observerElem}>
          {isFetchingNextPage && (
            <LoadingIcon className="h-8 w-8 my-8 animate-spin fill-gray-700" />
          )}
        </div>
      </>
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
