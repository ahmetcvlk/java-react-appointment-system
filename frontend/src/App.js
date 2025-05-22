import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AppointmentPage from './pages/AppointmentPage';
import StudentAppointments from './pages/StudentAppointments'; // 
import OfficerAppointments from './pages/OfficerAppointments'; 
import UserList from './pages/UserList'; 
import AppointmentSummary from './pages/AppointmentSummary';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/student" component={StudentDashboard} />
        <Route path="/officer" component={OfficerDashboard} />
        <Route path="/appointment" component={AppointmentPage} />
        <Route path="/student-appointments" component={StudentAppointments} />
        <Route path="/officer-appointments" component={OfficerAppointments} />
        <Route path="/user-list" component={UserList} />
        <Route path="/appointment-summary" component={AppointmentSummary} />

      </Switch>
    </Router>
  );
}

export default App;
