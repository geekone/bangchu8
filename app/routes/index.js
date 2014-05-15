/**
 * Created by Administrator on 14-5-15.
 */

//首页路由
exports.index = function(req,res,next){
    res.render("index",{layout:'layout'})
};