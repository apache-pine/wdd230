const visitsDisplay = document.querySelector(".lastVisit");

let currentVisit = Date.now();

let lastVisit = Number(window.localStorage.getItem("lastVisitLs"));

let lastVisitDate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(new Date(lastVisit));

let timeSinceLast = Math.round((currentVisit - lastVisit) / (86400000));

if (lastVisit !== 0) {
  visitsDisplay.textContent = "The last time you visited this page was "+lastVisitDate+", which was "+timeSinceLast+" days ago. Welcome back!";
} else {
  visitsDisplay.textContent = "This is your first time visiting this page!"
};

localStorage.setItem("lastVisitLs", currentVisit);