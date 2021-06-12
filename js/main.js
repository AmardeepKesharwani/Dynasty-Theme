
$(document).ready(function () {

  $('.nav-toggle').click(function () {

    $('body').toggleClass('open');
    navigator.vibrate(['50', '100']);
    if ($('body').hasClass('open')) {
      spiking('menu open');
    } else {
      spiking('menu close');
    }
  });
  $(".menu-list li a").click(function () {
    if ($('body').hasClass('open')) {
      $('body').removeClass('open');
    }
  });

  /* speecking function */
  $(".menu-list li").on('click, mouseover', function () {
    let txt = $(this).children().text();
    spiking(txt);
  });

  function getText(cls) {
    $(cls).on('click', function () {
      let txt = $(this).text();
      spiking(txt);
    });
  }

  getText(".read");
  getText(".filter-btn button");
  getText(".sec-title h1");

  let isFirst = true;
  $(".sec-a").on('click', function () {
    if (isFirst) {
      spiking('thank you for visit this site');
      isFirst = false
    }
  });

  /* background height clc*/
  (function () {
    let height = $('.wrapper').height();
    $(".background").height(height);
  })();
  // scroll js initialize
  new scroll().init();



  /*-----------------------------
      work filters
  ------------------------------*/
  $('.flt1').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    filtering(".card1,.card2,.card3,.card4", "")
  });
  $('.flt2').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    filtering(".card1,.card3,.card4", ".card2")
  });

  $('.flt3').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    filtering(".card1,.card2", ".card3,.card4");
  });
  function filtering(sho, hid = '') {
    $(sho).fadeIn();
    $(hid).fadeOut();
  }


  $(".sec-c .card-img").click(function () {
    $(this).addClass('hover');
    setTimeout(function () {
      $(".sec-c .card-img").removeClass('hover');
    }, 800);
  });
  /*-----------------------------
     Scrolling indicator
  ------------------------------*/

  $(window).scroll(function () {
    let scroll = $(window).scrollTop();
    let wh = $(window).height(),
      dh = $(document).height();
    let value = (scroll / (dh - wh) * 100);
    $("#progress").css('width', value + '%');
    $("#progress").css('filter', "hue-rotate(" + value + "deg)");
  });

  /*-----------------------------
  Speech Synthesis 
  ------------------------------*/

  function spiking(message) {
    if ('speechSynthesis' in window) {
      var speech = new SpeechSynthesisUtterance();

      // Set the text and voice attributes.
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 0.7;

      window.speechSynthesis.speak(speech);
    }
  }
  /*-----------------------------
     form validation 
  ------------------------------*/
  $("#contact-form").on("submit", (e) => {
    e.preventDefault();
    let form = $(this);
    let name = $(form).find("#name").val();
    let email = $(form).find("#email").val();
    let message = $(form).find("#message").val();
    $(form).find(".error").removeClass("error");

    if (name === '') {
      $("#name").addClass("error");
      spiking("Please Enter the your Name");
      return;
    } else if (email === '') {
      $("#email").addClass("error");
      spiking('Please Enter the your Email');
      return;
    } else if (message === '') {
      $("#message").addClass("error");
      spiking("Write some message");
      return;
    } else {
      spiking('form submit');
      location.reload();
    }
  });
}); // end 