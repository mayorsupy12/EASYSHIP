import React, { useState } from 'react';
import { Plus, X, Send, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { quotes as initialQuotes } from '../data/mockData';

const STATUS_MAP = {
  Pending:  { badge:'badge-warning', icon:<Clock size={11}/> },
  Accepted: { badge:'badge-success', icon:<CheckCircle2 size={11}/> },
  Rejected: { badge:'badge-danger',  icon:<XCircle size={11}/> },
};

const EMPTY_FORM = { customer:'', origin:'', destination:'', mode:'Ocean', weight:'', volume:'', notes:'' };

export default function Quotes() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? quotes : quotes.filter(q => q.status === filter);

  const handleSubmit = () => {
    if (!form.customer || !form.origin || !form.destination) return;
    const newQ = {
      id: `QT-00${quotes.length+1}`,
      ...form,
      price: '—',
      status: 'Pending',
      date: new Date().toISOString().slice(0,10),
    };
    setQuotes([newQ, ...quotes]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  return (
    <div>
      <div className="page-header fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1>Quotes</h1>
          <p>Manage freight quote requests and pricing</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16}/> New Quote Request
        </button>
      </div>

      {/* Summary chips */}
      <div className="fade-up" style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        {['All','Pending','Accepted','Rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding:'6px 16px', borderRadius:20, fontSize:13, fontWeight:500,
              background: filter === s ? 'var(--accent)' : 'var(--bg-card)',
              color: filter === s ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${filter === s ? 'var(--accent)' : 'var(--border)'}`,
              cursor:'pointer', transition:'var(--transition)',
            }}>
            {s} {s !== 'All' && `(${quotes.filter(q => q.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Quotes grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:16 }}>
        {filtered.map((q,i) => (
          <div key={q.id} className={`card fade-up fade-up-${(i%4)+1}`} style={{ position:'relative' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <span style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'var(--accent)' }}>{q.id}</span>
              <span className={`badge ${STATUS_MAP[q.status]?.badge}`}>
                {STATUS_MAP[q.status]?.icon} {q.status}
              </span>
            </div>
            <h3 style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)', marginBottom:4 }}>{q.customer}</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>
              {q.origin} → {q.destination} · {q.mode}
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
              {[['Weight', q.weight], ['Volume', q.volume], ['Est. Price', q.price], ['Requested', q.date]].map(([k,v]) => (
                <div key={k} style={{ background:'var(--bg-surface)', borderRadius:8, padding:'10px 12px' }}>
                  <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:2 }}>{k}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
            {q.status === 'Pending' && (
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-primary btn-sm" style={{ flex:1 }} onClick={() => updateStatus(q.id, 'Accepted')}>
                  <CheckCircle2 size={13}/> Accept
                </button>
                <button className="btn btn-danger btn-sm" style={{ flex:1 }} onClick={() => updateStatus(q.id, 'Rejected')}>
                  <XCircle size={13}/> Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign:'center', padding:48, color:'var(--text-muted)' }}>
          No {filter !== 'All' ? filter.toLowerCase() : ''} quotes found.
        </div>
      )}

      {/* New Quote Modal */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:16 }}
          onClick={() => setShowForm(false)}>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, width:'100%', maxWidth:520, padding:28 }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:20 }}>New Quote Request</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}><X size={16}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Customer / Company</label>
                <input className="form-input" placeholder="e.g. BUA Group" value={form.customer} onChange={e => setForm({...form, customer:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Origin</label>
                <input className="form-input" placeholder="City, Country" value={form.origin} onChange={e => setForm({...form, origin:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input className="form-input" placeholder="City, Country" value={form.destination} onChange={e => setForm({...form, destination:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Freight Mode</label>
                <select className="form-input" value={form.mode} onChange={e => setForm({...form, mode:e.target.value})}>
                  <option>Ocean</option><option>Air</option><option>Road</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input className="form-input" placeholder="e.g. 5000" value={form.weight} onChange={e => setForm({...form, weight:e.target.value})}/>
              </div>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Additional Notes</label>
                <textarea className="form-input" rows={3} placeholder="Special handling, cargo type, etc." value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}/>
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:8 }}>
              <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex:1 }} onClick={handleSubmit}>
                <Send size={14}/> Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
