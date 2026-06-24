let allEvents = [];
let eventsLoaded = false;

function todayNzDate() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function sourceLabel(source) {
  if (source === 'meetup') return 'Meetup';
  if (source === 'aucklandlive') return 'Auckland Live';
  if (source === 'ticketmaster') return 'Ticketmaster';
  if (source === 'sparkarena') return 'Spark Arena';
  if (source === 'edenpark') return 'Eden Park';
  if (source === 'eventbrite') return 'Eventbrite';
  if (source === 'eventfinda') return 'Eventfinda';
  if (source === 'humanitix') return 'Humanitix';
  if (source === 'cheeky') return 'Cheeky Events';
  if (source === 'aucklandforkids') return 'Auckland for Kids';
  if (source === 'fever') return 'Fever';
  if (source === 'tripadvisor') return 'TripAdvisor';
  if (source === 'eventcinemas') return 'Event Cinemas';
  if (source === 'hoyts') return 'HOYTS';
  if (source === 'rialto') return 'Rialto';
  if (source === 'duedrop') return 'Due Drop';
  if (source === 'nightmarkets') return 'Night Markets';
  if (source === 'ftc') return 'Food Truck Collective';
  if (source === 'acbmarkets') return 'ACB Markets';
  if (source === 'opencircle') return 'Open Circle';
  if (source === 'aucklandmarket') return 'Auckland Markets';
  if (source === 'touristtrip') return 'Trip Planner';
  if (source === 'atc') return 'ATC';
  if (source === 'qtheatre') return 'Q Theatre';
  if (source === 'hlt') return 'HLT';
  if (source === 'nyt') return 'NYT';
  if (source === 'iticket') return 'iTicket';
  if (source === 'rnzb') return 'RNZB';
  if (source === 'basement') return 'Basement';
  if (source === 'aucklandnz') return 'AucklandNZ';
  return 'Event';
}

function hospitalityBadge(event) {
  if (!event.hospitalityRelevant) return '';
  if (event.source === 'meetup') return '<span class="event-badge">Hospitality meetup</span>';
  if (event.source === 'aucklandlive') return '<span class="event-badge">Venue crowds</span>';
  if (event.source === 'ticketmaster') return '<span class="event-badge">Arena crowds</span>';
  if (event.source === 'sparkarena') return '<span class="event-badge">Arena crowds</span>';
  if (event.source === 'edenpark') return '<span class="event-badge">Stadium crowds</span>';
  if (event.source === 'eventbrite') return '<span class="event-badge">Community crowds</span>';
  if (event.source === 'eventfinda') return '<span class="event-badge">Local crowds</span>';
  if (event.source === 'humanitix') return '<span class="event-badge">Charity crowds</span>';
  if (event.source === 'cheeky') return '<span class="event-badge">Social crowds</span>';
  if (event.source === 'aucklandforkids') return '<span class="event-badge">Family crowds</span>';
  if (event.source === 'fever') return '<span class="event-badge">Experience crowds</span>';
  if (event.source === 'tripadvisor') return '<span class="event-badge">Visitor crowds</span>';
  if (event.source === 'eventcinemas') return '<span class="event-badge">Cinema crowds</span>';
  if (event.source === 'hoyts') return '<span class="event-badge">Cinema crowds</span>';
  if (event.source === 'rialto') return '<span class="event-badge">Cinema crowds</span>';
  if (event.source === 'duedrop') return '<span class="event-badge">Venue crowds</span>';
  if (event.source === 'nightmarkets') return '<span class="event-badge">Night market</span>';
  if (event.source === 'ftc') return '<span class="event-badge">Street food crowd</span>';
  if (event.source === 'acbmarkets') return '<span class="event-badge">Farmers market</span>';
  if (event.source === 'opencircle') return '<span class="event-badge">Community market</span>';
  if (event.source === 'aucklandmarket') return '<span class="event-badge">Weekly market</span>';
  if (event.source === 'touristtrip') return '<span class="event-badge">Street market</span>';
  if (event.source === 'atc') return '<span class="event-badge">Theatre crowds</span>';
  if (event.source === 'qtheatre') return '<span class="event-badge">Theatre crowds</span>';
  if (event.source === 'hlt') return '<span class="event-badge">Theatre crowds</span>';
  if (event.source === 'nyt') return '<span class="event-badge">Theatre crowds</span>';
  if (event.source === 'iticket') return '<span class="event-badge">Ticketed crowds</span>';
  if (event.source === 'rnzb') return '<span class="event-badge">Ballet crowds</span>';
  if (event.source === 'basement') return '<span class="event-badge">Theatre crowds</span>';
  return '<span class="event-badge">Food truck opportunity</span>';
}

