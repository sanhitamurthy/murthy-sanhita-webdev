var app=require('../../express');


var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];


app.post("/api/assignment/website/:websiteId/page",createPage);
app.get("/api/assignment/website/:websiteId/page",findPageByWebsiteId);
app.delete("/api/assignment/page/:pageId",deletePage);
app.get("/api/assignment/page/:pageId",findPageById);
app.put("/api/assignment/page/:pageId",updatePage);

function createPage(req, res){
    var page=req.body;
    var websiteId=req.params['websiteId'];
    page.websiteId=websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findPageByWebsiteId(req,res)
{
    var results = [];

    for (var w in pages) {
        if (pages[w].websiteId === req.params.websiteId) {
            results.push(pages[w]);
        }
    }

   res.json(results);
}

function deletePage(req,res){
    var pageId=req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id===pageId)
        {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}

function findPageById(req,res)
{
    var pageId=req.params['pageId'];
    for(var p in pages)
    {
        if(pages[p]._id===pageId) {
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);

}

function updatePage(req,res)
{
    var pageId=req.params['pageId'];
    var page=req.body;
    for(var p in pages)
    {
        if(pages[p]._id===pageId) {
            pages[p]=page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}






