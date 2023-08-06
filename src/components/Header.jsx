import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <header className="flex px-8 sticky top-0 bg-white z-10">
      {/* logo */}
      <h1 className="cursor-pointer">
        <Link to="/" className="block w-32 p-4">
          <img src={logo} alt="Youtube logo" className="block" />
        </Link>
      </h1>

      <div className="flex flex-1 justify-center">
        {/* header search component */}
        <div className="flex w-1/2 items-center">
          <input
            type="text"
            className="flex-1 h-10 border-2 border-gray-300 text-base rounded-l-full pl-4 pr-1 focus:border-blue-500 transition-colors duration-100"
          />
          <button
            type="button"
            className="h-10 border-2 border-l-0 border-gray-300 rounded-r-full w-16 bg-gray-50 hover:bg-gray-100 transition-colors duration-100"
          >
            검색
          </button>
        </div>
      </div>
    </header>
  );
}
