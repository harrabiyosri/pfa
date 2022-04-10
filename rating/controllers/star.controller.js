const starModel = require('../models/star.model'); 
const ObjectID = require("mongoose").Types.ObjectId; 

module.exports.donnerStar =  async(req,res) =>{
    const newStar = new starModel ({
        recepteurId: req.body.recepteurId, 
        message : req.body.message, 
        nbStars: [req.body.nbStars] ,
        
    }); 
    try{
        const star = await newStar.save(); 
        return res.status(201).json(star);
    }catch(err){
        return res.status(400).send(err);
    }
};