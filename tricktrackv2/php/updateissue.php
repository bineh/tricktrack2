<?php
include('dbhelper.php');

$dbh = openDBConnect();
$res = -1;

//issue only exists when update issue form is called
if(isset($_POST['issue']) && !empty($_POST['issue'])){
	$issue = json_decode($_POST['issue'], true);
	
	$sqlupdate = "UPDATE issues SET priority = :priority, assigned_to = :assigned_to, category = :category WHERE _id = :issue_id";	
	$queryupdate = $dbh->prepare($sqlupdate);
	
	$queryupdate->bindParam(':issue_id', $issue['issue_id']);
	$queryupdate->bindParam(':priority', $issue['priority']);
    $queryupdate->bindParam(':assigned_to', $issue['assigned_to']);
    $queryupdate->bindParam(':category', $issue['category']);
     
	$res = $queryupdate->execute();	
} else {	
	//only update of state
	$issue_id = $_POST['issue_id'];
	$newstate = $_POST['newstate'];	
	$sql = "UPDATE issues SET status='$newstate' WHERE _id = '$issue_id';";
	$query = $dbh->prepare($sql);
	
	$res = $query->execute();
}

echo(json_encode($res));
?>
