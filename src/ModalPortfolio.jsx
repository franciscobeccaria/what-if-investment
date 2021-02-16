import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import wNumb from 'wnumb'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./index.css"
import { connect } from 'react-redux';
import {showModalPortfolio} from './redux/actionCreators'
import PortfolioItem from './PortfolioItem';
import ModalPortfolioItem from './ModalPortfolioItem';

const Wrapper = styled.div`
& .c-1-color {
  background: red;
}
& .c-2-color {
  background: yellow;
}
& .c-3-color {
  background: green;
}
& .c-4-color {
  background: blue;
}
& .c-5-color {
  background: purple;
}

& .none {
  display: none;
}
`

const ModalPortfolio = ({showModalPortfolioFunction, receivedState}) => {

    const myRef = useRef()
    const wrapper = useRef(null)

    const [state, setState] = useState({
        value: [0],
        range: { min: 0, max: 100 }
    })

    const [percentageState, setPercentageState] = useState([])

    const handleClick = () => {
        console.log(state)
        /* this.setState({
          value: [50, 55],
          range: { min: 45, max: 60 }
        }); */
      };

      useEffect(() => {
          let array = []
          for(let i = 0; i < state.value.length + 1; i++){
        if(receivedState.portfolio[i] !== undefined) {
            array.push({symbol: receivedState.portfolio[i].symbol, percentage: receivedState.portfolio[i].percentage})
        }
    }
        setPercentageState(array)
      }, [receivedState.portfolio])
    
      const handleSlide = (data) => {
        //console.log(data)
        //console.log(this.myRef.current.sliderContainer.current.querySelectorAll('.noUi-connect'))
        //console.log(myRef.current.children[1].querySelectorAll('.noUi-connect'))
        //let connect = myRef.current.sliderContainer.current.querySelectorAll('.noUi-connect')
        let connect = myRef.current.children[1].querySelectorAll('.noUi-connect')
        let classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
        for (let i = 0; i < connect.length; i++) {
            connect[i].classList.add(classes[i]);
        }
        let info = myRef.current.children[1].querySelectorAll('.noUi-tooltip')
        //console.log(info)
        for (let i = 0; i < info.length; i++) {
          info[i].classList.add('none');
          }
          console.log(percentageState)
        for(let i = 0; i < state.value.length + 1; i++){
            //console.log(i, '=', (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1])))
            // probar esto con console.log:
            console.log(receivedState.portfolio[i] === undefined ? 'und' : receivedState.portfolio[i].symbol, '=', (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1])))
            if(receivedState.portfolio[i] !== undefined) {
                //receivedState.portfolio[i].percentage = (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1]))
                let symbol = percentageState[i].symbol
                let newP = (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1]))
                console.log('newP', newP)
                percentageState.forEach(e => e.symbol === symbol ? 
                    setPercentageState(
                        [
                            {
                                symbol,
                                percentage: newP
                            }
                        ]
                    )
                    : ''
                    )
                //percentageState[i].percentage = (data[i] === undefined ? 100 : parseInt(data[i])) - (data[i-1] === undefined ? 0 : parseInt(data[i-1]))
            }
        }
        console.log('percentageState:', percentageState)
      }

      const handleConnectProp = () => {
          let connectArray = [true]
            for (let i = 0; i < state.value.length; i++) {
                    connectArray.push(true)
                }
            return connectArray
      }

      const getPortfolioLength = () => {
          let array = []
          for (let i = 0; i < receivedState.portfolio.length; i++) {
                array.push(0)
              }
          //return array
          console.log(state)
          if(array.length > 1) {
            array.pop()
          }
          setState({
            value: array,
            range: { min: 0, max: 100 }
          })
          console.log(state)
      }

      useEffect(() => {
        if(receivedState.showModalPortfolio === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('flex')
            getPortfolioLength()
            /* setState({
                ...state,
                value: getPortfolioLength()
            }) */
        } else {
            wrapper.current.classList.remove('flex')
            wrapper.current.classList.add('hidden')
        }
    }, [receivedState.showModalPortfolio])

        return (
            <Wrapper onClick={() => showModalPortfolioFunction(false)} ref={wrapper} className='fixed top-0 left-0 w-screen h-screen bg-black z-10 flex items-center justify-center' style={{backgroundColor: '#000000de'}}>
                <div onClick={e => e.stopPropagation()} className='w-80% h-80% bg-blue-300'>
                    <div ref={myRef}>
                        <button onClick={() => handleClick()}>change range</button>
                        {state.value.length}
                        <Nouislider 
                        key={receivedState.showModalPortfolio}
                        start={state.value} 
                        range={state.range} 
                        connect={handleConnectProp()}
                        /* connect={[true, true, true]} */
                        tooltips={true} 
                        onSlide={(data) => handleSlide(data)}
                        format={ wNumb({ decimals: 0 }) }
                        />
                        <h2>Start editing to see some magic happen {"\u2728"}</h2>
                        <div>
                            {percentageState.map((e) => 
                            {   console.log('pppp', e.symbol, e.percentage)
                                return (
                                    <ModalPortfolioItem symbol={e.symbol} percentage={e.percentage} key={e.symbol + e.percentage}/>
                            )})}
                        </div>
                        <button>Save %</button>
                    </div>
                </div>
            </Wrapper>
        )
}

const mapStateToProps = state => (
    {
        receivedState: state
    }
)

const mapDispatchToProps = dispatch => ({
    showModalPortfolioFunction(data) {
        dispatch(showModalPortfolio(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalPortfolio)