import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import Peta from '../Component/Peta'

const MapPage = () => {
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <Peta/>
            </div>
        </>
    )
}

export default MapPage