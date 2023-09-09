const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const Customer = require('./module/customer');
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




server.post('/receive', (req, res)=> {
    const body = new Customer(req.body);
    body.save()
    // res.send('ok, received');
    console.log('saved')
    res.json(body.names);

})


server.get('/', (req, res)=> {
    res.send('sending info')
})