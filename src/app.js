const express = require ("express");
const app = express();
const multer = require("multer")
const nodemailer =  require("nodemailer");
const fs = require('fs');

const bodyParser = require("body-parser")
const path = require('path');
const port = process.env.PORT | 8000;



const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var name;
var email;
var phone;
var message;
var uppath;

var Storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, './images');
    },
    filename: function(req,file,callback){
        callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname);
    }
})

var upload = multer({
    storage:Storage
}).single("image");

app.set("view engine","ejs");

app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/submitted",(req,res)=>{
    res.render("submitted")
})

app.post("/sendmail",(req,res)=>{
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.send("Something went wrrong")
        }
        else{
            name = req.body.name
            email = req.body.email
            phone = req.body.phone
            message = req.body.message

            uppath = req.file.path

            console.log(name);
            console.log(email);
            console.log(phone);
            console.log(message);
            console.log(uppath);

            var Transporter = nodemailer.createTransport({
                service : "gmail",
                auth:{
                    user: "musicoholiq@gmail.com",
                    pass:"nrbvwsapryknbtyu"
                }
            });

            var mailDetails = {
                from:"musicoholiq@gmail.com",
                to:email,
                subject: message,
                text: message,
                attachments:[
                    {
                        path: uppath
                    }
                ]
            };

            Transporter.sendMail(mailDetails,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email Sent" + info.response)

                    fs.unlink(uppath,function(err){
                        if(err){
                            return res.send(err)
                        }
                        else{
                            console.log("deleted")
                            return res.redirect("/submitted")
                        }
                    })
                }
            })
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})