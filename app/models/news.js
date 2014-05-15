var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsCategorySchema = new Schema({
    catename:{type:String,default:'',trim:true},
    cateid:{type:Number}
});

var NewsSchema = new Schema({
   title:{type:String},
   content:{type:String},
   url:{type:String},
   catename:{type:String},
   cateid:{type:Number},
   created:{type:String}
});

mongoose.model('NewsCategory',NewsCategorySchema);
mongoose.model('Newses',NewsSchema);        //对应了Newses collection
