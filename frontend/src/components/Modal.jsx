import React from "react";

// const Modal = ({ children, isOpen, onClose, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-slate-900/35 flex items-center justify-center z-[1000]">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-11/12 p-6 relative animate-fade-in">
//         <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
//           <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
//           <button
//             className="bg-transparent border-none cursor-pointer p-1.5 rounded-full transition-colors hover:bg-gray-100"
//             onClick={onClose}
//             aria-label="Close"
//             type="button"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
//               <path
//                 d="M6 6l8 8M6 14L14 6"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="text-base text-slate-700">{children}</div>
//       </div>
//     </div>
//   );
// };

const Modal = ({children, isOpen, onClose, title}) => {
    if(!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* {Model content} */}
            <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-250 bg-blend-color'>
                {/* {Model header} */}

                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-black'>
                        {title}
                    </h3>

                    <button 
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer' 
                    type='button' 
                    onClick={onClose}>
                        <svg
                            className='w-3 h-3'
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill='none'
                            viewBox='0 0 14 14'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg> 
                        
                    </button>
                </div>


                {/* {Model body} */}
                <div className='p-4  md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal;







