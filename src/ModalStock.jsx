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

    const onChangeSegmentedControl = () => {
        console.log('onChangeSegmentedControl executed')
    }

    const [timeState, setTimeState] = useState(false)
    const [searchURLState, setSearchURLState] = useState(undefined)

    const onChangeSearchInput = (e) => {
        console.log(e.target.value)
        if(e.target.value.length > 1) {
            let searchURL = `https://sandbox.tradier.com/v1/markets/search?q=${e.target.value}`
            setTimeState(false)
            setSearchURLState(searchURL)
            setTimeout(() => {
                setTimeState(true)
            }, 1000)
            /* axios.get(searchURLState, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                }
            }
            )
            .then(resp => setSearchResults(resp.data.securities.security)) */
        } else {
            setSearchResults([])
        }
    }

    useEffect(() => {
        if(timeState === true) {
            axios.get(searchURLState, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
                }
            }
            )
            .then(resp => setSearchResults(resp.data.securities === null ? [] : resp.data.securities.security))
        }
    },[timeState])

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
                    <input className='one' type="radio" id="one" name="mediatype-searchbox" value="one" ref={oneRadioInput} defaultChecked={true} onChange={() => onChangeSegmentedControl()}/>
                    <label className='one text-sm md:text-base' htmlFor="one">Movies</label>
                    <input className='two' type="radio" id="two" name="mediatype-searchbox" value="two" ref={twoRadioInput} onChange={() => onChangeSegmentedControl()}/>
                    <label className='two text-sm md:text-base' htmlFor="two">TV Shows</label>
                    <input className='three' type="radio" id="three" name="mediatype-searchbox" value="three" ref={threeRadioInput} onChange={() => onChangeSegmentedControl()}/>
                    <label className='three text-sm md:text-base' htmlFor="three">Movies</label>
                    <input className='four' type="radio" id="four" name="mediatype-searchbox" value="four" ref={fourRadioInput} onChange={() => onChangeSegmentedControl()}/>
                    <label className='four text-sm md:text-base' htmlFor="four">Movies</label>
                    <div className='background'></div>
                </SegmentedControl>
                <StyledScrollbarDiv className='w-90% h-full overflow-auto'>
                    {
                            searchResults.length === 0
                                ? 'No results' /* <PortfolioItem inSimple/> */
                                : 
                                    searchResults.length === undefined
                                        ?
                                            <PortfolioItem inSimple inAdvancedModal={where === 'inAdvanced' ? true : false} name={searchResults.description} symbol={searchResults.symbol} type={searchResults.type} />
                                        :
                                            searchResults.map(e => 
                                                    <PortfolioItem inSimple inAdvancedModal={where === 'inAdvanced' ? true : false} name={e.description} symbol={e.symbol} type={e.type} key={e.symbol}/>
                                                )
                    }
                </StyledScrollbarDiv>
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
