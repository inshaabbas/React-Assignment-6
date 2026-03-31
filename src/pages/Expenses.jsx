
import { useState, useMemo } from "react";
import { useExpenses }       from "../hooks/useExpenses";
import Modal                 from "../components/Modal";
import ExpenseForm, { EXPENSE_CATEGORIES } from "../components/ExpenseForm";
import TransactionRow        from "../components/TransactionRow";

export default function Expenses() {
  const { expenses, loading, add, update, remove } = useExpenses();

  const [showAdd,      setShowAdd]      = useState(false); 
  const [editingItem,  setEditingItem]  = useState(null);  
  const [filterCat,    setFilterCat]    = useState("All"); 
  const [confirmDel,   setConfirmDel]   = useState(null);  

  const filtered = useMemo(() => {
    if (filterCat === "All") return expenses;
    return expenses.filter((e) => e.category === filterCat);
  }, [expenses, filterCat]);

  const filteredTotal = useMemo(
    () => filtered.reduce((s, e) => s + e.amount, 0),
    [filtered]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAdd = async (data) => {
    await add(data);
    setShowAdd(false);
  };

  const handleUpdate = async (data) => {
    await update(editingItem.id, data);
    setEditingItem(null);
  };

  const handleDelete = async () => {
    if (!confirmDel) return;
    await remove(confirmDel);
    setConfirmDel(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-ink-700 border-t-ink-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Expenses</h1>
          <p className="text-ink-500 text-sm mt-1">
            {expenses.length} transaction{expenses.length !== 1 ? "s" : ""} · Total{" "}
            <span className="text-ember-400 font-mono">
              ${filteredTotal.toFixed(2)}
            </span>
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex-shrink-0">
          + Add Expense
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 animate-fade-up">
        {["All", ...EXPENSE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-500 transition-all duration-150 ${
              filterCat === cat
                ? "bg-ink-100 text-ink-950"
                : "bg-ink-800 text-ink-400 hover:text-ink-200 hover:bg-ink-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expense list */}
      <div className="card divide-y divide-ink-800/60 animate-fade-up">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-ink-800 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-ink-500">
                <path d="M10 4v12M4 10l6 2 6-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-ink-400 font-body">No expenses found.</p>
            <p className="text-ink-600 text-sm mt-1">
              {filterCat !== "All" ? "Try a different filter." : "Add your first expense above."}
            </p>
          </div>
        ) : (
          <div className="stagger">
            {filtered.map((item) => (
              <TransactionRow
                key={item.id}
                item={item}
                type="expense"
                onEdit={setEditingItem}
                onDelete={setConfirmDel}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Add Expense Modal ── */}
      {showAdd && (
        <Modal title="Add Expense" onClose={() => setShowAdd(false)}>
          <ExpenseForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
        </Modal>
      )}

      {/* ── Edit Expense Modal ── */}
      {editingItem && (
        <Modal title="Edit Expense" onClose={() => setEditingItem(null)}>
          <ExpenseForm
            initial={editingItem}
            onSubmit={handleUpdate}
            onCancel={() => setEditingItem(null)}
          />
        </Modal>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {confirmDel && (
        <Modal title="Delete Expense" onClose={() => setConfirmDel(null)}>
          <p className="text-ink-300 text-sm mb-6">
            Are you sure you want to delete this expense? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmDel(null)} className="btn-ghost flex-1">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-ember-500 text-white font-display font-600 text-sm
                         px-5 py-2.5 rounded-xl hover:bg-ember-600 transition-all duration-200 active:scale-95"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
