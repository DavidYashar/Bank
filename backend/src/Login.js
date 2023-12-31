import { Link} from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import {isEmail, isInt} from 'validator';


const Login = () => {
    // const history = useNavigate();
    // const location = useLocation();
    const[password, setPassword] = useState('');
    const [email, setEmail]= useState('');





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





   const login = ()=> {
    if(checkEmail() ===true && checkPass() === true){

        axios.post('http://localhost:3100/', {
            email: email,
             password: password
         }
         ,{
            withCredentials: true,
         }
         ).then(res=> 
            // res.data)
          {
              
             if(res.data.includes('welcome') ){
                setTimeout(()=> {
                    window.location.href= '/Atm'
                }, 1000)
         } else{
             console.log('user not found')
         }
         })
     
    }
       
   }



    return ( 
        <div className="login">
        <h2>Welcome, please log in </h2>
        <div className="usePass">
            <label htmlFor="email">Email:</label><br />
            <input type="text"
             name="emails"
              id="emails"
                value={email}
                 onChange={e=> setEmail(e.target.value)}
                 /><br />

            <label htmlFor="password">password:</label><br />
            <input type="password"
             name="password"
              id="password" 
              value={password}
               onChange={e=>setPassword(e.target.value)}
               /><br />

            <button onClick={login}>Submit</button><br />

            <Link to='/SignUp'>Or sign up</Link>
        </div>
        </div>
     );
}
 
export default Login;
