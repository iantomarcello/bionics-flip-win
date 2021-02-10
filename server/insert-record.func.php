<?php
/**
 *  Bionics Science
 *  FLip and Win
 *  insert record into database
 */
// exit(); /// stop post 8th August Pictoris Launch
function prizeRecordInsert($prize, $memberid) {
  $prize = JSON_decode($prize, true);
  $conn = $GLOBALS['conn'];
  /// inserts record to `flip_win_records`
  $date = date("Y-m-d H:i:s");
  $prize_id = $prize['id'];
  $fp_query = "INSERT INTO flip_win_records (prize_id, date_created, memberid) VALUES ('$prize_id', '$date', $memberid);";
  $fp_run = mysqli_query($conn, $fp_query);

  if ( !$fp_run ) {
    return "error:flip_win_records " . mysqli_error($conn) . " " . $fp_query;
  }

  $fp_id = mysqli_insert_id($conn);

  /// inserts record to member's `insert-record.php`
  include "../../response/member/reward-insert.func.php";
  $m_data = [
    "name" => "FLIP 'n WIN CAMPAIGN - " . $prize['name'],
    "type" => "Campaign",
    "campaign_name" => "FLIP 'n WIN CAMPAIGN",
    "flip_win_record_id" => $fp_id,
    "prize_id" => $prize_id,
    "content" => $prize['content']
  ];
  if ( !reward_records_insert($memberid, $m_data, 2) ) {
    return "error:reward_records " . mysqli_error($conn);
  }
  return true;
}

/// end insert-record.func.php
