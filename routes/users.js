const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const User = require('../models/User');






router.post('/sign_up', (req,res,next) =>{ 

    User.find({ email:req.body.email})
      .exec()
      .then(User =>{
          if(User.length>=1){
          return res.status(409).json(
          {
              message:'Email Already registred'
          });
        }else
        {
    bcrypt.hash(req.body.password,saltRounds, (err ,hash) =>
     {
         if(err)
         {
             return res.status(500).json({
                 error: err
             });
         }
         else{
            const User = new User({
           // id:new Mongoose.prototype.ObjectID(),
            name :req.body.name, 
            contactNumber :req.body.contactNumber, 
            email :req.body.email,
            password:hash

         });
         User.save()
         .then(result =>
            {
                console.log(result);
                res.status(201).json({
                    message: 'User  created'
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error:err});
            

            });
        
        }
     });

        }

    });
});
router.delete("/", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});



module.exports = router;