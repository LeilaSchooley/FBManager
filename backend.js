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
