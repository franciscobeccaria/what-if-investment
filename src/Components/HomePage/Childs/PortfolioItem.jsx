import React from 'react'
import { changeInvestmentHome, showModalStock } from '../../../redux/actionCreators';
import {connect} from 'react-redux'

const PortfolioItem = ({where, name, cryptoId, symbol, type, changeInvestmentHomeFunction, showModalStockFunction}) => {

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
        changeInvestmentHomeFunction({
            type: type,
            symbol: symbol,
            name: name,
            id: cryptoId,
          })
          showModalStockFunction(false)
    }

    return (
        <>
        {/* <div onClick={() => handleOnClick()}>
            {where}
            {name}
            {cryptoId}
            {symbol}
            {type}
        </div> */}
        
        <div onClick={() => handleOnClick()} className='w-full h-14 flex items-center justify-center mb-2'>
            <div className='relative w-4/5 h-full rounded-lg bg-gray-200 hover:bg-white mr-2 flex items-center px-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-500'>
                <div className='flex flex-col w-85%'>
                    <span className={`font-inter truncate text-sm`}>{name === undefined ? '?' : name} ({symbol === undefined ? '?' : symbol})</span>
                    <span className='font-inter text-gray-500 text-xs'>{type === undefined ? '?' : type}</span>
                </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => (
    {
        
    }
)

const mapDispatchToProps = dispatch => ({
    changeInvestmentHomeFunction(data) {
        dispatch(changeInvestmentHome(data))
    },
    showModalStockFunction(data) {
        dispatch(showModalStock(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem)
