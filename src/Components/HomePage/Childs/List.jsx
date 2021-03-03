import React, {useEffect, useRef, useState} from 'react'
import ListItem from './Grandchilds/ListItem'
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

// Notas: Creo que ref=wrapper no se usa para nada. Y ref=listItems creo que tampoco. 

const List = ({dateSelectedInGlobalState}) => {

    const results = useRef(null)
    const wrapper = useRef(null)
    const button = useRef(null)
    const listItems = useRef(null)

    const [openResults, setOpenResults] = useState(false)

    const handleClickOutside = (event) => {
        if (button.current !== null && !button.current.contains(event.target)) {
            setOpenResults(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleClickOutside(e));
    },[])

    useEffect(() => {
        if(openResults === true) {
            results.current.classList.remove('hidden')
        } else {
            results.current.classList.add('hidden')
        }
    },[openResults])

    return (
        <div ref={wrapper} className='cursor-pointer'>
                <div className="relative">
                    <button ref={button} onClick={() => setOpenResults(true)} type="button" className="text-2xl sm:text-base lg:text-xl font-bold px-4 relative flex items-center justify-center font-inter text-white focus:text-black bg-transparent focus:bg-white rounded-md focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        {dateSelectedInGlobalState}
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
                        </StyledScrollbarUl>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => (
    {
        dateSelectedInGlobalState: state.dateHome
    }
)

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(List)