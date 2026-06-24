let allResources = [];

function renderResourceCard(r) {
  const card = document.createElement('article');
  card.className = 'resource-card';
  card.innerHTML = `
    <div class="resource-card-header">
      <h3>${r.title}</h3>
      <span class="priority-badge ${r.priority}">${priorityLabel(r.priority)}</span>
    </div>
    <div class="resource-meta">
      <span>${r.category}</span>
      ${r.timeframe ? `<span>⏱ ${r.timeframe}</span>` : ''}
    </div>
    <p class="resource-summary">${r.summary}</p>
    ${r.notes ? `<p class="resource-notes">${r.notes}</p>` : ''}
    <div class="resource-actions">
      <a class="btn btn-primary btn-sm" href="${r.url}" target="_blank" rel="noopener">View guide</a>
      ${r.applyUrl ? `<a class="btn btn-secondary btn-sm" href="${r.applyUrl}" target="_blank" rel="noopener">Apply online</a>` : ''}
    </div>
  `;
  return card;
}

async function loadResources() {
  const type = $('#licence-filter-type').value;
  const q = $('#licence-search-input').value.trim();
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (q) params.set('q', q);

  const res = await fetch(`/api/resources?${params}`);
  const data = await res.json();
  allResources = data.resources;

  const priority = $('#licence-filter-priority').value;
  let items = allResources;
  if (priority) items = items.filter((r) => r.priority === priority);

  const list = $('#licence-list');
  const empty = $('#licence-empty');
  list.innerHTML = '';

  $('#licence-stat-count').textContent = items.length;
  $('#licence-results-count').textContent =
    items.length === 1 ? '1 resource found' : `${items.length} resources found`;

  if (!items.length) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  items.forEach((r) => list.appendChild(renderResourceCard(r)));
}

function initLicences() {
  const searchInput = $('#licence-search-input');
  const searchClear = $('#licence-search-clear');

  searchInput.addEventListener('input', () => {
    searchClear.hidden = !searchInput.value;
    loadResources();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.hidden = true;
    loadResources();
  });

  $('#licence-filter-type').addEventListener('change', loadResources);
  $('#licence-filter-priority').addEventListener('change', loadResources);

  loadResources();
}

function onLicencesViewShown() {
  if (!allResources.length) loadResources();
}