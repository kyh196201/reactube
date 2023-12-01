import { useMemo } from 'react';
// import YoutubeClient from '../api/fake-youtube-client';
import { useQueries } from 'react-query';
import YoutubeClient from '../api/youtube-client';
import YoutubeService from '../api/youtube-service';

export default function useChannelData(channelIdList) {
  const youtubeClient = useMemo(() => new YoutubeClient(), []);
  const youtubeService = useMemo(
    () => new YoutubeService(youtubeClient),
    [youtubeClient],
  );

  const channelQueries = useQueries(
    channelIdList.map(channelId => ({
      queryKey: ['channel', channelId],
      queryFn: () => youtubeService.getChannels(channelId),
      staleTime: 1000 * 60 * 5,
      enabled: !!channelId,
    })),
  );

  // channelId를 기준으로 query result를 정규화
  const channelsData = channelQueries.reduce((acc, query) => {
    const { isSuccess, data } = query;
    if (isSuccess && data?.length) {
      const channel = data[0];
      acc[channel.id] = channel;
    }
    return acc;
  }, {});

  const getChannelInfoById = id => {
    return channelsData[id] ?? null;
  };

  return {
    channelQueries,
    channelsData,
    getChannelInfoById,
  };
}
