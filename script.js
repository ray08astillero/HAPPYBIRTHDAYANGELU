const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const tapButton = document.getElementById("tapButton");
const song = document.getElementById("birthdaySong");
const musicButton = document.getElementById("musicButton");

function blastConfetti(amount = 180) {
  const symbols = ["🎉", "✨", "🎊"];
  for (let i = 0; i < amount; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = Math.random() < .15 ? symbols[Math.floor(Math.random()*symbols.length)] : "";
    c.style.left = (Math.random() * 100) + "vw";
    c.style.background = ["#ff5c8a", "#ffd166", "#7ee8fa", "#b28dff", "#7dff9b"][Math.floor(Math.random()*5)];
    c.style.setProperty("--drift", ((Math.random() - .5) * 45) + "vw");
    c.style.animationDuration = (2.2 + Math.random() * 3.8) + "s";
    c.style.animationDelay = (Math.random() * .8) + "s";
    document.getElementById("celebrationLayer").appendChild(c);
    setTimeout(() => c.remove(), 6500);
  }
}

tapButton.addEventListener("click", () => {
  intro.style.opacity = "0";
  intro.style.transition = "opacity .7s ease";
  setTimeout(() => {
    intro.classList.add("hidden");
    mainPage.classList.remove("hidden");
  }, 700);

  blastConfetti();

  // Browsers generally allow audio after a user click.
  song.play().then(() => {
    musicButton.textContent = "🔊 Birthday Song";
  }).catch(() => {
    musicButton.textContent = "▶ Play Birthday Song";
  });
});

musicButton.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    musicButton.textContent = "🔊 Birthday Song";
  } else {
    song.pause();
    musicButton.textContent = "🔇 Birthday Song";
  }
});

// Modal controls
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.modal).classList.add("show");
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("show");
    const video = btn.closest(".modal")?.querySelector("video");
    if (video) video.pause();
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("show");
      const video = modal.querySelector("video");
      if (video) video.pause();
    }
  });
});

// Album opens another tab.
document.getElementById("albumButton").addEventListener("click", () => {
  window.open("album.html", "_blank");
});

// Cake flames
const blowButton = document.getElementById("blowButton");
const flames = [document.getElementById("flameLeft"), document.getElementById("flameRight")];
let candlesOut = false;

blowButton.addEventListener("click", () => {
  if (candlesOut) {
    flames.forEach(f => f.classList.remove("out"));
    candlesOut = false;
    blowButton.textContent = "Tap the flames ✨";
    document.getElementById("wishText").textContent = "Tap the flames to blow out the candles!";
  } else {
    flames.forEach(f => f.classList.add("out"));
    candlesOut = true;
    blowButton.textContent = "Light them again 🕯️";
    document.getElementById("wishText").textContent = "Wish made! Happy 29th Birthday, Angelu! 💕";
    blastConfetti(60);
  }
});

// Also let the actual flames be tapped.
flames.forEach(flame => {
  flame.addEventListener("click", () => blowButton.click());
});
