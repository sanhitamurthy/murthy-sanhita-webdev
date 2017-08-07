var mongoose=require('mongoose');

var pageScheme=mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: {type: mongoose.Schema.Types.ObjectId, ref: "widgetModel"},
    dateCreated: {type: Date, default: Date.now}
},{collection:'page'
});

module.exports=pageScheme;