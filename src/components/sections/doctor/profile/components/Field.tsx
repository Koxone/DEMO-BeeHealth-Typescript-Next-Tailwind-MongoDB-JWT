import { Edit2 } from 'lucide-react';

export default function Field({
  label,
  value,
  isEditing,
  icon: Icon,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  icon?: any;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="group">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          disabled={!isEditing}
          onChange={(e) => onChange?.(e.target.value)}
          className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {isEditing && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Edit2 className="h-4 w-4 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}
