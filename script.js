/* ==========================================================
   Shakib Mahamud | YouTube Growth Expert for Podcasts
   Plain JavaScript. No libraries, no backend.
   You normally do NOT need to edit this file.
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Footer year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navigation: mobile menu, scrolled state, active link ---------- */
  var nav = $('#nav');
  var toggle = $('#navToggle');
  var links = $('#navLinks');

  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var sections = $$('main section[id]');
  var navAnchors = $$('a[href^="#"]', links);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Hero waveform (decorative) ---------- */
  var wave = $('#heroWave');
  if (wave) {
    var heights = [14,26,40,22,48,34,58,30,18,44,62,38,24,52,36,16,46,60,28,42,20,54,32,12,40,56,26,48,34,18,44,30,58,22,38,50,16,28,42,24];
    var ns = 'http://www.w3.org/2000/svg';
    heights.forEach(function (h, i) {
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', i * 9);
      r.setAttribute('y', 285 - h);
      r.setAttribute('width', 5);
      r.setAttribute('height', h);
      r.setAttribute('rx', 2.5);
      r.setAttribute('fill', i < 26 ? '#FF553E' : '#ffffff');
      r.setAttribute('opacity', i < 26 ? '0.95' : '0.35');
      r.style.animationDelay = ((i % 8) * 0.14) + 's';
      wave.appendChild(r);
    });
  }

  /* ---------- Animated counters (hero statistics) ---------- */
  var counters = $$('.count');
  function runCounter(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(to)) return;
    if (reduceMotion) { el.textContent = to + suffix; return; }
    var start = null, duration = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    var counterObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { counterObs.observe(c); });
  }

  /* ---------- Preview mode: placeholder badges + note ---------- */
  $$('[data-placeholder]').forEach(function (el) {
    el.classList.add('has-ph');
    var badge = document.createElement('span');
    badge.className = 'ph-badge';
    badge.textContent = el.getAttribute('data-placeholder');
    el.appendChild(badge);
  });

  if (document.body.getAttribute('data-preview') === 'true') {
    var note = document.createElement('div');
    note.className = 'preview-note';
    note.innerHTML = '<strong>Preview mode.</strong> Yellow tags mark placeholders to replace. Before going live, change <code>data-preview="true"</code> to <code>"false"</code> on the &lt;body&gt; tag in index.html.';
    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Dismiss note');
    close.textContent = '\u00d7';
    close.addEventListener('click', function () { note.remove(); });
    note.appendChild(close);
    document.body.appendChild(note);
  }

  /* ---------- Image fallbacks (shows the placeholder tile if a file is missing) ---------- */
  function markImage(img, ok) {
    var holder = img.closest('.shot');
    if (ok) {
      if (holder) holder.classList.add('has-img');
    } else {
      img.remove();
    }
  }
  $$('.media img, .shot img, .video-frame img').forEach(function (img) {
    if (img.complete) {
      markImage(img, img.naturalWidth > 0);
    } else {
      img.addEventListener('load', function () { markImage(img, true); });
      img.addEventListener('error', function () { markImage(img, false); });
    }
  });

  /* ---------- Lightbox (reviews, case study shots, portfolio before/after) ---------- */
  var lightbox = null;
  function closeLightbox() {
    if (lightbox) { lightbox.remove(); lightbox = null; }
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  function openLightbox(src, alt, tall) {
    closeLightbox();
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox' + (tall ? ' lightbox--tall' : '');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', alt || 'Image preview');
    var big = document.createElement('img');
    big.alt = alt || '';
    big.addEventListener('error', function () {
      var msg = document.createElement('div');
      msg.className = 'lightbox__msg';
      msg.textContent = 'Image not added yet. Save it as "' + src + '" and refresh.';
      big.replaceWith(msg);
    });
    big.src = src;
    var btn = document.createElement('button');
    btn.className = 'lightbox__close';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Close image');
    btn.textContent = '\u00d7';
    btn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    lightbox.appendChild(big);
    lightbox.appendChild(btn);
    document.body.appendChild(lightbox);
    btn.focus();
  }

  $$('[data-lightbox]').forEach(function (box) {
    box.addEventListener('click', function () {
      var img = $('img', box);
      if (!img) return; // placeholder only: nothing to enlarge
      openLightbox(img.currentSrc || img.src, img.alt, false);
    });
  });

  /* Portfolio cards: designed cover -> full-size before/after image */
  $$('.work__cover').forEach(function (btn) {
    var cover = $('img', btn);
    if (cover) {
      var ok = function () { btn.classList.add('has-cover'); };
      var bad = function () { cover.remove(); };
      if (cover.complete) { if (cover.naturalWidth > 0) ok(); else bad(); }
      else { cover.addEventListener('load', ok); cover.addEventListener('error', bad); }
    }
    btn.addEventListener('click', function () {
      openLightbox(btn.getAttribute('data-full'), btn.getAttribute('aria-label'), true);
    });
  });

  /* ---------- Video testimonials (YouTube link or MP4 file) ---------- */
  function youtubeId(value) {
    if (!value) return '';
    value = value.trim();
    if (/^[\w-]{11}$/.test(value)) return value;
    var m = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : '';
  }

  $$('.video-frame').forEach(function (frame) {
    var btn = $('.play-btn', frame);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var yt = youtubeId(frame.getAttribute('data-youtube'));
      var file = (frame.getAttribute('data-video') || '').trim();
      var poster = $('img', frame);

      if (yt) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0';
        iframe.title = 'Client video testimonial';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        frame.appendChild(iframe);
        frame.classList.add('is-playing');
        return;
      }

      if (file) {
        var video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = 'metadata';
        if (poster) video.poster = poster.src;
        video.src = file;
        video.addEventListener('error', function () {
          video.remove();
          frame.classList.remove('is-playing');
          showMsg(frame, 'Video file not found. Add it as "' + file + '" or paste a YouTube link in data-youtube.');
        });
        frame.appendChild(video);
        frame.classList.add('is-playing');
        return;
      }

      showMsg(frame, 'No video added yet. Add a YouTube link in data-youtube, or an MP4 path in data-video.');
    });
  });

  function showMsg(frame, text) {
    var old = $('.video-msg', frame);
    if (old) old.remove();
    var msg = document.createElement('div');
    msg.className = 'video-msg';
    msg.textContent = text;
    frame.appendChild(msg);
    setTimeout(function () { msg.remove(); }, 4500);
  }

  /* ---------- "Ask about this service" pre-selects the form dropdown ---------- */
  var serviceSelect = $('#f-service');
  $$('.service__link').forEach(function (a) {
    a.addEventListener('click', function () {
      var wanted = a.getAttribute('data-service');
      Array.prototype.forEach.call(serviceSelect.options, function (opt) {
        if (opt.text === wanted) serviceSelect.value = opt.value || opt.text;
      });
    });
  });

  /* ---------- Contact form -> pre-filled WhatsApp message ---------- */
  var form = $('#contactForm');
  var formNote = $('#formNote');
  var defaultNote = formNote.textContent;

  function setInvalid(field, message) {
    var wrap = field.closest('.field');
    wrap.classList.add('is-invalid');
    var err = $('.field__error', wrap);
    if (!err) {
      err = document.createElement('div');
      err.className = 'field__error';
      wrap.appendChild(err);
    }
    err.textContent = message;
  }
  function clearInvalid(field) {
    var wrap = field.closest('.field');
    wrap.classList.remove('is-invalid');
  }
  $$('input, select, textarea', form).forEach(function (f) {
    f.addEventListener('input', function () { clearInvalid(f); });
    f.addEventListener('change', function () { clearInvalid(f); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var email = form.elements.email;
    var channel = form.elements.channel;
    var service = form.elements.service;
    var message = form.elements.message;
    var firstBad = null;

    function check(field, ok, msg) {
      if (!ok) { setInvalid(field, msg); if (!firstBad) firstBad = field; }
    }
    check(name, name.value.trim().length > 1, 'Please enter your name.');
    check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Please enter a valid email address.');
    check(channel, channel.value.trim().length > 3, 'Please paste your YouTube channel link.');
    check(service, service.value.trim() !== '', 'Please choose a service.');
    check(message, message.value.trim().length > 4, 'Please write a short message.');

    if (firstBad) { firstBad.focus(); return; }

    var channelUrl = channel.value.trim();
    if (!/^https?:\/\//i.test(channelUrl)) channelUrl = 'https://' + channelUrl;

    var text =
      'Hi Shakib, I found your website and I would like to grow my podcast on YouTube.\n\n' +
      '*Name:* ' + name.value.trim() + '\n' +
      '*Email:* ' + email.value.trim() + '\n' +
      '*YouTube channel:* ' + channelUrl + '\n' +
      '*Service needed:* ' + service.value.trim() + '\n\n' +
      '*Message:*\n' + message.value.trim();

    var number = (form.getAttribute('data-whatsapp') || '').replace(/\D/g, '');
    var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);

    formNote.textContent = 'Opening WhatsApp with your message. Press send there to deliver it.';
    formNote.classList.add('is-ok');

    var win = window.open(url, '_blank', 'noopener');
    if (!win) { window.location.href = url; } // popup blocked: open in the same tab

    setTimeout(function () {
      formNote.textContent = defaultNote;
      formNote.classList.remove('is-ok');
    }, 8000);
  });
})();
