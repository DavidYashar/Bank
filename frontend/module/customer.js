const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Decimal = require('decimal.js');

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
        type: mongoose.Types.Decimal128,
        
       
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
