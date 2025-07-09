export interface SymptomResponse {
  diagnosis: string;
  recommendations: string[];
  disclaimer: string;
  severity: 'low' | 'medium' | 'high';
  timeToConsult: string;
  commonCauses: string[];
  preventiveMeasures: string[];
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon: React.ComponentType;
  description: string;
}

export interface DoctorTestimonial {
  id: string;
  name: string;
  title: string;
  image: string;
  testimonial: string;
  rating: number;
}