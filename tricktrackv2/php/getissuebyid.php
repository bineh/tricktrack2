<?php

include('dbhelper.php');

$dbh = openDBConnect();

$issue_id = $_POST['issue_id'];

$sql = "SELECT * FROM issues WHERE _id = '$issue_id';";

$result = $dbh->prepare($sql);
$result->execute();

$db_issue =  $result->fetch(PDO::FETCH_OBJ);
$response = -1;

if ($db_issue) {
	$response = array('title' => $db_issue->title, 'description' => $db_issue->description,
	'priority' => $db_issue->priority, 'category' => $db_issue->category);
}
echo json_encode($response);
?>
