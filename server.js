const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3852;
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

const RESOURCES = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'resources.json'), 'utf8')
);
const CONTACTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'contacts.json'), 'utf8')
);

const AUCKLANDNZ_BASE = 'https://www.aucklandnz.com';
const AUCKLANDNZ_UA = 'Hospitality-Guide/1.0 (local demo; Auckland events for food businesses)';
const EVENT_CATEGORIES = [
  'Food-Drink',
  'Cultural-Events',
  'Sports',
  'Music',
  'Family-Kids',
  'Special-Events',
  'Performing-Arts',
];
const HOSPITALITY_KEYWORDS = /\b(food|drink|market|dining|culinary|feast|vendor|night\s*market|high\s*tea|wine|beer|festival|kai|hāngi|hangi|street\s*food|tasting)\b/i;
const MEETUP_BASE = 'https://www.meetup.com';
const MEETUP_FIND =
  'https://www.meetup.com/find/?source=EVENTS&eventType=inPerson&sortField=DATETIME&distance=hundredMiles&location=nz--New+Zealand--Auckland';
const MEETUP_UA = 'Hospitality-Guide/1.0 (local demo; Auckland Meetup events)';
const MEETUP_CATEGORY_LABELS = {
  '': 'Meetup',
  socialActivities: 'Social Activities',
  music: 'Music',
  communityAndEnvironment: 'Community & Environment',
  artAndCulture: 'Art & Culture',
  games: 'Games',
};
const MEETUP_FETCH_CATEGORIES = ['', 'socialActivities', 'music'];
const MEETUP_HOSPITALITY_EXTRA =
  /\b(diner|dinner|restaurant|brunch|lunch|supper|menu|café|cafe|kitchen|brew|pub|bar|eat|drink|wine|beer|tasting|food)\b|🍻/i;
const AUCKLAND_LIVE_BASE = 'https://www.aucklandlive.co.nz';
const AUCKLAND_LIVE_UA = 'Hospitality-Guide/1.0 (local demo; Auckland Live shows & events)';
const AUCKLAND_LIVE_VENUE_KEYWORDS =
  /\b(civic|aotea|town hall|aotea square|city centre|ktk|kiritea kanawa)\b/i;
const AUCKLAND_LIVE_SKIP_SLUGS = new Set(['fake-page-test']);
const TICKETMASTER_BASE = 'https://www.ticketmaster.co.nz';
const TICKETMASTER_DISCOVER = `${TICKETMASTER_BASE}/discover/auckland`;
const TICKETMASTER_UA = 'Hospitality-Guide/1.0 (local demo; Ticketmaster Auckland events)';
const TICKETMASTER_CITIES = 'Auckland,Takapuna Beach,Pukekohe,Western Springs';
const TICKETMASTER_CATEGORY_LABELS = {
  KZFzniwnSyZfZ7v7nJ: 'Music',
  KZFzniwnSyZfZ7v7nE: 'Sports',
  KZFzniwnSyZfZ7v7na: 'Arts & Theatre',
  family: 'Family',
};
const TICKETMASTER_ARENA_VENUES =
  /\b(spark arena|eden park|go media stadium|western springs|powerstation|mount smart|nzicc)\b/i;
const SPARKARENA_BASE = 'https://www.sparkarena.co.nz';
const SPARKARENA_EVENTS = `${SPARKARENA_BASE}/all-events`;
const SPARKARENA_VENUE_IDS = [294951, 295527];
const SPARKARENA_ADDRESS = '42-80 Mahuhu Crescent, Auckland';
const DUEDROP_BASE = 'https://duedropeventscentre.org.nz';
const DUEDROP_WHATS_ON = `${DUEDROP_BASE}/whats-on`;
const DUEDROP_ADDRESS = '770 Great South Road, Manukau';
const DUEDROP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const NIGHTMARKETS_BASE = 'https://www.aucklandnightmarkets.co.nz';
const NIGHTMARKETS_LOCATIONS = `${NIGHTMARKETS_BASE}/locations`;
const NIGHTMARKETS_STALLHOLDER = `${NIGHTMARKETS_BASE}/general-6`;
const NIGHTMARKETS_UA = 'Hospitality-Guide/1.0 (local demo; Auckland Night Markets schedule)';
const NIGHTMARKETS_DAY_NUM = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};
const FTC_BASE = 'https://foodtruckcollective.co.nz';
const FTC_HOME = `${FTC_BASE}/?stay=yes`;
const FTC_EVENTS = `${FTC_BASE}/events?stay=yes`;
const FTC_BOOK = `${FTC_BASE}/book_food_truck`;
const FTC_UA = 'Hospitality-Guide/1.0 (local demo; Food Truck Collective events)';
const FTC_LOGO =
  'https://89a19e940dfe254e7e1e738684ed136a.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1707276189901x634811307687621100/Logo.png';
const FTC_SEED_EVENT_IDS = [
  '1779674397005x110859906604335100',
  '1773373292521x390928951044210700',
  '1764635085262x865011992882839600',
  '1763001871406x187251816601485300',
  '1762988213357x755188370979160000',
  '1762988059225x499337052940927000',
  '1762987518617x545707077358059500',
  '1764715594947x776726010512015400',
  '1770073311260x469058961826381800',
  '1762996762237x133073534372020220',
];
const ACB_BASE = 'https://aucklandconventionbureau.com';
const ACB_MARKETS = `${ACB_BASE}/visit/taste/markets`;
const ACB_UA = 'Hospitality-Guide/1.0 (local demo; ACB Auckland markets directory)';
const ACB_MARKETS_IMAGE =
  'https://aucklandconventionbureau.com/sites/build_auckland/files/styles/carousel_banner/public/media-library/images/clevedon-market-1000x500.jpg';
const OCM_BASE = 'https://markets.opencirclemarkets.com';
const OCM_HOME = `${OCM_BASE}/`;
const OCM_VENDOR = `${OCM_BASE}/vendor-application.html`;
const OCM_UA = 'Hospitality-Guide/1.0 (local demo; Open Circle Markets Auckland)';
const OCM_IMAGE =
  'https://images.squarespace-cdn.com/content/v1/693452d60641f0626a9c52c7/2c200d64-af23-4d17-ae7c-16a96775599f/Open+Circle+Logo.png';
const AMN_BASE = 'https://aucklandmarketnz.co.nz';
const AMN_HOME = `${AMN_BASE}/`;
const AMN_STALLHOLDER = `${AMN_BASE}/stallholder-information/`;
const AMN_UA = 'Hospitality-Guide/1.0 (local demo; Auckland Markets NZ)';
const AMN_IMAGE = `${AMN_BASE}/wp-content/uploads/2018/08/Auckland_Markets.png`;
const AMN_MARKET_SLUGS = ['otahuhu-phoenix-markets', 'auckland-eastern-markets'];
const TTP_BASE = 'https://touristtripplanner.com';
const TTP_AUCKLAND_MARKETS = `${TTP_BASE}/city/auckland/street_markets`;
const TTP_API = 'https://trip.touristapplication.com/public/guides-data/query';
const TTP_UA = 'Hospitality-Guide/1.0 (local demo; Tourist Trip Planner Auckland street markets)';
const TTP_IMAGE = `${TTP_BASE}/assets/logo-CNtdoInR.png`;
const ATC_BASE = 'https://www.atc.co.nz';
const ATC_WHATS_ON = `${ATC_BASE}/whats-on`;
const ATC_CMS = 'https://cms.atc.co.nz';
const ATC_API = `${ATC_CMS}/umbraco/delivery/api/v2/content`;
const ATC_UA = 'Hospitality-Guide/1.0 (local demo; Auckland Theatre Company shows)';
const ATC_SEASON_PATHS = [
  '/whats-on/2026-season',
  '/whats-on/2025-season',
  '/whats-on/youth-arts',
];
const ATC_VENUE_KEYWORDS =
  /\b(asb waterfront|waterfront theatre|wynyard|ponsonby|tāmaki|tamaki)\b/i;
const ATC_MONTH_NUM = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
};
const QTHEATRE_BASE = 'https://www.qtheatre.co.nz';
const QTHEATRE_SHOWS = `${QTHEATRE_BASE}/shows`;
const QTHEATRE_UA = 'Hospitality-Guide/1.0 (local demo; Q Theatre Auckland shows)';
const QTHEATRE_ADDRESS = '305 Queen Street, Auckland CBD';
const QTHEATRE_SKIP_SLUGS = new Set(['today', 'tomorrow', 'this-week', 'weekend']);
const QTHEATRE_VENUE_KEYWORDS =
  /\b(q theatre|queen street|cbd|auckland central|kwg)\b/i;
const QTHEATRE_MONTH_NUM = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
};
const HLT_BASE = 'https://hlt.org.nz';
const HLT_CALENDAR = `${HLT_BASE}/whats-on/events-calendar/`;
const HLT_UA = 'Hospitality-Guide/1.0 (local demo; Howick Little Theatre shows)';
const HLT_ADDRESS = '9 Pakuranga Road, Howick, Auckland';
const HLT_SKIP_SLUGS = new Set(['today', 'week', 'month', 'weekend', 'rss']);
const HLT_VENUE_KEYWORDS =
  /\b(howick|pakuranga|east auckland|little theatre|hlt)\b/i;
const NYT_BASE = 'https://nyt.nz';
const NYT_ONSTAGE = `${NYT_BASE}/onstage`;
const NYT_UA = 'Hospitality-Guide/1.0 (local demo; National Youth Theatre Auckland shows)';
const NYT_AOTEA_ADDRESS = 'Aotea Centre, 50 Mayoral Drive, Auckland CBD';
const NYT_VENUE_KEYWORDS =
  /\b(aotea|kiri te kanawa|national youth theatre|nyt|tapac)\b/i;
const NYT_MONTH_NUM = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
};
const ITICKET_BASE = 'https://www.iticket.co.nz';
const ITICKET_API = 'https://api.iticket.co.nz/events';
const ITICKET_UA = 'Hospitality-Guide/1.0 (local demo; iTicket Auckland events)';
const ITICKET_VENUE_KEYWORDS =
  /\b(aotea|civic|spark arena|q theatre|tapac|basement theatre|eden park|showgrounds|town hall|ktk|kiri te kanawa|powerstation|bruce mason)\b/i;
const ITICKET_GENRE_LABELS = {
  34: 'Dance',
  35: 'Theatre',
  36: 'Music',
  37: 'Comedy',
  38: 'Sports & leisure',
  39: 'Family',
};
const RNZB_BASE = 'https://rnzb.org.nz';
const RNZB_WHATS_ON = `${RNZB_BASE}/whats-on`;
const RNZB_SEATING = `${RNZB_BASE}/your-visit/seat-categories-and-reserves`;
const RNZB_UA = 'Hospitality-Guide/1.0 (local demo; RNZB Auckland ballet performances)';
const RNZB_AUCKLAND_KEYWORDS =
  /\b(auckland|takapuna|north shore|kiri te kanawa|aotea centre|bruce mason)\b/i;
const RNZB_AOTEA_ADDRESS = 'Kiri Te Kanawa Theatre, Aotea Centre, 50 Mayoral Drive, Auckland CBD';
const RNZB_SEED_SLUGS = ['the-sleeping-beauty', 'winter-season', 'dazzlehands'];
const BASEMENT_BASE = 'https://basementtheatre.co.nz';
const BASEMENT_TICKETS = `${BASEMENT_BASE}/pages/tickets`;
const BASEMENT_WHATS_ON = `${BASEMENT_BASE}/blogs/whats-on`;
const BASEMENT_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const BASEMENT_ADDRESS = 'Basement Theatre, 12 Maidstone Street, Grey Lynn, Auckland';
const BASEMENT_VENUE_KEYWORDS = /\b(basement theatre|grey lynn|maidstone)\b/i;
const BASEMENT_MONTH_NUM = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
};
const OCM_MONTH_NUM = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};
const FTC_DISCOVERY_URLS = [
  'https://www.eventfinda.co.nz/search?q=food+truck+collective&region%5B%5D=2',
  'https://www.eventfinda.co.nz/search?q=food+truck+night&region%5B%5D=2&start_date=2026-06-01',
  'https://www.eventfinda.co.nz/2026/flat-bush-food-truck-night/auckland/botany-downs',
  'https://www.eventfinda.co.nz/2026/hobsonville-food-truck-night/auckland',
  'https://www.eventfinda.co.nz/2026/omaha-food-truck-night/auckland/omaha',
  'https://www.eventfinda.co.nz/2026/remuera-food-truck-night/auckland/remuera',
  'https://www.eventfinda.co.nz/2026/albany-food-truck-night/auckland/albany',
  'https://www.eventfinda.co.nz/2026/kahawai-point-food-truck-night2/auckland',
];
const EDEN_PARK_BASE = 'https://edenpark.co.nz';
const EDEN_PARK_EVENTS_URL = `${EDEN_PARK_BASE}/events/`;
const EDEN_PARK_UA = 'Hospitality-Guide/1.0 (local demo; Eden Park stadium events)';
const EDEN_PARK_EVENTS_CATEGORY = 4;
const EDEN_PARK_VENUE = 'Eden Park';
const EDEN_PARK_ADDRESS = '42 Reimers Ave, Kingsland, Auckland';
const EVENTBRITE_BASE = 'https://www.eventbrite.co.nz';
const EVENTBRITE_AUCKLAND =
  `${EVENTBRITE_BASE}/d/new-zealand--auckland/events/`;
const EVENTBRITE_UA = 'Hospitality-Guide/1.0 (local demo; Eventbrite Auckland events)';
const EVENTBRITE_BUCKET_LABELS = {
  food_and_drink_events: 'Food & Drink',
  music_events: 'Music',
  nightlife_events: 'Nightlife',
  business_and_professional_events: 'Business',
  performing_and_visual_arts_events: 'Arts & Theatre',
  science_and_technology_events: 'Science & Tech',
  popular_events: 'Popular',
  this_weekend: 'This weekend',
  online_events: 'Online',
};
const EVENTFINDA_BASE = 'https://www.eventfinda.co.nz';
const EVENTFINDA_AUCKLAND =
  `${EVENTFINDA_BASE}/search?q=&region%5B%5D=2&allUpcoming=1`;
const EVENTFINDA_UA = 'Hospitality-Guide/1.0 (local demo; Eventfinda Auckland events)';
const EVENTFINDA_REGION_ID = '2';
const HUMANITIX_BASE = 'https://humanitix.com';
const HUMANITIX_NZ = `${HUMANITIX_BASE}/nz`;
const HUMANITIX_AUCKLAND = `${HUMANITIX_BASE}/nz/events/nz--auckland`;
const HUMANITIX_CAROUSELS_API = `${HUMANITIX_BASE}/api/carousels`;
const HUMANITIX_IMAGES = 'https://images.humanitix.com';
const HUMANITIX_UA = 'Hospitality-Guide/1.0 (local demo; Humanitix Auckland events)';
const HUMANITIX_CAROUSEL_QUERIES = [
  {},
  { timeFrame: 'today' },
  { timeFrame: 'tomorrow' },
  { timeFrame: 'thisweek' },
  { timeFrame: 'thisweekend' },
  { timeFrame: 'nextweek' },
  { category: 'music' },
  { category: 'music', timeFrame: 'thisweekend' },
  { category: 'music', timeFrame: 'thisweek' },
  { category: 'food' },
  { category: 'community' },
  { category: 'family' },
  { category: 'travel' },
  { modifier: 'free' },
  { modifier: 'trending' },
];
const HUMANITIX_CATEGORY_LABELS = {
  music: 'Music',
  food: 'Food & Drink',
  art: 'Arts & Theatre',
  sports: 'Sports',
  business: 'Business',
  community: 'Community',
  family: 'Family',
  travel: 'Travel & Outdoor',
  charity: 'Charity',
  free: 'Free events',
  trending: 'Trending',
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisweek: 'This week',
  thisweekend: 'This weekend',
  nextweek: 'Next week',
};
const CHEEKY_BASE = 'https://cheekyevents.net';
const CHEEKY_AUCKLAND = `${CHEEKY_BASE}/location/auckland/`;
const CHEEKY_CALENDAR = `${CHEEKY_BASE}/calendar/`;
const CHEEKY_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const CHEEKY_EVENT_TYPE_META = {
  25: { slug: 'speeddating', label: 'Speed Dating' },
  28: { slug: 'singlemixers', label: 'Singles Mixers' },
  29: { slug: 'boat', label: 'Boat Parties' },
};
const CHEEKY_TYPE_LABELS = {
  speeddating: 'Speed Dating',
  singlemixers: 'Singles Mixers',
  boat: 'Boat Parties',
  'themed-speed-dating': 'Themed Speed Dating',
  'weekly-speed-dating': 'Weekly Speed Dating',
};
const AFK_BASE = 'https://www.aucklandforkids.co.nz';
const AFK_TODAY = `${AFK_BASE}/whats-on-today/`;
const AFK_WEEKEND = `${AFK_BASE}/whats-on-this-weekend/`;
const AFK_AJAX = `${AFK_BASE}/?evo-ajax=eventon_get_events`;
const AFK_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const AFK_REGION_LABELS = {
  'central-auckland': 'Central Auckland',
  'east-auckland': 'East Auckland',
  'gulf-islands': 'Gulf Islands',
  'north-shore': 'North Auckland',
  'south-auckland': 'South Auckland',
  virtual: 'Virtual',
  'west-auckland': 'West Auckland',
};
const FEVER_BASE = 'https://feverup.com';
const FEVER_AUCKLAND = `${FEVER_BASE}/en/auckland/`;
const FEVER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const FEVER_PLAN_BATCH = 8;
const TRIPADVISOR_BASE = 'https://www.tripadvisor.co.nz';
const TRIPADVISOR_EVENTS = `${TRIPADVISOR_BASE}/Attractions-g1811027-Activities-c62-Auckland_North_Island.html`;
const TRIPADVISOR_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const EVENTCINEMAS_BASE = 'https://www.eventcinemas.co.nz';
const EVENTCINEMAS_NOW_SHOWING = `${EVENTCINEMAS_BASE}/movies/getnowshowing`;
const EVENTCINEMAS_COMING_SOON = `${EVENTCINEMAS_BASE}/movies/getcomingsoon`;
const EVENTCINEMAS_FESTIVALS = `${EVENTCINEMAS_BASE}/eventsfestivals`;
const EVENTCINEMAS_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const EVENTCINEMAS_AUCKLAND_CINEMA_IDS = new Set([502, 504, 505, 506, 507, 509, 520]);
const EVENTCINEMAS_AUCKLAND_CINEMA_NAMES = {
  502: 'Queen Street',
  504: 'Albany',
  505: 'Westgate',
  506: 'Westcity',
  507: 'Manukau',
  509: 'St Lukes',
  520: 'Newmarket',
};
const EVENTCINEMAS_COMING_SOON_DAYS = 60;
const HOYTS_BASE = 'https://www.hoyts.co.nz';
const HOYTS_API = 'https://apim-aea.hoyts.co.nz/cinemaapi-nz-live/api/';
const HOYTS_IMG = 'https://imgix.hoyts.com.au/';
const HOYTS_EVENTS = `${HOYTS_BASE}/events`;
const HOYTS_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const HOYTS_COMING_SOON_DAYS = 60;
const HOYTS_AUCKLAND_CINEMAS = [
  'Mission Bay',
  'Botany Downs',
  'Hibiscus Coast',
  'Sylvia Park',
  'Wairau Park',
  'Ormiston',
];
const RIALTO_BASE = 'https://www.rialto.co.nz';
const RIALTO_NEWMARKET = `${RIALTO_BASE}/cinema/newmarket`;
const RIALTO_NOW_SHOWING = `${RIALTO_BASE}/movies/getnowshowing`;
const RIALTO_COMING_SOON = `${RIALTO_BASE}/movies/getcomingsoon`;
const RIALTO_FESTIVALS = `${RIALTO_BASE}/eventsfestivals`;
const RIALTO_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Hospitality-Guide/1.0';
const RIALTO_NEWMARKET_CINEMA_ID = 751;
const RIALTO_COMING_SOON_DAYS = 60;
const AFK_TYPE_LABELS = {
  art: 'Art',
  christmas: 'Christmas',
  culture: 'Culture',
  dance: 'Dance',
  environmental: 'Environmental',
  exhibition: 'Exhibition',
  festival: 'Festival',
  free: 'Free',
  markets: 'Markets & Fairs',
  movies: 'Movies',
  'museums-and-galleries': 'Museums and Galleries',
  music: 'Music',
  'school-holidays': 'School Holidays',
  'science-tech': 'Science & Tech',
  sports: 'Sports',
  theatre: 'Theatre',
};

const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000;

function cacheKey(params) {
  return JSON.stringify(params);
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { ts: Date.now(), data });
}

function parseNzDate(str) {
  if (!str) return null;
  const [d, m, y] = str.split('/').map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, '').trim();
}

