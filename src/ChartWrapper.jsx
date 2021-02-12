import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'

import { SiApple } from "react-icons/si";
import { HiChevronDown, HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";
import PortfolioItem from './PortfolioItem';

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

const ChartWrapper = ({propsStyles, inSimple}) => {

    const results = useRef(null)
    const button = useRef(null)

    const [state, setState] = useState({
        openResults: false,
    })

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


    return (
        <div className='flex flex-col items-center justify-center w-170 max-w-90vw m-6' style={propsStyles}>
            <div className='flex items-center w-full relative h-14'>
                <div className='bg-white rounded-lg h-full w-full mb-3 mr-2 flex items-center px-5'>
                    <SiApple className='mr-4 text-xl' />
                    <span className='font-inter font-semibold text-2xl'>Apple (AAPL)</span>
                    <HiFlag className='ml-auto text-xl'/>
                </div>
                <button ref={button} onClick={() => open()} className='bg-white rounded-lg ml-auto h-full w-14 mb-3 flex items-center justify-center text-3xl'>
                    <HiChevronDown/>
                </button>
                <StyledScrollbarDiv ref={results} className='h-0 overflow-auto absolute top-full bg-gray-400 z-10 w-full rounded-lg shadow-lg flex flex-col items-center px-6 py-0 transition-all ease-in-out duration-500'>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    <PortfolioItem inSimple={inSimple}/>
                    
                </StyledScrollbarDiv>
            </div>
            <div className='bg-white rounded-lg h-52 w-full'>
                GRAFICO
            </div>
        </div>
    )
}

export default ChartWrapper
