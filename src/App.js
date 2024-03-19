import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AuthPage from './Pages/AuthPage';
import NotFound from './Pages/NotFound';
import Footer from './Component/Footer';
import PengajuanPage from './Pages/PengajuanPage';
import Lokasi from './Pages/Lokasi';
import Berkas from './Pages/Berkas';
import './App.css';

function App() {

  return (
    <> 
      <div className='PageWrapper'>
        <Router>
          <Routes>
            <Route path='/Auth' element={<AuthPage />} />             
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/Pengajuan' element={<PengajuanPage />} />
            <Route path='/Lokasi' element={<Lokasi />} />
            <Route path='/Berkas' element={<Berkas />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
