import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradeModal = ({ shift, onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.filter(u => u.id !== shift.extendedProps.user_id));
    };
    fetchUsers();
  }, [shift]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/v1/shift_trades', {
        shift_from_id: shift.id,
        to_user_id: selectedUser
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("Trade proposed!");
      setTimeout(onClose, 1500);
    } catch (err) {
      setMessage("Failed to propose trade.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Propose Trade for: {shift.title}</h3>
        <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser || ''}>
          <option value="" disabled>Select a user</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>
        <button onClick={handleSubmit} disabled={!selectedUser}>Send Trade Request</button>
        <button onClick={onClose}>Cancel</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TradeModal;
