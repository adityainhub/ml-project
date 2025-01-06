import React from 'react';
import { FormData } from '../types/FormData';

interface Props {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const numericalFields = [
  { name: 'Year', label: 'Year' },
  { name: 'Month', label: 'Month (1-12)' },
  { name: 'Day', label: 'Day (1-31)' },
  { name: 'Hour', label: 'Hour (0-23)' },
  { name: 'DEWP', label: 'Dew Point' },
  { name: 'TEMP', label: 'Temperature' },
  { name: 'PRES', label: 'Pressure' },
  { name: 'INS', label: 'Insolation' },
  { name: 'IS', label: 'IS Value' },
  { name: 'IR', label: 'IR Value' },
];

export function NumericalInputs({ formData, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Numerical Features</h2>
      {numericalFields.map(({ name, label }) => (
        <div key={name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type="number"
            name={name}
            value={formData[name as keyof FormData]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))}
    </div>
  );
}