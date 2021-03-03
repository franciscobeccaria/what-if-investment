import React, {useEffect, useRef} from 'react'
import { createChart } from 'lightweight-charts';

/* Yo creo que lo mejor que se puede hacer con ChartWrapper es que haya 2. Home le mandamos data por prop. 
Y Portfolio que vea cuál está selected en GlobalState */

const ChartWrapper = ({where, data, investment}) => {

    const chartContainer = useRef(null)
    const chartDiv = useRef(null)

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(chartContainer.current !== null) {
                chart.resize(0, 0);
                let parentWidth = chartContainer.current.getBoundingClientRect().width * 0.99
                let parentHeight = chartContainer.current.getBoundingClientRect().height * 0.96
                chart.resize(parentWidth, parentHeight);
            }
        })
        let parentWidth = chartContainer.current.getBoundingClientRect().width * 0.99
        let parentHeight = chartContainer.current.getBoundingClientRect().height * 0.96
        chartDiv.current.innerHTML = ''
        let chart = createChart(chartDiv.current, { width: parentWidth, height: parentHeight });
        let areaSeries = chart.addAreaSeries();
        areaSeries.setData(data);
        chart.timeScale().fitContent();
    }, [data])

    return (
        <div className='flex flex-col items-center justify-center w-170 max-w-90vw m-6' /* style={propsStyles} */>
            <div className='flex items-center w-full relative h-14'>
                <div className={`bg-white rounded-lg h-full w-full mb-3 flex items-center px-5`}>
                    <span className='font-inter font-semibold text-2xl'>{investment.name} ({investment.symbol})</span>
                </div>
            </div>
            <div ref={chartContainer} className='bg-white rounded-lg h-52 w-full flex items-center justify-center'>
                <div ref={chartDiv}></div>
            </div>
        </div>
    )
}

export default ChartWrapper
