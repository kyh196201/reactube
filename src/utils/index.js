/* eslint-disable yoda */
/**
 * 숫자를 소수점 n자리수까지 반올림합니다.
 *
 * @param {number} value 반올림할 숫자
 * @param {number} digit 소수점 자릿수
 * @returns 반올림된 숫자
 */
function roundNumber(value = 0, digit = 1) {
  return Math.round(value * 10 ** digit) / 10 ** digit;
}

/**
 * 조회수와 같은 숫자를 포맷팅합니다.
 * 예) 12000 -> 1.2만, 9650 -> 9.6천
 *
 * @param {number} value 포맷팅할 숫자
 * @returns 변환된 문자열
 */
function formatCount(value = 0) {
  const BILLION = 1000000000;
  let count = value;
  let unit = '';

  // 10억 <= value < 1조
  if (BILLION <= value && value < BILLION * 1000) {
    count = Math.floor(value / 100000000);
    unit = '억';
  } else if (100000000 <= value && value < BILLION) {
    // 1억 <= value < 10억
    count = roundNumber(value / 100000000);
    unit = '억';
  } else if (100000 <= value && value < 100000000) {
    // 10만 <= value < 1억
    count = Math.floor(value / 10000);
    unit = '만';
  } else if (10000 <= value && value < 10000 * 10) {
    // 만 <= value < 10만
    count = roundNumber(value / 10000);
    unit = '만';
  } else if (1000 <= value && value < 10000) {
    // 천 <= value < 만
    count = roundNumber(value / 1000);
    unit = '천';
  }

  return `${count}${unit}`;
}

export { formatCount, roundNumber };

export default {};
