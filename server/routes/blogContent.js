var express = require('express');
var router = express.Router();

router.all('/',function(req, res, next){
    "use strict";
    if(req.method=='POST'){
        var blogId = req.body.blogId;
        var content = '';
        switch(blogId){
            case 1:
                content = '这是第一篇博客';
                break;
            case 2:
                content = '这是第二篇博客';
                break;
            case 3:
                content = '这是第三篇博客';
                break;
            case 4:
                content = '这是第四篇博客';
                break;
            default:
                content = '该博客不存在'
        }
        res.send({
            is_success:true,
            blogContent:content
        });
    }else {
        res.send('get success');
    }

});

module.exports = router;