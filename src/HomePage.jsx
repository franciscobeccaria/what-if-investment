import React from 'react'
import {Link} from 'react-router-dom';

import Title from './Title';
import Info from './Info';
import Growth from './Growth';
import ChartWrapper from './ChartWrapper';
import ModalStock from './ModalStock'

import { SiApple } from "react-icons/si";
import { HiFlag, HiBriefcase, HiPlus } from "react-icons/hi";

const HomePage = () => {
    return (
        <>
          <div className="flex h-20 w-full items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <Link to={'/'}>
              <div className="font-bebas mx-8 text-white cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                Simple
              </div>
            </Link>
            <Link to={'/advanced'}>
              <div className="font-bebas mx-8 text-gray-300 cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                Advanced
              </div>
            </Link>
          </div>
          <div className="min-h-screen bg-main flex items-center justify-center flex-col pt-8 pb-12">
            <Title />
            <Info propsClassList="mb-0" text="Now you would have" number="220000" />
            <Info text="You would have earned" number="120000" showGrowth />
            <Growth />
            <ChartWrapper inSimple />
          </div>
          <ModalStock/>
        </>
    )
}

export default HomePage
