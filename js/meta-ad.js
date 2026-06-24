const META_BUSINESS_SUITE = 'https://business.facebook.com/';
const META_ADS_MANAGER = 'https://www.facebook.com/adsmanager';
const META_BUSINESS_HELP = 'https://www.facebook.com/business/help';
const META_AD_POLICIES = 'https://www.facebook.com/policies/ads';
const META_AD_STORAGE = 'hospitality-guide-meta-ad-draft';

const AD_OBJECTIVES = [
  { id: 'awareness', label: 'Awareness — new venue or truck on the map' },
  { id: 'traffic', label: 'Traffic — website, menu, or booking page' },
  { id: 'engagement', label: 'Engagement — event posts & RSVPs' },
  { id: 'leads', label: 'Leads — catering enquiries or mailing list' },
  { id: 'sales', label: 'Sales — online orders or gift vouchers' },
];

const PLACEMENTS = [
  { id: 'facebook', label: 'Facebook feed' },
  { id: 'instagram', label: 'Instagram feed' },
  { id: 'stories', label: 'Stories' },
  { id: 'reels', label: 'Reels' },
  { id: 'messenger', label: 'Messenger' },
];

const CTAS = [
  'Book now',
  'Learn more',
  'Get directions',
  'Order now',
  'Send message',
  'Sign up',
  'Call now',
];

const CREATIVE_SPECS = [
  'Square 1080×1080 px or vertical 1080×1920 px for Stories/Reels',
  'Minimal text on image — Meta may limit reach if text covers >20% of the image',
  'Show real food, venue, or truck — avoid stock photos where possible',
  'Include Auckland suburb or landmark in copy for local relevance',
  'If promoting alcohol, follow NZ ASA codes and Meta age-gating (18+)',
];

function emptyAdDraft() {
  return {
    businessName: '',
    businessType: 'cafe',
    metaPageUrl: '',
    instagramHandle: '',
    websiteUrl: '',
    objective: 'awareness',
    placements: ['facebook', 'instagram', 'stories'],
    audienceRadius: '15',
    audienceAgeMin: '25',
    audienceAgeMax: '54',
    audienceInterests: 'foodies, Auckland dining, brunch, street food',
    audienceNotes: '',
    headline: '',
    primaryText: '',
    description: '',
    callToAction: 'Learn more',
    destinationUrl: '',
    offerDetails: '',
    startDate: '',
    endDate: '',
    dailyBudget: '',
    totalBudget: '',
    complianceFood: false,
    complianceAlcohol: false,
    complianceTruthful: false,
    imagesReady: false,
  };
}

function loadAdDraft() {
  try {
    return { ...emptyAdDraft(), ...JSON.parse(localStorage.getItem(META_AD_STORAGE) || '{}') };
  } catch {
    return emptyAdDraft();
  }
}

function saveAdDraftFromForm() {
  const form = $('#meta-ad-form');
  if (!form) return emptyAdDraft();
  const data = new FormData(form);
  const draft = emptyAdDraft();

  for (const [key, value] of data.entries()) {
    if (key === 'placements') {
      if (!draft.placements.includes(value)) draft.placements.push(value);
    } else {
      draft[key] = value;
    }
  }

  draft.complianceFood = !!form.querySelector('[name="complianceFood"]')?.checked;
  draft.complianceAlcohol = !!form.querySelector('[name="complianceAlcohol"]')?.checked;
  draft.complianceTruthful = !!form.querySelector('[name="complianceTruthful"]')?.checked;
  draft.imagesReady = !!form.querySelector('[name="imagesReady"]')?.checked;
  localStorage.setItem(META_AD_STORAGE, JSON.stringify(draft));
  return draft;
}

function adDraftFromForm() {
  saveAdDraftFromForm();
  return loadAdDraft();
}

function objectiveLabel(id) {
  return AD_OBJECTIVES.find((o) => o.id === id)?.label || id;
}

function placementLabels(ids) {
  return ids
    .map((id) => PLACEMENTS.find((p) => p.id === id)?.label || id)
    .join(', ');
}

function isAdReady(draft) {
  return draft.complianceFood && draft.complianceTruthful
    && (!draft.offerDetails.toLowerCase().includes('alcohol') || draft.complianceAlcohol);
}

