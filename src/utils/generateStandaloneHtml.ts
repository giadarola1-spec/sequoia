import { CATEGORIES, GLOSSARY_TERMS, PDF_INDEX_PAGES } from '../data/glossaryData';

export function generateStandaloneHtml(): string {
  const cleanTerms = GLOSSARY_TERMS.map(({ icon, ...rest }) => rest);
  const cleanCategories = Object.fromEntries(
    Object.entries(CATEGORIES).map(([k, { icon, ...rest }]) => [k, rest])
  );

  const termsJson = JSON.stringify(cleanTerms);
  const categoriesJson = JSON.stringify(cleanCategories);
  const pdfIndexJson = JSON.stringify(PDF_INDEX_PAGES);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEQUOIA — Glosario Logístico (DOC_GOCV_003)</title>
  <style>
    :root {
      --bg-main: #191919;
      --bg-sidebar: #202020;
      --bg-surface: #252525;
      --bg-hover: rgba(255, 255, 255, 0.055);
      --bg-active: rgba(255, 255, 255, 0.09);
      --text-main: #e6e6e4;
      --text-muted: #9b9a97;
      --border-color: rgba(255, 255, 255, 0.09);
      --border-strong: rgba(255, 255, 255, 0.16);
      --notion-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--notion-font);
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 268px;
      min-width: 268px;
      background-color: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100vh;
      user-select: none;
    }

    .sidebar-header {
      height: 44px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.04em;
    }

    .search-box {
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .search-input {
      width: 100%;
      background: var(--bg-main);
      border: 1px solid var(--border-strong);
      border-radius: 5px;
      padding: 6px 10px;
      color: var(--text-main);
      font-family: var(--notion-font);
      font-size: 12px;
      outline: none;
    }

    .sidebar-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }

    .nav-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--text-muted);
      padding: 8px 6px 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--text-main);
      font-family: var(--notion-font);
      font-size: 12px;
      padding: 5px 8px;
      border-radius: 4px;
      cursor: pointer;
      text-align: left;
    }
    .nav-btn:hover { background: var(--bg-hover); }
    .nav-btn.active { background: var(--bg-active); font-weight: 600; }

    .az-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 3px;
      padding: 4px 4px 10px;
    }

    .az-btn {
      border: 1px solid var(--border-color);
      background: var(--bg-main);
      color: var(--text-main);
      border-radius: 4px;
      padding: 3px 0;
      font-size: 11px;
      cursor: pointer;
    }
    .az-btn.active { background: var(--text-main); color: var(--bg-main); font-weight: 700; }
    .az-btn:disabled { opacity: 0.25; cursor: not-allowed; }

    .main-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .small-header {
      height: 44px;
      min-height: 44px;
      padding: 0 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-main);
      font-size: 13px;
    }

    .small-header-title {
      font-weight: 700;
      letter-spacing: 0.04em;
      font-size: 13px;
    }

    .content-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 24px 32px 64px;
    }

    .container {
      max-width: 920px;
      margin: 0 auto;
    }

    details.filter-accordion, details.group-accordion, details.term-accordion {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--bg-sidebar);
      margin-bottom: 10px;
    }

    details.term-accordion {
      background: var(--bg-main);
      margin-bottom: 8px;
    }

    summary {
      cursor: pointer;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 600;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    summary::-webkit-details-marker { display: none; }

    .accordion-body {
      padding: 12px 14px;
      border-top: 1px solid var(--border-color);
      font-size: 13px;
    }

    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }
    .badge-yellow { background: rgba(202, 145, 42, 0.22); color: #f2c97d; }
    .badge-blue { background: rgba(45, 153, 211, 0.22); color: #85c8f2; }
    .badge-green { background: rgba(43, 154, 102, 0.22); color: #7fd1a8; }
    .badge-orange { background: rgba(212, 114, 43, 0.22); color: #f4ae7c; }
    .badge-purple { background: rgba(144, 101, 176, 0.24); color: #c7a6e2; }
    .badge-gray { background: rgba(155, 154, 151, 0.2); color: #c7c6c2; }
    .badge-pink { background: rgba(193, 76, 138, 0.22); color: #e99cc2; }

    .callout {
      padding: 10px 12px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      margin-bottom: 10px;
      font-size: 13px;
    }

    .btn-small {
      background: var(--bg-surface);
      color: var(--text-main);
      border: 1px solid var(--border-strong);
      border-radius: 4px;
      padding: 4px 10px;
      font-size: 11px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar-header">SEQUOIA</div>
    <div class="search-box">
      <input type="text" id="searchInput" class="search-input" placeholder="Buscar término o definición (Ctrl+K)..." />
    </div>
    <div class="sidebar-scroll">
      <div class="nav-label">Índice A-Z</div>
      <div class="az-grid" id="azGrid"></div>
      <div class="nav-label">Categorías</div>
      <div id="categoryList"></div>
    </div>
  </aside>

  <div class="main-wrap">
    <header class="small-header">
      <span class="small-header-title">SEQUOIA</span>
      <span id="counterLabel" style="color:var(--text-muted);font-size:12px;">121 términos</span>
    </header>
    <main class="content-scroll">
      <div class="container" id="mainContainer"></div>
    </main>
  </div>

  <script>
    const TERMS = ${termsJson};
    const CATEGORIES = ${categoriesJson};
    const PDF_INDEX = ${pdfIndexJson};

    let state = { search: '', category: 'all', letter: 'all' };

    function escapeHtml(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function setCategory(c) { state.category = c; render(); }
    function setLetter(l) { state.letter = state.letter === l ? 'all' : l; render(); }

    function copyDef(id, btn) {
      const t = TERMS.find(x => x.id === id);
      if (!t) return;
      navigator.clipboard.writeText(t.term + ': ' + t.definitionEn + '\\nResumen: ' + t.calloutEs);
      const old = btn.textContent;
      btn.textContent = 'Copiado';
      setTimeout(() => { btn.textContent = old; }, 1400);
    }

    function render() {
      const counts = {};
      TERMS.forEach(t => { counts[t.letter] = (counts[t.letter] || 0) + 1; });
      document.getElementById('azGrid').innerHTML = PDF_INDEX.map(i => {
        const c = counts[i.letter] || 0;
        return '<button class="az-btn ' + (state.letter === i.letter ? 'active' : '') + '" ' +
          (c === 0 ? 'disabled' : '') + ' onclick="setLetter(\\'' + i.letter + '\\')">' + i.letter + '</button>';
      }).join('');

      const allBtn = '<button class="nav-btn ' + (state.category === 'all' ? 'active' : '') + '" onclick="setCategory(\\'all\\')"><span>Todas</span><span>' + TERMS.length + '</span></button>';
      const catBtns = Object.values(CATEGORIES).map(cat => {
        const c = TERMS.filter(t => t.category === cat.id).length;
        return '<button class="nav-btn ' + (state.category === cat.id ? 'active' : '') + '" onclick="setCategory(\\'' + cat.id + '\\')"><span>' + escapeHtml(cat.shortName) + '</span><span>' + c + '</span></button>';
      }).join('');
      document.getElementById('categoryList').innerHTML = allBtn + catBtns;

      const q = state.search.trim().toLowerCase();
      const filtered = TERMS.filter(t => {
        if (state.category !== 'all' && t.category !== state.category) return false;
        if (state.letter !== 'all' && t.letter !== state.letter) return false;
        if (!q) return true;
        return t.term.toLowerCase().includes(q) || t.definitionEn.toLowerCase().includes(q) || t.calloutEs.toLowerCase().includes(q) || t.explanationEs.toLowerCase().includes(q);
      });

      document.getElementById('counterLabel').textContent = filtered.length + ' de ' + TERMS.length + ' definiciones';

      const grouped = {};
      filtered.forEach(t => {
        if (!grouped[t.category]) grouped[t.category] = [];
        grouped[t.category].push(t);
      });

      const container = document.getElementById('mainContainer');
      container.innerHTML = Object.keys(CATEGORIES).map(catId => {
        const list = grouped[catId] || [];
        if (list.length === 0) return '';
        const cat = CATEGORIES[catId];
        const itemsHtml = list.map(t => {
          const detailsHtml = t.details.map(d => '<li>' + escapeHtml(d) + '</li>').join('');
          return '<details class="term-accordion" open>' +
            '<summary>' +
              '<span>' + escapeHtml(t.term) + ' <span class="badge badge-' + cat.color + '" style="margin-left:6px;">' + escapeHtml(cat.shortName) + '</span> <span style="color:var(--text-muted);font-weight:400;font-size:11px;margin-left:6px;">Pág. ' + t.page + '</span></span>' +
              '<button class="btn-small" onclick="event.stopPropagation();copyDef(\\'' + t.id + '\\', this)">Copiar</button>' +
            '</summary>' +
            '<div class="accordion-body">' +
              '<div class="callout"><strong>Punto clave:</strong> ' + escapeHtml(t.calloutEs) + '</div>' +
              '<p style="margin-bottom:8px;"><strong>Definición (PDF):</strong> ' + escapeHtml(t.definitionEn) + '</p>' +
              '<p style="color:var(--text-muted);margin-bottom:8px;"><strong>Explicación:</strong> ' + escapeHtml(t.explanationEs) + '</p>' +
              '<ul style="padding-left:18px;color:var(--text-muted);">' + detailsHtml + '</ul>' +
            '</div>' +
          '</details>';
        }).join('');

        return '<details class="group-accordion" open>' +
          '<summary>' +
            '<span>' + escapeHtml(cat.name) + '</span>' +
            '<span class="badge badge-' + cat.color + '">' + list.length + ' términos</span>' +
          '</summary>' +
          '<div class="accordion-body">' + itemsHtml + '</div>' +
        '</details>';
      }).join('');
    }

    document.getElementById('searchInput').addEventListener('input', e => {
      state.search = e.target.value;
      render();
    });

    render();
  </script>
</body>
</html>`;
}
