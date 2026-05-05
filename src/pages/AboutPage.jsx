import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";
import { pageContentAPI } from "../api";

const TIMELINE = [
  { year: "2008", title: "Humble Beginnings", body: "15 women gathered under a tree to form a savings group, marking the birth of Arova." },
  { year: "2015", title: "Official Registration", body: "Arova became officially registered as a cooperative, expanding services and reach." },
  { year: "2024", title: "Permanent Registration", body: "Arova was permanently registered with the Ministry of Trade, marking a major milestone. Today, we proudly serve over 19,000 clients across the region." },
];

const AboutPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const [whoWeAre, setWhoWeAre] = useState(null);

  useEffect(() => {
    pageContentAPI.getAll()
      .then((res) => {
        const sections = res.data.content || [];
        const section = sections.find(
          (s) => s.page === "ABOUT" && s.sectionKey === "whoWeAre"
        );
        if (section) setWhoWeAre(section.content);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Journey | Arova Cooperative</title>
        <meta name="description" content="From 15 women under a tree to a regional force for change — learn about Arova's journey since 2008." />
      </Helmet>

      <div className="bg-white">
        {/* HERO */}
        <div className="relative h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img src="../images/about-pic.jpeg" alt="About Hero" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <RevealOnScroll>
              <h1 className="text-3xl md:text-7xl font-bold mb-6">Our Journey</h1>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg md:text-2xl text-gray-200">
                From 15 women under a tree to a regional force for change.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* WHO WE ARE */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <img
                src="../images/arova-whoweare.jpeg"
                alt="Women working together"
                className="rounded-2xl object-cover"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
                {whoWeAre?.summary ? (
                  <p className="text-gray-700 leading-relaxed text-lg">{whoWeAre.summary}</p>
                ) : (
                  <>
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      Arova began as a small community initiative created by 15 women who believed in the power of unity, savings, and shared opportunities. Gathering under a tree, they started saving and lending to one another, laying the foundation for what would become a transformative institution.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Over the years, Arova has grown into a registered cooperative SACCO serving thousands across the Lango sub-region, offering financial services, training, and empowerment programs that uplift entire communities.
                    </p>
                  </>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll>
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Milestones</h2>
            </RevealOnScroll>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200" />
              <div className="space-y-16">
                {TIMELINE.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <RevealOnScroll key={item.year} delay={idx * 100}>
                      <div className="relative flex items-center gap-12">
                        {/* Left side */}
                        <div className={`flex-1 ${isLeft ? "text-right pr-12" : "pl-12 invisible"}`}>
                          {isLeft && (
                            <>
                              <span style={{ color: primaryColor }} className="text-3xl font-bold block mb-2">{item.year}</span>
                              <h3 style={{ color: primaryColor }} className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                              <p className="text-gray-700 leading-relaxed">{item.body}</p>
                            </>
                          )}
                        </div>

                        {/* Dot */}
                        <div
                          style={{ backgroundColor: primaryColor }}
                          className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10 flex-shrink-0"
                        />

                        {/* Right side */}
                        <div className={`flex-1 ${!isLeft ? "pl-12" : "invisible"}`}>
                          {!isLeft && (
                            <>
                              <span style={{ color: primaryColor }} className="text-3xl font-bold block mb-2">{item.year}</span>
                              <h3 style={{ color: primaryColor }} className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                              <p className="text-gray-700 leading-relaxed">{item.body}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* AROVA TODAY */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Arova Today</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  What began as a small savings group has evolved into a community-driven institution offering financial services, training, and empowerment programs.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  With thousands of active members, dedicated staff, and a growing network of partners, Arova continues to transform lives and strengthen communities.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=700&fit=crop"
                alt="Arova today"
                loading="lazy"
                className="rounded-2xl object-cover"
              />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
