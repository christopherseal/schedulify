import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const ScheduleCalendar = ({ userId }) => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  const fetchShifts = async (startStr, endStr) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/v1/users/${userId}/shifts`, {
        params: { start: startStr, end: endStr },
        headers: {
        Authorization: `Bearer ${token}`,  // send token in Authorization header
      },
      });
      // Map backend shifts to FullCalendar event format
      const events = res.data.map(shift => ({
        id: shift.id,
        title: shift.title,
        start: shift.start_time,
        end: shift.end_time,
        extendedProps: {
          details: shift.details,
        },
      }));
      setShifts(events);
    } catch (err) {
      console.error('Failed to fetch shifts', err);
    }
  };

  const handleDatesSet = (dateInfo) => {
    fetchShifts(dateInfo.startStr, dateInfo.endStr);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedShift(clickInfo.event);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={shifts}
        datesSet={handleDatesSet} // fetch shifts when calendar navigates months
        eventClick={handleEventClick}
      />

      {selectedShift && (
        <div className="modal">
          <h3>{selectedShift.title}</h3>
          <p>{selectedShift.extendedProps.details}</p>
          <p>
            From: {new Date(selectedShift.start).toLocaleString()} <br />
            To: {new Date(selectedShift.end).toLocaleString()}
          </p>
          <button onClick={() => setSelectedShift(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
