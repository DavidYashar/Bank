import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Withdraw = () => {
    const [withdraw, setWithdraw] = useState('');
    const [balance, setBalance] = useState();
    const [names1, setNames1] = useState('');
    
   const handleWithdraw = (e)=> {
     e.preventDefault();
     
     axios.post('http://localhost:3100/withdraw', {
      balance: parseFloat(withdraw).toFixed(2)
     }, {
        withCredentials: true
     })
     .then(res => {

        if(res.data==='not enough fund'){
            alert('not enough fund, please add funds or\n reduce the withdraw amount')

        }else if(res.data==='user Not found'){
            alert('session over, please login again')
            setTimeout(()=> {
                window.location.href='/'
            }, 1000)

        }else{
            alert('withdraw successful')
            setNames1(res.data.names);
        setBalance(res.data.balance);
        console.log(res.data.names, res.data.balance)
        }
        
     })
     .catch(err => console.log(err))
        
  
   }



//    const newBal = parseFloat(balance).toFixed(2);
    return ( 
        <div className="withdraw">
           <h3>This is Withdraw section</h3> <br />
           <label htmlFor="withdrawing">Please enter the amount for withdraw</label><br />
           <input id="withdrawing"
            type="number"
            min={100} max={1000000}
             value={withdraw}
              onChange={e=> setWithdraw(e.target.value)} /> <br/>

              <button onClick={handleWithdraw}>Withdraw</button>


              <div className="userlate1">
              <h3>name: {names1}</h3> 
              <h6>form of transaction: withdraw</h6>
              <h6>fund withdrawal: ${withdraw} USD</h6>
              <h5>Balance: ${balance} USD</h5> 
              
            </div>
            <Link to={'/Atm'}>Return back to main ATM page</Link>
        </div>
     );
}
 
export default Withdraw;
