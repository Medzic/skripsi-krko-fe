import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import './DashboardAdmin.css'
import CardAdminP from '../Component/CardAdminP'
import CardAdminA from '../Component/CardAdminA'
import ChartPengajuan from '../Component/ChartPengajuan'
import MyCalendar from '../Component/MyCalendar'

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