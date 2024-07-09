import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './TabelPengajuan.css'
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Printed = ({ onSuccess }) => {
    const [item, setItem] = useState('');
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const responseItem = await axios.get(`${backendUrl}/pengajuan/${onSuccess}`, config);
                setItem(responseItem.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [backendUrl, onSuccess]);

    const handlePrint = () => {
        const doc = new jsPDF();

        const title = "Surat Pengatar"
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const xCoordinate = (pageWidth - textWidth) / 2;
        const labelWidth = 50;

        const leftX = 10;
        const leftX2 = 20;

        const padLabel = (label, width) => {
            while (doc.getTextWidth(label) < width) {
                label += " ";
            }
            return label;
        };

        //tambah konten disini
        doc.text(title, xCoordinate, 20);

        doc.text("Dengan Hormat,", leftX, 70);
        doc.text("Memohon untuk dibuatkan Surat Keterangan Rencana Kota,", leftX + 10, 80);
        doc.text("berdasarkan data dibawah ini:", leftX, 88);
    
        doc.text(padLabel("No. Registrasi", labelWidth) + `: ${item.noreg}`, leftX2, 98);
        doc.text(padLabel("Nama Pemohon 1", labelWidth) + `: ${item.namep1}`, leftX2, 106);
        doc.text(padLabel("Nama Pemohon 2", labelWidth) + `: ${item.namep2 ?? ""}`, leftX2, 114);
        doc.text(padLabel("NIK Pemohon 1", labelWidth) + `: ${item.nikp1}`, leftX2, 122);
        doc.text(padLabel("NIK Pemohon 2", labelWidth) + `: ${item.nikp2 ?? ""}`, leftX2, 130);
        doc.text(padLabel("Alamat", labelWidth) + `: ${item.alamat}`, leftX2, 138);
        doc.text(padLabel("RT/RW", labelWidth) + `: ${item.rt}/${item.rw}`, leftX2, 146);
        doc.text(padLabel("Kelurahan", labelWidth) + `: ${item.kelurahan}`, leftX2, 154);
        doc.text(padLabel("Kecamatan", labelWidth) + `: ${item.kecamatan}`, leftX2, 162);
        doc.text(padLabel("Kota", labelWidth) + `: ${item.kota}`, leftX2, 170);
    
        doc.text("Dengan tanah yang berlokasi di:", leftX, 180);
    
        doc.text(padLabel("Lokasi Tanah", labelWidth) + `: ${item.Lokasi.loktanah}`, leftX2, 188);
        doc.text(padLabel("RT/RW", labelWidth) + `: ${item.Lokasi.rt}/${item.Lokasi.rw}`, leftX2, 196);
        doc.text(padLabel("Kelurahan", labelWidth) + `: ${item.Lokasi.kelurahan}`, leftX2, 204);
        doc.text(padLabel("Kecamatan", labelWidth) + `: ${item.Lokasi.kecamatan}`, leftX2, 212);
        doc.text(padLabel("Keperluan", labelWidth) + `: ${item.Lokasi.keperluan}`, leftX2, 220);
        doc.text(padLabel("Jenis Sertifikat", labelWidth) + `: ${item.Lokasi.stanah}`, leftX2, 228);
        doc.text(padLabel("No. Sertifikat", labelWidth) + `: ${item.Lokasi.nocert}`, leftX2, 236);
        doc.text(padLabel("Luas", labelWidth) + `: ${item.Lokasi.luas}`, leftX2, 244);
        doc.text(padLabel("Atas Nama", labelWidth) + `: ${item.Lokasi.atasnama}`, leftX2, 252);
    
        doc.text("Catatan:", leftX, 262);
        doc.text("Silahkan Transfer biaya registrasi sejumlah Rp. xxx ke nomor rekening", leftX, 270);
        doc.text("berikut 0235xxxx atas nama xxxx. Cetak bukti berikut serta menunjukkan", leftX, 278);
        doc.text("bukti Transfer ke kantor Dinas PUPR Kota Tegal untuk mendapatkan surat fisik.", leftX, 286);
    
        doc.save("document.pdf");
    };

    return (

        <Button onClick={handlePrint}>Cetak</Button>

    );
};

export default Printed;
