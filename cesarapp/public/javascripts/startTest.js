var startTime = 0;
var waitInterval = 0;

// Loads the content as soon as the page is shown
function onLoad() {
  document.getElementById("divcircle").style.display = "none";
  document.getElementById("endButton").style.display = "none";
  $("#startButton").focus();
}

function startTest() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("endButton").style.display = "inline";
  $("#endButton").focus();
  document.getElementById("divcircle").style.display = "inline";
  $("#desc").fadeOut(2000);
  $("#divcircle")
    .css({
      opacity: 0,
      left: "500px",
    })
    .animate({
      opacity: 1,
      left: 0,
    }, 1500);

  // Waiting a random time interval of 2 to 7 seconds before the ball
  // becomes blue
  waitInterval = (Math.random() * 5) + 2;
  startTime = new Date().getTime();

  sleep(waitInterval * 1000).then(() => {
    document.getElementById("circle").style.fill = "blue";
  });
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function endTest() {
  var endTime = new Date().getTime();

  // Checking the user's reaction time  
  if (endTime - startTime < waitInterval * 1000) {
    window.alert("Clicked before the circle became blue :(");
  } else {
    window.alert("Reaction time: " + (endTime - (startTime + waitInterval * 1000)) + " ms");
  }

  // Reset the UI
  document.getElementById("startButton").style.display = "inline";
  $("#startButton").text("Retry");
  $("#startButton").focus();
  document.getElementById("endButton").style.display = "none";
  document.getElementById("circle").style.fill = "red";
}