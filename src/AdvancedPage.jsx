import React, {useEffect, useState, useRef} from 'react'

import {Link} from 'react-router-dom';
import Cleave from 'cleave.js/react';
import styled from 'styled-components'

import {showModalStock, changeInitialDatePortfolio, changeEndDatePortfolio, changeAmountAdvanced, changeItemData} from './redux/actionCreators'
import {connect} from 'react-redux'

import Info from './Info';
import Growth from './Growth';
import ChartWrapper from './ChartWrapper';
import PortfolioItem from './PortfolioItem'
import ModalStock from './ModalStock'

import { SiApple } from "react-icons/si";
import { HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";
import ModalPortfolio from './ModalPortfolio';
import axios from 'axios';

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

const AdvancedPage = ({changeItemDataFunction, showModalStockFunction, receivedState, changeInitialDatePortfolioFunction, changeEndDatePortfolioFunction, changeAmountAdvancedFunction}) => {

  const amount = useRef(null)

  const [state, setState] = useState({
    totalEarned: undefined,
    totalGrowth: undefined,
  })

  useEffect(() => {
    changeAmountAdvancedFunction(amount.current.getRawValue().slice(1))
  },[])

  // Calculando precio inicial y final de cada acción. 
  useEffect(() => {
    let totalAmount = receivedState.amountAdvanced
    let arrayEarned = []
    let arrayGrowth = []
    receivedState.portfolio.forEach(e => {
      let initialPrice = e.data[0].close
      let endPrice = e.data[e.data.length - 1].close
      let partialEarned = endPrice / initialPrice * e.percentage * totalAmount / 100
      let partialGrowth = (endPrice / initialPrice - 1) * 100
      arrayEarned.push(parseInt(partialEarned.toFixed(2)))
      arrayGrowth.push(parseInt(partialGrowth.toFixed(2)))
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if(arrayEarned.length !== 0 && arrayGrowth.length !== 0) {
      setState({totalEarned: arrayEarned.reduce(reducer), totalGrowth: (arrayEarned.reduce(reducer) / totalAmount - 1) * 100})
    }
  }, [receivedState])

  const [growth, setGrowth] = useState([])

  useEffect(() => {
    let totalAmount = receivedState.amountAdvanced
    let sumArrays = []
    receivedState.portfolio.forEach(e => {
      let initialPrice = e.data[0].close
      let initialAmountInStock = e.percentage * totalAmount / 100
      let array = {
        symbol: e.symbol,
        growth: [],
      }
      e.data.forEach(x => {
        array.growth.push({time: x.date, value: initialAmountInStock * x.close / initialPrice})
      })
      sumArrays.push(array)
    })
    // En Sumarrays tenes la ganancia o growth por cada accion y por cada dia. Tenes que sumar cada key entre ellas pero guardando la date de la key. 
    let finalArrayToData = []
    console.log(sumArrays)
    if(sumArrays.length > 0) {
      for (let i = 0; i < sumArrays[0].growth.length; i++) {
        //console.log('SUMA', sumArrays[0].growth[i], sumArrays[1].growth[i])
        //console.log('EACH', sumArrays[0].growth[i].time, sumArrays[0].growth[i].value + sumArrays[1].growth[i].value)
        //finalArrayToData.push({time: sumArrays[0].growth[i].time, value: sumArrays[0].growth[i].value + sumArrays[1].growth[i].value})
        
        let arrayWithValues = []
        // No encuentra value a la hora de Update dates. 
        console.log('sumArray, no encuentra .value', sumArrays)
        for (let x = 0; x < sumArrays.length; x++) {
          arrayWithValues.push(sumArrays[x].growth[i].value)
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        //console.log({time: sumArrays[0].growth[i].time, value: arrayWithValues})
        finalArrayToData.push({time: sumArrays[0].growth[i].time, value: arrayWithValues.reduce(reducer)})
    }
    console.log('FINAL ARRAY', finalArrayToData)
    setGrowth(finalArrayToData)
    // CREO QUE DEJE TODO ANDANDO. PERO HAY QUE REVISAR. EJEMPLO SI ELIMINO O AGREGO STOCKS, CAMBIO %, CAMBIO FECHAS. ETC. CAMBIO AMOUNT. 
    // TAMBIÉN ESTO SE ESTÁ DISPARANDO SIEMPRE QUE CAMBIE EL GLOBAL STATE, ESE ES UN TEMA, NECESITAMOS QUE CARGUE CUANDO PASEN CIERTAS COSAS. 
    }
  }, [receivedState])

  // Recalculando precios cuando hay un cambio de fechas y necesitamos actualizar la data con una nueva petición
  const updateDataStock = (symbol) => {
    axios.get(`https://sandbox.tradier.com/v1/markets/history?symbol=${symbol}&interval=weekly&start=${receivedState.initialDatePortfolio}&end=${receivedState.endDatePortfolio}`, 
      {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
          }
      }
      )
      .then(resp => {
          if(resp.data.history !== null) {
              console.log(resp.data.history.day)
              changeItemDataFunction(
                {symbol: symbol, data: resp.data.history.day}
              )
          }
      })
  }

  const handleOnClickUpdateDates = () => {
    receivedState.portfolio.forEach(e => {
      updateDataStock(e.symbol)
    })
  }

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
                  <div>
                    <button onClick={() => handleOnClickUpdateDates()} className='bg-blue-500 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-102 cursor-pointer'>Update dates data</button>
                  </div>
                  </div>
                  {/* Portfolio.jsx */}
                  <div className='relative bg-gray-400 w-64 h-80 mt-4 md:mt-0 mx-2 sm:mx-0 rounded-lg pt-14 px-2 pb-2'>
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
                  {console.log('TOTAL EARNED', state.totalEarned)}
                  <Info propsStyles={{margin: '0', width: '100%'}} text="Now you would have" number={state.totalEarned === undefined ? '-' : state.totalEarned.toString()} />
                  <Info propsStyles={{width: '100%', margin: '8px 0'}} text="You would have earned" number={state.totalEarned === undefined ? '-' : (state.totalEarned - receivedState.amountAdvanced).toString()} showGrowth />
                  <Growth inAdvanced totalGrowth={state.totalGrowth} dataByProps={growth} />
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
            <ModalPortfolio/>''
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
    changeItemDataFunction(data) {
      dispatch(changeItemData(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedPage)
