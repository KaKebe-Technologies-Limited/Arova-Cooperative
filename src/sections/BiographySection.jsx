import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";

const BiographySection = () => {
  const { resolvedHex, getThemeClass, primaryColor } = useContext(ThemeContext);

  return (
    <div className="py-24 bg-white overflow-hidden relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-100 rounded-full z-0"></div>
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 z-0"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80"
                alt="Arova History"
                className="relative z-10 rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute bottom-10 left-10 z-20 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                <p className="text-gray-800 font-bold text-lg">
                  "15 Women. One Tree. A Vision for Change."
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div>
              <div
                className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${
                  !resolvedHex
                    ? `${getThemeClass("bg", "100")} ${getThemeClass(
                        "text",
                        "600",
                      )}`
                    : ""
                }`}
                style={
                  resolvedHex ? { backgroundColor: `${resolvedHex}20` } : {}
                }
              >
                Who We Are
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                From Humble Beginnings to Regional Impact
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                In 2008, Arova Producers and Cooperative Sacco was born from the
                shared dream of 15 women. Gathering under a tree in a member's
                compound, they pooled their small savings to create
                opportunities where none existed.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Today, that small circle has expanded to over 19,000 members
                across the Lango Sub-region. We are permanently registered
                (Reg.No 12064/RCS) and dedicated to eradicating poverty through
                value addition and financial empowerment.
              </p>
              <Link to="/about">
                <button
                  style={{ backgroundColor: primaryColor }}
                  className={`text-white px-8 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2 ${
                    !resolvedHex ? getThemeClass("bg", "600") : ""
                  }`}
                >
                  Read Full Story <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default BiographySection;
