import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfocard from '../cards/TransactionInfocard'

const IncomeList = ({transactions, onDelete, onDownload }) => {
  // Pre-format dates for performance
  const formattedTransactions = transactions?.map(income => ({
    ...income,
    formattedDate: moment(income.date).format("DD MMM YYYY")
  }));

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className="text-base"/> Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {formattedTransactions?.map((income) => (
                <TransactionInfocard 
                    key={income._id}
                    title={income.source}
                    icon={income.icon}
                    date={income.formattedDate}
                    amount= {income.amount}
                    type="income"
                    onDelete={() => onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList
