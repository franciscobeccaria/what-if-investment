import React from 'react'

const DateInput = () => {
    return (
        <div className='flex flex-col my-2 w-full'>
            <label className='font-inter text-white mb-1' htmlFor="">Initial date</label>
            <input onChange={(e) => changeInitialDatePortfolioFunction(e.target.value)} className='rounded-lg p-3' type="date"/>
        </div>
    )
}

export default DateInput
