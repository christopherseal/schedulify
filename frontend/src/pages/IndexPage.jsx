import React from 'react';
import { jwtDecode } from 'jwt-decode';
import ScheduleCalendar from '../components/ScheduleCalendar';

const IndexPage = () => {
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.user_id;

  return (
    <div>
      <h1>🗓️ Your Schedule</h1>
      {userId ? <ScheduleCalendar userId={userId} /> : <p>Loading user data...</p>}
    </div>
  );
};

export default IndexPage;
