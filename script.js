// No button escape logic
const noBtn = document.getElementById("noBtn");

// Name from URL


const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");

// Move "No" button to a random position INSIDE the card
function moveNoButton() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Keep it within the card bounds (with padding)
  const padding = 12;
  const maxX = cardRect.width - btnRect.width - padding;
  const maxY = cardRect.height - btnRect.height - padding;

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  // Position absolute inside card
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0,0)";
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Touch screens: run away when finger touches it
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // prevents click
  moveNoButton();
}, { passive: false });

// Universal: pointer events (covers touch + pen + mouse on many devices)
noBtn.addEventListener("pointerdown", (e) => {
  // On mobile, this triggers before click
  e.preventDefault();
  moveNoButton();
});

// Optional: run away when finger comes close on the card (mobile-friendly)
card.addEventListener("pointermove", (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (btnRect.left + btnRect
