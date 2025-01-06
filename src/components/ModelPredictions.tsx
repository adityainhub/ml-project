import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Props {
  predictions: Record<string, number>;
}

export function ModelPredictions({ predictions }: Props) {
  const getBestModel = () => {
    const entries = Object.entries(predictions);
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        Model Predictions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(predictions).map(([model, value]) => (
          <div
            key={model}
            className={`p-4 rounded-lg ${
              model === getBestModel()
                ? 'bg-indigo-100 border-2 border-indigo-500'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">{model}</h3>
              {model === getBestModel() && (
                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                  Best Model
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(value * 100).toFixed(2)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${value * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}