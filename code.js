const timeEl = document.getElementById('time');
const secEl = document.getElementById('sec');
const msEl = document.getElementById('ms');
const ampmEl = document.getElementById('ampm');

function pad(n) {
  return String(n).padStart(2, '0');
}

let last = {};

function update() {
  const now = new Date();

  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = Math.floor(now.getMilliseconds() / 10);

  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;

  if (last.h !== h || last.m !== m) {
    timeEl.childNodes[0].nodeValue = `${pad(h)}:${pad(m)} `;
  }

  if (last.s !== s) secEl.childNodes[0].nodeValue = pad(s);
  if (last.ms !== ms) msEl.textContent = pad(ms);

  ampmEl.textContent = suffix;

  last = { h, m, s, ms };
  requestAnimationFrame(update);
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'f') toggleFullscreen();
});

update();
