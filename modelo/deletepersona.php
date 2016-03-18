<?php
include("../conexion/db.php");
$data = json_decode(file_get_contents("php://input"));
$id = mysql_real_escape_string($data->id);

$query = "delete from datos where `id` = '".$id."'";

if ($mysqli->query($query) === TRUE) {
	echo '{"success":1}';  
} 
$mysqli->close();
?>