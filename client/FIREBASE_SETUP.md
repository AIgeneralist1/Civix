# 🔥 Civix — Firebase Production Setup Guide

## Overview
This app uses **Firebase** for:
- **Authentication** — Email/password sign-up & sign-in
- **Firestore** — Database for questions, briefs, sources, and user attempts
- **Firebase Hosting** — Production deployment

---

## Step 1 — Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → Enter project name (e.g. `civix-upsc`) → Continue
3. Disable Google Analytics (optional) → **Create project**

---

## Step 2 — Enable Authentication

1. In Firebase Console → **Build → Authentication**
2. Click **"Get started"**
3. Under **"Sign-in method"**, enable **Email/Password**
4. Save

---

## Step 3 — Enable Firestore

1. In Firebase Console → **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** → Select your region → Enable
4. Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Attempts: only the owning user
    match /attempts/{docId} {
      allow read, write: if request.auth != null
        && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid;
    }

    // Questions, Briefs, Sources: read-only for authenticated users
    match /questions/{docId} {
      allow read: if request.auth != null;
      allow write: if false; // only writable via seed script or Admin SDK
    }
    match /briefs/{docId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /sources/{docId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

5. Click **Publish**

---

## Step 4 — Register a Web App

1. Firebase Console → Project Overview → Click **"</>  Web"** icon
2. Register app name (e.g. `civix-web`)
3. Copy the `firebaseConfig` object values

---

## Step 5 — Add Environment Variables

Edit `client/.env.local` with your copied values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=civix-upsc.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=civix-upsc
VITE_FIREBASE_STORAGE_BUCKET=civix-upsc.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

> ⚠️ `.env.local` is gitignored — never commit it.

---

## Step 6 — Seed the Database

This uploads all questions, briefs, and sources to Firestore:

```bash
cd client
npm install tsx dotenv   # one-time install
npm run seed
```

You should see:
```
✓ source: The Hindu
✓ brief: Finance Commission consultations...
✓ question: q1 [Polity]
...
✅ Seed complete!
```

---

## Step 7 — Run Locally

```bash
npm run dev
```

Visit [http://localhost:5174](http://localhost:5174) — sign up with any email, and the app is fully live with Firestore.

---

## Step 8 — Deploy to Firebase Hosting

### Install Firebase CLI (one-time)
```bash
npm install -g firebase-tools
firebase login
```

### Update `.firebaserc`
```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

### Deploy
```bash
npm run deploy
```

Your app will be live at:
```
https://your-project-id.web.app
```

---

## Architecture Summary

```
Browser (React SPA)
  │
  ├── Firebase Auth ──── Email/password sign-up, sign-in, session persistence
  │
  └── Firestore DB
        ├── /questions     ← read-only for users, writable via seed
        ├── /briefs        ← read-only for users
        ├── /sources       ← read-only for users
        ├── /attempts      ← each user writes their own quiz attempts
        └── /users         ← user profile (name, email, createdAt)
```

---

## Security Model

| Rule | Detail |
|------|--------|
| Auth required for all reads | Unauthenticated users see nothing |
| Users own their data | `/attempts` and `/users` scoped to `request.auth.uid` |
| Content is admin-only write | Questions/briefs/sources only writable via seed script |
| Env vars for API keys | Keys never hardcoded — read from `.env.local` |
| Security headers | X-Frame-Options, X-XSS-Protection, no-sniff via `firebase.json` |
| Password via Firebase | bcrypt-equivalent hashing handled by Firebase Auth |

---

## Adding More Content

To add new questions or briefs in future:
1. Update `src/data.ts`
2. Run `npm run seed` again (it uses `setDoc` which upserts safely)
