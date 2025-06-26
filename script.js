const now = new Date();
const targetDate = new Date(
  now.getFullYear(),
  5,     // June → month index is 0-based → 5 = June
  27,    // 27th day
  0,     // hour = 0 (midnight)
  0,     // minute = 0
  0      // second = 0
);


console.log("Now is", now.toLocaleTimeString());
console.log("Target is", targetDate.toLocaleTimeString());

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");

// helper to show the birthday message
function showMessage() {
  console.log("🎉 Time's up! Showing message and firing confetti.");
  // hide the timer
  countdownEl.style.display = "none";
  // remove hidden class in case it's still there
  messageEl.classList.remove("hidden");
  // make message visible by changing color
  messageEl.style.color = "white";
   // Show both image containers
  const topImgC = document.getElementById("topimageContainer");
  const botImgC = document.getElementById("bottomimageContainer");

  topImgC.classList.remove("hidden");
  botImgC.classList.remove("hidden");

  // If you're using fade-in
  topImgC.classList.add("show");
  botImgC.classList.add("show");
  // launch animations
  launchConfetti();
}

// update loop
function updateCountdown() {
  const nowTick = new Date();
  const distance = targetDate - nowTick;
  
  if (distance <= 0) {
    clearInterval(interval);
    showMessage();
    return;
  }
  
  // calculate units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
}

// confetti as before
function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// start
const interval = setInterval(updateCountdown, 1000);
updateCountdown();
// —— Cursor Fireworks Effect ——
const cursorCanvas = document.getElementById('cursor-canvas');
const cx = cursorCanvas.getContext('2d');

// resize to full viewport
function resizeCursorCanvas() {
  cursorCanvas.width  = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCursorCanvas);
resizeCursorCanvas();

// particle store
const particles = [];

// on each mouse move, spawn a small burst
window.addEventListener('mousemove', (e) => {
  const count = 8;    // number of sparks per move
  for (let i = 0; i < count; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      // random velocity
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      alpha: 1,
      size: Math.random() * 3 + 2,
      decay: Math.random() * 0.02 + 0.01
    });
  }
});

// animation loop
function animateParticles() {
  cx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    // draw
    cx.globalAlpha = p.alpha;
    cx.beginPath();
    cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    cx.fillStyle = ' #FF0000';
    cx.fill();
    // update
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.decay;
    // remove when invisible
    if (p.alpha <= 0) particles.splice(i, 1);
  }
  cx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();
