var app = require('./express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser = require('body-parser'); //parse json data
//from form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret:"put some text here"}));

require('./lectures/session/app');


app.set('view engine', 'ejs');
require('./utilities/filelist');

// app.get('/givemetheposts',function(req,res){
//     res.send({message:'hello from the server'});
// })

app.use(app.express.static(__dirname + '/public'));

require('./test/app');

var myApp=require('./lectures/app');
// console.log(myApp)
// myApp.sayHello();

//prints in to the console
myApp(app);

require('./assignment/app');

app.listen(process.env.PORT || 3000);
