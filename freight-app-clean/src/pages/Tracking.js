import React, { useState } from 'react';
import { Search, MapPin, Ship, Plane, Truck, Clock, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { shipments } from '../data/mockData';

const STATUS_COLORS = { 'In Transit':'badge-info', 'Arrived':'badge-warning', 'Delivered':'badge-success', 'Pending':'badge-muted' };
const MODE_ICON = { Ocean:<Ship size={16}/>, Air:<Plane size={16}/>, Road:<Truck size={16}/> };

function TrackingTimeline({ shipment }) {
  const steps = [
    { label:'Booking Confirmed', sublabel:'Shipment booked and confirmed', done:true, date:shipment.departure },
    { label:'Cargo Ready', sublabel:'Goods prepared and packed', done:shipment.progress >= 10, date:shipment.progress >= 10 ? shipment.departure : null },
    { label:'Departed Origin', sublabel: shipment.mode === 'Air' ? 'Flight departed' : 'Vessel departed port', done:shipment.progress >= 25, date:shipment.progress >= 25 ? shipment.departure : null },
    { label:'In Transit', sublabel: shipment.mode === 'Air' ? 'Airborne to destination' : 'At sea — tracking via carrier', done:shipment.progress >= 50 && shipment.progress < 90, date:null },
    { label:'Arrived at Destination', sublabel: shipment.mode === 'Air' ? 'Landed at destination airport' : 'Vessel arrived at port', done:shipment.progress >= 90, date:shipment.progress >= 90 ? shipment.eta : null },
    { label:'Customs Clearance', sublabel:'Cleared customs formalities', done:shipment.progress >= 95, date:null },
    { label:'Delivered', sublabel:'Cargo delivered to consignee', done:shipment.progress === 100, date:shipment.progress === 100 ? shipment.eta : null },
  ];

  const activeStep = steps.reduce((acc, s, i) => s.done ? i : acc, 0);

  return (
    <div style={{ padding:'24px 0' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:16, marginBottom: i < steps.length-1 ? 0 : 0 }}>
          {/* Line + dot */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:28 }}>
            <div style={{
              width:28, height:28, borderRadius:'50%',
              background: step.done ? (i === activeStep ? 'var(--accent)' : 'rgba(0,214,143,0.15)') : 'var(--bg-surface)',
              border: `2px solid ${step.done ? (i === activeStep ? 'var(--accent)' : 'var(--success)') : 'var(--border)'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
              boxShadow: i === activeStep ? '0 0 12px rgba(0,212,255,0.4)' : 'none',
              transition:'all 0.3s',
            }}>
              {step.done
                ? <CheckCircle2 size={13} color={i === activeStep ? 'var(--bg-primary)' : 'var(--success)'}/>
                : <Circle size={10} color="var(--text-muted)"/>}
            </div>
            {i < steps.length-1 && (
              <div style={{ width:2, flex:1, minHeight:32, background: step.done ? 'rgba(0,214,143,0.3)' : 'var(--border)', margin:'4px 0' }}/>
            )}
          </div>
          {/* Content */}
          <div style={{ flex:1, paddingBottom:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <p style={{ fontSize:14, fontWeight: step.done ? 600 : 400, color: step.done ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom:3 }}>{step.label}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)' }}>{step.sublabel}</p>
              </div>
              {step.date && <span style={{ fontSize:11, color:'var(--text-muted)', background:'var(--bg-surface)', padding:'3px 8px', borderRadius:6, whiteSpace:'nowrap' }}>{step.date}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Tracking() {
  const [trackingInput, setTrackingInput] = useState('');
  const [tracked, setTracked] = useState(null);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    const q = trackingInput.trim().toUpperCase();
    if (!q) return;
    const found = shipments.find(s =>
      s.id.toUpperCase() === q ||
      s.container.toUpperCase() === q ||
      q.includes(s.id.replace('SHP-',''))
    );
    if (found) { setTracked(found); setNotFound(false); setError(''); }
    else { setTracked(null); setNotFound(true); setError(''); }
  };

  return (
    <div>
      <div className="page-header fade-up">
        <h1>Shipment Tracking</h1>
        <p>Track any shipment in real time by entering the shipment ID or container/AWB number.</p>
      </div>

      {/* Search bar */}
      <div className="card fade-up" style={{ marginBottom:24 }}>
        <div style={{ display:'flex', gap:12 }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
            <input
              className="form-input"
              style={{ paddingLeft:44, fontSize:15 }}
              placeholder="Enter Shipment ID (e.g. SHP-001) or Container Number…"
              value={trackingInput}
              onChange={e => setTrackingInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleTrack} style={{ padding:'10px 28px' }}>
            Track <ArrowRight size={15}/>
          </button>
        </div>

        {/* Quick-track chips */}
        <div style={{ marginTop:12, display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Try:</span>
          {shipments.slice(0,4).map(s => (
            <button key={s.id} className="badge badge-muted" style={{ cursor:'pointer', border:'1px solid var(--border)' }}
              onClick={() => { setTrackingInput(s.id); setTracked(s); setNotFound(false); }}>
              {s.id}
            </button>
          ))}
        </div>
      </div>

      {notFound && (
        <div className="card fade-up" style={{ textAlign:'center', padding:'40px', borderColor:'rgba(255,71,87,0.2)' }}>
          <MapPin size={32} color="var(--danger)" style={{ marginBottom:12 }}/>
          <h3 style={{ fontFamily:'var(--font-display)', marginBottom:8 }}>Shipment Not Found</h3>
          <p style={{ color:'var(--text-muted)', fontSize:14 }}>No shipment found for <strong style={{ color:'var(--text-primary)' }}>"{trackingInput}"</strong>. Check the ID and try again.</p>
        </div>
      )}

      {tracked && (
        <div className="fade-up" style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:20 }}>
          {/* Left: info */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Header card */}
            <div className="card" style={{ borderColor:'rgba(0,212,255,0.2)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'var(--accent)' }}>{tracked.id}</span>
                <span className={`badge ${STATUS_COLORS[tracked.status]}`}>{tracked.status}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-secondary)', marginBottom:16 }}>
                {MODE_ICON[tracked.mode]}
                <span>{tracked.carrier}</span>
                <span style={{ color:'var(--text-muted)' }}>·</span>
                <span>{tracked.mode} freight</span>
              </div>
              {/* Route visual */}
              <div style={{ background:'var(--bg-surface)', borderRadius:10, padding:'14px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>ORIGIN</p>
                    <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{tracked.origin}</p>
                    <p style={{ fontSize:11, color:'var(--text-muted)' }}>{tracked.departure}</p>
                  </div>
                  <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                    <div style={{ width:'100%', height:2, background:`linear-gradient(to right, var(--accent), var(--accent-2))`, position:'relative' }}>
                      <div style={{ position:'absolute', top:-6, left:`${tracked.progress}%`, transform:'translateX(-50%)', fontSize:16 }}>✈</div>
                    </div>
                    <span style={{ fontSize:11, color:'var(--accent)' }}>{tracked.progress}%</span>
                  </div>
                  <div style={{ flex:1, textAlign:'right' }}>
                    <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>DESTINATION</p>
                    <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{tracked.destination}</p>
                    <p style={{ fontSize:11, color:'var(--text-muted)' }}>ETA: {tracked.eta}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="card">
              <h4 style={{ fontFamily:'var(--font-display)', fontSize:13, color:'var(--text-muted)', marginBottom:14, letterSpacing:'0.5px' }}>SHIPMENT DETAILS</h4>
              {[
                ['Customer', tracked.customer],
                ['Container / AWB', tracked.container],
                ['Weight', tracked.weight],
                ['Volume', tracked.volume],
                ['Cargo Value', tracked.value],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize:13, color:'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="card">
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Tracking History</h3>
            <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>Live milestone updates for {tracked.id}</p>
            <TrackingTimeline shipment={tracked}/>
          </div>
        </div>
      )}

      {/* All shipments quick list */}
      {!tracked && !notFound && (
        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, marginBottom:16 }}>Active Shipments</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {shipments.filter(s => s.status !== 'Delivered').map(s => (
              <div key={s.id} onClick={() => { setTracked(s); setNotFound(false); }}
                style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'var(--bg-surface)', borderRadius:10, cursor:'pointer', transition:'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--bg-card-hover)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--bg-surface)'}>
                <div style={{ color:'var(--text-muted)' }}>{MODE_ICON[s.mode]}</div>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--accent)', marginRight:10 }}>{s.id}</span>
                  <span style={{ fontSize:13, color:'var(--text-secondary)' }}>{s.customer}</span>
                </div>
                <div style={{ fontSize:12, color:'var(--text-muted)' }}>{s.origin.split(',')[0]} → {s.destination.split(',')[0]}</div>
                <span className={`badge ${STATUS_COLORS[s.status]}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
