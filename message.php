<?php
// conexion a la base de datos


//require_once "connection.php";
$conn = mysqli_connect("localhost:3308", "root", "sony", "jaguarbot") or die("Database Error");
//$conn =connection();
// obteniendo el mensaje del usuario a través de ajax
$getMesg = mysqli_real_escape_string($conn, $_POST['text']);

//comprobando la consulta del usuario a la consulta de la base de datos
$check_data = "SELECT replies FROM jaguarbot WHERE queries LIKE '%$getMesg%'";
$run_query = mysqli_query($conn, $check_data) or die("Error");

// si la consulta del usuario coincide con la consulta de la base de datos, se mostrara la respuesta; de lo contrario, irá a otra declaración
if (mysqli_num_rows($run_query) > 0) {
    //recuperando la reproducción de la base de datos de acuerdo con la consulta del usuario
    $fetch_data = mysqli_fetch_assoc($run_query);
    //almacenando la respuesta a una variable que enviaremos a ajax
    $replay = $fetch_data['replies'];
    echo $replay;
} else {

    //si la pregunta no tiene respuesta, se insertara la consulta en la base de datos
    registrar($getMesg, $conn);
    echo "¡Lo siento, no puedo ayudarte con este inconveniente! por favor comunícate con el administrador en el siguiente enlace:
    
    </br><a href='https://cdhidalgo.tecnm.mx/' target='blank'>Contacto</a>";
}


//funcion  para registrar preguntas que no fueron contestadas
function registrar($mensaje, $conn){

    //obteniendo el mensaje del usario
    $msg = $mensaje;
    //insertar 
    $stmt = $conn->prepare("INSERT INTO jaguarbot (queries) VALUES (?)");
    $stmt->bind_param('s', $msg);
    $stmt->execute();
    $stmt->close();
   
}
