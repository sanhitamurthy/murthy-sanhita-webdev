var express=require('express');
var app=express(); //creates instance

// app.get('/hello',function(req,res){
//
//     res.send({message:"Hello from server"});
// })

app.use(express.static(__dirname+'/public'));

var ourApp=require('./lectures/evening/angular/app');
ourApp(app);
app.listen(5000);
