import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import {showModalStock} from '../../redux/actionCreators'
import {connect} from 'react-redux'

import PortfolioItem from './Childs/PortfolioItem'
import axios from 'axios'

const SegmentedControl = styled.div`
    position: relative;
    background-color: #093048;
    z-index: 5;
    width: 90%;
    //max-width: 500px;
    margin-bottom: 10px;
    height: 30px;
    @media screen and (max-width: 640px) {
        height: 46px;
    }
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

const ModalStock = ({showModalStockInGlobalState, showModalStockFunction, where}) => {

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
    }

    const [timeState, setTimeState] = useState(false)
    const [searchURLState, setSearchURLState] = useState(undefined)

    const onChangeSearchInput = (e) => {        
        if(e.target.value.length > 0) {
            let searchURL
            if(option === 'name') searchURL = `https://sandbox.tradier.com/v1/markets/search?q=${e.target.value}&exchanges=Q,N&types=stock`
            if(option === 'symbol') searchURL = `https://sandbox.tradier.com/v1/markets/lookup?q=${e.target.value}&exchanges=Q,N&types=stock`
            if(option === 'crypto' || option === 'crypto symbol') setSearchResults([])
            if(option === 'crypto' || option === 'crypto symbol') searchURL = e.target.value
            setLoadState('Loading Stock results...')
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
            else if (option === 'crypto') {
                setLoadState()
                setSearchResults(cryptoData.filter(e => e.name.toLowerCase().includes(searchURLState.toLowerCase())).slice(0,30))
            } else if (option === 'crypto symbol') {
                setLoadState()
                setSearchResults(cryptoData.filter(e => e.symbol.toLowerCase().includes(searchURLState.toLowerCase())).slice(0,30))
            }
        }
    },[timeState])

    useEffect(() => {
        if(showModalStockInGlobalState === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('flex')
        } else {
            wrapper.current.classList.remove('flex')
            wrapper.current.classList.add('hidden')
        }
    }, [showModalStockInGlobalState])

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
                                ? 'No results'
                                : 
                                    searchResults.length === undefined
                                        ?  
                                            <PortfolioItem where={where} name={searchResults.description} symbol={searchResults.symbol} type={searchResults.type} />
                                        :
                                            searchResults.map(e => 
                                                    <PortfolioItem where={where} name={e.description || e.name} cryptoId={e.id} symbol={e.symbol} type={e.type} key={e.description === undefined ? e.id : e.symbol}/>
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
        showModalStockInGlobalState: state.showModalStock
    }
)

const mapDispatchToProps = dispatch => ({
    showModalStockFunction(data) {
        dispatch(showModalStock(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalStock)
