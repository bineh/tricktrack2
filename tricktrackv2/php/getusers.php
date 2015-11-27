<?php
include('dbhelper.php');

$dbh = openDBConnect();

$sql = "SELECT username, _id FROM users";
$result = [];

$query = $dbh->prepare($sql);
$query->execute();

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	$result[] = $row;
}
echo json_encode($result);

?>
