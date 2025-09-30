// client/src/pages/ApplySeller.jsx
import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function ApplySeller() {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!businessName.trim()) return setError('Business name is required');
    setLoading(true);
    try {
      const res = await API.post('/api/sellers/request', {
        businessName,
        description,
        phone
      });
      alert(res.data.message || 'Application submitted');
      navigate('/profile'); // adjust to your routes
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Apply to become a Seller</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Business name *</label>
          <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                 className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
                    className="w-full border p-2 rounded" rows={4} />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)}
                 className="w-full border p-2 rounded" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button type="submit" disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Submitting…' : 'Apply as Seller'}
          </button>
        </div>
      </form>
    </div>
  );
}
