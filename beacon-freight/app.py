from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from flask_cors import CORS
import json
from datetime import datetime
from data import SHIPMENTS, CUSTOMERS, QUOTES, MONTHLY_REVENUE, MODE_BREAKDOWN, CARRIERS, RECENT_ACTIVITY

app = Flask(__name__)
app.secret_key = 'beacon-freight-secret-2026'
CORS(app)

# ── Auth ────────────────────────────────────────────────
DEMO_USER = {'email': 'admin@beaconfreight.ng', 'password': 'demo1234', 'name': 'Admin Ops', 'role': 'Super Admin'}

def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect(url_for('landing'))
        return f(*args, **kwargs)
    return decorated

# ── Pages ───────────────────────────────────────────────
@app.route('/')
def landing():
    if session.get('logged_in'):
        return redirect(url_for('dashboard'))
    return render_template('landing.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('email') == DEMO_USER['email'] and data.get('password') == DEMO_USER['password']:
        session['logged_in'] = True
        session['user'] = {'name': DEMO_USER['name'], 'role': DEMO_USER['role'], 'email': DEMO_USER['email']}
        return jsonify({'ok': True})
    return jsonify({'ok': False, 'error': 'Invalid credentials'}), 401

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('landing'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('app.html', page='dashboard', user=session.get('user'))

@app.route('/shipments')
@login_required
def shipments():
    return render_template('app.html', page='shipments', user=session.get('user'))

@app.route('/tracking')
@login_required
def tracking():
    return render_template('app.html', page='tracking', user=session.get('user'))

@app.route('/quotes')
@login_required
def quotes():
    return render_template('app.html', page='quotes', user=session.get('user'))

@app.route('/customers')
@login_required
def customers():
    return render_template('app.html', page='customers', user=session.get('user'))

@app.route('/analytics')
@login_required
def analytics():
    return render_template('app.html', page='analytics', user=session.get('user'))

@app.route('/settings')
@login_required
def settings():
    return render_template('app.html', page='settings', user=session.get('user'))

# ── API ─────────────────────────────────────────────────
@app.route('/api/dashboard')
@login_required
def api_dashboard():
    in_transit = [s for s in SHIPMENTS if s['status'] == 'In Transit']
    delivered  = [s for s in SHIPMENTS if s['status'] == 'Delivered']
    pending    = [s for s in SHIPMENTS if s['status'] == 'Pending']
    return jsonify({
        'stats': {
            'in_transit': len(in_transit),
            'delivered':  len(delivered),
            'pending':    len(pending),
            'revenue':    '$267k',
        },
        'recent_shipments': SHIPMENTS[:5],
        'monthly_revenue':  MONTHLY_REVENUE,
        'mode_breakdown':   MODE_BREAKDOWN,
        'recent_activity':  RECENT_ACTIVITY,
        'carriers':         CARRIERS,
    })

@app.route('/api/shipments')
@login_required
def api_shipments():
    q      = request.args.get('q', '').lower()
    status = request.args.get('status', 'All')
    mode   = request.args.get('mode', 'All')
    result = SHIPMENTS
    if q:
        result = [s for s in result if q in s['id'].lower() or q in s['customer'].lower()
                  or q in s['origin'].lower() or q in s['destination'].lower()]
    if status != 'All':
        result = [s for s in result if s['status'] == status]
    if mode != 'All':
        result = [s for s in result if s['mode'] == mode]
    return jsonify(result)

@app.route('/api/shipments/<shp_id>')
@login_required
def api_shipment_detail(shp_id):
    s = next((s for s in SHIPMENTS if s['id'] == shp_id), None)
    if not s:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(s)

@app.route('/api/tracking')
@login_required
def api_tracking():
    q = request.args.get('q', '').upper()
    if not q:
        return jsonify({'results': [s for s in SHIPMENTS if s['status'] != 'Delivered']})
    found = next((s for s in SHIPMENTS if s['id'].upper() == q or s['container'].upper() == q), None)
    if found:
        return jsonify({'found': True, 'shipment': found})
    return jsonify({'found': False})

@app.route('/api/quotes', methods=['GET'])
@login_required
def api_quotes():
    status = request.args.get('status', 'All')
    result = QUOTES if status == 'All' else [q for q in QUOTES if q['status'] == status]
    return jsonify(result)

@app.route('/api/quotes', methods=['POST'])
@login_required
def api_create_quote():
    data = request.get_json()
    new_q = {
        'id': f'QT-{str(len(QUOTES)+1).zfill(3)}',
        'customer':    data.get('customer', ''),
        'origin':      data.get('origin', ''),
        'destination': data.get('destination', ''),
        'mode':        data.get('mode', 'Ocean'),
        'weight':      data.get('weight', '—'),
        'volume':      data.get('volume', '—'),
        'price':       '—',
        'status':      'Pending',
        'date':        datetime.now().strftime('%Y-%m-%d'),
    }
    QUOTES.insert(0, new_q)
    return jsonify(new_q), 201

@app.route('/api/quotes/<qt_id>', methods=['PATCH'])
@login_required
def api_update_quote(qt_id):
    data = request.get_json()
    for q in QUOTES:
        if q['id'] == qt_id:
            q['status'] = data.get('status', q['status'])
            return jsonify(q)
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/customers')
@login_required
def api_customers():
    q = request.args.get('q', '').lower()
    result = CUSTOMERS
    if q:
        result = [c for c in result if q in c['name'].lower() or q in c['city'].lower() or q in c['contact'].lower()]
    return jsonify(result)

@app.route('/api/analytics')
@login_required
def api_analytics():
    return jsonify({
        'monthly_revenue': MONTHLY_REVENUE,
        'mode_breakdown':  MODE_BREAKDOWN,
        'carriers':        CARRIERS,
        'kpis': {
            'total_revenue':    '$1.33M',
            'avg_shipment':     '$66.2k',
            'on_time_rate':     '94.2%',
            'active_clients':   len(CUSTOMERS),
        },
        'top_customers': [
            {'name': 'Aliko Holdings',   'spend': 6138},
            {'name': 'NigerOil Ltd',     'spend': 2546},
            {'name': 'Dangote Industries','spend': 842},
            {'name': 'Innoson Vehicles', 'spend': 413},
            {'name': 'Zenith Pharma',    'spend': 316},
        ],
        'transit_data': [
            {'route': 'LOS→RTM', 'avg': 24, 'target': 22},
            {'route': 'LOS→HAM', 'avg': 26, 'target': 24},
            {'route': 'LOS→DXB', 'avg': 5,  'target': 4},
            {'route': 'LOS→LHR', 'avg': 1,  'target': 1},
            {'route': 'PHC→HOU', 'avg': 28, 'target': 26},
        ],
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
