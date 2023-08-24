import { useState } from 'react';

export default function VideoDescription() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(prev => !prev);
  }

  const wrapperClass = isOpen
    ? ''
    : 'cursor-pointer hover:bg-black/10 active:bg-custom-ce text-left';

  const Element = isOpen ? 'div' : 'button';

  const description = `힐링 음악, 수면 음악, 수면 유도 음악, 잠 안올 때 듣는 음악, 공부할 때 듣는 음악, 뉴에이지 피아노, 몽환적인, 스트레스 해소,  명상 음악, 백색 소음, 빗소리, 자연 소리\nHealing music, sleep music, sleep inducing music, music for insomnia, music for studying, new age piano, dreamy, stress relieving, meditation music, white noise, rain sounds, nature sounds.\n\n\n이 음악을 듣는 모든 사람들이 행복하게 해주세요\n\n\nPlaylist\n00:00 소중히 간직한 너와의 약속 Everlasting Promise with You\n01:55 찬란했던 너와 나 Radiant Connection\n04:35 행복을 찾아서 Find Happiness\n07:22 꿈속에서 만난다면 If We Meet in a Dream\n10:03 잊을 수 없는 날 Unforgettable day\n12:42 꿈을 안고 걷다 Walking with Dreams\n16:03 빛나는 내일을 향해 Go A Shining Tomorrow\n18:27 빛나는 아침 Shining Morning\n20:58 빛을 향한 우리의 발걸음 Chasing the Radiant Light\n23:48 나를 믿어! Believe in Yourself!\n25:50 시간의 저편에서 How Far Beyond Time\n28:28 찬란하게 빛났던 꿈 A brilliantly shone dream\n31:25 Again\n59:28 부디 저에게 앞으로 나아갈 용기를 주세요\n\n\n모두가 행복해 질 수 있는 음악을 만들도록 노력할게요!\n\nInstagram : https://www.instagram.com/high_melody_/\nSound Cloud : https://soundcloud.com/high-melody-152555273\n\n\n일러스트 출처 : https://www.shutterstock.com/image-vector/anime-kid-student-wide-smile-school-2321683187\n\n\n#뉴에이지음악모음 #잠잘때듣는음악 #공부할때듣는음악`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <Element
      className={`bg-custom-f2 rounded-xl p-3 ${wrapperClass}`}
      onClick={isOpen ? null : () => toggle()}
    >
      <div className={isOpen ? '' : 'line-clamp-4'}>
        <div className="text-custom-black">
          <span className="text-sm mr-1">
            조회수 <em>17만회</em>
          </span>
          <span aria-label="업로드된지" className="text-sm">
            1개월 전
          </span>
        </div>

        <div className="text-sm text-custom-13 whitespace-pre-wrap">
          {description}
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          className="mt-5 text-sm text-custom-black"
          onClick={() => toggle()}
        >
          간략히
        </button>
      ) : (
        <span className="mt-5 text-sm text-custom-black bottom-3 right-3">
          더보기
        </span>
      )}
    </Element>
  );
}
