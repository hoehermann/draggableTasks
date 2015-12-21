<?php
/**
 * Server side file handling
 * TODO: Store Hours properly.
 * TODO: Maybe use PUT instead of POST, get rid of PHP alltogether?
 */
if ("POST" == $_SERVER['REQUEST_METHOD']) {
  $input = file_get_contents('php://input');
  if (isset($_GET) && isset($_GET["addHours"])) {
    $bytecount = file_put_contents("data/hours.json",",\n".$input,FILE_APPEND);  
  } else {
    $bytecount = file_put_contents("data/tasks.json",$input);  
  }
  if (false === $bytecount) {
    //http_response_code(507);
    header("HTTP/1.0 507 Server kann Daten nicht schreiben.");
  }
} else {
  echo file_get_contents("data/tasks.json");
}
?>
