import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import ProfilEdit from '../Component/ProfilEdit'
import ProfilPasswordEdit from '../Component/ProfilPasswordEdit'

const ProfilPage = () => {
  return (
    <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
               <ProfilEdit/>
            </div>
            <div className="tabel-css">
               <ProfilPasswordEdit/>
            </div>
        </>
  )
}

export default ProfilPage