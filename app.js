/**
 * 🪔 DIWALI WISH LINK - ENGLISH EDITION FOR TEJU MADAM
 * Dedicated festive greeting, Canvas Fireworks, Web Audio Synthesizer,
 * WhatsApp share formatting, and interactive celebration.
 */

// ============================================================
// 1. STATE & CONTENT FOR TEJU MADAM (ENGLISH)
// ============================================================
const state = {
  recipientName: 'My Favorite Madam',
  audioEnabled: false,
  audioInitialized: false,
  activeDayIndex: 0,
};

const DIWALI_DAYS_DATA = [
  {
    title: "🪔 1. Vasubaras (Gowatsa Dwadashi)",
    desc: "A day celebrating gratitude and pure warmth. Wishing you endless peace, harmony, and joy in your life! ✨"
  },
  {
    title: "🪙 2. Dhanteras",
    desc: "Celebrating good health, prosperity, and blessings. May you achieve great success and happiness in everything you do! 🪙✨"
  },
  {
    title: "✨ 3. Naraka Chaturdashi (Choti Diwali)",
    desc: "Triumph of light over darkness. May all your days be filled with brightness, positivity, and high spirits! 🌸"
  },
  {
    title: "🪷 4. Maha Lakshmi Pujan",
    desc: "Inviting divine grace, beauty, and prosperity into your life. May Goddess Lakshmi bless you with endless joy and good fortune! 🪷"
  },
  {
    title: "👫 5. Govardhan Puja & Diwali Padwa",
    desc: "Celebrating sweet beginnings and cherished bonds. Wishing that your journey ahead is full of wonderful surprises and cheerful moments! 🌟"
  }
];

// ============================================================
// 2. AUDIO ENGINE (Pure Romantic Festive Song - Siren Removed)
// ============================================================
let audioCtx = null;

function initAudioContext() {
  if (state.audioInitialized && audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      state.audioInitialized = true;
    }
  } catch (e) {
    console.warn("Web Audio not supported:", e);
  }
}

// Siren sound completely removed: pure silence for SFX so ONLY the song plays
function playCrackerSound() {
  // Silent - lets the romantic song play purely and clearly without any siren or screeching noise
}

// Festive Background Song Controller
function playFestiveMusic() {
  state.audioEnabled = true;
  initAudioContext();

  const audio = document.getElementById('festiveAudio');
  const video = document.getElementById('festiveVideoFallback');

  let started = false;

  if (audio) {
    audio.volume = 0.85;
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        updateAudioButtonUI(true);
      }).catch(err => {
        console.warn("Festive audio playback fallback to video:", err);
        if (video) {
          video.volume = 0.85;
          video.play().then(() => {
            updateAudioButtonUI(true);
          }).catch(vErr => console.warn("Video fallback also blocked:", vErr));
        }
      });
      started = true;
    }
  }

  if (!started && video) {
    video.volume = 0.85;
    video.play().then(() => {
      updateAudioButtonUI(true);
    }).catch(e => console.warn(e));
  }

  updateAudioButtonUI(true);
}

function pauseFestiveMusic() {
  state.audioEnabled = false;
  const audio = document.getElementById('festiveAudio');
  const video = document.getElementById('festiveVideoFallback');
  if (audio) audio.pause();
  if (video) video.pause();
  updateAudioButtonUI(false);
}

function toggleAudio() {
  initAudioContext();
  const audio = document.getElementById('festiveAudio');
  const video = document.getElementById('festiveVideoFallback');
  const isPlaying = (audio && !audio.paused) || (video && !video.paused);

  if (isPlaying) {
    pauseFestiveMusic();
  } else {
    playFestiveMusic();
  }
}

function updateAudioButtonUI(isPlaying) {
  const btn = document.getElementById('musicToggleBtn');
  const icon = document.getElementById('audioIcon');
  const text = document.getElementById('audioText');
  if (!btn || !icon || !text) return;

  if (isPlaying) {
    btn.classList.remove('muted');
    icon.textContent = '🔊';
    text.textContent = 'Music ON';
  } else {
    btn.classList.add('muted');
    icon.textContent = '🔇';
    text.textContent = 'Music OFF';
  }
}

