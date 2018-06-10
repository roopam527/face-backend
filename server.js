const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register= require('./controllers/Register');
const signin = require('./controllers/signin');
const profile = require("./controllers/profile");
const image = require("./controllers/image")
const db =knex({
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : 'rgdatabase',
            database : 'smartbrain'
          }
      });

app.use(bodyParser.json());
app.use(cors())


app.get("/",(req,res)=>{
    res.send(database.users);

})

app.post("/signin",(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})

app.post("/register",(req,res) =>{register.handleRegistration(req,res,db,bcrypt)})

app.put("/image",(req,res) => {image.handleImage(req,res,db)})

app.post("/imageUrl",(req,res) => {image.handleApiCall(req,res,db)})

app.get("/profile/:id",(req,res) => profile.handleApiCall(req,res))

app.listen(8000,() =>{
    console.log("App is running at port 8000");
})

/**
/ -->res = this is woorking
/ -->signIn --> POST = success/fail
/register -->POST = new User
/profile/:userId --> GET =user
/Image -->PUT -->user 

 */