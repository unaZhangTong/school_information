<?php
    header("content-type:text/html;charset=utf-8");
    $schoolName = $_POST["schoolName"];
    $schoolLocation = $_POST["schoolLocation"];
    $schoolAffiliated = $_POST["schoolAffiliated"];
    $schoolType = $_POST["schoolType"];
    $educationLevel = $_POST["educationLevel"];
    $satisfaction = $_POST["satisfaction"];
    $officialWebsite = $_POST["officialWebsite"];
    $schoolCharacteristics985 = $_POST["schoolCharacteristics985"];
    $schoolCharacteristics211 = $_POST["schoolCharacteristics211"];
    $graduateSchool = $_POST["graduateSchool"];
    $independentCollege = $_POST["independentCollege"];
    $privateCollege = $_POST["privateCollege"];

    mysql_connect("127.0.0.1","root","root");
    mysql_select_db("schoolinformation");
    mysql_query("set names utf8");
    $sql = "select * from `school` where schoolName='$schoolName'";
    $res = mysql_query($sql);
    $arr = mysql_fetch_assoc($res);
    if($arr){//如果有该用户，不能注册
        echo 0;
    }
    else{//如果没有该用户，可以注册
        $sql = "insert into `school` (schoolName,schoolLocation,schoolAffiliated,schoolType,educationLevel,satisfaction,officialWebsite,schoolCharacteristics985,schoolCharacteristics211,graduateSchool,independentCollege,privateCollege) VALUES ('$schoolName','$schoolLocation','$schoolAffiliated','$schoolType','$educationLevel','$satisfaction','$officialWebsite','$schoolCharacteristics985','$schoolCharacteristics211','$graduateSchool','$independentCollege','$privateCollege')";
        $res = mysql_query($sql);

        if($res){//添加成功
            echo 1;
        }else{//添加失败
            echo 2;
        }
    }
?>