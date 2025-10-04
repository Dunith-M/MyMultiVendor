// client/src/pages/AdminManageSellers.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function AdminManageSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({}); // id -> boolean
  const [error, setError] = useState(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/admin/sellers');
      setSellers(res.data.sellers || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (id, action) => {
    const confirmMsg = action === 'approve' ? 'Approve this seller?' : 'Reject this seller?';
    if (!window.confirm(confirmMsg)) return;

    setProcessing(p => ({ ...p, [id]: true }));
    try {
      const url = `/api/admin/sellers/${id}/${action}`;
      const res = await API.post(url, action === 'reject' ? { reason: '' } : {});
      // update UI: remove from list
      setSellers(s => s.filter(x => x._id !== id));
      alert(res.data.message || `${action} success`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setProcessing(p => ({ ...p, [id]: false }));
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4">Manage Seller Applications</h2>
      {sellers.length === 0 ? (
        <div>No pending sellers.</div>
      ) : (
        <div className="space-y-4">
          {sellers.map(s => (
            <div key={s._id} className="border p-4 rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{s.sellerProfile?.businessName || '—'}</div>
                  <div className="text-sm text-gray-600">{s.email}</div>
                  <div className="text-sm mt-2">{s.sellerProfile?.description}</div>
                  <div className="text-sm text-gray-500 mt-2">Phone: {s.sellerProfile?.phone || 'N/A'}</div>
                  <div className="text-xs text-gray-400 mt-1">Applied: {new Date(s.sellerProfile?.appliedAt || s.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(s._id, 'approve')}
                    disabled={processing[s._id]}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    {processing[s._id] ? 'Processing…' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleAction(s._id, 'reject')}
                    disabled={processing[s._id]}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    {processing[s._id] ? 'Processing…' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
