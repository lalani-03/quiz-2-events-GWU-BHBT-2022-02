/* main.js — Simple version for Event Showcase */

// Event Data  
const events = [
  {
    title: "Opening Keynote: The Future of AI",
    type: "Keynote",
    date: "2025-11-20T09:00:00",
    description: "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
    image: "images/keynote.jpg"
  },
  {
    title: "Advanced JavaScript Workshop",
    type: "Workshop",
    date: "2025-11-20T10:30:00",
    description: "A 3-hour hands-on session on asynchronous JavaScript and modern ES6+ features.",
    image: "images/workshop-js.jpg"
  },
  {
    title: "Cybersecurity in the Cloud Era",
    type: "Talk",
    date: "2025-11-20T11:00:00",
    description: "Explore cloud security threats and defense strategies.",
    image: "images/cybersecurity.jpg"
  },
  {
    title: "Networking Mixer & Welcome Reception",
    type: "Social",
    date: "2025-11-20T17:00:00",
    description: "Connect with fellow attendees over drinks and appetizers.",
    image: "images/mixer.jpg"
  }
];

const container = document.getElementById("event-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");

let activeFilter = "All";
let searchQuery = "";

// Render Events 
function renderEvents() {
  container.innerHTML = ""; // Clear previous content

  const filtered = events.filter(event => {
    const matchesFilter = activeFilter === "All" || event.type === activeFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  filtered.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-media">
        <img src="${event.image}" alt="${event.title}">
      </div>
      <div class="event-body">
        <div class="event-type">${event.type}</div>
        <h2 class="event-title">${event.title}</h2>
        <p class="event-desc">${event.description}</p>
        <div class="event-footer">
          <span>${formatDate(event.date)}</span>
          <button class="btn small">Details</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Date Formatter  
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

// Filter Buttons 
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.getAttribute("data-filter");
    renderEvents();
  });
});

// Search Input  
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  renderEvents();
});

// Initial Load  
document.addEventListener("DOMContentLoaded", renderEvents);