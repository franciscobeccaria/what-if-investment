import React, {useEffect, useState} from 'react'
import Title from './HomePage/Title'
import Info from './HomePage/Info'
import Growth from './HomePage/Growth'
import ChartWrapper from './HomePage/ChartWrapper'
import ModalStock from './HomePage/ModalStock'

import moment from 'moment'
import {getStockData, getCryptoData} from '../services/api'
import {updateDataInvestmentHome, showModalLoading} from '../redux/actionCreators'
import {connect} from 'react-redux'

const HomePage = ({updateDataInvestmentHomeFunction, showModalLoadingFunction, selectedInvestmentInGlobalState, selectedDateInGlobalState, dataInGlobalState, amountInGlobalState}) => {

    const [state, setState] = useState({
        growthInPercentage: undefined,
        growth: undefined,
        endAmount: undefined,
        earned: undefined,
    })
    
    useEffect(() => {
        // Acá se calculan los resultados según la data. 
        if(amountInGlobalState !== undefined && dataInGlobalState[0] !== undefined) {
            let growth = dataInGlobalState[dataInGlobalState.length - 1].value / dataInGlobalState[0].value // Example: 50 / 25 = 2 (x2)
            let growthInPercentage = (growth - 1) * 100 // Example x2 ... = 100% - Example x1.6 ... = 60%
            //changeGrowthSimpleFunction(growthInPercentage)
            let initialAmount = amountInGlobalState
            let endAmount = initialAmount * growth
            let earned = endAmount - initialAmount
            setState({
                ...state,
                growthInPercentage: growthInPercentage,
                growth: growth,
                endAmount: endAmount,
                earned: earned,
            })
        }
    }, [dataInGlobalState, amountInGlobalState])

    useEffect(() => {
        // Acá tengo que hacer la petición de la data. Los precios y fechas tanto de Stock como de Crypto. 
        let today = moment().toISOString().slice(0,10)
        let initialDate
        if(selectedDateInGlobalState.includes('year')) {
            initialDate = moment(today).subtract(parseInt(selectedDateInGlobalState.slice(0,2)), 'years').toISOString().slice(0,10)
        } else if(selectedDateInGlobalState.includes('month')) {
            initialDate = moment(today).subtract(parseInt(selectedDateInGlobalState.slice(0,2)), 'months').toISOString().slice(0,10)
        } else if(selectedDateInGlobalState.includes('day')) {
            initialDate = moment(today).subtract(parseInt(selectedDateInGlobalState.slice(0,2)), 'days').toISOString().slice(0,10)
        }
        if(selectedInvestmentInGlobalState.id) {
            showModalLoadingFunction(true)
            getCryptoData(selectedInvestmentInGlobalState.id, initialDate, today).then(resp => {
                updateDataInvestmentHomeFunction(resp)
                showModalLoadingFunction(false)
            })
        } else {
            showModalLoadingFunction(true)
            getStockData(selectedInvestmentInGlobalState.symbol, 'daily', initialDate, today).then(resp => {
                updateDataInvestmentHomeFunction(resp)
                showModalLoadingFunction(false)
            })
        }
    }, [selectedInvestmentInGlobalState, selectedDateInGlobalState])

    return (
        <>
            <div className="min-h-screen bg-main flex items-center justify-center flex-col pt-16 pb-12">
                <Title />
                <Info propsClassList="mb-0" text="Now you would have" number={state.endAmount === undefined ? '-' : state.endAmount} />
                <Info text="You would have earned" number={state.earned === undefined ? '-' : state.earned} showGrowth />
                <Growth where={'Home'} growthInPercentage={state.growthInPercentage} data={dataInGlobalState} amount={amountInGlobalState} />
                <ChartWrapper where={'Home'} data={dataInGlobalState} investment={selectedInvestmentInGlobalState} />
            </div>
            <ModalStock where={'Home'}/>
        </>
    )
}

const mapStateToProps = state => (
    {
        selectedInvestmentInGlobalState: state.investmentHome,
        selectedDateInGlobalState: state.dateHome,
        amountInGlobalState: state.amountHome,
        dataInGlobalState: state.dataInvestmentHome
    }
)

const mapDispatchToProps = dispatch => ({
    updateDataInvestmentHomeFunction(data) {
        dispatch(updateDataInvestmentHome(data))
    },
    showModalLoadingFunction(data) {
        dispatch(showModalLoading(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)