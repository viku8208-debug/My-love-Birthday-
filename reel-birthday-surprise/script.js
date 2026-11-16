(() => {
  const config = window.BIRTHDAY_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const welcome = $('#welcome');
  const nope = $('#nope');
  const story = $('#storybook');
  const pages = $$('.story-page');
  let currentPage = 1;
  let musicPlaying = false;
  const birthdayAudio = new Audio('assets/birthday-song.mp3');
  birthdayAudio.loop = true;
  birthdayAudio.preload = 'auto';
  birthdayAudio.volume = 0.58;
  let fallbackContext = null;
  let fallbackTimer = null;
  let fallbackStep = 0;
  let noMoves = 0;

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) element.textContent = value;
  }
  setText('cover-name', config.recipientName || 'my pretty girl');
  setText('final-name', config.recipientName || 'my pretty girl');
  setText('cover-from', `with love, ${config.senderName || 'someone who adores you'} ♡`);
  setText('letter-from', config.senderName || 'someone who adores you');
  setText('final-from', `Forever cheering for you, ${config.senderName || 'someone who adores you'} ♡`);
  setText('date-stamp', config.birthdayDate ? new Date(`${config.birthdayDate}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }).toUpperCase() : 'A DAY TO REMEMBER');
  setText('final-name', config.recipientName || 'my pretty girl');
  if (config.coverMessage) $('.lead-copy').textContent = config.coverMessage;
  if (config.finalMessage) $('.final-message').textContent = config.finalMessage;
  if (Array.isArray(config.letterParagraphs)) {
    const body = $('#birthday-letter');
    const signoff = $('.letter-signoff', body);
    body.querySelectorAll('p:not(.letter-signoff)').forEach(p => p.remove());
    config.letterParagraphs.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      body.insertBefore(p, signoff);
    });
  }

  // Load only photos the owner adds to /assets. Missing photos remain placeholders.
  $$('[data-photo]').forEach(slot => {
    const key = slot.dataset.photo;
    const path = config.photos && config.photos[key];
    if (!path) return;
    const img = new Image();
    img.alt = 'A personal birthday memory';
    img.onload = () => {
      slot.classList.add('has-photo');
      slot.replaceChildren(img);
    };
    img.onerror = () => {};
    img.src = path;
  });

  function showScene(scene) {
    [welcome, nope, story].forEach(item => {
      item.classList.remove('active');
      item.hidden = item !== scene;
    });
    requestAnimationFrame(() => scene.classList.add('active'));
  }

  function updateMusicControl() {
    $('#music-button').setAttribute('aria-pressed', String(musicPlaying));
    $('#music-label').textContent = musicPlaying ? 'MUSIC ON' : 'MUSIC OFF';
    $('#music-button').classList.toggle('playing', musicPlaying);
  }

  function playTone(frequency, duration, volume, type = 'sine', when = 0) {
    if (!fallbackContext || fallbackContext.state !== 'running') return;
    const startAt = fallbackContext.currentTime + when;
    const oscillator = fallbackContext.createOscillator();
    const gain = fallbackContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), startAt + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(fallbackContext.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.03);
  }

  // A built-in gentle romantic melody keeps the YES surprise musical even when
  // a separately hosted MP3 is unavailable. It is not the original reel recording.
  function startFallbackMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    try {
      fallbackContext = fallbackContext || new AudioContext();
      fallbackContext.resume();
      if (fallbackTimer) return;
      const melody = [
        523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.00, 698.46,
        523.25, 659.25, 783.99, 987.77, 880.00, 783.99, 698.46, 659.25,
        587.33, 698.46, 880.00, 698.46, 523.25, 587.33, 659.25, 783.99,
        698.46, 659.25, 587.33, 523.25, 587.33, 659.25, 523.25, 0
      ];
      const bass = [130.81, 146.83, 174.61, 146.83, 130.81, 146.83, 196.00, 146.83];
      const stepMs = 310;
      fallbackStep = 0;
      const tick = () => {
        if (!musicPlaying || !fallbackContext || fallbackContext.state !== 'running') return;
        const note = melody[fallbackStep % melody.length];
        if (note) {
          playTone(note, 0.27, 0.055, 'sine');
          playTone(note * 2, 0.19, 0.012, 'sine', 0.02);
        }
        if (fallbackStep % 4 === 0) {
          const chordRoot = bass[Math.floor(fallbackStep / 4) % bass.length];
          playTone(chordRoot, 1.05, 0.035, 'triangle');
          playTone(chordRoot * 1.5, 0.9, 0.012, 'sine', 0.015);
        }
        fallbackStep += 1;
      };
      tick();
      fallbackTimer = window.setInterval(tick, stepMs);
    } catch (error) {
      console.warn('Built-in birthday melody could not start:', error);
    }
  }

  function stopFallbackMusic() {
    if (fallbackTimer) window.clearInterval(fallbackTimer);
    fallbackTimer = null;
    if (fallbackContext && fallbackContext.state === 'running') fallbackContext.suspend().catch(() => {});
  }

  function startMusic() {
    // Start the built-in melody synchronously from the button gesture so mobile
    // browser audio policies allow it. If the MP3 loads, it takes over.
    startFallbackMusic();
    const playback = birthdayAudio.play();
    if (playback && typeof playback.then === 'function') {
      playback.then(() => stopFallbackMusic()).catch(() => {
        // Keep the built-in melody playing when the optional MP3 file is absent.
      });
    }
  }

  function stopMusic() {
    birthdayAudio.pause();
    stopFallbackMusic();
  }

  $('#yes-button').addEventListener('click', () => {
    showScene(story);
    showPage(1);
    burstHearts(18);
    musicPlaying = true;
    updateMusicControl();
    startMusic();
  });
  $('#no-button').addEventListener('click', () => showScene(nope));
  $('#back-button').addEventListener('click', () => showScene(welcome));

  const noButton = $('#no-button');
  noButton.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch' || noMoves > 1) return;
    noMoves += 1;
    noButton.style.transform = `translate(${noMoves % 2 ? 12 : -12}px, ${noMoves % 2 ? -7 : 7}px) rotate(${noMoves % 2 ? 3 : -3}deg)`;
  });

  function showPage(number) {
    currentPage = Math.max(1, Math.min(5, number));
    pages.forEach(page => {
      const active = Number(page.dataset.page) === currentPage;
      page.hidden = !active;
      page.classList.toggle('active', active);
    });
    setText('page-number', String(currentPage).padStart(2, '0'));
    $('#progress-fill').style.width = `${currentPage * 20}%`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage === 5) burstConfetti();
  }
  $$('.next-button').forEach(button => button.addEventListener('click', () => showPage(currentPage + 1)));
  $$('.prev-button').forEach(button => button.addEventListener('click', () => showPage(currentPage - 1)));
  $('#replay-button').addEventListener('click', () => showPage(1));

  function burstHearts(amount = 12) {
    const holder = $('#floating-hearts');
    const symbols = ['♡', '✿', '✦', '♥'];
    for (let i = 0; i < amount; i++) {
      const heart = document.createElement('span');
      heart.className = 'float-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.setProperty('--drift', `${(Math.random() - .5) * 170}px`);
      heart.style.setProperty('--duration', `${3 + Math.random() * 3}s`);
      heart.style.fontSize = `${12 + Math.random() * 20}px`;
      holder.appendChild(heart);
      setTimeout(() => heart.remove(), 6500);
    }
  }
  setInterval(() => { if (!document.hidden) burstHearts(1); }, 2600);

  function burstConfetti() {
    const holder = $('#final-confetti');
    holder.replaceChildren();
    const symbols = ['♡', '✿', '✦', '♥', '✧'];
    for (let i = 0; i < 46; i++) {
      const bit = document.createElement('span');
      bit.textContent = symbols[i % symbols.length];
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.animationDelay = `${Math.random() * 1.8}s`;
      bit.style.setProperty('--fall-time', `${3 + Math.random() * 3}s`);
      bit.style.fontSize = `${12 + Math.random() * 20}px`;
      holder.appendChild(bit);
    }
  }

  $('#music-button').addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    updateMusicControl();
    if (musicPlaying) startMusic(); else stopMusic();
  });

  let toastTimer;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }
})();
