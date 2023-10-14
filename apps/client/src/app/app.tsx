import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Room } from './Room/Room';
import { Join } from './components/Join/Join';

const App = () => {
  return (
    <Routes>
      <Route path="/room/:id" element={<Room />} />
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
};

export default App;
