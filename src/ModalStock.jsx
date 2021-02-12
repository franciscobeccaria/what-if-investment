import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'

import PortfolioItem from './PortfolioItem'

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

const ModalStock = () => {

    const wrapper = useRef(null)
    const segmentedControl = useRef(null)
    const oneRadioInput = useRef(null)
    const twoRadioInput = useRef(null)
    const threeRadioInput = useRef(null)
    const fourRadioInput = useRef(null)

    const onChangeInput = () => {
        console.log('onChangeInput executed')
    }

    const close = () => {
        console.log('close stockmodal')
        setState({
            ...state,
            show: false,
        })
    }

    const open = () => {
        console.log('open stockmodal')
        setState({
            ...state,
            show: true,
        })
    }

    const [state, setState] = useState({
        show: false,
    })

    useEffect(() => {
        if(state.show === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('flex')
        } else {
            wrapper.current.classList.remove('flex')
            wrapper.current.classList.add('hidden')
        }
    }, [state.show])

    return (
        <div onClick={() => close()} ref={wrapper} className='fixed top-0 left-0 w-screen h-screen bg-black hidden items-center justify-center' style={{backgroundColor: '#000000de'}}>
            <div className='max-w-90vw w-170 h-2/3 bg-gray-400 rounded-lg flex flex-col items-center p-1 md:p-8'>
                <input type="text" placeholder='Search...' className='w-90% mb-6 border-2 border-solid border-black rounded-lg font-inter pl-6'/>
                <SegmentedControl className="segmented-control bg-red-500" ref={segmentedControl}>
                    <input className='one' type="radio" id="one" name="mediatype-searchbox" value="one" ref={oneRadioInput} defaultChecked={true} onChange={() => onChangeInput()}/>
                    <label className='one text-sm md:text-base' htmlFor="one">Movies</label>
                    <input className='two' type="radio" id="two" name="mediatype-searchbox" value="two" ref={twoRadioInput} onChange={() => onChangeInput()}/>
                    <label className='two text-sm md:text-base' htmlFor="two">TV Shows</label>
                    <input className='three' type="radio" id="three" name="mediatype-searchbox" value="three" ref={threeRadioInput} onChange={() => onChangeInput()}/>
                    <label className='three text-sm md:text-base' htmlFor="three">Movies</label>
                    <input className='four' type="radio" id="four" name="mediatype-searchbox" value="four" ref={fourRadioInput} onChange={() => onChangeInput()}/>
                    <label className='four text-sm md:text-base' htmlFor="four">Movies</label>
                    <div className='background'></div>
                </SegmentedControl>
                <StyledScrollbarDiv className='w-90% h-full overflow-auto'>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                    <PortfolioItem inSimple/>
                </StyledScrollbarDiv>
            </div>
        </div>
    )
}

export default ModalStock
