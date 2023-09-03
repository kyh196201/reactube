import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import SearchBar from './SearchBar';

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
        <SearchBar />
      </div>
    </header>
  );
}
