import React, {useState, useEffect, useRef} from 'react'

const List = () => {

    const results = useRef(null)
    const wrapper = useRef(null)
    const button = useRef(null)

    const [state, setState] = useState({
        openResults: false,
    })

    const open = () => {
        setState({
            ...state,
            openResults: true,
        })
    }

    const close = () => {
        setState({
            ...state,
            openResults: false,
        })
    }

    const handleClickOutside = (event) => {
        if (button && !button.current.contains(event.target)) {
            close()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleClickOutside(e));
    },[])

    useEffect(() => {
        if(state.openResults === true) {
            results.current.classList.remove('hidden')
        } else {
            results.current.classList.add('hidden')
        }
    },[state.openResults])

    return (
            <div ref={wrapper} className='cursor-pointer'>
                <div className="relative">
                    <button ref={button} onClick={() => open()} type="button" className="text-2xl sm:text-base lg:text-xl font-bold px-4 relative flex items-center justify-center font-inter text-white focus:text-black bg-transparent focus:bg-white rounded-md focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        10 years ago
                    </button>
                    <div ref={results} className="w-full hidden absolute mt-1 z-10 rounded-md bg-white shadow-lg">
                        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            <li id="listbox-item-0" role="option" className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9">
                                <div className="flex items-center">
                                    <span className="block font-normal truncate">
                                        10 years ago
                                    </span>
                                </div>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </span>
                            </li>
                            <li id="listbox-item-1" role="option" className="text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white relative py-2 pl-3 pr-9">
                                <div className="flex items-center">
                                    <span className="block font-normal truncate">
                                        5 years ago
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default List
