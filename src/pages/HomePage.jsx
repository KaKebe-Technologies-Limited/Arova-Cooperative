import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import useSWR from "swr";
import { ThemeContext } from "../ThemeContext";
import BiographySection from "../sections/BiographySection";
import FoundersMessage from "../sections/FoundersMessage";
import TestimonialsSection from "../sections/TestimonialsSection";
import AnimatedCounter from "../components/AnimatedCounter";
import { ArrowRight, Target, Heart, Lock, Calendar, Users, MapPin, TrendingUp } from "lucide-react";
import { adjustColor } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";
import { postsAPI, statsAPI, coreValuesAPI } from "../api";

const ICON_MAP = { Users, MapPin, TrendingUp, Heart };

const HomePage = () => {
  const { resolvedHex, primaryColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { data: blogPosts = [] } = useSWR("home-posts", () =>
    postsAPI.getAll({ status: "PUBLISHED", limit: 3 }).then((r) => r.data.posts || [])
  );
  const { data: stats = [] } = useSWR("stats", () =>
    statsAPI.getAll().then((r) => r.data.stats || [])
  );
  const { data: coreValues = [] } = useSWR("core-values", () =>
    coreValuesAPI.getAll().then((r) => r.data.coreValues || [])
  );

  return (
    <>
      <Helmet>
        <title>Arova Cooperative — Empowering Communities Since 2008</title>
        <meta name="description" content="Arova Producers & Cooperative Sacco — eradicating poverty through agricultural value addition, financial services, and community empowerment in Northern Uganda." />
      </Helmet>
      <div className="overflow-x-hidden">
        {/* HERO */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
          <div className="absolute inset-0 opacity-50 animate-slow-zoom">
            <img src="../images/arova-bg.jpg" alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
            <RevealOnScroll>
              <div
                style={{ borderColor: `${resolvedHex}60`, backgroundColor: `${resolvedHex}30` }}
                className="inline-block mb-6 px-6 py-2 rounded-full border backdrop-blur-md"
              >
                <p style={{ color: adjustColor(resolvedHex, 50) }} className="font-medium tracking-wide uppercase text-sm">
                  Established 2008 • Reg No: 12064/RCS
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <h1 className="text-3xl md:text-7xl font-bold mb-8 leading-tight">
                Let's Change The World <br />
                <span style={{ color: resolvedHex }}>With Humanity</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/about")}
                  style={{ backgroundColor: resolvedHex }}
                  className="px-8 py-4 text-white rounded-full font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Learn More <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <BiographySection />
        <FoundersMessage />

        {/* STATS */}
        {stats.length > 0 && (
          <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => {
                  const IconComponent = ICON_MAP[stat.icon];
                  return (
                    <RevealOnScroll key={stat.id || idx} delay={idx * 100}>
                      {({ isVisible }) => (
                        <div className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                          <div
                            style={{ color: resolvedHex, backgroundColor: `${resolvedHex}10` }}
                            className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md"
                          >
                            {IconComponent && <IconComponent size={32} />}
                          </div>
                          <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                          </div>
                          <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      )}
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VISION / MISSION / CORE VALUES */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <RevealOnScroll>
                <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
                  <div style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }} className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">To be a leading producer of agricultural products nationally and internationally.</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div style={{ backgroundColor: resolvedHex }} className="p-10 rounded-3xl h-full text-white transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="leading-relaxed text-white/90">Eradicating poverty among members through value addition on agricultural products, providing low interest loans.</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
                  <div style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }} className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Core Values</h3>
                  <ul className="text-gray-600 space-y-2">
                    {coreValues.slice(0, 4).map((v) => (
                      <li key={v.id} className="flex items-center gap-2">
                        <div style={{ backgroundColor: primaryColor }} className="w-1.5 h-1.5 rounded-full" />
                        {v.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* LATEST STORIES */}
        {blogPosts.length > 0 && (
          <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Stories</h2>
                  <p className="text-xl text-gray-600">Updates from the field.</p>
                </div>
              </RevealOnScroll>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {blogPosts.map((post, idx) => (
                  <RevealOnScroll key={post.id} delay={idx * 150}>
                    <div
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
                    >
                      <div className="overflow-hidden h-56 relative shrink-0">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span style={{ backgroundColor: resolvedHex }} className="px-3 py-1 text-white rounded-md text-xs font-bold uppercase tracking-wide">
                            {post.category || "News"}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-gray-400 text-sm mb-3 space-x-2">
                          <Calendar size={14} />
                          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:opacity-80 transition-opacity">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">{post.excerpt}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigate("/blog")}
                  style={{ backgroundColor: resolvedHex }}
                  className="px-8 py-4 text-white rounded-full font-semibold text-lg shadow-lg hover:-translate-y-1 transform transition-all duration-300 inline-flex items-center gap-2"
                >
                  View All Stories <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        <TestimonialsSection />
      </div>
    </>
  );
};

export default HomePage;
