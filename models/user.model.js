const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User= new Schema({
    u_firstname:{
        type: String
    },
    u_lastname:{
        type: String
    },
    u_email:{
        type: String
    },
    u_major:{
        type: String
    },
    u_area:{
        type: String
    },
    u_status: {
        type: Boolean
    }
});

module.exports = mongoose.model('User',User)