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
        type: Number,
        
        
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;