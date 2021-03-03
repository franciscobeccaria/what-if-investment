import React from 'react'
import ChartWrapper from '../PortfolioPage/Childs/ChartWrapper'

const Chart = () => {
    return (
        <div className='graph h-full flex items-center justify-center p-2 '>
            <ChartWrapper 
                where={'Portfolio'}
                propsStyles={{width: '100%', margin: '0'}}
            />
        </div>
    )
}

export default Chart
