import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";

const AboutPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
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

      {/* ================= WHO WE ARE ================= */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=700&fit=crop"
              alt="Women working together"
              className="rounded-2xl object-cover"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Arova began as a small community initiative created by 15 women
                who believed in the power of unity, savings, and shared
                opportunities. Gathering under a tree, they started saving and
                lending to one another, laying the foundation for what would
                become a transformative institution.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Over the years, Arova has grown into a registered cooperative
                SACCO serving thousands across the Lango sub-region, offering
                financial services, training, and empowerment programs that
                uplift entire communities.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Our Milestones
            </h2>
          </RevealOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {/* 2008 */}
              <RevealOnScroll delay={100}>
                <div className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse gap-12">
                  <div className="flex-1 md:text-right md:pr-12">
                    <span
                      style={{ color: primaryColor }}
                      className="text-3xl font-bold block mb-2"
                    >
                      2008
                    </span>
                    <h3
                      style={{ color: primaryColor }}
                      className="text-2xl font-bold mb-4"
                    >
                      Humble Beginnings
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      15 women gathered under a tree to form a savings group,
                      marking the birth of Arova.
                    </p>
                  </div>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white"
                  ></div>
                  <div className="flex-1 md:pl-12"></div>
                </div>
              </RevealOnScroll>

              {/* 2015 */}
              <RevealOnScroll delay={200}>
                <div className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse gap-12">
                  <div className="flex-1 md:text-right md:pr-12"></div>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white"
                  ></div>
                  <div className="flex-1 md:pl-12">
                    <span
                      style={{ color: primaryColor }}
                      className="text-3xl font-bold block mb-2"
                    >
                      2015
                    </span>
                    <h3
                      style={{ color: primaryColor }}
                      className="text-2xl font-bold mb-4"
                    >
                      Official Registration
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Arova became officially registered as a cooperative,
                      expanding services and reach.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* 2024 */}
              <RevealOnScroll delay={300}>
                <div className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse gap-12">
                  <div className="flex-1 md:text-right md:pr-12">
                    <span
                      style={{ color: primaryColor }}
                      className="text-3xl font-bold block mb-2"
                    >
                      2024
                    </span>
                    <h3
                      style={{ color: primaryColor }}
                      className="text-2xl font-bold mb-4"
                    >
                      Permanent Registration
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Arova was permanently registered with the Ministry of
                      Trade, marking a major milestone. Today, we proudly serve
                      over 19,000 clients across the region.
                    </p>
                  </div>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white"
                  ></div>
                  <div className="flex-1 md:pl-12"></div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TODAY ================= */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Arova Today
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                What began as a small savings group has evolved into a
                community-driven institution offering financial services,
                training, and empowerment programs.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                With thousands of active members, dedicated staff, and a growing
                network of partners, Arova continues to transform lives and
                strengthen communities.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=700&fit=crop"
              alt="Arova today"
              className="rounded-2xl object-cover"
            />
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
