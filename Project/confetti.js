const pressed = [];
const secretCode = 'DI';
const p = document.querySelector('p');
const confetti = document.querySelector('.confetti-time');

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  const currentCode = pressed.join('').toLowerCase(); // Umwandlung in Kleinbuchstaben
  const secretCodeLowerCase = secretCode.toLowerCase(); // Umwandlung des geheimen Codes in Kleinbuchstaben
  if(currentCode.includes(secretCodeLowerCase)) { // Vergleich in Kleinbuchstaben
    console.log('Correct!');
    p.innerHTML = 'You entered the secret code!';
    confetti.style.visibility = 'visible';
    document.getElementById("wand").style.display = "block";
    var audio = document.getElementById("wand");
    audio.play(); // Play audio when wand is clicked
  }
  console.log(pressed);
});


