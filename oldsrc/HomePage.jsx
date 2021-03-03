import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';

import Title from './Title';
import Info from './Info';
import Growth from './Growth';
import ChartWrapper from './ChartWrapper';
import ModalStock from './ModalStock'
import {connect} from 'react-redux'
import {changeGrowthSimple} from './redux/actionCreators'

const HomePage = ({receivedState, changeGrowthSimpleFunction}) => {

  const [state, setState] = useState({
    growth: undefined,
    endAmount: undefined,
    earned: undefined,
  })

  useEffect(() => {
    if(receivedState.amountSimple !== undefined && receivedState.pricesSimple.initial !== undefined) {
      let growth = receivedState.pricesSimple.end / receivedState.pricesSimple.initial // Example: 50 / 25 = 2 (x2)
      let growthInPercentage = (growth - 1) * 100 // Example x2 ... = 100% - Example x1.6 ... = 60%
      changeGrowthSimpleFunction(growthInPercentage)
      let initialAmount = receivedState.amountSimple
      let endAmount = initialAmount * growth
      let earned = endAmount - initialAmount
      setState({
        ...state,
        growth: growth,
        endAmount: endAmount,
        earned: earned,
      })
    }
  }, [receivedState.pricesSimple, receivedState.amountSimple])

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
            <Info propsClassList="mb-0" text="Now you would have" number={state.endAmount === undefined ? '-' : state.endAmount} />
            <Info text="You would have earned" number={state.earned === undefined ? '-' : state.earned} showGrowth />
            <Growth />
            <ChartWrapper inSimple />
          </div>
          <ModalStock where={'inSimple'}/>
        </>
    )
}

const mapStateToProps = state => (
  {
      receivedState: state
  }
)

const mapDispatchToProps = dispatch => ({
  changeGrowthSimpleFunction(data) {
      dispatch(changeGrowthSimple(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
