<?php
include "../../response/connect.func.php";
include "prize-config.php";

$prize_query = "SELECT * FROM flip_win_prizes";
$prize_result = mysqli_query($conn, $prize_query);
$prizes = [];
while ($prize_row = mysqli_fetch_assoc($prize_result)) {
  $prizes[] = $prize_row;
}
echo "<table border=1>";
echo "<tr>";
echo "<th>id</th>";
foreach ($prizes as $key => $value) {
  echo "<th>";
  echo $value['name'];
  echo "</th>";
  $prizes[$key]['count'] = 0;
}
echo "<th>Datetime</th>";
echo "<th>memberid</th>";
echo "</tr>";

function renderDataPerDate($date1, $date2) {
  $records_query = "SELECT * FROM flip_win_records WHERE '$date1' < date_created AND date_created <= '$date2'";
  $records_result = mysqli_query($GLOBALS['conn'], $records_query);
  echo "<tr style='background: lightgrey'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><th>". $date1 ."</th></tr>";
  while ( $records_row = mysqli_fetch_assoc($records_result) ) {
    echo "<tr>";
    echo "<td>" . $records_row['id'] . "</td>";
    foreach ($GLOBALS['prizes'] as $key => $value) {
      if ( $value['id'] == $records_row['prize_id'] ) {
        $GLOBALS['prizes'][$key]['count']++;
        echo "<td style='background: #e2ffd9'>";
        echo $GLOBALS['prizes'][$key]['count'];
        echo "</td>";
      } else {
        echo "<td>";
        echo $GLOBALS['prizes'][$key]['count'];
        echo "</td>";
      }
    }
    echo "<td>" . $records_row['date_created'] . "</td>";
    echo "<td>" . $records_row['memberid'] . "</td>";
    echo "</tr>";
  }
}

renderDataPerDate($week0, $week1);
renderDataPerDate($week1, $week2);
renderDataPerDate($week2, $week3);
renderDataPerDate($week3, $week4);
renderDataPerDate($week4, $week5);
renderDataPerDate($week5, date("Y-m-d H:i:s"));


echo "</table>";
echo "<strong>Ended</strong>";
echo "<script>//setTimeout(()=>location.reload(), 1000)</script>";
