const mongoose = require('mongoose');
const schema = mongoose.Schema;


const customerSchema = new schema({
    names:{
        type: String,
      
    },
    email: {
        type: String,
       
    },
    socialSecurity:{
        type: Number,
        
       
    },
    password:{
        type: String,
        
        
    },
    balance: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
