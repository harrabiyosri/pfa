const mongoose = require('mongoose'); 

const starSchema = new mongoose.Schema(
    { 
        
        RecepteurId : {
            type : String , 
            //required : true
        }, 
        message : {
            type : String , 
           // required : true
        }, 
        nbStars : {
            type : [Number], 
            //required : true
        }, 
          
    } ,
    {
        timestamps : true,
    }
); 

module.exports = mongoose.model('star', starSchema);