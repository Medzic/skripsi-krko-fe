import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import './DashboardAdmin.css'
import CardAdminP from '../Component/CardAdminP'
import CardAdminA from '../Component/CardAdminA'
import ChartPengajuan from '../Component/ChartPengajuan'
import MyCalendar from '../Component/MyCalendar'
import CardAdminAmbil from '../Component/CardAdminAmbil'

const DashboardAdmin = () => {
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="dash-container">
                <chart>
                    <ChartPengajuan />
                </chart>
                <aside >
                    <CardAdminP />
                    <CardAdminAmbil/>
                    <CardAdminA />
                </aside>
                <calendar>
                    <MyCalendar/>
                </calendar>
            </div>
        </>
    )
}

export default DashboardAdmin