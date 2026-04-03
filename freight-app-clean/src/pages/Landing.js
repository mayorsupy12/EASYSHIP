import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, ArrowRight, Ship, Plane, Truck, Globe, BarChart3, Shield, Eye, EyeOff } from 'lucide-react';
import './Landing.css';

const features = [
  { icon:<Ship size={22}/>, title:'Ocean Freight', desc:'Track containers across 150+ carriers worldwide in real time.' },
  { icon:<Plane size={22}/>, title:'Air Cargo', desc:'AWB tracking with live flight status and customs updates.' },
  { icon:<Truck size={22}/>, title:'Road Freight', desc:'GPS-enabled trucking visibility from port to warehouse.' },
  { icon:<Globe size={22}/>, title:'Global Network', desc:'Coverage across Africa, Europe, Asia, and the Americas.' },
  { icon:<BarChart3 size={22}/>, title:'Advanced Analytics', desc:'Freight spend, carrier performance and transit analytics.' },
  { icon:<Shield size={22}/>, title:'Secure & Reliable', desc:'Enterprise-grade security with 99.9% uptime guarantee.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('admin@beaconfreight.ng');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 900);
  };

  return (
    <div className="landing">
      {/* Background effects */}
      <div className="landing-bg">
        <div className="bg-orb orb-1"/>
        <div className="bg-orb orb-2"/>
        <div className="bg-grid"/>
      </div>

      {/* Nav */}
      <nav className="landing-nav">
        <div className="container flex-center" style={{ justifyContent:'space-between', height:64 }}>
          <div className="flex-center gap-12">
            <div style={{ width:36, height:36, background:'var(--accent)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--bg-primary)' }}>
              <Anchor size={18}/>
            </div>
            <div>
              <span style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700 }}>Beacon</span>
              <span style={{ fontSize:12, color:'var(--text-muted)', marginLeft:6 }}>Freight Solutions</span>
            </div>
          </div>
          <div className="flex-center gap-8">
            <button className="btn btn-ghost" onClick={() => document.getElementById('features').scrollIntoView({ behavior:'smooth' })}>Features</button>
            <button className="btn btn-primary btn-sm" onClick={() => document.getElementById('auth').scrollIntoView({ behavior:'smooth' })}>Login →</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero container">
        <div className="hero-content">
          <div className="hero-badge"><span className="badge badge-info" style={{ fontSize:12 }}>🌍 Trusted by 200+ companies in West Africa</span></div>
          <h1 className="hero-title">
            Freight Management<br/>
            <span className="accent-text">Built for Africa</span>
          </h1>
          <p className="hero-sub">
            Real-time tracking, smart quotes, and end-to-end visibility for ocean, air, and road freight — all in one powerful platform.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" style={{ padding:'12px 28px', fontSize:15 }} onClick={() => document.getElementById('auth').scrollIntoView({ behavior:'smooth' })}>
              Get Started <ArrowRight size={16}/>
            </button>
            <button className="btn btn-secondary" style={{ padding:'12px 28px', fontSize:15 }}>
              Watch Demo
            </button>
          </div>
          {/* Stats */}
          <div className="hero-stats">
            {[['200+','Companies'], ['15K+','Shipments/yr'], ['94%','On-time rate'], ['50+','Carrier partners']].map(([v,l]) => (
              <div key={l} className="hero-stat">
                <span className="hero-stat-value">{v}</span>
                <span className="hero-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auth card */}
        <div className="hero-card" id="auth">
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Sign In</button>
            <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>Register</button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"/>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position:'relative' }}>
                  <input className="form-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ paddingRight:40 }}/>
                  <button type="button" style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }} onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
              </div>
              <div style={{ textAlign:'right', marginBottom:16 }}>
                <a href="#" style={{ fontSize:12, color:'var(--accent)' }}>Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'12px' }} disabled={loading}>
                {loading ? 'Signing in…' : <>Sign In <ArrowRight size={15}/></>}
              </button>
              <p style={{ textAlign:'center', fontSize:12, color:'var(--text-muted)', marginTop:14 }}>
                Demo: admin@beaconfreight.ng / demo1234
              </p>
            </form>
          ) : (
            <div>
              {[['Full Name','text','Your full name'],['Company','text','Company name'],['Email','email','work@company.com'],['Password','password','Min 8 characters']].map(([l,t,p]) => (
                <div key={l} className="form-group">
                  <label className="form-label">{l}</label>
                  <input className="form-input" type={t} placeholder={p}/>
                </div>
              ))}
              <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:12 }} onClick={() => navigate('/dashboard')}>
                Create Account <ArrowRight size={15}/>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landing-features container">
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:36, fontWeight:700, marginBottom:12 }}>Everything you need to<br/><span className="accent-text">move freight smarter</span></h2>
          <p style={{ color:'var(--text-secondary)', fontSize:16, maxWidth:500, margin:'0 auto' }}>Built from the ground up for freight forwarders and logistics companies across Africa and beyond.</p>
        </div>
        <div className="features-grid">
          {features.map((f,i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:600, marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div className="flex-center gap-12">
            <div style={{ width:28, height:28, background:'var(--accent)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--bg-primary)' }}>
              <Anchor size={14}/>
            </div>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700 }}>Beacon Freight Solutions</span>
          </div>
          <p style={{ fontSize:13, color:'var(--text-muted)' }}>© 2026 Beacon Freight Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
