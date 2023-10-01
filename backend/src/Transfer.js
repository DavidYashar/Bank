import { useState } from "react";
import axios from "axios";

const Transfer = () => {
    const[socialSecurity1, setSocialSecurity1] = useState('');
    const[amount1, setAmount1] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderBalance, setSenderBalance] = useState('');
    const [receiverName, setReceiverName] = useState('')

    const handleSubmit = (e)=> {
        e.preventDefault();

        if( socialSecurity1 !== '' && amount1 !== ''){
            axios.post('http://localhost:3100/transfer', {
                socialSecurity1: socialSecurity1,
                amount1: parseFloat(amount1).toFixed(2)
            })
            .then(res => {
                if(res.data === 'sender Not found'){
                    alert('session over, please login again')
                    setTimeout(()=> {
                        window.location.href='/'
                    }, 1000)

                }else if(res.data === 'rec not exists'){
                    alert('receipient does not exists, please check the Social security again')

                }else if(res.data === 'fund not enough'){
                    alert(' you do not have enough fund\nplease change amount or deposit')

                }else{
                    alert('transfer success.\n Amount sent: '+ amount1);
                    setSenderName(res.data.senderName)
                    setSenderBalance(res.data.senderBalance)
                    setReceiverName(res.data.receiverName)
                }
            }).catch(err => console.log(err))
        }

    }


    return ( 
    <div className="transfer">
       This is Transfer page
       <hr />
       <label htmlFor="socialsecurity">receipient social security:</label><br />
       <input type="number"
        id="socialsecurity"
        value={socialSecurity1}
        onChange={e=> setSocialSecurity1(e.target.value)}
        /> <br />

        <label htmlFor="amount">How much you want to transfer?</label> <br />
        <input type="number" 
        id="amount"
        value={amount1}
        onChange={e=> setAmount1(e.target.value)}
        /> <br />

        <button onSubmit={handleSubmit}>Send</button> <br /><br />

        <div className="receipt">
          <h4>transaction info</h4> <br />
          <h5>sender name: {senderName}</h5><br />
          <h5>sender balance: {senderBalance}</h5> <br />
          <hr />
          <h5>receiver name: {receiverName}</h5><br />
          <h5>amount sent: {amount1}</h5>
        </div>
    </div> );
}
 
export default Transfer;
