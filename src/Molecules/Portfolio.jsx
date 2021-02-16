import React from 'react'
import styled from 'styled-components'
import { HiBriefcase, HiPlus } from "react-icons/hi";

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

const Portfolio = () => {
    return (
                <div className='relative bg-gray-400 w-68 h-80 mt-4 md:mt-0 mx-2 sm:mx-0 rounded-lg pt-14 px-2 pb-2'>
                    <div className='absolute top-0 left-0 bg-gray-100 rounded-t-lg h-12 w-full flex items-center px-3'>
                        <HiBriefcase className='text-xl mr-3'/>
                        <span className='font-inter text-lg font-semibold'>Portfolio</span>
                        <HiPlus onClick={() => showModalStockFunction(true)} className='text-3xl ml-auto transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-105 cursor-pointer' />
                    </div>
                    <StyledScrollbarDiv className='overflow-auto h-full pr-1'>
                        {/* <PortfolioItem/>  */}
                        {receivedState.portfolio.map(e => {
                            return <PortfolioItem inPortfolio name={e.name} symbol={e.symbol} type={e.type} key={e.symbol}/>
                        })
                        }
                    </StyledScrollbarDiv>   
                </div>
    )
}

export default Portfolio