function decodeHtmlEntities(text) {
  return (text || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function scoreHospitality(event) {
  let score = 0;
  const cat = event.category?.alias || '';
  const text = `${event.title} ${event.description} ${event.groupName || ''} ${event.venueName || ''}`;

  if (event.source === 'meetup') {
    if (cat === 'socialActivities') score += 2;
    if (MEETUP_HOSPITALITY_EXTRA.test(text)) score += 3;
    if (/diner|serial diners/i.test(text)) score += 2;
  } else if (event.source === 'aucklandlive') {
    if (/food|drink|gin/i.test(cat)) score += 3;
    if (/festival|matariki|cabaret/i.test(text)) score += 2;
    if (AUCKLAND_LIVE_VENUE_KEYWORDS.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'sparkarena') {
    score += 3;
    if (/music|concert|sport|family/i.test(cat)) score += 2;
    if (/disney|basketball|concert|tour|globetrotters|tuning fork/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'duedrop') {
    score += 2;
    if (/music|family|cultural|sport|dance/i.test(cat)) score += 2;
    if (/concert|wrestling|dance|matariki|funfest|family|festival/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'nightmarkets') {
    score += 5;
    if (/food|market/i.test(cat)) score += 2;
    if (/night market|stall|food truck|5pm/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'ftc') {
    score += 5;
    if (/food|market/i.test(cat)) score += 2;
    if (/food truck|street food|night market|pop-up bar/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'acbmarkets') {
    score += 5;
    if (/food|market/i.test(cat)) score += 2;
    if (/farmers|flea|market|food truck|produce/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'opencircle') {
    score += 5;
    if (/food|market/i.test(cat)) score += 2;
    if (/night market|community market|food vendor|stall|live music/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'aucklandmarket') {
    score += 5;
    if (/food|market/i.test(cat)) score += 2;
    if (/weekly market|food stall|produce|stallholder/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'touristtrip') {
    score += 4;
    if (/food|market/i.test(cat)) score += 2;
    if (/farmers|flea|night market|street market|food stall|produce/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'atc') {
    score += 2;
    if (/theatre|performing|cabaret|musical|drama/i.test(cat)) score += 2;
    if (ATC_VENUE_KEYWORDS.test(text)) score += 1;
    if (/festival|cabaret|musical|comedy|shakespeare/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'qtheatre') {
    score += 2;
    if (/theatre|comedy|music|dance|performing/i.test(cat)) score += 2;
    if (QTHEATRE_VENUE_KEYWORDS.test(text)) score += 1;
    if (/festival|cabaret|musical|comedy|shakespeare|concert/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'hlt') {
    score += 2;
    if (/theatre|comedy|drama|romance/i.test(cat)) score += 2;
    if (HLT_VENUE_KEYWORDS.test(text)) score += 1;
    if (/comedy|matinee|season|play/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'nyt') {
    score += 2;
    if (/musical|theatre|family|onstage/i.test(cat)) score += 2;
    if (NYT_VENUE_KEYWORDS.test(text)) score += 1;
    if (/aotea|mermaid|wimpy kid|musical|family/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'iticket') {
    score += 2;
    if (/theatre|music|dance|comedy|family|sports/i.test(cat)) score += 2;
    if (ITICKET_VENUE_KEYWORDS.test(text)) score += 1;
    if (/market|festival|matariki|world cup|pub|bar|concert|musical|showgrounds/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'rnzb') {
    score += 2;
    if (/ballet|dance|theatre|family|performing/i.test(cat)) score += 2;
    if (RNZB_AUCKLAND_KEYWORDS.test(text)) score += 1;
    if (/aotea|kiri te kanawa|bruce mason|sleeping beauty|winter season|dazzlehands/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'basement') {
    score += 2;
    if (/comedy|theatre|improv|cabaret|dance|show/i.test(cat)) score += 2;
    if (BASEMENT_VENUE_KEYWORDS.test(text)) score += 1;
    if (/matariki|pride|festival|comedy|improv|studio/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'ticketmaster') {
    if (TICKETMASTER_ARENA_VENUES.test(text)) score += 2;
    if (AUCKLAND_LIVE_VENUE_KEYWORDS.test(text)) score += 1;
    if (/music|sports|family|arts/i.test(cat)) score += 1;
    if (/festival|matariki|warriors|concert/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'edenpark') {
    if (/special|eats|tunnel|art in the park|food/i.test(`${text} ${cat}`)) score += 3;
    if (/concerts|sports|special-events/i.test(cat)) score += 2;
    if (/all blacks|warriors|blackcaps|rugby|football|concert/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'eventbrite') {
    if (/food|drink|market|nightlife/i.test(cat)) score += 3;
    if (/music|popular|this weekend/i.test(cat)) score += 1;
    if (/party|festival|tasting|brunch|dinner|cocktail|wine|beer|market/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'eventfinda') {
    if (/food|gourmet|wine|market|fair|festival|family/i.test(cat)) score += 3;
    if (/jazz|comedy|theatre|rock|dance|cabaret|sports|soccer/i.test(cat)) score += 1;
    if (/market|fair|wine|food|festival|night market/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'humanitix') {
    if (/food|community|family|travel|charity|free/i.test(cat)) score += 3;
    if (/music|art|sports|trending/i.test(cat)) score += 1;
    if (/market|festival|food|wine|reuse|night/i.test(text)) score += 2;
    if (event.isFree) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'cheeky') {
    if (/boat|singlemixers|speeddating|speed-dating|singles|mixer/i.test(cat)) score += 3;
    if (/drink|bar|mingle|party|social|night out|boat/i.test(text)) score += 2;
    if (/speed dating|mixer|boat party/i.test(text)) score += 2;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'aucklandforkids') {
    if (/markets|festival|food|free|school-holidays/i.test(cat)) score += 3;
    if (/museum|music|sports|culture|family/i.test(cat)) score += 1;
    if (/market|fair|festival|food|picnic/i.test(text)) score += 2;
    if (event.isFree) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'fever') {
    if (/food|restaurant|dining|market/i.test(cat)) score += 3;
    if (/music|candlelight|live-show|festival|culture|immersive|popular/i.test(cat)) score += 2;
    if (/concert|exhibition|immersive|experience|show|cocktail|wine/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'tripadvisor') {
    if (/food|drink|festival|market|cultural/i.test(cat)) score += 3;
    if (/sport|music|nightlife|bar|exhibition/i.test(cat)) score += 2;
    if (/festival|market|food|drink|pasifika|cultural|bar|club|night/i.test(text)) score += 2;
    if (event.rating >= 4) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'eventcinemas') {
    if (/festival|film-festival/i.test(cat)) score += 3;
    if (/family|coming-soon|blockbuster|music/i.test(cat)) score += 2;
    if (/imax|gold class|opening night|fright night|festival|opera/i.test(text)) score += 2;
    if (/animated|family|kids|G\b/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'hoyts') {
    if (/festival|film-festival|event/i.test(cat)) score += 3;
    if (/family|coming-soon|screening|music/i.test(cat)) score += 2;
    if (/lux|xtremescreen|main stage|prams|morning/i.test(text)) score += 2;
    if (/animated|family|kids|G\b/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else if (event.source === 'rialto') {
    if (/festival|film-festival/i.test(cat)) score += 3;
    if (/family|coming-soon|screening|music/i.test(cat)) score += 2;
    if (/nziff|met opera|national theatre|exhibition|film talk|ladies film/i.test(text)) score += 2;
    if (/animated|family|kids|G\b/i.test(text)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
  } else {
    if (cat === 'Food-Drink') score += 3;
    if (['Cultural-Events', 'Sports', 'Music', 'Special-Events'].includes(cat)) score += 1;
    if (HOSPITALITY_KEYWORDS.test(text)) score += 2;
    if (/market/i.test(text)) score += 1;
  }

  if (HOSPITALITY_KEYWORDS.test(text) || MEETUP_HOSPITALITY_EXTRA.test(text)) score += 1;
  return score;
}

function formatMeetupDate(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-NZ', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Pacific/Auckland',
    });
  } catch {
    return null;
  }
}

function resolveApolloRef(apollo, ref) {
  if (!ref?.__ref) return null;
  return apollo[ref.__ref] || null;
}

function parseMeetupApollo(apollo, meetupCategory) {
  if (!apollo) return [];

  const rootQuery = apollo.ROOT_QUERY || {};
  const rootKey = Object.keys(rootQuery).find((k) => k.startsWith('recommendedEvents:'));
  if (!rootKey) return [];

  const connection = rootQuery[rootKey];
  const edges = connection?.edges || [];
  const events = [];

  for (const edgeRef of edges) {
    const edge = resolveApolloRef(apollo, edgeRef);
    const raw = resolveApolloRef(apollo, edge?.node);
    if (!raw || raw.__typename !== 'Event' || !raw.id) continue;

    const group = resolveApolloRef(apollo, raw.group);
    const photo =
      resolveApolloRef(apollo, raw.featuredEventPhoto) ||
      resolveApolloRef(apollo, raw.displayPhoto);
    const venue = raw.venue || null;
    const startDate = raw.dateTime ? raw.dateTime.slice(0, 10) : null;

    const event = {
      id: `meetup-${raw.id}`,
      title: raw.title,
      description: (raw.description || '').trim().slice(0, 280),
      url: raw.eventUrl || `${MEETUP_BASE}/find/nz--auckland/`,
      image: photo?.highResUrl || null,
      dateLabel: formatMeetupDate(raw.dateTime) || 'Date TBC',
      startDate,
      endDate: startDate,
      category: {
        name: MEETUP_CATEGORY_LABELS[meetupCategory] || 'Meetup',
        alias: meetupCategory || 'meetup',
      },
      subcategories: group?.name ? [group.name] : [],
      region: venue?.city || 'Auckland',
      regionAlias: null,
      venueName: venue?.name || null,
      venueAddress: venue?.address || null,
      groupName: group?.name || null,
      attendees: raw.rsvps?.totalCount ?? null,
      rating: group?.stats?.eventRatings?.average ?? null,
      price: null,
      isFree: !raw.feeSettings,
      source: 'meetup',
    };

    event.hospitalityScore = scoreHospitality(event);
    event.hospitalityRelevant = event.hospitalityScore >= 2;
    events.push(event);
  }

  return events;
}

async function fetchMeetupPage(meetupCategory) {
  const params = new URLSearchParams({
    source: 'EVENTS',
    eventType: 'inPerson',
    sortField: 'DATETIME',
    distance: 'hundredMiles',
    location: 'nz--New+Zealand--Auckland',
  });
  if (meetupCategory) params.set('category', meetupCategory);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${MEETUP_BASE}/find/?${params}`, {
      headers: { 'User-Agent': MEETUP_UA, Accept: 'text/html' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/);
    if (!match) return [];

    const data = JSON.parse(match[1]);
    const apollo = data?.props?.pageProps?.__APOLLO_STATE__;
    return parseMeetupApollo(apollo, meetupCategory);
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function formatAucklandLiveDate(startIso, endIso) {
  if (!startIso) return null;
  try {
    const start = new Date(startIso);
    const end = endIso ? new Date(endIso) : null;
    const fmt = (d) =>
      d.toLocaleString('en-NZ', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'Pacific/Auckland',
      });
    if (end && end.toDateString() !== start.toDateString()) {
      const endShort = end.toLocaleString('en-NZ', {
        day: 'numeric',
        month: 'short',
        timeZone: 'Pacific/Auckland',
      });
      return `${fmt(start)} – ${endShort}`;
    }
    return fmt(start);
  } catch {
    return null;
  }
}

function aucklandLiveImage(attrs) {
  return (
    attrs.hero_image?.images?.desktop?.[0] ||
    attrs.hero_image?.images?.mobile?.[0] ||
    attrs.main_images?.[0] ||
    attrs.landscape_thumbnail ||
    attrs.square_thumbnail ||
    attrs.thumbnail ||
    null
  );
}

function normalizeAucklandLiveItem(raw, kind) {
  const a = raw.attributes || {};
  const slug = a.slug;
  if (!slug || AUCKLAND_LIVE_SKIP_SLUGS.has(slug)) return null;
  if (a.is_published === false || a.disabled) return null;

  const path = kind === 'event' ? `/event/${slug}` : `/show/${slug}`;
  const genre = a.genres?.[0];
  const categoryName = genre?.description || genre?.name || (kind === 'event' ? 'Festival / season' : 'Live show');
  const categoryAlias = (genre?.name || kind).toLowerCase().replace(/\s+/g, '-');
  const venueName = a.venue_name || a.venues || null;
  const startDate = a.start_date ? a.start_date.slice(0, 10) : null;
  const endDate = a.end_date ? a.end_date.slice(0, 10) : startDate;
  const price =
    a.start_price && a.end_price && a.start_price !== a.end_price
      ? `$${a.start_price}–$${a.end_price}`
      : a.start_price
        ? `$${a.start_price}`
        : a.end_price
          ? `$${a.end_price}`
          : null;

  const event = {
    id: `aucklandlive-${kind}-${raw.id}`,
    title: a.name || slug,
    description: stripHtml(a.description || a.subtitle || '').slice(0, 280),
    url: `${AUCKLAND_LIVE_BASE}${path}`,
    image: aucklandLiveImage(a),
    dateLabel: formatAucklandLiveDate(a.start_date, a.end_date) || 'Dates TBC',
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: categoryAlias,
    },
    subcategories: (a.genres || []).map((g) => g.description || g.name).filter(Boolean),
    region: 'Central Auckland',
    regionAlias: 'Central-Auckland',
    venueName,
    venueAddress: null,
    groupName: a.presenter || null,
    attendees: null,
    rating: null,
    price,
    isFree: !!a.is_free,
    source: 'aucklandlive',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchAucklandLiveCollection(resource, maxPages = 6) {
  const limit = 100;
  const seen = new Set();
  const items = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const params = new URLSearchParams({
      limit: String(limit),
      page: String(page),
      exclude_past_events: 'true',
      is_published: 'true',
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(`${AUCKLAND_LIVE_BASE}/api/live/${resource}?${params}`, {
        headers: {
          'User-Agent': AUCKLAND_LIVE_UA,
          Accept: 'application/json',
          Referer: `${AUCKLAND_LIVE_BASE}/`,
        },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) break;

      const json = await res.json();
      const batch = Array.isArray(json.data) ? json.data : [];
      if (!batch.length) break;

      for (const raw of batch) {
        if (!raw?.id || seen.has(raw.id)) continue;
        seen.add(raw.id);
        items.push(raw);
      }

      if (!json.links?.next || batch.length < limit) break;
    } catch {
      clearTimeout(timer);
      break;
    }
  }

  return items;
}

async function fetchAucklandLiveEvents() {
  const [eventsRaw, showsRaw] = await Promise.all([
    fetchAucklandLiveCollection('events', 3),
    fetchAucklandLiveCollection('shows', 6),
  ]);

  const seen = new Set();
  const events = [];

  for (const raw of eventsRaw) {
    const event = normalizeAucklandLiveItem(raw, 'event');
    if (!event || seen.has(event.id)) continue;
    seen.add(event.id);
    events.push(event);
  }

  for (const raw of showsRaw) {
    const event = normalizeAucklandLiveItem(raw, 'show');
    if (!event || seen.has(event.id)) continue;
    seen.add(event.id);
    events.push(event);
  }

  return events;
}

function mapTicketmasterRegion(city) {
  const c = (city || '').toLowerCase();
  if (c.includes('takapuna')) return { region: 'North Shore', alias: 'North-Shore' };
  if (c.includes('pukekohe')) return { region: 'South Auckland', alias: 'South-Auckland' };
  if (c.includes('western springs')) return { region: 'West Auckland', alias: 'West-Auckland' };
  if (c === 'auckland') return { region: 'Central Auckland', alias: 'Central-Auckland' };
  return { region: city || 'Auckland', alias: 'Central-Auckland' };
}

function ticketmasterImage(raw) {
  const artist = raw.artists?.[0];
  const urls = artist?.imageUrls || {};
  return (
    urls.RETINA_PORTRAIT_16_9 ||
    urls.ARTIST_PAGE_3_2 ||
    urls.TABLET_LANDSCAPE_LARGE_16_9 ||
    raw.venue?.imageUrl ||
    null
  );
}

function normalizeTicketmasterEvent(raw) {
  if (!raw?.id || raw.cancelled || raw.postponed || raw.virtual) return null;

  const majorId = raw.majorCategory?.id || '';
  const categoryName = TICKETMASTER_CATEGORY_LABELS[majorId] || 'Live event';
  const venue = raw.venue || {};
  const { region, alias } = mapTicketmasterRegion(venue.city);
  const startIso = raw.dates?.startDate;
  const endIso = raw.dates?.endDate;
  const startDate = startIso ? startIso.slice(0, 10) : null;
  const endDate = endIso ? endIso.slice(0, 10) : startDate;
  const artist = raw.artists?.[0]?.name;

  const event = {
    id: `ticketmaster-${raw.id}`,
    title: raw.title,
    description: [artist, venue.name, venue.city].filter(Boolean).join(' · ').slice(0, 280),
    url: raw.url || `${TICKETMASTER_DISCOVER}`,
    image: ticketmasterImage(raw),
    dateLabel: formatAucklandLiveDate(startIso, endIso) || 'Dates TBC',
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: majorId || 'ticketmaster',
    },
    subcategories: artist ? [artist] : [],
    region,
    regionAlias: alias,
    venueName: venue.name || null,
    venueAddress: venue.addressLineOne || null,
    groupName: artist || null,
    attendees: null,
    rating: null,
    price: raw.soldOut ? 'Sold out' : raw.limitedAvailability ? 'Limited' : null,
    isFree: false,
    source: 'ticketmaster',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchTicketmasterPage(page) {
  const params = new URLSearchParams({
    cities: TICKETMASTER_CITIES,
    countryCodes: 'NZ',
    stateCodes: '',
    page: String(page),
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${TICKETMASTER_BASE}/api/search/events/city?${params}`, {
      headers: {
        'User-Agent': TICKETMASTER_UA,
        Accept: 'application/json',
        Referer: TICKETMASTER_DISCOVER,
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { total: 0, events: [] };
    return res.json();
  } catch {
    clearTimeout(timer);
    return { total: 0, events: [] };
  }
}

async function fetchTicketmasterEvents() {
  const first = await fetchTicketmasterPage(0);
  const total = first.total || first.events?.length || 0;
  const pageCount = Math.min(Math.ceil(total / 20) || 1, 20);

  const pageNums = Array.from({ length: pageCount }, (_, i) => i);
  const batches = await Promise.all(pageNums.map((p) => (p === 0 ? first : fetchTicketmasterPage(p))));

  const seen = new Set();
  const events = [];

  for (const batch of batches) {
    for (const raw of batch.events || []) {
      const event = normalizeTicketmasterEvent(raw);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }
  }

  return events;
}

async function fetchSparkArenaVenuePage(venueId, page) {
  const params = new URLSearchParams({
    venueId: String(venueId),
    page: String(page),
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${TICKETMASTER_BASE}/api/search/events/venue?${params}`, {
      headers: {
        'User-Agent': TICKETMASTER_UA,
        Accept: 'application/json',
        Referer: SPARKARENA_EVENTS,
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { total: 0, events: [] };
    return res.json();
  } catch {
    clearTimeout(timer);
    return { total: 0, events: [] };
  }
}

function normalizeSparkArenaEvent(raw) {
  if (!raw?.id || raw.cancelled || raw.postponed || raw.virtual) return null;

  const majorId = raw.majorCategory?.id || '';
  const categoryName = TICKETMASTER_CATEGORY_LABELS[majorId] || 'Live event';
  const venue = raw.venue || {};
  const isTuningFork = /tuning fork/i.test(venue.name || '');
  const startIso = raw.dates?.startDate;
  const endIso = raw.dates?.endDate;
  const startDate = startIso ? startIso.slice(0, 10) : null;
  const endDate = endIso ? endIso.slice(0, 10) : startDate;
  const artist = raw.artists?.[0]?.name;

  const event = {
    id: `sparkarena-${raw.id}`,
    title: raw.title,
    description: [artist, venue.name, SPARKARENA_ADDRESS].filter(Boolean).join(' · ').slice(0, 280),
    url: raw.url || SPARKARENA_EVENTS,
    image: ticketmasterImage(raw) || venue.imageUrl || null,
    dateLabel: formatAucklandLiveDate(startIso, endIso) || 'Dates TBC',
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: majorId || 'sparkarena',
    },
    subcategories: artist ? [artist] : [],
    region: 'Central Auckland',
    regionAlias: 'Central-Auckland',
    venueName: isTuningFork ? 'Tuning Fork (Spark Arena)' : 'Spark Arena',
    venueAddress: venue.addressLineOne || SPARKARENA_ADDRESS,
    groupName: 'Spark Arena',
    attendees: null,
    rating: null,
    price: raw.soldOut ? 'Sold out' : raw.limitedAvailability ? 'Limited' : null,
    isFree: false,
    source: 'sparkarena',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchSparkArenaEvents() {
  const seen = new Set();
  const events = [];

  for (const venueId of SPARKARENA_VENUE_IDS) {
    const first = await fetchSparkArenaVenuePage(venueId, 0);
    const total = first.total || first.events?.length || 0;
    const pageCount = Math.min(Math.ceil(total / 20) || 1, 10);

    for (let page = 0; page < pageCount; page++) {
      const batch = page === 0 ? first : await fetchSparkArenaVenuePage(venueId, page);
      for (const raw of batch.events || []) {
        const event = normalizeSparkArenaEvent(raw);
        if (!event || seen.has(event.id)) continue;
        seen.add(event.id);
        events.push(event);
      }
    }
  }

  return events;
}

function parseAcfYmd(ymd) {
  if (!ymd || String(ymd).length !== 8) return null;
  const s = String(ymd);
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

function normalizeEventTitleKey(title) {
  return (title || '')
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function crossSourceDedupe(events) {
  const groups = new Map();

  for (const event of events) {
    const key = `${normalizeEventTitleKey(event.title)}|${event.startDate || ''}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }

  const result = [];
  for (const group of groups.values()) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }

    const sources = new Set(group.map((e) => e.source));
    if (sources.has('edenpark') && sources.has('ticketmaster')) {
      const eden = group.find((e) => e.source === 'edenpark');
      const tm = group.find((e) => e.source === 'ticketmaster');
      const foodish = /eats|food|tunnel club|art in the park/i.test(eden?.title || '');
      result.push(foodish ? eden : tm || eden || group[0]);
      continue;
    }

    if (sources.has('ticketmaster') && sources.has('sparkarena')) {
      result.push(group.find((e) => e.source === 'sparkarena') || group[0]);
      continue;
    }

    if (sources.has('eventfinda') && sources.has('duedrop')) {
      result.push(group.find((e) => e.source === 'duedrop') || group[0]);
      continue;
    }

    if (sources.has('eventfinda') && sources.has('ftc')) {
      result.push(group.find((e) => e.source === 'ftc') || group[0]);
      continue;
    }

    if (sources.has('iticket') && sources.has('basement')) {
      result.push(group.find((e) => e.source === 'basement') || group[0]);
      continue;
    }

    result.push(...group);
  }

  return result;
}

function edenParkCategoryName(categories) {
  const priority = ['Special Events', 'Concerts', 'Sports', 'Events'];
  for (const name of priority) {
    if (categories.includes(name)) return name;
  }
  return categories[0] || 'Stadium event';
}

function normalizeEdenParkPost(raw) {
  if (!raw?.id || raw.status !== 'publish') return null;

  const acf = raw.acf || {};
  const startYmd = acf.event_start_date?.value_formatted || acf.event_start_date?.value;
  const endYmd = acf.event_end_date?.value_formatted || acf.event_end_date?.value;
  const startDate = parseAcfYmd(startYmd);
  const endDate = parseAcfYmd(endYmd) || startDate;
  const today = new Date().toISOString().slice(0, 10);

  if (endDate && endDate < today) return null;
  if (!startDate && !endDate) return null;

  const terms = (raw._embedded?.['wp:term'] || []).flat();
  const categories = terms.filter((t) => t.taxonomy === 'category').map((t) => t.name);
  const tags = terms.filter((t) => t.taxonomy === 'post_tag').map((t) => t.name);
  const categoryName = edenParkCategoryName(categories);
  const categoryAlias = categoryName.toLowerCase().replace(/\s+/g, '-');

  const friendlyDate =
    acf.event_friendly_date?.value_formatted ||
    acf.event_friendly_date?.value ||
    null;
  const dateLabel =
    friendlyDate ||
    (startDate
      ? formatAucklandLiveDate(`${startDate}T12:00:00+12:00`, endDate && endDate !== startDate ? `${endDate}T12:00:00+12:00` : null)
      : 'Dates TBC');

  const excerpt = stripHtml(raw.excerpt?.rendered || '');
  const image = raw._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  const event = {
    id: `edenpark-${raw.id}`,
    title: stripHtml(raw.title?.rendered || ''),
    description: excerpt.slice(0, 280),
    url: raw.link || EDEN_PARK_EVENTS_URL,
    image,
    dateLabel,
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: categoryAlias,
    },
    subcategories: tags,
    region: 'Kingsland',
    regionAlias: 'Central-Auckland',
    venueName: EDEN_PARK_VENUE,
    venueAddress: EDEN_PARK_ADDRESS,
    groupName: tags[0] || null,
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'edenpark',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function parseEventbriteServerData(html) {
  const match = html.match(/window\.__SERVER_DATA__\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function eventbriteIdFromUrl(url) {
  const m = (url || '').match(/(\d{10,})(?:\?|$)/);
  return m ? m[1] : null;
}

function eventbriteCategoryFromTags(tags) {
  const categoryTag = (tags || []).find((t) => t.prefix === 'EventbriteCategory');
  return categoryTag?.display_name || categoryTag?.localized?.display_name || null;
}

function eventbriteSubcategoryTags(tags) {
  return (tags || [])
    .filter((t) => t.prefix === 'EventbriteSubCategory' || t.prefix === 'EventbriteFormat')
    .map((t) => t.display_name)
    .filter(Boolean);
}

function formatEventbriteDate(startDate, startTime, endDate, endTime) {
  if (!startDate) return null;
  const startIso = `${startDate}T${startTime || '12:00'}:00+12:00`;
  const endIso =
    endDate && endDate !== startDate
      ? `${endDate}T${endTime || '23:59'}:00+12:00`
      : endTime
        ? `${startDate}T${endTime}:00+12:00`
        : null;
  return formatAucklandLiveDate(startIso, endIso);
}

function normalizeEventbriteBucketEvent(raw, bucketKey) {
  if (!raw?.id || raw.is_cancelled || raw.is_online_event) return null;

  const startDate = raw.start_date || null;
  const endDate = raw.end_date || startDate;
  const today = new Date().toISOString().slice(0, 10);
  if (endDate && endDate < today) return null;

  const venue = raw.primary_venue || {};
  const address = venue.address || {};
  const tagCategory = eventbriteCategoryFromTags(raw.tags);
  const bucketCategory = EVENTBRITE_BUCKET_LABELS[bucketKey] || 'Eventbrite';
  const categoryName = tagCategory || bucketCategory;
  const categoryAlias = (bucketKey || categoryName).toLowerCase().replace(/\s+/g, '-');
  const subcategories = eventbriteSubcategoryTags(raw.tags);
  const image =
    raw.image?.image_sizes?.medium ||
    raw.image?.url ||
    null;
  const description = (raw.summary || stripHtml(raw.full_description || '')).trim().slice(0, 280);

  const event = {
    id: `eventbrite-${raw.id}`,
    title: raw.name || 'Eventbrite event',
    description,
    url: raw.url || EVENTBRITE_AUCKLAND,
    image,
    dateLabel: formatEventbriteDate(startDate, raw.start_time, endDate, raw.end_time) || 'Dates TBC',
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: categoryAlias,
    },
    subcategories,
    region: address.city || address.localized_area_display || 'Auckland',
    regionAlias: null,
    venueName: venue.name || null,
    venueAddress: address.localized_address_display || address.address_1 || null,
    groupName: null,
    attendees: null,
    rating: null,
    price: null,
    isFree: /\bfree\b/i.test(`${raw.name} ${description}`),
    source: 'eventbrite',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function normalizeEventbriteJsonLdItem(item) {
  if (!item?.url) return null;

  const id = eventbriteIdFromUrl(item.url);
  if (!id) return null;

  const startDate = item.startDate || null;
  const endDate = item.endDate || startDate;
  const today = new Date().toISOString().slice(0, 10);
  if (endDate && endDate < today) return null;
  if (/OnlineEventAttendanceMode/i.test(item.eventAttendanceMode || '')) return null;

  const loc = item.location || {};
  const addr = loc.address || {};
  const description = (item.description || '').trim().slice(0, 280);

  const event = {
    id: `eventbrite-${id}`,
    title: item.name || 'Eventbrite event',
    description,
    url: item.url,
    image: item.image || null,
    dateLabel: formatEventbriteDate(startDate, null, endDate, null) || 'Dates TBC',
    startDate,
    endDate,
    category: {
      name: 'Eventbrite',
      alias: 'eventbrite',
    },
    subcategories: [],
    region: addr.addressLocality || 'Auckland',
    regionAlias: null,
    venueName: loc.name || null,
    venueAddress: addr.streetAddress || null,
    groupName: null,
    attendees: null,
    rating: null,
    price: null,
    isFree: /\bfree\b/i.test(`${item.name} ${description}`),
    source: 'eventbrite',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function parseEventfindaCard(block) {
  const id = block.match(/_efC\(4,\s*(\d+)\)/)?.[1];
  const title = decodeHtmlEntities(block.match(/class="url summary">([^<]+)/)?.[1]?.trim());
  const href = block.match(/href="([^"]+)" class="url summary"/)?.[1];
  const image = block.match(/img src="([^"]+)"/)?.[1] || null;
  const startIso = block.match(/class="value-title" title="([^"]+)"/)?.[1] || null;
  const dateLabel =
    decodeHtmlEntities(
      block.match(/class="value-title"[^>]*>[\s\S]*?([^<\n]+)\s*<\/span>/)?.[1]?.trim()
    ) || null;
  const category = decodeHtmlEntities(block.match(/<span class="category">([^<]+)/)?.[1]?.trim());
  const badge = decodeHtmlEntities(
    block.match(/class="badge[^"]*">[\s\S]*?<span[^>]*><\/span>\s*([^<]+)/)?.[1]?.trim()
  );

  const locMatch = block.match(/class="p-locality">([\s\S]*?)<\/p>/);
  const locHtml = locMatch?.[1] || '';
  const venueName = decodeHtmlEntities(locHtml.match(/class="location">([^<]+)/)?.[1]?.trim());
  const suburb = decodeHtmlEntities(
    locHtml.match(/class="location">[^<]+<\/a>,\s*([^,&]+)/)?.[1]?.trim() || 'Auckland'
  );

  if (!id || !title || !href) return null;

  return {
    id,
    title,
    href,
    image,
    startIso,
    dateLabel,
    category,
    badge,
    venueName,
    suburb,
  };
}

function parseEventfindaHtml(html) {
  const cardRe = /<div class="card h-event vevent h-card[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  const cards = [];
  for (const match of html.matchAll(cardRe)) {
    const parsed = parseEventfindaCard(match[1]);
    if (parsed) cards.push(parsed);
  }
  return cards;
}

function normalizeEventfindaCard(raw) {
  const startDate = raw.startIso ? raw.startIso.slice(0, 10) : null;
  const today = new Date().toISOString().slice(0, 10);
  if (startDate && startDate < today) return null;

  const categoryName = raw.category || 'Eventfinda';
  const categoryAlias = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const description = [raw.venueName, raw.category, raw.badge].filter(Boolean).join(' · ').slice(0, 280);
  const isFree = /\bfree\b/i.test(`${raw.title} ${raw.badge || ''} ${description}`);

  const event = {
    id: `eventfinda-${raw.id}`,
    title: raw.title,
    description,
    url: raw.href.startsWith('http') ? raw.href : `${EVENTFINDA_BASE}${raw.href}`,
    image: raw.image,
    dateLabel:
      (raw.startIso ? formatAucklandLiveDate(raw.startIso, null) : null) ||
      raw.dateLabel ||
      'Dates TBC',
    startDate,
    endDate: startDate,
    category: {
      name: categoryName,
      alias: categoryAlias,
    },
    subcategories: raw.badge ? [raw.badge] : [],
    region: raw.suburb || 'Auckland',
    regionAlias: null,
    venueName: raw.venueName || null,
    venueAddress: raw.venueName ? `${raw.venueName}, ${raw.suburb || 'Auckland'}` : null,
    groupName: null,
    attendees: null,
    rating: null,
    price: raw.badge || null,
    isFree,
    source: 'eventfinda',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function parseHumanitixNextData(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function humanitixCarouselCategoryLabel(query) {
  if (query.modifier) return HUMANITIX_CATEGORY_LABELS[query.modifier] || 'Humanitix';
  if (query.category) return HUMANITIX_CATEGORY_LABELS[query.category] || 'Humanitix';
  if (query.timeFrame) return HUMANITIX_CATEGORY_LABELS[query.timeFrame] || 'Humanitix';
  return 'Humanitix';
}

function humanitixSuburb(components) {
  const suburb = (components || []).find((c) =>
    (c.types || []).includes('sublocality') || (c.types || []).includes('sublocality_level_1')
  );
  return suburb?.long_name || null;
}

function humanitixImageUrl(handle) {
  if (!handle) return null;
  return `${HUMANITIX_IMAGES}/${handle}/seo-800.jpg`;
}

function humanitixEventUrl(raw) {
  const host = (raw.hostname || 'https://events.humanitix.com/').replace(/\/$/, '');
  const slug = (raw.slug || '').replace(/^\//, '');
  return slug ? `${host}/${slug}` : HUMANITIX_AUCKLAND;
}

function parseHumanitixDate(str) {
  if (!str) return null;
  try {
    const d = new Date(str);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  } catch {
    return null;
  }
}

function humanitixPriceLabel(pricing) {
  if (!pricing) return null;
  const min = pricing.minimumPrice;
  const max = pricing.maximumPrice;
  if (min === 0 && max === 0) return 'Free';
  if (min != null && max != null && min === max) return `$${min}`;
  if (min != null && max != null) return `$${min}-$${max}`;
  return null;
}

function normalizeHumanitixEvent(raw, queryLabel) {
  if (!raw?._id || !raw.name) return null;

  const loc = raw.eventLocation || {};
  if (loc.type === 'online') return null;

  const start = parseHumanitixDate(raw.date?.startDate);
  const end = parseHumanitixDate(raw.date?.endDate) || start;
  const today = new Date().toISOString().slice(0, 10);
  const startDate = start ? start.toISOString().slice(0, 10) : null;
  const endDate = end ? end.toISOString().slice(0, 10) : startDate;
  if (endDate && endDate < today) return null;

  const suburb = humanitixSuburb(loc.addressComponents);
  const categoryName = queryLabel || 'Humanitix';
  const categoryAlias = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const price = humanitixPriceLabel(raw.pricing);
  const isFree =
    price === 'Free' ||
    (raw.pricing?.minimumPrice === 0 && raw.pricing?.maximumPrice === 0);
  const description = [
    loc.venueName,
    raw.organiser?.name,
    raw.occurrenceLabel,
    raw.isRecurring ? 'Recurring' : null,
  ]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 280);

  const event = {
    id: `humanitix-${raw._id}`,
    title: raw.name,
    description,
    url: humanitixEventUrl(raw),
    image: humanitixImageUrl(raw.bannerImage?.handle),
    dateLabel:
      (start ? formatAucklandLiveDate(start.toISOString(), end && endDate !== startDate ? end.toISOString() : null) : null) ||
      raw.displayDate ||
      'Dates TBC',
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: categoryAlias,
    },
    subcategories: raw.occurrenceLabel ? [raw.occurrenceLabel] : [],
    region: suburb || 'Auckland',
    regionAlias: null,
    venueName: loc.venueName || null,
    venueAddress: loc.address || null,
    groupName: raw.organiser?.name || null,
    attendees: null,
    rating: null,
    price,
    isFree,
    source: 'humanitix',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchHumanitixCarousels(geocode, stateKey) {
  const bodyBase = {
    geocode: {
      name: geocode.name,
      latLng: geocode.latLng,
      slug: geocode.slug,
      northeast: geocode.northeast,
      southwest: geocode.southwest,
    },
    stateKey,
  };

  const batches = await Promise.all(
    HUMANITIX_CAROUSEL_QUERIES.map(async (parsedCategories) => {
      try {
        const res = await fetch(HUMANITIX_CAROUSELS_API, {
          method: 'POST',
          headers: {
            'User-Agent': HUMANITIX_UA,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ ...bodyBase, parsedCategories }),
        });
        if (!res.ok) return { parsedCategories, events: [] };
        const events = await res.json();
        return { parsedCategories, events: Array.isArray(events) ? events : [] };
      } catch {
        return { parsedCategories, events: [] };
      }
    })
  );

  return batches;
}

function parseCheekyAucklandTypes(html) {
  const parts = html.split(/(?=<div data-elementor-type="loop-item" data-elementor-id="727")/);
  const items = [];

  for (const part of parts) {
    if (!part.includes('e-loop-item-') || part.includes('eventbrite_events')) continue;

    const id = part.match(/e-loop-item-(\d+)/)?.[1];
    const meta = CHEEKY_EVENT_TYPE_META[id];
    if (!meta) continue;

    const title =
      decodeHtmlEntities(
        part
          .match(
            /card-event-type-content-front[\s\S]*?elementor-heading-title[^>]*>([^<]+)/
          )?.[1]
          ?.trim()
      ) || meta.label;
    const tagline = decodeHtmlEntities(
      stripHtml(
        part.match(
          /card-event-type-content-front[\s\S]*?elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">\s*([\s\S]*?)\s*<\/div>/
        )?.[1] || ''
      )
    );
    const description = decodeHtmlEntities(
      stripHtml(
        part.match(
          /event-description[\s\S]*?elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">\s*([\s\S]*?)\s*<\/div>/
        )?.[1] || ''
      )
    ).slice(0, 400);

    items.push({ id, title, tagline, description, slug: meta.slug });
  }

  return items;
}

function parseCheekyCalendarBlocks(html) {
  const parts = html.split(/(?=e-loop-item e-loop-item-\d+)/);
  const events = [];

  for (const part of parts) {
    if (!part.includes('eventbrite_events')) continue;
    if (!part.includes('location-auckland')) continue;

    const postId = part.match(/e-loop-item-(\d+)/)?.[1];
    const eventType = part.match(/event-type-([a-z-]+)/)?.[1] || 'speeddating';
    const url = part.match(/href="(https:\/\/www\.eventbrite[^"]+)"/)?.[1];
    const title = decodeHtmlEntities(
      part
        .match(/event-description[\s\S]*?elementor-heading-title[^>]*>([^<]+)/)?.[1]
        ?.trim()
    );
    const dateText = decodeHtmlEntities(
      part
        .match(
          /event-content[\s\S]*?elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">\s*([^<]+)/
        )?.[1]
        ?.trim()
    );
    const timeText = decodeHtmlEntities(
      part
        .match(
          /event-content[\s\S]*?elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">[\s\S]*?<\/div>[\s\S]*?elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">\s*([^<]+)/
        )?.[1]
        ?.trim()
        ?.replace(/&#8211;/g, '–')
    );
    const image = part.match(/<img[^>]+src="([^"]+)"/)?.[1] || null;

    if (!postId || !url || !title) continue;
    events.push({ postId, title, url, dateText, timeText, image, eventType });
  }

  return events;
}

function parseCheekyDateLabel(dateText, timeText) {
  if (!dateText) {
    return { startDate: null, dateLabel: 'Check Cheeky calendar for dates' };
  }

  const dateLabel = [dateText, timeText].filter(Boolean).join(' · ');
  try {
    const d = new Date(dateText);
    if (Number.isNaN(d.getTime())) return { startDate: null, dateLabel };
    return { startDate: d.toISOString().slice(0, 10), dateLabel };
  } catch {
    return { startDate: null, dateLabel };
  }
}

function normalizeCheekyEventType(raw) {
  const categoryName = raw.title || 'Cheeky Events';
  const description = [raw.tagline, raw.description].filter(Boolean).join(' — ').slice(0, 320);

  const event = {
    id: `cheeky-type-${raw.id}`,
    title: `Cheeky Events Auckland — ${raw.title}`,
    description,
    url: `${CHEEKY_BASE}/event-type/${raw.slug}/`,
    image: null,
    dateLabel: 'Check Cheeky calendar for upcoming dates',
    startDate: null,
    endDate: null,
    category: {
      name: categoryName,
      alias: raw.slug,
    },
    subcategories: ['Auckland event type'],
    region: 'Auckland',
    regionAlias: null,
    venueName: 'Cheeky Events Auckland',
    venueAddress: null,
    groupName: 'Cheeky Events',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'cheeky',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function normalizeCheekyCalendarEvent(raw) {
  const { startDate, dateLabel } = parseCheekyDateLabel(raw.dateText, raw.timeText);
  const today = new Date().toISOString().slice(0, 10);
  if (startDate && startDate < today) return null;

  const typeLabel = CHEEKY_TYPE_LABELS[raw.eventType] || 'Social Events';
  const description = [typeLabel, raw.timeText].filter(Boolean).join(' · ').slice(0, 280);

  const event = {
    id: `cheeky-${raw.postId}`,
    title: raw.title,
    description,
    url: raw.url,
    image: raw.image,
    dateLabel,
    startDate,
    endDate: startDate,
    category: {
      name: typeLabel,
      alias: raw.eventType,
    },
    subcategories: ['Ticketed via Eventbrite'],
    region: 'Auckland',
    regionAlias: null,
    venueName: null,
    venueAddress: null,
    groupName: 'Cheeky Events',
    attendees: null,
    rating: null,
    price: null,
    isFree: /\bfree\b/i.test(`${raw.title} ${description}`),
    source: 'cheeky',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function afkNzTodayParts() {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type)?.value);
  return { day: get('day'), month: get('month'), year: get('year') };
}

function afkFlattenShortcode(sc, prefix = 'shortcode') {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sc)) {
    params.append(`${prefix}[${k}]`, String(v));
  }
  return params;
}

function parseAfkIsoDate(str) {
  if (!str) return null;
  const m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;
  return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
}

function normalizeAfkIso(str) {
  if (!str) return null;
  const m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{2})(.*)$/);
  if (!m) return str;
  return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}T${String(m[4]).padStart(2, '0')}:${m[5]}${m[6]}`;
}

function inferAfkCategory(title, description, types) {
  if (types.length) {
    const primary = types[0];
    return { alias: primary, name: AFK_TYPE_LABELS[primary] || 'Family Events' };
  }
  const text = `${title} ${description}`.toLowerCase();
  if (/market|fair/.test(text)) return { alias: 'markets', name: 'Markets & Fairs' };
  if (/festival|matariki/.test(text)) return { alias: 'festival', name: 'Festival' };
  if (/museum|gallery|exhibition/.test(text)) return { alias: 'museums-and-galleries', name: 'Museums and Galleries' };
  if (/school holiday|holiday/.test(text)) return { alias: 'school-holidays', name: 'School Holidays' };
  if (/music|concert|orchestra/.test(text)) return { alias: 'music', name: 'Music' };
  if (/sport|rugby|swim|hockey|football/.test(text)) return { alias: 'sports', name: 'Sports' };
  if (/theatre|show|performance/.test(text)) return { alias: 'theatre', name: 'Theatre' };
  if (/\bfree\b/.test(text)) return { alias: 'free', name: 'Free' };
  return { alias: 'family', name: 'Family Events' };
}

function afkRegionFromAddress(address, regions) {
  if (regions.length && AFK_REGION_LABELS[regions[0]]) return AFK_REGION_LABELS[regions[0]];
  if (!address) return 'Auckland';
  const lower = address.toLowerCase();
  if (/north shore|devonport|takapuna|albany|northcote|birkenhead/.test(lower)) return 'North Auckland';
  if (/manukau|papakura|otahuhu|botany|pakuranga|howick|papatoetoe|mangere/.test(lower)) return 'South Auckland';
  if (/henderson|new lynn|titirangi|glen eden|te atatu|waitakere/.test(lower)) return 'West Auckland';
  if (/waiheke|great barrier|gulf/.test(lower)) return 'Gulf Islands';
  if (/cbd|city centre|central|ponsonby|parnell|newmarket|freemans bay|grey lynn/.test(lower)) {
    return 'Central Auckland';
  }
  const suburb = address.split(',')[1]?.trim();
  return suburb || 'Auckland';
}

function parseAfkEventBlocks(html) {
  if (!html || html.includes('no_events')) return [];

  const blocks = html.split(/(?=eventon_list_event)/).slice(1);
  const events = [];

  for (const block of blocks) {
    if (block.includes('no_events')) continue;

    const ldMatch = block.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ldMatch) continue;

    let ld;
    try {
      ld = JSON.parse(ldMatch[1]);
    } catch {
      continue;
    }

    const eventId = block.match(/data-event_id="(\d+)"/)?.[1];
    if (!eventId || !ld.name) continue;

    const types = [
      ...new Set(
        [...block.matchAll(/\bevent_type-([a-z0-9-]+)/g)]
          .map((m) => m[1])
          .filter((t) => t !== 'all')
      ),
    ];
    const regions = [...new Set([...block.matchAll(/\bevent_type_2-([a-z0-9-]+)/g)].map((m) => m[1]))];
    const displayDate = block.match(/class="start"[^>]*>([^<]+)/)?.[1]?.trim() || null;
    const startTime = block.match(/class="stime"[^>]*>([^<]+)/)?.[1]?.trim() || null;
    const endTime = block.match(/class="etime"[^>]*>([^<]+)/)?.[1]?.trim() || null;

    const location = Array.isArray(ld.location) ? ld.location[0] : ld.location;
    const offers = ld.offers || null;
    const price = offers?.price != null ? Number(offers.price) : null;

    events.push({
      eventId,
      title: decodeHtmlEntities(ld.name),
      url: ld.url,
      image: ld.image || null,
      description: stripHtml(ld.description || '').slice(0, 320),
      startIso: ld.startDate,
      endIso: ld.endDate,
      displayDate,
      displayTime: [startTime, endTime].filter(Boolean).join(' – '),
      venueName: location?.name || null,
      venueAddress: location?.address?.streetAddress || null,
      organizer: ld.organizer?.[0]?.name || ld.organizer?.name || null,
      types,
      regions,
      price,
      isFree: price === 0 || /\bfree\b/i.test(`${ld.name} ${ld.description || ''}`),
    });
  }

  return events;
}

function normalizeAfkEvent(raw, windowLabel) {
  const startDate = parseAfkIsoDate(raw.startIso);
  const endDate = parseAfkIsoDate(raw.endIso) || startDate;
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
  if (startDate && startDate < today) return null;

  const category = inferAfkCategory(raw.title, raw.description, raw.types);
  const region = afkRegionFromAddress(raw.venueAddress, raw.regions);
  const typeLabels = raw.types.map((t) => AFK_TYPE_LABELS[t] || t).filter(Boolean);
  const startIso = normalizeAfkIso(raw.startIso);
  const endIso = normalizeAfkIso(raw.endIso);

  const dateLabel =
    formatAucklandLiveDate(startIso, endIso) ||
    [raw.displayDate, raw.displayTime].filter(Boolean).join(' · ') ||
    windowLabel;

  const priceLabel =
    raw.isFree || raw.price === 0
      ? 'Free'
      : raw.price != null && !Number.isNaN(raw.price)
        ? `$${raw.price}`
        : null;

  const event = {
    id: `afk-${raw.eventId}-${startDate || windowLabel}`,
    title: raw.title,
    description: raw.description || [raw.venueName, ...typeLabels].filter(Boolean).join(' · '),
    url: raw.url,
    image: raw.image,
    dateLabel,
    startDate,
    endDate,
    category: {
      name: category.name,
      alias: category.alias,
    },
    subcategories: [windowLabel, ...typeLabels].filter(Boolean),
    region,
    regionAlias: raw.regions[0] || null,
    venueName: raw.venueName,
    venueAddress: raw.venueAddress,
    groupName: raw.organizer || 'Auckland for Kids',
    attendees: null,
    rating: null,
    price: priceLabel,
    isFree: raw.isFree,
    source: 'aucklandforkids',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchAfkCalendarEvents(pageUrl, { patchToday = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const pageRes = await fetch(pageUrl, {
      headers: { 'User-Agent': AFK_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    if (!pageRes.ok) return [];

    const page = await pageRes.text();
    const nonce = page.match(/"n":"([^"]+)"/)?.[1];
    const nonceX = page.match(/"nonce":"([^"]+)"/)?.[1];
    const scRaw = page.match(/data-sc="([^"]+)"/)?.[1];
    if (!nonce || !nonceX || !scRaw) return [];

    const sc = JSON.parse(scRaw.replace(/&quot;/g, '"'));
    if (patchToday) {
      const { day, month, year } = afkNzTodayParts();
      sc.fixed_day = String(day);
      sc.fixed_month = String(month);
      sc.fixed_year = String(year);
      sc.day_incre = 0;
    }

    const body = new URLSearchParams({
      direction: 'none',
      ajaxtype: 'init',
      nonce,
      nonceX,
    });
    for (const [k, v] of afkFlattenShortcode(sc).entries()) body.append(k, v);

    const ajaxRes = await fetch(AFK_AJAX, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': AFK_UA,
        'X-WP-Nonce': nonceX,
      },
      body: body.toString(),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!ajaxRes.ok) return [];

    const payload = await ajaxRes.json();
    if (payload.status !== 'GOOD' || !payload.html) return [];
    return parseAfkEventBlocks(payload.html);
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function feverSectionCategory(section, title) {
  const text = `${section} ${title}`.toLowerCase();
  if (/candlelight|music event|concert|jazz/.test(text)) {
    return { alias: 'music', name: 'Music & Concerts' };
  }
  if (/live show|theatre|ballet|performance/.test(text)) {
    return { alias: 'live-shows', name: 'Live Shows' };
  }
  if (/immersive|exhibition|culture|banksy|museum|art of/.test(text)) {
    return { alias: 'culture', name: 'Culture & Exhibits' };
  }
  if (/food|restaurant|dining|brunch|cocktail/.test(text)) {
    return { alias: 'food-drink', name: 'Food & Drink' };
  }
  if (/beauty|wellness/.test(text)) {
    return { alias: 'wellness', name: 'Beauty & Wellness' };
  }
  if (/activit|tourism|experience|jury/.test(text)) {
    return { alias: 'activities', name: 'Activities & Experiences' };
  }
  if (/top|popular/.test(text)) {
    return { alias: 'popular', name: 'Popular in Auckland' };
  }
  return { alias: 'experiences', name: section || 'Experiences' };
}

function parseFeverIsoDate(str) {
  if (!str) return null;
  const m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;
  return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
}

function normalizeFeverIso(str) {
  if (!str) return null;
  const m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{2})(.*)$/);
  if (!m) return str;
  return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}T${String(m[4]).padStart(2, '0')}:${m[5]}${m[6]}`;
}

function parseFeverCityHtml(html) {
  const sections = html.split(/<section class="fv-plan-carousel/);
  const byId = new Map();

  for (const section of sections.slice(1)) {
    const sectionTitle = decodeHtmlEntities(
      section.match(/fv-plan-carousel__title[^>]*>([^<]+)</)?.[1]?.trim() || 'Fever Auckland'
    );
    const cards = [
      ...section.matchAll(
        /<a[^>]*class="[^"]*fv-plan-preview-card[^"]*"[^>]*href="([^"]+)"[\s\S]*?plan-preview-card-name[^>]*>([^<]+)<\/h3>([\s\S]*?)<\/a>/g
      ),
    ];

    for (const match of cards) {
      const href = match[1];
      const planId = href.match(/\/m\/(\d+)/)?.[1];
      if (!planId) continue;

      const title = decodeHtmlEntities(match[2].trim());
      if (/gift card/i.test(title)) continue;

      const tail = match[3] || '';
      const venue = decodeHtmlEntities(
        tail.match(/fv-location__name[^>]*>([^<]+)</)?.[1]?.trim() || ''
      );
      const price = tail.match(/plan-price__amount--bold[^>]*>([^<]+)</)?.[1]?.trim() || null;
      const image = match[0].match(/src="([^"]+plan\/photo[^"]+)"/)?.[1] || null;
      const url = href.startsWith('http') ? href : `${FEVER_BASE}${href}`;

      const existing = byId.get(planId);
      const sectionsList = existing ? [...existing.sections] : [];
      if (!sectionsList.includes(sectionTitle)) sectionsList.push(sectionTitle);

      byId.set(planId, {
        planId,
        title,
        url,
        image: image || existing?.image || null,
        venue: venue || existing?.venue || null,
        price: price || existing?.price || null,
        sections: sectionsList,
        section: sectionTitle,
      });
    }
  }

  return [...byId.values()];
}

function parseFeverPlanDetail(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const match of blocks) {
    try {
      const json = JSON.parse(match[1]);
      if (!json.startDate && json['@type'] !== 'Event') continue;
      const location = Array.isArray(json.location) ? json.location[0] : json.location;
      return {
        startIso: json.startDate || null,
        endIso: json.endDate || null,
        description: stripHtml(decodeHtmlEntities(json.description || '')).slice(0, 320),
        venueName: location?.name || null,
        venueAddress: location?.address?.streetAddress || null,
        image: json.image || null,
        price: json.offers?.price != null ? Number(json.offers.price) : null,
        url: json.url || null,
      };
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchFeverPlanDetail(planId) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${FEVER_BASE}/m/${planId}`, {
      headers: { 'User-Agent': FEVER_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return parseFeverPlanDetail(await res.text());
  } catch {
    clearTimeout(timer);
    return null;
  }
}

function normalizeFeverEvent(raw, detail) {
  const startIso = normalizeFeverIso(detail?.startIso);
  const endIso = normalizeFeverIso(detail?.endIso);
  const startDate = parseFeverIsoDate(detail?.startIso);
  const endDate = parseFeverIsoDate(detail?.endIso) || startDate;
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
  if (startDate && startDate < today) return null;

  const category = feverSectionCategory(raw.section, raw.title);
  const venueName = detail?.venueName || raw.venue || null;
  const priceValue = detail?.price ?? (raw.price ? Number(raw.price.replace(/[^0-9.]/g, '')) : null);
  const priceLabel =
    priceValue === 0
      ? 'Free'
      : raw.price || (priceValue != null && !Number.isNaN(priceValue) ? `From $${priceValue}` : null);

  const dateLabel =
    (startIso ? formatAucklandLiveDate(startIso, endIso) : null) ||
    (startDate ? 'Check Fever for session times' : 'Check Fever for dates');

  const event = {
    id: `fever-${raw.planId}`,
    title: raw.title,
    description:
      detail?.description ||
      [venueName, raw.sections[0], priceLabel].filter(Boolean).join(' · ').slice(0, 320),
    url: detail?.url || raw.url,
    image: detail?.image || raw.image,
    dateLabel,
    startDate,
    endDate,
    category,
    subcategories: raw.sections.slice(0, 3),
    region: venueName || 'Auckland',
    regionAlias: null,
    venueName,
    venueAddress: detail?.venueAddress || null,
    groupName: 'Fever',
    attendees: null,
    rating: null,
    price: priceLabel,
    isFree: priceValue === 0,
    source: 'fever',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchFeverEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90000);

  try {
    const res = await fetch(FEVER_AUCKLAND, {
      headers: { 'User-Agent': FEVER_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const cards = parseFeverCityHtml(await res.text());
    const events = [];

    for (let i = 0; i < cards.length; i += FEVER_PLAN_BATCH) {
      const batch = cards.slice(i, i + FEVER_PLAN_BATCH);
      const details = await Promise.all(batch.map((card) => fetchFeverPlanDetail(card.planId)));
      for (let j = 0; j < batch.length; j += 1) {
        const event = normalizeFeverEvent(batch[j], details[j]);
        if (event) events.push(event);
      }
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function tripAdvisorSlugToTitle(slug) {
  return (slug || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseTripAdvisorSlug(slug) {
  const dash = slug.indexOf('-');
  if (dash === -1) return { title: tripAdvisorSlugToTitle(slug), region: 'Auckland' };
  const titleSlug = slug.slice(0, dash);
  const regionSlug = slug.slice(dash + 1).replace(/_North_Island$/i, '');
  return {
    title: tripAdvisorSlugToTitle(titleSlug),
    region: tripAdvisorSlugToTitle(regionSlug),
  };
}

function tripAdvisorCategoryLabel(raw) {
  const text = (raw || '').toLowerCase();
  if (/food|drink|festival/.test(text)) return { alias: 'food-drink', name: 'Food & Drink' };
  if (/cultural/.test(text)) return { alias: 'cultural', name: 'Cultural Events' };
  if (/music/.test(text)) return { alias: 'music', name: 'Music Festivals' };
  if (/sport/.test(text)) return { alias: 'sports', name: 'Sporting Events' };
  if (/exhibition|gallery|museum/.test(text)) return { alias: 'exhibitions', name: 'Exhibitions' };
  if (/bar|club|night/.test(text)) return { alias: 'nightlife', name: 'Bars & Nightlife' };
  return { alias: 'events', name: raw || 'Events & Experiences' };
}

function stripWaybackPrefixes(html) {
  return (html || '').replace(/\/web\/\d+(?:im_)?\//g, '/');
}

function parseTripAdvisorHtml(rawHtml) {
  const html = stripWaybackPrefixes(rawHtml);
  const cards = html.split(/data-automation="cardWrapper"/).slice(1);
  const byId = new Map();

  for (const card of cards) {
    const linkMatch = card.match(/Attraction_Review-(g\d+)-d(\d+)-Reviews-([^"]+)\.html/);
    if (!linkMatch) continue;

    const geoId = linkMatch[1];
    const locationId = linkMatch[2];
    const slug = linkMatch[3];
    const parsedSlug = parseTripAdvisorSlug(slug);
    const title =
      decodeHtmlEntities(
        card.match(/<div[^>]*data-automation="cardTitle"[^>]*>[\s\S]*?<span[^>]*>([^<]+)</)?.[1] || ''
      ) ||
      decodeHtmlEntities(card.match(/<h3[^>]*>([^<]+)</)?.[1] || '') ||
      parsedSlug.title;
    const region = parsedSlug.region;

    const imagePath = card.match(/dynamic-media-cdn\.tripadvisor\.com\/media\/photo[^"?\s&]+/)?.[0] || null;
    const category =
      decodeHtmlEntities(
        card.match(/class="[^"]*biGQs[^"]*"[^>]*>([^<]+(?:\s*•\s*[^<]+)?)</)?.[1] || ''
      ) ||
      decodeHtmlEntities(card.match(/data-automation="categoryLabel"[^>]*>([^<]+)</)?.[1] || '') ||
      null;
    const bubble = card.match(/bubble_(\d{2})/)?.[1];
    const rating = bubble ? Number(bubble) / 10 : null;
    const reviewCount = Number(card.match(/([\d,]+)\s*reviews/i)?.[1]?.replace(/,/g, '') || 0) || null;
    const snippet = decodeHtmlEntities(
      card.match(/class="JguWG"[^>]*><span[^>]*>([^<]+)</)?.[1] ||
        card.match(/data-automation="reviewSnippet"[^>]*>([^<]+)</)?.[1] ||
        ''
    ).slice(0, 280);

    byId.set(locationId, {
      locationId,
      title,
      region,
      image: imagePath ? `https://${imagePath}` : null,
      category,
      rating,
      reviewCount,
      snippet,
      url: `${TRIPADVISOR_BASE}/Attraction_Review-${geoId}-d${locationId}-Reviews-${slug}.html`,
    });
  }

  return [...byId.values()];
}

function tripAdvisorCdxPath(pageUrl) {
  const u = new URL(pageUrl);
  return `${u.host}${u.pathname}`.toLowerCase();
}

async function fetchTripAdvisorWaybackHtml(pageUrl) {
  const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(
    tripAdvisorCdxPath(pageUrl)
  )}&output=json&limit=1&filter=statuscode:200&sort=reverse`;
  const cdxController = new AbortController();
  const cdxTimer = setTimeout(() => cdxController.abort(), 30000);

  try {
    const cdxRes = await fetch(cdxUrl, { signal: cdxController.signal });
    clearTimeout(cdxTimer);
    if (!cdxRes.ok) return null;

    const rows = await cdxRes.json();
    if (!Array.isArray(rows) || rows.length < 2) return null;

    const timestamp = rows[1][1];
    const archiveUrl = `https://web.archive.org/web/${timestamp}/${pageUrl}`;
    const archiveController = new AbortController();
    const archiveTimer = setTimeout(() => archiveController.abort(), 90000);

    try {
      const archiveRes = await fetch(archiveUrl, {
        headers: { 'User-Agent': TRIPADVISOR_UA, Accept: 'text/html' },
        signal: archiveController.signal,
      });
      clearTimeout(archiveTimer);
      if (!archiveRes.ok) return null;
      const html = await archiveRes.text();
      if (!html.includes('Attraction_Review')) return null;
      return html;
    } catch {
      clearTimeout(archiveTimer);
      return null;
    }
  } catch {
    clearTimeout(cdxTimer);
    return null;
  }
}

async function fetchTripAdvisorPageHtml(pageUrl) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': TRIPADVISOR_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const html = await res.text();
      if (html.includes('Attraction_Review') && !/captcha-delivery|Please enable JS/i.test(html)) {
        return html;
      }
    }
  } catch {
    clearTimeout(timer);
  }

  return fetchTripAdvisorWaybackHtml(pageUrl);
}

function normalizeTripAdvisorEvent(raw) {
  const category = tripAdvisorCategoryLabel(raw.category);
  const description = [
    raw.category,
    raw.snippet,
    raw.reviewCount ? `${raw.reviewCount} TripAdvisor reviews` : null,
  ]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const event = {
    id: `tripadvisor-${raw.locationId}`,
    title: raw.title,
    description,
    url: raw.url,
    image: raw.image,
    dateLabel: 'Check TripAdvisor for dates',
    startDate: null,
    endDate: null,
    category,
    subcategories: raw.category ? raw.category.split('•').map((s) => s.trim()) : [],
    region: raw.region || 'Auckland',
    regionAlias: null,
    venueName: raw.title,
    venueAddress: null,
    groupName: 'TripAdvisor',
    attendees: null,
    rating: raw.rating,
    price: null,
    isFree: false,
    source: 'tripadvisor',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchTripAdvisorEvents() {
  try {
    const html = await fetchTripAdvisorPageHtml(TRIPADVISOR_EVENTS);
    if (!html) return [];

    const seen = new Set();
    const events = [];
    for (const raw of parseTripAdvisorHtml(html)) {
      if (seen.has(raw.locationId)) continue;
      seen.add(raw.locationId);
      events.push(normalizeTripAdvisorEvent(raw));
    }

    return events;
  } catch {
    return [];
  }
}

function eventCinemasMovieCinemaIds(movie) {
  if (Array.isArray(movie.CinemaIds) && movie.CinemaIds.length) return movie.CinemaIds;
  return (movie.Cinemas || '')
    .split(',')
    .map((id) => Number(id.trim()))
    .filter(Boolean);
}

function eventCinemasAucklandCinemaNames(movie) {
  return eventCinemasMovieCinemaIds(movie)
    .filter((id) => EVENTCINEMAS_AUCKLAND_CINEMA_IDS.has(id))
    .map((id) => EVENTCINEMAS_AUCKLAND_CINEMA_NAMES[id] || `Cinema ${id}`);
}

function eventCinemasHasAucklandCinema(movie) {
  return eventCinemasMovieCinemaIds(movie).some((id) => EVENTCINEMAS_AUCKLAND_CINEMA_IDS.has(id));
}

function parseEventCinemasIsoDate(str) {
  if (!str) return null;
  const m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;
  return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
}

function parseEventCinemasFestivalDateLabel(dateRaw, timeRaw) {
  const parts = [dateRaw, timeRaw].filter(Boolean);
  return parts.join(' · ') || 'Check Event Cinemas for dates';
}

function parseEventCinemasFestivalStartDate(dateRaw) {
  if (!dateRaw) return null;
  const year = new Date().getFullYear();
  const monthMap = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  const cleaned = dateRaw.replace(/in cinemas\s*/i, '').trim();
  const range = cleaned.match(/(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-z]+)/);
  if (range) {
    const month = monthMap[range[3].toLowerCase()];
    if (month) return `${year}-${String(month).padStart(2, '0')}-${String(range[1]).padStart(2, '0')}`;
  }
  const single = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)/);
  if (single) {
    const month = monthMap[single[2].toLowerCase()];
    if (month) return `${year}-${String(month).padStart(2, '0')}-${String(single[1]).padStart(2, '0')}`;
  }
  return null;
}

function eventCinemasMovieCategory(movie, kind) {
  const genres = `${movie.Genres || ''} ${(movie.MovieGenres || []).map((g) => g.Name).join(' ')}`.toLowerCase();
  if (kind === 'coming-soon') return { alias: 'coming-soon', name: 'Coming Soon' };
  if (/animated|family/.test(genres)) return { alias: 'family', name: 'Family & Kids' };
  if (/horror|thriller/.test(genres)) return { alias: 'special-events', name: 'Special Events' };
  return { alias: 'now-showing', name: 'Now Showing' };
}

function eventCinemasFestivalCategory(title, subtitle) {
  const text = `${title} ${subtitle}`.toLowerCase();
  if (/festival/.test(text)) return { alias: 'film-festival', name: 'Film Festival' };
  if (/opera|concert|sia|andr[eé] rieu|music/.test(text)) return { alias: 'music', name: 'Music & Concerts' };
  if (/fright night|halloween/.test(text)) return { alias: 'special-events', name: 'Special Events' };
  if (/bollywood|cinema india|cinema asia/.test(text)) return { alias: 'cultural', name: 'Cultural Events' };
  return { alias: 'events', name: 'Events & Festivals' };
}

function normalizeEventCinemasMovie(movie, kind) {
  const cinemas = eventCinemasAucklandCinemaNames(movie);
  if (!cinemas.length) return null;

  const startDate = parseEventCinemasIsoDate(movie.FirstSession || movie.ReleasedAt);
  const endDate = parseEventCinemasIsoDate(movie.LastSession || movie.ReleasedAt) || startDate;
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });

  if (kind === 'coming-soon') {
    if (!startDate || startDate < today) return null;
    const horizon = new Date();
    horizon.setDate(horizon.getDate() + EVENTCINEMAS_COMING_SOON_DAYS);
    const horizonStr = horizon.toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
    if (startDate > horizonStr) return null;
  }

  const category = eventCinemasMovieCategory(movie, kind);
  const experiences = (movie.Experiences || []).map((e) => e.name).filter(Boolean).slice(0, 4);
  const genres = (movie.MovieGenres || []).map((g) => g.Name).filter(Boolean);
  const runtime = movie.RunningTime ? `${movie.RunningTime} min` : null;
  const rating = movie.Rating ? `${movie.Rating} rating` : null;

  const description = [
    movie.Synopsis,
    [rating, runtime].filter(Boolean).join(' · '),
    cinemas.length ? `Auckland: ${cinemas.join(', ')}` : null,
    experiences.length ? experiences.join(', ') : null,
  ]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const dateLabel =
    (movie.FirstSession ? formatAucklandLiveDate(movie.FirstSession, movie.LastSession) : null) ||
    (startDate ? `Opens ${startDate}` : kind === 'coming-soon' ? 'Coming soon' : 'Now showing');

  const event = {
    id: `eventcinemas-movie-${movie.Id}`,
    title: movie.Name,
    description,
    url: `${EVENTCINEMAS_BASE}${movie.MovieUrl || `/movie/${movie.Id}`}`,
    image: movie.LargePosterUrl || movie.PosterUrl || null,
    dateLabel,
    startDate,
    endDate,
    category,
    subcategories: [...genres, ...experiences].slice(0, 4),
    region: 'Auckland',
    regionAlias: null,
    venueName: `Event Cinemas (${cinemas[0]})`,
    venueAddress: null,
    groupName: 'Event Cinemas',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'eventcinemas',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function parseEventCinemasFestivalsHtml(html) {
  const cards = html.split(/<a href="\/eventsfestivals\//).slice(1);
  const bySlug = new Map();

  for (const card of cards) {
    const linkMatch = card.match(/^([^"]+)" class="ep-item"/);
    if (!linkMatch) continue;

    const slug = linkMatch[1];
    const title = decodeHtmlEntities(card.match(/<span class="name">([^<]+)</)?.[1] || '').trim();
    if (!title) continue;

    const subtitle = decodeHtmlEntities(card.match(/<span class="subtitle">([^<]+)</)?.[1] || '').trim();
    const dateRaw = decodeHtmlEntities(card.match(/<b>DATE:&nbsp;<\/b>([^<]+)</)?.[1] || '').trim();
    const timeRaw = decodeHtmlEntities(card.match(/<b>TIME:&nbsp;<\/b>([^<]+)</)?.[1] || '').trim();
    const image =
      card.match(/data-src="(https:\/\/cdn\.eventcinemas[^"]+)"/)?.[1] ||
      `https://cdn.eventcinemas.co.nz/cdn/resources/eventspromtions_v42/${slug}/banner.jpg`;

    bySlug.set(slug, {
      slug,
      title,
      subtitle,
      dateRaw,
      timeRaw,
      image,
      url: `${EVENTCINEMAS_BASE}/eventsfestivals/${slug}`,
    });
  }

  return [...bySlug.values()];
}

function normalizeEventCinemasFestival(raw) {
  const category = eventCinemasFestivalCategory(raw.title, raw.subtitle);
  const startDate = parseEventCinemasFestivalStartDate(raw.dateRaw);
  const dateLabel = parseEventCinemasFestivalDateLabel(raw.dateRaw, raw.timeRaw);
  const description = [raw.subtitle, raw.dateRaw, raw.timeRaw, 'Auckland Event Cinemas'].filter(Boolean).join(' · ').slice(0, 320);

  const event = {
    id: `eventcinemas-festival-${raw.slug}`,
    title: raw.title,
    description,
    url: raw.url,
    image: raw.image,
    dateLabel,
    startDate,
    endDate: startDate,
    category,
    subcategories: [raw.subtitle].filter(Boolean),
    region: 'Auckland',
    regionAlias: null,
    venueName: 'Event Cinemas Auckland',
    venueAddress: null,
    groupName: 'Event Cinemas',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'eventcinemas',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchEventCinemasJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': EVENTCINEMAS_UA,
        Accept: 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const payload = await res.json();
    if (!payload?.Success || !payload?.Data?.Movies) return null;
    return payload.Data.Movies;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchEventCinemasFestivalsHtml() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(EVENTCINEMAS_FESTIVALS, {
      headers: { 'User-Agent': EVENTCINEMAS_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchEventCinemasEvents() {
  try {
    const [nowMovies, soonMovies, festivalsHtml] = await Promise.all([
      fetchEventCinemasJson(EVENTCINEMAS_NOW_SHOWING),
      fetchEventCinemasJson(EVENTCINEMAS_COMING_SOON),
      fetchEventCinemasFestivalsHtml(),
    ]);

    const byId = new Map();
    const events = [];

    if (nowMovies) {
      for (const movie of nowMovies) {
        if (!eventCinemasHasAucklandCinema(movie)) continue;
        const event = normalizeEventCinemasMovie(movie, 'now-showing');
        if (!event) continue;
        byId.set(movie.Id, event);
        events.push(event);
      }
    }

    if (soonMovies) {
      for (const movie of soonMovies) {
        if (!eventCinemasHasAucklandCinema(movie)) continue;
        if (byId.has(movie.Id)) continue;
        const event = normalizeEventCinemasMovie(movie, 'coming-soon');
        if (!event) continue;
        byId.set(movie.Id, event);
        events.push(event);
      }
    }

    if (festivalsHtml) {
      for (const raw of parseEventCinemasFestivalsHtml(festivalsHtml)) {
        events.push(normalizeEventCinemasFestival(raw));
      }
    }

    return events;
  } catch {
    return [];
  }
}

function hoytsImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${HOYTS_IMG}${path.replace(/^\//, '')}`;
}

function hoytsMovieCategory(movie, kind) {
  const genres = (movie.genres || []).join(' ').toLowerCase();
  if (kind === 'coming-soon') return { alias: 'coming-soon', name: 'Coming Soon' };
  if (/animation|family/.test(genres)) return { alias: 'family', name: 'Family & Kids' };
  if (/horror|thriller/.test(genres)) return { alias: 'special-events', name: 'Special Events' };
  if (movie.comingThisWeek) return { alias: 'coming-soon', name: 'Starts This Week' };
  return { alias: 'now-showing', name: 'Now Showing' };
}

function hoytsEventCategory(raw) {
  const text = `${raw.name} ${raw.shortDescription || ''} ${raw.promoDescription || ''}`.toLowerCase();
  if (raw.type === 'event') {
    if (/pram|sensory|morning|family|kids/.test(text)) return { alias: 'family', name: 'Family Events' };
    if (/main stage|concert|music|opera/.test(text)) return { alias: 'music', name: 'Music & Concerts' };
    return { alias: 'events', name: 'Cinema Events' };
  }
  if (/festival/.test(text)) return { alias: 'film-festival', name: 'Film Festival' };
  return { alias: 'screening', name: 'Special Screening' };
}

function normalizeHoytsMovie(movie, kind) {
  const startDate = parseEventCinemasIsoDate(movie.releaseDate);
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });

  if (kind === 'coming-soon') {
    if (!startDate || startDate < today) return null;
    const horizon = new Date();
    horizon.setDate(horizon.getDate() + HOYTS_COMING_SOON_DAYS);
    const horizonStr = horizon.toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
    if (startDate > horizonStr) return null;
  }

  const category = hoytsMovieCategory(movie, kind);
  const rating = movie.rating?.id ? `${movie.rating.id} rating` : null;
  const runtime = movie.duration || movie.runtime?.minutes;
  const cinemasLabel = HOYTS_AUCKLAND_CINEMAS.join(', ');
  const attribute = movie.attribute?.name;

  const description = [
    movie.summary,
    [rating, runtime ? `${runtime} min` : null, attribute].filter(Boolean).join(' · '),
    `Auckland HOYTS: ${cinemasLabel}`,
    (movie.genres || []).slice(0, 3).join(', '),
  ]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const dateLabel =
    attribute ||
    (startDate ? (kind === 'coming-soon' ? `Opens ${startDate}` : 'Now showing') : 'Check HOYTS for sessions');

  const event = {
    id: `hoyts-movie-${movie.id}`,
    title: movie.name,
    description,
    url: `${HOYTS_BASE}${movie.link || `/movies/${movie.slug}`}`,
    image: hoytsImageUrl(movie.posterImage || movie.headerImage),
    dateLabel,
    startDate,
    endDate: startDate,
    category,
    subcategories: [...(movie.genres || []), attribute].filter(Boolean).slice(0, 4),
    region: 'Auckland',
    regionAlias: null,
    venueName: `HOYTS (${HOYTS_AUCKLAND_CINEMAS[0]})`,
    venueAddress: null,
    groupName: 'HOYTS',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'hoyts',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function normalizeHoytsEvent(raw) {
  const category = hoytsEventCategory(raw);
  const description = [raw.promoDescription || raw.shortDescription, `Auckland HOYTS: ${HOYTS_AUCKLAND_CINEMAS.join(', ')}`]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const event = {
    id: `hoyts-event-${raw.id}`,
    title: raw.name,
    description,
    url: `${HOYTS_BASE}${raw.link || `/${raw.slug}`}`,
    image: hoytsImageUrl(raw.promoImage || raw.thumbnailImage),
    dateLabel: raw.type === 'event' ? 'Recurring — check HOYTS for sessions' : 'Tickets on sale',
    startDate: null,
    endDate: null,
    category,
    subcategories: [raw.type, raw.promoDescription].filter(Boolean),
    region: 'Auckland',
    regionAlias: null,
    venueName: 'HOYTS Auckland',
    venueAddress: null,
    groupName: 'HOYTS',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'hoyts',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchHoytsApi(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`${HOYTS_API}${path}`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': HOYTS_UA,
        Origin: HOYTS_BASE,
        Referer: `${HOYTS_BASE}/`,
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchHoytsEvents() {
  try {
    const [nowMovies, allMovies, apiEvents] = await Promise.all([
      fetchHoytsApi('movies/now-showing'),
      fetchHoytsApi('movies'),
      fetchHoytsApi('events'),
    ]);

    const byMovieId = new Map();
    const events = [];

    if (nowMovies) {
      for (const movie of nowMovies) {
        const event = normalizeHoytsMovie(movie, 'now-showing');
        if (!event) continue;
        byMovieId.set(movie.id, event);
        events.push(event);
      }
    }

    if (allMovies) {
      for (const movie of allMovies) {
        if (movie.type !== 'comingSoon') continue;
        if (byMovieId.has(movie.id)) continue;
        const event = normalizeHoytsMovie(movie, 'coming-soon');
        if (!event) continue;
        byMovieId.set(movie.id, event);
        events.push(event);
      }
    }

    if (apiEvents) {
      const movieSlugs = new Set(
        [...byMovieId.values()].map((e) => e.url.replace(HOYTS_BASE, '').toLowerCase())
      );
      for (const raw of apiEvents) {
        if (raw.type === 'screening') {
          const link = (raw.link || '').toLowerCase();
          if (movieSlugs.has(link)) continue;
        }
        events.push(normalizeHoytsEvent(raw));
      }
    }

    return events;
  } catch {
    return [];
  }
}

function rialtoMovieCinemaIds(movie) {
  if (Array.isArray(movie.CinemaIds) && movie.CinemaIds.length) return movie.CinemaIds;
  return (movie.Cinemas || '')
    .split(',')
    .map((id) => Number(id.trim()))
    .filter(Boolean);
}

function rialtoHasNewmarketCinema(movie) {
  return rialtoMovieCinemaIds(movie).includes(RIALTO_NEWMARKET_CINEMA_ID);
}

function rialtoMovieCategory(movie, kind) {
  const genres = `${movie.Genres || ''} ${(movie.MovieGenres || []).map((g) => g.Name).join(' ')}`.toLowerCase();
  if (kind === 'coming-soon') return { alias: 'coming-soon', name: 'Coming Soon' };
  if (/animated|family/.test(genres)) return { alias: 'family', name: 'Family & Kids' };
  if (/horror|thriller/.test(genres)) return { alias: 'special-events', name: 'Special Events' };
  return { alias: 'now-showing', name: 'Now Showing' };
}

function rialtoFestivalCategory(title, subtitle) {
  const text = `${title} ${subtitle}`.toLowerCase();
  if (/festival|nziff/.test(text)) return { alias: 'film-festival', name: 'Film Festival' };
  if (/opera|met opera|concert|music/.test(text)) return { alias: 'music', name: 'Music & Concerts' };
  if (/national theatre|exhibition|artbeats|film talk/.test(text)) return { alias: 'cultural', name: 'Cultural Events' };
  if (/ladies film|sparkling|anime|adventure/.test(text)) return { alias: 'special-events', name: 'Special Events' };
  return { alias: 'events', name: 'Events & Festivals' };
}

function normalizeRialtoMovie(movie, kind) {
  if (!rialtoHasNewmarketCinema(movie)) return null;

  const startDate = parseEventCinemasIsoDate(movie.FirstSession || movie.ReleasedAt);
  const endDate = parseEventCinemasIsoDate(movie.LastSession || movie.ReleasedAt) || startDate;
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });

  if (kind === 'coming-soon') {
    if (!startDate || startDate < today) return null;
    const horizon = new Date();
    horizon.setDate(horizon.getDate() + RIALTO_COMING_SOON_DAYS);
    const horizonStr = horizon.toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
    if (startDate > horizonStr) return null;
  }

  const category = rialtoMovieCategory(movie, kind);
  const experiences = (movie.Experiences || []).map((e) => e.name).filter(Boolean).slice(0, 4);
  const genres = (movie.MovieGenres || []).map((g) => g.Name).filter(Boolean);
  const runtime = movie.RunningTime ? `${movie.RunningTime} min` : null;
  const rating = movie.Rating ? `${movie.Rating} rating` : null;

  const description = [
    movie.Synopsis,
    [rating, runtime].filter(Boolean).join(' · '),
    'Rialto Cinemas Newmarket',
    experiences.length ? experiences.join(', ') : null,
  ]
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const dateLabel =
    (movie.FirstSession ? formatAucklandLiveDate(movie.FirstSession, movie.LastSession) : null) ||
    (startDate ? `Opens ${startDate}` : kind === 'coming-soon' ? 'Coming soon' : 'Now showing');

  const event = {
    id: `rialto-movie-${movie.Id}`,
    title: movie.Name,
    description,
    url: `${RIALTO_BASE}${movie.MovieUrl || `/movie/${movie.Id}`}`,
    image: movie.LargePosterUrl || movie.PosterUrl || null,
    dateLabel,
    startDate,
    endDate,
    category,
    subcategories: [...genres, ...experiences].slice(0, 4),
    region: 'Auckland',
    regionAlias: 'Central-Auckland',
    venueName: 'Rialto Cinemas Newmarket',
    venueAddress: '167-169 Broadway, Newmarket',
    groupName: 'Rialto Cinemas',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'rialto',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

function parseRialtoFestivalsHtml(html) {
  const cards = [...html.matchAll(/<a href="(\/(?:cinema\/newmarket\/)?eventsfestivals\/([^"]+))" class="ep-item"([\s\S]*?)<\/a>/g)];
  const bySlug = new Map();

  for (const match of cards) {
    const path = match[1];
    const slug = match[2];
    const card = match[3];
    const title = decodeHtmlEntities(card.match(/<span class="name">([^<]+)</)?.[1] || '').trim();
    if (!title) continue;

    const subtitle = decodeHtmlEntities(card.match(/<span class="subtitle">([^<]+)</)?.[1] || '').trim();
    const dateRaw = decodeHtmlEntities(card.match(/<b>DATE:&nbsp;<\/b>([^<]+)</)?.[1] || '').trim();
    const timeRaw = decodeHtmlEntities(card.match(/<b>TIME:&nbsp;<\/b>([^<]+)</)?.[1] || '').trim();
    const image =
      card.match(/data-src="(https:\/\/cdn\.rialto[^"]+)"/)?.[1] ||
      `https://cdn.rialto.co.nz/cdn/resources/eventspromtions_v42/${slug}/banner.jpg`;

    bySlug.set(slug, {
      slug,
      title,
      subtitle,
      dateRaw,
      timeRaw,
      image,
      url: `${RIALTO_BASE}${path}`,
    });
  }

  return [...bySlug.values()];
}

function normalizeRialtoFestival(raw) {
  const category = rialtoFestivalCategory(raw.title, raw.subtitle);
  const startDate = parseEventCinemasFestivalStartDate(raw.dateRaw);
  const dateLabel = parseEventCinemasFestivalDateLabel(raw.dateRaw, raw.timeRaw);
  const description = [raw.subtitle, raw.dateRaw, raw.timeRaw, 'Rialto Cinemas Newmarket']
    .filter(Boolean)
    .join(' · ')
    .slice(0, 320);

  const event = {
    id: `rialto-festival-${raw.slug}`,
    title: raw.title,
    description,
    url: raw.url,
    image: raw.image,
    dateLabel,
    startDate,
    endDate: startDate,
    category,
    subcategories: [raw.subtitle].filter(Boolean),
    region: 'Auckland',
    regionAlias: 'Central-Auckland',
    venueName: 'Rialto Cinemas Newmarket',
    venueAddress: '167-169 Broadway, Newmarket',
    groupName: 'Rialto Cinemas',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'rialto',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchRialtoJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': RIALTO_UA,
        Accept: 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const payload = await res.json();
    if (!payload?.Success || !payload?.Data?.Movies) return null;
    return payload.Data.Movies;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchRialtoFestivalsHtml() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(RIALTO_NEWMARKET, {
      headers: { 'User-Agent': RIALTO_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchRialtoEvents() {
  try {
    const [nowMovies, soonMovies, festivalsHtml] = await Promise.all([
      fetchRialtoJson(RIALTO_NOW_SHOWING),
      fetchRialtoJson(RIALTO_COMING_SOON),
      fetchRialtoFestivalsHtml(),
    ]);

    const byId = new Map();
    const events = [];

    if (nowMovies) {
      for (const movie of nowMovies) {
        const event = normalizeRialtoMovie(movie, 'now-showing');
        if (!event) continue;
        byId.set(movie.Id, event);
        events.push(event);
      }
    }

    if (soonMovies) {
      for (const movie of soonMovies) {
        if (byId.has(movie.Id)) continue;
        const event = normalizeRialtoMovie(movie, 'coming-soon');
        if (!event) continue;
        byId.set(movie.Id, event);
        events.push(event);
      }
    }

    if (festivalsHtml) {
      for (const raw of parseRialtoFestivalsHtml(festivalsHtml)) {
        events.push(normalizeRialtoFestival(raw));
      }
    }

    return events;
  } catch {
    return [];
  }
}

async function fetchAucklandForKidsEvents() {
  const pages = [
    { url: AFK_TODAY, windowLabel: 'Today', patchToday: true },
    { url: AFK_WEEKEND, windowLabel: 'This weekend', patchToday: false },
  ];

  const seen = new Set();
  const events = [];

  const batches = await Promise.all(
    pages.map(async (page) => {
      const rawEvents = await fetchAfkCalendarEvents(page.url, { patchToday: page.patchToday });
      return rawEvents.map((raw) => ({ raw, windowLabel: page.windowLabel }));
    })
  );

  for (const batch of batches) {
    for (const { raw, windowLabel } of batch) {
      const event = normalizeAfkEvent(raw, windowLabel);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }
  }

  return events;
}

async function fetchCheekyEvents() {
  const headers = {
    'User-Agent': CHEEKY_UA,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const [aukRes, calRes] = await Promise.all([
      fetch(CHEEKY_AUCKLAND, { headers, signal: controller.signal }),
      fetch(CHEEKY_CALENDAR, { headers, signal: controller.signal }),
    ]);
    clearTimeout(timer);

    const events = [];
    const seen = new Set();

    if (aukRes.ok) {
      const html = await aukRes.text();
      for (const raw of parseCheekyAucklandTypes(html)) {
        const event = normalizeCheekyEventType(raw);
        if (!event || seen.has(event.id)) continue;
        seen.add(event.id);
        events.push(event);
      }
    }

    if (calRes.ok) {
      const html = await calRes.text();
      for (const raw of parseCheekyCalendarBlocks(html)) {
        const event = normalizeCheekyCalendarEvent(raw);
        if (!event || seen.has(event.id)) continue;
        seen.add(event.id);
        events.push(event);
      }
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchHumanitixEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(HUMANITIX_AUCKLAND, {
      headers: {
        'User-Agent': HUMANITIX_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const nextData = parseHumanitixNextData(html);
    const props = nextData?.props?.pageProps;
    if (!props?.currentLocation || !props.stateKey) return [];

    const geocode = props.currentLocation;
    const featured = props.featuredCarouselEntries || {};
    const seedEvents = [
      ...(featured.verticalEvents || []),
      ...(featured.carouselEntries || []),
    ];

    const batches = await fetchHumanitixCarousels(geocode, props.stateKey);
    const seen = new Map();

    const addRaw = (raw, query) => {
      const label = query ? humanitixCarouselCategoryLabel(query) : 'Humanitix';
      const event = normalizeHumanitixEvent(raw, label);
      if (!event) return;
      const existing = seen.get(event.id);
      if (!existing || event.hospitalityScore > existing.hospitalityScore) {
        seen.set(event.id, event);
      }
    };

    for (const raw of seedEvents) addRaw(raw, null);
    for (const batch of batches) {
      for (const raw of batch.events) addRaw(raw, batch.parsedCategories);
    }

    return [...seen.values()];
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function parseDueDropStartDate(title, url) {
  const titleYear = title.match(/\b(20\d{2})\b/)?.[1];
  const urlYear = url?.match(/eventfinda\.co\.nz\/(20\d{2})\//)?.[1];
  const year = titleYear || urlYear;
  return year ? `${year}-01-01` : null;
}

function dueDropCategory(title) {
  const text = title.toLowerCase();
  if (/wrestling|sport|dance championship|street dance|crew/i.test(text)) {
    return { alias: 'sports', name: 'Sports & Dance' };
  }
  if (/concert|music|abba|90|butterfly|revolution|tangata beats|movies/i.test(text)) {
    return { alias: 'music', name: 'Music & Concerts' };
  }
  if (/madagascar|family|mso|funfest|matariki/i.test(text)) {
    return { alias: 'family', name: 'Family & Kids' };
  }
  if (/convention|cultural|club/i.test(text)) {
    return { alias: 'cultural', name: 'Cultural Events' };
  }
  return { alias: 'events', name: 'Events' };
}

function parseDueDropWhatsOnHtml(html) {
  const articles = html.split(/<article class="gallery-item"/).slice(1);
  const events = [];

  for (const block of articles) {
    const slug = block.match(/^ id="([^"]+)"/)?.[1];
    const title = decodeHtmlEntities(block.match(/<h3 class="gallery-item-title">([^<]+)</)?.[1] || '').trim();
    if (!title || !slug) continue;

    const href = block.match(/<a class="gallery-item-image" href="([^"]+)"/)?.[1] || null;
    const imgSrc = block.match(/<img src="([^"]+)"/)?.[1] || null;
    const image = imgSrc ? (imgSrc.startsWith('http') ? imgSrc : `${DUEDROP_BASE}${imgSrc}`) : null;

    events.push({
      slug,
      title,
      url: href || `${DUEDROP_WHATS_ON}#${slug}`,
      image,
      startDate: parseDueDropStartDate(title, href),
    });
  }

  return events;
}

function normalizeDueDropEvent(raw) {
  const category = dueDropCategory(raw.title);
  const year = raw.startDate?.slice(0, 4);
  const dateLabel = year ? `${year} — check listing for dates` : 'Check Due Drop for dates';
  const ticketsVia = raw.url?.includes('eventfinda.co.nz') ? 'Tickets via Eventfinda' : null;

  const titleKey = normalizeEventTitleKey(raw.title).replace(/\s+/g, '-').slice(0, 48);

  const event = {
    id: `duedrop-${raw.slug}-${titleKey}`,
    title: raw.title,
    description: [DUEDROP_ADDRESS, ticketsVia, 'Due Drop Events Centre, Manukau'].filter(Boolean).join(' · ').slice(0, 280),
    url: raw.url,
    image: raw.image,
    dateLabel,
    startDate: raw.startDate,
    endDate: raw.startDate,
    category,
    subcategories: ticketsVia ? [ticketsVia] : [],
    region: 'South Auckland',
    regionAlias: 'South-Auckland',
    venueName: 'Due Drop Events Centre',
    venueAddress: DUEDROP_ADDRESS,
    groupName: 'Due Drop Events Centre',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'duedrop',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchDueDropEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(DUEDROP_WHATS_ON, {
      headers: { 'User-Agent': DUEDROP_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const seen = new Set();
    const events = [];

    for (const raw of parseDueDropWhatsOnHtml(html)) {
      const event = normalizeDueDropEvent(raw);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function nextWeekdayInAuckland(dayName) {
  const target = NIGHTMARKETS_DAY_NUM[dayName.toLowerCase()];
  if (target === undefined) return null;

  for (let i = 0; i < 7; i++) {
    const probe = new Date(Date.now() + i * 86400000);
    const parts = new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(probe);
    const weekday = parts.find((p) => p.type === 'weekday')?.value?.toLowerCase();
    if (weekday !== dayName.toLowerCase()) continue;
    const year = parts.find((p) => p.type === 'year')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;
    const day = parts.find((p) => p.type === 'day')?.value;
    return year && month && day ? `${year}-${month}-${day}` : null;
  }
  return null;
}

function nightMarketsRegion(locationName) {
  const lower = locationName.toLowerCase();
  if (/kelston|henderson|waitakere|new lynn/.test(lower)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  if (/albany|silverdale|highbury|north harbour|birkenhead/.test(lower)) {
    if (/silverdale/.test(lower)) {
      return { region: 'Hibiscus Coast', regionAlias: 'Hibiscus-Coast' };
    }
    return { region: 'North Shore', regionAlias: 'North-Shore' };
  }
  if (/botany|pakuranga|howick/.test(lower)) {
    return { region: 'East Auckland', regionAlias: 'East-Auckland' };
  }
  if (/papatoetoe|manukau|mangere|otahuhu/.test(lower)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function parseNightMarketsMarketLine(text) {
  const cleaned = text.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  if (!cleaned || /temporarily closed/i.test(cleaned)) return null;

  const match = cleaned.match(/^(.+?):\s*(.+)$/);
  if (!match) return null;

  const location = match[1].trim();
  const hours = match[2].trim();
  if (!location || !hours) return null;

  return { location, hours };
}

function parseNightMarketsLocationsHtml(html) {
  const start = html.indexOf('AUCKLAND:');
  const end = html.indexOf('HAMILTON:', start >= 0 ? start : 0);
  if (start < 0) return { markets: [], image: null };

  const section = html.slice(start, end > start ? end : undefined);
  const image =
    html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || null;

  const dayRe =
    /font-size:27px;?"[^>]*>[\s\S]*?>(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)</gi;
  const markets = [];
  const dayMatches = [...section.matchAll(dayRe)];

  for (let i = 0; i < dayMatches.length; i++) {
    const day = dayMatches[i][1].toLowerCase();
    const blockStart = dayMatches[i].index;
    const blockEnd = i + 1 < dayMatches.length ? dayMatches[i + 1].index : section.length;
    const block = section.slice(blockStart, blockEnd);

    for (const liMatch of block.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const text = decodeHtmlEntities(liMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
      const parsed = parseNightMarketsMarketLine(text);
      if (!parsed) continue;
      markets.push({ day, ...parsed });
    }
  }

  return { markets, image };
}

function normalizeNightMarketsEvent(raw) {
  const { region, regionAlias } = nightMarketsRegion(raw.location);
  const dayLabel = raw.day.charAt(0).toUpperCase() + raw.day.slice(1);
  const titleKey = normalizeEventTitleKey(raw.location).replace(/\s+/g, '-').slice(0, 48);
  const startDate = nextWeekdayInAuckland(raw.day);

  const event = {
    id: `nightmarkets-${raw.day}-${titleKey}`,
    title: `Auckland Night Market — ${raw.location}`,
    description: [
      `Every ${dayLabel} · ${raw.hours}`,
      region,
      'Weekly Auckland Night Markets stallholder venue — apply via aucklandnightmarkets.co.nz',
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: NIGHTMARKETS_LOCATIONS,
    image: raw.image,
    dateLabel: `Every ${dayLabel} · ${raw.hours}`,
    startDate,
    endDate: startDate,
    category: { alias: 'food', name: 'Food & Markets' },
    subcategories: ['Weekly night market', 'Stallholder venue'],
    region,
    regionAlias,
    venueName: raw.location,
    venueAddress: null,
    groupName: 'Auckland Night Markets',
    attendees: null,
    rating: null,
    price: null,
    isFree: true,
    source: 'nightmarkets',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchNightMarketsEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(NIGHTMARKETS_LOCATIONS, {
      headers: { 'User-Agent': NIGHTMARKETS_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const { markets, image } = parseNightMarketsLocationsHtml(html);
    const seen = new Set();
    const events = [];

    for (const raw of markets) {
      const event = normalizeNightMarketsEvent({ ...raw, image });
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function aucklandTodayIso() {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  return year && month && day ? `${year}-${month}-${day}` : null;
}

function ftcIsoDate(ms) {
  if (!ms) return null;
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(ms));
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  return year && month && day ? `${year}-${month}-${day}` : null;
}

function ftcRegion(locationName) {
  const lower = (locationName || '').toLowerCase();
  if (/manukau|papakura|papatoetoe|flat bush|botany|manurewa|otara|takanini|rosehill/i.test(lower)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  if (/henderson|waitakere|te atatu|westgate|huapai|kumeu/i.test(lower)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  if (/albany|takapuna|milford|devonport|north harbour|birkenhead|remuera|britomart|city|auckland cbd/i.test(lower)) {
    if (/remuera|britomart|city|cbd|auckland cbd/i.test(lower)) {
      return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
    }
    return { region: 'North Shore', regionAlias: 'North-Shore' };
  }
  if (/pakuranga|howick|botany|botanic|east/i.test(lower)) {
    return { region: 'East Auckland', regionAlias: 'East-Auckland' };
  }
  if (/manly|whangaparaoa|silverdale|orewa|omaha|warkworth|helensville/i.test(lower)) {
    if (/manly|whangaparaoa|silverdale|orewa|omaha/i.test(lower)) {
      return { region: 'Hibiscus Coast', regionAlias: 'Hibiscus-Coast' };
    }
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  if (/hobsonville/i.test(lower)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function ftcDateLabel(ms, description) {
  const formatted = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(ms));
  const timeMatch = (description || '').match(/\d{1,2}:\d{2}\s*(?:am|pm)?\s*[–-]\s*\d{1,2}:\d{2}\s*(?:am|pm)?/i);
  return timeMatch ? `${formatted} · ${timeMatch[0]}` : formatted;
}

function ftcImageUrl(images) {
  const raw = Array.isArray(images) ? images[0] : null;
  if (!raw) return FTC_LOGO;
  return raw.startsWith('http') ? raw : `https:${raw}`;
}

function parseFtcInitChunk(text, id) {
  if (!text || text.length < 10) return null;
  try {
    const chunks = JSON.parse(text);
    if (!Array.isArray(chunks)) return null;
    const chunk = chunks.find((c) => c.id === id && c.type === 'custom.event_listing');
    return chunk?.data || null;
  } catch {
    return null;
  }
}

function normalizeFtcEvent(id, raw) {
  if (!raw?.name_text || !raw.ftc_event__boolean || raw.deleted__boolean) return null;

  const startDate = ftcIsoDate(raw.date_date);
  if (!startDate) return null;

  const { region, regionAlias } = ftcRegion(raw.location_text);
  const description = (raw.description1_text || '').replace(/\s+/g, ' ').trim();
  const titleKey = normalizeEventTitleKey(raw.name_text).replace(/\s+/g, '-').slice(0, 48);

  const event = {
    id: `ftc-${id}-${titleKey}`,
    title: raw.name_text,
    description: [raw.location_text, description].filter(Boolean).join(' · ').slice(0, 280),
    url: `${FTC_BASE}/event/${id}`,
    image: ftcImageUrl(raw.images_list_image),
    dateLabel: ftcDateLabel(raw.date_date, description),
    startDate,
    endDate: ftcIsoDate(raw.date_end_date) || startDate,
    category: { alias: 'food', name: 'Food & Street Food' },
    subcategories: ['Food Truck Collective', raw.public__boolean ? 'Public listing' : 'FTC event'],
    region,
    regionAlias,
    venueName: raw.location_text || null,
    venueAddress: raw.location_text || null,
    groupName: 'Food Truck Collective',
    attendees: null,
    rating: null,
    price: null,
    isFree: true,
    source: 'ftc',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function discoverFtcEventIds(signal) {
  const ids = new Set(FTC_SEED_EVENT_IDS);

  for (const url of FTC_DISCOVERY_URLS) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': FTC_UA, Accept: 'text/html' },
        signal,
        redirect: 'follow',
      });
      if (!res.ok) continue;
      const html = await res.text();
      for (const match of html.matchAll(/foodtruckcollective\.co\.nz\/event\/(\d+x\d+)/gi)) {
        ids.add(match[1]);
      }
    } catch {
      /* skip failed discovery URL */
    }
  }

  return [...ids];
}

async function fetchFtcEventById(id, signal) {
  const pageUrl = `${FTC_BASE}/event/${id}`;
  const initUrl = `${FTC_BASE}/api/1.1/init/data?location=${encodeURIComponent(pageUrl)}`;
  const res = await fetch(initUrl, {
    headers: { 'User-Agent': FTC_UA, Accept: 'application/json' },
    signal,
  });
  if (!res.ok) return null;
  const raw = parseFtcInitChunk(await res.text(), id);
  return raw ? { id, raw } : null;
}

async function fetchFtcEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  const todayIso = aucklandTodayIso();

  try {
    const ids = await discoverFtcEventIds(controller.signal);
    const seen = new Set();
    const events = [];

    await Promise.all(
      ids.map(async (id) => {
        const item = await fetchFtcEventById(id, controller.signal);
        if (!item) return;
        const eventIso = ftcIsoDate(item.raw.date_date);
        if (!eventIso || !todayIso || eventIso < todayIso) return;
        const event = normalizeFtcEvent(item.id, item.raw);
        if (!event || seen.has(event.id)) return;
        seen.add(event.id);
        events.push(event);
      }),
    );

    clearTimeout(timer);
    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function acbMarketsRegion(name) {
  const lower = (name || '').toLowerCase();
  if (/matakana|warkworth|coatesville|silverdale|orewa/.test(lower)) {
    if (/matakana|warkworth/.test(lower)) {
      return { region: 'Hibiscus Coast', regionAlias: 'Hibiscus-Coast' };
    }
    return { region: 'North Shore', regionAlias: 'North-Shore' };
  }
  if (/clevedon|otara|papatoetoe|manukau/.test(lower)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  if (/britomart|parnell|city|cbd/.test(lower)) {
    return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
  }
  if (/henderson|waitakere|west/.test(lower)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function parseAcbMarketSchedule(window) {
  const day = window.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)s?\b/i)?.[1]?.toLowerCase();
  if (!day) return null;
  const hours =
    window.match(/from\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:to|-)\s*(?:\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|12pm))/i)?.[1]
      ?.replace(/\s+/g, ' ')
      .trim() || 'Check listing';
  return { day, hours };
}

function parseAcbMarketsHtml(html) {
  const markets = [];
  const blockRe =
    /field--name-field-text-item-text[\s\S]*?field--item">([\s\S]*?)<\/div>\s*\n\s*\n\s*<\/div>/gi;

  for (const block of html.matchAll(blockRe)) {
    const chunk = block[1];
    for (const link of chunk.matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      const url = link[1];
      const name = decodeHtmlEntities(link[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
      if (!name || /buono|delicatessen/i.test(name)) continue;
      if (/auckland night markets/i.test(name)) continue;

      const idx = chunk.indexOf(link[0]);
      const window = decodeHtmlEntities(
        chunk.slice(Math.max(0, idx - 100), idx + link[0].length + 160).replace(/<[^>]+>/g, ' '),
      ).replace(/\s+/g, ' ');

      const schedule = parseAcbMarketSchedule(window);
      if (!schedule) continue;

      const mapMatch = [
        ...html.matchAll(
          /geolocation-location[^>]*data-lat="([^"]+)" data-lng="([^"]+)"[\s\S]*?<strong>([^<]+)<\/strong>/gi,
        ),
      ].find((m) => normalizeEventTitleKey(m[3]) === normalizeEventTitleKey(name));

      markets.push({
        name,
        url: url.startsWith('http') ? url : `${ACB_BASE}${url}`,
        ...schedule,
        lat: mapMatch?.[1] || null,
        lng: mapMatch?.[2] || null,
      });
    }
  }

  return { markets, image: ACB_MARKETS_IMAGE };
}

function normalizeAcbMarketsEvent(raw) {
  const { region, regionAlias } = acbMarketsRegion(raw.name);
  const dayLabel = raw.day.charAt(0).toUpperCase() + raw.day.slice(1);
  const titleKey = normalizeEventTitleKey(raw.name).replace(/\s+/g, '-').slice(0, 48);
  const startDate = nextWeekdayInAuckland(raw.day);

  const event = {
    id: `acbmarkets-${raw.day}-${titleKey}`,
    title: raw.name,
    description: [
      `Every ${dayLabel} · ${raw.hours}`,
      region,
      'Visit Auckland markets directory — farmers and flea markets across Tāmaki Makaurau',
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: raw.url,
    image: raw.image,
    dateLabel: `Every ${dayLabel} · ${raw.hours}`,
    startDate,
    endDate: startDate,
    category: { alias: 'food', name: 'Food & Markets' },
    subcategories: ['Farmers market', 'Visit Auckland'],
    region,
    regionAlias,
    venueName: raw.name,
    venueAddress: null,
    groupName: 'Visit Auckland Markets',
    attendees: null,
    rating: null,
    price: null,
    isFree: true,
    source: 'acbmarkets',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchAcbMarketsEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(ACB_MARKETS, {
      headers: { 'User-Agent': ACB_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const { markets, image } = parseAcbMarketsHtml(html);
    const seen = new Set();
    const events = [];

    for (const raw of markets) {
      const event = normalizeAcbMarketsEvent({ ...raw, image });
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function ocmRegion(locationName) {
  const lower = (locationName || '').toLowerCase();
  if (/wairau|north shore|birkenhead|albany|silverdale/.test(lower)) {
    return { region: 'North Shore', regionAlias: 'North-Shore' };
  }
  if (/mt albert|avondale|new lynn|henderson|waitakere/.test(lower)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  if (/botany|pakuranga|howick|manukau|papatoetoe/.test(lower)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  if (/grafton|victoria park|britomart|cbd|city|parnell/.test(lower)) {
    return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function ocmLocationFromText(text) {
  const lower = text.toLowerCase();
  if (/victoria park/i.test(text)) return 'Victoria Park';
  if (/grafton/i.test(text)) return 'Grafton';
  if (/wairau/i.test(text)) return 'Wairau';
  if (/north shore/i.test(text)) return 'North Shore';
  if (/mt albert/i.test(text)) return 'Mt Albert';
  if (/waikato|hamilton/i.test(lower)) return null;
  return null;
}

function ocmIsoFromAltDate(dayName, dayNum, monthName, yearHint) {
  const month = OCM_MONTH_NUM[monthName?.toLowerCase()];
  if (!month || !dayNum) return null;
  const year = yearHint || new Date().getFullYear();
  const dd = String(dayNum).padStart(2, '0');
  return `${year}-${month}-${dd}`;
}

function parseOcmGalleryHtml(html) {
  const image =
    html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]?.replace(/^http:/, 'https:') ||
    OCM_IMAGE;
  const promos = [];
  const slideRe =
    /<div class="slide"[\s\S]*?href="(https:\/\/www\.instagram\.com\/p\/[^"]+)"[\s\S]*?alt="([\s\S]*?)"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;

  for (const match of html.matchAll(slideRe)) {
    const instagramUrl = match[1];
    const alt = decodeHtmlEntities(match[2].replace(/\s+/g, ' ').trim());
    const imgMatch = match[0].match(/data-src="([^"]+)"/);
    promos.push({
      alt,
      instagramUrl,
      image: imgMatch?.[1]?.replace(/^http:/, 'https:') || image,
    });
  }

  return { promos, image };
}

function parseOcmPromoAlt(raw) {
  const text = raw.alt.replace(/\s+/g, ' ').trim();
  if (!text || /at open circle markets auckland$/i.test(text)) return null;
  if (/hits the road|waikato|hamilton/i.test(text) && !/auckland/i.test(text)) return null;

  const location = ocmLocationFromText(text);
  if (!location) return null;

  const everyDay = text.match(
    /EVERY\s+(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\s*(?:NIGHT|NIGHTS)?/i,
  );
  if (everyDay) {
    const day = everyDay[1].toLowerCase();
    const hours = /night/i.test(everyDay[0]) ? 'Evening' : 'Check listing';
    return {
      location,
      day,
      hours,
      recurring: true,
      startDate: null,
      instagramUrl: raw.instagramUrl,
      image: raw.image,
      blurb: text.slice(0, 160),
    };
  }

  if (/victoria park/i.test(text) && /\bSunday\s*$/i.test(text)) {
    return {
      location,
      day: 'sunday',
      hours: 'Sunday · check listing',
      recurring: true,
      startDate: null,
      instagramUrl: raw.instagramUrl,
      image: raw.image,
      blurb: text.slice(0, 160),
    };
  }

  const dated = text.match(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)(?:\s+(\d{4}))?/i,
  );
  if (dated) {
    const startDate = ocmIsoFromAltDate(dated[1], dated[2], dated[3], dated[4]);
    if (!startDate) return null;
    return {
      location,
      day: dated[1].toLowerCase(),
      hours: 'Check listing',
      recurring: false,
      startDate,
      instagramUrl: raw.instagramUrl,
      image: raw.image,
      blurb: text.slice(0, 160),
    };
  }

  return null;
}

function normalizeOcmEvent(raw) {
  const { region, regionAlias } = ocmRegion(raw.location);
  const dayLabel = raw.day.charAt(0).toUpperCase() + raw.day.slice(1);
  const titleKey = normalizeEventTitleKey(raw.location).replace(/\s+/g, '-').slice(0, 48);
  const startDate = raw.recurring ? nextWeekdayInAuckland(raw.day) : raw.startDate;
  if (!startDate) return null;

  const dateLabel = raw.recurring
    ? `Every ${dayLabel} · ${raw.hours}`
    : `${dayLabel} · ${raw.hours}`;

  const event = {
    id: raw.recurring ? `opencircle-${raw.day}-${titleKey}` : `opencircle-${startDate}-${titleKey}`,
    title: `Open Circle Markets — ${raw.location}`,
    description: [
      dateLabel,
      region,
      raw.blurb || 'Community market for local food vendors, makers, and live music — apply via Open Circle Markets',
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: raw.instagramUrl || OCM_HOME,
    image: raw.image,
    dateLabel,
    startDate,
    endDate: startDate,
    category: { alias: 'food', name: 'Food & Markets' },
    subcategories: ['Community market', 'Night market'],
    region,
    regionAlias,
    venueName: raw.location,
    venueAddress: null,
    groupName: 'Open Circle Markets',
    attendees: null,
    rating: null,
    price: null,
    isFree: true,
    source: 'opencircle',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchOpenCircleEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  const todayIso = aucklandTodayIso();

  try {
    const res = await fetch(OCM_HOME, {
      headers: { 'User-Agent': OCM_UA, Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const { promos, image } = parseOcmGalleryHtml(html);
    const seen = new Set();
    const events = [];

    for (const promo of promos) {
      const parsed = parseOcmPromoAlt({ ...promo, image: promo.image || image });
      if (!parsed) continue;
      if (!parsed.recurring && parsed.startDate && todayIso && parsed.startDate < todayIso) continue;

      const event = normalizeOcmEvent(parsed);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function amnRegion(locationName) {
  const lower = (locationName || '').toLowerCase();
  if (/st johns|meadowbank|remuera|ellerslie|netball/.test(lower)) {
    return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
  }
  if (/otahuhu|papatoetoe|manukau|mangere/.test(lower)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function amnPlainText(html) {
  return decodeHtmlEntities((html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function parseAmnHomeHours(html) {
  const match = html.match(
    /(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)S?:\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*-\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/i,
  );
  if (!match) return null;
  return {
    day: match[1].toLowerCase().replace(/s$/, ''),
    hours: match[2].replace(/\s+/g, ' ').trim(),
  };
}

function parseAmnMarketPage(page, homeHours) {
  if (!page?.slug) return null;

  const text = amnPlainText(page.content?.rendered || '');
  const title = amnPlainText(page.title?.rendered || page.slug);
  const everyDay = text.match(/OPEN EVERY\s+(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)/i);
  if (!everyDay) return null;

  const day = everyDay[1].toLowerCase();
  const hoursFromText = text.match(
    new RegExp(`${day}s?:\\s*(\\d{1,2}(?::\\d{2})?\\s*(?:am|pm)\\s*-\\s*\\d{1,2}(?::\\d{2})?\\s*(?:am|pm))`, 'i'),
  )?.[1];

  if (page.slug === 'otahuhu-phoenix-markets') {
    const hours =
      (homeHours?.day === day ? homeHours.hours : null) ||
      hoursFromText?.replace(/\s+/g, ' ').trim() ||
      '7am–1pm';
    return {
      name: 'Otahuhu Phoenix Markets',
      location: 'Otahuhu',
      venueName: 'Phoenix Tavern',
      venueAddress: '26 Avenue Rd, Otahuhu',
      day,
      hours,
      url: page.link || `${AMN_BASE}/otahuhu-phoenix-markets/`,
      blurb: 'Boutique Thursday market — fresh produce, food stalls, crafts, and entertainment at Phoenix Tavern Otahuhu',
    };
  }

  if (page.slug === 'auckland-eastern-markets') {
    const dayLabel = day.charAt(0).toUpperCase() + day.slice(1);
    return {
      name: 'Auckland Eastern Markets',
      location: 'St Johns',
      venueName: 'Auckland Netball Centre',
      venueAddress: null,
      day,
      hours: hoursFromText?.replace(/\s+/g, ' ').trim() || `${dayLabel} · check listing`,
      url: page.link || `${AMN_BASE}/auckland-eastern-markets/`,
      blurb: 'Sunday market at Auckland Netball Centre — Asian and Polynesian produce, food stalls, crafts, and entertainment',
    };
  }

  return {
    name: title,
    location: title,
    venueName: title,
    venueAddress: null,
    day,
    hours: hoursFromText?.replace(/\s+/g, ' ').trim() || 'Check listing',
    url: page.link || AMN_HOME,
    blurb: text.slice(0, 160),
  };
}

function normalizeAmnEvent(raw) {
  const { region, regionAlias } = amnRegion(raw.location);
  const dayLabel = raw.day.charAt(0).toUpperCase() + raw.day.slice(1);
  const titleKey = normalizeEventTitleKey(raw.name).replace(/\s+/g, '-').slice(0, 48);
  const startDate = nextWeekdayInAuckland(raw.day);
  if (!startDate) return null;

  const event = {
    id: `aucklandmarket-${raw.day}-${titleKey}`,
    title: raw.name,
    description: [
      `Every ${dayLabel} · ${raw.hours}`,
      region,
      raw.blurb || 'Weekly Auckland Markets stallholder venue — apply via aucklandmarketnz.co.nz',
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: raw.url,
    image: raw.image,
    dateLabel: `Every ${dayLabel} · ${raw.hours}`,
    startDate,
    endDate: startDate,
    category: { alias: 'food', name: 'Food & Markets' },
    subcategories: ['Weekly market', 'Stallholder venue'],
    region,
    regionAlias,
    venueName: raw.venueName || raw.location,
    venueAddress: raw.venueAddress,
    groupName: 'Auckland Markets',
    attendees: null,
    rating: null,
    price: null,
    isFree: true,
    source: 'aucklandmarket',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchAmnMarketPage(slug, signal) {
  try {
    const res = await fetch(`${AMN_BASE}/wp-json/wp/v2/pages?slug=${slug}`, {
      headers: { 'User-Agent': AMN_UA, Accept: 'application/json' },
      signal,
    });
    if (!res.ok) return null;
    const pages = await res.json();
    return pages?.[0] || null;
  } catch {
    return null;
  }
}

async function fetchAucklandMarketEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const [homeRes, ...pages] = await Promise.all([
      fetch(AMN_HOME, {
        headers: { 'User-Agent': AMN_UA, Accept: 'text/html,application/xhtml+xml' },
        signal: controller.signal,
      }),
      ...AMN_MARKET_SLUGS.map((slug) => fetchAmnMarketPage(slug, controller.signal)),
    ]);
    clearTimeout(timer);

    const image = AMN_IMAGE;
    const homeHours = homeRes.ok ? parseAmnHomeHours(await homeRes.text()) : null;
    const seen = new Set();
    const events = [];

    for (const page of pages) {
      const parsed = parseAmnMarketPage(page, homeHours);
      if (!parsed) continue;
      const event = normalizeAmnEvent({ ...parsed, image });
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function ttpCleanUrl(link) {
  const cleaned = (link || '').trim();
  if (!cleaned || cleaned === 'empty') return null;
  return cleaned.startsWith('http') ? cleaned : `https://${cleaned}`;
}

function ttpRegion(address, name) {
  const text = `${address || ''} ${name || ''}`.toLowerCase();
  if (/titirangi|kumeu|henderson|te atat|te atatu|westgate|waitakere/.test(text)) {
    return { region: 'West Auckland', regionAlias: 'West-Auckland' };
  }
  if (/takapuna|birkenhead|browns bay|long bay|devonport|north shore/.test(text)) {
    return { region: 'North Shore', regionAlias: 'North-Shore' };
  }
  if (/otara|manukau|mount wellington|papatoetoe|mangere|south auckland/.test(text)) {
    return { region: 'South Auckland', regionAlias: 'South-Auckland' };
  }
  if (/pakuranga|howick|botany|east auckland/.test(text)) {
    return { region: 'East Auckland', regionAlias: 'East-Auckland' };
  }
  if (/britomart|parnell|mount eden|grey lynn|eden|city|cbd|auckland 1010/.test(text)) {
    return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
  }
  if (/coatesville|silverdale|orewa|warkworth/.test(text)) {
    return { region: 'Hibiscus Coast', regionAlias: 'Hibiscus-Coast' };
  }
  return { region: 'Auckland', regionAlias: null };
}

function parseTtpMarketDay(place) {
  const blob = [
    place.restaurant_name,
    place.snippet,
    place.comment_text1,
    place.comment_text2,
    place.comment_text3,
  ]
    .filter(Boolean)
    .join(' ');

  const every = blob.match(/every\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)s?/i);
  if (every) return every[1].toLowerCase();

  const nameDay = (place.restaurant_name || '').match(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i,
  );
  if (nameDay) return nameDay[1].toLowerCase();

  if (/\bsunday\b/i.test(place.restaurant_name || '')) return 'sunday';
  if (/\bsaturday\b/i.test(place.restaurant_name || '')) return 'saturday';

  const weekly = blob.match(/\bweekly\b[\s\S]{0,40}\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
  if (weekly) return weekly[1].toLowerCase();

  if (/mid-week/i.test(blob)) return 'wednesday';

  const yourDay = blob.match(/\byour\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i);
  if (yourDay) return yourDay[1].toLowerCase();

  if (/\bbritomart\b/i.test(place.restaurant_name || '') && /farmers/i.test(place.restaurant_name || '')) {
    return 'saturday';
  }

  if (/(?:fortnightly|monthly)/i.test(blob)) {
    const day = blob.match(/\b(Saturday|Sunday)\b/i);
    if (day) return day[1].toLowerCase();
  }

  const openFrom = blob.match(/open from\s+\d+[\s\S]{0,30}\b(Saturday|Sunday)s?/i);
  if (openFrom) return openFrom[1].toLowerCase();

  return null;
}

function normalizeTtpStreetMarket(place) {
  const name = (place.restaurant_name || '').trim();
  if (!name) return null;

  const day = parseTtpMarketDay(place);
  const dayLabel = day ? day.charAt(0).toUpperCase() + day.slice(1) : null;
  const startDate = day ? nextWeekdayInAuckland(day) : null;
  const dateLabel = dayLabel
    ? `Every ${dayLabel} · check listing`
    : 'Hours vary · check listing';

  const { region, regionAlias } = ttpRegion(place.address, name);
  const rating = Number.parseFloat(place.google_score);
  const reviewCount = Number.parseInt(String(place.google_review || '').replace(/\D/g, ''), 10) || null;
  const url =
    ttpCleanUrl(place.link) || ttpCleanUrl(place.page_link) || TTP_AUCKLAND_MARKETS;
  const image = ttpCleanUrl(place.photo1) || TTP_IMAGE;
  const tag = place.place_tag1 && place.place_tag1 !== 'empty' ? place.place_tag1 : 'Street market';

  const event = {
    id: `touristtrip-${place.uuid || normalizeEventTitleKey(name).replace(/\s+/g, '-').slice(0, 48)}`,
    title: name,
    description: [
      tag,
      region,
      (place.snippet || '').slice(0, 160),
      reviewCount ? `${reviewCount} Google reviews` : null,
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url,
    image,
    dateLabel,
    startDate,
    endDate: startDate,
    category: { alias: 'food', name: 'Food & Markets' },
    subcategories: [tag, 'Street market'],
    region,
    regionAlias,
    venueName: name,
    venueAddress: place.address || null,
    groupName: 'Tourist Trip Planner',
    attendees: null,
    rating: Number.isFinite(rating) ? rating : null,
    price: place.price && place.price !== 'empty' ? place.price : null,
    isFree: true,
    source: 'touristtrip',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchTouristTripPlannerEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`${TTP_API}?city_key=auckland&type_key=street_markets`, {
      headers: { 'User-Agent': TTP_UA, Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const payload = await res.json();
    const places = payload?.data?.query_response;
    if (!Array.isArray(places)) return [];

    const seen = new Set();
    const events = [];
    for (const place of places) {
      const event = normalizeTtpStreetMarket(place);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function atcTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function parseAtcDateRange(text) {
  const raw = (text || '').trim();
  if (!raw) return null;

  const rangeMatch = raw.match(
    /(\d{1,2})\s+([A-Za-z]{3,9})\s*[–-]\s*(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/,
  );
  if (rangeMatch) {
    const [, d1, m1, d2, m2, year] = rangeMatch;
    const mm1 = ATC_MONTH_NUM[m1.slice(0, 3).toLowerCase()];
    const mm2 = ATC_MONTH_NUM[m2.slice(0, 3).toLowerCase()];
    if (!mm1 || !mm2) return null;
    const startDate = `${year}-${mm1}-${String(d1).padStart(2, '0')}`;
    const endDate = `${year}-${mm2}-${String(d2).padStart(2, '0')}`;
    return {
      startDate,
      endDate,
      dateLabel: `${d1} ${m1} – ${d2} ${m2} ${year}`,
    };
  }

  const singleMatch = raw.match(/(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (singleMatch) {
    const [, d1, m1, year] = singleMatch;
    const mm1 = ATC_MONTH_NUM[m1.slice(0, 3).toLowerCase()];
    if (!mm1) return null;
    const iso = `${year}-${mm1}-${String(d1).padStart(2, '0')}`;
    return {
      startDate: iso,
      endDate: iso,
      dateLabel: `${d1} ${m1} ${year}`,
    };
  }

  return null;
}

function atcVenueName(genericVenue) {
  if (!genericVenue) return null;
  if (typeof genericVenue === 'string') return genericVenue.trim() || null;
  return genericVenue.name || genericVenue.title || null;
}

function atcMediaUrl(media) {
  const path = media?.[0]?.url || media?.url;
  if (!path) return null;
  return path.startsWith('http') ? path : `${ATC_CMS}${path}`;
}

function atcRegionForVenue(venueName) {
  const venue = (venueName || '').toLowerCase();
  if (!venue || venue === 'online') return { region: null, regionAlias: null };
  if (/waterfront|wynyard|cbd|town hall|civic|aotea/i.test(venue)) {
    return { region: 'Central Auckland', regionAlias: 'Central-Auckland' };
  }
  return { region: 'Auckland', regionAlias: 'Central-Auckland' };
}

function normalizeAtcEvent(detail) {
  const p = detail.properties || {};
  if (p.hideFromWhatsOn) return null;

  const title = (p.eventHeading || detail.name || '').trim();
  if (!title) return null;

  const venueName = atcVenueName(p.genericVenue);
  if (/^online$/i.test(venueName || '')) return null;

  const dateText =
    p.dateRangeOverrideText ||
    (p.seoPageTitle || '').split('|').map((s) => s.trim())[1] ||
    '';
  const dates = parseAtcDateRange(dateText);
  if (!dates) return null;

  const today = atcTodayNz();
  if (dates.endDate < today) return null;

  const path = detail.route?.path || '';
  const url = path ? `${ATC_BASE}${path.replace(/\/$/, '')}` : ATC_WHATS_ON;
  const image = atcMediaUrl(p.eventImageForDesktop) || atcMediaUrl(p.ogShareImage);
  const categoryName =
    p.categories?.[0]?.name || p.labels?.[0]?.name || 'Theatre';
  const categoryAlias = categoryName.toLowerCase().replace(/\s+/g, '-');
  const { region, regionAlias } = atcRegionForVenue(venueName);
  const price = (p.priceRangeOverrideText || '').trim() || null;

  const event = {
    id: `atc-${detail.id}`,
    title,
    description: [
      p.eventSubheading ? stripHtml(p.eventSubheading).slice(0, 120) : null,
      venueName,
      p.eventStatus,
      stripHtml(p.eventDescription || '').slice(0, 140),
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url,
    image,
    dateLabel: dates.dateLabel,
    startDate: dates.startDate,
    endDate: dates.endDate,
    category: { name: categoryName, alias: categoryAlias },
    subcategories: (p.labels || []).map((l) => l.name).filter(Boolean),
    region,
    regionAlias,
    venueName,
    venueAddress: /waterfront/i.test(venueName || '')
      ? '2 Beaumont Street, Wynyard Quarter, Auckland'
      : null,
    groupName: p.eventPresenter || 'Auckland Theatre Company',
    attendees: null,
    rating: null,
    price,
    isFree: false,
    source: 'atc',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchAtcContentItem(id) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${ATC_API}/item/${id}`, {
      headers: { 'User-Agent': ATC_UA, Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return res.json();
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchAtcSeasonItems(seasonPath) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${ATC_API}?fetch=descendants:${seasonPath}&take=200`, {
      headers: { 'User-Agent': ATC_UA, Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const json = await res.json();
    return (json.items || []).filter((i) => i.contentType === 'eventDetail');
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchAtcEvents() {
  const seen = new Set();
  const listItems = [];

  for (const seasonPath of ATC_SEASON_PATHS) {
    const batch = await fetchAtcSeasonItems(seasonPath);
    for (const item of batch) {
      if (!item?.id || seen.has(item.id)) continue;
      seen.add(item.id);
      listItems.push(item);
    }
  }

  const details = await Promise.all(listItems.map((item) => fetchAtcContentItem(item.id)));
  const events = [];
  const eventSeen = new Set();

  for (const detail of details) {
    if (!detail?.id) continue;
    const event = normalizeAtcEvent(detail);
    if (!event || eventSeen.has(event.id)) continue;
    eventSeen.add(event.id);
    events.push(event);
  }

  return events;
}

function qTheatreTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function parseQTheatreDateRange(text) {
  const raw = (text || '').replace(/\s+/g, ' ').trim();
  if (!raw) return null;

  const rangeDashMonth = raw.match(/(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (rangeDashMonth) {
    const [, d1, d2, month, year] = rangeDashMonth;
    const mm = QTHEATRE_MONTH_NUM[month.toLowerCase()];
    if (!mm) return null;
    return {
      startDate: `${year}-${mm}-${String(d1).padStart(2, '0')}`,
      endDate: `${year}-${mm}-${String(d2).padStart(2, '0')}`,
      dateLabel: `${d1}-${d2} ${month} ${year}`,
    };
  }

  const rangeEnDash = raw.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (rangeEnDash) {
    const [, d1, d2, month, year] = rangeEnDash;
    const mm = QTHEATRE_MONTH_NUM[month.toLowerCase()];
    if (!mm) return null;
    return {
      startDate: `${year}-${mm}-${String(d1).padStart(2, '0')}`,
      endDate: `${year}-${mm}-${String(d2).padStart(2, '0')}`,
      dateLabel: `${d1} – ${d2} ${month} ${year}`,
    };
  }

  const crossMonth = raw.match(/(\d{1,2})\s+([A-Za-z]+)\s*[-–]\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (crossMonth) {
    const [, d1, m1, d2, m2, year] = crossMonth;
    const mm1 = QTHEATRE_MONTH_NUM[m1.toLowerCase()];
    const mm2 = QTHEATRE_MONTH_NUM[m2.toLowerCase()];
    if (!mm1 || !mm2) return null;
    return {
      startDate: `${year}-${mm1}-${String(d1).padStart(2, '0')}`,
      endDate: `${year}-${mm2}-${String(d2).padStart(2, '0')}`,
      dateLabel: `${d1} ${m1} – ${d2} ${m2} ${year}`,
    };
  }

  const single = raw.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (single) {
    const [, d1, month, year] = single;
    const mm = QTHEATRE_MONTH_NUM[month.toLowerCase()];
    if (!mm) return null;
    const iso = `${year}-${mm}-${String(d1).padStart(2, '0')}`;
    return {
      startDate: iso,
      endDate: iso,
      dateLabel: `${d1} ${month} ${year}`,
    };
  }

  return null;
}

function qTheatreCleanText(text) {
  return decodeHtmlEntities((text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function qTheatreTitleFromSlug(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function parseQTheatreEventBlock(block) {
  const path = block.match(/href="(\/shows\/[a-z0-9-]+)"/i)?.[1];
  if (!path) return null;

  const slug = path.replace('/shows/', '');
  if (QTHEATRE_SKIP_SLUGS.has(slug)) return null;

  const isSlat = /slat__title/.test(block);
  const dateText =
    block.match(/class="slat__date[^"]*"[^>]*>\s*([^<]+)/i)?.[1]?.trim() ||
    block.match(/class="node__date[^"]*"[^>]*>\s*([^<]+)/i)?.[1]?.trim();
  const title = qTheatreCleanText(
    block.match(/class="slat__title[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h2>/i)?.[1],
  );
  const category =
    block.match(/class="slat__term[^"]*"[\s\S]*?class="field__item">([^<]+)/i)?.[1]?.trim() ||
    block
      .match(/has--event-category--([a-z0-9-]+)/i)?.[1]
      ?.replace(/-/g, ' ');
  const description = qTheatreCleanText(
    block.match(/class="slat__body[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1],
  );
  const image = block.match(/src="(\/sites\/default\/files[^"]+)"/i)?.[1];

  return {
    slug,
    path,
    title: title || null,
    dateText: dateText || null,
    category: category || null,
    description: description || null,
    image: image || null,
    isSlat,
  };
}

function parseQTheatreShowsHtml(html) {
  const bySlug = new Map();

  for (const block of html.split('node--type-event').slice(1)) {
    const parsed = parseQTheatreEventBlock(block);
    if (!parsed) continue;

    const existing = bySlug.get(parsed.slug);
    if (!existing) {
      bySlug.set(parsed.slug, parsed);
      continue;
    }

    if (parsed.isSlat) {
      bySlug.set(parsed.slug, {
        ...existing,
        title: parsed.title || existing.title,
        dateText: parsed.dateText || existing.dateText,
        category: parsed.category || existing.category,
        description: parsed.description || existing.description,
        image: parsed.image || existing.image,
        isSlat: true,
      });
      continue;
    }

    bySlug.set(parsed.slug, {
      ...existing,
      title: existing.title || parsed.title,
      dateText: existing.dateText || parsed.dateText,
      category: existing.category || parsed.category,
      description: existing.description || parsed.description,
      image: existing.image || parsed.image,
    });
  }

  return [...bySlug.values()];
}

function normalizeQTheatreShow(raw) {
  const title = raw.title || qTheatreTitleFromSlug(raw.slug);
  const dates = parseQTheatreDateRange(raw.dateText);
  if (!title || !dates) return null;

  const today = qTheatreTodayNz();
  if (dates.endDate < today) return null;

  const categoryName = raw.category
    ? raw.category.charAt(0).toUpperCase() + raw.category.slice(1)
    : 'Theatre';
  const categoryAlias = raw.category || 'theatre';
  const image = raw.image
    ? raw.image.startsWith('http')
      ? raw.image
      : `${QTHEATRE_BASE}${raw.image}`
    : null;

  const event = {
    id: `qtheatre-${raw.slug}`,
    title,
    description: [categoryName, 'Q Theatre', raw.description].filter(Boolean).join(' · ').slice(0, 280),
    url: `${QTHEATRE_BASE}${raw.path}`,
    image,
    dateLabel: dates.dateLabel,
    startDate: dates.startDate,
    endDate: dates.endDate,
    category: { name: categoryName, alias: categoryAlias },
    subcategories: [categoryName],
    region: 'Central Auckland',
    regionAlias: 'Central-Auckland',
    venueName: 'Q Theatre',
    venueAddress: QTHEATRE_ADDRESS,
    groupName: 'Q Theatre',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'qtheatre',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchQTheatreEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(QTHEATRE_SHOWS, {
      headers: {
        'User-Agent': QTHEATRE_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const cards = parseQTheatreShowsHtml(html);
    const seen = new Set();
    const events = [];

    for (const raw of cards) {
      const event = normalizeQTheatreShow(raw);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function hltTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function hltIsoFromIcs(yyyymmdd) {
  if (!yyyymmdd || yyyymmdd.length !== 8) return null;
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
}

function hltSeasonDateLabel(seasonText) {
  if (!seasonText) return null;
  return decodeHtmlEntities(
    seasonText
      .replace(/<br\s*\/?>/gi, ' · ')
      .replace(/\s+/g, ' ')
      .replace(/^Season:\s*/i, '')
      .trim(),
  );
}

function parseHltCalendarHtml(html) {
  const cards = [];

  for (const block of html.split(/<h2 class="summary">/i).slice(1)) {
    const title = block.match(/<a class="url"[^>]*>([^<]+)</i)?.[1]?.trim();
    const path = block.match(/href="(\/whats-on\/events-calendar\/[a-z0-9-]+)/i)?.[1];
    if (!title || !path) continue;

    const slug = path.replace('/whats-on/events-calendar/', '').replace(/\/$/, '');
    if (HLT_SKIP_SLUGS.has(slug)) continue;

    const ics = block.match(/ics\/\d+\/(\d{8})T-(\d{8})T/i);
    const startDate = ics ? hltIsoFromIcs(ics[1]) : null;
    const endDate = ics ? hltIsoFromIcs(ics[2]) : startDate;
    const seasonRaw = block.match(/Season:\s*([\s\S]*?)<\/span>/i)?.[1];
    const dateLabel = hltSeasonDateLabel(seasonRaw) || startDate || 'Dates TBC';
    const description = decodeHtmlEntities(
      (block.match(/<\/span>\s*<\/div>\s*<\/div>\s*([\s\S]*?)\s*<a[^>]+>Read more/i)?.[1] || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    );

    cards.push({
      slug,
      title,
      path: `/whats-on/events-calendar/${slug}/`,
      startDate,
      endDate,
      dateLabel,
      description,
    });
  }

  return cards;
}

async function fetchHltShowMeta(slug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${HLT_BASE}/whats-on/events-calendar/${slug}/`, {
      headers: {
        'User-Agent': HLT_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return {};

    const html = await res.text();
    const imagePath = html.match(/<img[^>]+src="(\/assets\/Uploads\/[^"]+)"/i)?.[1];
    const playwright = html.match(/class="playwright">([^<]+)/i)?.[1]?.trim();
    const director = html
      .match(/Directed by\s+([^<]+)/i)?.[1]
      ?.replace(/<[^>]+>/g, '')
      .trim();

    return {
      image: imagePath ? `${HLT_BASE}${imagePath}` : null,
      playwright: playwright || null,
      director: director || null,
    };
  } catch {
    clearTimeout(timer);
    return {};
  }
}

function normalizeHltShow(raw, meta = {}) {
  if (!raw.title || !raw.startDate || !raw.endDate) return null;

  const today = hltTodayNz();
  if (raw.endDate < today) return null;

  const categoryName = /comedy/i.test(`${raw.title} ${raw.description} ${meta.playwright || ''}`)
    ? 'Comedy'
    : 'Theatre';
  const event = {
    id: `hlt-${raw.slug}`,
    title: raw.title,
    description: [
      meta.playwright,
      meta.director ? `Directed by ${meta.director}` : null,
      'Howick Little Theatre',
      raw.description,
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: `${HLT_BASE}${raw.path}`,
    image: meta.image || null,
    dateLabel: raw.dateLabel,
    startDate: raw.startDate,
    endDate: raw.endDate,
    category: { name: categoryName, alias: categoryName.toLowerCase() },
    subcategories: [categoryName, 'Community theatre'],
    region: 'East Auckland',
    regionAlias: 'East-Auckland',
    venueName: 'Howick Little Theatre',
    venueAddress: HLT_ADDRESS,
    groupName: 'Howick Little Theatre',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'hlt',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchHltEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(HLT_CALENDAR, {
      headers: {
        'User-Agent': HLT_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const cards = parseHltCalendarHtml(html);
    const metas = await Promise.all(cards.map((card) => fetchHltShowMeta(card.slug)));
    const seen = new Set();
    const events = [];

    for (let i = 0; i < cards.length; i += 1) {
      const event = normalizeHltShow(cards[i], metas[i] || {});
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function nytTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function nytCleanText(text) {
  return decodeHtmlEntities((text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function nytSlugFromTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function nytMonthRangeEndDay(mm) {
  if (mm === '02') return '28';
  if (['04', '06', '09', '11'].includes(mm)) return '30';
  return '31';
}

function parseNytMetaDateRange(meta) {
  const raw = nytCleanText(meta);
  const range = raw.match(/([A-Za-z]+)\s*[-–]\s*([A-Za-z]+)\s+(\d{4})/);
  if (range) {
    const [, m1, m2, year] = range;
    const mm1 = NYT_MONTH_NUM[m1.toLowerCase()];
    const mm2 = NYT_MONTH_NUM[m2.toLowerCase()];
    if (mm1 && mm2) {
      return {
        startDate: `${year}-${mm1}-01`,
        endDate: `${year}-${mm2}-${nytMonthRangeEndDay(mm2)}`,
        dateLabel: `${m1} – ${m2} ${year}`,
      };
    }
  }

  if (/tickets on sale/i.test(raw)) {
    const year = new Date().getFullYear();
    return {
      startDate: nytTodayNz(),
      endDate: `${year}-12-31`,
      dateLabel: raw.replace(/\s*•\s*/g, ' · '),
    };
  }

  return null;
}

function parseNytFeatureItems(html) {
  const items = [];
  const re = /<div class="nyt-feature-item\s+[^>]*>([\s\S]*?)(?=<div class="nyt-feature-item\s+|<section id=|<hr class="nyt-divider">)/gi;
  let match;

  while ((match = re.exec(html)) !== null) {
    const block = match[1];
    const meta = nytCleanText(block.match(/class="nyt-feature-item__meta"[^>]*>([\s\S]*?)<\/p>/i)?.[1]);
    if (!meta || !/auckland/i.test(meta)) continue;

    const title = nytCleanText(block.match(/<h4>([\s\S]*?)<\/h4>/i)?.[1]);
    if (!title) continue;

    const description = nytCleanText(block.match(/<h4>[\s\S]*?<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]);
    const imagePath = block.match(/<img[^>]+src="([^"]+)"/i)?.[1];
    const programmePath = block.match(/href="(\/programmes\/[a-z0-9-]+)"/i)?.[1];
    const ticketUrl = block.match(/href="(https?:\/\/[^"]+)"/i)?.[1];
    const slug = programmePath
      ? programmePath.replace('/programmes/', '').replace(/\/$/, '')
      : nytSlugFromTitle(title);

    items.push({
      slug,
      title,
      description,
      imagePath,
      programmePath,
      ticketUrl,
      meta,
      dates: parseNytMetaDateRange(meta),
    });
  }

  return items;
}

function parseNytProgrammeDates(html) {
  const publicIdx = html.search(/Public Performances:/i);
  const publicSection = publicIdx >= 0 ? html.slice(publicIdx, publicIdx + 600) : '';
  const yearMatch = html.match(/\b(20\d{2})\b/g);
  const defaultYear = yearMatch?.[yearMatch.length - 1] || String(new Date().getFullYear());
  const isoDates = [];

  for (const m of publicSection.matchAll(
    /(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)(?:\s+(\d{4}))?/gi,
  )) {
    const mm = NYT_MONTH_NUM[m[2].toLowerCase()];
    if (!mm) continue;
    const year = m[3] || defaultYear;
    isoDates.push(`${year}-${mm}-${String(m[1]).padStart(2, '0')}`);
  }

  if (!isoDates.length) return null;
  isoDates.sort();
  const first = isoDates[0];
  const last = isoDates[isoDates.length - 1];
  const fmt = (iso) => {
    const [, y, mo, d] = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/) || [];
    const monthName = Object.entries(NYT_MONTH_NUM).find(([, v]) => v === mo)?.[0];
    return monthName ? `${Number(d)} ${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${y}` : iso;
  };

  return {
    startDate: first,
    endDate: last,
    dateLabel:
      first === last ? `Performance ${fmt(first)}` : `Performances ${fmt(first)} – ${fmt(last)}`,
  };
}

function nytVenueFromHtml(html, fallbackText) {
  const text = `${html || ''} ${fallbackText || ''}`;
  if (/kiri te kanawa|aotea centre/i.test(text)) {
    return { venueName: 'Kiri Te Kanawa Theatre, Aotea Centre', venueAddress: NYT_AOTEA_ADDRESS };
  }
  if (/tapac/i.test(text)) {
    return {
      venueName: 'TAPAC Theatre',
      venueAddress: '100 Motions Road, Western Springs, Auckland',
    };
  }
  return { venueName: 'Aotea Centre', venueAddress: NYT_AOTEA_ADDRESS };
}

async function fetchNytProgrammeDetail(slug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${NYT_BASE}/programmes/${slug}`, {
      headers: {
        'User-Agent': NYT_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return {};

    const html = await res.text();
    const performanceDates = parseNytProgrammeDates(html);
    const venue = nytVenueFromHtml(html, '');
    const heroImage = html.match(/<img[^>]+class="[^"]*hero[^"]*"[^>]+src="([^"]+)"/i)?.[1]
      || html.match(/hero_images[\s\S]*?<img[^>]+src="([^"]+)"/i)?.[1]
      || html.match(/<img[^>]+src="(\/system\/programmes\/[^"]+)"/i)?.[1];

    return {
      performanceDates,
      venue,
      image: heroImage ? (heroImage.startsWith('http') ? heroImage : `${NYT_BASE}${heroImage}`) : null,
    };
  } catch {
    clearTimeout(timer);
    return {};
  }
}

function normalizeNytShow(raw, detail = {}) {
  const dates = detail.performanceDates || raw.dates;
  if (!raw.title || !dates?.startDate || !dates?.endDate) return null;

  const today = nytTodayNz();
  if (dates.endDate < today) return null;

  const venue = detail.venue || nytVenueFromHtml('', `${raw.title} ${raw.description} ${raw.meta}`);
  const image = detail.image
    || (raw.imagePath ? `${NYT_BASE}${raw.imagePath}` : null);
  const url = raw.programmePath
    ? `${NYT_BASE}${raw.programmePath}`
    : raw.ticketUrl || NYT_ONSTAGE;

  const event = {
    id: `nyt-${raw.slug}`,
    title: raw.title,
    description: [
      'OnStage',
      venue.venueName,
      raw.meta.replace(/\s*•\s*/g, ' · ').replace(/\s*\|\s*/g, ' · '),
      raw.description,
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url,
    image,
    dateLabel: dates.dateLabel,
    startDate: dates.startDate,
    endDate: dates.endDate,
    category: { name: 'Musical', alias: 'musical' },
    subcategories: ['OnStage', 'Youth theatre'],
    region: 'Central Auckland',
    regionAlias: 'Central-Auckland',
    venueName: venue.venueName,
    venueAddress: venue.venueAddress,
    groupName: 'National Youth Theatre',
    attendees: null,
    rating: null,
    price: null,
    isFree: false,
    source: 'nyt',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchNytEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(NYT_ONSTAGE, {
      headers: {
        'User-Agent': NYT_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const cards = parseNytFeatureItems(html);
    const seen = new Set();
    const events = [];

    for (const raw of cards) {
      if (seen.has(raw.slug)) continue;
      seen.add(raw.slug);

      const detail = raw.programmePath ? await fetchNytProgrammeDetail(raw.slug) : {};
      const event = normalizeNytShow(raw, detail);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function iticketXmlTag(block, name) {
  return block.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1]?.trim() || null;
}

function iticketCleanText(text) {
  return decodeHtmlEntities((text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function iticketTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function mapIticketRegion(cityName, venueName) {
  const combined = `${cityName || ''} ${venueName || ''}`.toLowerCase();
  if (/waiheke|great barrier|gulf/i.test(combined)) {
    return { region: 'Hauraki Gulf & Islands', alias: 'Hauraki-Gulf-&-Islands' };
  }
  if (/north shore|takapuna|devonport|albany|milford|birkenhead/i.test(combined)) {
    return { region: 'North Shore', alias: 'North-Shore' };
  }
  if (/howick|pakuranga|botany|east/i.test(combined)) {
    return { region: 'East Auckland', alias: 'East-Auckland' };
  }
  if (/manukau|papakura|pukekohe|otahuhu|manurewa|south/i.test(combined)) {
    return { region: 'South Auckland', alias: 'South-Auckland' };
  }
  if (/henderson|waitakere|west|new lynn|titirangi/i.test(combined)) {
    return { region: 'West Auckland', alias: 'West-Auckland' };
  }
  if (/hibiscus|orewa|whangaparaoa|warkworth/i.test(combined)) {
    return { region: 'Hibiscus Coast', alias: 'Hibiscus-Coast' };
  }
  return { region: 'Central Auckland', alias: 'Central-Auckland' };
}

function iticketCategory(genreId) {
  const name = ITICKET_GENRE_LABELS[Number(genreId)] || 'Live event';
  return { name, alias: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
}

function iticketPrice(cost) {
  if (!cost) return null;
  const n = parseFloat(cost);
  if (Number.isNaN(n) || n <= 0) return null;
  return n % 1 === 0 ? `From $${n.toFixed(0)}` : `From $${n.toFixed(2)}`;
}

function normalizeIticketEvent(block) {
  const eventId = iticketXmlTag(block, 'EventId');
  const title = iticketCleanText(iticketXmlTag(block, 'Name'));
  const regionName = iticketXmlTag(block, 'RegionName') || '';
  if (!eventId || !title || !/auckland/i.test(regionName)) return null;

  const startIso = iticketXmlTag(block, 'Date');
  const closeIso = iticketXmlTag(block, 'CloseSaleDate') || startIso;
  const startDate = startIso ? startIso.slice(0, 10) : null;
  const endDate = closeIso ? closeIso.slice(0, 10) : startDate;
  if (!startDate || !endDate) return null;

  const today = iticketTodayNz();
  if (endDate < today) return null;

  const cityName = iticketXmlTag(block, 'CityName');
  const venueName = iticketCleanText(iticketXmlTag(block, 'VenueName'));
  const { region, alias } = mapIticketRegion(cityName, venueName);
  const category = iticketCategory(iticketXmlTag(block, 'GenreId'));
  const webPath = iticketXmlTag(block, 'WebUrl');
  const url = webPath
    ? webPath.startsWith('http')
      ? webPath
      : `${ITICKET_BASE}${webPath}`
    : ITICKET_BASE;
  const image = iticketXmlTag(block, 'ImageUrl') || iticketXmlTag(block, 'BannerUrl');
  const cost = iticketXmlTag(block, 'Cost');
  const description = iticketCleanText(iticketXmlTag(block, 'Description'));
  const dateLabel =
    iticketCleanText(iticketXmlTag(block, 'DisplayDate')) ||
    iticketCleanText(iticketXmlTag(block, 'DisplayDateRange')) ||
    formatAucklandLiveDate(startIso, closeIso) ||
    'Dates TBC';

  const event = {
    id: `iticket-${eventId}`,
    title,
    description: [venueName, cityName, description].filter(Boolean).join(' · ').slice(0, 280),
    url,
    image,
    dateLabel,
    startDate,
    endDate,
    category,
    subcategories: cityName ? [cityName] : [],
    region,
    regionAlias: alias,
    venueName: venueName || null,
    venueAddress: null,
    groupName: 'iTicket',
    attendees: null,
    rating: null,
    price: iticketPrice(cost),
    isFree: cost != null && parseFloat(cost) <= 0,
    source: 'iticket',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchIticketEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(ITICKET_API, {
      headers: {
        'User-Agent': ITICKET_UA,
        Accept: 'application/xml,text/xml,*/*',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const xml = await res.text();
    const blocks = [...xml.matchAll(/<MobileActiveEvent>([\s\S]*?)<\/MobileActiveEvent>/g)].map((m) => m[1]);
    const seen = new Set();
    const events = [];

    for (const block of blocks) {
      const event = normalizeIticketEvent(block);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

function rnzbTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function parseRnzbNextData(html) {
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function discoverRnzbSlugs(html) {
  const slugs = new Set(RNZB_SEED_SLUGS);
  const data = parseRnzbNextData(html);
  const tq = data?.props?.pageProps?.__TEMPLATE_QUERY_DATA__ || {};

  for (const edge of tq.shows?.edges || []) {
    if (edge?.node?.slug) slugs.add(edge.node.slug);
  }
  for (const node of tq.themeGeneralSettings?.showSettings?.mainShow?.nodes || []) {
    if (node?.slug) slugs.add(node.slug);
  }
  for (const node of tq.nodeByUri?.homepageFields?.headerContent?.headerShow?.nodes || []) {
    if (node?.slug) slugs.add(node.slug);
  }

  for (const m of html.matchAll(/\/show\/([a-z0-9-]+)/gi)) {
    slugs.add(m[1]);
  }

  return [...slugs];
}

function rnzbAucklandSessions(show) {
  const sessions = show?.showSessions?.sessions?.nodes || [];
  const auckland = [];

  for (const session of sessions) {
    const opts = session.sessionOptions || {};
    if (opts.cancelled) continue;

    const city = opts.location?.node?.locationOptions?.city || '';
    const venue = opts.location?.node?.title || '';
    const locationText = `${city} ${venue}`;
    if (!RNZB_AUCKLAND_KEYWORDS.test(locationText)) continue;

    const dateIso = opts.date;
    if (!dateIso) continue;

    auckland.push({
      date: dateIso.slice(0, 10),
      venue,
      city,
      ticketUrl: opts.ticketLink || null,
      soldOut: !!opts.soldOut,
    });
  }

  return auckland;
}

function mapRnzbRegion(city, venue) {
  const combined = `${city || ''} ${venue || ''}`.toLowerCase();
  if (/takapuna|north shore|bruce mason|devonport/i.test(combined)) {
    return { region: 'North Shore', alias: 'North-Shore' };
  }
  return { region: 'Central Auckland', alias: 'Central-Auckland' };
}

function rnzbShowImage(show) {
  const fields = show.showFields || {};
  return (
    fields.showThumbnail?.node?.sourceUrl ||
    fields.showThumbnail?.node?.mediaItemUrl ||
    fields.headerImage?.node?.sourceUrl ||
    fields.headerImage?.node?.mediaItemUrl ||
    show.seoFields?.metaImage?.node?.sourceUrl ||
    null
  );
}

function rnzbDateLabel(startDate, endDate) {
  if (!startDate) return 'Dates TBC';
  try {
    const start = new Date(`${startDate}T12:00:00`);
    const end = endDate && endDate !== startDate ? new Date(`${endDate}T12:00:00`) : null;
    const fmt = (d) =>
      d.toLocaleString('en-NZ', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Pacific/Auckland',
      });
    if (end) return `${fmt(start)} – ${fmt(end)}`;
    return fmt(start);
  } catch {
    return startDate;
  }
}

function normalizeRnzbShow(show) {
  const fields = show.showFields || {};
  const slug = show.slug;
  const title = fields.showTitle || slug;
  if (!slug || !title) return null;

  const aucklandSessions = rnzbAucklandSessions(show);
  if (!aucklandSessions.length) return null;

  const today = rnzbTodayNz();
  const futureSessions = aucklandSessions.filter((s) => s.date >= today);
  if (!futureSessions.length) return null;

  const dates = futureSessions.map((s) => s.date).sort();
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];
  const venues = [...new Set(futureSessions.map((s) => s.venue).filter(Boolean))];
  const venueName = venues.join(' · ');
  const primaryCity = futureSessions[0].city || 'Auckland';
  const { region, alias } = mapRnzbRegion(primaryCity, venueName);
  const ticketUrl = futureSessions.find((s) => s.ticketUrl)?.ticketUrl;
  const soldOut = futureSessions.every((s) => s.soldOut);
  const categories = fields.showCategory || ['Ballet'];
  const categoryName = categories[0] || 'Ballet';
  const description = stripHtml(fields.showDescriptionCopy || fields.showDescription || '').slice(0, 220);
  const venueAddress = /kiri te kanawa|aotea/i.test(venueName) ? RNZB_AOTEA_ADDRESS : null;

  const event = {
    id: `rnzb-${slug}`,
    title,
    description: ['Royal New Zealand Ballet', venueName, primaryCity, description]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: ticketUrl || `${RNZB_BASE}/show/${slug}`,
    image: rnzbShowImage(show),
    dateLabel: rnzbDateLabel(startDate, endDate),
    startDate,
    endDate,
    category: {
      name: /family|dazzlehands/i.test(`${title} ${categoryName}`) ? 'Family ballet' : 'Ballet',
      alias: 'ballet',
    },
    subcategories: categories,
    region,
    regionAlias: alias,
    venueName,
    venueAddress,
    groupName: 'Royal New Zealand Ballet',
    attendees: null,
    rating: null,
    price: soldOut ? 'Sold out' : 'Via Ticketmaster',
    isFree: false,
    source: 'rnzb',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchRnzbShowPage(slug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${RNZB_BASE}/show/${slug}`, {
      headers: {
        'User-Agent': RNZB_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;

    const html = await res.text();
    const data = parseRnzbNextData(html);
    return data?.props?.pageProps?.__TEMPLATE_QUERY_DATA__?.show || null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

function basementTodayNz() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
}

function parseBasementWhatsOnHandles(html) {
  const handles = new Set();
  for (const m of html.matchAll(/\/blogs\/whats-on\/([a-z0-9-]+)/gi)) {
    const handle = m[1];
    if (handle && handle !== 'whats-on' && handle !== 'tagged') handles.add(handle);
  }
  return [...handles];
}

function basementMonthNum(token) {
  return BASEMENT_MONTH_NUM[(token || '').toLowerCase().replace(/\./g, '')] || null;
}

function parseBasementDateRange(str) {
  if (!str) return null;
  const cleaned = str.replace(/\u2013/g, '-').trim();
  const range = cleaned.match(
    /(\d{1,2})\s+([A-Za-z]+)\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i
  );
  if (range) {
    const [, d1, m1, d2, m2, y] = range;
    const mm1 = basementMonthNum(m1);
    const mm2 = basementMonthNum(m2);
    if (!mm1 || !mm2) return null;
    return {
      startDate: `${y}-${mm1}-${d1.padStart(2, '0')}`,
      endDate: `${y}-${mm2}-${d2.padStart(2, '0')}`,
      dateLabel: cleaned,
    };
  }
  const single = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i);
  if (single) {
    const [, d, m, y] = single;
    const mm = basementMonthNum(m);
    if (!mm) return null;
    const iso = `${y}-${mm}-${d.padStart(2, '0')}`;
    return { startDate: iso, endDate: iso, dateLabel: cleaned };
  }
  return null;
}

function parseBasementArticleDates(html) {
  const patterns = [
    /\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*[-–]\s*\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}/i,
    /\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const parsed = parseBasementDateRange(match[0].replace(/\u2013/g, '-'));
      if (parsed) return parsed;
    }
  }
  return null;
}

function parseBasementArticle(html, handle) {
  const title =
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || handle;
  const ticketUrl = html.match(/https?:\/\/www\.iticket\.co\.nz\/events\/[^"'\s?#]+/i)?.[0] || null;
  const blogUrl = `${BASEMENT_WHATS_ON}/${handle}`;
  const imageMatch = html.match(
    /(?:src|srcset)="(\/\/basementtheatre\.co\.nz\/cdn\/shop\/articles\/[^"?\s]+\.(?:jpg|png|webp)[^"]*)"/i
  );
  const image = imageMatch
    ? `https:${imageMatch[1].split(/\s/)[0].replace(/&amp;/g, '&')}`
    : null;
  const summary = stripHtml(
    html.match(/<div[^>]*class="[^"]*rte[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] ||
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ||
      ''
  ).slice(0, 220);
  const tags = [
    ...new Set(
      (html.match(/"tags":\[([^\]]+)\]/)?.[1] || '')
        .split(',')
        .map((t) => t.replace(/"/g, '').trim())
        .filter(Boolean)
    ),
  ];
  const dates = parseBasementArticleDates(html);

  return { handle, title, ticketUrl, blogUrl, image, summary, tags, dates };
}

async function fetchIticketBasementLookup() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(ITICKET_API, {
      headers: {
        'User-Agent': ITICKET_UA,
        Accept: 'application/xml,text/xml,*/*',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return new Map();

    const xml = await res.text();
    const blocks = [...xml.matchAll(/<MobileActiveEvent>([\s\S]*?)<\/MobileActiveEvent>/g)].map((m) => m[1]);
    const map = new Map();

    for (const block of blocks) {
      const venue = iticketCleanText(iticketXmlTag(block, 'VenueName'));
      if (!/basement theatre/i.test(venue)) continue;

      const webPath = iticketXmlTag(block, 'WebUrl');
      const startIso = iticketXmlTag(block, 'Date');
      const displayRange = iticketCleanText(iticketXmlTag(block, 'DisplayDateRange'));
      const rangeDates = parseBasementDateRange(displayRange);
      const startDate = rangeDates?.startDate || (startIso ? startIso.slice(0, 10) : null);
      const endDate = rangeDates?.endDate || startDate;
      const entry = {
        eventId: iticketXmlTag(block, 'EventId'),
        title: iticketCleanText(iticketXmlTag(block, 'Name')),
        venue,
        startDate,
        endDate,
        dateLabel:
          displayRange ||
          iticketCleanText(iticketXmlTag(block, 'DisplayDate')) ||
          null,
        image: iticketXmlTag(block, 'ImageUrl') || iticketXmlTag(block, 'BannerUrl'),
        price: iticketPrice(iticketXmlTag(block, 'Cost')),
        isFree: parseFloat(iticketXmlTag(block, 'Cost') || '1') <= 0,
        description: iticketCleanText(iticketXmlTag(block, 'Description')),
        ticketUrl: webPath
          ? webPath.startsWith('http')
            ? webPath
            : `${ITICKET_BASE}${webPath}`
          : null,
      };

      if (webPath) {
        map.set(webPath.toLowerCase(), entry);
        map.set(entry.ticketUrl?.toLowerCase(), entry);
      }
    }

    return map;
  } catch {
    clearTimeout(timer);
    return new Map();
  }
}

function normalizeBasementShow(article, iticket) {
  const today = basementTodayNz();
  const startDate = article.dates?.startDate || iticket?.startDate;
  const endDate = article.dates?.endDate || iticket?.endDate || startDate;
  if (!startDate || !endDate || endDate < today) return null;

  const title = article.title || iticket?.title;
  if (!title) return null;

  const ticketUrl = article.ticketUrl || iticket?.ticketUrl;
  const venueName = iticket?.venue || 'Basement Theatre';
  const categoryName = /comedy|improv|stand[- ]?up/i.test(`${title} ${article.summary}`)
    ? 'Comedy'
    : /dance|physical/i.test(`${title} ${article.summary}`)
      ? 'Dance'
      : 'Theatre';

  const event = {
    id: `basement-${article.handle}`,
    title,
    description: [venueName, 'Grey Lynn', article.summary || iticket?.description]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 280),
    url: ticketUrl || article.blogUrl || BASEMENT_TICKETS,
    image: article.image || iticket?.image || null,
    dateLabel: iticket?.dateLabel || article.dates?.dateLabel || rnzbDateLabel(startDate, endDate),
    startDate,
    endDate,
    category: {
      name: categoryName,
      alias: categoryName.toLowerCase(),
    },
    subcategories: article.tags.length ? article.tags : ['Basement Theatre'],
    region: /studio|takapuna/i.test(venueName) ? 'North Shore' : 'Central Auckland',
    regionAlias: /studio|takapuna/i.test(venueName) ? 'North-Shore' : 'Central-Auckland',
    venueName,
    venueAddress: BASEMENT_ADDRESS,
    groupName: 'Basement Theatre',
    attendees: null,
    rating: null,
    price: iticket?.price || 'Via iTicket',
    isFree: !!iticket?.isFree,
    source: 'basement',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchBasementArticlePage(handle) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${BASEMENT_WHATS_ON}/${handle}`, {
      headers: {
        'User-Agent': BASEMENT_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return parseBasementArticle(await res.text(), handle);
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchBasementEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);

  try {
    const [listRes, iticketLookup] = await Promise.all([
      fetch(BASEMENT_WHATS_ON, {
        headers: {
          'User-Agent': BASEMENT_UA,
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
      }),
      fetchIticketBasementLookup(),
    ]);
    clearTimeout(timer);
    if (!listRes.ok) return [];

    const handles = parseBasementWhatsOnHandles(await listRes.text());
    const seen = new Set();
    const events = [];

    for (const handle of handles) {
      const article = await fetchBasementArticlePage(handle);
      if (!article) continue;

      const iticket = article.ticketUrl
        ? iticketLookup.get(article.ticketUrl.toLowerCase()) ||
          iticketLookup.get(
            article.ticketUrl.replace(ITICKET_BASE, '').toLowerCase()
          )
        : null;

      const event = normalizeBasementShow(article, iticket);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchRnzbEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(RNZB_WHATS_ON, {
      headers: {
        'User-Agent': RNZB_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    const discoveryHtml = res.ok ? await res.text() : '';
    const homeRes = await fetch(RNZB_BASE, {
      headers: {
        'User-Agent': RNZB_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    const homeHtml = homeRes.ok ? await homeRes.text() : '';
    const slugs = new Set([...discoverRnzbSlugs(discoveryHtml), ...discoverRnzbSlugs(homeHtml)]);

    const seen = new Set();
    const events = [];

    for (const slug of slugs) {
      const show = await fetchRnzbShowPage(slug);
      if (!show) continue;
      const event = normalizeRnzbShow(show);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchEventfindaEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(EVENTFINDA_AUCKLAND, {
      headers: {
        'User-Agent': EVENTFINDA_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const cards = parseEventfindaHtml(html);
    const seen = new Set();
    const events = [];

    for (const raw of cards) {
      const event = normalizeEventfindaCard(raw);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchEventbriteEvents() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(EVENTBRITE_AUCKLAND, {
      headers: {
        'User-Agent': EVENTBRITE_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const html = await res.text();
    const data = parseEventbriteServerData(html);
    if (!data) return [];

    const seen = new Set();
    const events = [];

    for (const bucket of data.buckets || []) {
      if (bucket.key === 'online_events') continue;
      for (const raw of bucket.events || []) {
        const event = normalizeEventbriteBucketEvent(raw, bucket.key);
        if (!event || seen.has(event.id)) continue;
        seen.add(event.id);
        events.push(event);
      }
    }

    const jsonldItems = data.jsonld?.[0]?.itemListElement || [];
    for (const el of jsonldItems) {
      const event = normalizeEventbriteJsonLdItem(el.item);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }

    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchEdenParkEvents() {
  const params = new URLSearchParams({
    categories: String(EDEN_PARK_EVENTS_CATEGORY),
    per_page: '100',
    _embed: '1',
    status: 'publish',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${EDEN_PARK_BASE}/wp-json/wp/v2/posts?${params}`, {
      headers: { 'User-Agent': EDEN_PARK_UA, Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const posts = await res.json();
    if (!Array.isArray(posts)) return [];

    const seen = new Set();
    const events = [];
    for (const raw of posts) {
      const event = normalizeEdenParkPost(raw);
      if (!event || seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(event);
    }
    return events;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchMeetupEvents({ meetupCategory }) {
  const categories = meetupCategory ? [meetupCategory] : MEETUP_FETCH_CATEGORIES;
  const batches = await Promise.all(categories.map((c) => fetchMeetupPage(c)));

  const seen = new Set();
  const events = [];
  for (const batch of batches) {
    for (const e of batch) {
      if (seen.has(e.id)) continue;
      seen.add(e.id);
      events.push(e);
    }
  }
  return events;
}

function normalizeEvent(raw) {
  const dates = raw.Date?.Value || [];
  const start = parseNzDate(dates[0]);
  const end = parseNzDate(dates[1] || dates[0]);
  const image = raw.MobileImage || raw.DesktopImage || raw.Image || null;

  const event = {
    id: raw.NodeGUID,
    title: raw.Title,
    description: (raw.Description || '').trim(),
    url: raw.URL ? `${AUCKLANDNZ_BASE}${raw.URL}` : `${AUCKLANDNZ_BASE}/events`,
    image: image ? `${AUCKLANDNZ_BASE}${image}` : null,
    dateLabel: stripHtml(raw.DateHTML),
    startDate: start ? start.toISOString().slice(0, 10) : null,
    endDate: end ? end.toISOString().slice(0, 10) : null,
    category: {
      name: raw.Category?.CategoryName || 'Event',
      alias: raw.Category?.NodeAlias || '',
    },
    subcategories: (raw.SubCategories || []).map((s) => s.SubCategoryName).filter(Boolean),
    region: raw.Region?.RegionName || null,
    regionAlias: raw.Region?.NodeAlias || null,
    price: raw.Price || null,
    isFree: !raw.Price || /^free$/i.test(raw.Price.trim()),
    sticker: raw.StickerText || null,
    totalInCategory: raw.TotalCount || null,
    source: 'aucklandnz',
  };

  event.hospitalityScore = scoreHospitality(event);
  event.hospitalityRelevant = event.hospitalityScore >= 2;
  return event;
}

async function fetchCategoryEvents(category, startDate) {
  const params = new URLSearchParams({ isLiveSite: 'True', category });
  if (startDate) params.set('startDate', startDate);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(`${AUCKLANDNZ_BASE}/api/events/get?${params}`, {
      headers: { 'User-Agent': AUCKLANDNZ_UA, Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.value || [];
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function fetchAucklandNzEventList({ category, region, startDate }) {
  const categories = category ? [category] : EVENT_CATEGORIES;
  const batches = await Promise.all(categories.map((c) => fetchCategoryEvents(c, startDate)));

  const seen = new Set();
  const events = [];
  for (const batch of batches) {
    for (const raw of batch) {
      if (!raw.NodeGUID || seen.has(raw.NodeGUID)) continue;
      seen.add(raw.NodeGUID);
      events.push(normalizeEvent(raw));
    }
  }

  if (region) return events.filter((e) => e.regionAlias === region);
  return events;
}

function filterAndSortEvents(events, { q, hospitality }) {
  let result = events;

  if (hospitality === '1' || hospitality === 'true') {
    result = result.filter((e) => e.hospitalityRelevant);
  }

  if (q) {
    const needle = q.toLowerCase();
    result = result.filter((e) => {
      const hay = `${e.title} ${e.description} ${e.category.name} ${e.region || ''} ${e.subcategories.join(' ')} ${e.groupName || ''} ${e.venueName || ''}`.toLowerCase();
      return hay.includes(needle);
    });
  }

  return result.sort((a, b) => {
    if (a.hospitalityScore !== b.hospitalityScore) return b.hospitalityScore - a.hospitalityScore;
    if (a.startDate && b.startDate) return a.startDate.localeCompare(b.startDate);
    return a.title.localeCompare(b.title);
  });
}

async function fetchCombinedEvents(opts) {
  const { source, category, region, q, hospitality, startDate, meetupCategory } = opts;
  const key = cacheKey({ type: 'events-v31', ...opts });
  const cached = getCached(key);
  if (cached) return cached;

  const tasks = [];
  if (!source || source === 'all' || source === 'aucklandnz') {
    tasks.push(fetchAucklandNzEventList({ category, region, startDate }));
  }
  if (!source || source === 'all' || source === 'meetup') {
    tasks.push(fetchMeetupEvents({ meetupCategory }));
  }
  if (!source || source === 'all' || source === 'aucklandlive') {
    tasks.push(fetchAucklandLiveEvents());
  }
  if (!source || source === 'all' || source === 'ticketmaster') {
    tasks.push(fetchTicketmasterEvents());
  }
  if (!source || source === 'all' || source === 'sparkarena') {
    tasks.push(fetchSparkArenaEvents());
  }
  if (!source || source === 'all' || source === 'edenpark') {
    tasks.push(fetchEdenParkEvents());
  }
  if (!source || source === 'all' || source === 'eventbrite') {
    tasks.push(fetchEventbriteEvents());
  }
  if (!source || source === 'all' || source === 'eventfinda') {
    tasks.push(fetchEventfindaEvents());
  }
  if (!source || source === 'all' || source === 'humanitix') {
    tasks.push(fetchHumanitixEvents());
  }
  if (!source || source === 'all' || source === 'cheeky') {
    tasks.push(fetchCheekyEvents());
  }
  if (!source || source === 'all' || source === 'aucklandforkids') {
    tasks.push(fetchAucklandForKidsEvents());
  }
  if (!source || source === 'all' || source === 'fever') {
    tasks.push(fetchFeverEvents());
  }
  if (!source || source === 'all' || source === 'tripadvisor') {
    tasks.push(fetchTripAdvisorEvents());
  }
  if (!source || source === 'all' || source === 'eventcinemas') {
    tasks.push(fetchEventCinemasEvents());
  }
  if (!source || source === 'all' || source === 'hoyts') {
    tasks.push(fetchHoytsEvents());
  }
  if (!source || source === 'all' || source === 'rialto') {
    tasks.push(fetchRialtoEvents());
  }
  if (!source || source === 'all' || source === 'duedrop') {
    tasks.push(fetchDueDropEvents());
  }
  if (!source || source === 'all' || source === 'nightmarkets') {
    tasks.push(fetchNightMarketsEvents());
  }
  if (!source || source === 'all' || source === 'ftc') {
    tasks.push(fetchFtcEvents());
  }
  if (!source || source === 'all' || source === 'acbmarkets') {
    tasks.push(fetchAcbMarketsEvents());
  }
  if (!source || source === 'all' || source === 'opencircle') {
    tasks.push(fetchOpenCircleEvents());
  }
  if (!source || source === 'all' || source === 'aucklandmarket') {
    tasks.push(fetchAucklandMarketEvents());
  }
  if (!source || source === 'all' || source === 'touristtrip') {
    tasks.push(fetchTouristTripPlannerEvents());
  }
  if (!source || source === 'all' || source === 'atc') {
    tasks.push(fetchAtcEvents());
  }
  if (!source || source === 'all' || source === 'qtheatre') {
    tasks.push(fetchQTheatreEvents());
  }
  if (!source || source === 'all' || source === 'hlt') {
    tasks.push(fetchHltEvents());
  }
  if (!source || source === 'all' || source === 'nyt') {
    tasks.push(fetchNytEvents());
  }
  if (!source || source === 'all' || source === 'iticket') {
    tasks.push(fetchIticketEvents());
  }
  if (!source || source === 'all' || source === 'rnzb') {
    tasks.push(fetchRnzbEvents());
  }
  if (!source || source === 'all' || source === 'basement') {
    tasks.push(fetchBasementEvents());
  }

  const batches = await Promise.all(tasks);
  let events = crossSourceDedupe(batches.flat());
  events = filterAndSortEvents(events, { q, hospitality });

  if (source && source !== 'all') {
    events = events.filter((e) => e.source === source);
  }

  const sources = [];
  if (!source || source === 'all' || source === 'aucklandnz') sources.push('AucklandNZ');
  if (!source || source === 'all' || source === 'meetup') sources.push('Meetup');
  if (!source || source === 'all' || source === 'aucklandlive') sources.push('Auckland Live');
  if (!source || source === 'all' || source === 'ticketmaster') sources.push('Ticketmaster');
  if (!source || source === 'all' || source === 'sparkarena') sources.push('Spark Arena');
  if (!source || source === 'all' || source === 'edenpark') sources.push('Eden Park');
  if (!source || source === 'all' || source === 'eventbrite') sources.push('Eventbrite');
  if (!source || source === 'all' || source === 'eventfinda') sources.push('Eventfinda');
  if (!source || source === 'all' || source === 'humanitix') sources.push('Humanitix');
  if (!source || source === 'all' || source === 'cheeky') sources.push('Cheeky Events');
  if (!source || source === 'all' || source === 'aucklandforkids') sources.push('Auckland for Kids');
  if (!source || source === 'all' || source === 'fever') sources.push('Fever');
  if (!source || source === 'all' || source === 'tripadvisor') sources.push('TripAdvisor');
  if (!source || source === 'all' || source === 'eventcinemas') sources.push('Event Cinemas');
  if (!source || source === 'all' || source === 'hoyts') sources.push('HOYTS');
  if (!source || source === 'all' || source === 'rialto') sources.push('Rialto');
  if (!source || source === 'all' || source === 'duedrop') sources.push('Due Drop');
  if (!source || source === 'all' || source === 'nightmarkets') sources.push('Night Markets');
  if (!source || source === 'all' || source === 'ftc') sources.push('Food Truck Collective');
  if (!source || source === 'all' || source === 'acbmarkets') sources.push('ACB Markets');
  if (!source || source === 'all' || source === 'opencircle') sources.push('Open Circle');
  if (!source || source === 'all' || source === 'aucklandmarket') sources.push('Auckland Markets');
  if (!source || source === 'all' || source === 'touristtrip') sources.push('Trip Planner');
  if (!source || source === 'all' || source === 'atc') sources.push('ATC');
  if (!source || source === 'all' || source === 'qtheatre') sources.push('Q Theatre');
  if (!source || source === 'all' || source === 'hlt') sources.push('HLT');
  if (!source || source === 'all' || source === 'nyt') sources.push('NYT');
  if (!source || source === 'all' || source === 'iticket') sources.push('iTicket');
  if (!source || source === 'all' || source === 'rnzb') sources.push('RNZB');
  if (!source || source === 'all' || source === 'basement') sources.push('Basement Theatre');

  const sourceUrls = {
    meetup: MEETUP_FIND,
    aucklandlive: `${AUCKLAND_LIVE_BASE}/search/events?date=`,
    ticketmaster: TICKETMASTER_DISCOVER,
    sparkarena: SPARKARENA_EVENTS,
    edenpark: EDEN_PARK_EVENTS_URL,
    eventbrite: EVENTBRITE_AUCKLAND,
    eventfinda: EVENTFINDA_AUCKLAND,
    humanitix: HUMANITIX_NZ,
    cheeky: CHEEKY_AUCKLAND,
    aucklandforkids: AFK_TODAY,
    fever: FEVER_AUCKLAND,
    tripadvisor: TRIPADVISOR_EVENTS,
    eventcinemas: EVENTCINEMAS_FESTIVALS,
    hoyts: HOYTS_EVENTS,
    rialto: RIALTO_NEWMARKET,
    duedrop: DUEDROP_WHATS_ON,
    nightmarkets: NIGHTMARKETS_LOCATIONS,
    ftc: FTC_EVENTS,
    acbmarkets: ACB_MARKETS,
    opencircle: OCM_HOME,
    aucklandmarket: AMN_HOME,
    touristtrip: TTP_AUCKLAND_MARKETS,
    atc: ATC_WHATS_ON,
    qtheatre: QTHEATRE_SHOWS,
    hlt: HLT_CALENDAR,
    nyt: NYT_ONSTAGE,
    iticket: ITICKET_BASE,
    rnzb: RNZB_WHATS_ON,
    basement: BASEMENT_TICKETS,
    aucklandnz: `${AUCKLANDNZ_BASE}/events`,
  };

  const payload = {
    events,
    count: events.length,
    source: sources.join(' + '),
    sourceUrl: sourceUrls[source] || `${AUCKLANDNZ_BASE}/events`,
    attribution:
      'AucklandNZ + Meetup + Auckland Live + ATC + Q Theatre + HLT + NYT + iTicket + RNZB + Basement Theatre + Ticketmaster + Spark Arena + Eden Park + Eventbrite + Eventfinda + Humanitix + Cheeky Events + Auckland for Kids + Fever + TripAdvisor + Event Cinemas + HOYTS + Rialto + Due Drop + Night Markets + Food Truck Collective + ACB Markets + Open Circle + Auckland Markets + Trip Planner — confirm council permits before trading at venues',
    fetchedAt: new Date().toISOString(),
  };

  setCache(key, payload);
  return payload;
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=1800',
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/api/resources') {
    const type = url.searchParams.get('type') || '';
    const q = (url.searchParams.get('q') || '').toLowerCase().trim();

    let items = RESOURCES;
    if (type) items = items.filter((r) => r.types.includes(type));
    if (q) {
      items = items.filter((r) => {
        const hay = `${r.title} ${r.summary} ${r.category} ${r.types.join(' ')}`.toLowerCase();
        return hay.includes(q);
      });
    }

    sendJson(res, 200, {
      resources: items,
      count: items.length,
      source: 'Auckland Council hospitality & food business guides',
      sourceUrl:
        'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading.html',
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/contacts') {
    sendJson(res, 200, { contacts: CONTACTS, count: CONTACTS.length });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/events') {
    fetchCombinedEvents({
      source: url.searchParams.get('source') || 'all',
      category: url.searchParams.get('category') || '',
      region: url.searchParams.get('region') || '',
      meetupCategory: url.searchParams.get('meetupCategory') || '',
      q: (url.searchParams.get('q') || '').toLowerCase().trim(),
      hospitality: url.searchParams.get('hospitality') || '',
      startDate: url.searchParams.get('startDate') || '',
    })
      .then((payload) => sendJson(res, 200, payload))
      .catch((err) => {
        console.error('/api/events error:', err.message);
        sendJson(res, 500, { error: err.message || 'Failed to fetch events' });
      });
    return;
  }

  let filePath = path.join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Hospitality Guide running at http://localhost:${PORT}`);
  console.log('Resources API: /api/resources?type=food-truck&q=registration');
  console.log('Contacts API: /api/contacts');
  console.log('Events API: /api/events (AucklandNZ + Meetup + Auckland Live + Ticketmaster + Eden Park + Eventbrite + Eventfinda + Humanitix)');
  console.log('Advertise: Meta Business Suite campaign wizard (static)');
});