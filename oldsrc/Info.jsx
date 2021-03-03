import React from 'react'

const Info = ({propsClassList, text, showGrowth, number, propsStyles}) => {
    return (
        <div style={propsStyles} className={`bg-white rounded-lg flex items-center justify-between flex-wrap w-170 max-w-90vw py-1 px-5 m-7 ${propsClassList}`}>
            <div className='font-inter text-xl sm:text-2xl font-medium'>
                {text}
            </div>
            <div className={`font-inter text-2xl font-bold ml-auto pl-4 ${showGrowth ? number > 0 ? 'text-positive' : 'text-red-600' : ''}`}>
                $ {number === '-'
                    ? '-'
                    : new Intl.NumberFormat('en-US').format(parseInt(number).toFixed(2))
                }
                
            </div>
        </div>
    )
}

export default Info
