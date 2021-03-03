import React, {useState, useEffect, useRef} from 'react'
import ListItem from './ListItem'
import styled from 'styled-components'
import {connect} from 'react-redux'

const StyledScrollbarUl = styled.ul`
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

const List = ({receivedState}) => {

    const results = useRef(null)
    const wrapper = useRef(null)
    const button = useRef(null)
    const listItems = useRef(null)

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
        if (button.current !== null && !button.current.contains(event.target)) {
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
                        {receivedState.dateSimple}
                    </button>
                    <div ref={results} className="w-full hidden absolute mt-1 z-10 rounded-md bg-white shadow-lg">
                        <StyledScrollbarUl ref={listItems} tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            <ListItem text='30 years ago'/>
                            <ListItem text='25 years ago'/>
                            <ListItem text='20 years ago'/>
                            <ListItem text='15 years ago'/>
                            <ListItem text='10 years ago'/>
                            <ListItem text='8 years ago'/>
                            <ListItem text='7 years ago'/>
                            <ListItem text='5 years ago'/>
                            <ListItem text='3 years ago'/>
                            <ListItem text='2 years ago'/>
                            <ListItem text='1 year ago'/>
                            <ListItem text='9 months ago'/>
                            <ListItem text='6 months ago'/>
                            <ListItem text='3 months ago'/>
                            <ListItem text='2 months ago'/>
                            <ListItem text='1 month ago'/>
                            <ListItem text='20 days ago'/>
                            <ListItem text='15 days ago'/>
                            <ListItem text='10 days ago'/>
                            <ListItem text='7 days ago'/>
                            <ListItem text='5 days ago'/>
                            {/* Tradier API no entrega datos por hora */}
                            {/* <ListItem text='4 days ago'/>
                            <ListItem text='3 days ago'/>
                            <ListItem text='2 days ago'/>
                            <ListItem text='1 day ago'/>
                            <ListItem text='12 hours ago'/>
                            <ListItem text='6 hours ago'/>
                            <ListItem text='3 hours ago'/>
                            <ListItem text='2 hours ago'/>
                            <ListItem text='1 hour ago'/>
                            <ListItem text='45 minutes ago'/>
                            <ListItem text='30 minutes ago'/>
                            <ListItem text='15 minutes ago'/>
                            <ListItem text='10 minutes ago'/> */}
                        </StyledScrollbarUl>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => (
    {
        receivedState: state
    }
)

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(List)
