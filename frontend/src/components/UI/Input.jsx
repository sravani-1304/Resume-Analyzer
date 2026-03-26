import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon = null,
  required = false,
  disabled = false,
  rows = null
}) => {
  const baseClasses = `
    w-full px-4 py-3 border rounded-xl 
    focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
    outline-none transition-all duration-200
    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {rows ? (
          <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClasses} ${icon ? 'pl-10' : ''}`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClasses} ${icon ? 'pl-10' : ''}`}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;