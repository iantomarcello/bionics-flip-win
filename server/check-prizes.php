<?php
/**
 *  Bionics Science
 *  FLip and Win
 *  Check prizes at a given time using a GET request variable 'datetime'
 */

include "../../response/connect.func.php";
include "prize-compute.func.php";
include "prize-return.func.php";
$datetime = isset($_GET['datetime']) ? $_GET['datetime'] : null;
$single = isset($_GET['single']) ? $_GET['single'] : null;
$prizes = prizeCompute($datetime);
echo $datetime;

foreach ($prizes as $key => $value) {
  unset($prizes[$key]['content']);
}
$prize = prizeReturn($prizes);

if ( $single == 1 ) {
  echo "<pre>" . var_export($prize, true) . "</pre>";
  exit();
}

echo "<pre>" . var_export($prizes, true) . "</pre>";
