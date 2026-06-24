# Hospo Guide

**Auckland hospitality & food-business resource finder** — licences, compliance checklists, event discovery, and marketing tools for food trucks, cafes, market stalls, and event organisers in Tāmaki Makaurau.

Built as a lightweight Node.js web app with no database: static guides and council links on disk, live Auckland events aggregated from 30+ public sources, and browser `localStorage` for drafts.

> **Not legal advice.** This app curates official Auckland Council, MPI, and third-party links. Always confirm requirements with council or MPI before operating.

---

## Features

| Tab | What it does |
|-----|----------------|
| **Guides** | Step-by-step startup paths for food trucks, cafes, market stalls, events, and marketing |
| **Licences** | Searchable directory of Auckland Council food registrations, trading licences, alcohol, and support links |
| **Events** | Browse upcoming Auckland events from many ticket/listing sites; filter by source, category, region, and “food truck opportunities” |
| **Events → List** | 4-step wizard to draft an [OurAuckland](https://ourauckland.aucklandcouncil.govt.nz/events/list-an-event/) council event listing |
| **Advertise** | 4-step Meta (Facebook/Instagram) campaign draft wizard for food businesses |
| **Checklist** | Per-business-type compliance checklists (persisted in browser) |
| **Support** | Key council and MPI contacts |

---

## Quick start

**Requirements:** [Node.js](https://nodejs.org/) 18+ (tested on Node 24)

```bash
git clone https://github.com/Thedoctorjpg/hospo-guide.git
cd hospo-guide
node server.js
```

Open **http://localhost:3852**

The server binds to port `3852` by default (see `PORT` in `server.js`).

---

## API

### `GET /api/resources`

Search curated licence and registration links.

| Parameter | Description |
|-----------|-------------|
| `type` | Business type: `food-truck`, `cafe`, `stall`, `home-based`, `event` |
| `q` | Free-text search |

### `GET /api/contacts`

Returns support contacts from `data/contacts.json` (hosposupport, ehsupport, MPI, etc.).

### `GET /api/events`

Aggregates Auckland events from external sources. Results are cached in memory (~15 minutes; cache key `events-v31`).

| Parameter | Description |
|-----------|-------------|
| `source` | Filter to one provider (see table below) |
| `category` | AucklandNZ category slug |
| `meetupCategory` | Meetup category filter |
| `region` | Auckland region slug |
| `q` | Title/venue search |
| `hospitality` | `1` to surface food/drink/market-friendly events |
| `startDate` | ISO date lower bound |

**Example:**

```bash
curl "http://localhost:3852/api/events?source=basement&hospitality=1"
```

---

## Event sources

Events are fetched, normalised, and de-duplicated server-side. Each event has a `source` slug:

| Slug | Provider |
|------|----------|
| `aucklandnz` | [AucklandNZ](https://www.aucklandnz.com/events) |
| `meetup` | [Meetup Auckland](https://www.meetup.com/find/?location=nz--New+Zealand--Auckland) |
| `aucklandlive` | [Auckland Live](https://www.aucklandlive.co.nz/) |
| `atc` | [Auckland Theatre Company](https://www.atc.co.nz/whats-on) |
| `qtheatre` | [Q Theatre](https://www.qtheatre.co.nz/shows) |
| `hlt` | [Howick Little Theatre](https://hlt.org.nz/whats-on/events-calendar/) |
| `nyt` | [National Youth Theatre](https://nyt.nz/onstage) |
| `iticket` | [iTicket](https://www.iticket.co.nz/) |
| `rnzb` | [Royal New Zealand Ballet](https://rnzb.org.nz/whats-on) |
| `basement` | [Basement Theatre](https://basementtheatre.co.nz/) |
| `ticketmaster` | [Ticketmaster Auckland](https://www.ticketmaster.co.nz/discover/auckland) |
| `sparkarena` | [Spark Arena](https://www.sparkarena.co.nz/all-events) |
| `edenpark` | [Eden Park](https://edenpark.co.nz/events/) |
| `eventbrite` | [Eventbrite Auckland](https://www.eventbrite.co.nz/d/new-zealand--auckland/events/) |
| `eventfinda` | [Eventfinda](https://www.eventfinda.co.nz/) |
| `humanitix` | [Humanitix NZ](https://humanitix.com/nz) |
| `cheeky` | [Cheeky Events](https://cheekyevents.net/location/auckland/) |
| `aucklandforkids` | [Auckland for Kids](https://www.aucklandforkids.co.nz/whats-on-today/) |
| `fever` | [Fever Auckland](https://feverup.com/en/auckland/) |
| `tripadvisor` | [TripAdvisor Auckland activities](https://www.tripadvisor.co.nz/) |
| `eventcinemas` | [Event Cinemas](https://www.eventcinemas.co.nz/) |
| `hoyts` | [HOYTS](https://www.hoyts.co.nz/) |
| `rialto` | [Rialto Newmarket](https://www.rialto.co.nz/cinema/newmarket) |
| `duedrop` | [Due Drop Events Centre](https://duedropeventscentre.org.nz/whats-on) |
| `nightmarkets` | [Auckland Night Markets](https://www.aucklandnightmarkets.co.nz/locations) |
| `ftc` | [Food Truck Collective](https://foodtruckcollective.co.nz/events) |
| `acbmarkets` | [Auckland Convention Bureau markets](https://aucklandconventionbureau.com/visit/taste/markets) |
| `opencircle` | [Open Circle Markets](https://markets.opencirclemarkets.com/) |
| `aucklandmarket` | [Auckland Markets NZ](https://aucklandmarketnz.co.nz/) |
| `touristtrip` | [Tourist Trip Planner street markets](https://touristtripplanner.com/city/auckland/street_markets) |

Scrapers use identifiable `User-Agent` strings and respect rate limits via in-memory caching. Third-party site structure changes may require parser updates in `server.js`.

---

## Project structure

```
hospo-guide/
├── server.js           # HTTP server, event fetchers, APIs
├── index.html          # Single-page UI (tabs)
├── css/styles.css
├── data/
│   ├── resources.json  # Council/MPI licence links
│   └── contacts.json   # Support contacts
└── js/
    ├── app.js          # Tab routing
    ├── guides.js       # Startup guide content
    ├── licences.js     # Licence search UI
    ├── events.js       # Event browser
    ├── list-event.js   # OurAuckland listing wizard
    ├── meta-ad.js      # Meta ads draft wizard
    ├── checklist.js    # Compliance checklists
    ├── support.js      # Contacts panel
    └── utils.js        # Shared helpers
```

---

## Key official resources

- [Food businesses & quality grading (Auckland Council)](https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading.html)
- [Apply for food registration](https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/food-businesses-quality-grading/open-food-business/apply-food-registration.html)
- [MPI My Food Rules](https://www.mpi.govt.nz/food-business/food-safety-rules) — Food Control Plan vs National Programme
- [Hospitality support form](https://www.aucklandcouncil.govt.nz/en/licences-regulations/business-licences/hospitality-support-quick-help-form.html)
- [List an event (OurAuckland)](https://ourauckland.aucklandcouncil.govt.nz/events/list-an-event/)

**Typical timeframes:** ~25 working days for food registration; verification often ~6 weeks after registration.

---

## Scope & limitations

- **Auckland-focused** for council verification, trading licences, and regional event filters. National food rules (Food Act 2014) apply NZ-wide, but local council processes differ.
- **No authentication** — checklist, event-listing, and ad drafts live in your browser only.
- **No payment processing** — Meta and council forms open in their own sites.
- **Event data is best-effort** — always confirm dates, venues, and ticketing on the source site.

---

## Development

```bash
# Syntax check
node --check server.js

# Reload after changes (stop existing process first if port in use)
node server.js
```

To bump the events cache after parser changes, update the `events-v*` key in `server.js` (`cacheKey` call in the events handler).

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Thedoctorjpg

Third-party event data, logos, and linked content remain property of their respective owners. This project is not affiliated with Auckland Council, MPI, or any listed event provider.