export const shipments = [
  { id:'SHP-001', origin:'Lagos, Nigeria', destination:'Rotterdam, Netherlands', carrier:'Maersk Line', mode:'Ocean', status:'In Transit', eta:'2026-04-18', departure:'2026-03-28', weight:'12,400 kg', volume:'42 CBM', container:'MSKU7843201', customer:'Dangote Industries', value:'$84,200', progress:65, docs:3 },
  { id:'SHP-002', origin:'Apapa Port, Lagos', destination:'Hamburg, Germany', carrier:'MSC', mode:'Ocean', status:'Arrived', eta:'2026-04-02', departure:'2026-03-14', weight:'8,900 kg', volume:'28 CBM', container:'MSCU4412009', customer:'Innoson Vehicles', value:'$51,600', progress:100, docs:5 },
  { id:'SHP-003', origin:'Lagos, Nigeria', destination:'London Heathrow, UK', carrier:'Ethiopian Airlines', mode:'Air', status:'Delivered', eta:'2026-03-30', departure:'2026-03-29', weight:'340 kg', volume:'2.1 CBM', container:'AWB-071-12340981', customer:'Zenith Pharma', value:'$18,900', progress:100, docs:4 },
  { id:'SHP-004', origin:'Kano, Nigeria', destination:'Dubai, UAE', carrier:'DHL Express', mode:'Air', status:'Pending', eta:'2026-04-10', departure:'2026-04-06', weight:'560 kg', volume:'3.8 CBM', container:'AWB-302-55601234', customer:'Alhaji Textiles', value:'$22,400', progress:0, docs:1 },
  { id:'SHP-005', origin:'Port Harcourt, Nigeria', destination:'Houston, USA', carrier:'Hapag-Lloyd', mode:'Ocean', status:'In Transit', eta:'2026-04-25', departure:'2026-04-01', weight:'18,200 kg', volume:'60 CBM', container:'HLCU9901234', customer:'NigerOil Ltd', value:'$134,000', progress:30, docs:2 },
  { id:'SHP-006', origin:'Lagos, Nigeria', destination:'Accra, Ghana', carrier:'Road Freight', mode:'Road', status:'In Transit', eta:'2026-04-04', departure:'2026-04-02', weight:'2,800 kg', volume:'8 CBM', container:'TRK-NG-002241', customer:'Shoprite Ghana', value:'$11,200', progress:75, docs:2 },
  { id:'SHP-007', origin:'Abuja, Nigeria', destination:'Nairobi, Kenya', carrier:'Kenya Airways', mode:'Air', status:'Delivered', eta:'2026-03-28', departure:'2026-03-27', weight:'280 kg', volume:'1.8 CBM', container:'AWB-706-99810023', customer:'MTN Nigeria', value:'$9,600', progress:100, docs:3 },
  { id:'SHP-008', origin:'Lagos, Nigeria', destination:'Shanghai, China', carrier:'COSCO Shipping', mode:'Ocean', status:'Pending', eta:'2026-05-02', departure:'2026-04-15', weight:'22,000 kg', volume:'75 CBM', container:'CSAV1122334', customer:'Aliko Holdings', value:'$198,000', progress:0, docs:0 },
];

