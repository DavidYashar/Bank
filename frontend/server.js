const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Customer = require('./module/customer');
const bcrypt = require('bcrypt');

const cors = require('cors');
server = express();
// const bodyParser = require("body-parser");

const DB = 'mongodb+srv://Yashar:33456Yashar@cluster0.wcrhxar.mongodb.net/customerInfo?retryWrites=true&w=majority'

mongoose.connect(DB)
.then((result)=> console.log('connected'+ result)
)


.catch((err)=> console.log(err))

server.use(cors()); 
server.use(express.json());


if(server.listen(3100)){
    console.log('listenning')
}else{
    console.log('error')
}







server.post('/', async (req, res)=> {
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
                    console.log(user+ ' found')
                    res.json('welcome');
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
        password:  hashed
    }

    
   
            const body = new Customer(data);
            
             body.save();
            res.json('registered')
            console.log('saved')
    
    
}catch(err){
    console.error(err)
}
    

   
    // res.send('ok, received');
    // console.log('saved')
    // res.json(body.names);

})
