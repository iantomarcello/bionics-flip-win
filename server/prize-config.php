<?php
/**
 *  Bionics Science
 *  FLip and Win prize configuration
 *  maniputes conditions and prize probabilities
 *  to be included in file prize-compute.php
 */

$date = date("Y-m-d H:i:s");
// $date = "2019-06-29 22:00:00"; /// test
/// date has to be in Y-m-d H:i:s
$week0 = "2019-07-07 10:00:00"; /// start
$week1 = "2019-07-14 10:00:00";
$week2 = "2019-07-21 10:00:00";
$week3 = "2019-07-26 12:20:00";
$week4 = "2019-08-04 10:00:00";
$week5 = "2019-08-08 10:00:00";

$weekly_probabilities = array(
  /// id => probablity
  "1" => 100, /// Grand Prize
  "2" => 100, /// 2nd Prize
  "3" => 100, /// 3rd Prize
  "4" => 100, /// 4th Prize

  "5" => 2, /// 30% Voucher
  "6" => 2, /// 50% Voucher
  "7" => 0, /// Buy 2 Free 1 Voucher
  "8" => 0, /// Lavish
  "9" => 0, /// Comfort
  "10" => 0 /// Empire
);

/// end prize-config.php
