//管理模块
var mongoose = require("mongoose");
// var NewsCategory = mongoose.model("NewsCategory");
// var News = mongoose.model("Newses");
// var User = mongoose.model("User");
var CategoryModel = mongoose.model("Category");
var UserModel = mongoose.model("User");
var ArticleModel = mongoose.model("Article");
var CookModel = mongoose.model("Cook");

var express = require('express');


//首页
exports.index = function(req,res,next){
	res.render('admin/index',{layout:'admin/layout'});
};

//分类列表
exports.categorylist = function(req,res,next){
     CategoryModel.find({},function(err,result){
        if (err){
            next(err);
        }else{
            console.log(result.length);
            res.render("admin/categorylist",{layout:"admin/layout",categorylist:result});
        }
    });
};


//添加分类
exports.addcategory = function(req,res,next){
    res.render("admin/addcategory",{layout:"admin/layout"});
};

//保存分类
exports.savecategory = function(req,res,next){
    var _name = req.body.name;
    var _en = req.body.en;
    var CategoryEntity = new CategoryModel({name:_name,en:_en});
    CategoryEntity.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect('/admin/categorylist');
        }
    });
};

//删除分类通过 id=param 的方式
exports.delcategory = function(req,res,next){
    var _id = req.query.id;
    CategoryModel.remove({_id:_id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/categorylist");
        }
    });
};

//编辑
exports.editcategory = function(req,res,next){
    if(req.method == "GET"){
        var _id = req.query.id;
        CategoryModel.findOne({_id:_id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render('admin/editcategory',{layout:'admin/layout',category:result});
            }
        });
    }else if(req.method == 'POST'){
        var _id = req.body.id;
        var _name = req.body.name;
        var _en = req.body.en;
        var query = {_id:_id};
        CategoryModel.update(query,{name:_name,en:_en},false,function(err){
            if(err){
                nexe(err);
            }else{
                res.redirect("/admin/categorylist");
            }
        });
       
    }
};








//用户列表
exports.userlist = function(req,res,next){
    UserModel.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/userlist",{layout:"admin/layout",userlist:result});
        }
    });
};


//添加用户
exports.adduser = function(req,res,next){
    res.render("admin/adduser",{layout:"admin/layout"});
};

//保存用户
exports.saveuser = function(req,res,next){
    var _username = req.body.username;
    var _nickname = req.body.nickname;
    var _password = req.body.password;
    var _email = req.body.email;
    var _phone = req.body.phone;
    var _qq = req.body.qq;

    var UserEntity = new UserModel({username:_username,nickname:_nickname,password:_password,email:_email,phone:_phone,qq:_qq});
    UserEntity.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/userlist");
        }
    });
};


exports.deluser = function(req,res,next){
    var _id = req.query.id;
    UserModel.remove({_id:_id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/userlist");
        }
    });
};

//编辑
exports.edituser = function(req,res,next){
    if(req.method == "GET"){
        var _id = req.query.id;
        UserModel.findOne({_id:_id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/edituser",{layout:'admin/layout',user:result});
            }
        });
    }else if(req.method == "POST"){
        var _id = req.body.id;
        var _username = req.body.username;
        var _nickname = req.body.nickname;
        var _password = req.body.password;
        var _email = req.body.email;
        var _phone = req.body.phone;
        var _qq = req.body.qq;
        var query = {_id:_id};
        UserModel.update(query,{username:_username,nickname:_nickname,password:_password,email:_email,phone:_phone,qq:_qq},false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/userlist");
            }
        });
    }
};



//文章列表
exports.articlelist = function(req,res,next){
    ArticleModel.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/articlelist",{layout:"admin/layout",articlelist:result});
        }
    });
};

//添加文章
exports.addarticle = function(req,res,next){
    res.render("admin/addarticle",{layout:"admin/layout"});
}

//保存文章
exports.savearticle = function(req,res,next){
    var _title = req.body.title;
    var _content = req.body.content;
    var ArticleEntity = new ArticleModel({title:_title,content:_content});
    ArticleEntity.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/articlelist");
        }
    });
}

