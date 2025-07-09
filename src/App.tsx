import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stethoscope, Brain, MessageCircle } from 'lucide-react';
import SymptomForm from './components/SymptomForm';
import Analysis from './components/Analysis';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import type { SymptomResponse, GeminiResponse } from './types';

const GEMINI_API_KEY = 'AIzaSyA8_X6GxA1fApQCrLbuP_fYtBMUZbrTQqU';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const analyzeSymptoms = async (symptoms: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Act as an experienced medical professional and analyze the following symptoms. Provide a detailed analysis in JSON format with the following structure:
      {
        "diagnosis": "detailed diagnosis explaining the possible condition",
        "severity": "low|medium|high",
        "timeToConsult": "advice on when to seek medical attention",
        "commonCauses": ["cause1", "cause2", "cause3"],
        "preventiveMeasures": ["measure1", "measure2", "measure3"],
        "recommendations": ["detailed recommendation1", "detailed recommendation2"],
        "disclaimer": "medical disclaimer"
      }

      Respond ONLY with the JSON object, no additional text or formatting. Here are the symptoms: ${symptoms}`;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from AI');
      }

      let analysisText = data.candidates[0].content.parts[0].text;
      
      // More robust JSON extraction
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not find valid JSON in the response');
      }

      try {
        const analysisData: SymptomResponse = JSON.parse(jsonMatch[0]);
        
        // Validate required fields
        if (!analysisData.diagnosis || !analysisData.severity || !analysisData.timeToConsult) {
          throw new Error('Missing required fields in analysis');
        }
        
        setAnalysis(analysisData);
      } catch (parseError) {
        console.error('Raw response:', analysisText);
        throw new Error('Failed to parse analysis results');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze symptoms');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">AiHealthSolution</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">How it Works</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Symptom Form and Analysis */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-white py-20 sm:py-32">
          <div className="absolute inset-0 dna-bg"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Check Your Symptoms Instantly
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                AI-powered health assistant to understand your symptoms and get instant preliminary analysis
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <SymptomForm onSubmit={analyzeSymptoms} isLoading={isLoading} />
            </motion.div>

            {/* Error and Analysis Results */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto px-4 mb-8"
              >
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                  <p className="text-red-700">{error}</p>
                </div>
              </motion.div>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <Analysis analysis={analysis} />
              </motion.div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Describe Symptoms</h3>
                <p className="text-gray-600">Tell us about your symptoms in detail for better analysis</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
                <p className="text-gray-600">Our AI analyzes your symptoms and provides instant insights</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Recommendations</h3>
                <p className="text-gray-600">Receive personalized health recommendations and next steps</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
          <div className="absolute inset-0 wave-bg"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Stay Updated with Health Tips</h2>
              <div className="max-w-md mx-auto">
                <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="bg-white text-primary px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;