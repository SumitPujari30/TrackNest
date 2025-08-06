const xlsx = require("xlsx");
const Expense = require("../models/Expense")


//add Expense source
exports.addExpense =  async(req, res) => {
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;
        
        //vallidation check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ error: "All fields are required" });
        
        }

        const newExpense= new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
        
    }

}

//get Expense source
exports.getAllExpense=  async(req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }

}

//delete Expense source
exports.deleteExpense =  async(req, res) => {
    try {
        
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense source deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

//download Excel of Expense
exports.downloadExpenseExcel =  async(req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download('expense_details.xlsx');
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
