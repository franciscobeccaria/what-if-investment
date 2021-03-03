import React, {useState, useEffect, useRef} from 'react'
import { HiChevronDown } from "react-icons/hi";
import styled from 'styled-components'
import {connect} from 'react-redux'
import PortfolioItem from './PortfolioItem'
import { createChart } from 'lightweight-charts';

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

const ChartWrapper = ({where, propsStyles, portfolioInGlobalState, dataInGlobalState, selectedInGlobalState}) => {

    const chartContainer = useRef(null)
    const chartDiv = useRef(null)
    const results = useRef(null)
    const button = useRef(null)

    const [openResults, setOpenResults] = useState(false)
    const [data, setData] = useState([])

    const handleClickOutside = (event) => {
        if (button.current !== null && !button.current.contains(event.target)) {
            setOpenResults(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e));
    },[])

    useEffect(() => {
        if(openResults === true) {
            results.current.style.height = '13rem'
            results.current.style.paddingTop = '0.75rem'
            results.current.style.paddingBottom = '0.75rem'
        } else {
            results.current.style.height = ''
            results.current.style.paddingTop = ''
            results.current.style.paddingBottom = ''
        }
    },[openResults])

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

    useEffect(() => {
        // OTRO ERROR:
        // Remove Apple. Cargo Bitcoin a Portfolio, sin cargar nada de data, le doy click a Bitcoin en Chart, como para SelectBitcoin y se rompe.
        // Esto se rompía porque .data no existe. Básicamente cuando hacemos el addInvestmentPortfolio no creamos .data. Solo creamos un [].
        if( dataInGlobalState[selectedInGlobalState.id || selectedInGlobalState.symbol] !== undefined && 
            dataInGlobalState[selectedInGlobalState.id || selectedInGlobalState.symbol].data) {
                setData(dataInGlobalState[selectedInGlobalState.id || selectedInGlobalState.symbol].data)
        }
    }, [selectedInGlobalState, dataInGlobalState])

    return (
        <div className='flex flex-col items-center justify-center w-170 max-w-90vw m-6' style={propsStyles}>
            <div className='flex items-center w-full relative h-14'>
                <div className={`bg-white rounded-lg h-full w-full mb-3 flex items-center px-5 mr-2`}>
                    {/* <SiApple className='mr-4 text-xl' /> */}
                    <span className='font-inter font-semibold text-2xl'>{selectedInGlobalState.name || 'Undefined Inc.'} ({selectedInGlobalState.symbol || '0000'})</span>
                    {/* <HiFlag className='ml-auto text-xl'/> */}
                </div>    
                <button ref={button} onClick={() => setOpenResults(true)} className='bg-white rounded-lg ml-auto h-full w-14 mb-3 flex items-center justify-center text-3xl'>
                    <HiChevronDown/>
                </button>
                <StyledScrollbarDiv ref={results} className='h-0 overflow-auto absolute top-full bg-gray-400 z-10 w-full rounded-lg shadow-lg flex flex-col items-center px-6 py-0 transition-all ease-in-out duration-500'>
                    {Object.keys(portfolioInGlobalState).map(e =>
                        portfolioInGlobalState[e].symbol ? 
                        <PortfolioItem where={'Chart'} 
                            name={portfolioInGlobalState[e].name} 
                            symbol={portfolioInGlobalState[e].symbol} 
                            cryptoId={portfolioInGlobalState[e].id} 
                            type={portfolioInGlobalState[e].type}  
                            percentage={portfolioInGlobalState[e].percentage}
                            key={portfolioInGlobalState[e].symbol}
                        />
                        : ''
                    )}
                </StyledScrollbarDiv>
            </div>
            <div ref={chartContainer} className='bg-white rounded-lg h-52 w-full flex items-center justify-center'>
                <div ref={chartDiv}></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => (
    {
        portfolioInGlobalState: state.portfolio,
        dataInGlobalState: state.portfolioData,
        selectedInGlobalState: state.selectedPortfolio
    }
)

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartWrapper)
