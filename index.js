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
  task: [
    "Type",

    "Description",
    "Status",
    "Created At",
    "Post URL",
    "Completed Actions",
  ],
  log: ["Log", "Date"],
};

function getAllData(tableId, columns) {
  return new Promise(function (resolve, reject) {
    try {
      // Create an array to hold the data
      var data = [];

      // Loop through each record in the table
      Api.DatabaseSelect({}, tableId)
        .then(function (records) {
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

          // Resolve the promise with the data array
          resolve(data);
        })
        .catch(function (error) {
          // Reject the promise with the error message
          reject(error.message);
        });
    } catch (e) {
      // Reject the promise with the error message
      reject(e.message);
    }
  });
}

function getTableInfo(tableName) {
  // Get the table id
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name === tableName;
  }).id;

  // Get the columns
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name === tableName;
  }).columns;

  return { tableId, columns };
}

document.addEventListener("DOMContentLoaded", function () {
  // Example usage for creating table headers for groups, accounts, and tasks:
  createTableHeader(columnNames.account);

  let { tableId: accountTableId, columns: accountColumns } =
    getTableInfo("accounts");
  let { tableId: taskTableId, columns: taskColumns } = getTableInfo("tasks");
  let { tableId: logId, columns: logColumns } = getTableInfo("logs");

  getAllData(accountTableId, accountColumns)
    .then(function (data) {
      loadAllAccountsData(data);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });

  // Toggle mobile menu
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });
  let menu = document.querySelector(".ui.vertical.menu");

  menu.addEventListener("click", (event) => {
    if (!event.target.matches(".item")) return;

    const menuItems = menu.querySelectorAll(".item");
    menuItems.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");

    const target = event.target.id.toLowerCase(); // Convert the ID to lowercase

    switch (target) {
      case "accounts": {
        removeTable();
        createTableHeader(columnNames.account);

        getAllData(accountTableId, accountColumns)
          .then(function (data) {
            loadAllAccountsData(data);
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });

        break;
      }
      case "tasks": {
        removeTable();
        createTableHeader(columnNames.task);

        getAllData(taskTableId, taskColumns)
          .then(function (data) {
            renderTasks(data);
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });

        break;
      }
      case "log": {
        removeTable();
        createTableHeader(columnNames.log);

        getAllData(logId, logColumns)
          .then(function (data) {
            renderLog(data);
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      }
    }
  });

  // Get all cancel buttons
  const cancelButtons = document.querySelectorAll(".ui.cancel.button");

  // Add event listener to each cancel button
  cancelButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Stop event propagation

      // Get the parent modal of the clicked cancel button
      const modal = button.closest(".ui.modal");
      if (modal) {
        // Remove active class from modal and modal-open class from body
        modal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    });
  });

  // Account Modal
  $("#add-single").click(() => $("#addAccountModal").addClass("active"));

  $("#settings").click(() => $("#settingsModal").addClass("active"));

  $("#addAccountButton").click(function () {
    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;
    let proxy = document.querySelector('input[name="proxy"]').value;
    let recovery_email = document.querySelector(
      'input[name="recovery_email"]'
    ).value;
    let recovery_pass = document.querySelector(
      'input[name="recovery_pass"]'
    ).value;
    let phone = document.querySelector('input[name="phone"]').value;

    const accountData = {
      username: username,
      password: password,
      proxy: proxy,
      recovery_email: recovery_email,
      recovery_pass: recovery_pass,
      phone: phone,
      cookies: cookies,
      posts: 0,
      fingerprint: "",
      following: 0,
      followers: 0,
      status: "added",
    };

    insertAccountRow(accountData);
    removeTable();
    createTableHeader(columnNames.account);

    getAllData(accountTableId, accountColumns)
      .then(function (data) {
        loadAllAccountsData(data);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  });
});
