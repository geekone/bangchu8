//管理模块分流 处理 cook 方面的
var mongoose = require("mongoose");
var CookCategory = mongoose.model("CookCategory");
var Cook = mongoose.model("Cook");


/***********  Cook ******************/
//列表
exports.cookcategories = function(req,res,next){
    CookCategory.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/cookcategories",{layout:"admin/layout",categorylist:result});
        }
    });
};
//删除
exports.delcookcate = function(req,res,next){
    var _cid = req.query.cid;
    CookCategory.remove({_id:_cid},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/cookcategories");
        }
    });
}

//添加分类
exports.addcookcate = function(req,res,next){
    var _name = req.body.name;
    var _ename = req.body.ename;
    var data = {
        name:_name,
        ename:_ename
    };
    var cookCate = new CookCategory(data);
    cookCate.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect('/admin/cookcategories');
        }
    });
}

//编辑修改分类
exports.editcookcate = function(req,res,next){
    if (req.method == "GET"){
        var _cid = req.query.cid;
        CookCategory.findOne({_id:_cid},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editcookcategory",{layout:"admin/layout",category:result});
            }
        });
    }else if(req.method == "POST"){
        var _cid = req.body.cid;
        var query = {_id:_cid};
        var data = {
            name:req.body.name,
            ename:req.body.ename
        };
        CookCategory.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/cookcategories");
            }
        });

    }
}


//列表
exports.cooks = function(req,res,next){
    Cook.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/cooks",{layout:"admin/layout",cooklist:result});
        }
    });
};

//删除
exports.delcook = function(req,res,next){
    var id = req.query.id;
    Cook.remove({_id:id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/cooks");
        }
    });
};

//添加
exports.addcook = function(req,res,next){
    if(req.method == "GET"){
        res.render("admin/addcook",{layout:"admin/layout"});
    }else if(req.method == "POST"){
        var _title = req.body.title;
        var _img = req.body.img;
        var _summary = req.body.summary;
        var _cailiao = req.body.cailiao;
        var _content = req.body.content;
        var _category = req.body.category;
        var _tag = req.body.tag;
        var _cateid = req.body.cateid;
        var data = {
            title:_title,
            img:_img,
            summary:_summary,
            cailiao:_cailiao,
            content:_content,
            category:_category,
            tag:_tag,
            cateid:_cateid
        }
        var cook = new Cook(data);
        cook.save(function(err){
            if(err){
                next(err);
            } else{
                res.redirect("/admin/cooks");
            }
        });
    }


};

//编辑
exports.editcook = function(req,res,next){
    if(req.method == "GET"){
        var id = req.query.id;
        Cook.findOne({_id:id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editcook",{layout:"admin/layout",cook:result});
            }
        });
    }else if(req.method == "POST"){
        var id = req.body.id;
        var query = {_id:id};
        var data = {
            title:req.body.title,
            img:req.body.img
        }
        Cook.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/cooks");
            }
        });
    }
}



