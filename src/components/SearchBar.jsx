import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // TODO: hook으로 분리
    const query = searchParams.get('query');

    if (query) {
      setInputValue(prev => {
        if (prev !== query) {
          return query;
        }

        return prev;
      });
    }
  }, [searchParams]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const query = inputValue.trim();

    if (!query) {
      return;
    }

    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ query })}`,
    });
  }

  return (
    <form
      className="flex w-1/2 items-center max-w-[600px]"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 h-10 border-2 border-gray-300 text-base rounded-l-full pl-4 pr-1 focus:border-blue-500 transition-colors duration-100"
        value={inputValue}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="flex justify-center items-center h-10 border-2 border-l-0 border-gray-300 rounded-r-full w-16 bg-gray-50 hover:bg-gray-100 transition-colors duration-100"
      >
        <BsSearch />
        <span className="sr-only">검색</span>
      </button>
    </form>
  );
}
