// SectionContainer.jsx
export default function SectionContainer({ title, children }) {
  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 md:text-xl">{title}</h2>
      {children}
    </div>
  );
}
