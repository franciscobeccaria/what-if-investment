import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import {showModalStock} from './redux/actionCreators'
import {connect} from 'react-redux'

import PortfolioItem from './PortfolioItem'
import axios from 'axios'

const SegmentedControl = styled.div`
    position: relative;
    background-color: #093048;
    z-index: 5;
    width: 90%;
    //max-width: 500px;
    margin-bottom: 10px;
    height: 30px;
    border-radius: 10px;
    //display: none;
    & input {
    display: none;
    }
    .background,
    & label {
    width: 25%;
    height: 100%;
    text-align: center;
    display: inline-block;
    //padding-top: 10px;
    //margin-right: -3px;
    z-index: 2;
    color: white;
    font-family: 'Inter', 'serif';
    cursor: pointer;
    //outline: 1px solid green;
    }
    & .background {
    background-color: #0099ff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    }
    & > input.one:checked ~ .background {
    transform: translateX(0);
    transition: transform 0.5s ease-in-out, border-radius 0.5s;
    border-radius: 10px 0 0 10px;
    }
    & > input.two:checked ~ .background {
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out, border-radius 0.5s;
    //border-radius: 0 10px 10px 0;
    }
    & input.three:checked ~ .background {
        transform: translateX(200%);
    transition: transform 0.5s ease-in-out;
    }
    & input.four:checked ~ .background {
        transform: translateX(300%);
    transition: transform 0.5s ease-in-out;
    border-radius: 0 10px 10px 0;
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

const ModalStock = ({receivedState, showModalStockFunction, where}) => {

    const wrapper = useRef(null)
    const segmentedControl = useRef(null)
    const oneRadioInput = useRef(null)
    const twoRadioInput = useRef(null)
    const threeRadioInput = useRef(null)
    const fourRadioInput = useRef(null)

    const [searchResults, setSearchResults] = useState([])
    const [option, setOption] = useState('name')
    const [cryptoData, setCryptoData] = useState([])
    const [loadState, setLoadState] = useState()

    const onChangeSegmentedControl = (e) => {
        if(e.target.value === 'crypto' || e.target.value === 'crypto symbol'){
            if(cryptoData.length === 0) {
                axios.get('https://api.coinpaprika.com/v1/coins')
                .then(resp => setCryptoData(resp.data))
            }
        }
        setOption(e.target.value)
        setSearchResults([])
        console.log('onChangeSegmentedControl executed')
    }

    const [timeState, setTimeState] = useState(false)
    const [searchURLState, setSearchURLState] = useState(undefined)

    const onChangeSearchInput = (e) => {
        console.log(e.target.value)
        
        if(e.target.value.length > 0) {
            let searchURL
            if(option === 'name') searchURL = `https://sandbox.tradier.com/v1/markets/search?q=${e.target.value}&exchanges=Q,N&types=stock`
            if(option === 'symbol') searchURL = `https://sandbox.tradier.com/v1/markets/lookup?q=${e.target.value}&exchanges=Q,N&types=stock`
            if(option === 'crypto' || option === 'crypto symbol') setSearchResults([])
            if(option === 'crypto' || option === 'crypto symbol') searchURL = e.target.value
            //setLoadState('Loading Stock results...')
            setTimeState(false)
            setSearchURLState(searchURL)
            setTimeout(() => {
                setTimeState(true)
            }, 1000)
        } else {
            setSearchResults([])
        }
    }

    useEffect(() => {
        if(timeState === true) {
            if(option === 'name' || option === 'symbol') {
                axios.get(searchURLState, 
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                    }
                }
                )
                .then(resp => {
                    setLoadState()
                    if(resp.data.securities === null) {
                        setSearchResults([]) // No results
                    }
                    else if(resp.data.securities.security.length === undefined) {
                        setSearchResults([resp.data.securities.security])
                    }
                    else setSearchResults(resp.data.securities.security.slice(0,30))
                })
            }

            // La data de Crypto la tiene que cargar apenas se abre el ModalStock. 
            /* if(cryptoData.length === 0) {
                axios.get('https://api.coinpaprika.com/v1/coins')
                .then(resp => setCryptoData(resp.data))
            } else */ if (option === 'crypto') {
                console.log('busqueda crypto')
                console.log(searchURLState)
                setSearchResults(cryptoData.filter(e => e.name.toLowerCase().includes(searchURLState.toLowerCase())).slice(0,30))
            } else if (option === 'crypto symbol') {
                console.log('busqueda crypto symbol')
                console.log(searchURLState)
                setSearchResults(cryptoData.filter(e => e.symbol.toLowerCase().includes(searchURLState.toLowerCase())).slice(0,30))
            }

            // Digamos que quiero toda la data desde el 2011. Hasta hoy. 
            // Yo calcularia primero, en que semestre estamos en fecha inicial y fecha final. 
            // Calcularia cuantos semestres hay que cargar. 
            // En realidad tenemos fecha inicial, ej: 2011-03-15, tenemos que cargar = 2011-03-15 a 2011-06-30
            // O sino, 2011-03-15, + 180 dias. result +180 dias. (si el end date es antes que +180 dias, lo haremos hasta el end date) Todo lo guardamos en un array. 
            
            /* class MyDate extends Date {                
                addDays(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }
              }
            
            let finish = false
            let initialDate = '2011-11-04'
            let endDate = '2015-10-15' // Construimos todo para traer un día. Ej: pongo 2020-10-15, trae 2020-10-14. Así que habría que hacer algo ahí. 
            let arrayData = [] */

            // EL PLAN
            // El plan es que itere cada dia entregado y si uno de esos días es === a endDate se ejecuta finish = true

            // Debería arreglar errores:
            //      - Inicio dia 3. Final dia 2. Error. 
            //      - Inicio dia 3. Final dia 3. Ver que pasa. 

            /* console.log('disparamos')
            const api = (initialDate, endDate) => {
                let date = new MyDate(initialDate.slice(0,4), initialDate.slice(5, 7) -1, initialDate.slice(8, 10))
                let start = date.toISOString().slice(0,10)
                let end = date.addDays(365).toISOString().slice(0,10)
                axios.get(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=${start}&end=${end}`)
                .then(resp => {
                    console.log(resp.data.length)
                    console.log(resp.data[0].time_open, resp.data[0].open)
                    console.log(resp.data[resp.data.length-1].time_open, resp.data[resp.data.length-1].open)
                    resp.data.forEach(e => {
                        if(e.time_open.slice(0,10) === endDate) {
                            finish = true
                        } else if (finish === false) {
                            arrayData.push(e)
                        }})
                    console.log(arrayData, arrayData[0].time_open.slice(0,10), arrayData[arrayData.length -1].time_open.slice(0,10))
                    if(finish === true) return null
                    else api(date.addDays(365).toISOString().slice(0,10), endDate)
                })
            }
            api(initialDate, endDate) */
            
            console.log(searchResults)
        }
    },[timeState])

    const call = (start, end) => {
        axios.get(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=${start}&end=${end}`)
        .then(resp => {
            console.log(resp.data.length)
            console.log(resp.data[0].time_open, resp.data[0].open)
            console.log(resp.data[resp.data.length-1].time_open, resp.data[resp.data.length-1].open)
            return resp.data
        })
    }

    useEffect(() => {
        if(receivedState.showModalStock === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('flex')
        } else {
            wrapper.current.classList.remove('flex')
            wrapper.current.classList.add('hidden')
        }
    }, [receivedState.showModalStock])

    return (
        <div onClick={() => showModalStockFunction(false)} ref={wrapper} className='fixed z-10 top-0 left-0 w-screen h-screen bg-black hidden items-center justify-center' style={{backgroundColor: '#000000de'}}>
            <div onClick={e => e.stopPropagation()} className='max-w-90vw w-170 h-2/3 bg-gray-400 rounded-lg flex flex-col items-center p-1 md:p-8'>
                <input onChange={(e) => onChangeSearchInput(e)} type="text" placeholder='Search...' className='w-90% mb-6 border-2 border-solid border-black rounded-lg font-inter pl-6'/>
                <SegmentedControl className="segmented-control bg-red-500" ref={segmentedControl}>
                    <input className='one' type="radio" id="one" name="mediatype-searchbox" value="name" ref={oneRadioInput} defaultChecked={true} onChange={(e) => onChangeSegmentedControl(e)}/>
                    <label className='one text-sm md:text-base' htmlFor="one">Stock Name</label>
                    <input className='two' type="radio" id="two" name="mediatype-searchbox" value="symbol" ref={twoRadioInput} onChange={(e) => onChangeSegmentedControl(e)}/>
                    <label className='two text-sm md:text-base' htmlFor="two">Stock Symbol</label>
                    <input className='three' type="radio" id="three" name="mediatype-searchbox" value="crypto" ref={threeRadioInput} onChange={(e) => onChangeSegmentedControl(e)}/>
                    <label className='three text-sm md:text-base' htmlFor="three">Crypto Name</label>
                    <input className='four' type="radio" id="four" name="mediatype-searchbox" value="crypto symbol" ref={fourRadioInput} onChange={(e) => onChangeSegmentedControl(e)}/>
                    <label className='four text-sm md:text-base' htmlFor="four">Crypto Symbol</label>
                    <div className='background'></div>
                </SegmentedControl>
                { (option === 'crypto' || option === 'crypto symbol') && cryptoData.length === 0 ? 'Loading Crypto Data' : 
                <StyledScrollbarDiv className='w-90% h-full overflow-auto'>
                    {   
                        loadState !== undefined ? loadState :
                            searchResults.length === 0
                                ? 'No results' /* <PortfolioItem inSimple/> */
                                : 
                                    searchResults.length === undefined
                                        ?  
                                            <PortfolioItem inSimple inAdvancedModal={where === 'inAdvanced' ? true : false} name={searchResults.description} symbol={searchResults.symbol} type={searchResults.type} />
                                        :
                                            searchResults.map(e => 
                                                    <PortfolioItem inSimple inAdvancedModal={where === 'inAdvanced' ? true : false} name={e.description === undefined ? e.name : e.description} cryptoId={e.id} symbol={e.symbol} type={e.type} key={e.description === undefined ? e.id : e.symbol}/>
                                                )
                    }
                </StyledScrollbarDiv>
                }
            </div>
        </div>
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalStock)
