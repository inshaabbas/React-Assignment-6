
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  subscribeToIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../firebase/firestore";

export function useIncome() {
  const { user } = useAuth();
  const [income, setIncome]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToIncome(user.uid, (data) => {
      setIncome(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const add    = (data)     => addIncome(user.uid, data);
  const update = (id, data) => updateIncome(user.uid, id, data);
  const remove = (id)       => deleteIncome(user.uid, id);

  return { income, loading, add, update, remove };
}
