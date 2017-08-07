var mongoose=require('mongoose');
var websiteSchema=require('./website.schema.server');
var websiteModel=mongoose.model('websiteModel',websiteSchema);
var userModel=require('../user/user.model.server');

websiteModel.findAllWebsites=findAllWebsites;
websiteModel.findAllWebsiteForUser=findAllWebsiteForUser;
websiteModel.createWebsiteForUser=createWebsiteForUser;
websiteModel.deleteWebsiteFromUser=deleteWebsiteFromUser;
websiteModel.updateWebsite=updateWebsite;
websiteModel.findWebsiteById=findWebsiteById;
// websiteModel.deleteWebsite=deleteWebsite;
websiteModel.addPage=addPage;
websiteModel.deletePage=deletePage;


module.exports=websiteModel;


function addPage(websiteId,pageId)
{
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website){
            website.pages.push(pageId);
            return website.save();
        });
}


function deletePage(websiteId,pageId){
    return websiteModel
        .findUserById(websiteId)
        .then(function(website){
            var index=user.pages.indexOf(pageId);
            website.pages.splice(index,1);
            return website.save();
        });
}

// function deleteWebsite(websiteId){
//
//     return websiteModel
//         .remove({_id:websiteId})
//         .then(function(status){
//             return userModel
//                 .deleteWebsite(userId,websiteId);
//         })
//
// }

function findWebsiteById(websiteId){
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId,website){
    return websiteModel.update({_id:websiteId},{$set:website});

}
function deleteWebsiteFromUser(userId,websiteId)
{
    return websiteModel
        .remove({_id:websiteId})
        .then(function(status){
            return userModel
                .deleteWebsite(userId,websiteId);
        })
}

function createWebsiteForUser(userId,website){
    website._user=userId;
    return websiteModel
        .create(website)
        .then(function(website){
            return userModel
                .addWebsite(userId,website._id)
        });

}
function findAllWebsiteForUser(userId){
    return websiteModel
        .find({_user:userId})
        .populate('_user')
        .exec();

}

function findAllWebsites(){
    return websiteModel.find();
}


