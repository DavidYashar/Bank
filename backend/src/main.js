import axios from 'axios';
import {useState} from 'react';
import {isEmail, isInt} from 'validator';
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
    const history = useNavigate();
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [socialSecurity, setSocialSecurity] = useState('');
    const [password, setPassword]= useState('');



    const checkName = ()=> {

        const nameReg =  /^[A-Za-z\s]+$/;
         if(nameReg.test(names)){
            console.log('name is valid');
            setNames(names)
            return nameReg.test(names)
         }else{
           console.log('names is INVALID')
         }
      
    }


    const checkEmail = ()=> {
        if(isEmail(email)){
            setEmail(email)
            console.log('email valid')
            return true;
        }else{
            console.log('email not valid')
            setEmail('')
            return false;
        }
       }

   

       const checkSecurity = ()=> {
        if(isInt(socialSecurity) && socialSecurity.length ===8){
            setSocialSecurity(socialSecurity);
            console.log('social security is valid')
            return true;
        }else{
            console.log('social security is invalid')
            setSocialSecurity('');
            return false;
        }
       }



       const checkPass = ()=> {
        if(isInt(password) && password.length === 6){
            setPassword(password)
            console.log('password is valid')
            return true;
        }else{
            console.log('password is invalid')
            setPassword('')
            return false;
        }
       }


   
       
        
      
       
        
            
          
      
          
     
  


const handleClick = ()=> {
    if(checkPass() === true && checkEmail()=== true  && checkSecurity() === true && checkName()  === true){
        axios.post('http://localhost:3100/receive', {
            names: names,
            email: email,
            socialSecurity: socialSecurity,
            password:password
    
        }).then(res =>{

            if(res.data === 'registered'){
                history('/Login', {state: {id: email}})
            }
            console.log(res)
        })
        
        .catch(err => console.log(err))
        setEmail('')
        setNames('')
        setPassword('')
        setSocialSecurity('')
    }
    
    }
    


    return ( 
        <div className="main">

            <div className="welcome">
             <h1>Welcome to Yashar Bank</h1>
             <h3>We are a first international bank</h3>
            </div>

           <div className="signin">
            <hr />
            <h4>Please open an account:</h4>
            
                <label htmlFor="names">Name:</label><br />
                <input type="text" id="names" name="names"
                value={names}
                onChange={e =>setNames(e.target.value) }/><br />

                <label htmlFor="email">email:</label><br />
                <input type="text" id="email" name="email"
                value={email}
                onChange={e =>setEmail(e.target.value) }/><br />

                <label htmlFor="socialSecurity">Social Security</label><br />
                <input type="text"  id="socialSecurity" name="socialSecurity" 
                value={socialSecurity}
                onChange={e =>setSocialSecurity(e.target.value) }/><br />

                <label htmlFor="password">password:</label><br />
                <input type="text" id="password" name="password"
                value={password}
                onChange={e => setPassword(e.target.value) }/><br />

                <button onClick={handleClick}>Submit</button><br />




             <Link to='/Login'>Or Login</Link>


            {/* <h2>click to send data</h2>
            <button onClick={handleClick}>click me</button> */}
           </div>

            
        </div>
     );
}
 
export default Main;
