import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { teamData, executivesData } from "../data/siteData";
import RevealOnScroll from "../components/RevealOnScroll";
import { adjustColor } from "../ThemeContext";

const TeamPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= EXECUTIVES SECTION ================= */}
        <RevealOnScroll>
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet Our Executive Command
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The strategic leaders guiding our vision, culture, and long‑term
              mission.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 mb-24">
          {executivesData.map((exec, idx) => (
            <RevealOnScroll key={idx} delay={idx * 120}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100">
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={exec.img}
                    alt={exec.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {exec.name}
                  </h3>
                  <p
                    style={{ color: primaryColor }}
                    className="text-sm font-semibold uppercase tracking-wide"
                  >
                    {exec.role}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* ================= ORDINARY SOLDIERS SECTION ================= */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet Our Ordinary Soldiers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated 12 staff members driving our mission forward.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamData.map((member, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p
                    style={{ color: primaryColor }}
                    className="text-sm font-medium uppercase tracking-wide"
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
