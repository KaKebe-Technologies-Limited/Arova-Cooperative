import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import RevealOnScroll from "../components/RevealOnScroll";

const AboutPage = () => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

  return (
    <div className="bg-white">
      <div className="relative h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=1600&h=900&fit=crop"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Journey</h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-xl md:text-2xl text-gray-200">
              From 15 women under a tree to a regional force for change.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <div
                style={{
                  color: primaryColor,
                  backgroundColor: `${primaryColor}20`,
                }}
                className="d-inline-block rounded-full py-1 px-4 mb-4 font-semibold text-sm"
              >
                History
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Milestones of Progress
              </h1>
            </div>
          </RevealOnScroll>

          <div
            className="space-y-12 border-l-2 ml-4 md:ml-0 md:pl-0"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="md:w-32 md:text-right shrink-0 relative z-10">
                  <span
                    style={{ color: primaryColor }}
                    className="text-3xl font-bold block bg-white md:pl-4 py-2"
                  >
                    2008
                  </span>
                </div>
                <div
                  style={{ backgroundColor: primaryColor }}
                  className="absolute left-[-9px] top-4 w-4 h-4 rounded-full border-4 border-white md:hidden"
                ></div>
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    The Beginning
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    In 2008, a group of 15 women... decided to form a small
                    savings group...{" "}
                    <span
                      style={{ color: primaryColor }}
                      className="font-semibold"
                    >
                      They had all their activities under a tree
                    </span>
                    ...
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="md:w-32 md:text-right shrink-0 relative z-10">
                  <span
                    style={{ color: primaryColor }}
                    className="text-3xl font-bold block bg-white md:pl-4 py-2"
                  >
                    2024
                  </span>
                </div>
                <div
                  style={{ backgroundColor: primaryColor }}
                  className="absolute left-[-9px] top-4 w-4 h-4 rounded-full border-4 border-white md:hidden"
                ></div>
                <div
                  style={{ backgroundColor: primaryColor }}
                  className="flex-1 text-white p-8 rounded-2xl shadow-xl"
                >
                  <h3 className="text-xl font-bold mb-4">
                    Permanent Registration
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Arova was permanently registered with the Ministry of
                    Trade... serving over 19,000 clients.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
