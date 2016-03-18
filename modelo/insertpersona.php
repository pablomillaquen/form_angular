<?php
include("../conexion/db.php");
$data = json_decode(file_get_contents("php://input"));
$rut = mysql_real_escape_string($data->rut);
$nombre = mysql_real_escape_string($data->nombre);
$email = mysql_real_escape_string($data->email);

$query = "insert into datos(`rut`, `nombre`, `email`) values('".$rut."','".$nombre."','".$email."')";

if ($mysqli->query($query) === TRUE) {
    $valor = $mysqli->insert_id;
    $last_id=json_encode($valor);
	echo '{"newId":'.$last_id.'}';  
} 
$mysqli->close();
?>