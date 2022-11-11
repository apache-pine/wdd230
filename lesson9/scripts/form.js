const now = new Date();

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

document.querySelector("#sub-date").value = fullDate;