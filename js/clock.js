function updateDateAndTime(){
  var dateAndTime = new Date();
  document.getElementById("date_and_time").innerHTML = dateAndTime;
}
setInterval(updateDateAndTime, 1000);
