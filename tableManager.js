 

// Function to create table header
function createTableHeader(columnNames) {
  let table = document.querySelector("table");
  let tableHeader = document.querySelector("thead");
  if (!tableHeader) {
    tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
  }
  
  tableHeader.innerHTML = "";

  const headerRow = document.createElement("tr");
  columnNames.forEach((columnName) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = columnName;
    headerRow.appendChild(headerCell);
  });
  tableHeader.appendChild(headerRow);
}


function updateTableRowCount() {
  const tbody = document.querySelector("tbody");
  const rowCount = tbody.querySelectorAll("tr").length;

  $("h1").text(`Accounts: ${rowCount}`);
}

function removeTable() {
  const tableBody = document.querySelector("tbody");
  const tableHeader = document.querySelector("thead");
  if (tableBody) {
    tableBody.innerHTML = "";
  }
  if (tableHeader) {
    tableHeader.innerHTML = "";
  }
}


function updateTableRowCount() {
  const tbody = document.querySelector("tbody");
  const rowCount = tbody.querySelectorAll("tr").length;

  $("h1").text(`Accounts: ${rowCount}`);
}