export const customers = [
  { id:'C001', name:'Dangote Industries', contact:'Emeka Okafor', email:'emeka@dangote.com', phone:'+234 802 345 6789', city:'Lagos', shipments:14, spend:'$842,000', status:'Active' },
  { id:'C002', name:'Innoson Vehicles', contact:'Chidi Eze', email:'chidi@innosonvehicles.com', phone:'+234 803 456 7890', city:'Enugu', shipments:8, spend:'$412,800', status:'Active' },
  { id:'C003', name:'Zenith Pharma', contact:'Amaka Nwosu', email:'amaka@zenithpharma.ng', phone:'+234 801 234 5678', city:'Lagos', shipments:22, spend:'$315,600', status:'Active' },
  { id:'C004', name:'Alhaji Textiles', contact:'Umar Suleiman', email:'umar@alhajitextiles.com', phone:'+234 706 789 0123', city:'Kano', shipments:6, spend:'$134,400', status:'Active' },
  { id:'C005', name:'NigerOil Ltd', contact:'Femi Adeyemi', email:'femi@nigeroil.com', phone:'+234 805 678 9012', city:'Port Harcourt', shipments:19, spend:'$2,546,000', status:'Premium' },
  { id:'C006', name:'Shoprite Ghana', contact:'Kwame Asante', email:'kwame@shopriteng.com', phone:'+233 202 345 6789', city:'Accra', shipments:11, spend:'$123,200', status:'Active' },
  { id:'C007', name:'MTN Nigeria', contact:'Ngozi Adaeze', email:'ngozi@mtn.com.ng', phone:'+234 803 901 2345', city:'Abuja', shipments:5, spend:'$48,000', status:'Active' },
  { id:'C008', name:'Aliko Holdings', contact:'Bashir Aliyu', email:'bashir@alikoholdings.com', phone:'+234 802 012 3456', city:'Lagos', shipments:31, spend:'$6,138,000', status:'Premium' },
];

export const quotes = [
  { id:'QT-001', customer:'BUA Group', origin:'Lagos', destination:'London', mode:'Ocean', weight:'5,200 kg', volume:'18 CBM', price:'$4,800', status:'Pending', date:'2026-04-01' },
  { id:'QT-002', customer:'First Bank', origin:'Abuja', destination:'New York', mode:'Air', weight:'120 kg', volume:'0.8 CBM', price:'$2,100', status:'Accepted', date:'2026-03-31' },
  { id:'QT-003', customer:'Dangote Industries', origin:'Apapa', destination:'Rotterdam', mode:'Ocean', weight:'15,000 kg', volume:'52 CBM', price:'$9,200', status:'Accepted', date:'2026-03-30' },
  { id:'QT-004', customer:'Konga.com', origin:'Lagos', destination:'Dubai', mode:'Air', weight:'800 kg', volume:'5 CBM', price:'$3,400', status:'Pending', date:'2026-04-02' },
  { id:'QT-005', customer:'NNPC', origin:'Port Harcourt', destination:'Houston', mode:'Ocean', weight:'25,000 kg', volume:'82 CBM', price:'$14,600', status:'Rejected', date:'2026-03-28' },
];

export const monthlyRevenue = [
  { month:'Oct', revenue:184000, shipments:42 },
  { month:'Nov', revenue:213000, shipments:48 },
  { month:'Dec', revenue:198000, shipments:44 },
  { month:'Jan', revenue:241000, shipments:56 },
  { month:'Feb', revenue:228000, shipments:52 },
  { month:'Mar', revenue:267000, shipments:61 },
];

export const modeBreakdown = [
  { name:'Ocean', value:58, color:'#00d4ff' },
  { name:'Air',   value:28, color:'#0066ff' },
  { name:'Road',  value:14, color:'#ff6b35' },
];

export const recentActivity = [
  { id:1, type:'status', message:'SHP-001 departed Apapa Port', time:'2h ago', icon:'ship' },
  { id:2, type:'quote',  message:'New quote request from BUA Group', time:'4h ago', icon:'file' },
  { id:3, type:'delivered', message:'SHP-003 delivered to London Heathrow', time:'6h ago', icon:'check' },
  { id:4, type:'alert',  message:'SHP-005 customs clearance delayed', time:'8h ago', icon:'alert' },
  { id:5, type:'customer', message:'Aliko Holdings placed new booking', time:'1d ago', icon:'user' },
];

export const carriers = [
  { name:'Maersk Line', mode:'Ocean', rating:4.8, shipments:34, onTime:'96%', logo:'M' },
  { name:'MSC', mode:'Ocean', rating:4.6, shipments:28, onTime:'93%', logo:'S' },
  { name:'DHL Express', mode:'Air', rating:4.9, shipments:22, onTime:'98%', logo:'D' },
  { name:'Ethiopian Airlines', mode:'Air', rating:4.5, shipments:16, onTime:'91%', logo:'E' },
  { name:'Hapag-Lloyd', mode:'Ocean', rating:4.7, shipments:19, onTime:'94%', logo:'H' },
];
