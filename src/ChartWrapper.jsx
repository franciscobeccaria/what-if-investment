import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import { createChart } from 'lightweight-charts';

import { SiApple } from "react-icons/si";
import { HiChevronDown, HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";
import PortfolioItem from './PortfolioItem';
import axios from 'axios';
import {connect} from 'react-redux'
import {changePricesSimple} from './redux/actionCreators'

const StyledScrollbarDiv = styled.div`
&::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

&::-webkit-scrollbar
{
	width: 4px;
	background-color: transparent;
}

&::-webkit-scrollbar-thumb
{
	border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
`

const ChartWrapper = ({propsStyles, inSimple, receivedState, changePricesSimpleFunction}) => {

    const results = useRef(null)
    const button = useRef(null)
    const div = useRef(null)
    const divWrapper = useRef(null)

    const [stock, setStock] = useState({
        name: undefined,
        symbol: undefined,
    })

    const [state, setState] = useState({
        openResults: false,
    })

    const [data, setData] = useState([
            /* { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 8.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 }, */
    ])

    const open = () => {
        setState({
            ...state,
            openResults: true,
        })
    }

    const close = () => {
        setState({
            ...state,
            openResults: false,
        })
    }

    const handleClickOutside = (event) => {
        if (button.current !== null && !button.current.contains(event.target)) {
            close()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleClickOutside(e));
    },[])

    useEffect(() => {
        if(state.openResults === true) {
            results.current.style.height = '13rem'
            results.current.style.paddingTop = '0.75rem'
            results.current.style.paddingBottom = '0.75rem'
        } else {
            results.current.style.height = ''
            results.current.style.paddingTop = ''
            results.current.style.paddingBottom = ''
        }
    },[state.openResults])

    /* useEffect(() => {
        console.log('setStock', inSimple)
        console.log(receivedState.selectedInAdvancedChart)
        console.log('2. Listen Stock in ReceivedState')
        if(inSimple === true) {
            setStock({
                name: receivedState.investmentSimple.name,
                symbol: receivedState.investmentSimple.symbol
            })
        } else {
            setStock({
                name: receivedState.selectedInAdvancedChart.name,
                symbol: receivedState.selectedInAdvancedChart.symbol
            })
        }
    }, [receivedState.investmentSimple, inSimple, receivedState.selectedInAdvancedChart]) */

    useEffect(() => {
        console.log('2. Listen Stock in ReceivedState (setStock)', receivedState.selectedInAdvancedChart)
        if(inSimple === true) {
            setStock({
                name: receivedState.investmentSimple.name,
                symbol: receivedState.investmentSimple.symbol
            })
        } else if (receivedState.selectedInAdvancedChart.type === 'coin' || receivedState.selectedInAdvancedChart.type === 'token') { 
            setStock({
                type: receivedState.selectedInAdvancedChart.type,
                name: receivedState.selectedInAdvancedChart.name,
                symbol: receivedState.selectedInAdvancedChart.symbol
            })
        } else {
            console.log('2.5. setStock advanced')
            setStock({
                name: receivedState.selectedInAdvancedChart.name,
                symbol: receivedState.selectedInAdvancedChart.symbol
            })
        }
        if(inSimple === true) {
            let currentDate = new Date()
            let todayMonth = currentDate.getMonth() + 1
            let today = `${currentDate.getFullYear()}-${todayMonth < 10 ? '0'+todayMonth : todayMonth}-${currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate()}`
            let initialDate
            let interval // daily, weekly, monthly
            if(receivedState.dateSimple.includes('year')) {
                initialDate = `${currentDate.getFullYear() - receivedState.dateSimple.slice(0,2)}-${todayMonth < 10 ? '0'+todayMonth : todayMonth}-${currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate()}`
                interval = 'monthly'
            }
            if(receivedState.dateSimple.includes('month')){
                let now = new Date()
                now.setMonth(now.getMonth() - receivedState.dateSimple.slice(0,2))
                let nowMonth = now.getMonth() + 1
                initialDate = `${now.getFullYear()}-${nowMonth < 10 ? '0'+nowMonth : nowMonth}-${now.getDate() < 10 ? '0'+now.getDate() : now.getDate()}`
                interval = 'weekly'
            }
            if(receivedState.dateSimple.includes('day')) {
               let now = new Date()
               now.setDate(now.getDate() - receivedState.dateSimple.slice(0,2))
               let nowMonth = now.getMonth() + 1
               initialDate = `${now.getFullYear()}-${nowMonth < 10 ? '0'+nowMonth : nowMonth}-${now.getDate() < 10 ? '0'+now.getDate() : now.getDate()}`
               interval = 'daily'
            }
            axios.get(`https://sandbox.tradier.com/v1/markets/history?symbol=${receivedState.investmentSimple.symbol}&interval=${interval}&start=${initialDate}&end=${today}`, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                }
            }
            )
            .then(resp => {
                let dataArray = []
                resp.data.history.day.forEach(e => dataArray.push({time: e.date, value: e.close}))
                setData(dataArray)
            })
        } else {
            /* console.log('PETICIÓN EN ADVANCED')
            console.log('3. Load Stock Data (read stock)', stock)
            axios.get(`https://sandbox.tradier.com/v1/markets/history?symbol=${stock.symbol}&interval=weekly&start=${receivedState.initialDatePortfolio}&end=${receivedState.endDatePortfolio}`, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                }
            }
            )
            .then(resp => {
                if(resp.data.history !== null) {
                    let dataArray = []
                    resp.data.history.day.forEach(e => dataArray.push({time: e.date, value: e.close}))
                    setData(dataArray)
                    console.log('4. setData of ChartWrapper', dataArray)
                }
            }) */
        }
    }, [receivedState.dateSimple, receivedState.investmentSimple, receivedState.selectedInAdvancedChart, inSimple])

    useEffect(() => {
        if(inSimple !== true) {
            console.log(stock, receivedState.portfolio)
            if(stock.type) {
                let dataArray = []
                receivedState.portfolio.forEach(e => {
                    if(e.symbol === stock.symbol){
                        e.data.forEach(i => {
                            dataArray.push({time: i.date, value: i.close})
                        })
                        setData(dataArray)
                    }
                })
            } else {
            console.log('PETICIÓN EN ADVANCED')
            console.log('3. Load Stock Data (read stock)', stock)
            axios.get(`https://sandbox.tradier.com/v1/markets/history?symbol=${stock.symbol}&interval=weekly&start=${receivedState.initialDatePortfolio}&end=${receivedState.endDatePortfolio}`, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                }
            }
            )
            .then(resp => {
                if(resp.data.history !== null) {
                    let dataArray = []
                    resp.data.history.day.forEach(e => dataArray.push({time: e.date, value: e.close}))
                    setData(dataArray)
                    console.log('4. setData of ChartWrapper', dataArray)
                }
            })
            }
        }
    }, [stock])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(divWrapper.current !== null) {
                let parentWidth = divWrapper.current.getBoundingClientRect().width * 0.99
                let parentHeight = divWrapper.current.getBoundingClientRect().height * 0.96
                chart.resize(parentWidth, parentHeight);
            }
        })
        let parentWidth = divWrapper.current.getBoundingClientRect().width * 0.99
        let parentHeight = divWrapper.current.getBoundingClientRect().height * 0.96
        div.current.innerHTML = ''
        let chart = createChart(div.current, { width: parentWidth, height: parentHeight });
        let areaSeries = chart.addAreaSeries();
        areaSeries.setData(data);
        chart.timeScale().fitContent();
        console.log('5. set data in chart', data, inSimple)
        if(data.length !== 0 && inSimple === true) {
            console.log(inSimple)
            console.log(data[0].value, data[data.length -1].value)
            changePricesSimpleFunction({
                initial: data[0].value,
                end: data[data.length -1].value,
                all: data,
            })
        }
    }, [data])

    return (
        <div className='flex flex-col items-center justify-center w-170 max-w-90vw m-6' style={propsStyles}>
            <div className='flex items-center w-full relative h-14'>
                <div className={`bg-white rounded-lg h-full w-full mb-3 flex items-center px-5 ${inSimple === true ? '' : 'mr-2'}`}>
                    <SiApple className='mr-4 text-xl' />
                    <span className='font-inter font-semibold text-2xl'>{stock.name} ({stock.symbol})</span>
                    <HiFlag className='ml-auto text-xl'/>
                </div>
                {inSimple === true
                    ?
                    ''
                    :
                    <button ref={button} onClick={() => open()} className='bg-white rounded-lg ml-auto h-full w-14 mb-3 flex items-center justify-center text-3xl'>
                        <HiChevronDown/>
                    </button>
                }
                <StyledScrollbarDiv ref={results} className='h-0 overflow-auto absolute top-full bg-gray-400 z-10 w-full rounded-lg shadow-lg flex flex-col items-center px-6 py-0 transition-all ease-in-out duration-500'>
                    {receivedState.portfolio.map(e => {
                            return <PortfolioItem inAdvancedChart inPortfolio inSimple={inSimple} name={e.name} symbol={e.symbol} type={e.type} key={e.symbol}/>
                        })
                    }
                </StyledScrollbarDiv>
            </div>
            <div ref={divWrapper} className='bg-white rounded-lg h-52 w-full flex items-center justify-center'>
                <div ref={div}></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => (
    {
        receivedState: state
    }
)

const mapDispatchToProps = dispatch => ({
    changePricesSimpleFunction(data) {
        dispatch(changePricesSimple(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartWrapper)
