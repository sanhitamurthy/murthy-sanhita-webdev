var app = require('./express');
var bodyParser = require('body-parser'); //parse json data
//from form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
myApp(app)

app.listen(process.env.PORT || 3000);
