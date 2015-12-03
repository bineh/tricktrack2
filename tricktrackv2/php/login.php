<?php

include('dbhelper.php');

$dbh = openDBConnect();
$res = -1;

if(isset($_POST['user']) && !empty($_POST['user'])){

	$user = json_decode($_POST['user'], true);
	if(isset($user['username']) && !empty($user['username']) && isset($user['password'])&& !empty($user['password'])){
		$sql = "SELECT * FROM users WHERE username = :username AND password = :password";

		$result = $dbh->prepare($sql);
		
		$result->bindParam(':username', $user['username']);
		$result->bindParam(':password', $user['password']);
		
		$res = $result->execute();

		$db_user = $result->fetch(PDO::FETCH_OBJ);
		
		if($db_user){
			$res = array('name' => $db_user->lastname, 'username' => $db_user->username, 'isAdmin' => $db_user->isAdmin);
		}	
	}	
}
echo json_encode($res);
?>
