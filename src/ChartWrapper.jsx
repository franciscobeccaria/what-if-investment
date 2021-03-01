import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import { createChart } from 'lightweight-charts';

import { SiApple } from "react-icons/si";
import { HiChevronDown, HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";
import PortfolioItem from './PortfolioItem';
import axios from 'axios';
import {connect} from 'react-redux'
import {changePricesSimple, showModalLoading} from './redux/actionCreators'

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

const ChartWrapper = ({propsStyles, inSimple, receivedState, changePricesSimpleFunction, showModalLoadingFunction}) => {

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

    const [data, setData] = useState([])

    const handleClickOutside = (event) => {
        if (button.current !== null && !button.current.contains(event.target)) {
            setState({openResults: false})
        }
    }

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e));
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

    useEffect(() => {
        console.log('2. Listen Stock in ReceivedState (setStock)', receivedState.selectedInAdvancedChart)
        if (inSimple === true) {
            if (receivedState.investmentSimple.type === 'coin' || receivedState.investmentSimple.type === 'token') { 
                setStock({
                    type: receivedState.investmentSimple.type,
                    name: receivedState.investmentSimple.name,
                    symbol: receivedState.investmentSimple.symbol,
                    id: receivedState.investmentSimple.id
                })
            } else {
                setStock({
                    name: receivedState.investmentSimple.name,
                    symbol: receivedState.investmentSimple.symbol
                })
            }
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
                interval = 'daily'
            }
            if(receivedState.dateSimple.includes('month')){
                let now = new Date()
                now.setMonth(now.getMonth() - receivedState.dateSimple.slice(0,2))
                let nowMonth = now.getMonth() + 1
                initialDate = `${now.getFullYear()}-${nowMonth < 10 ? '0'+nowMonth : nowMonth}-${now.getDate() < 10 ? '0'+now.getDate() : now.getDate()}`
                interval = 'daily'
            }
            if(receivedState.dateSimple.includes('day')) {
               let now = new Date()
               now.setDate(now.getDate() - receivedState.dateSimple.slice(0,2))
               let nowMonth = now.getMonth() + 1
               initialDate = `${now.getFullYear()}-${nowMonth < 10 ? '0'+nowMonth : nowMonth}-${now.getDate() < 10 ? '0'+now.getDate() : now.getDate()}`
               interval = 'daily'
            }
            if(receivedState.investmentSimple.type === 'coin' || receivedState.investmentSimple.type === 'token') {
                class MyDate extends Date {                
                    addDays(days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    }
                  }
                
                let finish = false
                //let initialDate = receivedState.initialDatePortfolio
                // ESTO ESTÁ MALLLLLLLLL. Esta arreglado para fechas normales, pero ejemplo del 31 de un mes al 1 del otro va a dar error. 
                //let receivedDate = receivedState.endDatePortfolio
                //let endDate = `${receivedDate.slice(0,8)}${(parseInt(receivedDate.slice(8,10)) + 1) < 10 ? '0' + (parseInt(receivedDate.slice(8,10)) + 1) : (parseInt(receivedDate.slice(8,10)) + 1)}`  // Construimos todo para traer un día. Ej: pongo 2020-10-15, trae 2020-10-14. Así que habría que hacer algo ahí. 
                let arrayData = []
              
                console.log('disparamos')
                showModalLoadingFunction(true)
                const api = (initialDate, endDate) => {
                    let date = new MyDate(initialDate.slice(0,4), initialDate.slice(5, 7) -1, initialDate.slice(8, 10))
                    let start = initialDate
                    let end = today
                    axios.get(`https://api.coinpaprika.com/v1/coins/${receivedState.investmentSimple.id}/ohlcv/historical?start=${start}&end=${end}`)
                    .then(resp => {
                        resp.data.forEach(e => {
                            if(e.time_open.slice(0,10) === endDate) {
                                finish = true
                            } else if (finish === false) {
                                arrayData.push({date: e.time_open.slice(0,10), close: e.open})
                            }})
                        if(finish === true) {
                          setData(arrayData)
                          showModalLoadingFunction(false)
                          return null
                        }
                        else api(date.addDays(365).toISOString().slice(0,10), endDate)
                    })
                }
                api(initialDate, today)
            } else {
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
            })}
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
                    <button ref={button} onClick={() => setState({openResults: true})} className='bg-white rounded-lg ml-auto h-full w-14 mb-3 flex items-center justify-center text-3xl'>
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
    },
    showModalLoadingFunction(data){
        dispatch(showModalLoading(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartWrapper)
