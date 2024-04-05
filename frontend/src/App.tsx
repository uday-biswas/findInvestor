import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Investor from './components/pages/Investor'
import UpdatePassword from './components/pages/UpdatePassword'
import VerifyEmail from './components/pages/VerifyEmail'
import ForgotPassword from './components/pages/ForgotPassword'
import Error from './components/pages/Error'

function App(): React.ReactElement {

  return (
    <div
      className="w-full flex flex-col font-inter  "
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Investor />}></Route>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route path="*" element={< Error />} />
      </Routes>
    </div>
  )
}

export default App
