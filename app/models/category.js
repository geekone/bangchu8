var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name:{type:String},
	en:{type:String}
});

mongoose.model("Category",CategorySchema,"tb_category");
