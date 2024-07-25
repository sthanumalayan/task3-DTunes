import './Home.css'
import PropTypes from 'prop-types';
const Home = ({setCurrentView}) => {
  return (
    <div id="container">
    <div id="heading"><h1>WELCOME TO DTUNES</h1></div>
    <div id="linkbox">
      <li className="link" onClick={() => setCurrentView('login')} to="/login">LOGIN</li>
      <li className="link" onClick={() => setCurrentView('signup')} to="/signup">SIGN UP</li>
    </div>
    </div>
  )
}
Home.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};
export default Home
