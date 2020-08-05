//jshint esversion: 6
const express = require('express');
const bodyParser= require('body-parser');
const request= require('request');
const https=require('https');

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req,res){

res.sendFile(__dirname+"/signup.html");

})


app.post("/",function(req, res){
var firstname=req.body.firstname;
var lastname=req.body.lastname;
var email=req.body.email;
var sbscription = "subscribed";
var data={
  members:[
    {
      email_address: email,
      status: sbscription,
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
};

var jsondata= JSON.stringify(data);
console.log(jsondata);
var url="https://us17.api.mailchimp.com/3.0/lists/b324c0e5ea";
var options={
  method:"POST",
  auth:"Malatesha:14aaa4ea2f26bef5b5ea68e4320974f4-us17"
}

const request= https.request(url,options,function(response){

  if(response.statusCode==200)
  res.sendFile(__dirname+"/success.html");

if(response.statusCode!=200)
res.sendFile(__dirname+"/failure.html");

response.on("data", function(data){
console.log(JSON.parse(data));

  })
})

request.write(jsondata);
request.end();
console.log(firstname, lastname, email);
});


app.post("/failure", function(req, res){
  res.redirect('/');
})
app.listen(process.env.PORT || 3000,function(){
  console.log( "server listening on port 3000");
});
// API KEY - 14aaa4ea2f26bef5b5ea68e4320974f4-us17
//audiencE LIST ID - b324c0e5ea
