import React, {useEffect, useState, useRef} from 'react'

import {Link} from 'react-router-dom';
import Cleave from 'cleave.js/react';
import styled from 'styled-components'

import {showModalStock, changeInitialDatePortfolio, changeEndDatePortfolio, changeAmountAdvanced} from './redux/actionCreators'
import {connect} from 'react-redux'

import Info from './Info';
import Growth from './Growth';
import ChartWrapper from './ChartWrapper';
import PortfolioItem from './PortfolioItem'
import ModalStock from './ModalStock'

import { SiApple } from "react-icons/si";
import { HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";
import ModalPortfolio from './ModalPortfolio';

const StyledDiv = styled.div`
& {
  display: grid;
  grid-template-columns: 1fr 0.9fr 1.1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results";
}

& {
  width: 900px;
  height: 95vh;
}

.inputs { grid-area: inputs; }

.graph { grid-area: graph; }

.results { grid-area: results; }

@media (max-width: 1024px) {
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 90vw;
    height: fit-content;
  }
  & .inputs, & .graph, & .results {
    width: 40rem;
    max-width: 90vw;
  }
}
`

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

const AdvancedPage = ({showModalStockFunction, receivedState, changeInitialDatePortfolioFunction, changeEndDatePortfolioFunction, changeAmountAdvancedFunction}) => {

  const amount = useRef(null)

  useEffect(() => {
    changeAmountAdvancedFunction(amount.current.getRawValue().slice(1))
  },[])

    return (
        <>
            <div className="flex h-20 w-full items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <Link to={'/'}>
              <div className="font-bebas mx-8 text-gray-300 cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                Simple
              </div>
            </Link>
            <Link to={'/advanced'}>
              <div className="font-bebas mx-8 text-white cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                Advanced
              </div>
            </Link>
          </div>
          <div className="min-h-screen bg-main flex items-center justify-center flex-col pt-8 pb-12">
            <h1 className='font-inter font-bold text-white text-center text-2xl mb-12'>What if you invest in...</h1>
              <StyledDiv>
                <div className='inputs flex items-center justify-around lg:justify-between flex-wrap px-5'>
                  <div className='flex flex-col items-center justify-center w-15.25rem'>
                  <div className='flex items-center justify-center pb-7 relative w-full my-2'>
                      <Cleave 
                          className='w-full text-2xl px-2 bg-transparent rounded-md font-inter text-white text-center font-bold focus:text-black focus:bg-white focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                          placeholder="Enter a number" 
                          options={{numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: '$'}}
                          value="10000"
                          maxLength='16'
                          onChange={(e) => changeAmountAdvancedFunction(e.target.rawValue.slice(1))}
                          ref={amount}
                      />
                      <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>
                  </div>
                  <div className='flex flex-col my-2 w-full'>
                    <label className='font-inter text-white mb-1' htmlFor="">Initial date</label>
                    <input onChange={(e) => changeInitialDatePortfolioFunction(e.target.value)} className='rounded-lg p-3' type="date"/>
                  </div>
                  <div className='flex flex-col my-2 w-full'>
                    <label className='font-inter text-white mb-1' htmlFor="">End date</label>
                    <input onChange={(e) => changeEndDatePortfolioFunction(e.target.value)} className='rounded-lg p-3' type="date"/>
                  </div>
                  </div>
                  {/* Portfolio.jsx */}
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
                </div>
                <div className='results h-full p-2 mt-3'>
                  <Info propsStyles={{margin: '0', width: '100%'}} text="Now you would have" number="220000" />
                  <Info propsStyles={{width: '100%', margin: '8px 0'}} text="You would have earned" number="120000" showGrowth />
                  <Growth inAdvanced />
                  {/* <div className='w-full bg-red-500'></div> */}
                </div>
                <div className='graph h-full flex items-center justify-center p-2 '>
                  <ChartWrapper inAdvanced
                    propsStyles={{width: '100%', margin: '0'}}
                  />
                </div>
              </StyledDiv>
            </div>
            <ModalStock where={'inAdvanced'}/>
            <ModalPortfolio/>
        </>
    )
}

const mapStateToProps = state => (
  {
      receivedState: state
  }
)

const mapDispatchToProps = dispatch => ({
    showModalStockFunction(data) {
        dispatch(showModalStock(data))
    },
    changeInitialDatePortfolioFunction(data) {
      dispatch(changeInitialDatePortfolio(data))
    },
    changeEndDatePortfolioFunction(data) {
      dispatch(changeEndDatePortfolio(data))
    },
    changeAmountAdvancedFunction(data) {
      dispatch(changeAmountAdvanced(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedPage)
