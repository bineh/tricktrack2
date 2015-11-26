<?php
include('dbhelper.php');

$dbh = openDBConnect();

$newstate = $_POST['newstate'];
$issue_id = $_POST['issue_id'];

$sql = "UPDATE issues SET status='$newstate' WHERE _id = '$issue_id';";

$query = $dbh->prepare($sql);
$query->execute();

?>
