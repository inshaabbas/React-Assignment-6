# 💰 Ledger — Expense Tracker

A professional, full-stack expense tracker built with **React + Vite**, **Firebase Auth**, **Firestore**, and **Tailwind CSS**.

---

## 📁 Folder Structure

```
expense-tracker/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── firestore.rules           ← Paste into Firebase Console
├── src/
│   ├── main.jsx              ← App entry point
│   ├── App.jsx               ← Router + AuthProvider
│   ├── index.css             ← Global styles + Tailwind
│   ├── firebase/
│   │   ├── config.js         ← ⚠️ YOUR FIREBASE CONFIG GOES HERE
│   │   ├── auth.js           ← Auth helpers (signUp, signIn, logOut)
│   │   └── firestore.js      ← CRUD helpers for expenses/income
│   ├── context/
│   │   └── AuthContext.jsx   ← Global auth state via React Context
│   ├── hooks/
│   │   ├── useExpenses.js    ← Real-time expenses subscription
│   │   └── useIncome.js      ← Real-time income subscription
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── Navbar.jsx
│   │   ├── Modal.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── IncomeForm.jsx
│   │   └── TransactionRow.jsx
│   └── pages/
│       ├── Login.jsx
│       ├── DashboardLayout.jsx
│       ├── Dashboard.jsx
│       ├── Expenses.jsx
│       └── Income.jsx
```

---

## 🔥 Firebase Setup (Step-by-Step)

### Step 1 — Create a Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → name it `expense-tracker` → click through setup
3. Disable Google Analytics if you want (optional)

### Step 2 — Register a Web App
1. In the project dashboard, click the **`</>`** (Web) icon
2. Give it a nickname like `expense-tracker-web`
3. Click **"Register app"**
4. Copy the `firebaseConfig` object shown — you'll need it in Step 5

### Step 3 — Enable Authentication
1. In the left sidebar: **Authentication** → **Get started**
2. Click **Sign-in method** tab
3. Enable **Email/Password** → click Save
4. (Optional) Enable **Google** → set support email → Save

### Step 4 — Enable Firestore
1. In the left sidebar: **Firestore Database** → **Create database**
2. Choose **"Start in test mode"** for development
3. Select a region close to you → click **Enable**

### Step 5 — Add Your Firebase Config
Open `src/firebase/config.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey:            "your-actual-api-key",
  authDomain:        "your-project-id.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId:             "your-app-id",
};
```

### Step 6 — Set Firestore Security Rules
1. In Firestore → **Rules** tab
2. Replace everything with the contents of `firestore.rules`
3. Click **Publish**

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Auth | Email/Password + Google Sign-In |
| 🛡️ Protected routes | Unauthenticated users redirected to /login |
| 📊 Dashboard | Balance, income total, expense total |
| 📈 Recent activity | Last 8 transactions across all types |
| 🍕 Category chart | Top spending categories with progress bars |
| ➕ Add Expense | Title, amount, category, date, note |
| ✏️ Edit Expense | Full edit via modal |
| 🗑️ Delete Expense | Confirmation dialog before delete |
| ➕ Add Income | Source, amount, date, note |
| ✏️ Edit Income | Full edit via modal |
| 🔍 Filter | Filter expenses by category / income by source |
| ⚡ Real-time | Firestore `onSnapshot` — changes appear instantly |
| 🔒 Data isolation | Each user sees only their own data |
| 📱 Responsive | Mobile-friendly layout |

---

## 🗄️ Firestore Data Structure

```
users/
  {userId}/
    expenses/
      {expenseId}: { title, amount, category, date, note, createdAt }
    income/
      {incomeId}: { source, amount, date, note, createdAt }
```

---

## 🎨 Design System

- **Font**: Syne (display) + DM Sans (body) + DM Mono (numbers)
- **Theme**: Dark — ink palette with sage (green) for income, ember (orange-red) for expenses
- **Colors**: `ink-*` (neutral dark), `sage-*` (income), `ember-*` (expenses), `gold-*` (accents)
