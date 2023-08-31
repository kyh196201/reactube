// https://gurtn.tistory.com/166
function getElapsedTime(date) {
  const start = new Date(date);
  const end = new Date();

  const diff = (end - start) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (let i = 0; i < times.length; i += 1) {
    const { milliSeconds, name } = times[i];
    const betweenTime = Math.floor(diff / milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${name} 전`;
    }
  }

  return '방금 전';
}

export { getElapsedTime };

export default {};
