<?php
/**
 *  Bionics Science
 *  FLip and Win
 *  prize probablity computation
 *  connect.func.php must be included prior
 *  return $prizes array with prize data and computed probabilities
 */

function prizeCompute($dateParam = null) {
  include "prize-config.php";
  $conn = $GLOBALS['conn'];
  $dateParam == null ? $date = date("Y-m-d H:i:s") : $date = $dateParam;

  /// Get all rewards
  $prizes_query = "SELECT * FROM flip_win_prizes";
  $prizes_result = mysqli_query($conn, $prizes_query);

  $prizes = [];
  while ( $prize = mysqli_fetch_assoc($prizes_result) ) {
    /*
    *  Check if total of each prize exceeds their TOTAL capacity
    *  Exclude prize if true
    */
    $prize_id = $prize['id'];
    $prize['weekly_capacity_increment'] = $prize['capacity'] / 5;
    /*
    *  Check if total of each prize exceeds their WEEKLY capacity
    *  Exclude prize if true
    *  Also manipulate grand prize's (id = 1) weekly_capacity conditionally
    */
    $prize['weekly_capacity'] = $prize['capacity'];
    switch (true) {
      case ($week0 < $date && $date <= $week1):
        $prize['weekly_capacity'] = $prize['weekly_capacity_increment'] * 1;
        if ( $prize['id'] == 1 ) $prize['weekly_capacity'] = 1;
        break;
      case ($week1 < $date && $date <= $week2):
        $prize['weekly_capacity'] = $prize['weekly_capacity_increment'] * 2;
        if ( $prize['id'] == 1 ) $prize['weekly_capacity'] = 0;
        break;
      case ($week2 < $date && $date <= $week3):
        $prize['weekly_capacity'] = $prize['weekly_capacity_increment'] * 3;
        if ( $prize['id'] == 1 ) $prize['weekly_capacity'] = 3;
        break;
      case ($week3 < $date && $date <= $week4):
        $prize['weekly_capacity'] = $prize['weekly_capacity_increment'] * 4;
        if ( $prize['id'] == 1 ) $prize['weekly_capacity'] = 3;
        break;
      case ($week4 < $date && $date <= $week5):
        $prize['weekly_capacity'] = $prize['capacity'];
        if ( $prize['id'] == 1 ) $prize['weekly_capacity'] = 3;
        break;
    }

    $weekly_query = "SELECT COUNT(prize_id) total FROM flip_win_records WHERE prize_id = $prize_id AND date_created BETWEEN '$week0' AND '$date'";
    $weekly_result = mysqli_query($conn, $weekly_query);
    if ( !$weekly_result ) echo mysqli_error($conn);
    $weekly_total = mysqli_fetch_assoc($weekly_result)['total'];
    if ( $weekly_total < $prize['weekly_capacity'] || $prize['capacity'] == null) {
      /// Loop and append respective prize's probability
      foreach ($weekly_probabilities as $prizeid => $prob) {
        if ( $prize_id == $prizeid && $prob > 0) {
          $prize['probability'] = $prob;
          $prize['total'] = $weekly_total;
          $prizes[] = $prize;
        }
      }
    }
  }

  /// Compute probability threholds
  foreach ($prizes as $key => $value) {
    $prizes[$key]['probability'] == 0 ? $prizes[$key]['probability'] += 1 : null;
    /// compute probabilities
    if ( $key < 1 ) {
      $prizes[$key]['probabilityLow'] = 0;
      $prizes[$key]['probabilityHigh'] = $prizes[$key]['probability'] - 1;
    } else {
      $prizes[$key]['probabilityLow'] = $prizes[$key - 1]['probabilityHigh'];
      $prizes[$key]['probabilityHigh'] = $prizes[$key - 1]['probabilityHigh'] + $prizes[$key]['probability'] - 1;
    }
  }

  return $prizes;
}

/// end prize-compute.php
