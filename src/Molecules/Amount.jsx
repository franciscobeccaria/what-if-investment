import React from 'react'

const Amount = () => {
    return (
        <div className='flex items-center justify-center pb-7 relative w-full my-2'>
            <Cleave 
                className='w-full text-2xl px-2 bg-transparent rounded-md font-inter text-white text-center font-bold focus:text-black focus:bg-white focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                placeholder="Enter a number" 
                options={{numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: '$'}}
                value="10000"
                maxLength='16'
                onChange={(e) => changeAmountAdvancedFunction(e.target.rawValue.slice(1))}
                ref={amount}
            />
            <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>
        </div>
    )
}

export default Amount
