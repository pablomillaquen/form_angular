<?php
include("../conexion/db.php");
$query = "select * from datos";
$resultado = $mysqli->query($query);
$arr=array();
if($resultado->num_rows > 0){
	while($row=$resultado->fetch_assoc()){
		$arr[]=$row;
	}
}
$json_respon=json_encode($arr);
echo $json_respon;

$mysqli->close();
?>