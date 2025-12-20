function Textarea({ question, required, value, id, onChange, placeholder }) {
  return (
    <div className="col-span-2 mb-6 w-full">
      <label className="mb-2 block w-full text-sm font-medium text-gray-700">{question}</label>
      <textarea
        id={id}
        required={required}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
      />
    </div>
  );
}

export default Textarea;
