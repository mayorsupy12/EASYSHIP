from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
app.secret_key = 'easyship-jobs-secret-2026'
CORS(app)

# ─── In-memory applications store ───────────────────────────
APPLICATIONS = []

JOB_ROLES = [
    {
        "id": "freight-coordinator",
        "title": "Freight Coordinator",
        "department": "Operations",
        "type": "Full-Time",
        "location": "Los Angeles, CA",
        "salary": "$55,000 – $70,000/yr",
        "posted": "3 days ago",
        "urgent": True,
        "description": "Coordinate day-to-day freight shipments across California, manage carrier relationships, and ensure on-time delivery for our clients.",
        "responsibilities": [
            "Coordinate freight pickups and deliveries across CA",
            "Communicate with carriers and clients daily",
            "Track shipments and resolve delays proactively",
            "Maintain accurate shipping records and documentation",
            "Process bills of lading and shipping manifests",
            "Support the operations team with scheduling and routing"
        ],
        "requirements": [
            "1–3 years of freight/logistics experience",
            "Knowledge of California freight lanes and regulations",
            "Proficiency in TMS or shipping software",
            "Strong communication and problem-solving skills",
            "High school diploma required; Associate's degree preferred",
            "Valid driver's license"
        ],
        "benefits": ["Health & Dental Insurance", "401(k) with match", "Paid Time Off", "Remote Fridays"]
    },
    {
        "id": "shipping-specialist",
        "title": "Shipping Specialist",
        "department": "Operations",
        "type": "Full-Time",
        "location": "San Francisco, CA",
        "salary": "$50,000 – $65,000/yr",
        "posted": "1 week ago",
        "urgent": False,
        "description": "Process and manage outbound shipments for our eCommerce and enterprise clients, ensuring accuracy and speed.",
        "responsibilities": [
            "Process inbound and outbound shipping orders",
            "Prepare shipping labels, documentation, and invoices",
            "Coordinate with warehouse team on packing and dispatch",
            "Resolve shipping exceptions and customer complaints",
            "Audit freight invoices for billing accuracy",
            "Maintain inventory of shipping supplies"
        ],
        "requirements": [
            "2+ years in shipping or warehousing",
            "Experience with FedEx, UPS, and USPS platforms",
            "Attention to detail and accuracy",
            "Ability to lift up to 50 lbs",
            "High school diploma or GED",
            "Bilingual (Spanish) is a plus"
        ],
        "benefits": ["Medical Insurance", "401(k)", "Overtime Pay", "Shift Flexibility"]
    },
    {
        "id": "logistics-dispatcher",
        "title": "Logistics Dispatcher",
        "department": "Dispatch",
        "type": "Full-Time",
        "location": "San Diego, CA",
        "salary": "$52,000 – $68,000/yr",
        "posted": "2 days ago",
        "urgent": True,
        "description": "Dispatch drivers and manage real-time freight movements across our Southern California network.",
        "responsibilities": [
            "Dispatch drivers and monitor real-time delivery status",
            "Optimize routes for efficiency and cost savings",
            "Communicate ETAs to clients and internal teams",
            "Handle driver issues and escalate when needed",
            "Coordinate with 3PL and carrier partners",
            "Log dispatch activities in TMS system"
        ],
        "requirements": [
            "2+ years dispatching experience",
            "Familiarity with Southern CA routes",
            "Strong multitasking and communication skills",
            "Experience with dispatch software (McLeod, Samsara, etc.)",
            "Ability to work rotating shifts including weekends",
            "High school diploma required"
        ],
        "benefits": ["Health Insurance", "Shift Differential Pay", "401(k)", "Paid Vacation"]
    },
    {
        "id": "warehouse-associate",
        "title": "Warehouse Associate",
        "department": "Warehouse",
        "type": "Full-Time",
        "location": "Sacramento, CA",
        "salary": "$42,000 – $52,000/yr",
        "posted": "5 days ago",
        "urgent": False,
        "description": "Support warehouse operations including receiving, sorting, packing, and dispatching freight shipments.",
        "responsibilities": [
            "Receive and verify incoming freight shipments",
            "Sort, label, and stage outbound packages",
            "Operate forklifts and pallet jacks safely",
            "Perform inventory cycle counts",
            "Maintain cleanliness and safety of warehouse floor",
            "Assist with loading and unloading trucks"
        ],
        "requirements": [
            "1+ year warehouse or distribution experience",
            "Forklift certification preferred",
            "Ability to stand for extended periods and lift 75 lbs",
            "Basic computer skills",
            "High school diploma or equivalent",
            "Reliable transportation"
        ],
        "benefits": ["Medical & Dental", "Weekly Pay", "Overtime Available", "Safety Bonuses"]
    },
    {
        "id": "customer-service-rep",
        "title": "Customer Service Representative",
        "department": "Customer Success",
        "type": "Full-Time / Remote",
        "location": "Remote – California",
        "salary": "$45,000 – $58,000/yr",
        "posted": "4 days ago",
        "urgent": False,
        "description": "Provide exceptional support to our freight shipping clients via phone, email, and chat. Resolve inquiries and track shipments on their behalf.",
        "responsibilities": [
            "Handle inbound calls and emails from shipping clients",
            "Track shipments and provide real-time updates",
            "Resolve delivery issues and file claims",
            "Onboard new clients to the EasyShip platform",
            "Document interactions in CRM system",
            "Escalate complex issues to operations team"
        ],
        "requirements": [
            "1–2 years customer service experience",
            "Freight or logistics background is a plus",
            "Excellent verbal and written communication",
            "Proficient in Salesforce or similar CRM",
            "Self-motivated and able to work independently",
            "High school diploma required"
        ],
        "benefits": ["Remote Work", "Health Insurance", "401(k)", "Professional Development Budget"]
    },
    {
        "id": "account-manager",
        "title": "Account Manager – Freight",
        "department": "Sales",
        "type": "Full-Time",
        "location": "Los Angeles, CA",
        "salary": "$70,000 – $90,000/yr + Commission",
        "posted": "1 day ago",
        "urgent": True,
        "description": "Manage and grow a portfolio of freight shipping accounts across California. Build long-term client relationships and drive revenue growth.",
        "responsibilities": [
            "Manage and retain 30–50 active freight accounts",
            "Identify upsell and cross-sell opportunities",
            "Conduct quarterly business reviews with key clients",
            "Collaborate with ops to resolve service issues",
            "Prospect and close new business",
            "Meet monthly revenue and retention targets"
        ],
        "requirements": [
            "3–5 years in freight sales or account management",
            "Proven track record of quota attainment",
            "Knowledge of LTL, FTL, and last-mile shipping",
            "Strong negotiation and presentation skills",
            "Bachelor's degree preferred",
            "Existing book of business is a plus"
        ],
        "benefits": ["Base + Uncapped Commission", "Car Allowance", "Health & Dental", "Stock Options"]
    }
]

