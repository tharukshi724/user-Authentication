import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import Nav from './components/Nav.js';
import { useGoogleLogin } from 'react-google-login';

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
