export default function WeekdaysRow() {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return (
    <div className="mb-3 grid grid-cols-7 gap-2">
      {days.map((d) => (
        <div key={d} className="py-2 text-center text-xs font-bold text-gray-500 md:text-sm">
          {d}
        </div>
      ))}
    </div>
  );
}
