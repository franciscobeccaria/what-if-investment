import React, {useEffect, useRef, useState} from 'react'
import {showModalPortfolio, changePercentage} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import wNumb from 'wnumb'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
//import "./index.css"
import styled from 'styled-components'

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

const ModalPortfolio = ({showModalPortfolioFunction, showModalPortfolioInGlobalState, portfolioInGlobalState, changePercentageFunction}) => {

    const myRef = useRef()
    const wrapper = useRef(null)

    const [estado, setEstado] = useState(Date.now())

    useEffect(() => {
        setEstado(Date.now())
    }, [showModalPortfolioInGlobalState])

    const [state, setState] = useState({
        value: [0],
        range: { min: 0, max: 100 }
    })

    const [percentageState, setPercentageState] = useState({
        array: [],
        update: undefined,
    })

    const [connectArray, setConnectArray] = useState({array: [true, true]})

    // Esto lo que hace es guardar en percentageState cada elemento y su %. 
    useEffect(() => {
        let array = []
        Object.keys(portfolioInGlobalState).forEach(e => {
            array.push({symbol: portfolioInGlobalState[e].id || portfolioInGlobalState[e].symbol, percentage: portfolioInGlobalState[e].percentage})
          })
      setPercentageState({
          array: array,
          update: Date.now(),
      })
    }, [portfolioInGlobalState])

    const handleSlide = (data) => {
        let connect = myRef.current.children[1].querySelectorAll('.noUi-connect')
        let classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
        for (let i = 0; i < connect.length; i++) {
            connect[i].classList.add(classes[i]);
        }
        let info = myRef.current.children[1].querySelectorAll('.noUi-tooltip')
        for (let i = 0; i < info.length; i++) {
          info[i].classList.add('none');
          }
          //console.log(percentageState)
        for(let i = 0; i < state.value.length + 1; i++){
            //console.log(data)
            //console.log(portfolioInGlobalState[Object.keys(portfolioInGlobalState)[i]])
            //console.log(Object.keys(portfolioInGlobalState)[i])
            //console.log(portfolioInGlobalState[Object.keys(portfolioInGlobalState)[i]].symbol)
            //if(Object.keys(portfolioInGlobalState)[i] !== undefined) {
            if(Object.keys(portfolioInGlobalState)[i] !== undefined) {
                //console.log(percentageState.array)
                const elementsIndex = percentageState.array.findIndex(element => {
                    if(portfolioInGlobalState[Object.keys(portfolioInGlobalState)[i]].id) {
                        return element.symbol === portfolioInGlobalState[Object.keys(portfolioInGlobalState)[i]].id
                    } else return element.symbol === portfolioInGlobalState[Object.keys(portfolioInGlobalState)[i]].symbol // Solo este return funcionaba para stocks. 
                })
                let newArray = percentageState.array
                newArray[elementsIndex] = {...newArray[elementsIndex], percentage: (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1]))}
                setPercentageState({
                    array: newArray,
                    update: Date.now()
                });
            }
        }
        //console.log('percentageState:', percentageState)
      }

      const handleConnectProp = () => {
        let connectArray = [true]
          for (let i = 0; i < state.value.length; i++) {
                  connectArray.push(true)
              }
          return connectArray
    }

    const getPortfolioLength = () => {
        console.log('getPortfolioLength')
        let array = []
        for (let i = 0; i < Object.keys(portfolioInGlobalState).length; i++) {
              array.push(0)
            }
        if(array.length > 1) {
          array.pop()
        }
        setState({
          value: array,
          range: { min: 0, max: 100 }
        })
    }

    const sendNewPercentages = () => {
        //console.log(percentageState)
        percentageState.array.forEach(e => {
            changePercentageFunction(e)
        })
        /* percentageState.array.forEach(e => {
            changeItemPercentageFunction({symbol: e.symbol, percentage: e.percentage})
        }) */
    }

    useEffect(() => {
        if(showModalPortfolioInGlobalState === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('flex')
            getPortfolioLength()
        } else {
            wrapper.current.classList.remove('flex')
            wrapper.current.classList.add('hidden')
        }
    }, [showModalPortfolioInGlobalState])

    return (
        <div onClick={() => showModalPortfolioFunction(false)} ref={wrapper} className='fixed z-10 top-0 left-0 w-screen h-screen bg-black hidden items-center justify-center' style={{backgroundColor: '#000000de'}}>
            <div onClick={e => e.stopPropagation()} className='max-w-90vw w-170 h-2/3 bg-gray-400 rounded-lg p-9'>
            <div ref={myRef} className='flex items-center justify-center flex-col w-full h-full'>
                        <h3 className='font-inter mb-6 font-bold text-2xl'>
                            Manage the % of your Portfolio
                        </h3>
                        <Nouislider 
                            className='w-full mb-8'
                            key={estado}
                            start={state.value} 
                            range={state.range} 
                            //connect={[true, true]}
                            tooltips={true} 
                            onSlide={(data) => handleSlide(data)}
                            format={ wNumb({ decimals: 0 }) }
                        />
                        <StyledScrollbarDiv className='w-full overflow-auto mb-4 pr-3'>
                            {percentageState.array.map((e) => {
                                if(portfolioInGlobalState[e.symbol]) {
                                return (
                            <div className='w-full h-14 flex items-center justify-center mb-2' key={e.symbol}>
                                <div className='relative w-4/5 h-full rounded-lg bg-gray-200 mr-2 flex items-center px-2 '>
                                    <div className='flex flex-col w-85%'>
                                        <span className={`font-inter truncate text-sm`}>{portfolioInGlobalState[e.symbol].name === undefined ? '?' : portfolioInGlobalState[e.symbol].name} ({portfolioInGlobalState[e.symbol].symbol === undefined ? '?' : portfolioInGlobalState[e.symbol].symbol})</span>
                                        <span className='font-inter text-gray-500 text-xs'>{portfolioInGlobalState[e.symbol].type === undefined ? '?' : portfolioInGlobalState[e.symbol].type}</span>
                                    </div>
                                </div>
                                <div className='relative font-inter w-1/5 h-full bg-gray-200 rounded-lg flex items-center justify-center'>
                                    <span className='styled-original'>{e.percentage === undefined ? '' : e.percentage}%</span>
                                </div>
                            </div>
                                )
                                }else return null})}
                        </StyledScrollbarDiv>
                        <button onClick={() => {sendNewPercentages(); showModalPortfolioFunction(false)}} className='bg-gray-50 rounded-lg mt-auto ml-auto p-4 hover:bg-white hover:shadow-lg transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-105'>
                            Save %
                        </button>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => (
    {
        showModalPortfolioInGlobalState: state.showModalPortfolio,
        portfolioInGlobalState: state.portfolio
    }
)

const mapDispatchToProps = dispatch => ({
    showModalPortfolioFunction(data) {
        dispatch(showModalPortfolio(data))
    },
    changePercentageFunction(data) {
        dispatch(changePercentage(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalPortfolio)
