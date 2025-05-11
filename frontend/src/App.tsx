import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AppPage from '@/pages/AppPage';
import { WalletProvider } from '@/context/WalletContext';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <WalletProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </AnimatePresence>
    </WalletProvider>
  );
}

export default App;