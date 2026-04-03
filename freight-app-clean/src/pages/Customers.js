import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, TrendingUp, Star } from 'lucide-react';
import { customers } from '../data/mockData';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="page-header fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1>Customers</h1>
          <p>{customers.length} active customers</p>
        </div>
        <button className="btn btn-primary"><Plus size={16}/> Add Customer</button>
      </div>

      {/* Search */}
      <div className="card fade-up" style={{ marginBottom:20, padding:'14px 18px' }}>
        <div style={{ position:'relative' }}>
          <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
          <input className="form-input" style={{ paddingLeft:36 }} placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Customer grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16 }}>
        {filtered.map((c,i) => (
          <div key={c.id} className={`card card-clickable fade-up fade-up-${(i%4)+1}`} onClick={() => setSelected(c)} style={{ cursor:'pointer' }}>
            <div style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:16 }}>
              <div style={{
                width:44, height:44, borderRadius:12,
                background: c.status === 'Premium' ? 'linear-gradient(135deg, var(--accent-warm), var(--accent-2))' : 'var(--accent-2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:700, fontSize:15, color:'#fff', flexShrink:0,
              }}>
                {c.name.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <h3 style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)' }}>{c.name}</h3>
                  {c.status === 'Premium' && (
                    <span className="badge badge-warning" style={{ fontSize:10 }}><Star size={9}/> Premium</span>
                  )}
                </div>
                <p style={{ fontSize:13, color:'var(--text-muted)' }}>{c.contact}</p>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-secondary)' }}>
                <Mail size={13} style={{ color:'var(--text-muted)', flexShrink:0 }}/> {c.email}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-secondary)' }}>
                <Phone size={13} style={{ color:'var(--text-muted)', flexShrink:0 }}/> {c.phone}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-secondary)' }}>
                <MapPin size={13} style={{ color:'var(--text-muted)', flexShrink:0 }}/> {c.city}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:16 }}>
              <div style={{ background:'var(--bg-surface)', borderRadius:8, padding:'10px 12px' }}>
                <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:2 }}>Shipments</p>
                <p style={{ fontSize:18, fontFamily:'var(--font-display)', fontWeight:700, color:'var(--text-primary)' }}>{c.shipments}</p>
              </div>
              <div style={{ background:'var(--bg-surface)', borderRadius:8, padding:'10px 12px' }}>
                <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:2 }}>Total Spend</p>
                <p style={{ fontSize:14, fontFamily:'var(--font-display)', fontWeight:700, color:'var(--success)' }}>{c.spend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer detail modal */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:16 }}
          onClick={() => setSelected(null)}>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, width:'100%', maxWidth:480, padding:28 }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:20 }}>
              <div style={{ width:56, height:56, borderRadius:14, background: selected.status === 'Premium' ? 'linear-gradient(135deg, var(--accent-warm), var(--accent-2))' : 'var(--accent-2)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:18, color:'#fff' }}>
                {selected.name.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1 }}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:20, marginBottom:4 }}>{selected.name}</h2>
                <div style={{ display:'flex', gap:8 }}>
                  <span className="badge badge-success">Active</span>
                  {selected.status === 'Premium' && <span className="badge badge-warning"><Star size={9}/> Premium</span>}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            {[
              ['Customer ID', selected.id],
              ['Contact Person', selected.contact],
              ['Email', selected.email],
              ['Phone', selected.phone],
              ['City', selected.city],
              ['Total Shipments', selected.shipments],
              ['Total Spend', selected.spend],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'11px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize:13, color:'var(--text-muted)' }}>{k}</span>
                <span style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:20, display:'flex', gap:10 }}>
              <button className="btn btn-primary btn-sm" style={{ flex:1 }}><Mail size={13}/> Send Email</button>
              <button className="btn btn-secondary btn-sm" style={{ flex:1 }}>View Shipments</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
