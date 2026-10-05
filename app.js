const DESTINATIONS = [
  { city: "New York", code: "JFK", meeting: "Bank CIO, 9:00 sharp" },
  { city: "Tokyo", code: "HND", meeting: "Telco exec dinner" },
  { city: "London", code: "LHR", meeting: "Insurance board review" },
  { city: "Hong Kong", code: "HKG", meeting: "Telco rollout kickoff" },
  { city: "São Paulo", code: "GRU", meeting: "Retail voice agent demo" },
  { city: "Sydney", code: "SYD", meeting: "Airline contact center" },
  { city: "Berlin", code: "BER", meeting: "Utility customer QBR" },
  { city: "Dubai", code: "DXB", meeting: "Government pilot signing" },
];

const EXCUSES = [
  "Cancelled: Tsalach is in a meeting about meetings",
  "Cancelled: Tsalach is reviewing one more PR",
  "Cancelled: Tsalach said “next week”",
  "Cancelled: Tsalach is debugging the harness",
  "Cancelled: Tsalach is at the HQ coffee machine",
  "Cancelled: Tsalach forgot his passport at the office",
];

const MEETINGS = [
  "Bank CIO, 9:00 sharp",
  "Telco exec dinner",
  "Insurance board review",
  "Retail voice agent demo",
  "Airline contact center",
  "Government pilot signing",
  "Utility customer QBR",
];

const GALLERY = [
  { src: "img/01_tel_aviv_hq.jpg", caption: "Reality: HQ, staring at the map. Again." },
  { src: "img/02_business_class.jpg", caption: "The dream: business class, laptop open, customers waiting." },
  { src: "img/03_tokyo_customer.jpg", caption: "Tokyo. One handshake, one signed telco." },
  { src: "img/04_new_york_contracts.jpg", caption: "New York. Suitcase full of contracts." },
];

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDepartureTime(minutesFromNow) {
  const departure = new Date(Date.now() + minutesFromNow * 60_000);
  return departure.toTimeString().slice(0, 5);
}

function renderDepartures() {
  const rows = DESTINATIONS.slice(0, 6).map((destination, index) => {
    const flightNumber = `LY${300 + index * 17}`;
    const excuse = EXCUSES[index % EXCUSES.length];
    return `<tr>
      <td>${formatDepartureTime(20 + index * 35)}</td>
      <td>${flightNumber}</td>
      <td>${destination.city} (${destination.code})</td>
      <td>TSALACH/E</td>
      <td class="status-cancelled">${excuse}</td>
    </tr>`;
  });

  document.getElementById("departures").innerHTML = rows.join("");
}

function renderGallery() {
  if (GALLERY.length === 0) {
    document.getElementById("gallery").hidden = true;
    return;
  }

  const figures = GALLERY.map(
    (image) => `<figure><img src="${image.src}" alt="${image.caption}" loading="lazy"><figcaption>${image.caption}</figcaption></figure>`,
  );
  document.getElementById("galleryGrid").innerHTML = figures.join("");
}

function startHqTimer() {
  const timer = document.getElementById("hqTimer");
  const openedAt = Date.now();
  setInterval(() => {
    timer.textContent = Math.floor((Date.now() - openedAt) / 1000).toLocaleString();
  }, 1000);
}

function getPlaceName(destination) {
  if (destination.city === destination.country) {
    return destination.city;
  }

  return `${destination.city}, ${destination.country}`;
}

function getGoogleFlightsUrl(destination) {
  const departure = new Date(Date.now() + 7 * 24 * 60 * 60_000).toISOString().slice(0, 10);
  const query = `Flights to ${destination.code} from TLV on ${departure} one way`;
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
}

function bookFlight() {
  const destination = getRandomItem(COUNTRIES);
  const flightsUrl = getGoogleFlightsUrl(destination);
  window.open(flightsUrl, "_blank", "noopener");

  document.getElementById("passCode").textContent = destination.code;
  document.getElementById("passMeeting").textContent = getRandomItem(MEETINGS);
  document.getElementById("passGate").textContent = `B${Math.ceil(Math.random() * 12)}`;
  document.getElementById("passNote").textContent = `${getPlaceName(destination)}. He'll probably still be in HQ tomorrow.`;
  document.getElementById("passLink").href = flightsUrl;
  document.getElementById("boardingPass").hidden = false;

  const answer = document.getElementById("answer");
  answer.textContent = "FOR NOW.";
  answer.classList.add("flying");
  document.getElementById("subline").textContent = `Flight to ${destination.country} found. We'll believe it when we see it.`;
}

renderDepartures();
renderGallery();
startHqTimer();
document.getElementById("sendButton").addEventListener("click", bookFlight);
