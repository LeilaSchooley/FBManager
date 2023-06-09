// Function to add a new task row to the table
function addlog(log) {
  const row = document.createElement("tr");

  const logCell = document.createElement("td");
  logCell.textContent = log.log;

  const dateCell = document.createElement("td");
  dateCell.textContent = log.date;

  row.appendChild(logCell);
  row.appendChild(dateCell);

  tbody.appendChild(row);
}

function renderLog(logs) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  logs.forEach((log) => addlog(log));
}

