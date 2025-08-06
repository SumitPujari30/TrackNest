import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
      <p className='text-sm'>{content}</p>
      
      <div className='flex justify-end mt-6'>
        <button
            type='button'
            className='bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition cursor-pointer'
            onClick={onDelete}
        >
            Delete 
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
