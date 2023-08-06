import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';

export default function Layout() {
  return (
    <div className="font-noto h-screen relative overflow-y-auto">
      <Header />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
