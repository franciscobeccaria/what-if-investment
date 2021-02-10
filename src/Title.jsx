import React, {useRef, useState, useEffect} from 'react'
import Cleave from 'cleave.js/react';

import List from './List'

const Title = () => {

    const span = useRef(null)

    console.log(span.current)

    const lengthListener = (e) => {
        console.log(e.target.value.length)
        if(window.innerWidth > 640) {
            span.current.style.width = `${e.target.value.length * 15}px`
        }   
    }

    /* useEffect(() => {
        
    },[]) */

    return (
        <div className='flex flex-col sm:flex-row items-center justify-center w-screen sm:items-start sm:justify-start sm:w-auto'>
            <div className='font-inter text-gray-100 text-center flex items-center justify-center pb-2 sm:pb-7 lg:text-xl'>
                What if you bought
            </div>
            <div ref={span} className='mb-2 sm:mb-0 flex items-center justify-center pb-7 relative mx-4 w-90% sm:w-24 lg:w-28 min-w-3rem max-w-none sm:max-w-11rem lg:max-w-56'>
                <Cleave 
                    className='text-2xl sm:text-base lg:text-xl w-full px-2 bg-transparent rounded-md font-inter text-white text-center font-bold focus:text-black focus:bg-white focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder="Enter a number" 
                    options={{numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: '$'}}
                    value="10000"
                    onChange={(e) => lengthListener(e)}
                    maxLength='16'
                />
                <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>
            </div>
            <div className='flex mb-2 sm:mb-0'>
                <div className='lg:text-xl font-inter text-gray-100 text-center flex items-center justify-center pb-7'>
                    of
                </div>
                <div className='ml-4 flex items-center justify-center pb-7 relative'>
                    <button className="text-2xl sm:text-base lg:text-xl truncate max-w-56 px-4 bg-transparent rounded-md font-inter text-white text-center font-bold focus:text-black focus:bg-white focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Bitcoin</button>
                    <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>            
                </div>
            </div>
            <div className='flex'>
                <div className='flex items-center justify-center pb-7 relative'>
                    <List/>
                    <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>   
                </div>    
                <div className='lg:text-xl ml-4 font-inter text-gray-100 text-center flex items-center justify-center pb-7'>
                    ?
                </div>
            </div>
        </div>
    )
}

export default Title