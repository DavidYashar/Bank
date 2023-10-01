import { Link } from "react-router-dom";

const Atm = () => {

  const  handleDeposit = ()=>{
    setTimeout(()=> {
        window.location.href='/Deposit'
    }, 500)
  } 

  const  handleWithdraw = ()=>{
    setTimeout(()=> {
        window.location.href='/Withdraw'
    }, 500)
  } 

  const  handleTransfer = ()=>{
    setTimeout(()=> {
        window.location.href='/Transfer'
    }, 500)
  } 

    return ( 
        <div className="atm">
          <h3>Welcome, How we may Help you?</h3>


          <div className="deposit"><br />
            <button onClick={handleDeposit}>Deposit</button>
          </div>

          <div className="withdraw"><br />
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>

          

          <div className="transfer"><br />
            <button onClick={handleTransfer}>Transfer</button>
          </div><br />

          <div className="eject">
           <Link to={'/'}><button>Eject</button></Link> 
          </div>



        </div>
     );
}
 
export default Atm;
