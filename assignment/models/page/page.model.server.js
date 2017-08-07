var mongoose=require('mongoose');
var pageSchema=require('./page.schema.server');
var websiteModel=require('../website/website.model.server');
var pageModel=mongoose.model('pageModel',pageSchema);

pageModel.findPagesForWebsite=findPagesForWebsite;
pageModel.findPageById=findPageById;
pageModel.addWidget=addWidget;
pageModel.deleteWidget=deleteWidget;
pageModel.createPage=createPage;
pageModel.updatePage=updatePage;
pageModel.deletePage=deletePage;

module.exports=pageModel;



function updatePage(pageId,page){
    return pageModel.update({_id:pageId},{$set:page});

}


function deletePage(websiteId,pageId)
{
    return pageModel
        .remove({_id:pageId})
        .then(function(status){
            return websiteModel
                .deleteWebsite(websiteId,pageId);
        })
}

function createPage(websiteId,page){
    page._website=websiteId;
    return pageModel
        .create(page)
        .then(function(page){
            return websiteModel
                .addWebsite(websiteId,page._id)
        });
}


function findPagesForWebsite(websiteId){
    return pageModel
        .find({_website:websiteId})
        .populate('_website')
        .exec();

}


function addWidget(pageId,widgetId)
{
    return pageModel
        .findPageById(pageId)
        .then(function(page){
            page.widgets.push(widgetId);
            return page.save();
        });
}


function findPageById(pageId){
    return pageModel.findById(pageId);
}

function deleteWidget(pageId,widgetId){
    return pageModel
        .findPageById(pageId)
        .then(function(page){
            var index=user.widget.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        });
}



