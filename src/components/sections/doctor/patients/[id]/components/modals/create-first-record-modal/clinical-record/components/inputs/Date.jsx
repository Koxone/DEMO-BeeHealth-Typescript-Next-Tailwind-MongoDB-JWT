'use client';

import { useEffect, useState, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input
const CustomInput = forwardRef(function CustomInput({ value, onClick }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 md:py-3"
    />
  );
});

function DateInput({ question, required, value, id, onChange }) {
  // Local state
  const [selectedDate, setSelectedDate] = useState(null);

  // Sync value
  useEffect(() => {
    if (value) {
      setSelectedDate(new window.Date(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Change handler
  const handleChange = (date) => {
    setSelectedDate(date);
    onChange(date ? date.toISOString().split('T')[0] : '');
  };

  return (
    <div className="mb-6 w-full">
      {/* Label */}
      <label className="mb-2 block w-full text-sm font-medium text-gray-700">{question}</label>

      {/* Date picker */}
      <ReactDatePicker
        id={id}
        selected={selectedDate}
        onChange={handleChange}
        locale={es}
        required={required}
        dateFormat="dd-MM-yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={<CustomInput />}
        popperPlacement="bottom-start"
        popperClassName="scale-120"
      />
    </div>
  );
}

export default DateInput;
