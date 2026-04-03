import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, TrendingUp, Clock, CheckCircle2, AlertTriangle,
  Ship, Plane, Truck, ArrowRight, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { shipments, monthlyRevenue, modeBreakdown, recentActivity, carriers } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px' }}>
      <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>{label}</p>
      <p style={{ fontSize:14, fontWeight:600, color:'var(--accent)' }}>${(payload[0].value/1000).toFixed(0)}k</p>
    </div>
  );
};

const ModeIcon = ({ mode }) => {
  if (mode === 'Ocean') return <Ship size={14}/>;
  if (mode === 'Air')   return <Plane size={14}/>;
  return <Truck size={14}/>;
};

const StatusBadge = ({ status }) => {
  const map = { 'In Transit':'badge-info', 'Arrived':'badge-warning', 'Delivered':'badge-success', 'Pending':'badge-muted' };
  return <span className={`badge ${map[status] || 'badge-muted'}`}>{status}</span>;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const inTransit = shipments.filter(s => s.status === 'In Transit').length;
  const delivered  = shipments.filter(s => s.status === 'Delivered').length;
  const pending    = shipments.filter(s => s.status === 'Pending').length;
  const arrived    = shipments.filter(s => s.status === 'Arrived').length;

  return (
    <div>
      <div className="page-header fade-up">
        <h1>Dashboard</h1>
        <p>Welcome back — here's what's happening with your freight today.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label:'Active Shipments', value: inTransit, sub:'+2 this week', sub_class:'up', icon:<Package size={20}/>, accent:'accent-cyan' },
          { label:'Total Revenue', value:'$267k', sub:'+18% vs last month', sub_class:'up', icon:<TrendingUp size={20}/>, accent:'accent-blue' },
          { label:'Pending Quotes', value: pending, sub:'Awaiting review', sub_class:'', icon:<Clock size={20}/>, accent:'accent-orange' },
          { label:'Delivered', value: delivered, sub:'This month', sub_class:'up', icon:<CheckCircle2 size={20}/>, accent:'accent-green' },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent} fade-up fade-up-${i+1}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub"><span className={s.sub_class}>{s.sub}</span></div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20, marginBottom:24 }}>
        {/* Revenue chart */}
        <div className="card fade-up">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600 }}>Revenue Trend</h3>
              <p style={{ fontSize:12, color:'var(--text-muted)' }}>Last 6 months</p>
            </div>
            <span className="badge badge-success"><Activity size={10}/> Live</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="month" tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#grad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mode breakdown */}
        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Freight Mode</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>By shipment count</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={modeBreakdown} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={0}>
                {modeBreakdown.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip formatter={(val) => [`${val}%`, '']} contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
            {modeBreakdown.map((m,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:m.color, flexShrink:0 }}/>
                <span style={{ color:'var(--text-secondary)', flex:1 }}>{m.name}</span>
                <span style={{ fontWeight:600, color:'var(--text-primary)' }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent shipments */}
      <div className="card fade-up" style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600 }}>Recent Shipments</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/shipments')}>View all <ArrowRight size={13}/></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Customer</th><th>Route</th><th>Mode</th><th>Status</th><th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {shipments.slice(0,5).map(s => (
                <tr key={s.id} style={{ cursor:'pointer' }} onClick={() => navigate('/shipments')}>
                  <td style={{ color:'var(--accent)', fontWeight:500 }}>{s.id}</td>
                  <td style={{ color:'var(--text-primary)' }}>{s.customer}</td>
                  <td><span style={{ fontSize:13 }}>{s.origin.split(',')[0]} → {s.destination.split(',')[0]}</span></td>
                  <td>
                    <span style={{ display:'flex', alignItems:'center', gap:5, color:'var(--text-secondary)' }}>
                      <ModeIcon mode={s.mode}/> {s.mode}
                    </span>
                  </td>
                  <td><StatusBadge status={s.status}/></td>
                  <td style={{ fontSize:13 }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom row: Activity + Carriers */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* Activity feed */}
        <div className="card">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:16 }}>Recent Activity</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {recentActivity.map(a => (
              <div key={a.id} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--bg-surface)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {a.type === 'delivered' ? <CheckCircle2 size={14} color="var(--success)"/> :
                   a.type === 'alert'     ? <AlertTriangle size={14} color="var(--warning)"/> :
                   a.type === 'quote'     ? <Package size={14} color="var(--accent)"/> :
                   <Activity size={14} color="var(--accent-2)"/>}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, color:'var(--text-primary)', marginBottom:2 }}>{a.message}</p>
                  <p style={{ fontSize:11, color:'var(--text-muted)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top carriers */}
        <div className="card">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:16 }}>Top Carriers</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {carriers.map((c,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'var(--bg-surface)', borderRadius:10 }}>
                <div style={{ width:36, height:36, background:'var(--accent-2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, color:'#fff', flexShrink:0 }}>{c.logo}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>{c.name}</p>
                  <p style={{ fontSize:11, color:'var(--text-muted)' }}>{c.shipments} shipments · {c.mode}</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontSize:13, fontWeight:600, color:'var(--success)' }}>{c.onTime}</p>
                  <p style={{ fontSize:11, color:'var(--text-muted)' }}>on time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
