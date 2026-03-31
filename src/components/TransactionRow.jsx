
import { format, parseISO } from "date-fns";

// Category color mapping — each category gets a soft colored badge
const CATEGORY_COLORS = {
  "Food & Dining":  "bg-amber-900/40 text-amber-300",
  "Transport":      "bg-blue-900/40 text-blue-300",
  "Housing":        "bg-purple-900/40 text-purple-300",
  "Entertainment":  "bg-pink-900/40 text-pink-300",
  "Shopping":       "bg-cyan-900/40 text-cyan-300",
  "Health":         "bg-green-900/40 text-green-300",
  "Education":      "bg-indigo-900/40 text-indigo-300",
  "Utilities":      "bg-orange-900/40 text-orange-300",
  "Travel":         "bg-teal-900/40 text-teal-300",
  "Salary":         "bg-sage-500/20 text-sage-400",
  "Freelance":      "bg-sage-500/20 text-sage-400",
  "Business":       "bg-sage-500/20 text-sage-400",
  "Investments":    "bg-gold-500/20 text-gold-400",
  "Other":          "bg-ink-700/60 text-ink-400",
};

export default function TransactionRow({ item, type, onEdit, onDelete }) {
  // Determine the primary label and badge text
  const label  = type === "expense" ? item.title  : item.source;
  const badge  = type === "expense" ? item.category : item.source;
  const badgeCls = CATEGORY_COLORS[badge] || CATEGORY_COLORS["Other"];

  // Format the date string safely
  let dateStr = "";
  try {
    dateStr = format(parseISO(item.date), "MMM d, yyyy");
  } catch {
    dateStr = item.date;
  }

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-ink-800/50 transition-all duration-150 group animate-fade-up">
      {/* Icon */}
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
        type === "expense" ? "bg-ember-500/15" : "bg-sage-500/15"
      }`}>
        {type === "expense" ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-ember-400">
            <path d="M7 2v10M3 10l4 2 4-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sage-400">
            <path d="M7 12V2M3 4l4-2 4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Label + badge */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-500 text-ink-100 truncate">{label}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`badge text-xs ${badgeCls}`}>{badge}</span>
          <span className="text-xs text-ink-600">{dateStr}</span>
        </div>
        {item.note && (
          <p className="text-xs text-ink-500 mt-0.5 truncate">{item.note}</p>
        )}
      </div>

      {/* Amount */}
      <span className={`font-mono font-500 text-sm flex-shrink-0 ${
        type === "expense" ? "amount-negative" : "amount-positive"
      }`}>
        {type === "expense" ? "−" : "+"}${item.amount.toFixed(2)}
      </span>

      {/* Actions — visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400
                     hover:text-ink-100 hover:bg-ink-700 transition-all duration-150"
          title="Edit"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5l2 2-6.5 6.5H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400
                     hover:text-ember-400 hover:bg-ember-500/10 transition-all duration-150"
          title="Delete"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 3h8M5 3V2h2v1M4.5 5v4M7.5 5v4M3 3l.7 7h4.6L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
