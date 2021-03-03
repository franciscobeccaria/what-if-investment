import React, {useRef, useEffect} from 'react'
import Cleave from 'cleave.js/react'
import {changeAmountPortfolio} from '../../../redux/actionCreators'
import {connect} from 'react-redux'

const Amount = ({changeAmountPortfolioFunction}) => {

    const amount = useRef(null)

    useEffect(() => {
        // El componente se renderiza con 10,000 como value y se lo manda al GlobalState mediante este useEffect. 
        // Este useEffect funciona como un componentDidMount
        changeAmountPortfolioFunction(amount.current.getRawValue().slice(1))
    },[])

    return (
        <div className='flex items-center justify-center pb-7 relative w-full my-2'>
            <Cleave 
                className='w-full text-2xl px-2 bg-transparent rounded-md font-inter text-white text-center font-bold focus:text-black focus:bg-white focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                placeholder="Enter a number" 
                options={{numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: '$'}}
                value="10000"
                maxLength='16'
                onChange={(e) => changeAmountPortfolioFunction(e.target.rawValue.slice(1))}
                ref={amount}
            />
            <div className='absolute text-gray-300 bottom-0 left-1/2 transform -translate-x-1/2'>Edit</div>
        </div>
    )
}

const mapStateToProps = state => (
    {
        
    }
)

const mapDispatchToProps = dispatch => ({
    changeAmountPortfolioFunction(data) {
        dispatch(changeAmountPortfolio(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Amount)
