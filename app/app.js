var express =  require("express");
//var mongoose = require("mongoose"); //数据库模块
var http = require("http");
var routes = require("./routes");
var admin = require("./routes/admin");
var partials = require('express-partials');




////初始化程序变成模块
//var init = exports.init = function(config){
//    //TODO mongodb数据库配置
//
//    //自定义一个error页,显示出错的信息
//    function errorHandler(err,req,res,next){
//        res.render('error',{error:err});
//    }
//
//    var app = express();
//    app.configure(function(){
//        app.engine('html', require('ejs').renderFile);
//        app.set("views",__dirname + "/views");
//        app.set("view engine","html");
//        app.use(express.bodyParser());
//        app.use(express.methodOverride());
//        app.use(express.cookieParser('your secret here'));
//        app.use(partials());
//        app.use(express.static(__dirname + "/public"));
//        app.use(app.router);
//        app.use(errorHandler);
//    });
//

//
//
//    return app;
//}

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');			//通过cofing.js 定义到app里面
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(partials());
app.use(express.static(__dirname + '/public'));			//配置在config.js
app.use(app.router);
app.use(errorHandler);


//    //route
    app.get("/",routes.index)
    app.get('/admin?',admin.index);

app.get('*', function(req, res,next) {
//    console.log('404 handler..')
    next('404', {
        status: 404,
        title: 'NodeBlog'
    });
})


//自定义一个error页,显示出错的信息
function errorHandler(err,req,res,next){
    res.render('error',{error:err});
}





http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port ' + app.get('port'));
});




//if(!module.parent){
//    var config = require("./config");
//    var app = init(config);
//    app.listen(process.env.PORT||3000);
//    console.info("Express server listening on port in %s mode", app.settings.env);
//}