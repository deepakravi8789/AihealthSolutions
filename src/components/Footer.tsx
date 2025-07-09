import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h3 className="ml-2 text-xl font-bold text-gray-900">SwasthyaAI</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered health assistant for preliminary symptom analysis
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Certifications</h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop"
                  alt="HIPAA Certified"
                  className="w-10 h-10 object-contain"
                />
                <span className="ml-3 text-sm text-gray-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=50&h=50&fit=crop"
                  alt="ISO Certified"
                  className="w-10 h-10 object-contain"
                />
                <span className="ml-3 text-sm text-gray-600">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} SwasthyaAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}