function buildAdSummary(draft) {
  const obj = objectiveLabel(draft.objective);
  const placements = placementLabels(draft.placements);

  return `META BUSINESS SUITE — AD CAMPAIGN DRAFT
==========================================

BUSINESS
Name: ${draft.businessName || '—'}
Type: ${typeLabel(draft.businessType)}
Facebook Page: ${draft.metaPageUrl || '—'}
Instagram: ${draft.instagramHandle || '—'}
Website: ${draft.websiteUrl || '—'}

CAMPAIGN SETUP (Ads Manager)
Objective: ${obj}
Placements: ${placements || '—'}
Start: ${draft.startDate || '—'} → End: ${draft.endDate || 'ongoing'}
Daily budget (NZD): $${draft.dailyBudget || '—'}
Total budget cap (NZD): $${draft.totalBudget || '—'}

AUDIENCE — Auckland local
Radius: ${draft.audienceRadius || '—'} km from venue/truck base
Age: ${draft.audienceAgeMin}–${draft.audienceAgeMax}
Interests: ${draft.audienceInterests || '—'}
${draft.audienceNotes ? `Notes: ${draft.audienceNotes}` : ''}

AD CREATIVE
Headline: ${draft.headline || '—'}
Primary text:
${draft.primaryText || '—'}

Description: ${draft.description || '—'}
Call to action: ${draft.callToAction}
Destination URL: ${draft.destinationUrl || draft.websiteUrl || '—'}
${draft.offerDetails ? `Offer: ${draft.offerDetails}` : ''}

COMPLIANCE
Food registration current: ${draft.complianceFood ? 'Yes' : 'No'}
Claims truthful & provable: ${draft.complianceTruthful ? 'Yes' : 'No'}
${draft.complianceAlcohol ? 'Alcohol ads: ASA + 18+ age targeting acknowledged' : 'Alcohol ads: N/A or not confirmed'}

Launch in Meta Business Suite → Ads Manager:
${META_ADS_MANAGER}

Help: ${META_BUSINESS_HELP}
Ad policies: ${META_AD_POLICIES}`;
}

function populateAdForm(draft) {
  const form = $('#meta-ad-form');
  if (!form) return;

  Object.entries(draft).forEach(([key, value]) => {
    if (key === 'placements') {
      form.querySelectorAll('[name="placements"]').forEach((el) => {
        el.checked = value.includes(el.value);
      });
      return;
    }
    const el = form.elements[key];
    if (!el) return;
    if (el.type === 'checkbox') el.checked = !!value;
    else el.value = value ?? '';
  });

  updateAdReadiness();
  updateAdWizardStep(1);
}

function updateAdReadiness() {
  const draft = adDraftFromForm();
  const box = $('#meta-ad-readiness');
  const launchBtn = $('#meta-ad-launch');
  if (!box) return;

  const missing = [];
  if (!draft.businessName) missing.push('Business name');
  if (!draft.metaPageUrl && !draft.instagramHandle) missing.push('Facebook Page or Instagram');
  if (!draft.headline || !draft.primaryText) missing.push('Headline & primary text');
  if (!draft.dailyBudget) missing.push('Daily budget');
  if (!draft.complianceFood) missing.push('Food registration confirmation');
  if (!draft.complianceTruthful) missing.push('Truthful claims checkbox');
  if (!draft.imagesReady) missing.push('Creative specs checklist');

  if (missing.length) {
    box.className = 'eligibility-box eligibility-box--warn';
    box.innerHTML = `<strong>Before you launch:</strong> ${missing.join(' · ')}`;
    if (launchBtn) launchBtn.disabled = true;
    return;
  }

  if (!isAdReady(draft)) {
    box.className = 'eligibility-box eligibility-box--caution';
    box.innerHTML = '<strong>Review alcohol rules:</strong> If your ad mentions alcohol, confirm ASA codes and 18+ targeting in Meta Ads Manager.';
    if (launchBtn) launchBtn.disabled = false;
    return;
  }

  box.className = 'eligibility-box eligibility-box--ok';
  box.innerHTML = '<strong>Ready to build in Meta:</strong> Copy this draft, then create the campaign in Ads Manager. Start with a small daily budget and widen once performance is clear.';
  if (launchBtn) launchBtn.disabled = false;
}

function updateAdWizardStep(step) {
  $$('#meta-ad-form .list-wizard-step').forEach((panel) => {
    const n = Number(panel.dataset.step);
    panel.hidden = n !== step;
  });
  $$('[data-meta-ad-step]').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.metaAdStep) === step);
  });

  if (step === 4) renderAdReview();
}

