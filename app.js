var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var todoRoutes=require("./routes/todo"); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("home");
});
app.use("/api/todo",todoRoutes);
app.listen(3000,function(){
    console.log("Server Started");
});