# ─── Routes ───────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html', jobs=JOB_ROLES)

@app.route('/job/<job_id>')
def job_detail(job_id):
    job = next((j for j in JOB_ROLES if j['id'] == job_id), None)
    if not job:
        return redirect('/')
    return render_template('index.html', jobs=JOB_ROLES, active_job=job)

@app.route('/api/jobs')
def api_jobs():
    dept   = request.args.get('dept', 'All')
    type_  = request.args.get('type', 'All')
    search = request.args.get('q', '').lower()
    jobs = JOB_ROLES
    if dept != 'All':
        jobs = [j for j in jobs if j['department'] == dept]
    if type_ != 'All':
        jobs = [j for j in jobs if type_ in j['type']]
    if search:
        jobs = [j for j in jobs if search in j['title'].lower() or search in j['department'].lower() or search in j['location'].lower()]
    return jsonify(jobs)

@app.route('/api/apply', methods=['POST'])
def api_apply():
    data = request.get_json()
    required = ['job_id', 'job_title', 'first_name', 'last_name', 'email', 'phone', 'city', 'state', 'experience', 'start_date']
    for field in required:
        if not data.get(field):
            return jsonify({'ok': False, 'error': f'Missing field: {field}'}), 400
    app_id = 'ES-' + str(uuid.uuid4())[:8].upper()
    application = {
        'id': app_id,
        'submitted_at': datetime.now().isoformat(),
        **data
    }
    APPLICATIONS.append(application)
    return jsonify({'ok': True, 'application_id': app_id})

@app.route('/api/complete', methods=['POST'])
def api_complete():
    data = request.get_json()
    app_id   = data.get('application_id')
    gmeet_email = data.get('gmeet_email')
    scheduled   = data.get('scheduled_date')
    for a in APPLICATIONS:
        if a['id'] == app_id:
            a['gmeet_email']    = gmeet_email
            a['scheduled_date'] = scheduled
            a['status']         = 'Interview Scheduled'
            return jsonify({'ok': True})
    return jsonify({'ok': False, 'error': 'Application not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
