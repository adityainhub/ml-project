import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { NumericalInputs } from './NumericalInputs';
import { BooleanInputs } from './BooleanInputs';
import { ModelPredictions } from './ModelPredictions';
import { FormData } from '../types/FormData';
import { getPredictions } from '../services/mlservice';

const initialFormData: FormData = {
  // Numerical features4
  Year: new Date().getFullYear().toString(),
  Month: (new Date().getMonth() + 1).toString(),
  Day: new Date().getDate().toString(),
  Hour: new Date().getHours().toString(),
  DEWP: "0",
  TEMP: "0",
  PRES: "0",
  INS: "0",
  IS: "0",
  IR: "0",
  // Boolean features
  NE: false,
  NW: false,
  SE: false,
  CV: false
};

export default function MLForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [predictions, setPredictions] = useState<Record<string, number>>({
    model1: 0,
    model2: 0,
    model3: 0,
    model4: 0,
    model5: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const modelPredictions = await getPredictions(formData);
      setPredictions(modelPredictions);
      setShowResults(true);
    } catch (err) {
      setError('Failed to get predictions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Weather Prediction Model</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NumericalInputs formData={formData} handleInputChange={handleInputChange} />
            <BooleanInputs 
              formData={formData} 
              handleInputChange={handleInputChange}
              isLoading={isLoading} 
            />
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {showResults && <ModelPredictions predictions={predictions} />}
      </div>
    </div>
  );
}