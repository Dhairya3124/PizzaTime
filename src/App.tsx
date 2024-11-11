import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewUser from './components/NewUser';
import ManagePlayers from './components/ManagePlayers';
import PlayersInfo from './components/PlayersInfo';
import Leaderboard from './components/Leaderboard';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <div className="mx-auto">
          <Navbar />
        </div>
        <Routes>
          <Route path="/"  element = {<HeroSection />}></Route>
          <Route path="/new-user" element={<NewUser />}></Route>
          <Route path = "/manage-players" element={<ManagePlayers/>}></Route>
          <Route path="/player/:id" element={<PlayersInfo />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
