<?php
include('dbhelper.php');

$dbh = openDBConnect();

$state = $_POST['state'];
$result = [];

$sql = "SELECT * FROM issues WHERE status='$state';";

$query = $dbh->prepare($sql);
$query->execute();
while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	$result[] = $row;
}
echo json_encode($result);

?>
