import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './main';
import Login from './Login';
import Home from './Home';
import Atm from './Atm';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route path='/SignUp' Component={Main}/>
        <Route path='/Home' Component={Home}/>
        <Route path='/Atm' Component={Atm}/>
        <Route path='/Deposit' Component={Deposit}/>
        <Route path='/Withdraw' Component={Withdraw}/>
        <Route path='/Transfer' Component={Transfer}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
