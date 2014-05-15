var mongoose = require("mongoose");
var News = mongoose.model("Newses");


exports.index = function(req,res,next){

    News.find({cateid:103},null,{limit:5},function(err,result){
        if(err){
            next(err);
        }else{

            var _newlist103 = result;
            News.find({cateid:104},null,{limit:5},function(err,result){
               if (err){
                   next(err);
               }else{

                  // console.log(_newlist103);

                   res.render('articles',{newslist103:_newlist103,newslist104:result});
               }

            });

        }
    });

};


exports.views = function(req,res,next){

    console.log(req.params.id);
    res.send("views");
}