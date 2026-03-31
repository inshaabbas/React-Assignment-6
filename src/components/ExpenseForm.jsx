

import { useState } from "react";

// Available expense categories
export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Housing",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Utilities",
  "Travel",
  "Other",
];

export default function ExpenseForm({ onSubmit, onCancel, initial = null }) {
  // Pre-fill fields if editing an existing expense
  const [form, setForm] = useState({
    title:    initial?.title    || "",
    amount:   initial?.amount   || "",
    category: initial?.category || EXPENSE_CATEGORIES[0],
    date:     initial?.date     || new Date().toISOString().split("T")[0],
    note:     initial?.note     || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError("Enter a valid amount.");
    if (!form.date) return setError("Date is required.");

    setLoading(true);
    try {
      await onSubmit({
        title:    form.title.trim(),
        amount:   parseFloat(form.amount),   // store as number
        category: form.category,
        date:     form.date,
        note:     form.note.trim(),
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="section-label block mb-2">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Grocery run"
          className="input-base"
        />
      </div>

      {/* Amount + Category row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="section-label block mb-2">Amount</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="input-base"
          />
        </div>
        <div>
          <label className="section-label block mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input-base"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="section-label block mb-2">Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* Note (optional) */}
      <div>
        <label className="section-label block mb-2">Note <span className="normal-case text-ink-600">(optional)</span></label>
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Any extra details…"
          className="input-base"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-ember-400 text-sm font-body">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost flex-1">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
          {loading ? "Saving…" : initial ? "Update" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
