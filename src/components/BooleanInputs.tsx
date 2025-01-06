import React from 'react';
import { FormData } from '../types/FormData';

interface Props {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const booleanFields = [
  { name: 'NE', label: 'North East' },
  { name: 'NW', label: 'North West' },
  { name: 'SE', label: 'South East' },
  { name: 'CV', label: 'CV Value' },
];

export function BooleanInputs({ formData, handleInputChange, isLoading }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Boolean Features</h2>
      {booleanFields.map(({ name, label }) => (
        <div key={name} className="flex items-center gap-3">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={formData[name as keyof FormData]}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        </div>
      ))}
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
        }`}
      >
        {isLoading ? 'Predicting...' : 'Predict'}
      </button>
    </div>
  );
}