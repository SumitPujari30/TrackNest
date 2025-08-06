import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfocard from '../cards/TransactionInfocard'
import moment from 'moment'

const RecentIncome = ({transactions, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Income</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.length === 0 && (
                <p className='text-gray-500'>No income recorded yet.</p>
            )}
            {transactions?.slice(0, 5).map((item) => (
                <TransactionInfocard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type="income"
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome
