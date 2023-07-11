function insertAccountRow(data) {

  // Create an object representing the account data


  // Get the table id of the Accounts table
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "accounts";
  }).id;

  // Get the columns for the Accounts table
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "accounts";
  }).columns;

  // Create an object to hold the data for the new row
  var row = {};

  // Populate the object with the data for the new row

  row[columns.find((column) => column.name === "username").id] = data.username;
  row[columns.find((column) => column.name === "password").id] = data.password;
  row[columns.find((column) => column.name === "proxy").id] = data.proxy;
  row[columns.find((column) => column.name === "recovery_email").id] = "";
  row[columns.find((column) => column.name === "recovery_pass").id] = "";
  row[columns.find((column) => column.name === "phone").id] = "";
  row[columns.find((column) => column.name === "cookies").id] = "";
  row[columns.find((column) => column.name === "posts").id] = "";
  row[columns.find((column) => column.name === "fingerprint").id] = "";
  row[columns.find((column) => column.name === "following").id] = "";
  row[columns.find((column) => column.name === "followers").id] = "";
  row[columns.find((column) => column.name === "status").id] = "";
  


  // Insert the new row into the table
  Api.DatabaseInsert([], row, tableId)
    .then((InsertedRecordId) => {
      console.log(`Row inserted successfully ${InsertedRecordId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}

function loadAccountData(accountData) {
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");

  row.appendChild(document.createElement("td")).textContent =
    accountData["group"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["username"];
  row.appendChild(document.createElement("td")).textContent = accountData.proxy;
  row.appendChild(document.createElement("td")).textContent =
    accountData["posts"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["following"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["followers"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["status"];

  tbody.appendChild(row);
  return row;
}
function loadAllAccountsData(data) {
  for (var i = 0; i < data.length; i++) {

    loadAccountData(data[i]);
  }
}

