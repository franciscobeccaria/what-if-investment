import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Loader = styled.div`
& .lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
& .lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
& .lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
& .lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
& .lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

const ModalLoading = ({modalLoadingVisibility}) => {

    const wrapper = useRef(null)

    useEffect(() => {
        if(modalLoadingVisibility === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('fixed')
        } else {
            wrapper.current.classList.remove('fixed')
            wrapper.current.classList.add('hidden')
        }
    }, [modalLoadingVisibility])

    return (
        <div ref={wrapper} className='hidden top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center z-10 text-white'>
            <Loader>
                <div className='lds-ring'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Loader>
        </div> 
    )
}

const mapStateToProps = state => (
    {
        modalLoadingVisibility: state.showModalLoading
    }
)

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoading)
