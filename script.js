
const name = 'sumana sri';
if (name) document.getElementById("greeting").textContent = `Hi ${name} 👋`;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsBox = document.querySelector(".buttons");

function moveNoButton() {
  const box = buttonsBox.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 6;
  const maxX = box.width - btn.width - padding;
  const maxY = box.height - btn.height - padding;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Desktop: hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile + Desktop: touch/click
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Optional: when they tap anywhere in buttons area, also make it run
buttonsBox.addEventListener("touchstart", () => moveNoButton(), { passive: true });

yesBtn.addEventListener("click", () => {
  alert("Yayyy!!! 💖🥰");
});

// initial random position
moveNoButton();
