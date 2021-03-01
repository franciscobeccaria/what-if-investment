import React, {useEffect, useRef} from 'react'

const ModalLoading = ({visibility}) => {

    const wrapper = useRef(null)

    useEffect(() => {
        console.log('se ejecuta el useEffect de visibility en ModalLoading.', visibility)
        if(visibility === true) {
            wrapper.current.classList.remove('hidden')
            wrapper.current.classList.add('fixed')
        } else {
            wrapper.current.classList.remove('fixed')
            wrapper.current.classList.add('hidden')
        }
        console.log(wrapper, wrapper.current)
    }, [visibility])

    return (
        <div ref={wrapper} className='hidden top-0 left-0 w-screen h-screen bg-red-400 z-10 flex items-center justify-center'>
            Cargando...
        </div>
    )
}

export default ModalLoading