function renderEventCard(event) {
  const card = document.createElement('article');
  card.className = 'event-card';
  if (event.hospitalityRelevant) card.classList.add('event-card--hospo');

  const imgHtml = event.image
    ? `<img class="event-card-img" src="${event.image}" alt="" loading="lazy">`
    : `<div class="event-card-img event-card-img--placeholder" aria-hidden="true">${event.source === 'meetup' ? '👥' : event.source === 'aucklandlive' ? '🎭' : event.source === 'atc' ? '🎭' : event.source === 'qtheatre' ? '🎭' : event.source === 'hlt' ? '🎭' : event.source === 'nyt' ? '🎭' : event.source === 'iticket' ? '🎫' : event.source === 'rnzb' ? '🩰' : event.source === 'basement' ? '🎭' : event.source === 'ticketmaster' ? '🎫' : event.source === 'sparkarena' ? '⚡' : event.source === 'duedrop' ? '🏛️' : event.source === 'nightmarkets' ? '🌙' : event.source === 'ftc' ? '🚚' : event.source === 'acbmarkets' ? '🧺' : event.source === 'opencircle' ? '⭕' : event.source === 'aucklandmarket' ? '🏪' : event.source === 'touristtrip' ? '🗺️' : event.source === 'edenpark' ? '🏟️' : event.source === 'eventbrite' ? '🎟️' : event.source === 'eventfinda' ? '📍' : event.source === 'humanitix' ? '💚' : event.source === 'cheeky' ? '💋' : event.source === 'aucklandforkids' ? '🧒' : event.source === 'fever' ? '🔥' : event.source === 'tripadvisor' ? '🦉' : event.source === 'eventcinemas' ? '🎬' : event.source === 'hoyts' ? '🍿' : event.source === 'rialto' ? '🎞️' : '🎪'}</div>`;

  const extraMeta = [];
  if (event.groupName) extraMeta.push(`👥 ${event.groupName}`);
  if (event.attendees != null) extraMeta.push(`${event.attendees} going`);
  if (event.rating) extraMeta.push(`★ ${event.rating.toFixed(1)}`);
  if (event.venueName) extraMeta.push(`🏠 ${event.venueName}`);

  card.innerHTML = `
    ${imgHtml}
    <div class="event-card-body">
      <div class="event-card-header">
        <h3>${event.title}</h3>
        <div class="event-badges">
          <span class="event-source-badge event-source-badge--${event.source || 'aucklandnz'}">${sourceLabel(event.source)}</span>
          ${hospitalityBadge(event)}
        </div>
      </div>
      <div class="event-meta">
        <span>📅 ${event.dateLabel || 'Dates TBC'}</span>
        ${event.region ? `<span>📍 ${event.region}</span>` : ''}
        <span>${event.category.name}</span>
        ${event.isFree ? '<span class="event-free">Free</span>' : event.price ? `<span>${event.price}</span>` : ''}
      </div>
      ${extraMeta.length ? `<div class="event-meta event-meta-sub">${extraMeta.map((m) => `<span>${m}</span>`).join('')}</div>` : ''}
      ${event.description ? `<p class="event-summary">${event.description}</p>` : ''}
      <div class="event-actions">
        <a class="btn btn-primary btn-sm" href="${event.url}" target="_blank" rel="noopener">View on ${sourceLabel(event.source)}</a>
      </div>
    </div>
  `;
  return card;
}

function updateSourceFilters() {
  const source = $('#event-filter-source').value;
  const anzBlock = $('#anz-category-filter');
  const meetupBlock = $('#meetup-category-filter');
  const regionBlock = $('#anz-region-filter');
  const showAnz = source === 'all' || source === 'aucklandnz';
  const showMeetup = source === 'all' || source === 'meetup';
  if (anzBlock) anzBlock.hidden = !showAnz;
  if (regionBlock) regionBlock.hidden = !showAnz;
  if (meetupBlock) meetupBlock.hidden = !showMeetup;
}

