import React, {useRef, useEffect} from 'react'
import {IconContext} from 'react-icons'
import { HiTrendingUp } from "react-icons/hi";

const Growth = ({inAdvanced}) => {

    // Contando el %. Entran 5 letras. Ya el 6to hay que achicar la letra. 
    // 8888% entra. Le agregamos un numero y hay que ahicar la letra. 
    // Vamos a hacer hasta 1.000.000%

    const growth = useRef(null)

    useEffect(() => {
        // Luego va a cambiar el click por un cambio en el estado. Y el useEffect va a escuchar si cambia este estado. 
        document.addEventListener('click', () => {
            console.log('listener cambiar tamaño letra de growth')
            console.log(growth.current !== null)
            if(growth.current !== null) {
                switch (growth.current.innerHTML.length) {
                    // 12345%
                    case 6:
                        growth.current.classList.remove('text-6xl');
                        growth.current.classList.add('text-5xl');
                        break;
                    // 123456%
                    case 7:
                        growth.current.classList.remove('text-5xl');
                        growth.current.classList.add('text-4xl');
                        break;
                    // 1234567%
                    case 8:
                        growth.current.classList.remove('text-5xl');
                        growth.current.classList.add('text-4xl');
                        break;
                    case 9:
                        growth.current.classList.remove('text-4xl');
                        growth.current.classList.add('text-3xl');
                        break;
                    case 10:
                        growth.current.classList.remove('text-3xl');
                        growth.current.classList.add('text-2xl');
                        break;
                    // 1234%
                    default:
                        growth.current.classList.add('text-6xl');
                }
            }
        })
    },[])

    return (
        <div className='flex w-170 max-w-90vw sm:h-44 flex-col-reverse sm:flex-row' style={inAdvanced ? {width: '100%', flexDirection: 'column-reverse', height: 'fit-content'} : {}}>
            <div className='bg-white w-full sm:w-55% rounded-lg h-52 sm:h-44 sm:h-full' style={inAdvanced ? {width: '100%', marginTop: '8px', height: '18rem'} : {}}>
                GRAFICO
            </div>
            <div className='bg-positive w-full sm:w-45% rounded-lg h-28 sm:h-full mb-4 sm:mb-0 sm:ml-4
                            flex items-center justify-center text-6xl pr-6 sm:pr-2 p-2'
                            style={inAdvanced ? {width: '100%', margin: '0px'} : {}}>
                <span className='text-white text-7xl mr-auto'>
                    <HiTrendingUp />
                </span>
                <span ref={growth} className='text-white font-bold text-6xl'>120%</span>
            </div>
        </div>
    )
}

export default Growth
