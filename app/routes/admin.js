/**
 * Created by Administrator on 14-5-15.
 */


exports.index = function(req,res,next){
  res.render("admin/index",{layout:'admin/layout'});
};