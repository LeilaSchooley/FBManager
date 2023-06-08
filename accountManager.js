
function insertAccountRow(data) { 
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

    row[columns.find((column) => column.name === "username").id] =
      data.username;
    row[columns.find((column) => column.name === "password").id] =
      data.password;
    row[columns.find((column) => column.name === "proxy").id] = data.proxy;
    row[columns.find((column) => column.name === "recovery_email").id] =
    "";
    row[columns.find((column) => column.name === "recovery_pass").id] =
    "";
    row[columns.find((column) => column.name === "phone").id] = "";
    row[columns.find((column) => column.name === "cookies").id] =
    "";
    row[columns.find((column) => column.name === "posts").id] =
    "";
    row[columns.find((column) => column.name === "fingerprint").id] =
    "";
    row[columns.find((column) => column.name === "following").id] =
    "";
    row[columns.find((column) => column.name === "followers").id] =
    "";
    row[columns.find((column) => column.name === "status").id] = "";
  
  // Insert the new row into the table
  Api.DatabaseInsert([], row, tableId)
    .then(() => {
      console.log(`Row inserted successfully {tableId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}


function loadAccountData(accountData) {
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");
  
  
  row.appendChild(document.createElement("td")).textContent = accountData["group"];
  row.appendChild(document.createElement("td")).textContent = accountData["username"];
  row.appendChild(document.createElement("td")).textContent = accountData.proxy;
  row.appendChild(document.createElement("td")).textContent = accountData["posts"];
  row.appendChild(document.createElement("td")).textContent = accountData["following"];
  row.appendChild(document.createElement("td")).textContent = accountData["followers"];
  row.appendChild(document.createElement("td")).textContent = accountData["status"];


  tbody.appendChild(row);
  return row;
  }
  

function saveAccountData() {

    // Do something with the account data object
  // Get the ID for the "accounts" table
  const accountsTableId = Api.GetDatabaseStructure().find(
    (table) => table.name === "accounts"
  ).id;

  console.log(accountsTableId);
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const proxy = document.querySelector('input[name="proxy"]').value;
  // do something with the values

  console.log(username);
  console.log(password);
  console.log(proxy);
  // Create an object representing the account data
  const accountData = {

    username: username,
    password: password,
    proxy: proxy,
    recovery_email: "",
    recovery_pass: "",
    phone: "",
    cookies: "eyJjb29NGY2ODA2NDgyNmEyZjAxYzI1OTU2NDliNWZlNzk0YyJ9LHsiZG9t3aXR0ZXIuY29tIiFjRDQifV19",
    posts: "44",
    fingerprint: "",
    following: "3",
    followers: "2",
    status: "",
  };
  
  Api.DatabaseInsert([], accountData, accountsTableId)
    .then(() => {
      console.log(`Row inserted successfully {tableId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}

function loadAllAccountsData(data) {
  for (var i = 0; i < data.length; i++) {
    console.log("loading data");
    loadAccountData(data[i]);
  }
}



  function loadAccountsToDropdown(accounts) {
    const dropdown = document.querySelector(".ui.dropdown.multiple");
    const menu = dropdown.querySelector(".menu");
    const accountsInput = dropdown.querySelector('input[name="accounts"]');

    // Clear the dropdown
    menu.innerHTML = "";

    // Loop through the accounts and add them to the dropdown
    accounts.forEach((account) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.dataset.value = account.id;
      item.innerHTML = account.username;

      // Add click event to select or deselect account
      item.addEventListener("click", () => {
        item.classList.toggle("selected");
        const selectedItems = menu.querySelectorAll(".selected");
        const selectedAccountIds = Array.from(selectedItems).map(
          (item) => item.dataset.value
        );
        accountsInput.value = selectedAccountIds.join(",");
      });

      menu.appendChild(item);
    });

    // Initialize the dropdown
    $(dropdown).dropdown("restore defaults");
  }
