<?php
include('dbhelper.php');

$dbh = openDBConnect();

if(isset($_POST['user']) && !empty($_POST['user'])){

	$user = json_decode($_POST['user'], true);
	
	
	$emailexists = "SELECT * FROM users WHERE email='".$user['email']."';";
	$usernameexists = "SELECT * FROM users WHERE username='".$user['username']."';";
	
	$resultemail = $dbh->prepare($emailexists);
	$resultemail->execute();
	$db_user_email = $resultemail->fetch(PDO::FETCH_OBJ);
	
	$resultusername = $dbh->prepare($usernameexists);
	$resultusername->execute();
	$db_user_name = $resultusername->fetch(PDO::FETCH_OBJ);
		
	$response = -1;
	
	if ($db_user_name) {
		//user with userame exists
		$response = -2;
	} else if ($db_user_email) {
		//user with email exists
		$response = -3;
	} else {
		//user can be inserted
		$userid = setUserId();
		$sqlinsert = "INSERT INTO users (_id, username, firstname, lastname, email, password) VALUES ('$userid', '".$user['username']."','".$user['firstname']."', '".$user['lastname']."', '".$user['email']."', '".$user['password']."');";
		
		echo "register.php ".$sqlinsert;
		
		$result = $dbh->prepare($sqlinsert);
		$result->execute();
		//$db_insert = $result->fetch(PDO::FETCH_OBJ);
		$response = 1;
	}
	//echo json_encode($response);	
	
}
?>
