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
import PengajuanProsesPage from './Pages/PengajuanProsesPage';
import PengajuanAccPage from './Pages/PengajuanAccPage';
import ArsipAdminPage from './Pages/ArsipAdminPage';
import PengajuanRejectPage from './Pages/PengajuanRejectPage'
import NotFoundPage from './Pages/NotFoundPage';
import PengajuanTerimaPage from './Pages/PengajuanTerimaPage';
import PrintedPage from './Pages/PrintedPage';

function App() {

  return (
    <>
      <div className='PageWrapper'>
        <Router>
          <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='/Dashboard/' element={<Dashboard />} />
            <Route path='/Pengajuan-Ditolak' element={<PengajuanRejectPage />} />
            <Route path='/Pengajuan-Diterima' element={<PengajuanTerimaPage />} />

            <Route path='/Dashboard-Admin' element={<DashboardAdmin />} />
            <Route path='/Pengajuan' element={<PengajuanPage />} />
            <Route path='/Pengajuan-Proses' element={<PengajuanProsesPage />} />
            <Route path='/Pengajuan-Acc' element={<PengajuanAccPage />} />

            <Route path='/Lokasi' element={<LokasiPage />} />
            <Route path='/Berkas' element={<BerkasPage />} />
            <Route path='/About' element={<AboutPage />} />
            <Route path='/Administrator' element={<AuthAdminPage />} />
            <Route path='/Arsip-Administrator' element={<ArsipAdminPage />} />
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