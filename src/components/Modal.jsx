

export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      {/* Stop click propagation so clicking inside the modal doesn't close it */}
      <div
        className="card w-full max-w-md p-6 animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-700 text-lg text-ink-50">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400
                       hover:text-ink-100 hover:bg-ink-800 transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
