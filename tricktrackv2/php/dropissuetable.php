<?php
include('dbhelper.php');

$dbh = openDBConnect();

//$sql = "DELETE FROM `issues` WHERE TITLE = 'asdf'"; //-> works fine

	$sql = "DELETE FROM `issues`";

	$result = $dbh->prepare($sql);

	$res= [];
	$res = $result->execute();
	
	echo(json_encode($res));
?>
