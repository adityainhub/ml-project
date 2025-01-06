import { FormData } from '../types/FormData';

// Replace this with your actual ML model integration
export async function getPredictions(data: FormData) {
  // Convert form data to the format your ML model expects
  const modelInput = {
    numerical_features: {
      Year: parseInt(data.Year),
      Month: parseInt(data.Month),
      Day: parseInt(data.Day),
      Hour: parseInt(data.Hour),
      DEWP: parseFloat(data.DEWP),
      TEMP: parseFloat(data.TEMP),
      PRES: parseFloat(data.PRES),
      INS: parseFloat(data.INS),
      IS: parseFloat(data.IS),
      IR: parseFloat(data.IR),
    },
    boolean_features: {
      NE: data.NE,
      NW: data.NW,
      SE: data.SE,
      CV: data.CV,
    }
  };

  try {
    // Replace this with your actual API endpoint
    const response = await fetch('YOUR_ML_MODEL_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelInput),
    });

    if (!response.ok) {
      throw new Error('Failed to get predictions');
    }

    const predictions = await response.json();
    return predictions;
  } catch (error) {
    console.error('Error getting predictions:', error);
    throw error;
  }
}