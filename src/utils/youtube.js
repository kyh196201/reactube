export function mapVideo(videoResponse) {
  const { id, snippet, statistics } = videoResponse;

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
    tags: snippet.tags ?? [],
    channel: {
      id: snippet.channelId,
      title: snippet.channelTitle,
    },
    viewCount: statistics?.viewCount ?? 0,
    likeCount: statistics?.likeCount ?? 0,
    commentCount: statistics?.commentCount ?? 0,
  };
}

export function mapChannel(channelResponse) {
  const { id, snippet, statistics } = channelResponse;

  const thumbnail =
    snippet.thumbnails.high?.url ??
    snippet.thumbnails.medium?.url ??
    snippet.thumbnails.default?.url;

  return {
    id,
    thumbnail,
    title: snippet.title,
    description: snippet.description,
    viewCount: statistics?.viewCount ?? 0,
    subscriberCount: statistics?.subscriberCount ?? 0,
    videoCount: statistics?.videoCount ?? 0,
  };
}
