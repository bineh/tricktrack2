<?php
include('dbhelper.php');

$dbh = openDBConnect();

$sql = "SELECT username,_id FROM users";

$result = $dbh->prepare($sql);
$result->execute();
$db_users = $result->fetch(PDO::FETCH_OBJ); //FETCH ARRAY!!!!!!!!

//and run through....

?>
