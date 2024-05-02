import React from 'react'
import Printed from '../Component/Printed'
import { useParams } from 'react-router-dom'
import { TokenFalseRedirect } from './TokenRedirect';
import ConditionBar from './ConditionBar';
import './PengajuanPage.css'

const PrintedPage = () => {
    const { id } = useParams();
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="print-css">
                <Printed onSuccess={id} />
            </div>
        </>
    )
}

export default PrintedPage