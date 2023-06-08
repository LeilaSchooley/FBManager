




let Task = (taskName, tweeting, retweeting, liking, replying, mentioning, directMessaging, hashtagging, following, unfollowing, blocking, reporting) => {
  return {
    taskName,
    tweeting,
    retweeting,
    liking,
    replying,
    mentioning,
    directMessaging,
    hashtagging,
    following,
    unfollowing
  };
};

function addTask() {
  const taskName = $('input[name="taskName"]').val();
  const tweeting = $('input[name="tweeting"]').is(":checked");
  const retweeting = $('input[name="retweeting"]').is(":checked");
  const liking = $('input[name="liking"]').is(":checked");
  const replying = $('input[name="replying"]').is(":checked");
  const mentioning = $('input[name="mentioning"]').is(":checked");
  const directMessaging = $('input[name="directMessaging"]').is(":checked");
  const hashtagging = $('input[name="hashtagging"]').is(":checked");
  const following = $('input[name="following"]').is(":checked");
  const unfollowing = $('input[name="unfollowing"]').is(":checked");


  console.log("Task Name:", taskName);
  console.log("Tweeting:", tweeting);
  console.log("Retweeting:", retweeting);
  console.log("Liking:", liking);
  console.log("Replying:", replying);
  console.log("Mentioning:", mentioning);
  console.log("Direct Messaging:", directMessaging);
  console.log("Hashtagging:", hashtagging);
  console.log("Following:", following);
  console.log("Unfollowing:", unfollowing);

  // Add task to the task list
  // ...#


  let newTask = Task(
    taskName,
    tweeting,
    retweeting,
    liking,
    replying,
    mentioning,
    directMessaging,
    hashtagging,
    following,
    unfollowing
  );
    

  createTaskTable(newTask)
}


function createTaskTable(task) {
  // Get a reference to the table element
  const table = document.querySelector('table');

  // Clear any existing rows from the table

  // Create the table body element
  let tableBody = document.querySelector('tbody');
  if(!tableBody) tableBody = document.createElement('tbody');
  
  // Create a table row element
  const tableRow = document.createElement('tr');

  // Create the table cells (td) and add text content
  const groupCell = document.createElement('td');
  groupCell.textContent = "task.group";
  const accountCell = document.createElement('td');
  accountCell.textContent = task.account;
  const taskCell = document.createElement('td');
  taskCell.textContent = task.task;
  const statusCell = document.createElement('td');
  statusCell.textContent = task.status;
  const actionsCell = document.createElement('td');
  // Add action buttons to the actions cell
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // Call the editTask function and pass the task object as an argument
    editTask(task);
  });
  actionsCell.appendChild(editButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Call the deleteTask function and pass the task object as an argument
    deleteTask(task);
  });
  actionsCell.appendChild(deleteButton);

  // Append the table cells to the table row
  tableRow.appendChild(groupCell);
  tableRow.appendChild(accountCell);
  tableRow.appendChild(taskCell);
  tableRow.appendChild(statusCell);
  tableRow.appendChild(actionsCell);

  // Append the table row to the table body
  tableBody.appendChild(tableRow);


// Append the table body to the table element
table.appendChild(tableBody);
}

function renderAllTaskTables(tasks) {
  tasks.forEach((element) => createTaskTable(element));
}