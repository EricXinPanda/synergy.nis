import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

let projects = [];

const updates = [
  {
    date: "AUG 23, 2026",
    title: "SYNERGY Promotion Start",
    description: "Vote for SYNERGY, the NIS STUCO CANDIDATE 26'-27'!",
    tag: "NEW"
  },
  {
    date: "AUG 22, 2026",
    title: "SYNERGY Team Photos",
    description: "SYNERGY team members went out to take lots of pictures.",
    tag: "NEW"
  },
  {
    date: "AUG 21, 2026",
    title: "SYNERGY Promotion Video Trial 1 Failled",
    description: "After few hours of filming, the first trial of the recording failled.",
    tag: "NEW"
  }
];

const roadmap = [
  {
    date: "NOW",
    title: "Listen ",
    description: "Collect student input, we listen to your opinions.",
    current: true
  },
  {
    date: "NEXT",
    title: "Build",
    description: "Start having conversations with the school administration to make the ideas a reality."
  },
  {
    date: "THEN",
    title: "Deliver",
    description: "Publish the results to the school community."
  },
  {
    date: "ONGOING",
    title: "Repeat",
    description: "Redoing the above steps to make sure we are always improving."
  }
];

const ideaFormLink = "https://forms.gle/QZ5R4yh2C7F7q1BMA";

const grid = document.getElementById("progressGrid");
const updatesList = document.getElementById("updatesList");
const timeline = document.getElementById("timeline");

function statusLabel(status) {
  return {
    complete: "Completed",
    active: "In Progress",
    planned: "Planned"
  }[status];
}

function renderProjects(filter = "all") {
  const filtered = filter === "all"
    ? projects
    : projects.filter(project => project.status === filter);

  grid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <div class="project-top">
        <span class="project-category">${project.category}</span>
        <span class="status-pill status-${project.status}">${statusLabel(project.status)}</span>
      </div>

      <h3>${project.title}</h3>
      <p>${project.description}</p>

      <div class="project-progress">
        <div class="project-progress-row">
          <span>PROGRESS</span>
          <span>${project.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${project.progress}%"></div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderUpdates() {
  updatesList.innerHTML = updates.map(update => `
    <article class="update-item">
      <div class="update-date">${update.date}</div>
      <div>
        <p class="update-title">${update.title}</p>
        <p class="update-description">${update.description}</p>
      </div>
      <span class="update-tag">${update.tag}</span>
    </article>
  `).join("");
}

function renderTimeline() {
  timeline.innerHTML = roadmap.map(item => `
    <article class="timeline-item ${item.current ? "current" : ""}">
      <span class="timeline-dot"></span>
      <span class="timeline-date">${item.date}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `).join("");
}

function updateDashboard() {
  const average = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) / projects.length
  );

  const completed = projects.filter(p => p.status === "complete").length;
  const active = projects.filter(p => p.status === "active").length;

  document.getElementById("overallPercent").textContent = average;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("activeCount").textContent = active;
  document.getElementById("lastUpdated").textContent = "August 22, 2026";

  setTimeout(() => {
    document.getElementById("overallBar").style.width = `${average}%`;
  }, 250);
}

document.getElementById("filters").addEventListener("click", event => {
  if (!event.target.matches(".filter")) return;

  document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderProjects(event.target.dataset.filter);
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("nav").classList.remove("open");
  });
});

document.getElementById("ideaButton").addEventListener("click", event => {
  event.preventDefault();

  if (ideaFormLink) {
    window.open(ideaFormLink, "_blank");
    return;
  }

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
});

onSnapshot(
  collection(db, "projects"),

  (snapshot) => {
    const firebaseProjects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Firestore projects:", firebaseProjects);

    if (firebaseProjects.length > 0) {
      projects = firebaseProjects;

      renderProjects();
      updateDashboard();
    }
  },

  (error) => {
    console.error("Firestore error:", error);
  }
);

renderProjects();
renderUpdates();
renderTimeline();
updateDashboard();
