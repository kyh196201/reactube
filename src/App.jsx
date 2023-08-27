import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './Layout';
import Home from './pages/Home';
import Video from './pages/Video';
import Search from './pages/Search';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
