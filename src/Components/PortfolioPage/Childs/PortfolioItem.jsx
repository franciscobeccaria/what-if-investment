import React from 'react'
import { addInvestmentPortfolio, showModalStock, removeInvestmentPortfolio, showModalPortfolio, changeSelectedPortfolio } from '../../../redux/actionCreators';
import {connect} from 'react-redux'
import { FiDelete, FiEdit } from "react-icons/fi";
import styled from 'styled-components'

const StyledHover = styled.div`
 & .styled-son {
   opacity: 0;
 }
  &:hover .styled-son {
    opacity: 1;
  }

  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

& .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

& input:checked + .slider {
  background-color: #2196F3;
}

& input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

& input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
& .slider.round {
  border-radius: 34px;
}

& .slider.round:before {
  border-radius: 50%;
}
`

const StyledOptions = styled.div`
 & .styled-son {
   opacity: 0;
   transition: 0.5s all ease-in-out;
 }
  &:hover .styled-son {
    opacity: 1;
    transition: 0.5s all ease-in-out;
  }
  & .styled-original {
   opacity: 1;
   transition: 0.5s all ease-in-out;
 }
  &:hover .styled-original {
    opacity: 0;
    transition: 0.5s all ease-in-out;
  }
`

const PortfolioItem = ({    where, 
                            name, 
                            cryptoId, 
                            symbol, 
                            type, 
                            percentage, 
                            addInvestmentPortfolioFunction, 
                            showModalStockFunction, 
                            removeInvestmentPortfolioFunction, 
                            showModalPortfolioFunction,
                            changeSelectedPortfolioFunction
                        }) => {

    // El onClick en Home tiene que hacer un par de cosas:
    // - set GlobalState.investmentHome {type, symbol, name} (Probablemente también id en caso de coin o token)
    // - set GlobalState.showModalStock = false
    // - set GlobalState.investmentHomeData (O sea los precios y dates)

    // Otros lugares donde está PortfolioItem y crea confusión. Por lo tanto se le cambiará el nombre y quizas los estilos. 
    // - Portfolio (Funciones como Eliminar de Portfolio y Editar %)
    // - ChartWrapper (Funcion de seleccionar selectedStockInChartWrapper o algo así)
    // - ModalStock de Portfolio (similar a este de Home)

    // EN RESUMEN: Yo creo que el mejor plan es crear 4 componentes diferentes. 
    // Si bien ahora estamos utilizando Where, pero después no va hacer falta. O sí, solo para debuggear. 

    // Podrían ser: (SearchResultHome.jsx, SearchResultPortfolio.jsx, PortfolioItem.jsx, ChartOption.jsx)

    const handleOnClick = () => {
        if(where === 'Portfolio') {
            addInvestmentPortfolioFunction({
                type: type,
                symbol: symbol,
                name: name,
                id: cryptoId,
                percentage: 0,
              })
              showModalStockFunction(false)
        }
        if(where === 'Chart') {
            changeSelectedPortfolioFunction({
                name: name,
                symbol: symbol,
                id: cryptoId
            })
        }
    }

    return (
        <>
        {/* <div onClick={() => handleOnClick()}>
            {where}
            {name}
            {cryptoId}
            {symbol}
            {type}
            {percentage}
            <div className='w-4 h-4 bg-red-500' onClick={() => removeInvestmentPortfolioFunction(cryptoId || symbol)}></div>
            <div className='w-4 h-4 bg-blue-500' onClick={() => showModalPortfolioFunction(true)}></div>
        </div> */}

        <div onClick={() => handleOnClick()} className='w-full h-14 flex items-center justify-center mb-2'>
            <StyledHover className={`relative w-4/5 h-full rounded-lg bg-gray-200 hover:bg-white mr-2 flex items-center px-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-500 ${where === 'PortfolioItem' ? 'max-w-44' : ''}`}>
                <div className='flex flex-col w-85%'>
                    <span className={`font-inter truncate text-sm`}>{name === undefined ? '?' : name} ({symbol === undefined ? '?' : symbol})</span>
                    <span className='font-inter text-gray-500 text-xs'>{type === undefined ? '?' : type}</span>
                </div>
                {where === 'PortfolioItem' ?
                <div className='absolute top-2 right-2 flex items-center justify-center'>
                    <span className='styled-son bg-gray-500 hover:bg-gray-900 w-11 h-11 flex items-center justify-center rounded-lg transition ease-in-out duration-500'>
                        <FiDelete onClick={() => removeInvestmentPortfolioFunction(cryptoId || symbol)} className='text-white text-2xl cursor-pointer'/>
                    </span>
                </div>
                : ''
                }
            </StyledHover>
            {where === 'PortfolioItem' ?
            <StyledOptions onClick={() => showModalPortfolioFunction(true)} className='relative font-inter w-1/5 h-full bg-gray-200 hover:bg-white rounded-lg cursor-pointer flex items-center justify-center hover:shadow-lg transition ease-in-out duration-500'>
                <span className='styled-original'>{percentage === undefined ? '' : percentage}%</span>
                <FiEdit className='styled-son absolute top-50% left-50% text-2xl'/>
            </StyledOptions>
            : ''
            }
        </div>

        </>
    )
}

const mapStateToProps = state => (
    {
        
    }
)

const mapDispatchToProps = dispatch => ({
    addInvestmentPortfolioFunction(data) {
        dispatch(addInvestmentPortfolio(data))
    },
    removeInvestmentPortfolioFunction(data) {
        dispatch(removeInvestmentPortfolio(data))
    },
    showModalStockFunction(data) {
        dispatch(showModalStock(data))
    },
    showModalPortfolioFunction(data) {
        dispatch(showModalPortfolio(data))
    },
    changeSelectedPortfolioFunction(data) {
        dispatch(changeSelectedPortfolio(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem)
