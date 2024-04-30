import React from 'react'
import { Placeholder } from 'react-bootstrap'
import './Skeleton.css'

const TabelPengajuanProsesSkeleton = () => {
    return (
        <div className='skeleton'>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" bg='dark' />
            </Placeholder>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" bg='dark' />
            </Placeholder>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" bg='dark' />
            </Placeholder>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" bg='dark' />
            </Placeholder>
            <div className='button'>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} size="lg" bg='dark' />
                </Placeholder>
            </div>
        </div>
    )
}

export default TabelPengajuanProsesSkeleton