// ============================================================
// 3. CANVAS FIREWORKS ENGINE
// ============================================================
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const fireworks = [];
const particles = [];
const COLOR_PALETTE = [
  '#ffd700', '#ff3b30', '#ff9500', '#34c759', 
  '#00c7be', '#af52de', '#ff2d55', '#ffffff', '#ffeedd'
];

class Rocket {
  constructor(startX, startY, targetX, targetY) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(targetY - startY, targetX - startX);
    this.speed = 4.5;
    this.acceleration = 1.05;
    this.color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    playCrackerSound('rocket');
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = Math.hypot(this.x - this.startX, this.y - this.startY);

    if (this.distanceTraveled >= this.distanceToTarget || this.y <= this.targetY) {
      createParticles(this.targetX, this.targetY, this.color);
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.coordinates = [];
    this.coordinateCount = 4;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 7 + 1.5;
    this.friction = 0.94;
    this.gravity = 0.85;
    this.alpha = 1;
    this.decay = Math.random() * 0.018 + 0.012;
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function createParticles(x, y, color) {
  const particleCount = 45;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y, color));
  }
  playCrackerSound('burst');
}

function triggerRandomFirework() {
  const startX = width * 0.15 + Math.random() * (width * 0.7);
  const startY = height;
  const targetX = width * 0.1 + Math.random() * (width * 0.8);
  const targetY = height * 0.15 + Math.random() * (height * 0.45);
  fireworks.push(new Rocket(startX, startY, targetX, targetY));
}

function triggerCustomFirework(clientX, clientY) {
  const startX = clientX + (Math.random() * 60 - 30);
  const startY = height;
  fireworks.push(new Rocket(startX, startY, clientX, clientY));
}

// Main Canvas Animation Loop
function loop() {
  requestAnimationFrame(loop);

  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'lighter';

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  let j = particles.length;
  while (j--) {
    particles[j].draw();
    particles[j].update(j);
  }
}
loop();

// Ambient auto fireworks interval
setInterval(() => {
  if (Math.random() < 0.85) {
    triggerRandomFirework();
  }
}, 2200);

// Screen click / tap to burst fireworks
canvas.addEventListener('pointerdown', (e) => {
  initAudioContext();
  triggerCustomFirework(e.clientX, e.clientY);
});

// ============================================================
// 4. URL QUERY PARAMETER HANDLING
// ============================================================
function getRecipientNameFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('to') || params.get('name') || params.get('n') || '';
    return nameParam.trim();
  } catch (e) {
    return '';
  }
}

function updateRecipientNameUI(customName) {
  const recipientNameElem = document.getElementById('recipientName');
  const preview = document.getElementById('previewUrlText');
  
  if (customName && customName.trim().length > 0) {
    state.recipientName = customName.trim();
  } else {
    state.recipientName = 'My Favorite Madam';
  }

  if (recipientNameElem) {
    recipientNameElem.textContent = state.recipientName;
  }

  const baseOrigin = window.location.origin + window.location.pathname;
  if (preview) {
    preview.textContent = baseOrigin;
  }
}

// ============================================================
// 5. DIRECT WHATSAPP SHARE FOR TEJU MADAM
// ============================================================
function shareOnWhatsApp() {
  initAudioContext();
  
  const baseOrigin = window.location.origin + window.location.pathname;
  const shareLink = baseOrigin;

  const whatsappMessage = `🪔 *Teju Madam*, wishing you a joyful, sparkling & warm Diwali! ✨\n\nSpecially aapke liye ek chhota sa pyara festive surprise banaya hai, open karke dekhiye: 👇\n${shareLink}\n\n*"May your days be as bright and wonderful as your smile!"* 🪔✨\n\nWishing you and your family a very Happy & Prosperous Diwali! 🎁🌟`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(waUrl, '_blank');
}

