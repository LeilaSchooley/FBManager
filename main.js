const columnNames = {
  group: ["Group Name", "Number of Accounts", "Description", "Actions"],
  account: [
    "Group",
    "Username",
    "Proxy",
    "Posts",
    "Following",
    "Followers",
    "Status",
    "Settings",
    "Actions",
  ],
  task: ["Group", "Account", "Task", "Status", "Actions"],
};

$(document).ready(function () {

  function getTableInfo(tableName) {
    // Get the table id
    var tableId = Api.GetDatabaseStructure().find(function (table) {
      return table.name === tableName;
    }).id;
  
    // Get the columns
    var columns = Api.GetDatabaseStructure().find(function (table) {
      return table.name === tableName;
    }).columns;
    

    
    return  {tableId, columns};
  }




  
  function getAllAccounts(tableId, columns ) {
    try {
   
   
      // Create an array to hold the data
      var data = [];

      // Loop through each record in the table
      Api.DatabaseSelect({}, tableId).then(function (records) {
        records.forEach(function (record) {
          // Create an object to hold the record data
          var obj = {};

          // Loop through each column and get the value for the current record
          columns.forEach(function (column) {
            obj[column.name] = record.data[column.id];
          });

          // Add the object to the data array
          data.push(obj);
        });


        loadAllAccountsData(data);
        // Print the data array to the log
      });
    } catch (e) {
      console.log("Error: " + e.message);
    }
  }
  
  // Example usage for creating table headers for groups, accounts, and tasks:
  createTableHeader(columnNames.account);
  // Code to be executed after the DOM has loaded
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });

  let { tableId: accountTableId, columns: accountColumns } = getTableInfo("accounts");

        
  getAllAccounts(accountTableId, accountColumns);

  
    


  const menu = document.querySelector(".ui.vertical.menu");

  menu.addEventListener("click", (event) => {
    if (!event.target.matches(".item")) return;
  
    const menuItems = menu.querySelectorAll(".item");
    menuItems.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
  
    const target = event.target.textContent.trim();
    switch (target) {
      case "Accounts": {
        const { tableId, columns } = getTableInfo("accounts");
        removeTable();
        createTableHeader(columnNames.account);
        getAllAccounts(tableId, columns);
        break;
      }
      case "Groups": {
        removeTable();
        createTableHeader(columnNames.group);
        const { tableId, columns } = getTableInfo("groups");
        fetchGroups(tableId, columns);
        break;
      }
      case "Tasks": {
        removeTable();
        createTableHeader(columnNames.task);
        renderAllTaskTables(columnNames.task);
        break;
      }
    }
  });
  






  $("#add-single").click(() => addAccountModal.classList.add("active"));
  $("#add-single").click(() => $("#addAccountModal").addClass("active"));
  $("#cancelAddAccountButton").click(() =>
    $("#addAccountModal").removeClass("active")
  );

  $("#addAccountButton").click(function () {
    saveAccountData();
       removeTable();

        createTableHeader(columnNames.account);
        ({ tableId: accountTableId, columns: accountColumns } = getTableInfo("accounts"));
        getAllAccounts(accountTableId, accountColumns);

  });

 

  
  
 
 



  const bulkImportButton = document.getElementById("bulkImportButton");
  const bulkImportModal = document.getElementById("bulkImportModal");
  const bulkImportFileInput = document.getElementById("bulkImportFileInput");
  const fileDisplay = document.getElementById("fileDisplay");
  const bulkImportCancelButton = document.getElementById(
    "bulkImportCancelButton"
  );
  const readFileButton = document.getElementById("readFileButton");
  const bulkImportOkButton = document.getElementById("bulkImportOkButton");

  bulkImportButton.addEventListener("click", () => {
    bulkImportModal.classList.add("active");
    document.body.classList.add("modal-open");
  });

  bulkImportModal.addEventListener("click", (event) => {
    if (event.target === bulkImportModal) {
      bulkImportModal.classList.remove("active");
      document.body.classList.remove("modal-open");
      bulkImportFileInput.value = "";
      fileDisplay.value = "";
    }
  });

  bulkImportCancelButton.addEventListener("click", () => {
    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  });

  readFileButton.addEventListener("click", () => {
    const file = bulkImportFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      fileDisplay.value = contents;
    };
    reader.readAsText(file);
  });

  bulkImportOkButton.addEventListener("click", () => {
    // Read file line by line and add to a list of objects
    const list = [];
    const file = bulkImportFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      const lines = contents.split("\n");
      const list = [];
      for (const line of lines) {
        if (line.trim() !== "") {
          const obj = {};
          const parts = line.split(",");
          if (parts.length >= 2) {
            obj.username = parts[0].trim();
            obj.password = parts[1].trim();
          }
          if (parts.length >= 4) {
            obj.email = parts[2].trim();
            obj.recoveryPass = parts[3].trim();
          }
          if (parts.length >= 5) {
            obj.phone = parts[4].trim();
          }
          if (parts.length >= 6) {
            const proxy = parts[5].trim();
            if (proxy !== "") {
              const partsProxy = proxy.split(":");
              if (partsProxy.length === 2) {
                obj.proxy = {
                  ip: partsProxy[0],
                  port: partsProxy[1],
                };
              } else if (partsProxy.length === 4) {
                obj.proxy = {
                  ip: partsProxy[0],
                  port: partsProxy[1],
                  username: partsProxy[2],
                  password: partsProxy[3],
                };
              }
            }
          }
          list.push(obj);
        }
      }

      list.forEach((data) => {

        insertAccountRow(data);
      });



      
    removeTable()
    createTableHeader(columnNames.account);

        ({ tableId: accountTableId, columns: accountColumns } = getTableInfo("accounts"));
        getAllAccounts(accountTableId, accountColumns);



    };
    reader.readAsText(file);

    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  });
  const taskManagerButton = document.getElementById("taskManagerButton");
  const taskManagerModal = document.getElementById("taskManagerModal");
  const cancelBtn = document.querySelector(".ui.cancel.button");
  const positiveBtn = document.querySelector(".ui.positive.button");

  taskManagerButton.addEventListener("click", () => {
    taskManagerModal.classList.toggle("active");
    document.body.classList.toggle("modal-open");

    $("#tweetModal").modal("show");
  });

  cancelBtn.addEventListener("click", function () {
    taskManagerModal.classList.toggle("active");
    document.body.classList.toggle("modal-open");
  });

  positiveBtn.addEventListener("click", function () {
    taskManagerModal.classList.remove("active");
    document.body.classList.remove("modal-open");

  });

  const accounts = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
  ];

 

  const addGroupButton = document.getElementById("addGroupButton");
  const addGroupModal = document.getElementById("addGroupModal");
  const addGroupBtn = document.getElementById("addGroupBtn");

  addGroupBtn.addEventListener("click", () => {
    const groupNameInput = document.querySelector('input[name="groupName"]');
    const groupDescriptionInput = document.querySelector(
      'textarea[name="groupDescription"]'
    );
    const accountsInput = document.querySelector('input[name="accounts"]');

    // Create the group object
    const group = {
      name: groupNameInput.value,
      description: groupDescriptionInput.value,
      accounts: accountsInput.value.split(","),
    };

    console.log(group);


    
    insertGroupRows(group);
    removeTable();


    createTableHeader(columnNames.group);
    fetchGroups( accountTableId,accountColumns)

  });


  
  addGroupButton.addEventListener("click", () => {
    addGroupModal.classList.toggle("active");
    document.body.classList.toggle("modal-open");

    $("#addGroupModal").modal("show");
  });



  function loadAccounts(accounts) {
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
  loadAccounts(accounts);
});
