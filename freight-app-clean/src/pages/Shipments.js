import React, { useState } from 'react';
import { Search, Filter, Plus, Ship, Plane, Truck, ChevronDown, X, FileText, Eye } from 'lucide-react';
import { shipments } from '../data/mockData';

const STATUS_COLORS = { 'In Transit':'badge-info', 'Arrived':'badge-warning', 'Delivered':'badge-success', 'Pending':'badge-muted' };
const MODE_ICON = { Ocean:<Ship size={14}/>, Air:<Plane size={14}/>, Road:<Truck size={14}/> };

export default function Shipments() {
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatus] = useState('All');
  const [modeFilter, setMode]   = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = shipments.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.id.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) || s.destination.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchMode   = modeFilter === 'All' || s.mode === modeFilter;
    return matchSearch && matchStatus && matchMode;
  });

  return (
    <div>
      <div className="page-header fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1>Shipments</h1>
          <p>{filtered.length} of {shipments.length} shipments shown</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16}/> New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="card fade-up" style={{ marginBottom:20, padding:'16px 20px' }}>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1', minWidth:200 }}>
            <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
            <input className="form-input" style={{ paddingLeft:36 }} placeholder="Search by ID, customer, route…" value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, position:'relative' }}>
            <Filter size={14} style={{ color:'var(--text-muted)' }}/>
            <select className="form-input" style={{ width:'auto', paddingRight:32 }} value={statusFilter} onChange={e => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              {['In Transit','Arrived','Delivered','Pending'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <select className="form-input" style={{ width:'auto' }} value={modeFilter} onChange={e => setMode(e.target.value)}>
            <option value="All">All Modes</option>
            {['Ocean','Air','Road'].map(m => <option key={m}>{m}</option>)}
          </select>
          {(search || statusFilter !== 'All' || modeFilter !== 'All') && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setStatus('All'); setMode('All'); }}>
              <X size={13}/> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card fade-up" style={{ padding:0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th><th>Customer</th><th>Origin</th><th>Destination</th>
                <th>Mode</th><th>Status</th><th>ETA</th><th>Value</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ color:'var(--accent)', fontWeight:600, fontFamily:'var(--font-display)' }}>{s.id}</td>
                  <td style={{ color:'var(--text-primary)', fontWeight:500 }}>{s.customer}</td>
                  <td>{s.origin}</td>
                  <td>{s.destination}</td>
                  <td>
                    <span style={{ display:'flex', alignItems:'center', gap:6, color:'var(--text-secondary)' }}>
                      {MODE_ICON[s.mode]} {s.mode}
                    </span>
                  </td>
                  <td><span className={`badge ${STATUS_COLORS[s.status]}`}>{s.status}</span></td>
                  <td style={{ fontFamily:'monospace', fontSize:13 }}>{s.eta}</td>
                  <td style={{ color:'var(--text-primary)', fontWeight:500 }}>{s.value}</td>
                  <td>
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(s)} title="View details">
                        <Eye size={13}/>
                      </button>
                      <button className="btn btn-ghost btn-sm" title="Documents">
                        <FileText size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'40px 20px', color:'var(--text-muted)' }}>
              No shipments match your search.
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:16 }}
          onClick={() => setSelected(null)}>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:var_radius_lg, width:'100%', maxWidth:600, padding:28, maxHeight:'90vh', overflowY:'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <div>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--accent)' }}>{selected.id}</h2>
                <p style={{ fontSize:13, color:'var(--text-muted)' }}>{selected.carrier}</p>
              </div>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <span className={`badge ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}><X size={14}/></button>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>
                <span>Progress</span><span>{selected.progress}%</span>
              </div>
              <div style={{ height:6, background:'var(--bg-surface)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${selected.progress}%`, background: selected.progress === 100 ? 'var(--success)' : 'var(--accent)', borderRadius:3, transition:'width 0.5s ease' }}/>
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                ['Customer', selected.customer],
                ['Value', selected.value],
                ['Origin', selected.origin],
                ['Destination', selected.destination],
                ['Departure', selected.departure],
                ['ETA', selected.eta],
                ['Container / AWB', selected.container],
                ['Weight', selected.weight],
                ['Volume', selected.volume],
                ['Documents', `${selected.docs} attached`],
              ].map(([k,v]) => (
                <div key={k} style={{ background:'var(--bg-surface)', borderRadius:10, padding:'12px 14px' }}>
                  <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.5px' }}>{k}</p>
                  <p style={{ fontSize:14, color:'var(--text-primary)', fontWeight:500 }}>{v}</p>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <div style={{ marginTop:24 }}>
              <h4 style={{ fontFamily:'var(--font-display)', fontSize:14, marginBottom:14, color:'var(--text-secondary)' }}>TRACKING MILESTONES</h4>
              {getMilestones(selected).map((m,i) => (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:12 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                    <div style={{ width:12, height:12, borderRadius:'50%', background: m.done ? 'var(--success)' : 'var(--bg-surface)', border:`2px solid ${m.done ? 'var(--success)' : 'var(--border)'}`, flexShrink:0 }}/>
                    {i < getMilestones(selected).length-1 && <div style={{ width:2, height:20, background:'var(--border)' }}/>}
                  </div>
                  <div style={{ paddingBottom:4 }}>
                    <p style={{ fontSize:13, color: m.done ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: m.done ? 500 : 400 }}>{m.label}</p>
                    {m.done && m.time && <p style={{ fontSize:11, color:'var(--text-muted)' }}>{m.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const var_radius_lg = '16px';

function getMilestones(s) {
  const base = [
    { label:'Booking confirmed', done:true, time:s.departure },
    { label:'Cargo picked up', done: s.progress >= 10, time: s.progress >= 10 ? s.departure : null },
    { label:'Departed origin port/airport', done: s.progress >= 30, time: s.progress >= 30 ? s.departure : null },
    { label:'In transit', done: s.progress >= 50, time: null },
    { label:'Arrived at destination', done: s.progress >= 90, time: s.progress >= 90 ? s.eta : null },
    { label:'Customs cleared', done: s.progress >= 95, time: null },
    { label:'Delivered', done: s.progress === 100, time: s.progress === 100 ? s.eta : null },
  ];
  return base;
}
