/* Draws every page from data/site.js and data/content.js.
   You normally never need to edit this file. */
(function () {
  const S = window.SITE, C = window.CONTENT;
  const page = document.body.dataset.page;
  const $ = (sel) => document.querySelector(sel);

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Only allow safe link/image targets
  const safeUrl = (u) => /^(https?:|mailto:|#|[\w./-])/i.test(u) && !/^javascript:/i.test(u) ? u : "#";

  function inline(text) {
    return esc(text)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) =>
        `<img src="${safeUrl(src)}" alt="${alt}" loading="lazy">`)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) =>
        `<a href="${safeUrl(u)}"${/^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  // Tiny Markdown: paragraphs, ## headings, - lists, images, bold/italic/links
  function md(src) {
    if (!src) return "";
    return String(src).trim().split(/\n\s*\n/).map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (!lines.length) return "";
      if (/^#{1,3}\s/.test(lines[0])) {
        return `<h3>${inline(lines[0].replace(/^#+\s*/, ""))}</h3>` +
               (lines.length > 1 ? md(lines.slice(1).join("\n")) : "");
      }
      if (lines.every((l) => /^[-*]\s/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
      }
      if (lines.length === 1 && /^!\[[^\]]*\]\([^)]+\)$/.test(lines[0])) {
        return `<figure>${inline(lines[0])}</figure>`;
      }
      return `<p>${lines.map(inline).join("<br>")}</p>`;
    }).join("");
  }

  const fmtDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const img = (src, alt) => src ? `<img class="cover" src="${esc(src)}" alt="${esc(alt || "")}" loading="lazy">` : "";
  const tags = (arr) => arr && arr.length ? `<ul class="tags">${arr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
  const links = (arr) => arr && arr.length
    ? `<p class="links">${arr.map((l) => `<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</p>` : "";

  /* ---------- header & footer ---------- */
  function drawChrome() {
    const here = location.pathname.split("/").pop() || "index.html";
    $("#site-header").innerHTML = `
      <div class="bar">
        <a class="brand" href="index.html">${esc(S.name)}</a>
        <nav aria-label="Main">
          ${S.nav.map((n) => `<a href="${esc(n.href)}"${n.href === here ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`).join("")}
        </nav>
        <button id="theme" type="button" aria-label="Switch light or dark theme">Theme</button>
      </div>`;
    $("#site-footer").innerHTML = `
      <div class="bar">
        <p>© ${new Date().getFullYear()} ${esc(S.name)}</p>
        <p class="links"><a href="mailto:${esc(S.email)}">${esc(S.email)}</a>
          ${S.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</p>
      </div>`;

    const root = document.documentElement;
    try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
    $("#theme").addEventListener("click", () => {
      const dark = root.dataset.theme ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    });
  }

  /* ---------- pages ---------- */
  const pages = {
    home() {
      const featured = C.projects.filter((p) => p.featured);
      const latest = C.posts[0];
      return `
        <section class="hero">
          <h1>${esc(S.name)}</h1>
          <p class="tagline">${esc(S.tagline)}</p>
          <div class="prose">${md(C.home.intro)}</div>
        </section>
        ${featured.length ? `<section><h2>Selected projects</h2><div class="grid">${featured.map(projectCard).join("")}</div>
          <p class="more"><a href="projects.html">All projects</a></p></section>` : ""}
        ${latest ? `<section><h2>Latest note</h2>${postRow(latest)}<p class="more"><a href="notes.html">All notes</a></p></section>` : ""}`;
    },

    about() {
      const a = C.about;
      return `
        <h1>About</h1>
        <div class="about">
          ${a.photo ? `<img class="portrait" src="${esc(a.photo)}" alt="${esc(a.photoAlt || "")}">` : ""}
          <div class="prose">${md(a.body)}</div>
        </div>`;
    },

    university() {
      return `<h1>University</h1>
        <div class="stack">${C.university.map(entry).join("")}</div>`;
    },

    projects() {
      return `<h1>Projects</h1>
        <div class="grid">${C.projects.map(projectCard).join("")}</div>`;
    },

    interests() {
      return `<h1>Interests</h1>
        <div class="grid small">${C.interests.map((i) => `
          <article class="card">
            ${img(i.image, i.imageAlt)}
            <div class="card-body"><h2>${esc(i.title)}</h2><p>${inline(i.text)}</p></div>
          </article>`).join("")}</div>`;
    },

    notes() {
      const id = decodeURIComponent(location.hash.slice(1));
      const post = C.posts.find((p) => p.id === id);
      if (post) {
        document.title = post.title;
        return `<p class="back"><a href="notes.html">← All notes</a></p>
          <article class="post">
            <h1>${esc(post.title)}</h1>
            <p class="meta">${fmtDate(post.date)}</p>
            <div class="prose">${md(post.body)}</div>
          </article>`;
      }
      return `<h1>Notes</h1>${C.posts.length
        ? C.posts.map(postRow).join("") : "<p>No posts yet. Add one in data/content.js.</p>"}`;
    }
  };

  /* ---------- reusable pieces ---------- */
  function expandable(details) {
    return details ? `<details><summary>Read more</summary><div class="prose">${md(details)}</div></details>` : "";
  }

  function projectCard(p) {
    return `<article class="card">
      ${img(p.image, p.imageAlt)}
      <div class="card-body">
        <h2>${esc(p.title)}</h2>
        ${p.meta ? `<p class="meta">${esc(p.meta)}</p>` : ""}
        <p>${inline(p.summary)}</p>
        ${tags(p.tags)}${expandable(p.details)}${links(p.links)}
      </div></article>`;
  }

  function entry(p) {
    return `<article class="entry">
      <div class="entry-head">
        <h2>${esc(p.title)}</h2>
        ${p.meta ? `<p class="meta">${esc(p.meta)}</p>` : ""}
      </div>
      <div class="entry-body">
        ${img(p.image, p.imageAlt)}
        <p>${inline(p.summary)}</p>
        ${tags(p.tags)}${expandable(p.details)}${links(p.links)}
      </div></article>`;
  }

  function postRow(p) {
    return `<article class="post-row">
      <p class="meta">${fmtDate(p.date)}</p>
      <h2><a href="notes.html#${encodeURIComponent(p.id)}">${esc(p.title)}</a></h2>
      <p>${inline(p.summary || "")}</p></article>`;
  }

  /* ---------- go ---------- */
  function render() {
    document.title = (page === "home" ? "" : (page[0].toUpperCase() + page.slice(1)) + " · ") + S.name;
    $("#app").innerHTML = (pages[page] || pages.home)();
    window.scrollTo(0, 0);
  }
  drawChrome();
  render();
  if (page === "notes") window.addEventListener("hashchange", render);
})();
