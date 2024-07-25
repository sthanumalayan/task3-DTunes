import './App.css'
import {useState} from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Songs from './components/Songs.jsx'
import Playlists from './components/Playlists.jsx'
import Navigation from './components/Navigation.jsx'
function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView}/>;
      case 'login':
        return <Login setCurrentView={setCurrentView}/>;
      case 'signup':
        return <Signup setCurrentView={setCurrentView}/>;
      case 'songs':
        return <Songs />;
      case 'playlists':
        return <Playlists />;
      default:
        return <Home />;
    }
  };

  return (
    <div >
      <Navigation setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
  
}

export default App
