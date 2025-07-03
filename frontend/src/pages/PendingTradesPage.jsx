import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PendingTradesPage.css';

const PendingTradesPage = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/v1/shift_trades', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrades(res.data.filter(t => t.status === 'pending'));
      } catch (err) {
        console.error('Failed to fetch trades', err.response?.data || err);
        alert(err.response?.data?.error || 'Failed to load trades');
      }
    };
    fetchTrades();
  }, []);

  const respond = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `/api/v1/shift_trades/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert(res.data.message || `Trade ${status}`);
      setTrades(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to update trade', err.response?.data || err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="pending-trades-container">
      <h2>Pending Trade Requests</h2>
      {trades.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        trades.map(trade => (
          <div key={trade.id} className="trade-box">
            <p>
              <strong>{trade.from_user?.email || "Unknown user"}</strong> wants to trade shift{' '}
              <strong>"{trade.shift_from?.title || "Untitled"}"</strong><br />
              🕓 <strong>From:</strong> {new Date(trade.shift_from?.start_time).toLocaleString()}<br />
              🕓 <strong>To:</strong> {new Date(trade.shift_from?.end_time).toLocaleString()}
            </p>
            <div className="trade-buttons">
              <button onClick={() => respond(trade.id, 'accepted')}>✅ Accept</button>
              <button onClick={() => respond(trade.id, 'rejected')}>❌ Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingTradesPage;
