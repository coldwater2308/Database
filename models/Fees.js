
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Fees = new Schema({

     file: {type : String},
      batch : {type : Number},
      sem : {type : Number},
      amount : {type : Number},
      year : {type : Number}
    
},{
    timestamps : true
});

module.exports = mongoose.model('Fees', Fees);