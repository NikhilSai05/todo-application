var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var todoRoutes=require("./routes/todo");
const db = require("./models/index") 

db.mongoose.connect(
    'mongodb://127.0.0.1:27017/Todo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(()=> {
    console.log("connected to DB")
})
.catch((err) => {
    console.log(err, "Error Connecting to DB")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));

app.use("/api/todo",todoRoutes);

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.listen(5000,function(){
    console.log("Server Started");
});