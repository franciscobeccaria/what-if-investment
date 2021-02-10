import React from 'react'

const Growth = () => {
    return (
        <div className='flex w-170 max-w-90vw sm:h-44 flex-col-reverse sm:flex-row'>
            <div className='bg-white w-full sm:w-55% rounded-lg h-44 sm:h-full'>
                GRAFICO
            </div>
            <div className='bg-gray-700 w-full sm:w-45% rounded-lg h-28 sm:h-full mb-4 sm:mb-0 sm:ml-4'>
                <span></span>
                <span>120%</span>
            </div>
        </div>
    )
}

export default Growth
