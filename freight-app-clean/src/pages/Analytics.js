import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, Legend, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { monthlyRevenue, shipments, carriers, modeBreakdown } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px' }}>
      <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ fontSize:13, fontWeight:600, color: p.color }}>{p.name}: {typeof p.value === 'number' && p.value > 1000 ? `$${(p.value/1000).toFixed(0)}k` : p.value}</p>
      ))}
    </div>
  );
};

const topCustomerData = [
  { name:'NigerOil', spend:2546 },
  { name:'Aliko', spend:6138 },
  { name:'Dangote', spend:842 },
  { name:'Zenith', spend:316 },
  { name:'Innoson', spend:413 },
].sort((a,b) => b.spend - a.spend);

const transitData = [
  { route:'LOS→RTM', avg:24, target:22 },
  { route:'LOS→HAM', avg:26, target:24 },
  { route:'LOS→DXB', avg:5, target:4 },
  { route:'LOS→LHR', avg:1, target:1 },
  { route:'PHC→HOU', avg:28, target:26 },
];

export default function Analytics() {
  const [period, setPeriod] = useState('6M');

  const data = period === '3M' ? monthlyRevenue.slice(-3) : monthlyRevenue;

  return (
    <div>
      <div className="page-header fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1>Analytics</h1>
          <p>Operational insights and performance metrics</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {['3M','6M'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding:'6px 16px', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', transition:'var(--transition)',
                background: period === p ? 'var(--accent)' : 'var(--bg-card)',
                color: period === p ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `1px solid ${period === p ? 'var(--accent)' : 'var(--border)'}` }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="stats-grid fade-up">
        {[
          { label:'Total Revenue', value:'$1.33M', change:'+18%', up:true },
          { label:'Avg Shipment Value', value:'$66.2k', change:'+12%', up:true },
          { label:'On-Time Rate', value:'94.2%', change:'+2.1%', up:true },
          { label:'Active Clients', value:'8', change:'+1', up:true },
        ].map((k,i) => (
          <div key={i} className={`stat-card accent-${['cyan','blue','green','orange'][i]}`}>
            <div className="stat-label">{k.label}</div>
            <div className="stat-value" style={{ fontSize:26 }}>{k.value}</div>
            <div className="stat-sub">
              {k.up ? <TrendingUp size={12} color="var(--success)"/> : <TrendingDown size={12} color="var(--danger)"/>}
              <span className={k.up ? 'up' : 'down'}>{k.change} vs prev period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:20, marginBottom:20 }}>
        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Revenue & Shipment Volume</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:20 }}>Combined monthly view</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25}/>
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="month" tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#g1)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Mode Distribution</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>By revenue share</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={modeBreakdown} cx="50%" cy="50%" innerRadius={52} outerRadius={78} dataKey="value" strokeWidth={0}>
                {modeBreakdown.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {modeBreakdown.map((m,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:m.color }}/>
                <span style={{ color:'var(--text-secondary)', flex:1 }}>{m.name}</span>
                <span style={{ fontWeight:600 }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* Top customers */}
        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Top Customers by Spend</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:20 }}>All time ($000s)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topCustomerData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
              <XAxis type="number" tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}k`}/>
              <YAxis type="category" dataKey="name" tick={{ fill:'#8892a4', fontSize:12 }} axisLine={false} tickLine={false} width={55}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="spend" name="Spend" fill="#0066ff" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transit time */}
        <div className="card fade-up">
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginBottom:4 }}>Avg Transit Days by Route</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:20 }}>Actual vs target</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={transitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="route" tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'#4a5568', fontSize:11 }} axisLine={false} tickLine={false} unit="d"/>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend wrapperStyle={{ fontSize:12, color:'var(--text-muted)' }}/>
              <Bar dataKey="avg" name="Actual" fill="#00d4ff" radius={[4,4,0,0]}/>
              <Bar dataKey="target" name="Target" fill="rgba(255,255,255,0.1)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
