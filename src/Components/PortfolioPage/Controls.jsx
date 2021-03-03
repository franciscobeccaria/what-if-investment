import React from 'react'
import Amount from './Childs/Amount'
import Dates from './Childs/Dates'
import Portfolio from './Childs/Portfolio'

const Controls = () => {
    return (
        <div className='inputs flex items-center justify-around lg:justify-between flex-wrap px-5'>
            <div className='flex flex-col items-center justify-center w-15.25rem'>
                <Amount/>
                <Dates/>
            </div>
            <Portfolio/>
        </div>
    )
}

export default Controls
