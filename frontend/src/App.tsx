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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/index'
import { useEffect } from 'react'
import { getListDetails } from './services/operation/listAPI'

function App(): React.ReactElement {

  const email = useSelector((state: RootState) => state.profile.user ? state.profile.user.email : null);
  const dispatch = useDispatch();

  useEffect(() => {
    getListDetails(email, dispatch);
  }, []);

  return (
    <div
      className="w-full flex flex-col font-inter  "
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Investor />}></Route>

        <Route path="/lists" element={<Lists />}></Route>

        <Route path="/lists/:id" element={<List />}></Route>

        <Route path="/pitchdecks" element={<Pitchdecks />}></Route>

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