function copyWishLink() {
  initAudioContext();
  const baseOrigin = window.location.origin + window.location.pathname;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(baseOrigin).then(() => {
      showToast('Link copied to clipboard! Share it on WhatsApp.');
    }).catch(() => {
      fallbackCopy(baseOrigin);
    });
  } else {
    fallbackCopy(baseOrigin);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Link copied to clipboard! Share it on WhatsApp.');
  } catch (err) {
    showToast('Link: ' + text);
  }
  document.body.removeChild(textarea);
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ============================================================
// 6. 5-DAYS OF DIWALI TABS
// ============================================================
function renderDaysPills() {
  const pillsContainer = document.getElementById('daysPillsContainer');
  if (!pillsContainer) return;

  pillsContainer.innerHTML = '';
  DIWALI_DAYS_DATA.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `day-pill ${index === state.activeDayIndex ? 'active' : ''}`;
    btn.setAttribute('data-day', index);
    btn.textContent = item.title.split(' ')[1] || item.title;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      state.activeDayIndex = index;
      updateDayInfo(index);
    });
    pillsContainer.appendChild(btn);
  });
}

function updateDayInfo(index) {
  const day = DIWALI_DAYS_DATA[index];
  if (!day) return;
  document.getElementById('dayInfoTitle').textContent = day.title;
  document.getElementById('dayInfoDesc').textContent = day.desc;
}

// ============================================================
// 7. SURPRISE UNBOXING EVENT HANDLERS
// ============================================================
function openSurprise() {
  const overlay = document.getElementById('surpriseOverlay');
  if (!overlay) return;

  playFestiveMusic();

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      triggerRandomFirework();
    }, i * 220);
  }

  overlay.classList.add('hidden');
}

// ============================================================
// 8. INITIALIZATION & EVENT LISTENERS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const customRecipient = getRecipientNameFromURL();
  if (customRecipient) {
    updateRecipientNameUI(customRecipient);
  } else {
    updateRecipientNameUI('My Favorite Madam');
  }

  renderDaysPills();
  updateDayInfo(0);

  // Surprise Overlay events
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  const giftBoxTrigger = document.getElementById('giftBoxTrigger');
  if (openSurpriseBtn) openSurpriseBtn.addEventListener('click', openSurprise);
  if (giftBoxTrigger) giftBoxTrigger.addEventListener('click', openSurprise);

  // Audio Toggle Button
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleAudio);

  // Share Buttons
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const stickyWhatsappBtn = document.getElementById('stickyWhatsappBtn');

  if (whatsappShareBtn) whatsappShareBtn.addEventListener('click', shareOnWhatsApp);
  if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyWishLink);
  if (stickyWhatsappBtn) stickyWhatsappBtn.addEventListener('click', shareOnWhatsApp);

  // Interactive Center Diya Click -> Bursts Fireworks!
  const interactiveDiyaStage = document.getElementById('interactiveDiyaStage');
  if (interactiveDiyaStage) {
    interactiveDiyaStage.addEventListener('click', () => {
      initAudioContext();
      triggerCustomFirework(window.innerWidth / 2, window.innerHeight * 0.35);
    });
  }

  // Tap anywhere on card to burst fireworks
  const greetingWishCard = document.getElementById('greetingWishCard');
  if (greetingWishCard) {
    greetingWishCard.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.day-pill') || e.target.closest('.center-diya-stage')) {
        return;
      }
      initAudioContext();
      triggerCustomFirework(e.clientX, e.clientY);
    });
  }

  // Sticky Bottom Share Bar (appears when scrolled past 250px)
  const stickyShareBar = document.getElementById('stickyShareBar');
  window.addEventListener('scroll', () => {
    if (!stickyShareBar) return;
    if (window.scrollY > 280) {
      stickyShareBar.classList.add('visible');
    } else {
      stickyShareBar.classList.remove('visible');
    }
  });

  // Tap anywhere on document to resume audio if paused
  document.body.addEventListener('click', () => {
    if (state.audioEnabled && audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: true });
});
