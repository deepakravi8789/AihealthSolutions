import React from 'react';
import { AlertTriangle, ThermometerSun, Clock, List, Shield } from 'lucide-react';
import type { SymptomResponse } from '../types';

interface Props {
  analysis: SymptomResponse;
}

const SeverityBadge = ({ severity }: { severity: string }) => {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${colors[severity as keyof typeof colors]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
    </span>
  );
};

export default function Analysis({ analysis }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-heading text-2xl font-semibold text-gray-800">Analysis Results</h3>
        <SeverityBadge severity={analysis.severity} />
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ThermometerSun className="h-6 w-6 text-primary mr-3" />
          <h4 className="font-heading text-xl font-medium text-gray-700">Possible Diagnosis</h4>
        </div>
        <p className="text-gray-600 bg-background p-6 rounded-xl leading-relaxed">{analysis.diagnosis}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-primary mr-3" />
          <h4 className="font-heading text-xl font-medium text-gray-700">When to Consult a Doctor</h4>
        </div>
        <p className="text-gray-600 bg-background p-6 rounded-xl leading-relaxed">{analysis.timeToConsult}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <List className="h-6 w-6 text-primary mr-3" />
            <h4 className="font-heading text-xl font-medium text-gray-700">Common Causes</h4>
          </div>
          <ul className="space-y-3 bg-background p-6 rounded-xl">
            {analysis.commonCauses.map((cause, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
                <span className="text-gray-600">{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-primary mr-3" />
            <h4 className="font-heading text-xl font-medium text-gray-700">Preventive Measures</h4>
          </div>
          <ul className="space-y-3 bg-background p-6 rounded-xl">
            {analysis.preventiveMeasures.map((measure, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
                <span className="text-gray-600">{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-heading text-xl font-medium text-gray-700 mb-4">Recommendations</h4>
        <ul className="space-y-3 bg-background p-6 rounded-xl">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
              <span className="text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <p className="ml-3 text-sm text-yellow-700">
            {analysis.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}