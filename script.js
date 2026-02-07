// ---------- 1) URL params ----------
const params = new URLSearchParams(window.location.search);
const receiverName = params.get("name") || "";
const senderName = params.get("from") || "";

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
if (receiverName) greetingEl.textContent = `Hi ${receiverName} 👋`;
if (senderName) footerEl.textContent = `– Sent with ❤️ by ${senderName}`;

// ---------- 4) NO button run-away (works on touch + mouse) ----------
function moveNoButton() {
  // Move inside the buttonsBox area only (safe for mobile)
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

// ---------- 5) YES click: show surprise + play audio ----------
yesBtn.addEventListener("click", async () => {
  question.textContent = "Yayyy!! 🥰💖";
  buttonsBox.style.display = "none";

  surprise.classList.remove("hidden");
  surprise.style.display = "block";

  try {
    song.currentTime = 0;
    await song.play();
  } catch (err) {
    // Some phones block sound if silent mode etc.
    result.textContent = "🔊 If audio didn’t start, tap the screen once and try again 🙂";
  }
});
// Put funReplies OUTSIDE the event listener
const funReplies = {
  Movie:
    "\uD83C\uDFD6\uFE0F A vacation sounds amazing! I would love a little getaway together - chocolates would make it even sweeter \uD83C\uDF6B",

  CoffeeDate:
    "\uD83D\uDED9\uFE0F Shopping sounds fun! A small surprise gift or teddy would be really cute \uD83E\uDDF8",

  IceCream:
    "\uD83C\uDFAC A movie date feels perfect - cozy vibes, popcorn and maybe some chocolate \uD83C\uDF7F \uD83C\uDF6B",

  EveningWalk:
    "\uD83D\uDD6F\uFE0F A candle light dinner sounds so romantic - flowers and soft moments would be lovely \uD83C\uDF39"
};

console.log("TEST_MESSAGE:", funReplies.Movie);



// ONLY ONE click handler
choices.addEventListener("click", (e) => {
  const btn = e.target.closest(".choice");
  if (!btn) return;

  const choice = btn.dataset.choice;
  const message = funReplies[choice] || "Happy Valentine's Day!";

const url = `https://wa.me/918688796356?text=${encodeURIComponent(message)}`;
window.location.href = url;

});

