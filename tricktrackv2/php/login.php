<?php

include('dbhelper.php');

$dbh = openDBConnect();

if(isset($_POST['user']) && !empty($_POST['user'])){

	$user = json_decode($_POST['user'], true);
	
	//$sql = "SELECT * FROM users WHERE email = '".$user['email']."' AND password = '".$user['password']."';";
	$sql = "SELECT * FROM users WHERE username = :username AND password = :password";

	$result = $dbh->prepare($sql);
	
	$result->bindParam(':username', $user['username']);
    $result->bindParam(':password', $user['password']);
    
	$result->execute();

	$db_user = $result->fetch(PDO::FETCH_OBJ);
	
	$response = -1;
	
	if($db_user){
		$response = array('name' => $db_user->lastname, 'username' => $db_user->username);
	}
	echo json_encode($response);

}

?>
