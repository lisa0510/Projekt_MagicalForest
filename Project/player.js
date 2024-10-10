const speed = 2;

//=====================================
// Playfield Objekt
//=====================================
const playfield = {
  elem: document.getElementById("playfield"),
  x: 0,
  y: 0,
  minX: 0,
  maxX: 1000,
  minY: 0,
  maxY: 1000,
  collisionBoxes: [], // Array zur Speicherung von Kollisionsboxen

  // Funktion zum Hinzufügen einer Kollisionsbox
  addCollisionBox: function (x, y, width, height) {
    this.collisionBoxes.push({ x: x, y: y, width: width, height: height });
  },

  // Funktion zum Zeichnen der Kollisionsboxen 
  drawCollisionBoxes: function () {
    this.collisionBoxes.forEach((box) => {
      const boxElem = document.createElement("div");
      boxElem.classList.add("collision-box");
      boxElem.style.position = "absolute";
      boxElem.style.left = box.x + "px";
      boxElem.style.top = box.y + "px";
      boxElem.style.width = box.width + "px";
      boxElem.style.height = box.height + "px";
      this.elem.appendChild(boxElem);
    });
  },

  up: function () {
    if (this.y > this.minY) {
      this.y -= speed;
    }
  },
  down: function () {
    if (this.y < this.maxY) {
      this.y += speed;
    }
  },
  right: function () {
    if (this.x > this.minX) {
      this.x -= speed;
    }
  },
  left: function () {
    if (this.x < this.maxX) {
      this.x += speed;
    }
  },
  draw: function () {
    this.elem.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
  },
  update: function (followObj) {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // Berechne die Kamera-Position relativ zum Spieler
    const camX =
      Math.round(viewportW / 2) -
      Math.round(followObj.x + followObj.elem.offsetWidth / 2);
    const camY =
      Math.round(viewportH / 2) -
      Math.round(followObj.y + followObj.elem.offsetHeight / 2);

    // Überprüfe, ob der Spieler in der Mitte des Bildschirms ist
    if (
      followObj.x + followObj.elem.offsetWidth / 2 >= viewportW / 2 &&
      followObj.x + followObj.elem.offsetWidth / 2 <=
        this.maxX - viewportW / 2 &&
      followObj.y + followObj.elem.offsetHeight / 2 >= viewportH / 2 &&
      followObj.y + followObj.elem.offsetHeight / 2 <= this.maxY - viewportH / 2
    ) {
      // Spieler ist in der Mitte des Bildschirms, verschiebe das Playfield
      this.x = -followObj.x + viewportW / 2 - followObj.elem.offsetWidth / 2;
      this.y = -followObj.y + viewportH / 2 - followObj.elem.offsetHeight / 2;
    } else {
      // Spieler ist am Rand des Bildschirms, halte das Playfield am Rand
      this.x = Math.min(
        Math.max(
          -followObj.x + viewportW / 2 - followObj.elem.offsetWidth / 2,
          viewportW - this.maxX
        ),
        0
      );
      this.y = Math.min(
        Math.max(
          -followObj.y + viewportH / 2 - followObj.elem.offsetHeight / 2,
          viewportH - this.maxY
        ),
        0
      );
    }
  },
};

// Beispiel für das Hinzufügen von Kollisionsboxen zum Playfield
playfield.addCollisionBox(600, 575, 210, 118);
playfield.addCollisionBox(1000, 45, 250, 1018);
playfield.addCollisionBox(300, 950, 800, 118);


//maze
//maze aussen horizontal
//ganz links
playfield.addCollisionBox(525, 315,67, 3);
playfield.addCollisionBox(525, 355,67, 3);
//ganz oben und unten
playfield.addCollisionBox(569, 250, 150, 5);
playfield.addCollisionBox(555, 390, 140, 5);

//maze innen vertikal
playfield.addCollisionBox(625, 290,5, 70);
playfield.addCollisionBox(590, 250,5, 70);
playfield.addCollisionBox(590, 370,5, 25);
playfield.addCollisionBox(670, 300, 90, 5);
playfield.addCollisionBox(670, 340, 60, 5);
playfield.addCollisionBox(710, 450, 80, 5);
//links neben spellwand
playfield.addCollisionBox(700, 350,5, 90);
playfield.addCollisionBox(730, 350,5, 50);
//ganz rechts vertikal 
playfield.addCollisionBox(770, 310,5, 120);
playfield.addCollisionBox(720, 270,5, 45);


