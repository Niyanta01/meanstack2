const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const winston = require("winston");
const config = require("config");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: "http://localhost:4200"
}));


winston.add(winston.transports.File,{filename:"./log/logfile.log"});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server at localhost " + port);
    winston.log("info", "server at localhost " + port);
});

const db_conn = config.get("db.conn_str");

winston.log("info", db_conn);


mongoose.connect(db_conn, {
        useNewUrlParser: true
    })
    .then(() => {   
        console.log("database connected");
        winston.log("info","database connected");
    })
    .catch((e) => {
        console.log(e.message);
        winston.log("error", e.message);
    });


const userSchema = mongoose.Schema({
        "username": {type: String},
        "password": {type: String},
        "firstname": {type: String},
        "lastname": {type: String}
    });
    
userSchema.methods.joiValidate = function(obj) {

	var schema = {
		username: Joi.types.String().required(),
		password: Joi.types.String().min(8).required(),
		first_name: Joi.types.String().required(),
		last_name: Joi.types.String().required(),
	}
	return Joi.validate(obj, schema);
};

const user = mongoose.model("users", userSchema);

const postSchema = mongoose.Schema({
        "username": {type: String },
        "postTitle": {type: String},
        "postDescription": {type: String },
        "likes":{ type:[String] }
    });
  
postSchema.methods.joiValidate = function(obj2) {

        var schema2 = {
            username: Joi.types.String().required(),
            postTitle: Joi.types.String().required(),
            postDescription: Joi.types.String().required(),
            likes: Joi.types.Array(),
        }
        return Joi.validate(obj2, schema2);
};

const postModel = mongoose.model("posts", postSchema);

const commentSchema = mongoose.Schema({
   "comment":{ type: String, required:true},
   "post_id":{
        type: mongoose.Schema.Types.ObjectId,
        refer : "posts"
   }
});

const commentsModel = mongoose.model("comments", commentSchema);


app.post("/signup", async (req, res) => {
    try {
        const check_data = await user.find({
            username: req.body.username
        });

        if (check_data.length > 0) {
         console.log("error");

        } else {
            const user_doc = new user(req.body);
            user_doc.save().then((result) => {
                res.status(200).send(result);
            }).
            catch((ex) => {
                res.status(400).send(ex.message);
            });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }


});

app.post("/login", async (req, res) => {
    try {
        
        const login_detail = req.body;
        
        // console.log("login_detail");
        // console.log(login_detail);
       

        const result = await user.find({
            username: login_detail.username,
            password: login_detail.password
        });      
        // console.log("result");
        // console.log(result);
        if (result.length > 0) {

            const token = jwt.sign({
                "username": result[0].username,
                "_id": result[0].id
            }, 'secretValue');

        //    console.log("token");
        //     console.log(token);

            res.json({
                status :200,
                token: token,
                data : result,
                isLoggedIn:true
            });
        } 
        else {

           // res.send("invalid");
            res.send({
                status:400,
                isLoggedIn:false
            });
        }
    } catch (ex) {
        res.status(403).send(ex);
    }
});


app.use((req, res, next)=>{
    const token = req.headers.token;
   
       //console.log("token");
       //console.log(req.headers);
      
       if(!token){
        console.log("in if");
           res.send("error");
       }
       else{
         jwt.verify(token, 'secretValue', (err, decoded) =>{
     
           if(err){
            console.log("in err");
             res.send(err);
           }
           else{
             req.decoded = decoded;   
             //console.log("in else");
             //console.log(req.decoded);    
             next();
           }
         });
       } 
   });


app.get("/usernameForHome", (req, res)=>{

   // console.log(req.decoded.username);
    user.find({username:req.decoded.username})
    .then((data)=>{   
       // console.log(data); 
        res.status(200).send(data);
    })
    .catch((ex) =>{
        res.status(400).send(ex.message);
    });

});
   
app.post("/createPost",  (req, res) => {

    req.body.username = req.decoded.username;
    const post_doc = new postModel(req.body);
    post_doc.save().then((result) => {
        res.status(200).send(result);
    }).
    catch((ex) => {
        res.status(400).send(ex.message);
    });
       
});

app.get("/listPost", (req,res)=>{  

    postModel.find({})
    .then((data)=>{   
        //console.log(data); 
        res.status(200).send(data);
    })
    .catch((ex) =>{
        res.status(400).send(ex.message);
    });

});


app.post("/deletePost", (req,res)=>{

    // console.log(req.body);
    postModel.deleteOne({_id: req.body.id})
         .then((data)=>{
 
             res.status(200).send(data);
            //  console.log("data");
            //  console.log(data);
         })
         .catch((ex) =>{
             res.status(400).send(ex.message);
         });
 });

app.post("/createComment", (req,res)=>{

    const comment_doc = new commentsModel(req.body);
    comment_doc.save().then((result) => {
        //console.log("inside create");
       // console.log(req.body);
        res.status(200).send(result);
    }).
    catch((ex) => {
        res.status(400).send(ex.message);
    });

});

app.post("/getComments",(req,res)=>{

  // console.log(req.body);
    commentsModel.find({post_id:req.body.post_id})
        .then((result)=>{
            //console.log("inside get comments");
            //console.log(req.body);
            res.status(200).send(result);
        })
        .catch((ex) => {
        res.status(400).send(ex.message);
    });
});

app.post("/likePost",(req,res)=>{

    const username_like = req.decoded.username;
    postModel.findOneAndUpdate({_id: req.body.id},{$push: {likes:username_like}},{new:true})
            .then((data) => {
                 //console.log(req.body);
                res.status(200).send(data);
            
            })
            .catch((ex) => {
                res.status(400).send(ex.message);
            })


});

app.post("/getValueforLike",(req,res)=>{

  
    postModel.find({_id: req.body.id})
        .select('likes -_id')
            .then((data) => {
                 //console.log(req.body);
                 //console.log("kwhf");
               // console.log(data);
                res.status(200).send(data);
                
            })
            .catch((ex) => {
                res.status(400).send(ex.message);
            })
});

app.post("/getUsernameforLike", (req, res)=>{

    postModel.find({_id: req.body.id})
    .distinct('likes')
    .then((data)=>{   
       // console.log(data); 
        res.status(200).send(data);
    })
    .catch((ex) =>{  
        res.status(400).send(ex.message);
    });

})

app.post("/editPost", (req,res)=>{  

   // console.log(req.body);
    postModel.update({_id: req.body.post_id},{$set: {postDescription:req.body.postDescription }}, {new: true})
    .then((data) => {
        res.status(200).send(data);
 
        //console.log(data);
    })
    .catch((ex) => {
        res.status(400).send(ex.message);
    })
 
 });
