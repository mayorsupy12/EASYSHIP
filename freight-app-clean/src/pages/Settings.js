import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Palette, Building } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    company:'Beacon Freight Solutions',
    email:'admin@beaconfreight.ng',
    phone:'+234 802 000 1234',
    address:'1 Marina Road, Lagos Island, Lagos',
    currency:'USD',
    timezone:'Africa/Lagos',
    emailAlerts:true,
    smsAlerts:false,
    delayAlerts:true,
    deliveryAlerts:true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="card fade-up" style={{ marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
        <div style={{ width:36, height:36, background:'rgba(0,212,255,0.1)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={17} color="var(--accent)"/>
        </div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600 }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  const Toggle = ({ label, desc, value, onChange }) => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div>
        <p style={{ fontSize:14, color:'var(--text-primary)', marginBottom:2 }}>{label}</p>
        {desc && <p style={{ fontSize:12, color:'var(--text-muted)' }}>{desc}</p>}
      </div>
      <div onClick={onChange} style={{
        width:44, height:24, borderRadius:12, cursor:'pointer', transition:'var(--transition)',
        background: value ? 'var(--accent)' : 'var(--bg-surface)',
        border: `1px solid ${value ? 'var(--accent)' : 'var(--border)'}`,
        position:'relative', flexShrink:0
      }}>
        <div style={{
          position:'absolute', top:3,
          left: value ? 22 : 3,
          width:16, height:16, borderRadius:'50%',
          background: value ? 'var(--bg-primary)' : 'var(--text-muted)',
          transition:'left 0.2s',
        }}/>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1>Settings</h1>
          <p>Configure your freight management platform</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={15}/>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <Section icon={Building} title="Company Profile">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input className="form-input" value={form.company} onChange={e => setForm({...form, company:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input className="form-input" value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}/>
          </div>
          <div className="form-group" style={{ gridColumn:'1/-1' }}>
            <label className="form-label">Office Address</label>
            <input className="form-input" value={form.address} onChange={e => setForm({...form, address:e.target.value})}/>
          </div>
        </div>
      </Section>

      <Section icon={Globe} title="Regional Settings">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="form-group">
            <label className="form-label">Default Currency</label>
            <select className="form-input" value={form.currency} onChange={e => setForm({...form, currency:e.target.value})}>
              <option value="USD">USD — US Dollar</option>
              <option value="NGN">NGN — Nigerian Naira</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Timezone</label>
            <select className="form-input" value={form.timezone} onChange={e => setForm({...form, timezone:e.target.value})}>
              <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="America/New_York">America/New York (EST)</option>
            </select>
          </div>
        </div>
      </Section>

      <Section icon={Bell} title="Notifications">
        <Toggle label="Email Alerts" desc="Receive shipment updates via email" value={form.emailAlerts} onChange={() => setForm({...form, emailAlerts:!form.emailAlerts})}/>
        <Toggle label="SMS Alerts" desc="Get SMS notifications for critical updates" value={form.smsAlerts} onChange={() => setForm({...form, smsAlerts:!form.smsAlerts})}/>
        <Toggle label="Delay Notifications" desc="Alert when shipments are delayed" value={form.delayAlerts} onChange={() => setForm({...form, delayAlerts:!form.delayAlerts})}/>
        <Toggle label="Delivery Confirmations" desc="Notify on successful delivery" value={form.deliveryAlerts} onChange={() => setForm({...form, deliveryAlerts:!form.deliveryAlerts})}/>
      </Section>

      <Section icon={Shield} title="Security">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <button className="btn btn-secondary" style={{ width:'fit-content' }}>Change Password</button>
          <button className="btn btn-secondary" style={{ width:'fit-content' }}>Enable Two-Factor Authentication</button>
          <button className="btn btn-secondary" style={{ width:'fit-content' }}>Manage API Keys</button>
        </div>
      </Section>
    </div>
  );
}
