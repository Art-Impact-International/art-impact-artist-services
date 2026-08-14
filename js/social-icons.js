/* ==========================================================================
   SOCIAL MEDIA ICONS
   ==========================================================================
   Reads social-links.txt at the site root and renders an icon in the
   footer (inside <div id="social-icons">) for every platform that has a
   URL filled in. To add, change, or remove a link, edit social-links.txt
   on GitHub — nothing in this file needs to change.
   ========================================================================== */
(function () {
  var PLATFORMS = [
    { key: 'facebook', label: 'Facebook', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>' },
    { key: 'instagram', label: 'Instagram', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>' },
    { key: 'youtube', label: 'YouTube', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.6-.5-5.3c-.3-1-1.1-1.8-2.1-2C18.6 4.2 12 4.2 12 4.2s-6.6 0-8.4.5c-1 .2-1.8 1-2.1 2C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1 1.1 1.7 2.1 2 1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5c1-.3 1.8-1 2.1-2 .5-1.7.5-5.3.5-5.3zM9.8 15.5v-7l6.2 3.5-6.2 3.5z"/></svg>' },
    { key: 'linkedin', label: 'LinkedIn', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.6H3.5V21H6.9V8.6zM5.2 3a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1zM21 21v-6.9c0-3.7-2-5.4-4.6-5.4a4 4 0 0 0-3.6 2h-.1V8.6H9.5V21H13v-6.4c0-1.7 0-3.4 2.3-3.4s2.3 1.9 2.3 3.5V21H21z"/></svg>' },
    { key: 'pinterest', label: 'Pinterest', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8-.1-2 0-2.9l1.3-5.7s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-1 3.7-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.3 1c-.1.3-.3.4-.6.3-1.6-.7-2.4-2.5-2.4-4.6 0-3.4 2.9-7.5 8.6-7.5 4.6 0 7.6 3.3 7.6 6.9 0 4.7-2.6 8.2-6.4 8.2-1.3 0-2.5-.7-2.9-1.5l-.8 3.2c-.3 1.1-1 2.5-1.5 3.3A10 10 0 1 0 12 2z"/></svg>' },
    { key: 'tiktok', label: 'TikTok', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3v13.5a2.7 2.7 0 1 1-2.7-2.7c.2 0 .5 0 .7.1V9.8a6.2 6.2 0 1 0 5.3 6.1V8.4a7.6 7.6 0 0 0 4.5 1.5V6.8A4.6 4.6 0 0 1 16.5 2z"/></svg>' },
    { key: 'twitter', label: 'X (Twitter)', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.2 8.3L23.3 22h-6.8l-5.3-6.9L5 22H1.9l7.7-8.9L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z"/></svg>' },
    { key: 'website', label: 'Website', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>' }
  ];

  function parseLinks(text) {
    var links = {};
    text.split('\n').forEach(function (line) {
      var trimmed = line.trim();
      if (!trimmed || trimmed.charAt(0) === '#') return;
      var idx = trimmed.indexOf(':');
      if (idx === -1) return;
      var key = trimmed.slice(0, idx).trim().toLowerCase();
      var url = trimmed.slice(idx + 1).trim();
      if (url) links[key] = url;
    });
    return links;
  }

  function render(links) {
    var container = document.getElementById('social-icons');
    if (!container) return;
    PLATFORMS.forEach(function (p) {
      var url = links[p.key];
      if (!url) return;
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', p.label);
      a.innerHTML = p.svg;
      container.appendChild(a);
    });
  }

  fetch('social-links.txt')
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (text) { render(parseLinks(text)); })
    .catch(function () {});
})();
