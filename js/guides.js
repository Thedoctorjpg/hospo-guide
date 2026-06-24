const GUIDES = [
  {
    id: 'food-truck-start',
    title: 'Start a food truck or coffee cart',
    emoji: '🚚',
    types: ['food-truck'],
    summary: 'Auckland Council\'s mobile food business path — registration first, then trading licence and unit compliance.',
    steps: [
      'Use MPI My Food Rules to choose a Food Control Plan (high-risk food) or National Programme (many coffee carts).',
      'Apply for food registration online — include Scope of Operations and site/unit plan.',
      'Meet Auckland Council before applying for a mobile trading licence — know where you can trade.',
      'Fit out your unit: current EWOF, gas safety certificate if using LPG, wastewater holding tank and approved disposal.',
      'Arrange verification within six weeks of opening — email hosposupport for a pre-verification checklist.',
      'If trading in a park, apply separately for a public land / park trading permit.',
    ],
    tip: 'Coffee carts often qualify for a National Programme; trucks cooking meat and dairy usually need a Food Control Plan.',
    links: [
      { label: 'Start a food truck guide', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/starting-food-truck.html' },
      { label: 'Mobile trading licence', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/mobile-traders/open-a-mobile-trading-business.html' },
    ],
  },
  {
    id: 'cafe-start',
    title: 'Start a cafe or restaurant',
    emoji: '☕',
    types: ['cafe'],
    summary: 'Fixed-site hospitality — food registration, kitchen compliance, and optional alcohol and outdoor dining.',
    steps: [
      'Confirm whether you need building or resource consents for fit-out — call 09 301 0101 (planning helpdesk).',
      'Register under a template Food Control Plan (most restaurants) via Auckland Council online.',
      'Design your kitchen to meet food safety regulations — ventilation, plumbing, wastewater, equipment layout.',
      'Book verification within six weeks of opening; request a pre-verification checklist from hosposupport.',
      'If serving alcohol on-site: apply for an on-licence and ensure a Manager\'s Certificate holder is on staff.',
      'For footpath or outdoor seating: apply for an outdoor dining licence before customers eat outside.',
    ],
    tip: 'Taking over an existing venue? Registration does not automatically transfer — see the takeover guide.',
    links: [
      { label: 'Start a cafe or restaurant', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/start-cafe-restaurant.html' },
      { label: 'Site requirements', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-business-sites-codes-of-practice.html' },
    ],
  },
  {
    id: 'food-registration',
    title: 'Food registration step-by-step',
    emoji: '📋',
    types: ['food-truck', 'cafe', 'stall', 'home-based'],
    summary: 'The core Food Act 2014 registration process for any commercial food business in Auckland.',
    steps: [
      'Check consents: resource consent, mobile trading, alcohol, or outdoor dining if applicable.',
      'Run My Food Rules (MPI) to pick Food Control Plan template or National Programme 1/2/3.',
      'Complete the matching Scope of Operations document from MPI.',
      'Prepare a site plan showing physical boundaries and layout (new businesses).',
      'If using a third-party verifier, get their confirmation letter before applying.',
      'Apply and pay online — allow up to 25 working days. Renew before expiry; expired registrations require re-registration.',
    ],
    tip: 'Pay the full registration fee before processing. Verification costs are invoiced separately after your first visit.',
    links: [
      { label: 'Apply for food registration', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/apply-food-registration.html' },
      { label: 'Apply online', url: 'https://onlineservices.aucklandcouncil.govt.nz/councilonline/yform/food?productCode=FOODACT&viewStatus=new&licenceType=FOOD_ACT' },
    ],
  },
  {
    id: 'verification',
    title: 'Verification & food grades',
    emoji: '✅',
    types: ['food-truck', 'cafe', 'stall'],
    summary: 'How Auckland Council checks your food safety — and what grades mean for cafes and restaurants.',
    steps: [
      'First verification for new businesses: within six weeks of registration approval.',
      'Officers observe handling, review records, and may issue Corrective Action Requests (CARs) with fix timeframes.',
      'Businesses managing food safety well are verified less often; poor performance means more frequent visits.',
      'Auckland Council is ISO/IEC 17020 accredited — internationally recognised inspection standards.',
      'Food grades (A–E) apply to some fixed businesses based on verification performance — check the public register.',
      'Email hosposupport@aucklandcouncil.govt.nz for a pre-verification checklist before your first visit.',
    ],
    tip: 'Not every food business receives a public grade — mobile traders and some operators are registered but not graded.',
    links: [
      { label: 'Verification services', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/inspections-for-your-food-business.html' },
      { label: 'Find food grades', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/find-food-grade-restaurant-cafe.html' },
    ],
  },
  {
    id: 'market-stall',
    title: 'Market stalls & fundraising',
    emoji: '🏪',
    types: ['stall'],
    summary: 'Rules for occasional stalls, charity fundraising, and regular market trading in Auckland.',
    steps: [
      'Selling food at markets more than once a year usually requires food registration (FCP or national programme).',
      'Use My Food Rules to determine your plan, then apply for food registration with Auckland Council.',
      'Charity fundraising on private land (up to 20 times/year) may be exempt — get landowner permission.',
      'Fundraising on public land needs a fundraising licence plus street trading approval.',
      'Market operators on private land may need resource consent — call the planning helpdesk.',
      'Regular public markets need a market licence; every food vendor must hold registration.',
    ],
    tip: 'Event organisers can request paid food safety officer inspections — email foodsafetyofficer at least four weeks ahead.',
    links: [
      { label: 'Food stalls & fundraising', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-stalls-and-fundraising.html' },
      { label: 'Fundraising licence', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/apply-for-fundraising-licence.html' },
    ],
  },
  {
    id: 'meta-business-ads',
    title: 'Advertise with Meta Business Suite',
    emoji: '📱',
    types: ['marketing', 'cafe', 'food-truck', 'stall', 'event'],
    summary: 'Run Facebook and Instagram ads for your venue, truck, or event — plan audiences and copy in the Advertise tab, then launch in Meta Ads Manager.',
    steps: [
      'Create or claim a Facebook Page for your business; connect Instagram in Meta Business Suite (business.facebook.com).',
      'Add a Meta Business Portfolio, payment method, and verify your business if prompted.',
      'Use Hospitality Guide → Advertise → Plan campaign to draft objective, Auckland-radius audience, ad copy, and daily budget.',
      'Copy your draft and create a campaign in Ads Manager — start with Awareness or Traffic for new venues; Engagement for events.',
      'Use real food/venue photos (1080×1080 or 1080×1920); keep on-image text minimal to avoid reach limits.',
      'If promoting alcohol: set 18+ age targeting and follow NZ ASA advertising codes alongside Meta policies.',
    ],
    tip: 'Test a $15–25/day budget for one week before scaling. Pair paid ads with free OurAuckland listings for council-associated events.',
    links: [
      { label: 'Meta Business Suite', url: 'https://business.facebook.com/' },
      { label: 'Meta Ads Manager', url: 'https://www.facebook.com/adsmanager' },
      { label: 'Meta ad policies', url: 'https://www.facebook.com/policies/ads' },
    ],
  },
  {
    id: 'eventcinemas-auckland',
    title: 'Event Cinemas Auckland — movies & festivals',
    emoji: '🎬',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Now-showing movies, coming-soon blockbusters, and cinema festivals across Auckland Event Cinemas — strong pre- and post-session dining crowds at mall complexes.',
    steps: [
      'Browse eventcinemas.co.nz or filter Events → Event Cinemas only in this guide.',
      'Auckland sites include Queen Street, Newmarket, St Lukes, Albany, Manukau, Westgate, and Westcity (Henderson).',
      'Film festivals (French, Italian, Met Opera) and family openings draw sustained weekend crowds — note session times on each listing.',
      'Gold Class and IMAX screenings often mean longer dwell time — target mall food courts and street frontage near cinema entrances.',
      'Contact Westfield or mall management for mobile trading permits — Event Cinemas does not grant street trading rights.',
      'Cross-check Ticketmaster and AucklandNZ for premiere or red-carpet events that may shift crowds to CBD sites.',
    ],
    tip: 'Friday and Saturday evening sessions at Queen Street and Newmarket are peak hospitality windows — arrive before the first session and stay through the late show.',
    links: [
      { label: 'Event Cinemas NZ', url: 'https://www.eventcinemas.co.nz/' },
      { label: 'Now Showing', url: 'https://www.eventcinemas.co.nz/Movies/NowShowing' },
      { label: 'Events & Festivals', url: 'https://www.eventcinemas.co.nz/eventsfestivals' },
    ],
  },
  {
    id: 'hoyts-auckland',
    title: 'HOYTS Auckland — movies & screenings',
    emoji: '🍿',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Now-showing movies, coming-soon blockbusters, and special screenings across Auckland HOYTS sites — strong pre- and post-session dining crowds at mall complexes.',
    steps: [
      'Browse hoyts.co.nz or filter Events → HOYTS only in this guide.',
      'Auckland sites include Mission Bay, Botany Downs, Hibiscus Coast, Sylvia Park, Wairau Park, and Ormiston.',
      'Special events (Mornings at the Movies, Prams at the Pix, Main Stage, Sensory Screenings) draw family crowds — note session times on each listing.',
      'Xtreme Screen and LUX screenings often mean longer dwell time — target mall food courts and street frontage near cinema entrances.',
      'Contact Westfield or mall management for mobile trading permits — HOYTS does not grant street trading rights.',
      'Cross-check Event Cinemas and Ticketmaster for premiere or red-carpet events that may shift crowds between cinema chains.',
    ],
    tip: 'Friday and Saturday evening sessions at Sylvia Park and Botany Downs are peak hospitality windows — arrive before the first session and stay through the late show.',
    links: [
      { label: 'HOYTS NZ', url: 'https://www.hoyts.co.nz/' },
      { label: 'Now Showing', url: 'https://www.hoyts.co.nz/movies/now-showing' },
      { label: 'Events & Screenings', url: 'https://www.hoyts.co.nz/events' },
    ],
  },
  {
    id: 'rialto-newmarket',
    title: 'Rialto Cinemas Newmarket — arthouse & festivals',
    emoji: '🎞️',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Arthouse movies, NZIFF, Met Opera, and special screenings at Rialto Newmarket — strong pre- and post-session dining crowds in Auckland’s premier shopping precinct.',
    steps: [
      'Browse rialto.co.nz/cinema/newmarket or filter Events → Rialto only in this guide.',
      'Located Level 1, Rialto Centre, 167–169 Broadway — minutes from Newmarket station and Broadway bus stops.',
      'NZIFF, Met Opera, Exhibition on Screen, and Ladies Film Night draw sustained festival crowds — note session times on each listing.',
      'The licensed bar and Broadway café strip mean longer dwell time — target mall frontage and Teed Street food spots near session changeover.',
      'Contact Rialto or mall management for private screening enquiries — street trading needs separate council/mobile trading permits.',
      'Cross-check Event Cinemas Newmarket and AucklandNZ for premiere events that may shift crowds across the precinct.',
    ],
    tip: 'NZIFF and Met Opera weekends are peak hospitality windows — arrive before the first session and stay through the late show.',
    links: [
      { label: 'Rialto Newmarket', url: 'https://www.rialto.co.nz/cinema/newmarket' },
      { label: 'Now Showing', url: 'https://www.rialto.co.nz/movies/nowshowing' },
      { label: 'Events & Festivals', url: 'https://www.rialto.co.nz/eventsfestivals' },
    ],
  },
  {
    id: 'tripadvisor-auckland',
    title: 'TripAdvisor Auckland — events & experiences',
    emoji: '🦉',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Top-rated Auckland festivals, cultural events, sporting experiences, and food & drink attractions — visitor crowds with strong pre-event dining potential.',
    steps: [
      'Browse TripAdvisor Auckland Events or filter Events → TripAdvisor only in this guide.',
      'Cultural events, food & drink festivals, and Pasifika-style gatherings score highest for hospitality trading.',
      'TripAdvisor lists recurring experiences and annual festivals — open each listing for current dates and hours.',
      'Note the suburb on each card (Central, Manukau, Waiheke, etc.) when planning mobile trading routes.',
      'Contact the venue or festival organiser for vendor slots — TripAdvisor is a directory, not a permit authority.',
      'Cross-check AucklandNZ and Eventfinda for the same festival before assuming one listing covers all ticket outlets.',
    ],
    tip: 'TripAdvisor ranks by traveller reviews — high-rated cultural and festival listings often mean proven crowd sizes.',
    links: [
      { label: 'Auckland Events', url: 'https://www.tripadvisor.co.nz/Attractions-g1811027-Activities-c62-Auckland_North_Island.html' },
      { label: 'Food & Drink', url: 'https://www.tripadvisor.co.nz/Attractions-g1811027-Activities-c36-Auckland_North_Island.html' },
      { label: 'All Auckland activities', url: 'https://www.tripadvisor.co.nz/Attractions-g1811027-Activities-Auckland_North_Island.html' },
    ],
  },
  {
    id: 'fever-auckland',
    title: 'Fever Auckland — ticketed experiences',
    emoji: '🔥',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Candlelight concerts, immersive experiences, exhibitions, and live shows across Auckland — strong pre-show dining and drinks crowds.',
    steps: [
      'Browse feverup.com/en/auckland or filter Events → Fever only in this guide.',
      'Candlelight, live shows, and immersive experiences draw evening crowds — note venue suburb on each Fever listing.',
      'Many Fever plans are multi-date — open the plan page for exact session times before trading nearby.',
      'Gift cards are excluded from this guide; look for concerts, exhibitions, and experiences with venue addresses.',
      'Contact Fever organisers or the listed venue for vendor partnerships — Fever itself does not grant trading permits.',
      'Cross-check Ticketmaster and Eventfinda for the same show if you need arena-scale crowd estimates.',
    ],
    tip: 'Fever listings often say “select your date in the ticket selector” — always confirm gates-open times on the plan page.',
    links: [
      { label: 'Fever Auckland', url: 'https://feverup.com/en/auckland/' },
      { label: 'Candlelight concerts', url: 'https://feverup.com/en/auckland/candlelight-concerts' },
      { label: 'Live shows', url: 'https://feverup.com/en/auckland/live-shows' },
    ],
  },
  {
    id: 'auckland-for-kids',
    title: 'Auckland for Kids — family events calendar',
    emoji: '🧒',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Curated family and school-holiday events across Auckland — markets, festivals, museums, and weekend activities with strong food-truck crowd potential.',
    steps: [
      'Browse aucklandforkids.co.nz/whats-on-today or filter Events → Auckland for Kids only in this guide.',
      'This guide pulls today plus this-weekend listings — check the event page for exact session times before trading.',
      'Markets & Fairs, School Holidays, and Free categories are top hospitality picks for family crowds.',
      'Note the suburb filter on each listing (Central, North, East, South, West) when planning mobile trading routes.',
      'Contact the listed organiser for vendor slots — Auckland for Kids is a directory, not a permit authority.',
      'Cross-check AucklandNZ and Eventfinda for the same festival before assuming one listing covers all ticket outlets.',
    ],
    tip: 'Weekend family markets repeat weekly — filter Food truck opportunities to surface free events and markets first.',
    links: [
      { label: "What's on today", url: 'https://www.aucklandforkids.co.nz/whats-on-today/' },
      { label: 'This weekend', url: 'https://www.aucklandforkids.co.nz/whats-on-this-weekend/' },
      { label: 'Full calendar', url: 'https://www.aucklandforkids.co.nz/whats-on/' },
    ],
  },
  {
    id: 'cheeky-auckland',
    title: 'Cheeky Events Auckland — singles social nights',
    emoji: '💋',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Speed dating, singles mixers, and boat parties in Auckland — evening social crowds with drinks and pre-event dining opportunities.',
    steps: [
      'Browse cheekyevents.net/location/auckland or filter Events → Cheeky Events only in this guide.',
      'Auckland lists three recurring event types (speed dating, singles mixers, boat parties) — check the Cheeky calendar when dated Auckland tickets appear.',
      'Evening social events draw bar and dining crowds before and after sessions — note venue suburb once tickets are live.',
      'Cheeky tickets run through Eventbrite — contact Cheeky Events directly for vendor or catering partnerships, not via this guide.',
      'Boat parties and mixers often include drinks — confirm alcohol licensing and council trading rules for waterfront or venue-adjacent trading.',
      'Cross-check Eventbrite Auckland for the same Cheeky listing if dates are not yet on the Auckland location page.',
    ],
    tip: 'Cheeky Auckland currently highlights event types more than dated listings — watch their calendar and Instagram for new Auckland ticket drops.',
    links: [
      { label: 'Cheeky Events Auckland', url: 'https://cheekyevents.net/location/auckland/' },
      { label: 'Cheeky calendar', url: 'https://cheekyevents.net/calendar/' },
      { label: 'Speed dating (Auckland)', url: 'https://cheekyevents.net/event-type/speeddating/' },
    ],
  },
  {
    id: 'humanitix-nz',
    title: 'Humanitix NZ — charity ticketing events',
    emoji: '💚',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'Community and charity events on Humanitix — markets, workshops, and free listings where booking fees fund education and health charities.',
    steps: [
      'Browse humanitix.com/nz or filter Events → Humanitix only in this guide (Auckland carousel listings).',
      'Free and community categories are strong hospitality windows — note venue suburb and session start on each event page.',
      'Humanitix profits go to charity — organisers are often community groups; contact them directly for vendor or catering slots.',
      'Reuse Market, night markets, and recurring community events repeat weekly — good for predictable trading windows.',
      'Cross-check Eventfinda and Eventbrite for the same market before assuming Humanitix is the only ticket outlet.',
      'List council-associated premises events separately via OurAuckland (Events → List your event).',
    ],
    tip: 'Humanitix shows carousel highlights, not every Auckland event — always open the event page for exact gates-open times and on-site food arrangements.',
    links: [
      { label: 'Humanitix NZ', url: 'https://humanitix.com/nz' },
      { label: 'Auckland events', url: 'https://humanitix.com/nz/events/nz--auckland' },
      { label: 'Create an event', url: 'https://console.humanitix.com/console/dashboard' },
    ],
  },
  {
    id: 'eventfinda-auckland',
    title: 'Eventfinda Auckland — local events directory',
    emoji: '📍',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'Markets, festivals, gigs, and suburb-level events across Tāmaki Makaurau — strong for finding local trading windows.',
    steps: [
      'Browse eventfinda.co.nz Auckland (region 2) or filter Events → Eventfinda only in this guide.',
      'Markets and Fairs, Food Gourmet Wine, and Festivals categories are the top hospitality picks — note suburb and session time.',
      'Eventfinda lists community and venue events nationwide — many are smaller than Ticketmaster arena shows but repeat weekly.',
      'Contact the listed venue or organiser for vendor slots; Eventfinda itself does not grant trading permits.',
      'Cross-check AucklandNZ and OurAuckland for council-run festivals before assuming Eventfinda is the only listing.',
      'List your own premises event on OurAuckland (Events → List your event) if it is council-associated.',
    ],
    tip: 'Suburb matters on Eventfinda — a Kingsland jazz night and a Mangere theatre show draw very different crowd flows. Filter by region in the Events tab, then search the suburb name.',
    links: [
      { label: 'Eventfinda Auckland', url: 'https://www.eventfinda.co.nz/search?q=&region%5B%5D=2' },
      { label: 'Markets & Fairs', url: 'https://www.eventfinda.co.nz/whatson/markets-and-fairs/auckland' },
      { label: 'Food, Gourmet & Wine', url: 'https://www.eventfinda.co.nz/whatson/food-gourmet-wine/auckland' },
    ],
  },
  {
    id: 'eventbrite-auckland',
    title: 'Eventbrite Auckland — community & food events',
    emoji: '🎟️',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'Ticketed tastings, markets, parties, and workshops — smaller crowds than arenas but strong for pop-ups and vendor pitches.',
    steps: [
      'Browse eventbrite.co.nz Auckland or filter Events → Eventbrite only in this guide.',
      'Food & Drink and This weekend buckets are the best hospitality windows — note venue suburb and start time on each listing.',
      'Many Eventbrite events are organiser-run (not council-listed) — contact the organiser directly for vendor or catering slots.',
      'Pop-up bars, cocktail classes, and market-style events often need external food — pitch early with your council food registration number.',
      'Cross-check AucklandNZ and OurAuckland for the same festival before assuming Eventbrite is the only listing.',
      'Use the Advertise tab to run Meta ads geo-targeted to the event suburb on the day before and day of.',
    ],
    tip: 'Eventbrite listings rarely include on-site food arrangements — read the event description and message the organiser before hauling your truck.',
    links: [
      { label: 'Eventbrite Auckland', url: 'https://www.eventbrite.co.nz/d/new-zealand--auckland/events/' },
      { label: 'Create an Eventbrite event', url: 'https://www.eventbrite.co.nz/organizer/overview/' },
      { label: 'Eventbrite Food & Drink', url: 'https://www.eventbrite.co.nz/d/new-zealand--auckland/food-and-drink/' },
    ],
  },
  {
    id: 'eden-park-events',
    title: 'Eden Park stadium events',
    emoji: '🏟️',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'All Blacks, football friendlies, BLACKCAPS, concerts, and Tunnel Club Eats — New Zealand\'s national stadium in Kingsland.',
    steps: [
      'Browse edenpark.co.nz/events or filter Events → Eden Park only in this guide.',
      'Note kick-off or gates-open times on each event page — rugby and football crowds peak 90 minutes before and just after full time.',
      'Tunnel Club Eats and Art in the Park are on-site hospitality — external vendors need Eden Park operator approval plus council permits for Sandringham Rd / Kingsland streets.',
      'Major concerts (Robbie Williams, Guns N\' Roses) draw 40,000+ — plan mobile trading on Reimers Ave, Sandringham Rd, and Kingsland village cafes for overflow.',
      'Cross-check Ticketmaster for the same fixture if you need ticket-sale timing; Eden Park listings are the official venue calendar.',
      'Warriors NRL at Eden Park (when scheduled) and All Blacks tests are the biggest food-truck windows in Auckland sport.',
    ],
    tip: 'Kingsland village is a 5-minute walk from Eden Park — many punters eat there before walking in. Sandringham Rd is better for post-match capture.',
    links: [
      { label: 'Eden Park events', url: 'https://edenpark.co.nz/events/' },
      { label: 'Plan your visit', url: 'https://edenpark.co.nz/plan-your-visit/' },
      { label: 'Tunnel Club', url: 'https://edenpark.co.nz/venues/tunnel-club/' },
    ],
  },
  {
    id: 'touristtrip-auckland',
    title: 'Trip Planner — Auckland street markets directory',
    emoji: '🗺️',
    types: ['food-truck', 'stall'],
    summary:
      'Tourist Trip Planner curates ~20 Auckland street and farmers markets with Google ratings, addresses, and venue links.',
    steps: [
      'Browse touristtripplanner.com/city/auckland/street_markets or filter Events → Trip Planner only in this guide.',
      'Includes Grey Lynn Farmers Market, Parnell Farmers Market, Takapuna Sunday Market, Otara Flea Market, Britomart farmers market, and more.',
      'Trading days are inferred from listing text where possible — always confirm hours on the market’s own website or Facebook page.',
      'Use Google ratings and review snippets to shortlist high-foot-traffic venues before applying for a stall.',
      'You need MPI food registration and Auckland Council verification before selling food at any market.',
      'Some listings overlap Night Markets, ACB Markets, or Auckland Markets NZ — compare sources for stallholder contact details.',
    ],
    tip: 'Filter by region (Central, North Shore, West, South) in the Events tab to build a suburb-by-suburb scouting route.',
    links: [
      { label: 'Auckland street markets', url: 'https://touristtripplanner.com/city/auckland/street_markets' },
      { label: 'Auckland city guide', url: 'https://touristtripplanner.com/city/auckland' },
      { label: 'Grey Lynn Farmers Market', url: 'https://www.greylynnfarmersmarket.co.nz/' },
      { label: 'Otara Markets', url: 'https://www.otaramarkets.co.nz/' },
    ],
  },
  {
    id: 'aucklandmarket-auckland',
    title: 'Auckland Markets — weekly Otahuhu & Eastern stalls',
    emoji: '🏪',
    types: ['food-truck', 'stall'],
    summary:
      'Auckland Markets NZ runs two long-running weekly markets — Otahuhu Phoenix (Thursday) and Auckland Eastern (Sunday).',
    steps: [
      'Browse aucklandmarketnz.co.nz or filter Events → Auckland Markets only in this guide.',
      'Otahuhu Phoenix Markets — every Thursday 7am–1pm at Phoenix Tavern, 26 Avenue Rd Otahuhu. Fresh produce, food stalls, and crafts.',
      'Auckland Eastern Markets — every Sunday at Auckland Netball Centre, St Johns. Asian and Polynesian produce, food stalls, and entertainment.',
      'Stall spaces from $25 per Thursday — book via 021 281 1136 or aucklandmarketnz.co.nz/stallholder-information.',
      'You need MPI food registration and Auckland Council verification before selling food at any market.',
      'Rain or shine — both markets run all year; check their Facebook page for holiday closures.',
    ],
    tip: 'Thursday Otahuhu and Sunday St Johns are on opposite ends of the week — a good pair if you are building a regular stall route in South and Central Auckland.',
    links: [
      { label: 'Auckland Markets', url: 'https://aucklandmarketnz.co.nz/' },
      { label: 'Otahuhu Phoenix Markets', url: 'https://aucklandmarketnz.co.nz/otahuhu-phoenix-markets/' },
      { label: 'Auckland Eastern Markets', url: 'https://aucklandmarketnz.co.nz/auckland-eastern-markets/' },
      { label: 'Stallholder information', url: 'https://aucklandmarketnz.co.nz/stallholder-information/' },
    ],
  },
  {
    id: 'opencircle-auckland',
    title: 'Open Circle Markets — community night markets',
    emoji: '⭕',
    types: ['food-truck', 'stall'],
    summary:
      'Open Circle Markets pop-up community markets across Auckland — food vendors, makers, live music, and affordable stall fees.',
    steps: [
      'Browse markets.opencirclemarkets.com or filter Events → Open Circle only in this guide.',
      'Recurring venues include Grafton (Friday nights) and Victoria Park (Sundays) — check Instagram posts for the latest dates and hours.',
      'Apply as a vendor via markets.opencirclemarkets.com/vendor-application — stall fees are designed for small food and maker businesses.',
      'You need MPI food registration and Auckland Council verification before selling food at any market.',
      'For private or corporate event catering (not market stalls), see circle.opencirclemarkets.com — a separate curated vendor network.',
      'Pop-up locations rotate — follow @opencirclemarkets on Instagram for North Shore, Mt Albert, and one-off announcements.',
    ],
    tip: 'Grafton Friday nights and Victoria Park Sundays are different crowds — scout both before committing to a regular stall route.',
    links: [
      { label: 'Open Circle Markets', url: 'https://markets.opencirclemarkets.com/' },
      { label: 'Vendor application', url: 'https://markets.opencirclemarkets.com/vendor-application.html' },
      { label: 'The Circle (events)', url: 'https://circle.opencirclemarkets.com/' },
      { label: 'Instagram', url: 'https://www.instagram.com/opencirclemarkets/' },
    ],
  },
  {
    id: 'acbmarkets-auckland',
    title: 'Visit Auckland — farmers & flea markets',
    emoji: '🧺',
    types: ['food-truck', 'stall'],
    summary:
      'Auckland Convention Bureau market guide — country, city, and cultural markets with weekly trading windows across the region.',
    steps: [
      'Browse aucklandconventionbureau.com/visit/taste/markets or filter Events → ACB Markets only in this guide.',
      'Country markets: Matakana (Sat), Clevedon (Sun), Coatesville (Sun) — strong produce and artisan food stalls.',
      'City markets: Britomart Saturday Market and Parnell Farmers Market — CBD and fringe crowds with food trucks and ready-to-eat vendors.',
      'Otara Flea Market (Sat 6am–12pm) — authentic Māori, Pacific, Asian, and Indian food and craft stalls in South Auckland.',
      'You need MPI food registration and Auckland Council verification before selling food at any market.',
      'Night markets are listed separately — filter Events → Night Markets for Auckland Night Markets venues.',
    ],
    tip: 'Britomart and Parnell Saturday markets overlap before noon — plan a two-stop morning route if you are scouting stall or truck opportunities.',
    links: [
      { label: 'Auckland markets', url: 'https://aucklandconventionbureau.com/visit/taste/markets' },
      { label: 'Britomart Market', url: 'https://britomart.org/market/' },
      { label: 'Otara Markets', url: 'https://www.otaramarkets.co.nz/' },
      { label: 'Matakana Market', url: 'https://www.matakanavillage.co.nz/market/' },
    ],
  },
  {
    id: 'ftc-auckland',
    title: 'Food Truck Collective — Auckland street food nights',
    emoji: '🚚',
    types: ['food-truck', 'stall', 'event'],
    summary:
      'Curated Food Truck Collective events across Auckland — suburban food truck nights, Britomart Wednesdays, and pop-up bar crowds.',
    steps: [
      'Browse foodtruckcollective.co.nz/events?stay=yes or filter Events → Food Truck Collective only in this guide.',
      'FTC runs operator-managed food truck nights — book a truck via foodtruckcollective.co.nz/book_food_truck for private events.',
      'You need MPI food registration and Auckland Council verification before trading at any FTC event.',
      'External street trading outside the FTC footprint still needs council mobile trading permits.',
      'Many FTC nights also appear on Eventfinda — this guide prefers the official FTC listing when both match.',
      'Plan service peaks from 5pm when most FTC suburban nights open; Britomart Wednesday runs lunchtime in the CBD.',
    ],
    tip: 'Stardome Matariki and suburban reserve nights draw strong family crowds — target park frontage and car park approaches before the first truck queue forms.',
    links: [
      { label: 'FTC events', url: 'https://foodtruckcollective.co.nz/events?stay=yes' },
      { label: 'Book a food truck', url: 'https://foodtruckcollective.co.nz/book_food_truck' },
      { label: 'Our Collective', url: 'https://foodtruckcollective.co.nz/collective' },
      { label: 'Join as vendor', url: 'https://foodtruckcollective.co.nz/join_us' },
    ],
  },
  {
    id: 'nightmarkets-auckland',
    title: 'Auckland Night Markets — weekly stall venues',
    emoji: '🌙',
    types: ['food-truck', 'stall'],
    summary:
      'Weekly night markets across Auckland suburbs — established stallholder venues with regular Thursday–Sunday crowds from 5pm.',
    steps: [
      'Browse aucklandnightmarkets.co.nz/locations or filter Events → Night Markets only in this guide.',
      'Nine Auckland venues: Kelston (Mon), Albany (Tue), Botany + Highbury (Wed), Henderson (Thu), Papatoetoe (Fri), Pakuranga (Sat), Silverdale (Sun).',
      'Apply as a stallholder via aucklandnightmarkets.co.nz/general-6 — review pricing and food stall requirements before applying.',
      'You need MPI food registration and an Auckland Council Food Control Plan or National Programme before selling food.',
      'Night markets are operator-managed sites — external street trading outside the market still needs council mobile trading permits.',
      'Target different suburbs each night of the week to build a regular route without competing with your own stall.',
    ],
    tip: 'Wednesday doubles up Botany (East) and Highbury (North Shore) — plan logistics if you trade at both or pick the suburb that matches your customer base.',
    links: [
      { label: 'Locations', url: 'https://www.aucklandnightmarkets.co.nz/locations' },
      { label: 'Stallholder application', url: 'https://www.aucklandnightmarkets.co.nz/general-6' },
      { label: 'Food stall requirements', url: 'https://www.aucklandnightmarkets.co.nz/copy-of-food-control-plan' },
      { label: 'Stallholder pricing', url: 'https://www.aucklandnightmarkets.co.nz/pricing' },
    ],
  },
  {
    id: 'duedrop-manukau',
    title: 'Due Drop Events Centre — South Auckland shows',
    emoji: '🏛️',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Concerts, dance championships, family shows, and cultural events at Due Drop Events Centre on Great South Road — strong pre-show crowds in Manukau.',
    steps: [
      'Browse duedropeventscentre.org.nz/whats-on or filter Events → Due Drop only in this guide.',
      'Located at 770 Great South Road, Manukau — buses 33, 055, 361, 362 stop outside; 15–20 min walk from Manukau Station.',
      'Many listings link to Eventfinda for tickets — open each card for dates and session times.',
      'Street dance, wrestling, MSO family concerts, and Matariki events draw large South Auckland crowds — plan service peaks before doors.',
      'You cannot vend inside the venue without operator approval — mobile trading on Great South Road still needs council permits.',
      'Cross-check Eventfinda Manukau listings for the same show when planning routes across South Auckland venues.',
    ],
    tip: 'Blueprint dance championships and family concerts fill the Sir Woolf Fisher Arena — target Great South Road frontage and Ramada Hotel gate approaches before session start.',
    links: [
      { label: "What's On", url: 'https://duedropeventscentre.org.nz/whats-on' },
      { label: 'Getting here', url: 'https://duedropeventscentre.org.nz/your-visit/getting-here' },
      { label: 'Onsite parking', url: 'https://duedropeventscentre.org.nz/your-visit/onsite-parking' },
    ],
  },
  {
    id: 'sparkarena-auckland',
    title: 'Spark Arena — concerts, sport & Tuning Fork',
    emoji: '⚡',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary:
      'Major concerts, sport, Disney On Ice, and intimate Tuning Fork shows at Spark Arena — pre-show queues on Mahuhu Crescent and strong arena crowd opportunities.',
    steps: [
      'Browse sparkarena.co.nz/all-events or filter Events → Spark Arena only in this guide.',
      'Spark Arena (main bowl) and Tuning Fork (on-site venue bar) are separate ticket listings — both draw hospitality crowds.',
      'Plan service peaks 90 minutes before doors and immediately after shows along Mahuhu Crescent and Beasley Avenue approaches.',
      'You cannot vend inside the arena precinct without Spark Arena operator approval — street trading still needs council permits.',
      'Cross-check Ticketmaster Auckland for the same show if tickets are listed under both sources.',
      'Target Meta ads (Advertise tab) to concert-goers within 15 km of Parnell on show day.',
    ],
    tip: 'Tuning Fork shows often mean earlier, younger crowds with bar spillover — main-bowl concerts drive larger queue lines on Mahuhu Crescent.',
    links: [
      { label: 'Spark Arena events', url: 'https://www.sparkarena.co.nz/all-events' },
      { label: 'Food & Drink', url: 'https://www.sparkarena.co.nz/food-and-beverage' },
      { label: 'Plan your visit', url: 'https://www.sparkarena.co.nz/plan-your-visit' },
    ],
  },
  {
    id: 'ticketmaster-auckland',
    title: 'Ticketmaster Auckland — concerts & sport',
    emoji: '🎫',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'Spark Arena, Eden Park, Go Media Stadium, and CBD theatres on Ticketmaster — plan service peaks around major crowds.',
    steps: [
      'Browse Ticketmaster Auckland discover page or filter Events → Ticketmaster only in this guide.',
      'Map venue to your trading window: Spark Arena and Go Media Stadium = pre-show queues on Mahuhu Cres / Beasley Ave; Civic/Aotea/Town Hall = Greys Ave & Queen St.',
      'Warriors, concerts, and family shows (Disney On Ice, Wiggles) drive predictable dinner and snack demand — note session start times on each event page.',
      'Ticketmaster lists partner venues only — you cannot vend inside Spark Arena without venue operator approval; street trading still needs council permits.',
      'Cross-check Auckland Live for the same show if tickets are also sold via aucklandlive.co.nz (e.g. cabaret festival, RNZ Ballet).',
      'Target Meta ads (Advertise tab) to concert-goers within 15 km of the venue on show day.',
    ],
    tip: 'Tuning Fork at Spark Arena is the on-site venue bar — external food trucks should focus on queue lines and nearby parking zones, not inside the arena precinct without approval.',
    links: [
      { label: 'Ticketmaster Auckland', url: 'https://www.ticketmaster.co.nz/discover/auckland' },
      { label: 'Spark Arena', url: 'https://www.ticketmaster.co.nz/spark-arena-tickets-auckland/venue/294951' },
      { label: 'Eden Park', url: 'https://www.ticketmaster.co.nz/eden-park-tickets-auckland/venue/294914' },
    ],
  },
  {
    id: 'auckland-live',
    title: 'Auckland Live shows & venue crowds',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'Theatre, concerts, and festivals at The Civic, Aotea Centre, and Town Hall — pre-show dining and pop-up trading opportunities.',
    steps: [
      'Browse upcoming shows and seasons on Auckland Live — filter in the Events tab by Auckland Live source.',
      'Note venue and run dates: Civic, Kiri Te Kanawa Theatre, Auckland Town Hall, and Aotea Square events draw CBD crowds.',
      'Auckland Live runs on-site cafés (The Terrace, Container in the Square, Stark\'s Bar) — coordinate with venue management, not Auckland Live ticketing, for external vendor arrangements.',
      'Food trucks near Aotea Square or Queen Street still need council food registration and may need mobile trading or park permits.',
      'Matariki, cabaret festival, and school-holiday shows are strong hospitality windows — plan Meta ads or OurAuckland listings for your own premises events separately.',
      'Book tickets via aucklandlive.co.nz or 0800 111 999 — use show pages for exact session times when planning service peaks.',
    ],
    tip: 'Stark\'s Bar & The Terrace are the official pre-show venues inside Auckland Live buildings — external trucks should target queue times on Greys Ave and Aotea Square.',
    links: [
      { label: 'Auckland Live', url: 'https://www.aucklandlive.co.nz/' },
      { label: 'What\'s on', url: 'https://www.aucklandlive.co.nz/search/events?date=' },
      { label: 'Auckland Live cafés', url: 'https://www.aucklandlive.co.nz/visitor-info/eating-and-drinking' },
    ],
  },
  {
    id: 'basement-theatre',
    title: 'Basement Theatre — Grey Lynn',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'Indie theatre on Maidstone Street — comedy, improv, and Matariki/Pride seasons with crowds from Grey Lynn and Ponsonby.',
    steps: [
      'Browse basementtheatre.co.nz/blogs/whats-on or filter Events → Basement Theatre only in this guide.',
      'Tickets are sold via iTicket — book from show pages or basementtheatre.co.nz/pages/tickets.',
      'Evening shows and weekend matinees draw 60–120 minute pre-show windows — Ponsonby Road and Grey Lynn cafes fill first.',
      'The Basement Bar is on-site — external food trucks need Auckland Council registration and venue approval.',
      'Winter Matariki and Summer Pride seasons pack multiple shows per week — plan staffing for run extensions.',
      'Cross-check iTicket filter if you need all Basement listings in one place.',
    ],
    tip: 'Studio shows at Basement Theatre (Studio) are smaller but still draw loyal crowds — check venue name on the listing.',
    links: [
      { label: 'Tickets', url: 'https://basementtheatre.co.nz/pages/tickets' },
      { label: 'What\'s On', url: 'https://basementtheatre.co.nz/blogs/whats-on' },
      { label: 'iTicket Basement', url: 'https://www.iticket.co.nz/go-to/basement-theatre' },
    ],
  },
  {
    id: 'rnzb-auckland',
    title: 'Royal New Zealand Ballet — Auckland',
    emoji: '🩰',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'RNZB seasons at Kiri Te Kanawa Theatre (Aotea Centre) and Bruce Mason Centre — dress-circle crowds and strong pre-show trade.',
    steps: [
      'Browse rnzb.org.nz/whats-on or filter Events → RNZB only in this guide.',
      'Auckland tickets are sold via Ticketmaster — Kiri Te Kanawa Theatre and Bruce Mason Centre are the main venues.',
      'Premium and Premium Plus reserves fill first — plan service 60–90 minutes before evening performances and matinees.',
      'Aotea Square and Queen Street fill before Aotea Centre ballets; Takapuna village cafes suit Bruce Mason Centre shows.',
      'RNZB seating reserves (Premium Plus, Premium, A/B/C) are explained at rnzb.org.nz/your-visit/seat-categories-and-reserves.',
      'Cross-check Auckland Live and Ticketmaster for overlapping Aotea Centre seasons.',
    ],
    tip: 'Winter Season and Sleeping Beauty draw mixed age audiences — Saturday matinees near Aotea Centre are strong family lunch windows.',
    links: [
      { label: 'RNZB What\'s On', url: 'https://rnzb.org.nz/whats-on' },
      { label: 'Seating & reserves', url: 'https://rnzb.org.nz/your-visit/seat-categories-and-reserves' },
      { label: 'Ticketmaster Auckland', url: 'https://www.ticketmaster.co.nz/discover/auckland' },
    ],
  },
  {
    id: 'iticket-auckland',
    title: 'iTicket Auckland listings',
    emoji: '🎫',
    types: ['cafe', 'food-truck', 'restaurant', 'stall', 'event'],
    summary:
      'Community theatre, school shows, markets, and pub sports screenings ticketed on iTicket — venue crowds across Auckland.',
    steps: [
      'Browse iticket.co.nz or filter Events → iTicket only in this guide.',
      'Listings span Q Theatre, TAPAC, Basement Theatre, Auckland Showgrounds markets, and pub FIFA screenings.',
      'School dance showcases and community theatre runs often sell on iTicket — plan pre-show service near the venue suburb.',
      'iTicket is widely used by indie theatres (HLT, community groups) — cross-check venue-specific guides for repeat seasons.',
      'External food trucks need Auckland Council food registration and venue or landowner approval.',
      'Cross-check Ticketmaster and Auckland Live for the same Aotea Centre or arena season before committing a pitch location.',
    ],
    tip: 'iTicket pub sports packages (e.g. FIFA screenings) draw early-morning crowds — very different rhythm from evening theatre.',
    links: [
      { label: 'iTicket NZ', url: 'https://www.iticket.co.nz/' },
      { label: 'Auckland events', url: 'https://www.iticket.co.nz/events/region/auckland' },
    ],
  },
  {
    id: 'nyt-auckland',
    title: 'National Youth Theatre OnStage',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'NYT flagship musicals at Aotea Centre — family audiences and strong pre-show CBD foot traffic.',
    steps: [
      'Browse nyt.nz/onstage or filter Events → NYT only in this guide.',
      'Current Auckland productions include ticketed seasons at the Aotea Centre (e.g. Disney\'s The Little Mermaid) and upcoming OnStage runs (e.g. Diary of a Wimpy Kid).',
      'Performance peaks are public show weekends — plan service 60–90 minutes before evening and matinee sessions.',
      'Aotea Square and Queen Street venues fill with families — food trucks need council permits; no vending inside the centre without venue approval.',
      'Tickets are sold via Ticketmaster or iTicket depending on the production.',
      'Cross-check Auckland Live and Ticketmaster listings for the same Aotea Centre season.',
    ],
    tip: 'NYT matinees draw younger families — Saturday/Sunday lunch trade near Aotea Centre is often stronger than weekday evenings.',
    links: [
      { label: 'NYT OnStage', url: 'https://nyt.nz/onstage' },
      { label: 'Auckland programmes', url: 'https://nyt.nz/regions/auckland' },
      { label: 'NYT Ticketmaster', url: 'https://www.ticketmaster.co.nz/national-youth-theatre-tickets/artist/1881036' },
    ],
  },
  {
    id: 'hlt-howick',
    title: 'Howick Little Theatre season',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'HLT on Pakuranga Road, Howick — five plays a year with steady East Auckland pre-show crowds.',
    steps: [
      'Browse hlt.org.nz/whats-on/events-calendar or filter Events → HLT only in this guide.',
      'Note each play\'s season run and Friday/Saturday 8pm sessions — matinees on select Sundays at 2pm.',
      'Howick village cafes and restaurants (Picton Street, Moore Street) fill before evening shows.',
      'HLT is a volunteer-run community theatre — external vendors need Auckland Council food registration and venue approval.',
      'Tickets are sold via iTicket — use show pages for exact performance dates.',
      'Cross-check Eventfinda and AucklandNZ for other East Auckland events on the same nights.',
    ],
    tip: 'Opening weekend and final Saturday of each HLT season are the busiest — Howick night-market season (when running) can overlap with theatre crowds.',
    links: [
      { label: 'HLT Events calendar', url: 'https://hlt.org.nz/whats-on/events-calendar/' },
      { label: 'What\'s on', url: 'https://hlt.org.nz/whats-on/' },
      { label: 'Box office', url: 'https://hlt.org.nz/box-office/' },
    ],
  },
  {
    id: 'qtheatre-auckland',
    title: 'Q Theatre shows & CBD crowds',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'Q Theatre on Queen Street — comedy, theatre, music, and dance with strong pre-show foot traffic in Auckland CBD.',
    steps: [
      'Browse qtheatre.co.nz/shows or filter Events → Q Theatre only in this guide.',
      'Note show date ranges — Q lists theatre, comedy, music, dance, and festival events across multiple spaces (Q Theatre, Loft, Vault, Rangatira).',
      'Queen Street, Fort Street, and Federal Street venues fill before evening shows — plan service peaks 60–90 minutes before curtain.',
      'KWG (Kauri Whānau Grill) is the on-site restaurant at Q — external food trucks need council permits and cannot trade inside without venue approval.',
      'Cross-check Auckland Live and ATC for overlapping productions that may also draw CBD crowds on the same nights.',
      'Tickets are sold via iTicket — use show pages for exact session times.',
    ],
    tip: 'Friday and Saturday comedy/music nights at Q are the busiest hospitality windows — Shortland Street and Queen Street cafes see the biggest pre-show rush.',
    links: [
      { label: 'Q Theatre What\'s on', url: 'https://www.qtheatre.co.nz/shows' },
      { label: 'Visit Q', url: 'https://www.qtheatre.co.nz/visit' },
      { label: 'KWG restaurant', url: 'https://www.qtheatre.co.nz/kwg' },
    ],
  },
  {
    id: 'atc-auckland',
    title: 'Auckland Theatre Company shows',
    emoji: '🎭',
    types: ['cafe', 'food-truck', 'restaurant', 'event'],
    summary:
      'ATC season at ASB Waterfront Theatre — theatre crowds for Wynyard Quarter and CBD pre-show dining.',
    steps: [
      'Browse atc.co.nz/whats-on or filter Events → ATC only in this guide.',
      'Current season shows run at ASB Waterfront Theatre (2 Beaumont Street, Wynyard Quarter) — note each show\'s date range for service peaks.',
      'Wynyard Quarter restaurants and bars fill before evening performances — food trucks can target queue times on Beaumont Street and Jellicoe Street.',
      'ATC is separate from Auckland Live (Civic / Aotea Centre) — cross-check both sources if a production tours multiple venues.',
      'You need Auckland Council food registration; mobile trading near the waterfront may need additional park or street permits.',
      'Use show pages for exact session times and on-sale status when planning staffing.',
    ],
    tip: 'Saturday matinees and opening nights draw the biggest pre-show rush — Wynyard Quarter car parks and Silo Park foot traffic are good indicators.',
    links: [
      { label: 'ATC What\'s on', url: 'https://www.atc.co.nz/whats-on' },
      { label: 'ASB Waterfront Theatre', url: 'https://www.atc.co.nz/visit-us/asb-waterfront-theatre' },
      { label: 'Book tickets', url: 'https://www.atc.co.nz/whats-on' },
    ],
  },
  {
    id: 'meetup-auckland',
    title: 'Meetup events near Auckland',
    emoji: '👥',
    types: ['cafe', 'food-truck', 'stall', 'event'],
    summary: 'In-person Meetups within 100 miles of Auckland — dining groups, social events, and venue gatherings worth catering or trading near.',
    steps: [
      'Browse Meetup in-person events filtered to Auckland, NZ (100-mile radius).',
      'Look for dining groups (e.g. Serial Diners), pub socials, and food-themed meetups — flagged as hospitality opportunities in the Events tab.',
      'Note venue address and attendee count before pitching your truck or pop-up.',
      'Contact the Meetup organiser — not Meetup itself — for vendor or catering arrangements.',
      'You still need Auckland Council food registration; trading at a private venue may not need a mobile trading licence but confirm first.',
      'List your own premises event on Meetup separately if you run a group, or use OurAuckland for council-associated listings.',
    ],
    tip: 'Meetup dining events often book out fast — Serial Diners and similar groups are good indicators of restaurant-heavy crowds.',
    links: [
      { label: 'Meetup Auckland events', url: 'https://www.meetup.com/find/?source=EVENTS&eventType=inPerson&sortField=DATETIME&distance=hundredMiles&location=nz--New+Zealand--Auckland' },
    ],
  },
  {
    id: 'list-ourauckland',
    title: 'List your event on OurAuckland',
    emoji: '📣',
    types: ['cafe', 'event', 'stall'],
    summary: 'Promote tastings, pop-ups, and venue events on Auckland Council\'s OurAuckland calendar — draft in the Events tab, then submit the council form.',
    steps: [
      'Confirm your event qualifies: delivered, funded, sponsored, supported, or facilitated by Auckland Council — or explain why it should still be listed.',
      'Gather venue address, ward, dates/times, cost, booking link, and a 1–6 image set (JPG/PNG, under 2 MB, min 480×365 px, no text on images).',
      'Use the Hospitality Guide Events → List your event wizard to draft contact, event details, and public contact info.',
      'Copy your draft and open the OurAuckland form at ourauckland.aucklandcouncil.govt.nz/events/list-an-event/.',
      'Complete Steps 1–4 on the council site: contact, event details, upload images, review and submit.',
      'Allow up to 10 business days for publishing; events far ahead may go live closer to the date.',
    ],
    tip: 'Events at council libraries or community venues usually qualify as Supported or Facilitated — select the matching venue in the council form.',
    links: [
      { label: 'Listing an event (info)', url: 'https://ourauckland.aucklandcouncil.govt.nz/pages/listing-an-event/' },
      { label: 'List your event (form)', url: 'https://ourauckland.aucklandcouncil.govt.nz/events/list-an-event/' },
    ],
  },
  {
    id: 'events',
    title: 'Event organisers & food vendors',
    emoji: '🎪',
    types: ['event'],
    summary: 'Your duty of care when hosting food trucks and stalls at festivals, markets, and private events.',
    steps: [
      'Require every food operator to show a current Notice of Registration or verify on the MPI public register.',
      'For public land events, ensure vendors hold appropriate trading and fundraising licences where required.',
      'Request council food safety officer inspections at least four weeks before the event (optional, paid).',
      'Brief vendors on wastewater disposal, power, and site layout before build day.',
      'Keep a vendor register with business name, registration number, and contact details.',
      'Report food safety incidents via council complaint channels if needed.',
    ],
    tip: 'Search the MPI public register to confirm vendors are registered before you confirm their spot.',
    links: [
      { label: 'Event organiser guide', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/food-registration-for-event-organisers.html' },
      { label: 'MPI public register', url: 'https://mpi.my.salesforce-sites.com/publicregister' },
    ],
  },
  {
    id: 'home-based',
    title: 'Home-based food business',
    emoji: '🏠',
    types: ['home-based'],
    summary: 'Preparing and selling food from home still requires Food Act registration and a suitable kitchen setup.',
    steps: [
      'Read Auckland Council\'s home-based business guide — food and non-food rules differ.',
      'Run My Food Rules; home kitchens often register under a national programme or template FCP.',
      'Separate home food prep from commercial prep — dedicated storage, cleaning, and labelling practices.',
      'Provide a site plan showing your kitchen layout and boundaries for registration.',
      'Check whether resource consent is needed for a home occupation affecting neighbours.',
      'Renew registration annually; keep your NZBN consistent or you must re-register.',
    ],
    tip: 'Council verification officers will visit your home kitchen — treat it like a commercial premises audit.',
    links: [
      { label: 'Home-based businesses', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/home-based-businesses.html' },
    ],
  },
  {
    id: 'takeover',
    title: 'Taking over an existing business',
    emoji: '🔑',
    types: ['cafe', 'food-truck'],
    summary: 'Buying or leasing a cafe, restaurant, or food truck — registration and licence transfer pitfalls.',
    steps: [
      'Check the current food registration on the MPI public register — note the verifier and expiry date.',
      'Contact Auckland Council to update ownership, operations, or site details — or submit a new registration.',
      'Review the latest verification report and any open Corrective Action Requests before settlement.',
      'Confirm alcohol licence transfer requirements separately if the venue sells alcohol.',
      'Inspect kitchen or mobile unit compliance — EWOF, gas cert, wastewater for trucks.',
      'Plan your verification timeline — a new owner may trigger an earlier verification visit.',
    ],
    tip: 'A lapsed registration cannot be renewed — you must re-register and pay the full fee again.',
    links: [
      { label: 'Taking over a food business', url: 'https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/taking-over-an-existing-food-business.html' },
    ],
  },
];

let guideFilter = 'all';

function renderGuides() {
  const grid = $('#guides-grid');
  const filtered = guideFilter === 'all'
    ? GUIDES
    : GUIDES.filter((g) => g.types.includes(guideFilter));

  grid.innerHTML = '';

  filtered.forEach((guide) => {
    const card = document.createElement('article');
    card.className = 'guide-card';
    card.innerHTML = `
      <div class="guide-card-header">
        <span class="guide-emoji">${guide.emoji}</span>
        <h3>${guide.title}</h3>
      </div>
      <div class="guide-types">
        ${guide.types.map((t) => `<span class="guide-type-tag">${typeLabel(t)}</span>`).join('')}
      </div>
      <p class="guide-summary">${guide.summary}</p>
      <ol class="guide-steps">
        ${guide.steps.map((s) => `<li>${s}</li>`).join('')}
      </ol>
      <p class="guide-tip"><strong>Tip:</strong> ${guide.tip}</p>
      ${guide.links ? `
        <div class="guide-links">
          ${guide.links.map((l) => `<a class="btn btn-secondary btn-sm" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
        </div>
      ` : ''}
    `;
    grid.appendChild(card);
  });
}

function initGuides() {
  renderGuides();

  $$('[data-guide-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('[data-guide-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      guideFilter = btn.dataset.guideFilter;
      renderGuides();
    });
  });
}