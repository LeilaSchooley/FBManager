
function insertGroupRows(name, description) {
  // Create an object to hold the data for the new row
  var row = {};
  
    var tableId = Api.GetDatabaseStructure().find(function (table) {
      return table.name == "accounts";
    }).id;


    
      const newGroup = {
        name: name,
        description: description
      };

      // Insert the new group into the table
      Api.DatabaseInsertGroup( newGroup, tableId).then(function(result) {
        console.log("New group inserted with ID: " + result.id);
      }).catch(function(error) {
        console.log("Error inserting new group: " + error.message);
      });
}

function fetchGroups(tableId, columns) {
  try {

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
      // Print the data array to the log
        
        renderGroups(data)
        
    });
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

// Render all groups in the group list on the page

function renderGroups(groupList) {
  let tableRows = "";
  console.log(groupList);
  groupList.forEach((group) => {
    console.log(group);
    console.log(group["group_id"]);
    tableRows += `
    <tr data-group-id="${group["group_id"]}">
      <td>${group.name}</td>
      <td>1</td>
      <td>${group.description}</td>
      <td>
        <a href="#" class="edit-group-btn">Edit</a> |
        <a href="#" class="delete-group-btn">Delete</a>
      </td>
    </tr>
    `;
  });
  $("tbody").html(tableRows);

  // Add event listeners for edit and delete buttons
  $(".edit-group-btn").click(function() {
    const groupId = $(this).closest("tr").data("group-id");
    console.log(groupId);

    const group = groupList.find(g => g.group_id == groupId);
    console.log(group);

    $("#edit-group-name").val(group.name);
    $("#edit-group-description").val(group.description);
    $("#edit-group-modal")
      .modal("show")
      .data("group-id", groupId);
  });

  $(".delete-group-btn").click(function() {
    const groupId = $(this).closest("tr").data("group-id");
    deleteGroup(groupId);
  });

  // Add event listener for save button in edit group modal
  $("#edit-group-modal .positive.button").click(function() {
    const groupId = $("#edit-group-modal").data("group-id");
    const newName = $("#edit-group-name").val();
    const newDescription = $("#edit-group-description").val();
    editGroupName(groupId, newName, newDescription);
    $("#edit-group-modal").modal("hide");
  });
}

function editGroupName(groupId, newName) {
  // Send an API request to update the group name
  Api.DatabaseUpdateGroup(groupId, { Name: newName }, 1)
    .then((response) => {
      // Update the group name in the UI
      const groupRow = $(`tr[data-group-id='${groupId}']`);
      groupRow.find(".group-name").text(newName);
    })
    .catch((error) => {
      console.log("Error editing group name:", error);
    });
}
function deleteGroup(groupId) {
  // Send an API request to delete the group
  Api.DatabaseDeleteGroupWithData(groupId, 1)
    .then((response) => {
      // Remove the group row from the UI
      const groupRow = $(`tr[data-group-id='${groupId}']`);
      groupRow.remove();
    })
    .catch((error) => {
      console.log("Error deleting group:", error);
    });
}
function addAccountsToGroup(groupId, accountIds) {
  // Send an API request to add the accounts to the group
  Api.DatabaseUpdate(
    groupId,
    { AccountIds: accountIds },
    1
  )
    .then((response) => {
      // Reload the page to update the UI
      location.reload();
    })
    .catch((error) => {
      console.log("Error adding accounts to group:", error);
    });
}
function removeAccountsFromGroup(groupId, accountIds) {
  // Send an API request to remove the accounts from the group
  Api.DatabaseUpdate(
    groupId,
    { AccountIds: accountIds },
    1
  )
    .then((response) => {
      // Reload the page to update the UI
      location.reload();
    })
    .catch((error) => {
      console.log("Error removing accounts from group:", error);
    });
}