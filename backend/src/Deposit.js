import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Atm from './Atm.js';

const Deposit = () => {
    const [names, setNames] = useState('');
    const [balance, setBalance] = useState();
    const [deposit, setDeposit] = useState('');
     console.log(deposit)

   

    //  const cookieValue = decodeURIComponent(document.cookie);
    //  console.log(cookieValue)
//      const userId = cookieValue.split(':')[1].split('.')[0];
   
//    console.log('userId (from cookie):', userId);

    const handleDeposit = (e)=> {
      e.preventDefault();
      // const deposite = ;
      // const newDepo = deposite.toFixed(2);
      // console.log(newDepo)
      axios.post('http://localhost:3100/deposit', {
        
      balance: parseFloat(deposit).toFixed(2)
      },
      {
        withCredentials: true
      },
      ).then(res=> {
        if(res.data=== 'user Not found' ){
          alert('session is over, please log in')
          setTimeout(() => {
            window.location.href= '/'
          }, 1000);
        }
        else{
          alert('deposite successful');
       
          setNames(res.data.names);
          setBalance(res.data.balance);
          console.log(res.data.names, res.data.balance)
        }
        
      } )
      .catch(err=> console.log(err))
    }
    
    return ( 
        <div className="deposit">
            <h3>This is Deposit section</h3>

            <div className="input">
                <label htmlFor="adding">How much you want to deposit?
                </label><br />
                <input id='adding' type="number" min={100} max={1000000}
                 value={deposit}
                  onChange={e=>setDeposit(e.target.value)}
                  placeholder="Enter amount in 0.00 format"
                  />
                  <br />

                  <button className="submit" onClick={handleDeposit}>Confirm</button>
            </div><br />
            <Link to={'/Atm'}>Return back to main ATM page</Link>

            <div className="userlate">
              <h3>name: {names}</h3> 
              <h6>form of transaction: deposit</h6>
              <h6>fund deposited: ${deposit} USD</h6>
              <h5>Balance: ${balance} USD</h5> 
              
            </div>
        </div>
     );
}
 
export default Deposit;
