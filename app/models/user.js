var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{type:String,trim:true},
    nickname:{type:String,trim:true},
    password:{type:String,trim:true},
    email:{type:String,trim:true},
    phone:{type:String,trim:true},
    qq:{type:String,trim:true},
    created:{type:Date,default:Date.now}
});

mongoose.model('User',UserSchema,"tb_user");

