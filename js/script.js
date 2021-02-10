/// actions if member is not logged in
var clicked = 0;

var x = 3;
$('#step span').text(x);

function playGame() {
  $('.card').click(function() {
    $(this).addClass('flipped');
    if ($(this).hasClass('flipped')) {
      $(this).off('click');
      clicked++;
      x--;
      $('#step span').text(x);

      if ($(this).find('img').attr('src').includes('img/image5.svg')) {
        $('.card').off('click');
        $('.card').addClass('flipped');
        $('.howtoplay').off('click');
        $('.winprize').off('click');
        // $('button.modal-close').hide();
        $('#failed .modal-close').hide();
        $('.button').hide();

        let prizesArray = [
          "prize4.svg", // 6 months - grand
          "prize5.svg", // 3 months - 2nd
          "prize6.svg", // 2 boxes - 3rd
          "prize7.svg", // 1 box - 4th
          "prize.svg", // 30 Off
          "prize1.svg", // 50 Off
          "prize2.svg", // B1F1
          "prize3.svg", // Lavish
          "prize3.svg", // Comfort
          "prize3.svg" // Empire
        ]

        new Promise (resolve => {
          const randomIndex = Math.floor(Math.random() * prizesData.length);
          resolve(randomIndex);
          setTimeout(function() {
            $('.modal').addClass('is-visible');
          }, 3000);
        }).then(randomIndex => {
          playWinAudio();
          const prize = prizesData[randomIndex];

          $('#congratulation').show();

          $('#congratulation').find(".prize img")[0].src = `img/${prizesArray[randomIndex]}`;

        }).catch(error => {
          console.log(error);
          $("#failed").show();
        })
      }
      if (clicked == 1) {
        playFlipAudio();
      }

      if (clicked == 2) {
        playFlipAudio2();
      }

      if (clicked == 3) {
        playFlipAudio3();
        $('.card').off('click');
      }

      if (clicked == 3 && $(this).children().children().children().attr("src") !== "img/image5.svg") {
        $('.card').off('click');
        $('.button').show();
      } else {
        $('.button').hide();
      }
      if ($(this).children().children().children().attr("src") == "img/image5.svg") {
        $(this).children().addClass('transparent');
      }
    }
  });
}

$(".modal-toggle.sign, .modal-toggle.register").hide();

$('#congratulation').hide();
$('.button').hide();
$('#howtoplay').hide();
$('#winprize').hide();
$('#register').hide();
$('#sign').hide();
$('#failed').hide();
$('#tnc').hide();

$('#btn').click(function() {
  location.reload();
});


$('.btn-start').click(function() {
  $('.modal').removeClass('is-visible');
});

$('.btn-try').click(function() {
  $('.modal').removeClass('is-visible');
  $('#failed').hide();
});

$('button.sign').click(function() {
  $('#congratulation').hide();
  $('#howtoplay').hide();
  $('#sign').show();
  $('#register').hide();
});

$('button.register').click(function() {
  $('#congratulation').hide();
  $('#howtoplay').hide();
  $('#sign').hide();
  $('#register').show();
  $('#tnc').hide();
});

$('#sign').hide();

$('button.modal-close').click(function() {
  $('.modal').removeClass('is-visible');
  $('#howtoplay').hide();
  $('#winprize').hide();
  $('#register').hide();
  $('#sign').hide();
  $('#tnc').hide();
  $('#failed').hide();
});

// how to play button function
$('.howtoplay').click(function() {
  $('.modal').addClass('is-visible');
  $('#howtoplay').show();
  $('#winprize').hide();
  $('#congratulation').hide();
  $('#sign').hide();
  $('#tnc').hide();
});

// show prize button function
$('.winprize').click(function() {
  $('.modal').addClass('is-visible');
  $('#winprize').show();
  $('#howtoplay').hide();
  $('#congratulation').hide();
  $('#sign').hide();
  $('#tnc').hide();
});

$("#sign .btn-back, #register .btn-back").click(() => {
  $("#sign, #register").hide();
  $("#howtoplay").show();
})


// Win Sound Function
var winSound = document.getElementById("win");

function playWinAudio() {
  winSound.play();
}

// Flip Card Sound Repeat Function
var flipSound = document.getElementById("flip");

function playFlipAudio() {
  flipSound.play();
}

var flipSound2 = document.getElementById("flip2");

function playFlipAudio2() {
  flipSound2.play();
}

var flipSound3 = document.getElementById("flip3");

function playFlipAudio3() {
  flipSound3.play();
}

/// Simplify ajax form submission
function ajaxForm(form, url, appendData, callback) {
  var data = new FormData($(form)[0]);
  appendData !== null ? appendData(data) : null;
  $.ajax({
    url: url,
    type: "post",
    data: data,
    processData: false,
    contentType: false,
    success: function(result) {
      callback(result);
    }
  });
}

/// Redirecting away on win
$(".go").click(() => {
  setTimeout(() => location.reload(), 333);
})


/**
 * Mocking #card .card generation instead of PHP
 */

