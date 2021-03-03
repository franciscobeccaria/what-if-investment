import React, {useState, useEffect} from 'react'
import Info from './Childs/Info'
import Growth from './Childs/Growth'
import {connect} from 'react-redux'
import moment from 'moment'

const Results = ({amountInGlobalState, dataInGlobalState, portfolioInGlobalState}) => {

    const [state, setState] = useState({
        totalEarned: undefined,
        totalGrowth: undefined,
    })

    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        // Acá se calculan los resultados según la data. 
        let totalAmount = amountInGlobalState
        let arrayEarned = []
        let arrayGrowth = []
        Object.keys(dataInGlobalState).forEach(e => {
            if(dataInGlobalState[e].data !== undefined && dataInGlobalState[e].data.length > 0) {
                let initialPrice = dataInGlobalState[e].data[0].value
                let endPrice = dataInGlobalState[e].data[dataInGlobalState[e].data.length - 1].value
                let partialEarned = endPrice / initialPrice * portfolioInGlobalState[e].percentage * totalAmount / 100
                let partialGrowth = (endPrice / initialPrice - 1) * 100
                arrayEarned.push(parseInt(partialEarned.toFixed(2)))
                arrayGrowth.push(parseInt(partialGrowth.toFixed(2)))
            }
        })
        const sumArray = (accumulator, currentValue) => accumulator + currentValue;
        if(arrayEarned.length !== 0 && arrayGrowth.length !== 0) {
            setState({
                totalEarned: arrayEarned.reduce(sumArray), 
                totalGrowth: (arrayEarned.reduce(sumArray) / totalAmount - 1) * 100
            })
        }
    }, [dataInGlobalState, amountInGlobalState, portfolioInGlobalState])

    useEffect(() => {
        let totalAmount = amountInGlobalState
        let eachInvestmentGrowth = []
        Object.keys(dataInGlobalState).forEach(e => {
            console.log('DATA EACH', dataInGlobalState[e])
            if(dataInGlobalState[e].data !== undefined && dataInGlobalState[e].data.length > 0) {
                let initialPrice = dataInGlobalState[e].data[0].value
                let initialAmountInStock = portfolioInGlobalState[e].percentage * totalAmount / 100
                let object = {
                    symbol: portfolioInGlobalState[e].symbol,
                    growth: {}
                }
                dataInGlobalState[e].data.forEach(x => {
                    // Acá había un error, a veces x.time viene en forma de objeto y eso rompía las cosas. Ya está solucionado. 
                    object.growth[x.time.year === undefined ? x.time : moment({year: x.time.year, month: x.time.month -1, day: x.time.day}).toISOString().slice(0,10)/* `${x.time.year}-${x.time.month}-${x.time.day}` */] = initialAmountInStock * x.value / initialPrice
                })
                eachInvestmentGrowth.push(object)
            }
        })

        console.log(eachInvestmentGrowth)

        // Esto lo que hace es filtrar el array, encontrar el elemento con más días y ponerlo en el primer espacio del array. 
        // Por ejemplo: Bitcoin tiene más días cargados que Apple. Necesitamos que el elemento con más días sea el primer espacio del array. 
        let investmentWithMoreDays = undefined
        let indexOfinvestmentWithMoreDays = undefined
        if(eachInvestmentGrowth.length > 1) {
            for (let i = 0; i < eachInvestmentGrowth.length; i++) {
                if(eachInvestmentGrowth[i+1] !== undefined && Object.keys(eachInvestmentGrowth[i].growth).length < Object.keys(eachInvestmentGrowth[i+1].growth).length) {
                    investmentWithMoreDays = eachInvestmentGrowth[i+1]
                    indexOfinvestmentWithMoreDays = i+1
                } 
            }
        }
        if(indexOfinvestmentWithMoreDays !== undefined) {
            eachInvestmentGrowth.splice(indexOfinvestmentWithMoreDays, 1);
            eachInvestmentGrowth.unshift(investmentWithMoreDays)
        } 

        let finalArrayToData = []
        if(eachInvestmentGrowth.length > 0) {
      
            for (let i = 0; i < eachInvestmentGrowth.length; i++) {
                if(Object.keys(eachInvestmentGrowth[i].growth).length !== Object.keys(eachInvestmentGrowth[0].growth).length) {
                    console.log('Hay menos fechas')
                    for (let x = 0; x < Object.keys(eachInvestmentGrowth[0].growth).length; x++) {
                        if(eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[0].growth)[x]] === undefined){
                            eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[0].growth)[x]] = eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[0].growth)[x-1]] || eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[0].growth)[x+1]]
                        }
                    }
                }
            }
        
            // Solucionado: Ya entrega todos los días en stocks. Los fines de semana toma el valor anterior. 
        
            let resultObject = {}
            for (let i = 0; i < eachInvestmentGrowth.length; i++) {
                for (let x = 0; x < Object.keys(eachInvestmentGrowth[i].growth).length; x++) {
                    if(resultObject[Object.keys(eachInvestmentGrowth[i].growth)[x]]) {
                        resultObject[Object.keys(eachInvestmentGrowth[i].growth)[x]] += eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[i].growth)[x]]
                    } else {
                        resultObject[Object.keys(eachInvestmentGrowth[i].growth)[x]] = eachInvestmentGrowth[i].growth[Object.keys(eachInvestmentGrowth[i].growth)[x]]
                    }
                }
            }
            for (let x = 0; x < Object.keys(resultObject).length; x++) {
                finalArrayToData.push({time: Object.keys(resultObject)[x], value: resultObject[Object.keys(resultObject)[x]]})
            }
        }
        setDataChart(finalArrayToData)

    }, [amountInGlobalState, dataInGlobalState, portfolioInGlobalState])

    return (
        <div className='results h-full p-2 mt-3'>
            {console.log('TOTAL EARNED', state.totalEarned)}
            <Info propsStyles={{margin: '0', width: '100%'}} text="Now you would have" number={state.totalEarned === undefined ? '-' : state.totalEarned.toString()} />
            <Info propsStyles={{width: '100%', margin: '8px 0'}} text="You would have earned" number={state.totalEarned === undefined ? '-' : (state.totalEarned - amountInGlobalState).toString()} showGrowth />
            <Growth where={'Portfolio'} growthInPercentage={state.totalGrowth} data={dataChart} />
            {/* <div className='w-full bg-red-500 h-10 mt-4'></div> */}
        </div>
    )
}

const mapStateToProps = state => (
    {
        amountInGlobalState: state.amountPortfolio,
        dataInGlobalState: state.portfolioData,
        portfolioInGlobalState: state.portfolio,
    }
)

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Results)
