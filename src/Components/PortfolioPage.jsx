import React, {useEffect, useState} from 'react'
import ModalStock from './PortfolioPage/ModalStock'
import ModalPortfolio from './PortfolioPage/ModalPortfolio'
import Controls from './PortfolioPage/Controls'
import Results from './PortfolioPage/Results'
import Chart from './PortfolioPage/Chart'
import {getStockData, getCryptoData} from '../services/api'
import {showModalLoading, updateDataPortfolio} from '../redux/actionCreators'
import {connect} from 'react-redux'
import styled from 'styled-components'

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

const PortfolioPage = ({portfolioInGlobalState, dateInGlobalState, portfolioDataInGlobalState, showModalLoadingFunction, updateDataPortfolioFunction}) => {

    const [stocksLoading, setStocksLoading] = useState(0)

    useEffect(() => {
      if(stocksLoading > 0) showModalLoadingFunction(true)
      else showModalLoadingFunction(false) 
    }, [stocksLoading])

    useEffect(() => {
        console.log('Portfolio in Global State fue actualizado.')
        if(dateInGlobalState.initial && dateInGlobalState.end) {
          Object.keys(portfolioInGlobalState).forEach(e => {
            console.log('Cargando data de: ', portfolioInGlobalState[e].id || portfolioInGlobalState[e].symbol)
            if( portfolioDataInGlobalState[e].initialDate !== dateInGlobalState.initial || 
                portfolioDataInGlobalState[e].endDate !== dateInGlobalState.end) {
                  if(portfolioInGlobalState[e].id) {
                    setStocksLoading(oldState => oldState + 1);
                    getCryptoData(portfolioInGlobalState[e].id, dateInGlobalState.initial, dateInGlobalState.end).then(resp => {
                        updateDataPortfolioFunction({
                          symbol: portfolioInGlobalState[e].id, 
                          data: resp, 
                          initialDate: dateInGlobalState.initial, 
                          endDate: dateInGlobalState.end
                        })
                        setStocksLoading(oldState => oldState - 1);
                    })
                  } else {
                    setStocksLoading(oldState => oldState + 1);
                    getStockData(portfolioInGlobalState[e].symbol, 'daily', dateInGlobalState.initial, dateInGlobalState.end).then(resp => {
                        updateDataPortfolioFunction({
                          symbol: portfolioInGlobalState[e].symbol, 
                          data: resp, 
                          initialDate: dateInGlobalState.initial, 
                          endDate: dateInGlobalState.end
                        })
                        setStocksLoading(oldState => oldState - 1);
                    })
                  }
            }            
          })
        } else {
          console.log('Por favor seleccione las fechas.')
        }
    }, [portfolioInGlobalState, dateInGlobalState])

    return (
        <>
            <div className="min-h-screen bg-main flex items-center justify-center flex-col pt-16 pb-12">
                <h1 className='font-inter font-bold text-white text-center text-2xl mb-12'>What if you invest in...</h1>
                <StyledDiv>
                    <Controls/>
                    <Results/>
                    <Chart/>
                </StyledDiv>
            </div> 
            <ModalStock where={'Portfolio'}/>
            <ModalPortfolio/>
        </>
    )
}

const mapStateToProps = state => (
    {
        portfolioInGlobalState: state.portfolio,
        dateInGlobalState: state.datePortfolio,
        portfolioDataInGlobalState: state.portfolioData
    }
)

const mapDispatchToProps = dispatch => ({
  showModalLoadingFunction(data) {
    dispatch(showModalLoading(data))
  },
  updateDataPortfolioFunction(data) {
    dispatch(updateDataPortfolio(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage)
