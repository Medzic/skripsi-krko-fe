import React from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
};

const ButtonExport = ({ onSuccess }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const fetchPengajuan = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${backendUrl}/pengajuan/${onSuccess}`, config)
            const responseData = response.data;
            const dataArray = Array.isArray(responseData) ? responseData : [responseData];
            const flattenedData = dataArray.map(item => flattenObject(item));

            exportToExcel(flattenedData);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Data Pengajuan',
                html: error,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    const exportToExcel = (data) => {
        try {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(dataBlob, `data-${onSuccess}.xlsx`);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            Swal.fire({
                title: 'Export Error',
                text: 'An error occurred while exporting the data.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div>
            <Button variant='success' onClick={fetchPengajuan}>Export data</Button>
        </div>
    );
}

export default ButtonExport