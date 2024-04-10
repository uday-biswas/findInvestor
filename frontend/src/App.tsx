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
import Lists from './components/pages/Lists'
import List from './components/pages/List'
import Pitchdecks from './components/pages/Pitchdecks'
import HomePage from './components/pages/HomePage'
import PrivateRoute from './components/common/PrivateRoute'
import Dashboard from './components/pages/Dashboard'
import Success from './components/pages/Success'
import Cancel from './components/pages/Cancel'
import Upgrade from './components/pages/Upgrade'

function App(): React.ReactElement {

  return (
    <div
      className="w-full flex flex-col font-inter  "
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/investors" element={<Investor />} />
          <Route path="/dashboard/lists" element={<Lists />} />
          <Route path="/dashboard/lists/:id" element={<List />} />
          <Route path="/dashboard/pitchdecks" element={<Pitchdecks />} />
          <Route path="/dashboard/success" element={<Success />} />
          <Route path="/dashboard/cancel" element={<Cancel />} />
          <Route path="/dashboard/upgrade" element={<Upgrade />} />
          {/* <Route path="/dashboard/billing" element={<Billing />} /> */}
        </Route>

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
