const OUR_AUCKLAND_FORM = 'https://ourauckland.aucklandcouncil.govt.nz/events/list-an-event/';
const OUR_AUCKLAND_INFO = 'https://ourauckland.aucklandcouncil.govt.nz/pages/listing-an-event/';
const LIST_EVENT_STORAGE = 'hospitality-guide-list-event-draft';

const EVENT_TYPES = [
  'Food / Drink',
  'Festival',
  'Markets / Trade',
  'Cultural',
  'Community',
  'Music',
  'Whanau friendly',
  'Workshops',
  'Theatre / Performance',
  'Exhibition',
];

const COUNCIL_WARDS = [
  'Albany Ward',
  'Albert-Eden-Puketāpapa Ward',
  'Franklin Ward',
  'Howick Ward',
  'Manukau Ward',
  'Manurewa-Papakura Ward',
  'Maungakiekie-Tāmaki Ward',
  'North Shore Ward',
  'Ōrākei Ward',
  'Rodney Ward',
  'Waitākere Ward',
  'Waitematā & Gulf Ward',
  'Whau Ward',
];

const COUNCIL_ASSOCIATIONS = [
  { id: 'delivered', label: 'Delivered' },
  { id: 'funded', label: 'Funded' },
  { id: 'sponsored', label: 'Sponsored' },
  { id: 'supported', label: 'Supported' },
  { id: 'facilitated', label: 'Facilitated' },
  { id: 'not-associated', label: 'Not associated (explain below)' },
];

const IMAGE_REQUIREMENTS = [
  'JPG or PNG format',
  'Each image under 2 MB',
  'At least 480 px wide and 365 px tall',
  'No text overlaid on images',
  'Main image is required; up to 6 images total',
];

function emptyDraft() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    associations: [],
    associationNotes: '',
    eventName: '',
    eventType: 'Food / Drink',
    locationType: 'single',
    venueName: '',
    venueAddress: '',
    venueDetails: '',
    ward: '',
    atLibrary: 'no',
    atCouncilVenue: 'no',
    startDate: '',
    startTime: '',
    endTime: '',
    endDate: '',
    costType: 'paid',
    costDetails: '',
    bookingRequired: 'no',
    bookingWebsite: '',
    bookingPhone: '',
    bookingEmail: '',
    description: '',
    eventWebsite: '',
    useAuthorContact: true,
    publicContactName: '',
    publicContactEmail: '',
    publicContactPhone: '',
    imagesReady: false,
  };
}

function loadDraft() {
  try {
    return { ...emptyDraft(), ...JSON.parse(localStorage.getItem(LIST_EVENT_STORAGE) || '{}') };
  } catch {
    return emptyDraft();
  }
}

function saveDraftFromForm() {
  const form = $('#list-event-form');
  if (!form) return;
  const data = new FormData(form);
  const draft = emptyDraft();

  for (const [key, value] of data.entries()) {
    if (key === 'associations') {
      if (!draft.associations.includes(value)) draft.associations.push(value);
    } else {
      draft[key] = value;
    }
  }

  draft.useAuthorContact = !!form.querySelector('[name="useAuthorContact"]')?.checked;
  draft.imagesReady = !!form.querySelector('[name="imagesReady"]')?.checked;
  localStorage.setItem(LIST_EVENT_STORAGE, JSON.stringify(draft));
  return draft;
}

function draftFromForm() {
  saveDraftFromForm();
  return loadDraft();
}

function isEligible(draft) {
  if (!draft.associations.length) return false;
  if (draft.associations.includes('not-associated') && !draft.associationNotes.trim()) return false;
  return true;
}

function buildSubmissionSummary(draft) {
  const assoc = draft.associations
    .map((id) => COUNCIL_ASSOCIATIONS.find((a) => a.id === id)?.label || id)
    .join(', ');

  return `OURAUCKLAND EVENT SUBMISSION DRAFT
================================

STEP 1 — CONTACT (admin only, not public)
Name: ${draft.firstName} ${draft.lastName}
Email: ${draft.email}
Phone: ${draft.phone}
Company: ${draft.company || '—'}
Council association: ${assoc || '—'}
${draft.associationNotes ? `Association notes: ${draft.associationNotes}` : ''}

STEP 2 — EVENT DETAILS
Event name: ${draft.eventName}
Type: ${draft.eventType}
Location: ${draft.locationType}
Venue: ${draft.venueName}
Address: ${draft.venueAddress}
Extra location details: ${draft.venueDetails || '—'}
Ward: ${draft.ward}
At library: ${draft.atLibrary}
At council community venue: ${draft.atCouncilVenue}
Start: ${draft.startDate} ${draft.startTime}
End date: ${draft.endDate || draft.startDate} ${draft.endTime}
Cost: ${draft.costType}${draft.costDetails ? ` — ${draft.costDetails}` : ''}
Booking required: ${draft.bookingRequired}
${draft.bookingWebsite ? `Booking URL: ${draft.bookingWebsite}` : ''}
${draft.bookingPhone ? `Booking phone: ${draft.bookingPhone}` : ''}
${draft.bookingEmail ? `Booking email: ${draft.bookingEmail}` : ''}

Description:
${draft.description}

Event website: ${draft.eventWebsite || '—'}

STEP 3 — PUBLIC CONTACT
${draft.useAuthorContact ? 'Use author contact details above' : `Name: ${draft.publicContactName}\nEmail: ${draft.publicContactEmail}\nPhone: ${draft.publicContactPhone}`}

STEP 4 — IMAGES
Prepare 1–6 images meeting OurAuckland specs (see checklist in Hospitality Guide).

Submit at: ${OUR_AUCKLAND_FORM}
Allow up to 10 business days for publishing.
Questions: ourauckland@aucklandcouncil.govt.nz`;
}

