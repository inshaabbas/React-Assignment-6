
import React from "react";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useExpenses } from "../hooks/useExpenses";
import { useIncome }   from "../hooks/useIncome";
import { useAuth }     from "../context/AuthContext";

function StatCard({ label, value, trend, color }) {
  return (
    <div className={`card p-5 relative overflow-hidden animate-fade-up`}>
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${color}`} />
      <p className="section-label mb-3">{label}</p>
      <p className={`font-display font-700 text-2xl sm:text-3xl tracking-tight ${
        value < 0 ? "text-ember-400" : "text-ink-50"
      }`}>
        ${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      {trend !== undefined && (
        <p className="text-xs text-ink-500 mt-1 font-body">
          {trend} transactions
        </p>
      )}
    </div>
  );
}

function RecentRow({ item, type }) {
  const label  = type === "expense" ? item.title  : item.source;
  const amount = item.amount.toFixed(2);
  let dateStr  = "";
  try { dateStr = format(parseISO(item.date), "MMM d"); } catch { dateStr = item.date; }

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-ink-800/60 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
          type === "expense" ? "bg-ember-400" : "bg-sage-400"
        }`} />
        <span className="text-sm text-ink-200 font-body">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-ink-500">{dateStr}</span>
        <span className={`font-mono text-sm ${
          type === "expense" ? "text-ember-400" : "text-sage-400"
        }`}>
          {type === "expense" ? "−" : "+"}${amount}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({ setActiveTab }) {
  const { user }              = useAuth();
  const { expenses, loading: expLoading } = useExpenses();
  const { income,   loading: incLoading } = useIncome();

  const firstName = user?.displayName?.split(" ")[0] || "there";

  // Calculate summary totals
  const totalIncome   = useMemo(() => income.reduce((s, i) => s + i.amount, 0),   [income]);
  const totalExpenses = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const balance       = totalIncome - totalExpenses;

  // Merge and sort recent transactions (last 5)
  const recentTransactions = useMemo(() => {
    const all = [
      ...expenses.map((e) => ({ ...e, type: "expense" })),
      ...income.map((i)   => ({ ...i, type: "income"  })),
    ];
    return all
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 8);
  }, [expenses, income]);

  // Spending by category
  const byCategory = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [expenses]);

  const loading = expLoading || incLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-ink-700 border-t-ink-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="animate-fade-up">
        <h1 className="font-display font-700 text-2xl text-ink-50">
          Good day, {firstName}
        </h1>
        <p className="text-ink-500 text-sm mt-1 font-body">
          Here's your financial overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
        <StatCard
          label="Current Balance"
          value={balance}
          color={balance >= 0 ? "bg-sage-500" : "bg-ember-500"}
        />
        <StatCard
          label="Total Income"
          value={totalIncome}
          trend={income.length}
          color="bg-sage-500"
        />
        <StatCard
          label="Total Expenses"
          value={totalExpenses}
          trend={expenses.length}
          color="bg-ember-500"
        />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent transactions */}
        <div className="card p-5 lg:col-span-3 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-600 text-ink-100">Recent Activity</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("expenses")}
                className="text-xs text-ink-400 hover:text-ink-200 transition-colors"
              >
                Expenses →
              </button>
              <span className="text-ink-700">|</span>
              <button
                onClick={() => setActiveTab("income")}
                className="text-xs text-ink-400 hover:text-ink-200 transition-colors"
              >
                Income →
              </button>
            </div>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-ink-500 text-sm">No transactions yet.</p>
              <p className="text-ink-600 text-xs mt-1">Add income or expenses to get started.</p>
            </div>
          ) : (
            <div className="stagger">
              {recentTransactions.map((t) => (
                <RecentRow key={`${t.type}-${t.id}`} item={t} type={t.type} />
              ))}
            </div>
          )}
        </div>

        {/* Top spending categories */}
        <div className="card p-5 lg:col-span-2 animate-fade-up">
          <h2 className="font-display font-600 text-ink-100 mb-4">Top Categories</h2>

          {byCategory.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-ink-500 text-sm">No expenses yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {byCategory.map(([cat, amt]) => {
                const pct = totalExpenses > 0 ? (amt / totalExpenses) * 100 : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-ink-300 font-body">{cat}</span>
                      <span className="font-mono text-xs text-ember-400">
                        ${amt.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ember-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
