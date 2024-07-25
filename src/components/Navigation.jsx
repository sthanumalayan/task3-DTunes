import PropTypes from 'prop-types';
import './Navigation.css'
function Navigation({ setCurrentView }) {
  return (
    <nav>
      <ul id='navbar'>
        <li><button className='navbutton' onClick={() => setCurrentView('home')}>HOME</button></li>
        <li><button className='navbutton' onClick={() => setCurrentView('login')}>LOGIN</button></li>
        <li><button className='navbutton' onClick={() => setCurrentView('signup')}>SIGNUP</button></li>
        <li><button className='navbutton' onClick={() => setCurrentView('songs')}>SONGS</button></li>
        <li><button className='navbutton' onClick={() => setCurrentView('playlists')}>PLAYLISTS</button></li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default Navigation;
