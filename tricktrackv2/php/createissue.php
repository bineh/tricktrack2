<?php
include('dbhelper.php');

$dbh = openDBConnect();

if(isset($_POST['issue']) && !empty($_POST['issue'])){
	
	$issue = json_decode($_POST['issue'], true);
	
	$issueid = setIssueId();
	$status = "todo";
	$comment = 'kein kommentar';
	$attachment = 'kein anhang';
	$testreporter = "testreporter";
	
	if ($issue['reporter'] == null) {
		$issue['reporter'] = $testreporter;
	}
	
	$sql = "INSERT INTO issues (_id, title, description, reporter, priority, status, assigned_to, category, comment, attachment) VALUES (:issueid, :title, :description, :reporter, :priority, :status, :assigned_to, :category, :comment, :attachment)";
	$stmt = $dbh->prepare($sql);
	
	
	
    $stmt->bindParam(':issueid', $issueid);
    $stmt->bindParam(':title', $issue['title']);
    $stmt->bindParam(':description', $issue['description']);
    $stmt->bindParam(':reporter', $issue['reporter']);
    $stmt->bindParam(':priority', $issue['priority']);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':assigned_to', $issue['assigned_to']);
    $stmt->bindParam(':category', $issue['category']);
    $stmt->bindParam(':comment', $comment);
    $stmt->bindParam(':attachment', $attachment);

	$stmt->execute();
	
}

?>
