import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Navbar } from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RechargePlans from './pages/RechargePlans.jsx'
import SignupPage from './pages/SignupPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import InvoicePage from './pages/InvoicePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/plans" element={<RechargePlans />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

