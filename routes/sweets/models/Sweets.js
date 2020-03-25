const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SweetsSchema = new mongoose.Schema({
   // chocolate: { type: String, default: '',  },
    //sour: { type: String,  lowercase: true,  },
    //sweet: { type: String,  },
    name: {type: String, lowercase: true, unique:true, trim: true},
    type: {type: String, lowercase: true, trim: true},

});

module.exports = mongoose.model('Sweet', SweetsSchema);