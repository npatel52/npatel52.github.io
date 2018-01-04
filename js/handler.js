const INTERVAL = 1000; // 1 second
var firstKey = undefined;// To keep track of first key entered for minutes and seconds
var intervalVar = undefined;
var isInputChanged = true;
var isButtonStart = true;
var isPageRefreshed = false;

/**
TO DO: Use session storage to retain data

// for session sessionStorage
var last_hours = 0;
var last_minutes = 0;
var last_seconds = 0;

setVars = function(){
  sessionStorage.setItem("firstKey", firstKey);
  sessionStorage.setItem("isInputChanged", isInputChanged);
  sessionStorage.setItem("isButtonStart", isButtonStart);
}

getVars = function(){
  firstKey = sessionStorage.getItem("firstKey");
  isInputChanged = sessionStorage.setItem("isInputChanged");
  isButtonStart = sessionStorage.setItem("isButtonStart");
}

*/


// on page refresh
$(window).on("beforeunload", function(){
  setVars();
});

// on page load
$(window).on("load",function(){
  getVasrs();
});

// ready() ensures that html document is loaded first before running the jQuery code
$(document).ready(function (){

      $("#hours").forcePositiveIntegers();
      $("#minutes").forceRange();
      $("#seconds").forceRange();

      // To reset values of firstKey
      $("#minutes").focus(function(){
        firstKey = undefined;
      });

      $("#seconds").focus(function(){
        firstKey = undefined;
      });


      $("#hours").isValueChanged();
      $("#minutes").isValueChanged();
      $("#seconds").isValueChanged();


      $(":button").click(function(){
        buttonHandler();
      });



      $(window).keyup(function(key){ // key press have strange behavior
          if(key.keyCode == 32 || key.which == 32) { // space key pressed
              buttonHandler();
          }
      });

  });

  buttonHandler = function(){
     // change button on space key or click
      $(".start").toggleClass("stop");

      if(isButtonStart){
        isButtonStart = false;
        startTime();
      }else{ // it must be stop button
        isButtonStart = true;
        stopTime();
       }
  }

  startTime = function(){
    // if text input has been changed since last called then intialize new Timer
    if(isInputChanged){
      Timer(parseInt(document.getElementById("hours").value), parseInt(document.getElementById("minutes").value),parseInt(document.getElementById("seconds").value) );
      isInputChanged = false; // for monitoring next change in input field
    }
     // otherwise continue with old time
      intervalVar = setInterval(printTime, INTERVAL);
  };

  stopTime = function(){
    clearInterval(intervalVar);
  }

jQuery.fn.isValueChanged = function(){
  $(this).change(function(){
      isInputChanged = true;
  });
}

jQuery.fn.forcePositiveIntegers = function () {
        $(this).keypress(function (event) {
          // charCode doesn't always work
            var key = event.which || event.keyCode;
            // Only allows certain keypress, numbers, left and right arrow, tabs, delete, backspace, and tabs
            // need to insert key >= 97 && key <= 105 for PC. Laptops don't have numpads!
              if (key >= 48 && key <= 57 || key == 37 || key == 39 ||	key == 46 || key == 8 || key == 9)
                  return true;

              return false;
      });
  }

  // Ensures range of minutes and seconds to be in [0,59]
  jQuery.fn.forceRange = function () {
          $(this).keypress(function (event) {
            var key = event.which || event.keyCode;
            // always allow backspace and tab
            if(key == 8 || key == 9){
              firstKey = key;
              return true;
            }else if(firstKey >= 54 && firstKey <= 57){ // key 6,7,8,9 can't have digit following it due to min & sec format
              return false;
            }else if(key >= 48 && key <= 57){
                firstKey = key;
                return true;
            }
            return false;
          });
  }
