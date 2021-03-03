import React, {useState} from 'react'
import {changeDatePortfolio} from '../../../redux/actionCreators'
import {connect} from 'react-redux'

const Dates = ({changeDatePortfolioFunction}) => {

    const [initialDate, setInitialDate] = useState(undefined)
    const [endDate, setEndDate] = useState(undefined)

    const handleOnClick = () => {
        if(initialDate === undefined || endDate === undefined) alert('Select the dates first')
        else changeDatePortfolioFunction({initial: initialDate, end: endDate})
    }

    return (
        <>
            <div className='flex flex-col my-2 w-full'>
                <label className='font-inter text-white mb-1' htmlFor="">Initial date</label>
                <input onChange={(e) => setInitialDate(e.target.value)} className='rounded-lg p-3 w-full' type="date"/>
            </div>
            <div className='flex flex-col my-2 w-full'>
                <label className='font-inter text-white mb-1' htmlFor="">End date</label>
                <input onChange={(e) => setEndDate(e.target.value)} className='rounded-lg p-3 w-full' type="date"/>
            </div>
            <div>
                <button onClick={() => handleOnClick()} className='bg-blue-500 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-102 cursor-pointer'>
                    Update dates
                </button>
            </div>  
        </>
    )
}

const mapStateToProps = state => (
    {
        
    }
)

const mapDispatchToProps = dispatch => ({
    changeDatePortfolioFunction(data) {
        dispatch(changeDatePortfolio(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dates)
