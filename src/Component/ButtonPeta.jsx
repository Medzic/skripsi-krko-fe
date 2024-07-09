import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ButtonPeta = () => {
    const navigate = useNavigate()
  return (
    <Button onClick={()=> navigate('/halaman-peta')}>Tambah Peta</Button>
  )
}

export default ButtonPeta