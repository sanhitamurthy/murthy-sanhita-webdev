const app=require('../../express')

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
    var newWidgetList=req.body;

    if(initial===final){
        res.sendStatus(200);
    }
    else{
        for(var n in newWidgetList)
        {
            for(var w in widgets)
            {
                if(widgets[w]._id===newWidgetList[n]){
                    widgets[w].index=n;
                }

            }
        }
        res.sendStatus(200);
    }
}



function createWidget(req, res){

    var widget=req.body;
    var pageId=req.params["pageId"];

    if(!widget._id) {
        widget._id = (new Date()).getTime() + "";
    }
    widget.pageId=pageId;
    widgets.push(widget);
    res.json(widget);
}


function deleteWidget(req,res){
    var widgetId=req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id===widgetId)
        {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}



function findWidgetById(req,res)
{
    var widgetId=req.params['widgetId'];
    for(var p in widgets)
    {
        if(widgets[p]._id===widgetId) {
            res.send(widgets[p]);
            return;
        }
    }
    res.sendStatus(404);

}


function findWidgetsByPageId(req,res)
{
    var results=[];

    for(var w in widgets)
    {
        if(widgets[w].pageId===req.params.pageId){
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function updateWidget(req,res){
    var widgetId=req.params['widgetId'];
    var widget=req.body;
    for(var w in widgets)
    {
        if(widgets[w]._id===widgetId) {
            widgets[w]=widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
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

        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId+"/widget";

        res.redirect(callbackUrl);
    }

function getWidgetById(widgetId){
    return widget=widgets.find(function(widget){
        return widget._id===widgetId;
    });
}