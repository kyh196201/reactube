import { useState } from 'react';

export default function VideoDescription({ video }) {
  const [isOpen, setIsOpen] = useState(false);
  const { description, viewCount, publishedAt } = video;

  function toggle() {
    setIsOpen(prev => !prev);
  }

  const wrapperClass = isOpen
    ? ''
    : 'cursor-pointer hover:bg-black/10 active:bg-custom-ce text-left';

  const Element = isOpen ? 'div' : 'button';

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <Element
      className={`bg-custom-f2 rounded-xl p-3 ${wrapperClass}`}
      onClick={isOpen ? null : () => toggle()}
    >
      <div className={isOpen ? '' : 'line-clamp-4'}>
        <div className="text-custom-black">
          <span className="text-sm mr-1">
            조회수 <em>{viewCount}회</em>
          </span>
          <span aria-label="업로드된지" className="text-sm">
            {publishedAt}
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
