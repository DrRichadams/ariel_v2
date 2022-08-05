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

import Verify_1_welcome from './pages/Verify_1_welcome';
import Verify_2_payment from './pages/Verify_2_payment';
import Verify_3_proof from './pages/Verify_3_proof';
import Verify_4_thanks from './pages/Verify_4_thanks';

import { AuthContextProvider } from './contexts/AuthContext';
import Spinner from "./Spinner";

import WithdrawAffiliatesPage from './DashboardUser/pages/WithdrawAffiliatesPage';
import WithdrawTrustCoinsPage from './DashboardUser/pages/WithdrawTrustCoinsPage';

import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import ProtectedAdmin from './protectedRoutes/ProtectedAdmin';
import ProtectedConfig from './protectedRoutes/ProtectedConfig';
import LogoutModal from './modals/LogoutModal';

import Dashboard from "./DashboardAdmin/pages/Dashboard";
import SetRates from "./DashboardAdmin/pages/SetRates";
import Terms_Conditions from "./DashboardAdmin/pages/Terms_Conditions";
import TopupRequests from "./DashboardAdmin/pages/TopupRequests";
import VerifyUsers from "./DashboardAdmin/pages/VerifyUsers";
import WithdrawRequests from "./DashboardAdmin/pages/WithdrawRequests";
import AdminRouter from "./DashboardAdmin/pages/AdminRouter";
import DashboardRerouter from './DashboardAdmin/comps/DashboardRerouter';
import PotentiallyPaidAccounts from './DashboardAdmin/comps/PotentiallyPaidAccounts';
import UnpaidAccounts from './DashboardAdmin/comps/UnpaidAccounts';
import AllAccounts from './DashboardAdmin/comps/AllAccounts';

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
            <Route path='/verify1' element={<Verify_1_welcome />} />
            <Route path='/verify2' element={<Verify_2_payment />} />
            <Route path='/verify3' element={<Verify_3_proof />} />
            <Route path='/verify4' element={<Verify_4_thanks />} />
            {
              userRoutesAllowed ?
              <Route path='/user_dash' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
                <Route path='' element={<InvestmentPlansPage />} />
                <Route path='withdrawAffiliates' element={<WithdrawAffiliatesPage />} />
                <Route path='withdrawCoins' element={<WithdrawTrustCoinsPage />} />
                <Route path='withdrawal_history' element={<WithdrawalHistoryPage />} />
                <Route path='earnings' element={<EarningsPage />}>
                  {/* <Route path='' element={<Dividents />} /> */}
                  <Route path='' element={<Affiliates />} />
                </Route>
                {/* <Route path='affiliates' element={<InvestmentsPage />} /> */}
            </Route>: ""
            }
            {/* <Route path='admin_dash' element={<ProtectedAdmin><AdminDash /></ProtectedAdmin>} /> */}
            <Route path='admin_dash' element={<AdminDash />}>
              <Route path="" element={<AdminRouter />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="verify_users" element={<VerifyUsers />}>
                <Route path="" element={<DashboardRerouter />} />
                <Route path="potentially_paid" element={<PotentiallyPaidAccounts />} />
                <Route path="unpaid_accounts" element={<UnpaidAccounts />} />
                <Route path="all_accounts" element={<AllAccounts />} />
              </Route>
              <Route path="withdraw_requests" element={<WithdrawRequests />} />
              <Route path="set_rates" element={<SetRates />} />
              <Route path="top_up_requests" element={<TopupRequests />} />
              <Route path="terms_conditions" element={<Terms_Conditions />} />
            </Route>
            <Route path='*' element={<ErrorNoROute />} />
        </Routes>
        <LogoutModal />
      </AuthContextProvider>
    </div>
  );
}

export default App;
