async function loadContacts() {
  const res = await fetch('/api/contacts');
  const data = await res.json();
  const list = $('#contact-list');
  list.innerHTML = '';

  data.contacts.forEach((c) => {
    const card = document.createElement('article');
    card.className = 'contact-card';
    card.innerHTML = `
      <h3>${c.name}</h3>
      <p class="contact-org">${c.org}</p>
      <p class="contact-role">${c.role}</p>
      <div class="contact-links">
        ${c.email ? `<a href="mailto:${c.email}">${c.email}</a>` : ''}
        ${c.phone ? `<a href="tel:${c.phone.replace(/\s/g, '')}">${c.phone}</a>` : ''}
        ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener">Open resource →</a>` : ''}
      </div>
      ${c.notes ? `<p class="contact-notes">${c.notes}</p>` : ''}
    `;
    list.appendChild(card);
  });
}

function initSupport() {
  loadContacts();
}

function onSupportViewShown() {
  if (!$('#contact-list').children.length) loadContacts();
}