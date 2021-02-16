import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
            <div className="flex h-20 w-full items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
                <Link to={'/'}>
                    <div className="font-bebas mx-8 text-gray-300 cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                        Simple
                    </div>
                </Link>
                <Link to={'/advanced'}>
                    <div className="font-bebas mx-8 text-white cursor-pointer text-3xl transition ease-in-out duration-500 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
                        Advanced
                    </div>
                </Link>
            </div>
    )
}

export default Header
