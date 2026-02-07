// Personalize greeting via URL: ?name=Gajender&from=Someone
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const from = params.get("from");

const greetingEl = document.getElementById("greeting");
const footerEl = document.getElementById("footer");

if (name) greetingEl.textContent = `Hi ${name} 👋`;
if (from) footerEl.textContent = `– Sent with ❤️ by ${from}`;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsBox = document.getElementById("buttonsBox");
const surprise = document.getElementById("surprise");
const song = document.getElementById("song");
const question = document.getElementById("question");
const result = document.getElementById("result");

// Move "No" inside the buttons area (works on mobile)
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

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile touch + fallback click
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// YES click: show surprise + play audio
yesBtn.addEventListener("click", async () => {
  question.textContent = "Yayyy!! 🥰💖";
  buttonsBox.style.display = "none";
  surprise.classList.remove("hidden");

  // Audio can play because it’s initiated by a user click
  try {
    song.currentTime = 0;
    await song.play();
  } catch (err) {
    // Some browsers still block if device is in silent mode etc.
    result.textContent = "🔊 Tap once more if audio didn’t start (mobile sometimes blocks sound).";
  }
});

// Handle interest selection
document.getElementById("choices").addEventListener("click", (e) => {
  const btn = e.target.closest(".choice");
  if (!btn) return;

  const choice = btn.dataset.choice;
  const funReplies = {
    "Vacation": "🏖️ Vacation it is! Pack your bags… I’ll bring the snacks 😄",
    "Shopping": "🛍️ Shopping? Okay, but I’m the cart manager 😌",
    "Movie": "🎬 Movie date locked! Popcorn is non-negotiable 🍿",
    "Candle light dinner": "🕯️ Candle light dinner? Very classy. I’ll try not to spill anything 😅"
  };

  result.textContent = funReplies[choice] || `Nice! ${choice} 😄`;
});

// Initial position
moveNoButton();
