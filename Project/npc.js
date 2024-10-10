// Modal für Bunny
const openModalImage = document.getElementById("bunny");
const modal = document.getElementById("bunnymodal");
const closeBtn = modal.querySelector(".close-modal-btn");

function openBunnyModal() {
  modal.style.display = "block";
  var audio = new Audio("audio/api.wav");
  audio.play();
  audio.volume = 2;
}

function closeBunnyModal() {
  modal.style.display = "none";
}

openModalImage.addEventListener("click", openBunnyModal);
closeBtn.addEventListener("click", closeBunnyModal);

// Modal für Deer
const openModalImage1 = document.getElementById("deer");
const modal1 = document.getElementById("deermodal");
const closeBtn1 = modal1.querySelector(".close-modal-btn");

function openDeerModal() {
  modal1.style.display = "block";
  var audio = new Audio("audio/marinnew2.wav");
  audio.play();
  audio.volume = 2;

}

function closeDeerModal() {
  modal1.style.display = "none";

}

openModalImage1.addEventListener("click", openDeerModal);
closeBtn1.addEventListener("click", closeDeerModal);

// Modal für Witch
const openModalImage2 = document.getElementById("witch");
const modal2 = document.getElementById("witchmodal");
const closeBtn2 = modal2.querySelector(".close-modal-btn");

function openWitchModal() {
  modal2.style.display = "block";
  var audio = new Audio("audio/witch.wav");
  audio.play();
  audio.volume = 2;
}

function closeWitchModal() {
  modal2.style.display = "none";
}

openModalImage2.addEventListener("click", openWitchModal);
closeBtn2.addEventListener("click", closeWitchModal);
