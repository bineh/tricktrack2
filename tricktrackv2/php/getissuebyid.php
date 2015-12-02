<?php

include('dbhelper.php');

$dbh = openDBConnect();

$issue_id = $_POST['issue_id'];

$sql = "SELECT * FROM issues WHERE _id = '$issue_id';";

$result = $dbh->prepare($sql);
$result->execute();

$db_issue =  $result->fetch(PDO::FETCH_OBJ);
$response = -1;

//getting users for userlist 
$sqlusers = "SELECT username, _id FROM users";
$users = [];

$queryusers = $dbh->prepare($sqlusers);
$queryusers->execute();

while ($row = $queryusers->fetch(PDO::FETCH_ASSOC)) {
	$users[] = $row;
}

if ($db_issue) {
	$response = array('title' => $db_issue->title, 'description' => $db_issue->description,
	'priority' => $db_issue->priority, 'assigned_to' => $db_issue->assigned_to,'category' => $db_issue->category,'state' => $db_issue->status, 'users' => $users);
}
echo json_encode($response);



//echo json_encode($users);
?>