exports.delarticle= function(req,res,next){
    var _id = req.query.id;
    ArticleModel.remove({_id:_id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/articlelist");
        }
    });
};


exports.editarticle = function(req,res,next){
    if(req.method == "GET"){
        var _id = req.query.id;
       ArticleModel.findOne({_id:_id},function(err,result){
           if(err){
               next(err);
           }else{
               res.render("admin/editarticle",{layout:'admin/layout',article:result});
           }
       });
    }else if(req.method=="POST"){
        var _id = req.body.id;
        var _title = req.body.title;
        var _content = req.body.content;
        var query ={_id:_id};
        ArticleModel.update(query,{title:_title,content:_content},false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/articlelist");
            }
        });
    }

};



//cook列表
exports.cooklist = function(req,res,next){
    CookModel.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/cooklist",{layout:"admin/layout",cooklist:result});
        }
    });
};

//添加cook
exports.addcook = function(req,res,next){
    res.render("admin/addcook",{layout:"admin/layout"});
}

exports.savecook = function(req,res,next){
    var _title = req.body.title;
    var _img = req.body.img
    var CookEntity = new CookModel({title:_title,img:_img});
    CookEntity.save(function(err){
        if(err){
            next(err);
        }else{
             res.redirect("/admin/cooklist");
        }
    });

}

exports.delcook = function(req,res,next){
    var _id = req.query.id;
    CookModel.remove({_id:_id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/cooklist");
        }
    });
}

//编辑cook
exports.editcook = function(req,res,next){
    if (req.method=="GET"){
        var _id = req.query.id;
        CookModel.findOne({_id:_id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editcook",{layout:'admin/layout',cook:result});
            }
        });
    }else if(req.method == "POST"){
        var _id = req.body.id;
        var _title = req.body.title;
        var _img = req.body.img;
        var query = {_id:_id};
        CookModel.update(query,{title:_title,img:_img},false,function(err){
            if(err){
                next(err);
            }else{
               res.redirect("/admin/cooklist");
            }
        });

    }
}



/**********  资读 **********/
// exports.newscategories = function(req,res,next){
//     NewsCategory.find({},function(err,result){
//         if(err){
//             next(err)
//         }else{
//             res.render('admin/newscategories',{layout:'admin/layout',categorylist:result});
//         }
//     });
// };

// //添加资讯分类
// exports.addnewscate = function(req,res,next){
//    _catename = req.body.catename;
//    _cateid = req.body.cateid;
//    var newscate  = new NewsCategory({cateid:_cateid,catename:_catename});
//     newscate.save(function(err){
//         if(err){
//             next(err);
//         }else{
//             res.redirect('/admin/newscategories');
//         }
//     });
// };

// //删除资讯分类
// exports.delnewscate = function(req,res,next){
//         var _cid = req.query.cid;
//         NewsCategory.remove({_id:_cid},function(err){
//             if(err){
//                 next(err);
//             }else{
//                 res.redirect('/admin/newscategories');
//             }
//         });
// };

// //更新资讯分类
// exports.editnewscate = function(req,res,next){
//     if(req.method == "GET"){
//         var _cid = req.query.cid;
//         NewsCategory.findOne({_id:_cid},function(err,result){
//             if(err){
//                 next(err);
//             }else{
//                 res.render('admin/editnewscate',{layout:'admin/layout',category:result});
//             }
//         });

//     }else if(req.method == 'POST'){
//         var _cid = req.body.cid;
//         var _name = req.body.name;
//         var query = { _id: _cid };
//         NewsCategory.update(query, { name: _name }, false, function(err){
//             if(err){
//                 next(err);
//             }else{
//                 res.redirect('/admin/newscategories')
//             }
//         });
//     }
// }

// //news list
// exports.news = function(req,res,next){


//     News.find({cateid:104},function(err,result){
//         if(err){
//             next(err);
//         }else{
//             res.render('admin/news',{layout:'admin/layout',newslist:result});
//         }
//     });

