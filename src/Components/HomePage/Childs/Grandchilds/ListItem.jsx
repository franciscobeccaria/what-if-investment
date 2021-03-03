import React from 'react'
import { changeDateHome } from '../../../../redux/actionCreators';
import {connect} from 'react-redux'

const ListItem = ({text, changeDateHomeFunction, dateSelectedInGlobalState}) => {

    return (
            <li onMouseDown={() => changeDateHomeFunction(text)} id="listbox-item-1" className="text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white relative py-2 pl-3 pr-6">
                <div className="flex items-center">
                    <span className="block font-normal truncate">
                        {text}
                    </span>
                </div>
                {dateSelectedInGlobalState === text
                    ? 
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                </path>
                            </svg>
                        </span>
                    : ''
                }
            </li>
    )
}

const mapStateToProps = state => (
    {
        dateSelectedInGlobalState: state.dateHome
    }
)

const mapDispatchToProps = dispatch => ({
    changeDateHomeFunction(id) {
        dispatch(changeDateHome(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)