import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import ProfilEdit from '../Component/ProfilEdit'
import ProfilPasswordEdit from '../Component/ProfilPasswordEdit'
import ProfilTambahAdmin from '../Component/ProfilTambahAdmin'

const AdminProfilPage = () => {
    return (
        <>
            <IsAdminToken />
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
               <ProfilEdit/>
            </div>
            <div className="tabel-css">
               <ProfilPasswordEdit/>
            </div>
            <div className="tabel-css">
               <ProfilTambahAdmin/>
            </div>
        </>
    )
}

export default AdminProfilPage