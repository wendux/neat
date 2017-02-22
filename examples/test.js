//var $= require("neat-js")
import $ from 'neat-js'
$(function(){
    console.log($("li"))
    $("li").click(function(){
        alert($(this).text())
    })
})
