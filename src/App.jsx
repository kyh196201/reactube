import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Video from './pages/Video';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
