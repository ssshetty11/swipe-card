import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const TestGemini = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testApiKey = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      // Log the API key length for debugging (don't log the actual key)
      console.log('API Key length:', process.env.REACT_APP_GEMINI_API_KEY?.length);

      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Simple test prompt
      const prompt = "Say 'Hello! The API is working!' if you receive this message.";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text);
      console.log('API Response:', text);

    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Gemini API Key Test</h2>
      
      <button
        onClick={testApiKey}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded ${
          isLoading 
            ? 'bg-gray-400' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {isLoading ? 'Testing...' : 'Test API Key'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-semibold">Response:</p>
          <p className="text-sm">{result}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>API Key Info:</p>
        <ul className="list-disc list-inside">
          <li>Length: {process.env.REACT_APP_GEMINI_API_KEY?.length || 0} characters</li>
          <li>Starts with: {process.env.REACT_APP_GEMINI_API_KEY?.slice(0, 2)}...</li>
        </ul>
      </div>
    </div>
  );
};

export default TestGemini; 