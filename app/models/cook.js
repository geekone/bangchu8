var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var CookCategorySchema = new Schema({
//     name:{type:String},
//     ename:{type:String}
// });


var CookSchema = new Schema({
    title:{type:String},
    img:{type:String},
    // summary:{type:String},
    // cailiao:{type:String},
    // content:{type:String},
    // title1:{type:String},
    // url:{type:String},
    // category:{type:String},
    // tag:{type:String},
    // cateid:{type:Number},
    created:{type:Date,default:Date.now}
});

// mongoose.model('CookCategory',CookCategorySchema);
mongoose.model("Cook",CookSchema,"tb_article");

