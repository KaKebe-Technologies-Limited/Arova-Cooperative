import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Quote } from "lucide-react";
import { testimonialsData } from "../data/siteData";
import RevealOnScroll from "../components/RevealOnScroll";

const TestimonialsSection = () => {
  const { resolvedHex, getThemeClass, primaryColor } = useContext(ThemeContext);

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div
            className="text-center mb-16"
            style={{ maxWidth: "600px", margin: "0 auto 4rem auto" }}
          >
            <div
              style={{ color: primaryColor }}
              className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                !resolvedHex ? getThemeClass("text", "600") : ""
              }`}
            >
              Testimonials
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted By Thousands
            </h2>
            <p className="text-gray-600">
              See what our members and partners say about the impact of Arova in
              their daily lives.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <RevealOnScroll key={item.id} delay={idx * 150}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 relative h-full flex flex-col">
                <Quote
                  className="absolute top-6 right-6 text-gray-200"
                  size={48}
                />
                <p className="text-gray-600 mb-6 italic relative z-10 flex-grow">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm" style={{ color: primaryColor }}>
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
