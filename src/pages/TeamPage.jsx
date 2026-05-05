import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";
import { teamAPI } from "../api";

const MemberCardSkeleton = ({ tall }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
    <div className={`${tall ? "h-72" : "h-64"} bg-gray-200`} />
    <div className="p-6 space-y-3">
      <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded" />
      <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded" />
    </div>
  </div>
);

const TeamPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamAPI
      .getAll()
      .then((res) => setTeamMembers(res.data.members || []))
      .catch(() => setTeamMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const executives = teamMembers.filter((m) => m.order <= 4);
  const staff = teamMembers.filter((m) => m.order > 4);

  return (
    <>
      <Helmet>
        <title>Our Team | Arova Cooperative</title>
        <meta name="description" content="Meet the dedicated team behind Arova Cooperative — the leaders and staff driving our mission across Northern Uganda." />
      </Helmet>

      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Executive Command</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The strategic leaders guiding our vision, culture, and long‑term mission.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 mb-24">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <MemberCardSkeleton key={i} tall />)
              : executives.map((exec, idx) => (
                  <RevealOnScroll key={exec.id} delay={idx * 120}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100">
                      <div className="h-72 overflow-hidden">
                        <img
                          src={exec.image}
                          alt={exec.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{exec.name}</h3>
                        <p style={{ color: primaryColor }} className="text-sm font-semibold uppercase tracking-wide">
                          {exec.role}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
          </div>

          <RevealOnScroll>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Ordinary Soldiers</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The dedicated staff members driving our mission forward.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <MemberCardSkeleton key={i} />)
              : staff.map((member, idx) => (
                  <RevealOnScroll key={member.id} delay={idx * 100}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100">
                      <div className="h-64 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p style={{ color: primaryColor }} className="text-sm font-medium uppercase tracking-wide">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