function populateForm(draft) {
  const form = $('#list-event-form');
  if (!form) return;

  Object.entries(draft).forEach(([key, value]) => {
    if (key === 'associations') {
      form.querySelectorAll('[name="associations"]').forEach((el) => {
        el.checked = value.includes(el.value);
      });
      return;
    }
    const el = form.elements[key];
    if (!el) return;
    if (el.type === 'checkbox') el.checked = !!value;
    else el.value = value ?? '';
  });

  updateEligibility();
  updateWizardStep(1);
}

function updateEligibility() {
  const draft = draftFromForm();
  const box = $('#list-eligibility-status');
  const submitBtn = $('#list-event-submit-council');
  if (!box) return;

  if (!draft.associations.length) {
    box.className = 'eligibility-box eligibility-box--warn';
    box.innerHTML = '<strong>Eligibility:</strong> Select how your event is associated with Auckland Council. OurAuckland is not for pure commercial listings with no council connection.';
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (draft.associations.includes('not-associated') && !draft.associationNotes.trim()) {
    box.className = 'eligibility-box eligibility-box--warn';
    box.innerHTML = '<strong>Eligibility:</strong> If not council-associated, explain why your event still qualifies in the notes field.';
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (draft.associations.length === 1 && draft.associations[0] === 'not-associated') {
    box.className = 'eligibility-box eligibility-box--caution';
    box.innerHTML = '<strong>Review needed:</strong> Private commercial events may be declined. Events at council venues, libraries, or with council support usually qualify as Supported or Facilitated.';
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  box.className = 'eligibility-box eligibility-box--ok';
  box.innerHTML = '<strong>Looks eligible:</strong> Council-associated events are typically published within 10 business days. Events submitted far ahead may go live closer to the date.';
  if (submitBtn) submitBtn.disabled = false;
}

function updateWizardStep(step) {
  $$('.list-wizard-step').forEach((panel) => {
    const n = Number(panel.dataset.step);
    panel.hidden = n !== step;
  });
  $$('.list-wizard-nav-btn').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.step) === step);
  });
  $('#list-wizard-current').textContent = String(step);

  if (step === 4) renderReview();
}

function renderReview() {
  const draft = draftFromForm();
  const review = $('#list-event-review');
  if (!review) return;

  const missing = [];
  if (!draft.firstName || !draft.lastName || !draft.email || !draft.phone) missing.push('Contact details');
  if (!draft.eventName || !draft.description) missing.push('Event name & description');
  if (!draft.venueName || !draft.venueAddress || !draft.ward) missing.push('Venue & ward');
  if (!draft.startDate) missing.push('Start date');
  if (draft.costType === 'paid' && !draft.costDetails) missing.push('Cost details');
  if (!draft.imagesReady) missing.push('Image requirements checklist');

  review.innerHTML = `
    <pre class="review-pre">${buildSubmissionSummary(draft).replace(/</g, '&lt;')}</pre>
    ${missing.length
      ? `<p class="review-missing"><strong>Still needed:</strong> ${missing.join(' · ')}</p>`
      : '<p class="review-ready">Draft complete — copy it, then paste into the council form.</p>'}
  `;
}

function switchEventsMode(mode) {
  const browse = mode === 'browse';
  $('#events-browse-panel').hidden = !browse;
  $('#events-list-panel').hidden = browse;
  $$('[data-events-mode]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.eventsMode === mode);
  });
  if (browse && !eventsLoaded) loadEvents();
}

async function copyDraft() {
  const draft = draftFromForm();
  const text = buildSubmissionSummary(draft);
  try {
    await navigator.clipboard.writeText(text);
    showToast('Draft copied — open the council form and paste');
  } catch {
    showToast('Copy failed — select text from the review panel');
  }
}

function initListEvent() {
  populateForm(loadDraft());

  $$('[data-events-mode]').forEach((btn) => {
    btn.addEventListener('click', () => switchEventsMode(btn.dataset.eventsMode));
  });

  const form = $('#list-event-form');
  form.addEventListener('input', () => {
    saveDraftFromForm();
    updateEligibility();
  });
  form.addEventListener('change', () => {
    saveDraftFromForm();
    updateEligibility();
  });

  $$('.list-wizard-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      saveDraftFromForm();
      const step = Number(btn.dataset.step);
      updateWizardStep(Math.min(4, step + 1));
    });
  });

  $$('.list-wizard-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step);
      updateWizardStep(Math.max(1, step - 1));
    });
  });

  $$('.list-wizard-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      saveDraftFromForm();
      updateWizardStep(Number(btn.dataset.step));
    });
  });

  $('#list-event-copy').addEventListener('click', copyDraft);

  $('#list-event-reset').addEventListener('click', () => {
    localStorage.removeItem(LIST_EVENT_STORAGE);
    populateForm(emptyDraft());
    showToast('Listing draft cleared');
  });

  $('#list-event-submit-council').addEventListener('click', () => {
    saveDraftFromForm();
    copyDraft();
    window.open(OUR_AUCKLAND_FORM, '_blank', 'noopener');
  });

  const useAuthor = form.querySelector('[name="useAuthorContact"]');
  const publicFields = $('#public-contact-fields');
  const syncPublicFields = () => {
    if (publicFields) publicFields.hidden = useAuthor?.checked;
  };
  useAuthor?.addEventListener('change', syncPublicFields);
  syncPublicFields();
}