function renderAdReview() {
  const draft = adDraftFromForm();
  const review = $('#meta-ad-review');
  if (!review) return;

  review.innerHTML = `
    <pre class="review-pre">${buildAdSummary(draft).replace(/</g, '&lt;')}</pre>
    <p class="review-ready">Copy this brief, then paste fields into Meta Ads Manager when creating your ad set and creative.</p>
  `;
}

function switchAdvertiseMode(mode) {
  const plan = mode === 'plan';
  $('#advertise-plan-panel').hidden = !plan;
  $('#advertise-resources-panel').hidden = plan;
  $$('[data-advertise-mode]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.advertiseMode === mode);
  });
}

async function copyAdDraft() {
  const draft = adDraftFromForm();
  const text = buildAdSummary(draft);
  try {
    await navigator.clipboard.writeText(text);
    showToast('Ad draft copied — open Meta Ads Manager');
  } catch {
    showToast('Copy failed — select text from the review panel');
  }
}

function renderMetaResources() {
  const list = $('#meta-resource-list');
  if (!list) return;

  const resources = [
    {
      title: 'Meta Business Suite',
      summary: 'Manage your Facebook Page, Instagram, messaging, insights, and posts in one place.',
      url: META_BUSINESS_SUITE,
      cta: 'Open Business Suite',
    },
    {
      title: 'Meta Ads Manager',
      summary: 'Create and run Facebook & Instagram ad campaigns — objectives, audiences, budgets, and reporting.',
      url: META_ADS_MANAGER,
      cta: 'Open Ads Manager',
    },
    {
      title: 'Meta for Business — get started',
      summary: 'Set up a Business Portfolio, connect your Page, and add payment method before your first ad.',
      url: 'https://www.facebook.com/business',
      cta: 'Get started',
    },
    {
      title: 'Meta advertising policies',
      summary: 'Prohibited content, restricted categories (alcohol, health claims), and ad review process.',
      url: META_AD_POLICIES,
      cta: 'Read policies',
    },
    {
      title: 'NZ Advertising Standards Authority',
      summary: 'Codes for alcohol, food, and truthful advertising in New Zealand — applies to social ads too.',
      url: 'https://www.asa.co.nz/codes/',
      cta: 'ASA codes',
    },
  ];

  list.innerHTML = resources.map((r) => `
    <article class="resource-card">
      <div class="resource-card-header">
        <span class="resource-priority">Advertising</span>
        <h3>${r.title}</h3>
      </div>
      <p class="resource-summary">${r.summary}</p>
      <div class="resource-card-footer">
        <a class="btn btn-primary btn-sm" href="${r.url}" target="_blank" rel="noopener">${r.cta}</a>
      </div>
    </article>
  `).join('');
}

function initMetaAd() {
  populateAdForm(loadAdDraft());
  renderMetaResources();

  $$('[data-advertise-mode]').forEach((btn) => {
    btn.addEventListener('click', () => switchAdvertiseMode(btn.dataset.advertiseMode));
  });

  const form = $('#meta-ad-form');
  if (!form) return;

  form.addEventListener('input', () => {
    saveAdDraftFromForm();
    updateAdReadiness();
  });
  form.addEventListener('change', () => {
    saveAdDraftFromForm();
    updateAdReadiness();
  });

  $$('.meta-ad-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      saveAdDraftFromForm();
      const step = Number(btn.dataset.step);
      updateAdWizardStep(Math.min(4, step + 1));
    });
  });

  $$('.meta-ad-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step);
      updateAdWizardStep(Math.max(1, step - 1));
    });
  });

  $$('[data-meta-ad-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      saveAdDraftFromForm();
      updateAdWizardStep(Number(btn.dataset.metaAdStep));
    });
  });

  $('#meta-ad-copy').addEventListener('click', copyAdDraft);

  $('#meta-ad-reset').addEventListener('click', () => {
    localStorage.removeItem(META_AD_STORAGE);
    populateAdForm(emptyAdDraft());
    showToast('Ad draft cleared');
  });

  $('#meta-ad-launch').addEventListener('click', () => {
    saveAdDraftFromForm();
    copyAdDraft();
    window.open(META_ADS_MANAGER, '_blank', 'noopener');
  });

  $('#meta-ad-suite').addEventListener('click', () => {
    window.open(META_BUSINESS_SUITE, '_blank', 'noopener');
  });
}