// //    News.find({},function(err,result){
// //        if(err){
// //            next(err);
// //        }else{
// //            res.render('admin/news',{layout:'admin/layout',newslist:result});
// //        }
// //    });
// };

// //删除 news
// exports.delnews = function(req,res,next){
//     var id = req.query.id;
//     News.remove({_id:id},function(err){
//         if(err){
//             next(err);
//         }else{
//             res.redirect("/admin/news");
//         }
//     });
// };


// //add news
// exports.addnews = function(req,res,next){
//     if(req.method == "GET"){

//         res.render('admin/addnews',{layout:'admin/layout'});
//     }
//     else if(req.method == "POST")
//     {
//         var _title = req.body.title;
//         var _content = req.body.content;
//         var _catename = req.body.catename;
//         var _cateid = req.body.cateid;
//         var data = {
//             title:_title,
//             content:_content,
//             catename:_catename,
//             cateid:_cateid
//         };
//         var news = new News(data);
//         news.save(function(err){
//             if(err){
//                 next(err);
//             }else{
//                 res.redirect("/admin/news");
//             }
//         });

//     }

// };

// //编辑 news
// exports.editnews = function(req,res,next){
//     if( req.method == "GET"){
//         var id = req.query.id;
//         News.findOne({_id:id},function(err,result){
//             if(err){
//                 next(err);
//             }else{
//                 res.render("admin/editnews",{layout:"admin/layout",news:result});
//             }
//         });
//     }else if(req.method == "POST"){
//         var id = req.body.id;
//         var query = {_id:id};
//         var _title = req.body.title;
//         var _content = req.body.content;
//         var _catename = req.body.catename;
//         var _cateid = req.body.cateid;
//         var data = {
//             title:_title,
//             content:_content,
//             catename:_catename,
//             cateid:_cateid
//         };

//         News.update(query,data,false,function(err){
//             if(err){
//                 next(err);
//             }else{
//                 res.redirect("/admin/news");
//             }
//         });
//     }
// }

// /**********  用户 **********/
// //所有用户
// exports.users = function(req,res,next){
//     User.find({},function(err,result){
//         if(err){
//             next(err);
//         }else{
//             res.render('admin/users',{layout:'admin/layout',userlist:result});
//         }
//     });
// };

// //添加用户
// exports.adduser = function(req,res,next){
//     var _username = req.body.username;
//     var _nickname = req.body.nickname;
//     var _password = req.body.password;
//     var _email = req.body.email;
//     var _phone = req.body.phone;
//     var _qq = req.body.qq;
//     var data = {
//         username:_username,
//         nickname:_nickname,
//         password:_password,
//         email:_email,
//         phone:_phone,
//         qq:_qq
//     };
//     var newUser = new User(data);
//     newUser.save(function(err){
//         if(err){
//             next(err);
//         }else{
//             res.redirect("/admin/users");
//         }
//     });

// };

// //删除用户
// exports.deluser = function(req,res,next){
//     var _uid = req.query.uid;
//     User.remove({_id:_uid},function(err){
//         if(err){
//             next(err);
//         }else{
//            res.redirect("/admin/users");
//         }
//     });
// };

// //更新用户
// exports.edituser = function(req,res,next){
//     if(req.method == "GET"){
//         var _uid = req.query.uid;
//         User.findOne({_id:_uid},function(err,result){
//             if(err){
//                 next(err);
//             }else{
//                res.render("admin/edituser",{layout:"admin/layout",user:result});
//             }
//         });
//     }else if(req.method == "POST"){
//         var _uid = req.body.uid;
//         var query = {_id:_uid};
//         var _username = req.body.username;
//         var _nickname = req.body.nickname;
//         var _password = req.body.password;
//         var _email = req.body.email;
//         var _phone = req.body.phone;
//         var _qq = req.body.qq;
//         var data = {
//             username:_username,
//             nickname:_nickname,
//             password:_password,
//             email:_email,
//             phone:_phone,
//             qq:_qq
//         };
//         User.update(query,data,false,function(err){
//             if(err){
//                 next(err);
//             }else{
//                res.redirect("/admin/users");
//             }
//         });
//     }
// };


