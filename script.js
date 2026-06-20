// script.js - Application Execution Logic Pipeline

// Helper Function: Formats raw SQL timestamps/input strings to "MMM DD, ddd"
function updateDateFormat(dateString) {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString;

    // Options mapping structure rules
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const mmm = months[dateObj.getMonth()];
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const ddd = days[dateObj.getDay()];

    return `${mmm} ${dd}, ${ddd}`;
}

// 1. Render Overview Section Information Metric Blocks
function renderExpenseOverview() {
    document.getElementById("totalExpenses").textContent = "$" + expenseData.totalExpenses;
    document.getElementById("income").textContent = "$" + user.income;
    document.getElementById("balance").textContent = "$" + (user.income - expenseData.totalExpenses);
}

// 2. Render Left Category Summary Presentation Grid Components
function renderExpenseSummary() {
    const summaryTableBody = document.querySelector("#expense-summary tbody");
    summaryTableBody.innerHTML = "";

    expenseSummaryData.forEach(function (expenseCat) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = expenseCat.categoryName;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = expenseCat.percentage;
        cell2.className = "text-end"; // Align right beautifully
        row.appendChild(cell2);

        summaryTableBody.appendChild(row);
    });
}

// 3. Render Detailed Account Transactions List Components Row-by-Row
function renderExpenseData() {
    const detailsTableBody = document.querySelector("#expenseTable tbody");
    detailsTableBody.innerHTML = "";

    // Pulling array reference structural data collections
    expenseDetailsList.forEach(function (item) {
        const row = document.createElement("tr");

        // Date Display Conversion Row
        const dateCell = document.createElement("td");
        dateCell.textContent = updateDateFormat(item.date);
        row.appendChild(dateCell);

        // Description Frame Element
        const descCell = document.createElement("td");
        descCell.textContent = item.description;
        row.appendChild(descCell);

        // Value Frame Element
        const amountCell = document.createElement("td");
        amountCell.textContent = "$" + item.amount;
        row.appendChild(amountCell);

        // Action Buttons Setup Container (Pencil & Trash Icons Integration)
        const actionCell = document.createElement("td");
        actionCell.className = "text-end";

        // Edit Icon Configuration Anchor Wrapper
        const editAnchor = document.createElement("a");
        editAnchor.href = "#";
        editAnchor.className = "expButton me-2";
        editAnchor.setAttribute("data-mode", "edit");
        // Serialize operational JSON tracking payloads into standard data tags
        editAnchor.setAttribute("data-expense", JSON.stringify(item));
        
        const editImg = document.createElement("img");
        editImg.src = "./images/edit.png";
        editImg.alt = "Edit";
        editImg.className = "action-icon";
        editAnchor.appendChild(editImg);
        actionCell.appendChild(editAnchor);

        // Delete Icon Configuration Anchor Wrapper
        const deleteAnchor = document.createElement("a");
        deleteAnchor.href = "#";
        deleteAnchor.className = "delete"; // Applied the "delete" class as specified
        deleteAnchor.setAttribute("data-bs-toggle", "modal");
        deleteAnchor.setAttribute("data-bs-target", "#deleteModal"); // Linked directly to the new ID

        const deleteImg = document.createElement("img");
        deleteImg.src = "./images/delete.png";
        deleteImg.alt = "Delete";
        deleteImg.className = "action-icon";
        deleteAnchor.appendChild(deleteImg);
        actionCell.appendChild(deleteAnchor);

        row.appendChild(actionCell);
        detailsTableBody.appendChild(row);
    });
}

// 4. Generates the category options dynamically from data.js
function setCategoryDropdown() {
    const categoryDropdown = document.getElementById("category");
    
    // Clear out any options beyond our base fallback item
    categoryDropdown.innerHTML = '<option value="">--Select Category--</option>';

    expenseCategories.categories.forEach(function (item) {
        const op = document.createElement("option");
        op.text = item;
        op.value = item;
        categoryDropdown.appendChild(op);
    });
}

// 5. Binds click event handlers to check modes ('add' vs 'edit') before modal opens
function addExpenseHandler() {
    // FIXED: Upgraded to a delegated listener to capture dynamically rendered table row elements smoothly
    $(document).on("click", ".expButton", function (event) {
        event.preventDefault(); // Stop page scrolling adjustments on trigger execution
        
        const mode = $(this).attr("data-mode") || $(this).data("mode");
        
        if (mode === "edit") {
            // Retrieve structured JSON objects attached to our specific target element rows
            let expense = $(this).attr("data-expense") || $(this).data("expense");
            
            // If the data object is wrapped as a string payload, cleanly parse it back out
            if (typeof expense === "string") {
                expense = JSON.parse(expense);
            }

            $("#modalTitle").text("Edit Expense");
            
            // Format ISO date structures (splitting out trailing 'T00:00:00.000Z' fragments)
            if (expense.date) {
                $("#date").val(expense.date.split("T")[0]);
            }
            
            // FIXED: Added defensive naming fallbacks to catch either syntax schema
            $("#category").val(expense.categoryName || expense.category);
            $("#description").val(expense.description);
            $("#amount").val(expense.amount);
            $("#expense-submit-btn").text("Save Changes");
            $("#expenseModal").modal("show");
            
        } else {
            // Default Path: Add Mode execution defaults
            $("#modalTitle").text("Add Expense");
            $("#expense-submit-btn").text("Submit");
            $("#expenseForm")[0].reset(); // Wipe all historical data records out of views
            $("#expenseModal").modal("show");
        }
    });
}

// =================================================================
// UNIFIED ENGINE INITIALIZATION LIFECYCLE CONTROLLER
// =================================================================
document.addEventListener("DOMContentLoaded", function () {
    renderExpenseOverview();
    renderExpenseSummary();
    renderExpenseData();
    setCategoryDropdown();
    addExpenseHandler();
});