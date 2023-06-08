let tasks = [
    {
      group: "Group A",
      account: "Account 1",
      task: "Tweet",
      status: "Pending",
    },
    {
      group: "Group B",
      account: "Account 2",
      task: "Retweet",
      status: "Completed",
    },
    {
      group: "Group A",
      account: "Account 3",
      task: "Follow",
      status: "Pending",
    },
  ];

function getAllTasks() {
  return tasks;
}


function addTask(task) {
    task.id = tasks.length + 1;
    tasks.push(task);
    saveTasks();
  }
  
  function deleteTask(taskId) {
    const index = tasks.findIndex(t => t.id === taskId);
    tasks.splice(index, 1);
    saveTasks();
  }

