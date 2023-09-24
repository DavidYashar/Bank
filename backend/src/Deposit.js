import { useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";

const Deposit = () => {
    // const [userID, setUserID] = useState();
    const [deposit, setDeposit] = useState('');
     console.log(deposit)



    //  const cookieValue = decodeURIComponent(document.cookie);
    //  console.log(cookieValue)
//      const userId = cookieValue.split(':')[1].split('.')[0];
   
//    console.log('userId (from cookie):', userId);

    const handleDeposit = (e)=> {
      e.preventDefault();

      axios.post('http://localhost:3100/deposit', {
      balance: deposit
      },
      {
        withCredentials: true
      },
      ).then(res=> console.log(res.data))
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
                  
                  />
                  <br />

                  <button className="submit" onClick={handleDeposit}>Confirm</button>
            </div>
        </div>
     );
}
 
export default Deposit;
