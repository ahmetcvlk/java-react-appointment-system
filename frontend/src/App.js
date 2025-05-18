import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AppointmentPage from './pages/AppointmentPage';

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
      </Switch>
    </Router>
  );
}

export default App;
