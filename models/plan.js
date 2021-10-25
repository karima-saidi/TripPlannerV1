const mongoose = require('mongoose');
const planSchema = new mongoose.Schema({
    ville: String,
    NomSite: String,
    Adresse: String,
    image:String,
    created:{
        type: Date,
        required:true,
        default:Date.now,
    },
});

module.exports = mongoose.model("Plan",planSchema)
/*const planSchema = new mongoose.Schema({
    ville: String,
    Sites: [
            { SiteId: Number,
              NomSite: String,
              Adresse: String,
              reviews:[ 
                  { user_id:Number,
                    rating: Number,
                    comment:String}], 
            }],   
    Nombre_site:Number,
    TypePlan:{type:String,
      enum:['Custom','Predefinie'],
    },
    user_Id:Number,
})*/

/*
const siteSchema = new mongoose.Schema({
    SiteId: Number,
    NomSite: String,
    Adresse: String,
    reviews:[ {type: mongoose.Schema.Types.ObjectId, ref: 'reviewSchema'}],      
});

const reviewSchema = new mongoose.Schema({
        user_id:Number,
        rating: Number,
        comment:String,
     
});
const planSchema = new mongoose.Schema({
    ville: String,
    Sites: [{type: mongoose.Schema.Types.ObjectId, ref: 'siteSchema'}] ,     
    Nombre_site:Number,
    TypePlan:{
      default:"Custom,Predefinie",
    },
    user_Id:Number,
});

*/

 


