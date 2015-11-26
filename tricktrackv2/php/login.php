<?php

$host="localhost";
$user="root";
$password="";
$dbname="tricktrack";

$dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

if(isset($_POST['user']) && !empty($_POST['user'])){

	$user = json_decode($_POST['user'], true);
	
	echo $user['password'];
	
	$sql = "SELECT * FROM users WHERE email = '".$user['email']."' AND password = '".$user['password']."';";

	$result = $dbh->prepare($sql);
	$result->execute();

	$db_user = $result->fetch(PDO::FETCH_OBJ);
	
	$response = -1;
	
	if($db_user){
		$response = array('name' => $db_user->lastname, 'username' => $db_user->username);
	}
	echo json_encode($response);

}

?>
