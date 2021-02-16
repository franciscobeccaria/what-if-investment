import React from 'react'
import styled from 'styled-components'

import Header from '../Organisims/Header'
import Info from '../Organisims/Info'
import Growth from '../Organisims/Growth'

const StyledDiv = styled.div`
& {
  display: grid;
  grid-template-columns: 1fr 0.9fr 1.1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "inputs inputs results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results"
    "graph graph results";
}

& {
  width: 900px;
  height: 95vh;
}

.inputs { grid-area: inputs; }

.graph { grid-area: graph; }

.results { grid-area: results; }

@media (max-width: 1024px) {
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 90vw;
    height: fit-content;
  }
  & .inputs, & .graph, & .results {
    width: 40rem;
    max-width: 90vw;
  }
}
`

const PortfolioPage = () => {
    return (
        <>
            <Header/>
            <div className="min-h-screen bg-main flex items-center justify-center flex-col pt-8 pb-12">
                <h1 className='font-inter font-bold text-white text-center text-2xl mb-12'>What if you invest in...</h1>
                <StyledDiv>
                {/* Controls.jsx */}
                <div className='results h-full p-2 mt-3'>
                  <Info propsStyles={{margin: '0', width: '100%'}} text="Now you would have" number="220000" />
                  <Info propsStyles={{width: '100%', margin: '8px 0'}} text="You would have earned" number="120000" showGrowth />
                  <Growth inAdvanced />
                </div>
                <div className='graph h-full flex items-center justify-center p-2 '>
                  <ChartWrapper inAdvanced
                    propsStyles={{width: '100%', margin: '0'}}
                  />
                </div>
              </StyledDiv>
            </div>
        </>
    )
}

export default PortfolioPage
