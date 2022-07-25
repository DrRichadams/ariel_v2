import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom"

import './index.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './DashboardUser/pages/UserDashboard';
import InvestmentPlansPage from './DashboardUser/pages/InvestmentPlansPage';
import WithdrawalHistoryPage from './DashboardUser/pages/WithdrawalHistoryPage';
import EarningsPage from "./DashboardUser/pages/EarningsPage";
import InvestmentsPage from "./DashboardUser/pages/InvestmentsPage";
import Affiliates from './DashboardUser/pages/Affiliates';
import Dividents from './DashboardUser/pages/Dividents';
import AdminDash from './DashboardAdmin/pages/AdminDash';
import ErrorNoROute from './pages/ErrorNoROute';
import Rerouter from './features/Rerouter';

import { AuthContextProvider } from './contexts/AuthContext';
import Spinner from "./Spinner";

import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import ProtectedAdmin from './protectedRoutes/ProtectedAdmin';
import ProtectedConfig from './protectedRoutes/ProtectedConfig';
import LogoutModal from './modals/LogoutModal';

function App() {
  const [ userRoutesAllowed, setUserRoutesAllowed ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)
  if(isLoading) return <Spinner />
  return (
    <div className="App"> 
      <AuthContextProvider>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup/:uid' element={<Signup />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/rerouter' element={<ProtectedConfig><Rerouter /></ProtectedConfig>} />
            {
              userRoutesAllowed ?
              <Route path='/user_dash' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
                <Route path='' element={<InvestmentPlansPage />} />
                <Route path='withdrawal_history' element={<WithdrawalHistoryPage />} />
                <Route path='earnings' element={<EarningsPage />}>
                  {/* <Route path='' element={<Dividents />} /> */}
                  <Route path='' element={<Affiliates />} />
                </Route>
                {/* <Route path='affiliates' element={<InvestmentsPage />} /> */}
            </Route>: ""
            }
            <Route path='admin_dash' element={<ProtectedAdmin><AdminDash /></ProtectedAdmin>} />
            <Route path='*' element={<ErrorNoROute />} />
        </Routes>
        <LogoutModal />
      </AuthContextProvider>
    </div>
  );
}

export default App;
