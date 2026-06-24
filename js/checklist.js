const CHECKLISTS = {
  'food-truck': [
    { id: 'ft-1', title: 'Run My Food Rules (MPI)', detail: 'Confirm Food Control Plan vs National Programme for your menu.', url: 'https://www.mpi.govt.nz/food-business/food-safety-rules' },
    { id: 'ft-2', title: 'Complete Scope of Operations', detail: 'Download and fill the matching MPI scope document.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/apply-food-registration.html' },
    { id: 'ft-3', title: 'Apply for food registration', detail: 'Pay registration fee; allow up to 25 working days.', url: 'https://onlineservices.aucklandcouncil.govt.nz/councilonline/yform/food?productCode=FOODACT&viewStatus=new&licenceType=FOOD_ACT' },
    { id: 'ft-4', title: 'Meet council about mobile trading', detail: 'Discuss trading locations before applying for a mobile trading licence.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/mobile-traders/open-a-mobile-trading-business.html' },
    { id: 'ft-5', title: 'Unit compliance: EWOF & gas', detail: 'Current Electrical Warrant of Fitness; LPG gas safety certificate if applicable.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/starting-food-truck.html' },
    { id: 'ft-6', title: 'Wastewater holding & disposal', detail: 'Adequate tank size and approved disposal system.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-business-sites-codes-of-practice/sewage-wastewater-disposal-food-business.html' },
    { id: 'ft-7', title: 'Arrange verification', detail: 'First visit within 6 weeks of opening. Email hosposupport for checklist.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/inspections-for-your-food-business.html' },
    { id: 'ft-8', title: 'Park trading permit (if needed)', detail: 'Separate approval to sell from public land or parks.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/mobile-traders/trade-from-public-land.html' },
    { id: 'ft-9', title: 'Staff food safety training', detail: 'Ensure handlers meet certification requirements.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/food-safety-training-requirements.html' },
    { id: 'ft-10', title: 'Set up Meta Business Suite', detail: 'Facebook Page + Instagram connected; payment method added before ads.', url: 'https://business.facebook.com/' },
    { id: 'ft-11', title: 'Draft location-day ad campaign', detail: 'Use Advertise tab — target Auckland radius for your trading days.', url: 'https://www.facebook.com/adsmanager' },
  ],
  cafe: [
    { id: 'c-1', title: 'Check building & resource consents', detail: 'Call 09 301 0101 — planning helpdesk for fit-out and change of use.', url: 'https://www.aucklandcouncil.govt.nz/en/building-and-consents.html' },
    { id: 'c-2', title: 'Run My Food Rules (MPI)', detail: 'Most cafes/restaurants use a template Food Control Plan.', url: 'https://www.mpi.govt.nz/food-business/food-safety-rules' },
    { id: 'c-3', title: 'Kitchen site plan & layout', detail: 'Meet food business site codes — ventilation, plumbing, equipment.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-business-sites-codes-of-practice.html' },
    { id: 'c-4', title: 'Apply for food registration', detail: 'Scope of Operations + site plan; pay before processing.', url: 'https://onlineservices.aucklandcouncil.govt.nz/councilonline/yform/food?productCode=FOODACT&viewStatus=new&licenceType=FOOD_ACT' },
    { id: 'c-5', title: 'Book verification', detail: 'Within 6 weeks of opening; request pre-verification checklist.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/inspections-for-your-food-business.html' },
    { id: 'c-6', title: 'Food safety training for staff', detail: 'Certified handlers where required.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/food-safety-training-requirements.html' },
    { id: 'c-7', title: 'Alcohol on-licence (if applicable)', detail: 'Building Code + RMA certificates required before alcohol application.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/alcohol-licences-fines/open-business-sells-alcohol/apply-for-alcohol-on-licence.html' },
    { id: 'c-8', title: 'Manager\'s Certificate (if alcohol)', detail: 'At least one certified manager on staff.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/alcohol-licences-fines/apply-managers-certificate-alcohol.html' },
    { id: 'c-9', title: 'Outdoor dining licence (if applicable)', detail: 'Required for customers eating/drinking outside.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/outdoor-dining-licenses/apply-outdoor-dining-licence.html' },
    { id: 'c-10', title: 'Budget fees & Food Business Levy', detail: 'Registration, verification, annual levy — all non-refundable.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-alcohol-fees-charges.html' },
    { id: 'c-11', title: 'Draft OurAuckland event listing', detail: 'Use Events → List your event; allow 10 business days to publish.', url: 'https://ourauckland.aucklandcouncil.govt.nz/pages/listing-an-event/' },
    { id: 'c-12', title: 'Set up Meta Business Suite', detail: 'Page, Instagram, and Business Portfolio ready for paid promotion.', url: 'https://business.facebook.com/' },
    { id: 'c-13', title: 'Plan Meta ad for opening or event', detail: 'Draft in Advertise tab; start modest daily budget in Ads Manager.', url: 'https://www.facebook.com/adsmanager' },
  ],
  stall: [
    { id: 's-1', title: 'Confirm if registration is required', detail: 'More than once a year usually means full food registration.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-stalls-and-fundraising.html' },
    { id: 's-2', title: 'Run My Food Rules', detail: 'Pick the right plan for your stall menu and risk level.', url: 'https://www.mpi.govt.nz/food-business/food-safety-rules' },
    { id: 's-3', title: 'Apply for food registration', detail: 'If trading regularly for profit.', url: 'https://onlineservices.aucklandcouncil.govt.nz/councilonline/yform/food?productCode=FOODACT&viewStatus=new&licenceType=FOOD_ACT' },
    { id: 's-4', title: 'Fundraising licence (public land)', detail: 'Charity stalls on public land need approval + street trading.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/apply-for-fundraising-licence.html' },
    { id: 's-5', title: 'Landowner permission (private land)', detail: 'Fundraising on private land up to 20x/year may be exempt from registration.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-stalls-and-fundraising.html' },
    { id: 's-6', title: 'Market operator consent', detail: 'Regular private-land markets may need resource consent.', url: 'https://www.aucklandcouncil.govt.nz/en/building-and-consents.html' },
    { id: 's-7', title: 'Arrange verification', detail: 'If registered, first check within 6 weeks.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/inspections-for-your-food-business.html' },
    { id: 's-8', title: 'Promote market days on Meta', detail: 'Target local foodies within 15–25 km of the market venue.', url: 'https://www.facebook.com/adsmanager' },
  ],
  event: [
    { id: 'e-1', title: 'Vendor registration policy', detail: 'Require Notice of Registration from every food operator.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-registration-for-event-organisers.html' },
    { id: 'e-2', title: 'Check MPI public register', detail: 'Verify each vendor before confirming their spot.', url: 'https://mpi.my.salesforce-sites.com/publicregister' },
    { id: 'e-3', title: 'Public market licence (if applicable)', detail: 'Regular markets on public land need a market licence.', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/markets-on-public-land/open-public-market.html' },
    { id: 'e-4', title: 'Request event food safety inspection', detail: 'Email foodsafetyofficer at least 4 weeks before event.', url: 'mailto:foodsafetyofficer@aucklandcouncil.govt.nz' },
    { id: 'e-5', title: 'Site layout & utilities brief', detail: 'Power, water, wastewater, and stall spacing for vendors.', url: null },
    { id: 'e-6', title: 'Vendor contact register', detail: 'Keep business name, registration ref, and emergency contact on file.', url: null },
    { id: 'e-7', title: 'List on OurAuckland', detail: 'Council-associated events only; submit via 4-step form.', url: 'https://ourauckland.aucklandcouncil.govt.nz/events/list-an-event/' },
    { id: 'e-8', title: 'Run Meta ads for ticket/vendor drive', detail: 'Engagement or Traffic objective; 18+ if alcohol featured.', url: 'https://www.facebook.com/adsmanager' },
  ],
};

const STORAGE_KEY = 'hospitality-guide-checklist';

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderChecklist() {
  const type = $('#checklist-type').value;
  const items = CHECKLISTS[type] || [];
  const state = loadState();
  const typeState = state[type] || {};

  const list = $('#checklist-items');
  list.innerHTML = '';

  items.forEach((item) => {
    const done = !!typeState[item.id];
    const li = document.createElement('li');
    li.className = `checklist-item${done ? ' done' : ''}`;
    li.innerHTML = `
      <label class="checklist-label">
        <input type="checkbox" data-id="${item.id}" ${done ? 'checked' : ''}>
        <div class="checklist-text">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
          ${item.url ? `<br><a href="${item.url}" target="_blank" rel="noopener">Official link →</a>` : ''}
        </div>
      </label>
    `;
    list.appendChild(li);
  });

  const doneCount = items.filter((i) => typeState[i.id]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  $('#checklist-progress-fill').style.width = `${pct}%`;
  $('#checklist-progress-bar').setAttribute('aria-valuenow', String(pct));
  $('#checklist-progress-text').textContent = `${doneCount} of ${items.length} complete`;
}

function initChecklist() {
  $('#checklist-type').addEventListener('change', renderChecklist);

  $('#checklist-items').addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox') return;
    const type = $('#checklist-type').value;
    const state = loadState();
    if (!state[type]) state[type] = {};
    state[type][e.target.dataset.id] = e.target.checked;
    saveState(state);
    renderChecklist();
  });

  $('#checklist-reset').addEventListener('click', () => {
    const type = $('#checklist-type').value;
    const state = loadState();
    delete state[type];
    saveState(state);
    renderChecklist();
    showToast('Checklist reset');
  });

  renderChecklist();
}