<?php
include('dbhelper.php');

$dbh = openDBConnect();

if(isset($_POST['user']) && !empty($_POST['user'])){

	$user = json_decode($_POST['user'], true);
	
	$emailexists = "SELECT * FROM users WHERE email = :email";
	$resultemail = $dbh->prepare($emailexists);
	$resultemail->bindParam(':email', $user['email']);
	
	$resultemail->execute();	
	$db_user_email = $resultemail->fetch(PDO::FETCH_OBJ);
	
	$usernameexists = "SELECT * FROM users WHERE username = :username";
	$resultusername = $dbh->prepare($usernameexists);
	$resultusername->bindParam(':username', $user['username']);
	
	$resultusername->execute();
	$db_user_name = $resultusername->fetch(PDO::FETCH_OBJ);
		
	$res = -1;
	
	if ($db_user_name) {
		//user with userame exists
		$res = -2;
	} else if ($db_user_email) {
		//user with email exists
		$res = -3;
	} else {
		//user can be inserted
		$userid = setUserId();

		$sqlinsert = "INSERT INTO users (_id, username, firstname, lastname, email, password) VALUES (:userid, :username, :firstname, :lastname, :email, :password)";
		$result = $dbh->prepare($sqlinsert);
		
		$result->bindParam(':userid', $userid);
		$result->bindParam(':username', $user['username']);
		$result->bindParam(':firstname', $user['firstname']);
		$result->bindParam(':lastname', $user['lastname']);
		$result->bindParam(':email', $user['email']);
		$result->bindParam(':password', $user['password']);	

		$res = $result->execute();
	}
	echo json_encode($res);	
	
}
?>
