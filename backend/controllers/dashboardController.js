const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId))

        //fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        console.log("Total Income",{totalIncome, userId: isValidObjectId(userId)});

        
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]); 

        //get income transaction in last 60 days
        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total income in last 60 days
        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // get expense transaction in the last 30 days
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total expense in last 30days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //Fetch last 5 transaction (income+expense)
        const last5Transactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);

        // final response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpense: totalExpense[0]?.total || 0,
                last30DaysExpense: {
                    total: expenseLast30Days,
                    transactions: last30DaysExpenseTransaction,
                },
                last60DaysIncome: {
                    total: incomeLast60Days,
                    transactions: last60DaysIncomeTransaction,
                },
                recentTransactions: last5Transactions,
                });
    } catch (error) {
        res.status(500).json({ error: "Server Error",error });
    }
    
}
