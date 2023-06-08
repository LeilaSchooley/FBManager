// Example usage for creating table headers for groups, accounts, and tasks:

 function createTableHeader(columnNames) {
  let tableHeader = document.querySelector("thead");
  if (!tableHeader) tableHeader = document.createElement("thead");

  const tableHeaderRow = document.createElement("tr");
  
  columnNames.forEach((columnName) => {
    const tableHeaderCell = document.createElement("th");
    tableHeaderCell.textContent = columnName;
    tableHeaderRow.appendChild(tableHeaderCell);
  });
  let table = document.querySelector("table");

  tableHeader.appendChild(tableHeaderRow);

  table.appendChild(tableHeader)

  return table;
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