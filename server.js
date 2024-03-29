const express = require('express');
const fs = require('fs')
const app= express();
const bodyParser=require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = process.env.PORT || 8080;

const nodemailer=require('nodemailer');
const {google}=require('googleapis');

const CLIENT_ID='488344336628-jtdpe7bf1fk7be0v4lso2bcggtakicb8.apps.googleusercontent.com';
const CLIENT_SECRET='Iwf08Mst_1QpiYAuDpimsrbW';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04uCEvQv4zweyCgYIARAAGAQSNwF-L9IrQJxZW4rFNVPARtiICdPvZcuwqKLuwHK045IWsc4IP8oXD3QwQ0FouuQKohi_p3Rs_Tc';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


var mailinfo;
try {
  mailinfo = fs.readFileSync('./mailinfo.txt', 'utf8')
//   console.log(mailinfo)
} catch (err) {
  console.error(err)
}


console.log(mailinfo)


async function sendMail(sendTo){
    try{
       const accessToken = await oAuth2Client.getAccessToken()
       const transport = nodemailer.createTransport({
           service: 'gmail',
           auth : {
               type : 'OAuth2',
               user: 'nw.plus.project@gmail.com',
               clientId : CLIENT_ID,
               clientSecret : CLIENT_SECRET,
               refreshToken : REFRESH_TOKEN,
               accessToken : accessToken
           }
       })

       const mailOptions= {
           from: 'Aryan <nw.plus.project@gmail.com>',
           to: sendTo,
           subject: "Hello World from MailBot9000!",
           text: '*ignored* lol',
           html: mailinfo
       };
       
       const result = await transport.sendMail(mailOptions);
       return result
    }catch(error){
        return error;
    }
} 

let User = require('./models/user.model');



app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nwUsers',{ useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established successfully");
})

userRoutes.route('/').get(function(req,res){
    User.find(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users)
        }
    });
});




userRoutes.route('/:id').get(function(req,res){
    let id=req.params.id;
    User.findById(id,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.json(user)
        }
    });
});

userRoutes.route('/register').post(function(req,res){
    let user= new User(req.body);
    user.save()
        .then(todo=>{
            res.status(200).json({'user':'Registered successfully'});
        })
        .catch(err=>{
            res.status(400).send('Registration Unsuccessful');
        });
});

userRoutes.route('/update/:id').post(function(req,res){
    User.findById(req.params.id, function(err,user){
        if(!user)
            res.status(404).send('No record found');
        else
            user.u_firstname=req.body.u_firstname;
            user.u_lastname=req.body.u_lastname;
            user.u_email=req.body.u_email;
            user.u_major=req.body.u_major;
            user.u_area=req.body.u_area;
            user.u_status=req.body.u_status;
            user.save().then(user=>{
                res.json('User Info Updated');
            })
            .catch(err=>{
                res.status(400).send("Update Unsuccessful")
            })
    });
});

userRoutes.route('/sendmail/').post(function(req,res){
    var obj_ids=(req.body).ids;
    User.find({_id: {$in: obj_ids}},function(err, user){
        if (err){res.send(err);}
    
        const emails=user.map(function(a) {return a.u_email;});
        sendMail(emails);
        res.json(emails);
        console.log(emails);
    });
});


userRoutes.route('/delete/:id').get(function(req,res){
    let id=req.params.id;
    User.findByIdAndDelete(id,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    });
});





app.use('/users',userRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'nwFrontend/build')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.join(__dirname,'nwFrontend','build','index.html'));
    });
}


app.listen(PORT, function(){
    console.log("Server is running on PORT : " + PORT);
});