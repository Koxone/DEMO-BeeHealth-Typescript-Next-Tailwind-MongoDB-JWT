// SectionContainer.jsx
export default function SectionContainer({ title, children }) {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{title}</h2>
      {children}
    </div>
  );
}
