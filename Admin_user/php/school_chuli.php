<?php
include("DBDA.class.php");
$db = new DBDA();

$page = $_POST["page"];
$key = $_POST["key"];
$num = 6;
$tiao = ($page-1)*$num;

$sql = "select * from school where schoolName like '%{$key}%' limit {$tiao},{$num}";

echo $db->JSONQuery($sql);