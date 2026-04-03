# Beacon Freight Solutions 🚢

A full-featured freight and logistics management platform built with **Python (Flask)**.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Hero, features, login & register |
| Dashboard | `/dashboard` | Stats, revenue chart, activity feed |
| Shipments | `/shipments` | Full table, search, filters, detail modal |
| Tracking | `/tracking` | Track by ID/AWB with milestone timeline |
| Quotes | `/quotes` | Quote cards with accept/reject workflow |
| Customers | `/customers` | CRM cards with detail modal |
| Analytics | `/analytics` | Charts: revenue, mode, transit, customers |
| Settings | `/settings` | Company profile, notifications, security |

## Tech Stack

- **Python 3.12** + **Flask 3.0**
- **Gunicorn** (production WSGI server)
- **Chart.js 4** (analytics charts)
- Vanilla JS + Jinja2 templates
- No database required (data in `data.py`)

---

## 🚀 Deploy to Render

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Beacon Freight Solutions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beacon-freight.git
git push -u origin main
```

### Step 2 — Create Web Service on Render

1. Go to [render.com](https://render.com) → **New +** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name:** `beacon-freight-solutions`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2`
4. Click **Create Web Service** ✅

Render auto-deploys on every push to `main`.

---

## 🖥 Run Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

Open [http://localhost:5000](http://localhost:5000)

**Demo login:**
- Email: `admin@beaconfreight.ng`
- Password: `demo1234`

---

## File Structure

```
beacon-freight/
├── app.py              # Flask routes & API
├── data.py             # Mock shipment/customer data
├── requirements.txt    # Python dependencies
├── Procfile            # Gunicorn start command
├── render.yaml         # Render deployment config
├── runtime.txt         # Python version
└── templates/
    ├── base.html       # CSS design system + JS utilities
    ├── landing.html    # Public landing + auth page
    └── app.html        # Dashboard shell + all page JS
```
