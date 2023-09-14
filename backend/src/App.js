import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './main';
import Login from './Login';
import Home from './Home';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path='/' Component={Main}/>
        <Route path='/Login' Component={Login}/>
        <Route path='/Home' Component={Home}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
