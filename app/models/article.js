var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title:{type:String},
	content:{type:String},
	created:{type:Date,default:Date.now}
});

mongoose.model("Article",ArticleSchema,"tb_article");
