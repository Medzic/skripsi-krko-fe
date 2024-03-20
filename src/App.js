import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AuthPage from './Pages/AuthPage';
import NotFoundPage from './Pages/NotFoundPage';
import Footer from './Component/Footer';
import PengajuanPage from './Pages/PengajuanPage';
import LokasiPage from './Pages/LokasiPage';
import BerkasPage from './Pages/BerkasPage';
import './App.css';
import AboutPage from './Pages/AboutPage';

function App() {

  return (
    <> 
      <div className='PageWrapper'>
        <Router>
          <Routes>
            <Route path='/Auth' element={<AuthPage />} />             
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/Pengajuan' element={<PengajuanPage />} />
            <Route path='/Lokasi' element={<LokasiPage />} />
            <Route path='/Berkas' element={<BerkasPage />} />
            <Route path='/About' element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
