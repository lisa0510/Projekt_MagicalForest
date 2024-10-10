  // Wait for the document to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Function to show the button after 15 seconds
    function showButton() {
        document.getElementById("myButton").style.display = "block";
    }

   
    setTimeout(showButton, 28000);
});


function playAudio() {
  var audio = document.getElementById("backgroundAudio");
  audio.play(); // Play audio when button is clicked
}