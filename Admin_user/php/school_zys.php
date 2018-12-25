<?php
include("DBDA.class.php");
$db = new DBDA();

$key = $_POST["key"];
$num = 6;

$sql = "select count(*) from school where schoolName like '%{$key}%'";

$zts = $db->StrQuery($sql);

echo ceil($zts/$num);