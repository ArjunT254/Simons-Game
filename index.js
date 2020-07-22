var buttoncolors = ["red", "blue", "green", "yellow"];
var pattern = [];
var userpattern = [];
var started = -1;

function nextsequence() //To generate random sequence
{
  userpattern = [];
  var random = Math.floor((Math.random() * 4));
  var randomcolor = buttoncolors[random];
  pattern.push(randomcolor);

  $("#" + randomcolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomcolor);

  started++;
  changeheading(started);

}

function handler(event) //TO take and store the user input
{
  var clicked = $(this).attr("id");
  userpattern.push(clicked);
  playsound(clicked);
  animatePress($(this));
  checkseq(userpattern.length - 1);///IMPORTAND Checking if the entered value of click is same as that of pattern,CHECK OCCURS FOR EACH CLICK YOU GIVE
                                  //Ex:for 1st input it checks pattern[0]==userpattern[0]
                                  //For level 1 it checks patter[0]==userpattern[0](1st entered click),then when clicked again this becomes userpattern[1]
                                  //This is then checked again with pattern[1]==userpattern[1]; (length-1==1)in this case;
}

function checkseq(curlevel)  {
  if (userpattern[curlevel] === pattern[curlevel]) {     //CLICKED IS CORRECT OR NOT
    console.log("success");
    if (userpattern.length === pattern.length) {        //checks if user has entered same number of userpatten elements as patten elements
      setTimeout(function() {
        nextsequence();
      }, 700);
    }
  } else {
    if (started !== -1) {         //if wrong reset the game to initial states clear patterns,make wrong sound
      userpattern = [];
      pattern = [];
      playsound("wrong");

      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");

      }, 200);



      setTimeout(function() {
        $("h1").text("Press A Key to Start");
      }, 750);
    }
    started = -1;
  }

}

$(document).click(function() {
  if (started === -1) {
    nextsequence();
  }
}); //TO start the game and to observe the first keypress


$(".btn").click(handler); //To get the input clicked by the user








function playsound(input) //TO play the sounds
{
  var audio = new Audio("sounds/" + input + ".mp3");
  audio.play();
}

function animatePress(currentcolor) {   //blink when clicked
  currentcolor.addClass("pressed");
  setTimeout(function() {
    currentcolor.removeClass("pressed")
  }, 100);
}

function changeheading(level) {//Change heading for each level
  $("h1").text("Level :" + level);
}
