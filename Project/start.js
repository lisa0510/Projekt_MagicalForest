  // Wait for the document to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Function to show the button after 15 seconds
    function showButton() {
        document.getElementById("myButton").style.display = "block";
    }

   
    setTimeout(showButton, 28000);
});


function playAudio() {
  var audio = new Audio('audio/g2.wav');
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
}

window.onload = function() {
  playAudio(); // Attempt to play audio when the page loads
};