var mongoose=require('mongoose');
var widgetSchema=require('./widget.schema.server');

var widgetModel=mongoose.model('widgetModel',widgetSchema);
var pageModel=require('../page/page.model.server');

widgetModel.findWidgetsForPage=findWidgetsForPage;
widgetModel.findWidgetById=findWidgetById;
widgetModel.createWidget=createWidget;
widgetModel.updateWidget=updateWidget;
widgetModel.deleteWidget=deleteWidget;
widgetModel.reorderWidget=reorderWidget;

module.exports=widgetModel;

function createWidget(pageId,widget){
    widget._page=pageId;


      return widgetModel
        .find({_page:pageId})
        .then(function(widgets) {
            console.log(widgets);
            widget.order = widgets.length;
            console.log(widget.order);

            return widgetModel
                .create(widget)
                .then(function (widget) {
                    pageModel
                        .addWidget(pageId, widget._id);
                    return widget;
                });
        });
}

function findWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .sort({order:1})
        .populate('_page')
        .exec();

}



function deleteWidget(widgetId)
{
    var widget=findWidgetById(widgetId);
    var pageId=widget._page;

    return widgetModel
        .remove({_id:widgetId})
        .then(function(status){
             pageModel
                .deleteWidget(pageId,widgetId);
             return status;
        })
}


function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId,widget){
    return widgetModel.update({_id:widgetId},{$set:widget});

}

function reorderWidget(pageId,initial,final){

    return widgetModel
        .find({_page:pageId})
        .sort({order:1})
        .then(function(widgets) {
            for (w in widgets) {
                if (w === initial) {
                    widgets[w].order = final;
                }
                else if (initial > final) {
                    widgets[w].order = w + 1;
                }
                else if (final > initial) {
                    widgets[w].order = w - 1;
                }
                else {
                    widgets[w].order = w;
                }

                widgets[w].save();
            }
        });


}




