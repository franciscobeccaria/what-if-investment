import React from 'react'

const ModalPortfolioItem = ({symbol, percentage}) => {
    return (
        <div className='flex w-full items-center justify-center gap-4'>
            <span>{`${symbol} ${percentage}`}</span>
        </div>
    )
}

export default ModalPortfolioItem
