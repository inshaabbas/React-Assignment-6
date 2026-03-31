

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  subscribeToExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../firebase/firestore";

export function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToExpenses(user.uid, (data) => {
      setExpenses(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);


  const add    = (data)              => addExpense(user.uid, data);
  const update = (id, data)          => updateExpense(user.uid, id, data);
  const remove = (id)                => deleteExpense(user.uid, id);

  return { expenses, loading, add, update, remove };
}
