'use client';

/* header */
export default function ModalHeader({ title, subtitle, onClose, icons }) {
  const { X, FileText } = icons;

  return (
    <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-6">
      {/* glow */}
      <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl" />
      {/* bar */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-beehealth-body-main/20 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-sm text-blue-100">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-beehealth-body-main/20 hover:bg-beehealth-body-main/30 rounded-xl p-2 backdrop-blur-sm transition active:scale-95"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
