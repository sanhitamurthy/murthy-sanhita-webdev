const app=require('../../express');
var widgetModel=require('../models/widget/wiget.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


var widgets=[
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];



app.post("/api/assignment/page/:pageId/widget",createWidget);
app.get("/api/assignment/page/:pageId/widget",findWidgetsByPageId);
app.delete("/api/assignment/widget/:widgetId",deleteWidget);
app.get("/api/assignment/widget/:widgetId",findWidgetById);
app.put("/api/assignment/widget/:widgetId",updateWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/assignment/page/:pageId/widget",sortWidget);

function sortWidget(req,res)
{
    var pageId=req.params['pageId'];
    var initial=req.query['initial'];
    var final=req.query['final'];
    //var newWidgetList=req.body;

    widgetModel
        .reorderWidget(pageId,initial,final)
        .then(function(response){
            res.send(response);
},function(error){
            res.send(error);
        });


    // if(initial===final){
    //     res.sendStatus(200);
    // }
    // else{
    //     for(var n in newWidgetList)
    //     {
    //         for(var w in widgets)
    //         {
    //             if(widgets[w]._id===newWidgetList[n]){
    //                 widgets[w].index=n;
    //             }
    //
    //         }
    //     }
    //     res.sendStatus(200);
    // }
}



function createWidget(req, res){

    var widget=req.body;
    var pageId=req.params.pageId;

    widgetModel
        .createWidget(pageId,widget)
        .then(function(widget){
            res.send(widget);
        }, function (error) {
            res.send(error);
        });
}


function deleteWidget(req,res){
    var widgetId=req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then(function(status){
            res.send(status);
        })




}



function findWidgetById(req,res)
{
    var widgetId=req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        });

}


function findWidgetsByPageId(req,res)
{
    var pageId=req.params.pageId;

    widgetModel
        .findWidgetsForPage(pageId)
        .then(function(widgets){
            res.json(widgets);
        });
}

function updateWidget(req,res){
    var widgetId=req.params['widgetId'];
    var widget=req.body;

    widgetModel
        .updateWidget(widgetId,widget)
        .then(function(status){
            res.sendStatus(200);
        });
}


    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.url = '/assignment/uploads/' + filename;

        widgetModel
            .updateWidget(widgetId,widget)
            .then(function(status){
                res.sendStatus(200);
            });
        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId+"/widget";

        res.redirect(callbackUrl);
    }

function getWidgetById(widgetId){
     return widgetModel.findWidgetById(widgetId);
}