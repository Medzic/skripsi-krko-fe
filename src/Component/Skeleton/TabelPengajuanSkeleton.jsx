import React from 'react'
import Table from 'react-bootstrap/Table'
import Placeholder from 'react-bootstrap/Placeholder';

const TabelPengajuanSkeleton = () => {
    return (
        <Table className='position-relative' striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Pemohon</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} size="lg" />
                        </Placeholder>
                    </td>
                    <td>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} size="lg" />
                        </Placeholder>
                    </td>
                    <td>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} size="lg" />
                        </Placeholder>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TabelPengajuanSkeleton