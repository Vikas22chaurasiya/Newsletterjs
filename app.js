const express  = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const data ={
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
            }

        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/515671841b";

    const options={
        method:"POST",
        auth:"vikas:"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");

        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
        })

    })

    request.write(jsonData);
    request.end();


    

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})