async function loadEvents() {
  const list = $('#event-list');
  const loading = $('#event-loading');
  const empty = $('#event-empty');

  loading.hidden = false;
  empty.hidden = true;
  list.innerHTML = '';

  const params = new URLSearchParams();
  const source = $('#event-filter-source').value;
  const category = $('#event-filter-category').value;
  const meetupCategory = $('#event-filter-meetup-category').value;
  const region = $('#event-filter-region').value;
  const q = $('#event-search-input').value.trim();
  const hospitality = $('#event-filter-hospo').checked ? '1' : '';

  if (source) params.set('source', source);
  if (category) params.set('category', category);
  if (meetupCategory) params.set('meetupCategory', meetupCategory);
  if (region) params.set('region', region);
  if (q) params.set('q', q);
  if (hospitality) params.set('hospitality', hospitality);
  params.set('startDate', todayNzDate());

  try {
    const res = await fetch(`/api/events?${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load events');

    allEvents = data.events;
    eventsLoaded = true;

    $('#event-stat-count').textContent = data.count;
    $('#event-results-count').textContent =
      data.count === 1 ? '1 event found' : `${data.count} events found`;
    const attr = $('.data-attribution');
    if (attr) {
      attr.innerHTML = `Sources: <a href="https://www.aucklandnz.com/events" target="_blank" rel="noopener">AucklandNZ</a> · <a href="https://www.aucklandlive.co.nz/" target="_blank" rel="noopener">Auckland Live</a> · <a href="https://www.atc.co.nz/whats-on" target="_blank" rel="noopener">ATC</a> · <a href="https://www.qtheatre.co.nz/shows" target="_blank" rel="noopener">Q Theatre</a> · <a href="https://hlt.org.nz/whats-on/events-calendar/" target="_blank" rel="noopener">HLT</a> · <a href="https://nyt.nz/onstage" target="_blank" rel="noopener">NYT</a> · <a href="https://www.iticket.co.nz/" target="_blank" rel="noopener">iTicket</a> · <a href="https://rnzb.org.nz/whats-on" target="_blank" rel="noopener">RNZB</a> · <a href="https://basementtheatre.co.nz/pages/tickets" target="_blank" rel="noopener">Basement Theatre</a> · <a href="https://www.ticketmaster.co.nz/discover/auckland" target="_blank" rel="noopener">Ticketmaster</a> · <a href="https://www.sparkarena.co.nz/all-events" target="_blank" rel="noopener">Spark Arena</a> · <a href="https://edenpark.co.nz/events/" target="_blank" rel="noopener">Eden Park</a> · <a href="https://www.eventbrite.co.nz/d/new-zealand--auckland/events/" target="_blank" rel="noopener">Eventbrite Auckland</a> · <a href="https://www.eventfinda.co.nz/search?q=&region%5B%5D=2" target="_blank" rel="noopener">Eventfinda Auckland</a> · <a href="https://humanitix.com/nz" target="_blank" rel="noopener">Humanitix NZ</a> · <a href="https://cheekyevents.net/location/auckland/" target="_blank" rel="noopener">Cheeky Events Auckland</a> · <a href="https://www.aucklandforkids.co.nz/whats-on-today/" target="_blank" rel="noopener">Auckland for Kids</a> · <a href="https://feverup.com/en/auckland/" target="_blank" rel="noopener">Fever Auckland</a> · <a href="https://www.tripadvisor.co.nz/Attractions-g1811027-Activities-c62-Auckland_North_Island.html" target="_blank" rel="noopener">TripAdvisor Auckland</a> · <a href="https://www.eventcinemas.co.nz/" target="_blank" rel="noopener">Event Cinemas NZ</a> · <a href="https://www.hoyts.co.nz/" target="_blank" rel="noopener">HOYTS NZ</a> · <a href="https://www.rialto.co.nz/cinema/newmarket" target="_blank" rel="noopener">Rialto Newmarket</a> · <a href="https://duedropeventscentre.org.nz/whats-on" target="_blank" rel="noopener">Due Drop Events Centre</a> · <a href="https://www.aucklandnightmarkets.co.nz/locations" target="_blank" rel="noopener">Auckland Night Markets</a> · <a href="https://foodtruckcollective.co.nz/events?stay=yes" target="_blank" rel="noopener">Food Truck Collective</a> · <a href="https://aucklandconventionbureau.com/visit/taste/markets" target="_blank" rel="noopener">ACB Markets</a> · <a href="https://markets.opencirclemarkets.com/" target="_blank" rel="noopener">Open Circle Markets</a> · <a href="https://aucklandmarketnz.co.nz/" target="_blank" rel="noopener">Auckland Markets</a> · <a href="https://touristtripplanner.com/city/auckland/street_markets" target="_blank" rel="noopener">Trip Planner markets</a> · <a href="https://www.meetup.com/find/?source=EVENTS&eventType=inPerson&sortField=DATETIME&distance=hundredMiles&location=nz--New+Zealand--Auckland" target="_blank" rel="noopener">Meetup Auckland</a>`;
    }

    loading.hidden = true;

    if (!data.count) {
      empty.hidden = false;
      return;
    }

    data.events.forEach((e) => list.appendChild(renderEventCard(e)));
  } catch (err) {
    loading.hidden = true;
    empty.hidden = false;
    $('#event-empty').querySelector('p').textContent = err.message;
    showToast('Could not load events');
  }
}

function initEvents() {
  const searchInput = $('#event-search-input');
  const searchClear = $('#event-search-clear');

  searchInput.addEventListener('input', () => {
    searchClear.hidden = !searchInput.value;
    loadEvents();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.hidden = true;
    loadEvents();
  });

  $('#event-filter-source').addEventListener('change', () => {
    updateSourceFilters();
    loadEvents();
  });
  $('#event-filter-category').addEventListener('change', loadEvents);
  $('#event-filter-meetup-category').addEventListener('change', loadEvents);
  $('#event-filter-region').addEventListener('change', loadEvents);
  $('#event-filter-hospo').addEventListener('change', loadEvents);
  updateSourceFilters();
}

function onEventsViewShown() {
  if (!eventsLoaded) loadEvents();
}