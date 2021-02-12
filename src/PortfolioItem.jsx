import React from 'react'

import { SiApple } from "react-icons/si";
import { HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";

const PortfolioItem = ({inSimple}) => {
    return (
                      <div className='w-full h-14 flex items-center justify-center mb-2'>
                        <div className='w-4/5 h-full rounded-lg bg-gray-200 hover:bg-white mr-2 flex items-center px-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-500'>
                          <SiApple className='mr-3 text-lg' />
                          <div className='flex flex-col'>
                            <span className='font-inter'>Apple (AAPL)</span>
                            <span className='font-inter text-gray-500 text-xs'>Stock</span>
                          </div>
                          <HiFlag className='ml-auto text-lg' />
                        </div>
                        {inSimple === true
                            ?
                                ''
                            : 
                                <div className='font-inter w-1/5 h-full bg-gray-200 hover:bg-white rounded-lg cursor-pointer flex items-center justify-center hover:shadow-lg transition ease-in-out duration-500'>
                                    85%
                                </div>
                        }
                      </div>
    )
}

export default PortfolioItem
