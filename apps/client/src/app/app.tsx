import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Room } from './Room';

const App = () => {
  return (
    <Routes>
      <Route path="/room/:id" element={<Room />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
