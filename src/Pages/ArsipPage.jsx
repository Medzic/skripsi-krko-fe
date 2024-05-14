import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelArsip from '../Component/TabelArsip'

const ArsipPage = () => {
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className='tabel-css'>
                <TabelArsip />
            </div>
        </>

    )
}

export default ArsipPage