const columnNames = {
  group: ["Group Name", "Number of Accounts", "Description", "Actions"],
  account: [
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

document.addEventListener("DOMContentLoaded", function () {
  // Example usage for creating table headers for groups, accounts, and tasks:
  createTableHeader(columnNames.account);
  checkTasks();
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
