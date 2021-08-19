const express = require("express");
const router = express.Router();

const User = require("../model/user");
const jwt = require("jsonwebtoken");

const {OAuth2Client} = require("google-auth-library");
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox94b1d3612cf34a7ca85900b0d870f7c2.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
const client = new OAuth2Client("412393827843-tnn3gfd4qjnuhb2oohinrc09svdvvr9o.apps.googleusercontent.com")

router.route("/signup").post((req,res)=>{
    
    const{firstname,lastname,email,password} = req.body;

    User.findOne({email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({error:"User with this email already exists"});
        }


        const token = jwt.sign({firstname,lastname,email,password},process.env.JWT_ACC_ACTIVATE,{expiresIn:"20m"});

        const data = {
            from: 'noreply@hello.com',
            to: email,
            subject: 'Account Activation Link',
            html:`<h1>Email Confirmation</h1>   
               <h2>Hello ${firstname}</h2>
               <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
               <a href="${process.env.CLIENT_URL}/authenticate/activate/email-activate/token=${token}>link</a>
        `
                                                                                                   
          
            
           
                 

                
        }
        mg.messages().send(data, function (error, body) {
            if(err){
                return res.json({
                    message:err.message
                })
            }
            return res.json({message:"Email has send, activate your account"})
        });
      
    })
})

router.route("/email-activate").post((req,res)=>{
    console.log(req);
   /* const {token} =req.body;
    

    if(token){
        jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
            if(err){
                return res.status(400).json({error:"expire link"})
            }
            const {firstname,lastname,email,password} = decodedToken;

            User.findOne({email}).exec((err,user)=>{
                if(user){
                    return res.status(400).json({error:"User with this email already exists"});
                }

                const newUser = new User({
                    firstname,
                    lastname,
                    email,
                    password
                })
        
              newUser.save().then(()=>{
                res.status(400).json({sucess:"User added"});
              }).catch((err)=>{
                  alert(err);
              })
        })
    })

}else{
    return res.json({error:"something went wrong"})
}
*/
})


router.route("/signin").post((req,res)=>{

       const {email,password} =req.body;

       User.findOne({email}).exec((err,user)=>{
           if(err){
               return res.status(400).json({
                   error:"invalid"
               })

           }
           if(user.password !== password){
               return res.json({
                   error:"email and password not match"
               })
           }
          const token = jwt.sign({_id:user.id},process.env.JWT_SIGNIN_KEY,{expiresIn:"20m"})
          const {_id,firstname,lastname,email} = user;

          res.json({
              token,
              user:{_id,firstname,lastname,email}
          })
       })
})

router.route("/googlelogin").post((res,req)=>{
  
    const {tokenId} = req.body;
    client.verifyIdToken({tokenId,audience:"412393827843-tnn3gfd4qjnuhb2oohinrc09svdvvr9o.apps.googleusercontent.com"}).then((response)=>{

        const {email_verified,firstname,email} = response.payload;

        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"This user doesnt exits"
                    })
                }
                else{
                    if(user){

                        const token = jwt.sign({_id:user.id},process.env.JWT_SIGNIN_KEY,{expiresIn:"20m"})
                        const {_id,firstname,lastname,email} = user;
              
                        res.json({
                            token,
                            user:{_id,firstname,lastname,email}
                        })
                    }else{

                        let password = email+process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({firstname,lastname,email,password})
                        newUser.save((err,user)=>{
                            if(err){
                                return res.status(400).json({
                                    error:""
                                })
                            }
                            const token = jwt.sign({_id:user.id},process.env.JWT_SIGNIN_KEY,{expiresIn:"20m"})
                            const {_id,firstname,lastname,email} = newUser;
                  
                            res.json({
                                token,
                                user:{_id,firstname,lastname,email}
                            })
                          
                        })
                    }
                }
            })
        }
    })



})
module.exports = router;