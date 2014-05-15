
//前台用于需要的route.js文件
var home = require('../app/controllers/home');
var articles  = require("../app/controllers/articles");
var cooks = require("../app/controllers/cooks");



//后台需要的route.js
var admin = require("../app/controllers/admin");
// var admincook = require("../app/controllers/admin_cook");
// var adminuser = require("../app/controllers/admin_user");


//这段是express自带的用户验证
//var express = require("express");
//var auth = express.basicAuth('testUser', 'testPass');
//只要加在route里面就能控制这个route需要验证
//app.get("/admin/?",auth,admin.index);

module.exports = function(app){

	app.get("/",home.index);


    /**  cooks ***/
    app.get("/cooks",cooks.index);


    /*** news article 资讯 ***/
    //首页
    app.get("/articles",articles.index);
    ///5279fc1e87c06a0aa8e6152d
    app.get('/articles/views/:id?',articles.views);


	/** admin **/
	// app.get("/admin/?",auth,admin.index);           //加了权限验证的
    app.get("/admin/?",admin.index);

    //新开发的
    app.get("/admin/categorylist/?",admin.categorylist);
    app.get("/admin/addcategory/?",admin.addcategory);
    app.post("/admin/savecategory/?",admin.savecategory);
    app.get('/admin/delcategory/?',admin.delcategory);
    app.get("/admin/editcategory/?",admin.editcategory);
    app.post("/admin/editcategory/?",admin.editcategory);


    app.get("/admin/userlist/?",admin.userlist);
    app.get("/admin/adduser/?",admin.adduser);
    app.post("/admin/saveuser/?",admin.saveuser);
    app.get("/admin/deluser/?",admin.deluser);
    app.get("/admin/edituser/?",admin.edituser);
    app.post("/admin/edituser/?",admin.edituser);


    app.get("/admin/articlelist/?",admin.articlelist);
    app.get("/admin/addarticle/?",admin.addarticle);
    app.post("/admin/savearticle/?",admin.savearticle);
    app.get("/admin/delarticle/?",admin.delarticle);
    app.get("/admin/editarticle/?",admin.editarticle);
    app.post("/admin/editarticle/?",admin.editarticle);

    app.get("/admin/cooklist/?",admin.cooklist);
     app.get("/admin/addcook/?",admin.addcook);
    app.post("/admin/savecook/?",admin.savecook);
    app.get("/admin/delcook/?",admin.delcook);
    app.get("/admin/editcook/?",admin.editcook);
    app.post("/admin/editcook/?",admin.editcook);

    



    //资讯分类
        //
        // app.get('/admin/newscategories/?',admin.newscategories);
        // app.post('/admin/addnewscate/?',admin.addnewscate);
        // app.get('/admin/editnewscate/?',admin.editnewscate);
        // app.post('/admin/editnewscate/?',admin.editnewscate);
        // app.get('/admin/delnewscate/?',admin.delnewscate);

        // app.get('/admin/news/?',admin.news);
        // app.get("/admin/addnews/?",admin.addnews);
        // app.post('/admin/addnews/?',admin.addnews);
        // app.get('/admin/editnews/?',admin.editnews);
        // app.post('/admin/editnews/?',admin.editnews);
        // app.get('/admin/delnews/?',admin.delnews);


    //user
//        app.get('/admin/users/?',adminuser.users);
//        app.post('/admin/adduser/?',adminuser.adduser);
//        app.get('/admin/edituser/?',adminuser.edituser);
//        app.post('/admin/edituser/?',adminuser.edituser);
//        app.get('/admin/deluser/?',adminuser.deluser);

    //cook
//        app.get('/admin/cookcategories/?',admin_cook.cookcategories);
//        app.post('/admin/addcookcate/?',admin_cook.addcookcate);
//        app.get('/admin/editcookcate/?',admin_cook.editcookcate);
//        app.post('/admin/editcookcate/?',admin_cook.editcookcate);
//        app.get('/admin/delcookcate/?',admin_cook.delcookcate);
//
//        app.get('/admin/cooks/?',admincook.cooks);
//        app.get("/admin/addcook/?",admincook.addcook);
//        app.post('/admin/addcook/?',admincook.addcook);
//        app.get('/admin/editcook/?',admincook.editcook);
//        app.post('/admin/editcook/?',admincook.editcook);
//        app.get('/admin/delcook/?',admincook.delcook);


};
