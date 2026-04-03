# Beacon Freight Solutions

A full-featured freight and logistics management platform built with React.

## Features

- 📦 **Shipment Management** — Create, view, and manage all shipments
- 🗺 **Live Tracking** — Track by shipment ID or container/AWB number
- 💬 **Quote Management** — Request, accept, and reject freight quotes
- 👥 **Customer CRM** — Full customer profiles and history
- 📊 **Analytics** — Revenue, carrier performance, and route analytics
- ⚙️ **Settings** — Company profile, notifications, and security

## Tech Stack

- React 18
- React Router v6
- Recharts (analytics charts)
- Lucide React (icons)

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

### Step 2 — Deploy on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Static Site**
3. Connect your GitHub repository
4. Fill in the settings:
   - **Name:** `beacon-freight-solutions`
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
5. Click **Create Static Site**

Render will auto-deploy on every push to `main`. ✅

---

## 🖥 Run Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

**Demo login:**
- Email: `admin@beaconfreight.ng`
- Password: `demo1234`

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder.
