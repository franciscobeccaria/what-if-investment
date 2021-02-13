import React from 'react'
import styled from 'styled-components'

import { FiDelete, FiEdit } from "react-icons/fi";
import { SiApple } from "react-icons/si";
import { HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";

const StyledHover = styled.div`
 & .styled-son {
   opacity: 0;
 }
  &:hover .styled-son {
    opacity: 1;
  }

  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

& .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

& input:checked + .slider {
  background-color: #2196F3;
}

& input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

& input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
& .slider.round {
  border-radius: 34px;
}

& .slider.round:before {
  border-radius: 50%;
}
`

const StyledOptions = styled.div`
 & .styled-son {
   opacity: 0;
   transition: 0.5s all ease-in-out;
 }
  &:hover .styled-son {
    opacity: 1;
    transition: 0.5s all ease-in-out;
  }
  & .styled-original {
   opacity: 1;
   transition: 0.5s all ease-in-out;
 }
  &:hover .styled-original {
    opacity: 0;
    transition: 0.5s all ease-in-out;
  }
`

const PortfolioItem = ({inSimple}) => {
    return (
                      <div className='w-full h-14 flex items-center justify-center mb-2'>
                        <StyledHover className='relative w-4/5 h-full rounded-lg bg-gray-200 hover:bg-white mr-2 flex items-center px-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-500'>
                          <SiApple className='mr-3 text-lg' />
                          <div className='flex flex-col'>
                            <span className='font-inter'>Apple (AAPL)</span>
                            <span className='font-inter text-gray-500 text-xs'>Stock</span>
                          </div>
                          <HiFlag className='ml-auto text-lg' />
                          {inSimple === true
                            ? ''
                            : 
                              <div className='absolute top-2 right-2 flex items-center justify-center'>
                                <span className='styled-son mr-1 bg-gray-500 hover:bg-gray-900 w-20 h-11 flex items-center justify-center rounded-lg transition ease-in-out duration-500'>
                                  <label class="switch">
                                    <input type="checkbox" defaultChecked={true}/>
                                    <span class="slider round"></span>
                                  </label>
                                </span>
                                <span className='styled-son bg-gray-500 hover:bg-gray-900 w-11 h-11 flex items-center justify-center rounded-lg transition ease-in-out duration-500'>
                                  <FiDelete className='text-white text-2xl cursor-pointer'/>
                                </span>
                              </div>
                          }
                        </StyledHover>
                        {inSimple === true
                            ?
                                ''
                            : 
                                <StyledOptions className='relative font-inter w-1/5 h-full bg-gray-200 hover:bg-white rounded-lg cursor-pointer flex items-center justify-center hover:shadow-lg transition ease-in-out duration-500'>
                                    <span className='styled-original'>85%</span>
                                    <FiEdit className='styled-son absolute top-50% left-50% text-2xl'/>
                                </StyledOptions>
                        }
                      </div>
    )
}

export default PortfolioItem
