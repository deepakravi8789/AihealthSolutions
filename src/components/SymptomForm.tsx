import React, { useState } from 'react';
import { Stethoscope, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (symptoms: string) => Promise<void>;
  isLoading: boolean;
}

export default function SymptomForm({ onSubmit, isLoading }: Props) {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symptoms);
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label 
            htmlFor="symptoms" 
            className="block font-heading text-2xl font-semibold text-gray-800 mb-4"
          >
            Describe Your Symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200 text-lg"
            rows={6}
            placeholder="Example: I've been experiencing a persistent headache for the last 2 days, concentrated in the front of my head. The pain intensifies with movement and is accompanied by mild nausea..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary text-white py-4 px-8 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:bg-primary/70 flex items-center justify-center gap-3 text-lg shadow-lg shadow-primary/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Stethoscope className="w-6 h-6" />
                Start Diagnosis
              </>
            )}
          </button>
          
          <button
            type="button"
            className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
          >
            Learn More
          </button>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-primary/80">
              Provide detailed information about your symptoms, including when they started, severity, and any relevant medical history. This helps our AI provide more accurate insights.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}