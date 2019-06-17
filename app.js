var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/restful_blog_app",{useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var blogSchema = new mongoose.Schema({
    title: String,
    Image: String,
    body: String,
    created:{type: Date, default: Date.now },

});

var Blog = mongoose.model("Blog", blogSchema);

// Test blog 
Blog.create({
    title: "Test blog",
    Image: "https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    body: "What the fuck!!",
});

//  RESTful routes 

app.get("/",function(req,res){
    res.redirect("/blogs");
});


app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {bg: blogs});
        }
    });
});
















// ===========================================================================================
// listening port at 3000
app.listen(3000, function(req,res){
    console.log("Server has started... at port 3000..");
});