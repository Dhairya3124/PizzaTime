import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewUser from './components/NewUser';
import ManagePlayers from './components/ManagePlayers';
import PlayersInfo from './components/PlayersInfo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <div className="mx-auto">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" />
          <Route path="/new-user" element={<NewUser />}></Route>
          <Route path = "/manage-players" element={<ManagePlayers/>}></Route>
          <Route path="/player/:id" element={<PlayersInfo />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
