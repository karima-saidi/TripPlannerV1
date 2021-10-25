const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage:storage,
}).single("image");


router.post('/add',upload,(req,res)=>{
    const plan = new Plan({
        ville:req.body.ville,
        NomSite:req.body.nomSite,
        Adresse:req.body.addressSite,
        //image:req.file.filename,
     });
    console.log(req.body);
    plan.save((err)=>{
        if(err){
            res.json({message:err.message,type:'danger'});
        } else{
            req.session.message ={
                type:'success',
                message:'Plan added successfully'
            };
            res.redirect("/")
        }
    });
});
    
//Get All Plan
router.get('/',(req,res)=>{
    Plan.find().exec((err,plans) => {
        if(err){
        res.json({message:err.message});
        } else {
            res.render("index",{
                title: "Home page",
                plans : plans,
            });
    }
});  
});

router.get('/add',(req,res)=>{
    res.render('add_Plan',{title:"Add Plans"});
});

//Edit an plan
router.get('/edit/:id',(req,res) =>{
    let id=req.params.id;
    Plan.findById(id,(err,plan) =>{
        if(err){
            res.redirect("/");
        }else {
            if(plan == null){
                res.redirect("/");
            }else {
                res.render("edit_Plan",{
                    title:"Edit Plan",
                    plan:plan,
                });
            }
        }
    });
});

router.post('/update/:id',(req,res) =>{
    let id=req.params.id;
    Plan.findByIdAndUpdate(id,{
        ville:req.body.ville,
        NomSite:req.body.nomSite,
        Adresse:req.body.addressSite,
    }, (err,result) =>{
        if(err){
            res.json({ message:err.message,type:'danger'});
        }else {
            req.session.message ={
                type:'success',
                message:'Plan updated successfully'
            };
            res.redirect('/');
        }
    });
});

// Delete plan
router.get('/delete/:id',(req,res) =>{
    let id = req.params.id;
    Plan.findByIdAndRemove(id,(err,result) => {
        if(err){
            res.json({message:err.message});
        } else {
            req.session.message ={
                type:'info',
                message:'Plan deleted successfully!'
            };
            res.redirect("/");
        }
    })
})

module.exports = router;