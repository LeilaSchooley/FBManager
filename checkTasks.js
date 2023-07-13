function checkTasks(tableId, columns) {
  getAllData(tableId, columns)
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}
