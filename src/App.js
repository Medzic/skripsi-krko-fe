import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AuthPage from './Pages/AuthPage';
import Footer from './Component/Footer';
import PengajuanPage from './Pages/PengajuanPage';
import LokasiPage from './Pages/LokasiPage';
import BerkasPage from './Pages/BerkasPage';
import './App.css';
import AboutPage from './Pages/AboutPage';
import AuthAdminPage from './Pages/AuthAdminPage';
import DashboardAdmin from './Pages/DashboardAdmin';
import PengajuanRejectPage from './Pages/PengajuanRejectPage'
import NotFoundPage from './Pages/NotFoundPage';
import PengajuanTerimaPage from './Pages/PengajuanTerimaPage';
import PrintedPage from './Pages/PrintedPage';
import PengajuanAccAdminPage from './Pages/PengajuanAccAdminPage';
import PengajuanProsesAdminPage from './Pages/PengajuanProsesAdminPage';
import PengajuanProsesPage from './Pages/PengajuanProsesPage';
import ArsipPage from './Pages/ArsipPage';
import AdminProfilPage from './Pages/AdminProfilPage';
import ProfilPage from './Pages/ProfilPage';
import PengajuanAmbilAdminPage from './Pages/PengajuanAmbilAdminPage';

function App() {

  return (
    <>
      <div className='PageWrapper'>
        <Router>
          <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='/Administrator' element={<AuthAdminPage />} />
            <Route path='/Admin-Profil' element={<AdminProfilPage />} />
            <Route path='/User-Profil' element={<ProfilPage />} />

            <Route path='/Dashboard/' element={<Dashboard />} />
            <Route path='/Pengajuan-Ditolak' element={<PengajuanRejectPage />} />
            <Route path='/Pengajuan-Diterima' element={<PengajuanTerimaPage />} />
            <Route path='/Pengajuan-Diproses' element={<PengajuanProsesPage />} />

            <Route path='/Dashboard-Admin' element={<DashboardAdmin />} />
            <Route path='/Pengajuan-Proses' element={<PengajuanProsesAdminPage />} />
            <Route path='/Pengajuan-Acc' element={<PengajuanAccAdminPage />} />
            <Route path='/Pengajuan-ambil' element={<PengajuanAmbilAdminPage />} />

            <Route path='/Pengajuan' element={<PengajuanPage />} />
            <Route path='/Lokasi' element={<LokasiPage />} />
            <Route path='/Berkas' element={<BerkasPage />} />
            
            <Route path='/Arsip' element={<ArsipPage />} />
            <Route path='/About' element={<AboutPage />} />
            <Route path='/Print/:id' element={<PrintedPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;