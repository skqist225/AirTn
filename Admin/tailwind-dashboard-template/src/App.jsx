import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import RoomDetailsPage from './pages/RoomDetailsPage';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<Dashboard />} />
        <Route path="/room/:roomid" element={<RoomDetailsPage />} />
        <Route path="/bookings" element={<Dashboard />} />
        <Route path="/users" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
