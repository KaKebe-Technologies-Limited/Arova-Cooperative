import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";
import { Quote } from "lucide-react";

const FoundersMessage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);

  return (
    <div className="py-24 bg-emerald-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          {/* FLAT SECTION WITH A THEME-COLORED LEFT ACCENT BAR */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 relative">
            {/* Accent bar using theme color */}
            <div
              className="absolute left-0 top-0 h-full w-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            ></div>

            {/* SQUARE IMAGE */}
            <div className="shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                  alt="Brenda Komagum"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="flex-1 text-center md:text-left pl-4 md:pl-10">
              <Quote
                size={48}
                className="mb-6 opacity-40 mx-auto md:mx-0"
                style={{ color: primaryColor }}
              />

              <h2 className="text-2xl md:text-3xl font-medium italic text-gray-800 mb-8 leading-relaxed">
                "Our journey began with just 15 women and a shared dream under a
                tree. Today, Arova stands as a testament to what is possible
                when we lead with humanity, transparency, and a commitment to
                lifting one another out of poverty."
              </h2>

              <div>
                <h4 className="font-bold text-2xl text-gray-900 mb-1">
                  Brenda Komagum
                </h4>
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: primaryColor }}
                >
                  Founder & General Manager
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default FoundersMessage;
