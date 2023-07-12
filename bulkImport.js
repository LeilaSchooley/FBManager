const bulkImportButton = document.getElementById("bulkImportButton");
const bulkImportModal = document.getElementById("bulkImportModal");
const bulkImportFileInput = document.getElementById("bulkImportFileInput");
const fileDisplay = document.getElementById("fileDisplay");
const bulkImportCancelButton = document.getElementById(
  "bulkImportCancelButton"
);
const readFileButton = document.getElementById("readFileButton");
const bulkImportOkButton = document.getElementById("bulkImportOkButton");

bulkImportButton.addEventListener("click", () => {
  bulkImportModal.classList.add("active");
  document.body.classList.add("modal-open");
});

bulkImportModal.addEventListener("click", (event) => {
  if (event.target === bulkImportModal) {
    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  }
});

bulkImportCancelButton.addEventListener("click", () => {
  bulkImportModal.classList.remove("active");
  document.body.classList.remove("modal-open");
  bulkImportFileInput.value = "";
  fileDisplay.value = "";
});

readFileButton.addEventListener("click", () => {
  const file = bulkImportFileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const contents = reader.result;
    fileDisplay.value = contents;
  };
  reader.readAsText(file);
});

bulkImportOkButton.addEventListener("click", () => {
  const file = bulkImportFileInput.files[0];
  if (!file) return; // No file selected

  const reader = new FileReader();
  reader.onload = () => {
    const contents = reader.result;
    const lines = contents.split("\n");
    const list = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      const parts = trimmedLine.split(",");
      const accountData = {
        username: parts[0].trim(),
        password: parts[1].trim(),
        email: parts[2].trim(),
        recoveryPass: parts[3].trim(),
        phone: "",
        cookies: "",
        posts: 0,
        fingerprint: "",
        following: 0,
        followers: 0,
        status: "added",
      };
      list.push(accountData);
    }
    console.log(list);
    
    list.forEach((data) => {
      insertAccountRow(data);
    });

    removeTable();
    createTableHeader(columnNames.account);

    getAllData(accountTableId, accountColumns)
      .then(function (data) {
        loadAllAccountsData(data);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  };

  reader.readAsText(file);

  bulkImportModal.classList.remove("active");
  document.body.classList.remove("modal-open");
  bulkImportFileInput.value = "";
  fileDisplay.value = "";
});
