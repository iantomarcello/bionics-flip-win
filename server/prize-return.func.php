<?php
/**
 *  Bionics Science
 *  FLip and Win
 *  Returns the single prize retrieved randomly
 *  connect.func.php must be included prior
 *  @prizes is an array of prize with computated probabilites, from returnComputedPrize
 */

function prizeReturn($prizes) {
  $low = $prizes[0]['probabilityLow'];
  $high = $prizes[count($prizes) - 1]['probabilityHigh'];
  $rng = rand($low, $high - 1);

  foreach ($prizes as $key => $prize) {
    if ($prize['probabilityLow'] <= $rng && $rng < $prize['probabilityHigh'] ) {
      return JSON_encode($prize);
    }
  }
}

/// end prize-return.php
