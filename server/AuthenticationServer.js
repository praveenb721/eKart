var express = require ('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post ('/login', (req, res) => {
    console.log("validating");
    if(req.body.userId==='praveenb721' && req.body.userPassword === "Inspire72#")
        res.send("valid");
    else
        res.send("Invalid credentials...");
        
});


app.listen(1020,()=>{
    console.log("listening at 1020");
});