import React, {useRef, useEffect} from 'react'
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { createChart } from 'lightweight-charts';

const Growth = ({where, growthInPercentage, data, amount}) => {

    const growth = useRef(null)
    const chartContainer = useRef(null)
    const chartDiv = useRef(null)

    
    useEffect(() => {
        // Cambia el tamaño de la letra de Growth según la cantidad de caracteres. 
        if(growth.current !== null) {
            switch (growth.current.innerHTML.length) {
                // 12345%
                case 6:
                    growth.current.classList.remove('text-6xl');
                    growth.current.classList.add('text-5xl');
                    break;
                // 123456%
                case 7:
                    growth.current.classList.remove('text-5xl');
                    growth.current.classList.add('text-4xl');
                    break;
                // 1234567%
                case 8:
                    growth.current.classList.remove('text-5xl');
                    growth.current.classList.add('text-4xl');
                    break;
                case 9:
                    growth.current.classList.remove('text-4xl');
                    growth.current.classList.add('text-3xl');
                    break;
                case 10:
                    growth.current.classList.remove('text-3xl');
                    growth.current.classList.add('text-2xl');
                    break;
                // 1234%
                default:
                    growth.current.classList.add('text-6xl');
            }
        }
    },[growthInPercentage])

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
        let arrayGrowth = []
        data.forEach(e => {
            arrayGrowth.push({time: e.time, value: e.value / data[0].value * amount})
        })
        areaSeries.setData(arrayGrowth);
        chart.timeScale().fitContent();
    }, [data, amount])

    return (
        <div className='flex w-170 max-w-90vw sm:h-44 flex-col-reverse sm:flex-row' style={where === 'Portfolio' ? {width: '100%', flexDirection: 'column-reverse', height: 'fit-content'} : {}}>
            <div ref={chartContainer} className='bg-white w-full sm:w-55% rounded-lg h-52 sm:h-44 sm:h-full flex items-center justify-center' style={where === 'Portfolio' ? {width: '100%', marginTop: '8px', height: '18rem'} : {}}>
                <div ref={chartDiv}></div>
            </div>
            <div 
                className={`w-full sm:w-45% rounded-lg h-28 sm:h-full mb-4 sm:mb-0 sm:ml-4 flex items-center justify-center text-6xl pr-6 sm:pr-2 p-2 ${growthInPercentage < 0 ? 'bg-red-600' : 'bg-positive'}`}
                style={where === 'Portfolio' ? {width: '100%', margin: '0px'} : {}}
            >
                <span className='text-white text-7xl mr-auto'>
                    {growthInPercentage < 0 ? <HiTrendingDown /> : <HiTrendingUp />}
                </span>
                {where === 'Portfolio'
                    ? growthInPercentage === undefined ? '' : <span className='text-white font-bold text-6xl'>{growthInPercentage.toFixed(1)}%</span>
                    : <span ref={growth} className='text-white font-bold text-6xl'>{growthInPercentage === undefined ? '' : growthInPercentage.toFixed(1)}%</span>
                }
            </div>
        </div>
    )
}

export default Growth
