

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// ── Helpers to build collection references ───────────────────────────────────

// Returns a reference to a user's expenses subcollection
const expensesRef = (userId) =>
  collection(db, "users", userId, "expenses");

// Returns a reference to a user's income subcollection
const incomeRef = (userId) =>
  collection(db, "users", userId, "income");

// ── Expenses ─────────────────────────────────────────────────────────────────

// Add a new expense document
export const addExpense = (userId, data) =>
  addDoc(expensesRef(userId), {
    ...data,
    createdAt: serverTimestamp(), // server-side timestamp for ordering
  });

// Update an existing expense by its document ID
export const updateExpense = (userId, expenseId, data) =>
  updateDoc(doc(db, "users", userId, "expenses", expenseId), data);

// Delete an expense by its document ID
export const deleteExpense = (userId, expenseId) =>
  deleteDoc(doc(db, "users", userId, "expenses", expenseId));

// Subscribe to real-time updates for a user's expenses (ordered by date desc)
// Returns an unsubscribe function — call it in useEffect cleanup
export const subscribeToExpenses = (userId, callback) => {
  const q = query(expensesRef(userId), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const expenses = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(expenses);
  });
};

// ── Income ───────────────────────────────────────────────────────────────────

// Add a new income document
export const addIncome = (userId, data) =>
  addDoc(incomeRef(userId), {
    ...data,
    createdAt: serverTimestamp(),
  });

// Update an existing income document
export const updateIncome = (userId, incomeId, data) =>
  updateDoc(doc(db, "users", userId, "income", incomeId), data);

// Delete an income document
export const deleteIncome = (userId, incomeId) =>
  deleteDoc(doc(db, "users", userId, "income", incomeId));

// Subscribe to real-time updates for a user's income (ordered by date desc)
export const subscribeToIncome = (userId, callback) => {
  const q = query(incomeRef(userId), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const income = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(income);
  });
};
