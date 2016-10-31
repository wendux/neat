<?php
/**
 * Created by PhpStorm.
 * User: du
 * Date: 16/10/31
 * Time: 下午3:04
 */
header("Content-Type: text/javascript; charset=utf-8");
$cbName=$_GET["callback"];
$data=json_encode(["a"=>8,"b"=>9]);
echo $cbName."($data)";