// Task Manager Modal
const tbody = document.querySelector("tbody");

const taskManagerButton = document.getElementById("taskManagerButton");
const taskManagerModal = document.getElementById("taskManagerModal");
const taskManagerModalButton = taskManagerModal.querySelector(".ui.positive.button");
const positiveBtn = document.querySelector(".ui.positive.button");

taskManagerButton.addEventListener("click", () => {
  taskManagerModal.classList.toggle("active");
  document.body.classList.toggle("modal-open");

  $("#tweetModal").modal("show");
});

taskManagerModalButton.addEventListener("click", () => {
  const postUrlInput = taskManagerModal.querySelector('input[name="postUrl"]');
  const actionInputs = taskManagerModal.querySelectorAll('input[name="action"]');
  const numActionsInput = taskManagerModal.querySelector('input[name="numActions"]');

  const postData = {
    id: generateUniqueId(),
    description: "",
    type: "",
    status: "Pending",
    createdAt: new Date(),
    postUrl: postUrlInput.value,
    completedActions: 0
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

  closeModal();
});

function renderTasks(tasks) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  tasks.forEach((task) => {
    addTaskRow(task);
  });
}


const tasks = [
  {
    id: generateUniqueId(),
    description: "Task 1",
    type: "Like",
    status: "In Progress",
    createdAt: new Date(),
    postUrl: "https://example.com/post1",
    completedActions: 10,
  },
  {
    id: generateUniqueId(),
    description: "Task 2",
    type: "Comment",
    status: "Completed",
    createdAt: new Date(),
    postUrl: "https://example.com/post2",
    completedActions: 20,
  },
];



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


