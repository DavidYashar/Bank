const express = require('express');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const Customer = require('./module/customer');
const bcrypt = require('bcrypt');
const store = new sessions.MemoryStore();

const cors = require('cors');
// const sessions = require('express-session');
server = express();
// const bodyParser = require("body-parser");

const DB = 'mongodb+srv://Yashar:33456Yashar@cluster0.wcrhxar.mongodb.net/customerInfo?retryWrites=true&w=majority'

mongoose.connect(DB)
.then((result)=> console.log('connected'+ result)
)


.catch((err)=> console.log(err))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
server.use(cors(corsOptions)); 
server.use(express.json());


if(server.listen(3100)){
    console.log('listenning')
}else{
    console.log('error')
}


// initialize session



server.use(sessions({
    secret: 'Thisiauthenticationsecretkeyforlogin',
    cookie:{
        maxAge: 30000
    },
    saveUninitialized:true,
  resave: false,
  store
}))

server.use(cookieParser());


// server.use((req,res, next)=> {
//     console.log(store)
//     console.log(`${req.method}-${req.url}}`);
//     next();
// })


// const isAuth = (req, res, next) => {
//     if(req.session.isAuth){
//         next()
//     }else{
//         console.log('not authenticated')
//     }
// }
// const session= {};
server.post('/',  async (req, res)=> {
    const {email, password}= req.body;
    
    try{
        const user =await Customer.findOne({email: email});
        
        if(!user){
            res.json( 'authentication failed');
            console.log('not found')
        }else{

            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    console.error(err);
                    res.status(500).json('internal server error');
                }else if(result){
                    // if(req.session.authenticated){
                        
                    //    res.json(req.session);
                       
                    // }
                    // console.log(store);
                    req.session.userId = user.email;
                    console.log(user+ ' found');

                    res.json('welcome'+user);
                //    const sessionToken = uuid.v4();
                //    const Expires = new Date().setMinutes(new Date().getMinutes() +5)
              
                //       session[sessionToken]= {
                //         Expires,
                //         userId: user.email
                //       };
                
                // let session = req.session;
                //    session.userId = req.session.email;
                
                   console.log(req.session)
                   console.log(req.session.id)
                //       res.cookie( req.session);

                    // console.log(req.session);
                    
                    // res.json(req.session);
                    
                }else{
                    console.log('password incorrect');
                    res.json('password incorrect')
                }
            })
            
           
        }
    }catch(err){
        console.error(err.message)
        res.status(500).json('Internal Server Error');
    }
    
})





server.post('/receive', async (req, res)=> {

    // const received = req.body;
try{

    const hashed =await bcrypt.hash(req.body.password, 10);

    const data = {
        names: req.body.names,
        email: req.body.email,
        socialSecurity: req.body.socialSecurity,
        password:  hashed,
        balance:0
    }

    
   
            const body = new Customer(data);
            
             body.save();
            res.json('registered')
            console.log('saved')
    
    
}catch(err){
    console.error(err)
}
    

})



server.post('/deposit', async (req, res) => {
    console.log(req.body)
    console.log('cookie is '+req.cookie)
    const {balance} = req.body;
    const userId = req.session.userId;

    try{

        const user = await Customer.findOne({email: userId});

        if(!user){
            console.log(user+ 'not found')
            console.log(balance)
            console.log(userId)
            return res.json('user Not found');
        }else{
            user.balance+= parseFloat(balance);

            await user.save();
            return res.json('deposit successful');
        }

   
    }catch(e){
      
        console.log(e);
        return res.status(500).json('internal server error');
    }
})
