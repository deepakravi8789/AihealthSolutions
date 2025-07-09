import React from 'react';
import { Phone, Clock, AlertCircle } from 'lucide-react';
import type { EmergencyContact } from '../types';

const emergencyContacts: EmergencyContact[] = [
  { name: "National Emergency Number", number: "112", available: "24/7" },
  { name: "COVID-19 Helpline", number: "1075", available: "24/7" },
  { name: "Health Ministry", number: "1800-112-545", available: "8 AM - 8 PM" },
];

export default function EmergencySection() {
  return (
    <div className="bg-red-50 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
        <h3 className="text-xl font-semibold text-red-700">Emergency Contacts</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 text-red-500 mr-2" />
              <h4 className="font-medium text-gray-900">{contact.name}</h4>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-red-600">{contact.number}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {contact.available}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}