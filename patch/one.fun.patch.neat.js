/**
 * Created by du on 16/10/31.
 */
$.fn.one=function(callback){
    var f=function(){
        callback()
        $(this).off("click",f)
    }
    $(this).on("click",f)
}