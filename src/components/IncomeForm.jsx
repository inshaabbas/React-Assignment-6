

import { useState } from "react";

// Common income sources — users can also type their own
export const INCOME_SOURCES = [
  "Salary",
  "Freelance",
  "Business",
  "Investments",
  "Rental",
  "Gift",
  "Other",
];

export default function IncomeForm({ onSubmit, onCancel, initial = null }) {
  const [form, setForm] = useState({
    source: initial?.source || INCOME_SOURCES[0],
    amount: initial?.amount || "",
    date:   initial?.date   || new Date().toISOString().split("T")[0],
    note:   initial?.note   || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError("Enter a valid amount.");
    if (!form.date) return setError("Date is required.");

    setLoading(true);
    try {
      await onSubmit({
        source: form.source,
        amount: parseFloat(form.amount),
        date:   form.date,
        note:   form.note.trim(),
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Source */}
      <div>
        <label className="section-label block mb-2">Source</label>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="input-base"
        >
          {INCOME_SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Amount + Date row */}
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
          <label className="section-label block mb-2">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="input-base"
          />
        </div>
      </div>

      {/* Note */}
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

      {error && <p className="text-ember-400 text-sm font-body">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost flex-1">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
          {loading ? "Saving…" : initial ? "Update" : "Add Income"}
        </button>
      </div>
    </form>
  );
}
