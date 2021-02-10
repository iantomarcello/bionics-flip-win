<?php
/**
 *  Bionics Science
 *  FLip and Win
 *  Get prize after checking if member has less or equal to 3 prizes
 */
include "../../response/connect.func.php";
include "../authorize.incl.php";

$memberid = isset($member) ? $member['memberid'] : exit("unauthorized");

/// Query to check if member has more than 3 prizes prior
$check_limit_query = "SELECT COUNT(prize_id) total FROM flip_win_records WHERE memberid='$memberid'";
$check_limit_result = mysqli_query($conn, $check_limit_query);
$check_limit_num = mysqli_fetch_assoc($check_limit_result)['total'];

if ( $check_limit_num >= 3 ) {
  exit("limit"); /// exit if member is over the limit
}

/// Simple re-compute again and return new prizes if member has gotten the prize_id <= 4
include "prize-compute.func.php";
function prizeComputeCategoried() {
  $prizes = prizeCompute();
  $conn = $GLOBALS['conn'];
  $memberid = $GLOBALS['memberid'];
  $check_categoried_query = "SELECT id FROM flip_win_records WHERE memberid='$memberid' AND (prize_id = 4 OR prize_id = 3 OR prize_id = 2 OR prize_id = 1);";
  $check_categoried_result = mysqli_query($conn, $check_categoried_query);
  $check_categoried_num = mysqli_num_rows($check_categoried_result);

  if ( $check_categoried_num > 0 ) {
    $prizes = array_filter($prizes, function($prize) {
      return ($prize['id'] > 4);
    });
    $prizes = array_values($prizes);
  }
  return $prizes;
}

include "prize-return.func.php";
include "insert-record.func.php";

$prizes = prizeComputeCategoried();
$prize = prizeReturn($prizes);
if ( prizeRecordInsert($prize, $memberid) ) {
  echo json_encode($prize);
} else {
  echo "failed";
}

/// end prize-get.resp.php
