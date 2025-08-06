import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfocard from "../cards/TransactionInfocard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length === 0 && (
          <p className="text-gray-500">No expenses recorded yet.</p>
        )}
        {transactions?.slice(0, 5).map((expense) => (
            <TransactionInfocard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
            
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
