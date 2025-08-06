import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfocard from "../cards/TransactionInfocard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  // Pre-format dates just once for performance
  const formattedTransactions = transactions?.map((expense) => ({
    ...expense,
    formattedDate: moment(expense.date).format("DD MMM YYYY"),
  }));

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expense</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {formattedTransactions?.map((expense) => (
          <TransactionInfocard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={expense.formattedDate}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;