async function generateGameCards() {
  const nums = [...Array(10).keys()];
  nums.shift();
  nums.splice(4, 1);
  const random = Math.floor(Math.random() * nums.length);
  nums.splice(random, 0, 5);

  const template = document.getElementById('card-template');
  const output = document.getElementById('card');

  return nums.forEach((num) => {
    let clone = template.content.cloneNode(true);
    let img = clone.querySelector('.content img');
    img.src = img.src.replace('__value', num);
    output.appendChild(clone);
  });
}

(async () => {
  await generateGameCards();
  playGame();
})();


/**
 * Mocking live data for Prizes
 */

const prizesData = [
  {
    name: "Grand Prize",
    capacity: 3,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>Grand Prize</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/grand.svg" alt="grand.svg"></div><div class="dashboard-info-flip-win-info-description"><p>2D1N Kukup Golf Resort for 2 +<br>6 months of color lens supply +<br>2 bottles of Bionics TrueMoist Solution</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This prize is non-transferable, non-refundable and non-exchangeable for cash or other prizes.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize entitles you to receive 2D1N Kukup Golf Resort for 2, 6 months of color lens supply and 2 bottles of Bionics TrueMoist Solution from BIONICS.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to select the type of product from Bionics, FirstLook and iColoris collection.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>How To Redeem?</span></h4><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 1</h6><span>Complete your <u>personal information</u> in your Account.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 2</h6><span>Click on the "REDEEM" button to confirm your redemption.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 3</h6><span>Sit back and relax, we will reach out to you soon.</span></li></ul></div></div>',
  }, {
    name: "2nd Prize",
    capacity: 25,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>2nd Prize</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/2nd.svg" alt="2nd.svg"></div><div class="dashboard-info-flip-win-info-description"><p>3 months of color lens supply +<br>1 bottle of Bionics TrueMoist Solution</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This prize is non-transferable, non-refundable and non-exchangeable for cash or other prizes.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize is redeemable after 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize entitles you to receive 3 months of color lens supply and 1 bottle of Bionics TrueMoist Solution from BIONICS.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to select the type of product from Bionics, FirstLook and iColoris collection.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>How To Redeem?</span></h4><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 1</h6><span>Complete your <u>personal information</u> in your Account.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 2</h6><span>Click on the "REDEEM" button to confirm your redemption.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 3</h6><span>Sit back and relax, we will reach out to you soon.</span></li></ul></div></div>',
  },
  {
    name: "3rd Prize",
    capacity: 50,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>3rd Prize</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/3rd.svg" alt="3rd.svg"></div><div class="dashboard-info-flip-win-info-description"><p>2 boxes of iColoris NEW* color lens +<br>1 bottle of Bionics TrueMoist Solution</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This prize is non-refundable and non-exchangeable for cash or other prizes.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize is redeemable after 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize entitles you to receive 2 boxes of *NEW iColoris Pictoris color lens and 1 bottle of Bionics TrueMoist Solution from BIONICS.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>How To Redeem?</span></h4><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 1</h6><span>Complete your <u>personal information</u> in your Account.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 2</h6><span>Click on the "REDEEM" button to confirm your redemption.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 3</h6><span>Sit back and relax, we will reach out to you soon.</span></li></ul></div></div>',
  },
  {
    name: "4th Prize",
    capacity: 100,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>4th Prize</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/4th.svg" alt="4th.svg"></div><div class="dashboard-info-flip-win-info-description"><p>1 box of iColoris NEW* color lens +<br>1 bottle of Bionics TrueMoist Solution</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This prize is non-refundable and non-exchangeable for cash or other prizes.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize is redeemable after 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This prize entitles you to receive 2 boxes of *NEW iColoris Pictoris color lens and 1 bottle of Bionics TrueMoist Solution from BIONICS.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>How To Redeem?</span></h4><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 1</h6><span>Complete your <u>personal information</u> in your Account.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 2</h6><span>Click on the "REDEEM" button to confirm your redemption.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Step 3</h6><span>Sit back and relax, we will reach out to you soon.</span></li></ul></div></div>',
  }, {
    name: "30% Voucher",
    capacity: 200,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>30% Voucher</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/30_discount.svg" alt="30_discount.svg" style="max-width: 185px;"></div><div class="dashboard-info-flip-win-info-description"><p>30% OFF on NEW* Color Lens purchase</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for *NEW iColoris Pictoris Color Lens purchase from 8 August 2019 to 30 September 2019 at selected stores to be announced on 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>Redeemable at:</span></h4><div class="dashboard-info-flip-win-info-description"><p>To be announced on 8 August 2019</p></div></div></div>',
  }, {
    name: "50% Voucher",
    capacity: 500,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>50% Voucher</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/50_discount.svg" alt="50_discount.svg" style="max-width: 185px;"></div><div class="dashboard-info-flip-win-info-description"><p>50% OFF on second Color Lens purchase</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for NEW iColoris Pictoris Color Lens purchase from 8 August 2019 to 30 September 2019 at selected stores to be announced on 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>Redeemable at:</span></h4><div class="dashboard-info-flip-win-info-description"><p>To be announced on 8 August 2019</p></div></div></div>',
  }, {
    name: "Buy 2 Free 1 Voucher",
    capacity: null,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>Buy 2 Free 1</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/b2f1.svg" alt="b2f1.svg" style="max-width: 234px;"></div><div class="dashboard-info-flip-win-info-description"><p>NEW* Color Lens Buy 2 Free 1</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for *NEW iColoris Pictoris Color Lens purchase from 8 August 2019 to 30 November 2019 at selected stores to be announced on 8 August 2019.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><h4 class="dashboard-info-flip-win-tnc-heading"><span>Redeemable at:</span></h4><div class="dashboard-info-flip-win-info-description"><p>To be announced on 8 August 2019</p></div></div></div>',
  }, {
    name: "RM 20 Spa Voucher",
    capacity: null,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>RM20 Voucher</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/logo-lavish_spa.svg" alt="logo-lavish_spa.svg" style="max-width: 240px"></div><div class="dashboard-info-flip-win-info-description"><p>Lavish Spa RM20 Voucher</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid from 7 July 2019 to 30 September 2019 at at Lavish Spa, Kuala Lumpur.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Lavish Spa</h6><span>Lot 5.02 & 5.06, Level 5, Fahrenheit 88, Jalan Bukit Bintang, 55100 Kuala Lumpur. <br>Tel: 03-21485888</span></li></ul></div></div>',
  }, {
    name: "RM 20 Spa Voucher",
    capacity: null,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>RM20 Voucher</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/logo-comfort.svg" alt="logo-comfort.svg"></div><div class="dashboard-info-flip-win-info-description"><p>Comfort Healthcare RM20 Voucher</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid from 7 July 2019 to 30 September 2019 at selected locations listed below.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Comfort Sri Hartamas</h6><span>44, Jalan 27/70A, Desa Sri Hartamas, 50480 Kuala Lumpur. <br>Tel: 03-62035755</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Comfort Sri Kepong</h6><span>Block-C-G-12, Jalan Metro Perdana 3, Taman Usahawan Kepong Utara, 52100 Kepong, Kuala Lumpur. <br>Tel: 03-62529755</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Comfort Taipan USJ</h6><span>26, Jalan USJ 9/5N, Subang Business Centre, 47610 Subang Jaya, Selangor. <br>Tel: 03-80817066</span></li></ul></div></div>'
  }
  , {
    name: "RM 20 Spa Voucher",
    capacity: null,
    content: '<div class="dashboard-info-flip-win"><div class="dashboard-info-flip-win-info-container dashboard-info-flip-win-container"><h3 class="dashboard-info-flip-win-info-heading"><span>Flip & Win Campaign</span></h3><h1 class="dashboard-info-flip-win-info-prize"><span>RM20 Voucher</span></h1><div class="dashboard-info-flip-win-info-image"><img src="./img/flip-win/logo-empire.svg" alt="logo-empire.svg"></div><div class="dashboard-info-flip-win-info-description"><p>Empire Wellness RM20 Voucher</p></div></div><button class="dashboard-info-flip-win-tnc-button" onclick="memberFlipWinTncToggle(event)"><span>TERMS & CONDITIONS</span><i class="icon"></i></button><div class="dashboard-info-flip-win-tnc-container dashboard-info-flip-win-container"><ol class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item">This voucher is non-transferable, non-refundable and non-exchangeable for cash.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid from 7 July 2019 to 30 September 2019 at selected locations listed below.</li><li class="dashboard-info-flip-win-tnc-list-item">This voucher is valid for ONE (1) time redemption only.</li><li class="dashboard-info-flip-win-tnc-list-item">Only ONE (1) voucher can be used at one time, and cannot be used together with other vouchers or promotions.</li><li class="dashboard-info-flip-win-tnc-list-item">BIONICS reserves the right to vary and amend any of the terms and conditions above without prior notice.</li></ol><ul class="dashboard-info-flip-win-tnc-list-container"><li class="dashboard-info-flip-win-tnc-list-item"><h6>Empire Wellness Puchong</h6><span>G-32 & G-34, Jalan Puteri 1/5, Bandar Puteri, 47100 Puchong, Selangor. <br>Tel: 010-2299774</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Empire Wellness Pudu</h6><span>190, Jalan Changkat Thambi Dollah, Pudu, 55100 Kuala Lumpur. <br>Tel: 03-92242884</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Empire Wellness Sri Petaling</h6><span>155, Ground Floor, Jalan Radin Bagus, Sri Petaling, 57000 Kuala Lumpur.</span></li><li class="dashboard-info-flip-win-tnc-list-item"><h6>Empire Wellness Rawang</h6><span>Lot 13152, PtT 11645 Belmas Johan, Rawang Intergrated Park, 48000 Rawang, Selangor.</span></li></ul></div></div>',
  }
];

