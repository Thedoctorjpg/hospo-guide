function switchView(view) {
  const views = ['guides', 'licences', 'events', 'advertise', 'checklist', 'support'];
  views.forEach((v) => {
    const active = view === v;
    const el = $(`#view-${v}`);
    el.classList.toggle('active', active);
    el.hidden = !active;
    const tab = $(`#tab-${v}`);
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  if (view === 'licences') onLicencesViewShown();
  if (view === 'events') onEventsViewShown();
  if (view === 'support') onSupportViewShown();
}

function bindAppEvents() {
  $('#tab-guides').addEventListener('click', () => switchView('guides'));
  $('#tab-licences').addEventListener('click', () => switchView('licences'));
  $('#tab-events').addEventListener('click', () => switchView('events'));
  $('#tab-advertise').addEventListener('click', () => switchView('advertise'));
  $('#tab-checklist').addEventListener('click', () => switchView('checklist'));
  $('#tab-support').addEventListener('click', () => switchView('support'));
}

function init() {
  initGuides();
  initLicences();
  initEvents();
  initListEvent();
  initMetaAd();
  initChecklist();
  initSupport();
  bindAppEvents();
}

init();