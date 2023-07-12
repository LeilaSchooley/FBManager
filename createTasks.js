// Task Manager Modal
const tbody = document.querySelector("tbody");

const taskManagerButton = document.getElementById("taskManagerButton");
const taskManagerModal = document.getElementById("taskManagerModal");
const taskManagerModalButton = taskManagerModal.querySelector(
  ".ui.positive.button"
);
const positiveBtn = document.querySelector(".ui.positive.button");

taskManagerButton.addEventListener("click", () => {
  taskManagerModal.classList.toggle("active");
  document.body.classList.toggle("modal-open");

  $("#tweetModal").modal("show");
});

function loadAllTasks(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach((accountData) => loadAccountData(accountData));
}

function insertTaskRow(data) {
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

  row[columns.find((column) => column.name === "postUrl").id] = data["postUrl"];
  row[columns.find((column) => column.name === "type").id] = data["type"];
  row[columns.find((column) => column.name === "description").id] =
    data["description"];
  row[columns.find((column) => column.name === "status").id] = data["status"];
  row[columns.find((column) => column.name === "completedActions").id] =
    data["completedActions"];
  row[columns.find((column) => column.name === "createdAt").id] =
    data["createdAt"];

  // Insert the new row into the table
  Api.DatabaseInsert([], row, tableId)
    .then((InsertedRecordId) => {
      console.log(`Added task Row successfully ${InsertedRecordId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}

taskManagerModalButton.addEventListener("click", () => {
  const postUrlInput = taskManagerModal.querySelector('input[name="postUrl"]');
  const actionInputs = taskManagerModal.querySelectorAll(
    'input[name="action"]'
  );
  const numActionsInput = taskManagerModal.querySelector(
    'input[name="numActions"]'
  );

  const postData = {
    id: generateUniqueId(),
    description: "",
    type: "",
    status: "Pending",
    createdAt: new Date(),
    postUrl: postUrlInput.value,
    completedActions: 0,
  };

  // Find the selected action
  actionInputs.forEach((input) => {
    if (input.checked) {
      postData.type = input.value;
      postData.description = input.parentElement.textContent.trim();
    }
  });

  // Add the new task row to the table
  addTaskRow(postData);
  insertTaskRow(data);
  closeModal();
});

function renderTasks(tasks) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  tasks.forEach((task) => {
    addTaskRow(task);
  });
}

// Function to generate a unique ID for tasks
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to add a new task row to the table
function addTaskRow(task) {
  const row = document.createElement("tr");

  const taskIdCell = document.createElement("td");
  taskIdCell.textContent = task.id;

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = task.description;

  const typeCell = document.createElement("td");
  typeCell.textContent = task.type;

  const statusCell = document.createElement("td");
  statusCell.textContent = task.status;

  const createdAtCell = document.createElement("td");
  createdAtCell.textContent = task.createdAt.toLocaleString();

  const postUrlCell = document.createElement("td");
  postUrlCell.innerHTML = `<a href="${task.postUrl}" target="_blank">${task.postUrl}</a>`;

  const completedActionsCell = document.createElement("td");
  completedActionsCell.textContent = task.completedActions;

  row.appendChild(taskIdCell);
  row.appendChild(descriptionCell);
  row.appendChild(typeCell);
  row.appendChild(statusCell);
  row.appendChild(createdAtCell);
  row.appendChild(postUrlCell);
  row.appendChild(completedActionsCell);

  tbody.appendChild(row);
}
