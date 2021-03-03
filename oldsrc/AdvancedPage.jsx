import React, {useEffect, useState, useRef} from 'react'

import {Link} from 'react-router-dom';
import Cleave from 'cleave.js/react';
import styled from 'styled-components'
import moment from 'moment'

import {showModalStock, changeInitialDatePortfolio, changeEndDatePortfolio, changeAmountAdvanced, changeItemData, showModalLoading} from './redux/actionCreators'
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
import ModalLoading from './ModalLoading';

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

const AdvancedPage = ({changeItemDataFunction, showModalStockFunction, receivedState, changeInitialDatePortfolioFunction, changeEndDatePortfolioFunction, changeAmountAdvancedFunction, showModalLoadingFunction}) => {

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
    console.log(receivedState)
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
      let object = {
        symbol: e.symbol,
        growth: {}
      }
      e.data.forEach(x => {
        object.growth[x.date] = initialAmountInStock * x.close / initialPrice
      })
      sumArrays.push(object)
    })
    // En Sumarrays tenes la ganancia o growth por cada accion y por cada dia. Tenes que sumar cada key entre ellas pero guardando la date de la key. 
    let finalArrayToData = []
    if(sumArrays.length > 0) {

      
      for (let i = 0; i < sumArrays.length; i++) {
        if(Object.keys(sumArrays[i].growth).length !== Object.keys(sumArrays[0].growth).length) {
          console.log('Hay menos fechas')
          for (let x = 0; x < Object.keys(sumArrays[0].growth).length; x++) {
            //console.log(sumArrays[i].growth[Object.keys(sumArrays[0].growth)[x]])
            if(sumArrays[i].growth[Object.keys(sumArrays[0].growth)[x]] === undefined){
              sumArrays[i].growth[Object.keys(sumArrays[0].growth)[x]] = sumArrays[i].growth[Object.keys(sumArrays[0].growth)[x-1]]
            }
          }
        }
      }
      
      // Solucionado: Ya entrega todos los días en stocks. Los fines de semana toma el valor anterior. 
      
      let resultObject = {}
      for (let i = 0; i < sumArrays.length; i++) {
        for (let x = 0; x < Object.keys(sumArrays[i].growth).length; x++) {
          //console.log(Object.keys(sumArrays[i].growth)[x], sumArrays[i].growth[Object.keys(sumArrays[i].growth)[x]])
          if(resultObject[Object.keys(sumArrays[i].growth)[x]]) {
            resultObject[Object.keys(sumArrays[i].growth)[x]] += sumArrays[i].growth[Object.keys(sumArrays[i].growth)[x]]
          } else {
            resultObject[Object.keys(sumArrays[i].growth)[x]] = sumArrays[i].growth[Object.keys(sumArrays[i].growth)[x]]
          }
        }
      }
      // Esto transforma los precios de cada elemento a 1 sola fecha y 1 solo precio. 

      for (let x = 0; x < Object.keys(resultObject).length; x++) {
        finalArrayToData.push({time: Object.keys(resultObject)[x], value: resultObject[Object.keys(resultObject)[x]]})
      }
      // Esto agrega resultObject a finalArrayToData

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

  const updateDataCrypto = (id, symbol) => {
    class MyDate extends Date {                
      addDays(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
      }
    }
  
  let finish = false
  let initialDate = receivedState.initialDatePortfolio
  // ESTO ESTÁ MALLLLLLLLL. Esta arreglado para fechas normales, pero ejemplo del 31 de un mes al 1 del otro va a dar error. 
  let receivedDate = receivedState.endDatePortfolio
  let endDate = `${receivedDate.slice(0,8)}${(parseInt(receivedDate.slice(8,10)) + 1) < 10 ? '0' + (parseInt(receivedDate.slice(8,10)) + 1) : (parseInt(receivedDate.slice(8,10)) + 1)}`  // Construimos todo para traer un día. Ej: pongo 2020-10-15, trae 2020-10-14. Así que habría que hacer algo ahí. 
  let arrayData = []

  // EL PLAN
  // El plan es que itere cada dia entregado y si uno de esos días es === a endDate se ejecuta finish = true

  // Debería arreglar errores:
  //      - Inicio dia 3. Final dia 2. Error. 
  //      - Inicio dia 3. Final dia 3. Ver que pasa. 

  console.log('disparamos')
  showModalLoadingFunction(true)
  const api = (initialDate, endDate) => {
      let date = new MyDate(initialDate.slice(0,4), initialDate.slice(5, 7) -1, initialDate.slice(8, 10))
      let start = date.toISOString().slice(0,10)
      let end = date.addDays(365).toISOString().slice(0,10)
      axios.get(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${start}&end=${end}`)
      .then(resp => {
          resp.data.forEach(e => {
              if(e.time_open.slice(0,10) === endDate) {
                  finish = true
              } else if (finish === false) {
                  arrayData.push({date: e.time_open.slice(0,10), close: e.open})
              }})
          if(finish === true) {
            changeItemDataFunction(
              {symbol: symbol, data: arrayData}
            )
            showModalLoadingFunction(false)
            return null
          }
          else api(date.addDays(365).toISOString().slice(0,10), endDate)
      })
  }
  api(initialDate, endDate)
  }

  const handleOnClickUpdateDates = () => {
    console.log(receivedState.portfolio)
    receivedState.portfolio.forEach(e => {
      if(e.type === 'coin' || e.type === 'token') {
        updateDataCrypto(e.id, e.symbol)
      } else updateDataStock(e.symbol)
    })
  }

  const [loadingVisibility, setLoadingVisibility] = useState(false)

  useEffect(() => {
    console.log('useEffect está leyendo que cambio el receivedState.showModalLoading')
    setLoadingVisibility(receivedState.showModalLoading)
  }, [receivedState.showModalLoading])

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
            <ModalPortfolio/>
            <ModalLoading visibility={loadingVisibility} />
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
    },
    showModalLoadingFunction(data) {
      dispatch(showModalLoading(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedPage)
