// data.js - Your local mock data storage

const user = {
    username: "User",
    income: 1400
};

const expenseData = {
    totalExpenses: 1172
};

const expenseSummaryData = [
    { categoryName: "Education", percentage: "4.95%" },
    { categoryName: "Entertainment", percentage: "13.22%" },
    { categoryName: "Food", percentage: "8.26%" },
    { categoryName: "Healthcare", percentage: "14.87%" },
    { categoryName: "Housing", percentage: "1.65%" },
    { categoryName: "Insurance", percentage: "0.01%" },
    { categoryName: "Personal care", percentage: "0.01%" },
    { categoryName: "Savings and investments", percentage: "4.13%" },
    { categoryName: "Taxes", percentage: "11.57%" },
    { categoryName: "Transportation", percentage: "13.22%" },
    { categoryName: "Miscellaneous", percentage: "13.22%" }
];

// Sample details for rendering the details table rows
const expenseDetailsList = [
    { id: 1, date: "2020-01-25", description: "Lorem ipsum dolor", amount: 21 },
    { id: 2, date: "2020-01-24", description: "Sed do eiusmod", amount: 20 },
    { id: 3, date: "2020-01-24", description: "Ut enim ad", amount: 42 }
];

// Static lookup values utilized to populate form elements dynamically
const expenseCategories = {
    categories: [
        "Education",
        "Entertainment",
        "Food",
        "Healthcare",
        "Housing",
        "Insurance",
        "Personal care",
        "Savings and investments",
        "Taxes",
        "Transportation",
        "Miscellaneous"
    ]
};