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

  function startMusic() {
    const playback = birthdayAudio.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        musicPlaying = false;
        updateMusicControl();
        toast('Tap the music button to play the birthday song.');
      });
    }
  }

  function stopMusic() {
    birthdayAudio.pause();
  }

  $('#yes-button').addEventListener('click', () => {
    showScene(story);
    showPage(1);
    burstHearts(18);
    // Start the reel's soundtrack immediately from the YES tap, then keep it looping.
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
