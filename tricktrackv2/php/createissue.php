<?php
include('dbhelper.php');

$dbh = openDBConnect();

if(isset($_POST['issue']) && !empty($_POST['issue'])){
	
	$issue = json_decode($_POST['issue'], true);
	
	$issueid = setIssueId();
	$testuser = "testuser";
	
	$sql = "INSERT INTO issues (_id, title, description, reporter, priority, status, assigned_to, category, comment, attachment) VALUES ('$issueid', '".$issue['title']."','".$issue['description']."', '".$issue['reporter']."', '".$issue['priority']."', 'todo', '".$issue['assigned_to']."', '".$issue['category']."', 'kein kommentar', 'kein anhang');";
	
	$result = $dbh->prepare($sql);
	$result->execute();
}

?>
