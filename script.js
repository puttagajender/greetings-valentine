// ---------- 1) Hardcoded names ----------
const receiverName = "Sumana Sree";
const senderName = "Gajender";

// ---------- 2) Elements ----------
const greetingEl = document.getElementById("greeting");
const footerEl = document.getElementById("footer");
const questionEl = document.getElementById("question");

const buttonsBox = document.getElementById("buttonsBox");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const surprise = document.getElementById("surprise");
const choices = document.getElementById("choices");
const result = document.getElementById("result");

const song = document.getElementById("song");

// ---------- 3) Set greeting/footer ----------
if (greetingEl) greetingEl.textContent = `Hi ${receiverName} 👋`;
if (footerEl) footerEl.textContent = `– Sent with ❤️ by ${senderName}`;

// ---------- 4) NO button run-away (touch + mouse) ----------
function moveNoButton() {
  const box = buttonsBox.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 6;
  const maxX = Math.max(0, box.width - btn.width - padding);
  const maxY = Math.max(0, box.height - btn.height - padding);

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// initial position
moveNoButton();

yesBtn.addEventListener("click", async () => {
  questionEl.textContent = "Yayyy!! 🥰💖";
  buttonsBox.style.display = "none";

  surprise.classList.remove("hidden");
  surprise.style.display = "block";

  try {
    song.currentTime = 0;
    song.loop = true;          // ✅ LOOP ENABLED
    await song.play();
  } catch (err) {
    result.textContent = "🔊 If audio didn’t start, tap once and try again 🙂";
  }
});


// ---------- 6) Replies (emoji-safe via unicode escapes) ----------
const funReplies = {
  Movie:
    "\uD83C\uDFD6\uFE0F Vacation sounds amazing! A little getaway + chocolates would be so sweet \uD83C\uDF6B",
  CoffeeDate:
    "\uD83D\uDED9\uFE0F Shopping sounds fun! A cute little gift or teddy would be perfect \uD83E\uDDF8",
  IceCream:
    "\uD83C\uDFAC Movie date feels perfect - cozy vibes, popcorn, and chocolate \uD83C\uDF7F \uD83C\uDF6B",
  EveningWalk:
    "\uD83D\uDD6F\uFE0F Candle light dinner sounds so romantic - flowers and soft moments \uD83C\uDF39",
};

choices.addEventListener("click", (e) => {
  const btn = e.target.closest(".choice");
  if (!btn) return;

  // ✅ STOP AUDIO
  song.pause();
  song.currentTime = 0;
  song.loop = false;

  const choiceKey = btn.dataset.choice;
  const optionWithEmoji = btn.textContent.trim();

  const message =
    `${optionWithEmoji}\n` +
    (funReplies[choiceKey] || "Happy Valentine's Day! ❤️");

  const phone = "918688796356";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
});

