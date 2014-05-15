/**
 * Created by Administrator on 14-5-15.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//定义分类模型
var CategorySchema = new Schema({
    name :{type:String},    //英文名称
    cn:{type:String}        //中文名称
});

moogoose.model("Category",CategorySchema,"bc8_category");