//=====================================
// PlayfieldHouse Objekt
//=====================================
const playfieldHouse = {
  elem: document.getElementById("playfieldHouse"),
  x: 0,
  y: 0,
  minX: 0,
  maxX: 1500,
  minY: 0,
  maxY: 1200,
  draw: function () {
    this.elem.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
  },
};

//=====================================s
// Player Objekt
//=====================================
const player = {
  elem: document.getElementById("player"),
  skin: document.getElementById("player-skin"),
  x: 670,
  y: 930,
  minX: 90,
  maxX: 1960,
  minY: 120,
  maxY: 1960,
  up: function () {
    if (this.y > this.minY) {
      this.y -= speed;
    }
  },
  down: function () {
    if (this.y < this.maxY) {
      this.y += speed;
    }
  },
  left: function () {
    if (this.x > this.minX) {
      this.x -= speed;
    }
  },
  right: function () {
    if (this.x < this.maxX) {
      this.x += speed;
    }
  },
  draw: function (cmd) {
    this.elem.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    this.skin.className = cmd;
    console.log(this.x, this.y);
  },

  // Funktion zur Kollisionsprüfung
  checkCollision: function () {
    const playerBox = {
      x: this.x,
      y: this.y,
      width: this.elem.offsetWidth,
      height: this.elem.offsetHeight,
    };
    // Überprüfen, ob der Spieler mit einer Kollisionsbox kollidiert
    for (const box of playfield.collisionBoxes) {
      if (
        playerBox.x < box.x + box.width &&
        playerBox.x + playerBox.width > box.x &&
        playerBox.y < box.y + box.height &&
        playerBox.y + playerBox.height > box.y
      ) {
        // Kollision festgestellt, hier können entsprechende Aktionen durchgeführt werden
        console.log("Collision detected!");
        return true; // Kollision festgestellt
      }
    }
    return false; // Keine Kollision festgestellt
  },
};

//=====================================
// Game Loop
//=====================================
let run = false;

// Start and Stop Game OnClick

  

  function startGame() {
  
  requestAnimationFrame(gameLoop, 10);
}


// Game Loop aktualisieren, um beide Playfields und den Spieler zu zeichnen
let gameLoop = function () {
  playfield.update(player);

 

  let playerMoved = false; // Variable zur Überprüfung, ob der Spieler sich bewegt hat

  if (!cmd.includes("stay")) {
    if (cmd.includes("right") && player.x < player.maxX) {
      player.right();
      playerMoved = true;
    } else if (cmd.includes("left") && player.x > player.minX) {
      player.left();
      playerMoved = true;
    }
    if (cmd.includes("up") && player.y > player.minY) {
      player.up();
      playerMoved = true;
    } else if (cmd.includes("down") && player.y < player.maxY) {
      player.down();
      playerMoved = true;
    }
  }

  // Kollisionsprüfung nach der Spielerbewegung
  if (playerMoved && player.checkCollision()) {
    // Spieler hat sich bewegt und kollidiert
    // In diesem Fall die Spielerbewegung rückgängig machen
    if (cmd.includes("right")) {
      player.left();
    } else if (cmd.includes("left")) {
      player.right();
    }
    if (cmd.includes("up")) {
      player.down();
    } else if (cmd.includes("down")) {
      player.up();
    }
  }

  playfield.draw();
  player.draw(cmd);
  // Bewege das playfieldHouse-Element in den Vordergrund, indem es nach dem Spieler-Element eingefügt wird
  playfield.elem.appendChild(playfieldHouse.elem);

  playfieldHouse.draw(player.x, player.y, playfield.x, playfield.y); // Aktualisiere die Position des playfieldHouse

  requestAnimationFrame(gameLoop, 10);
};

//=====================================
// Tastaturabfrage
//=====================================

globalThis.addEventListener("keydown", onkeydown, false);
globalThis.addEventListener("keyup", onkeyup, false);

let cmd = "run-up";
let keys = {};
onkeydown = onkeyup = (e) => {
  keys[e.code] = e.type == "keydown";
 if (keys.KeyW) {
    cmd = "run-up";
  } else if (keys.KeyD) {
    cmd = "run-right";
  } else if (keys.KeyS) {
    cmd = "run-down";
  } else if (keys.KeyA) {
    cmd = "run-left";
  } else {
    if (cmd.includes("left")) {
      cmd = "stay-left";
    } else if (cmd.includes("right")) {
      cmd = "stay-right";
    } else if (cmd.includes("up")) {
      cmd = "stay-up";
    } else if (cmd.includes("down")) {
      cmd = "stay-down";
    }
  }
};

startGame();
