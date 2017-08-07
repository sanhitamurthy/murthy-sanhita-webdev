var mongoose=require('mongoose');

var widgetScheme=mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "pageModel"},
    order:{type:Number,default:0},
    widgetType:{
        type:String,
        enum: ['HEADING','IMAGE','YOUTUBE','HTML','INPUT','TEXT']
    },
    text:String,
    placeholder:String,
    description:String,
    url:String,
    width:String,
    height:String,
    rows:Number,
    size:Number,
    class:String,
    icon:String,
    deleteable:Boolean,
    formatted:Boolean,
    name: String,
    dateCreated: {type: Date, default: Date.now}
},{collection:'widget'
});

module.exports=widgetScheme;