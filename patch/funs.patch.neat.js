/**
 * Created by du on 16/10/31.
 */

//one 响应单次点击
$.fn.one=function(callback){
    $(this).on("click",function f(){
        callback()
        $(this).off("click",f)
    })
}

