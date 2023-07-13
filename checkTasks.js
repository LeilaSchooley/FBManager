getAllData(logId, logColumns)
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
