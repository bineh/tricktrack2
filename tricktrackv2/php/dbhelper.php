<?php

function openDBConnect(){
	$host="localhost";
	$user="root";
	$password="";
	$dbname="tricktrack";

	$dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
	return $dbh;
}

function setUserId(){
	$dbh = openDBConnect();
	$sql = "SELECT * FROM users";
	$result = $dbh->prepare($sql);
	$result->execute();
	return $result->rowCount()+1;
}

function setIssueId(){
	$dbh = openDBConnect();
	$sql = "SELECT * FROM issues";
	$result = $dbh->prepare($sql);
	$result->execute();
	return "TT-".($result->rowCount()+1);
}
?>
