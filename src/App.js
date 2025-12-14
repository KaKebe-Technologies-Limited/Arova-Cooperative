import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  Menu,
  X,
  Users,
  Target,
  Heart,
  TrendingUp,
  MapPin,
  ArrowRight,
  Lock,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Quote,
  Palette,
} from "lucide-react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

// --- THEME CONTEXT ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("emerald");
  const [customHex, setCustomHex] = useState(null);

  const getThemeClass = (type, weight = "600") => {
    if (customHex) return "";
    return `${type}-${primaryColor}-${weight}`;
  };

  const themeStyle = customHex
    ? {
        "--primary": customHex,
        "--primary-light": `${customHex}20`,
        "--primary-hover": adjustColor(customHex, -20),
      }
    : {};

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        customHex,
        setCustomHex,
        getThemeClass,
        themeStyle,
      }}
    >
      <div style={themeStyle}>{children}</div>
    </ThemeContext.Provider>
  );
};

const adjustColor = (color, amount) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

// --- ANIMATIONS ---
const animationStyles = `
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-slow-zoom {
    animation: slow-zoom 20s linear infinite alternate;
  }
`;

// --- DATA ---
const stats = [
  { number: 19441, label: "People Reached", icon: Users, suffix: "" },
  { number: 10, label: "Districts Served", icon: MapPin, suffix: "+" },
  { number: 2, label: "Billion UGX Donated", icon: TrendingUp, suffix: "Bn" },
  { number: 12, label: "Dedicated Staff", icon: Heart, suffix: "" },
];

const coreValues = [
  "Accountability",
  "Transparency",
  "Equity",
  "Democracy",
  "Self-responsibility",
  "Self help",
];

const team = [
  {
    name: "Brenda Komagum",
    role: "Manager",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Denis Peter Odongo",
    role: "Head Finance & Admin",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Susan Akello",
    role: "Head Operations & Credit",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "Bob Obwor",
    role: "Accountant",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Apali Caeser",
    role: "Branch Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Nyaketcho Catherine",
    role: "Admin Assistant",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Acola Fiona",
    role: "Loan Officer",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
  },
  {
    name: "Daniel",
    role: "Loan Officer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Akello",
    role: "Farmer, Oyam",
    text: "Joining Arova changed my life. The low-interest loans allowed me to buy better seeds, and now my harvest has doubled.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "John Okello",
    role: "Small Business Owner",
    text: "The value addition training helped me process my cassava into flour, selling it for a much higher price in the market.",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Grace Auma",
    role: "Member since 2012",
    text: "Transparency and accountability are why I trust Arova. I know my savings are safe and working to help our community.",
    image:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop",
  },
];

// --- HELPER COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [hasAnimated, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// --- SECTIONS ---

// 1. Biography Section (Updated styling for overlap)
const BiographySection = () => {
  const { customHex, getThemeClass } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

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
                  !customHex
                    ? `${getThemeClass("bg", "100")} ${getThemeClass(
                        "text",
                        "600"
                      )}`
                    : ""
                }`}
                style={customHex ? { backgroundColor: `${customHex}20` } : {}}
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
                    !customHex ? getThemeClass("bg", "600") : ""
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

// 2. Testimonials Section (Background updated to white for contrast)
const TestimonialsSection = () => {
  const { customHex, getThemeClass } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

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
                !customHex ? getThemeClass("text", "600") : ""
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
          {testimonials.map((item, idx) => (
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

// --- PAGES ---

// Updated Home Page Order: Hero -> Bio -> Stats -> Vision -> Stories -> Testimonials
const HomePage = ({ blogPosts, navigate }) => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-50 animate-slow-zoom">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
          <RevealOnScroll>
            <div
              style={{
                borderColor: `${primaryColor}60`,
                backgroundColor: `${primaryColor}30`,
              }}
              className="inline-block mb-6 px-6 py-2 rounded-full border backdrop-blur-md"
            >
              <p
                style={{ color: "#6ee7b7" }}
                className="font-medium tracking-wide uppercase text-sm"
              >
                Established 2008 • Reg No: 12064/RCS
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Let's Change The World <br />
              <span style={{ color: customHex || "#34d399" }}>
                With Humanity
              </span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/about")}
                style={{ backgroundColor: primaryColor }}
                className={`px-8 py-4 text-white rounded-full font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 ${
                  !customHex ? "bg-emerald-600 hover:bg-emerald-700" : ""
                }`}
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

      {/* 2. Biography Section (Overlaps Hero) */}
      <BiographySection />

      {/* 3. Stats Section (Gray background for contrast) */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100}>
                <div className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div
                    style={{
                      color: primaryColor,
                      backgroundColor: `${primaryColor}20`,
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md"
                  >
                    <stat.icon size={32} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Vision, Mission & Values (White background) */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <RevealOnScroll>
              <div className="bg-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
                <div
                  style={{
                    color: primaryColor,
                    backgroundColor: `${primaryColor}20`,
                  }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                >
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading producer of agricultural products nationally
                  and internationally.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div
                style={{ backgroundColor: primaryColor }}
                className={`p-10 rounded-3xl shadow-xl h-full text-white transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300 ${
                  !customHex ? "bg-emerald-600" : ""
                }`}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 text-white">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-emerald-50 leading-relaxed">
                  Eradicating poverty among members through value addition on
                  agricultural products, providing low interest loans.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="bg-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Core Values
                </h3>
                <ul className="text-gray-600 space-y-2">
                  {coreValues.slice(0, 4).map((v) => (
                    <li key={v} className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: primaryColor }}
                        className="w-1.5 h-1.5 rounded-full"
                      ></div>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* 5. Latest Stories (Gray background) */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Latest Stories
              </h2>
              <p className="text-xl text-gray-600">Updates from the field.</p>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <RevealOnScroll key={post.id} delay={idx * 150}>
                <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                  <div className="overflow-hidden h-56 relative shrink-0">
                    <img
                      src={
                        post.image ||
                        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        style={{ backgroundColor: primaryColor }}
                        className={`px-3 py-1 text-white rounded-md text-xs font-bold uppercase tracking-wide ${
                          !customHex ? "bg-emerald-600" : ""
                        }`}
                      >
                        {post.category || "News"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-sm mb-3 space-x-2">
                      <Calendar size={14} /> <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Testimonials Section (White background) */}
      <TestimonialsSection />
    </div>
  );
};

const AboutPage = () => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

  return (
    <div className="bg-white">
      {/* About Hero Section */}
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
            {/* ... Other timeline items same structure ... */}
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

const TeamPage = () => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
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
          {team.map((member, idx) => (
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

const ContactPage = () => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900">Get In Touch</h1>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-8">
            <RevealOnScroll>
              <div
                style={{ backgroundColor: primaryColor }}
                className="p-8 rounded-2xl text-white shadow-lg"
              >
                <h3 className="text-xl font-bold mb-6 border-b border-white/30 pb-4">
                  Contact Info
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-emerald-100 text-sm uppercase">
                        Address
                      </p>
                      <p>Senior Quarters B Cell, Lira City</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-emerald-100 text-sm uppercase">
                        Email
                      </p>
                      <p>info@arova.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-emerald-100 text-sm uppercase">
                        Phone
                      </p>
                      <p>+256 700 000 000</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          <div className="col-span-2">
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    placeholder="Name"
                  />
                  <input
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    placeholder="Email"
                  />
                </div>
                <textarea
                  rows="5"
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                  placeholder="Message"
                ></textarea>
                <button
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-4 text-white font-bold rounded-xl shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({ blogPosts }) => {
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900">Impact Stories</h1>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post, idx) => (
            <RevealOnScroll key={post.id} delay={idx * 100}>
              <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="h-64 overflow-hidden relative shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div
                    style={{ color: primaryColor }}
                    className="text-sm font-bold mb-2 uppercase tracking-wider"
                  >
                    {post.category || "News"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
                    {post.excerpt}
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

// --- ADMIN PANEL ---

const AdminPanel = ({
  blogPosts,
  handleAddPost,
  handleLogout,
  editingPost,
  setEditingPost,
  handleSavePost,
  handleDeletePost,
}) => {
  const { primaryColor, setPrimaryColor, setCustomHex } =
    useContext(ThemeContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPost({ ...editingPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    { name: "emerald", hex: "#059669", label: "Emerald" },
    { name: "blue", hex: "#2563eb", label: "Blue" },
    { name: "purple", hex: "#7c3aed", label: "Purple" },
    { name: "red", hex: "#dc2626", label: "Red" },
    { name: "orange", hex: "#ea580c", label: "Orange" },
  ];

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddPost}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center hover:bg-emerald-700 transition shadow-lg"
            >
              <Plus size={18} /> New Post
            </button>
            <button
              onClick={handleLogout}
              className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* --- THEME SETTINGS --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette size={20} /> Website Theme Color
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setPrimaryColor(c.name);
                  setCustomHex(null);
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  primaryColor === c.name && !setCustomHex
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                    : ""
                }`}
                style={{ backgroundColor: c.hex, borderColor: "white" }}
                title={c.label}
              />
            ))}
            <div className="flex items-center gap-2 border-l pl-4 ml-2">
              <span className="text-sm text-gray-500">Custom Hex:</span>
              <input
                type="color"
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-10 h-10 cursor-pointer rounded overflow-hidden border-0"
              />
            </div>
          </div>
        </div>

        {/* Post Editor */}
        {editingPost ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <div className="space-y-6">
              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Title"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
              />
              <textarea
                className="w-full border p-4 rounded-xl"
                rows="4"
                placeholder="Content"
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, content: e.target.value })
                }
              />
              <div className="border-2 border-dashed p-4 text-center">
                <input type="file" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSavePost}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold"
              >
                Save Post
              </button>
              <button
                onClick={() => setEditingPost(null)}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* List of posts */}
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={post.image}
                    className="w-16 h-16 rounded-lg object-cover"
                    alt=""
                  />
                  <h3 className="font-bold">{post.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 text-blue-600 bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-red-600 bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN WRAPPER ---

const ArovaContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

  useEffect(() => {
    const savedPosts = localStorage.getItem("arova_blog_posts");
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      setBlogPosts([
        {
          id: 1,
          title: "From 15 Women to 19,000+ Members",
          excerpt: "How a small savings group transformed the region.",
          date: "Dec 14, 2024",
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
          category: "Success Story",
          content: "...",
        },
        {
          id: 2,
          title: "Breaking the Poverty Cycle",
          excerpt: "Low interest loans are changing lives.",
          date: "Nov 20, 2024",
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
          category: "Finance",
          content: "...",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (blogPosts.length > 0)
      localStorage.setItem("arova_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const handleAdminLogin = () => {
    if (adminPassword === "arova2024") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      navigate("/admin");
    } else {
      alert("Wrong password. Hint: arova2024");
    }
  };

  const handleSavePost = () => {
    if (!editingPost.title) return alert("Title is required");
    const newPosts = editingPost.id
      ? blogPosts.map((p) => (p.id === editingPost.id ? editingPost : p))
      : [editingPost, ...blogPosts];
    setBlogPosts(newPosts);
    setEditingPost(null);
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Delete?"))
      setBlogPosts(blogPosts.filter((p) => p.id !== id));
  };
  const handleAddPost = () => {
    setEditingPost({
      id: Date.now(),
      title: "",
      excerpt: "",
      image: "",
      content: "",
      date: "Dec 14, 2025",
      category: "News",
    });
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      <ScrollToTop />
      <style>{animationStyles}</style>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
              style={{ backgroundColor: "white" }}
            >
              <img src="./logo.png" alt="Logo" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 leading-none block">
                Arova
              </span>
            </div>
          </Link>
          <div className="hidden md:flex gap-8 items-center font-medium text-gray-600">
            {["Home", "About", "Team", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-emerald-600 transition-colors"
              >
                {item}
              </Link>
            ))}
            {!isAdmin && (
              <button
                onClick={() => setShowAdminLogin(true)}
                style={{
                  color: primaryColor,
                  backgroundColor: `${primaryColor}10`,
                }}
                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full"
              >
                <Lock size={14} /> Admin
              </button>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                style={{ backgroundColor: primaryColor }}
                className="text-white px-5 py-2 rounded-full font-bold shadow-lg"
              >
                Admin Panel
              </Link>
            )}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24">
        <Routes>
          <Route
            path="/"
            element={<HomePage blogPosts={blogPosts} navigate={navigate} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
          <Route path="/contact" element={<ContactPage />} />
          {isAdmin && (
            <Route
              path="/admin"
              element={
                <AdminPanel
                  blogPosts={blogPosts}
                  editingPost={editingPost}
                  setEditingPost={setEditingPost}
                  handleAddPost={handleAddPost}
                  handleSavePost={handleSavePost}
                  handleDeletePost={handleDeletePost}
                  handleLogout={() => setIsAdmin(false)}
                />
              }
            />
          )}
        </Routes>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Staff Access</h2>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full border p-4 rounded-xl mb-4"
              placeholder="Password"
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdminLogin}
                style={{ backgroundColor: primaryColor }}
                className="flex-1 text-white py-3 rounded-xl font-bold"
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-900 font-bold text-xl">
                <img src="./logo.png" alt="Arova Logo" />
              </div>
              <span className="font-bold text-xl text-white">Arova</span>
            </Link>
            <p className="leading-relaxed mb-6">
              Empowering communities through agricultural value addition and
              financial services since 2008.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.twitter.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} /> Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} /> Leadership
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} /> Impact Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-emerald-500" size={20} />
                <span>
                  Senior Quarters B Cell,
                  <br />
                  Lira City East Division,
                  <br />
                  Lira City, Uganda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-emerald-500" size={20} />
                <span>+256 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-emerald-500" size={20} />
                <span>info@arova.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="mb-4">
              Subscribe to get the latest updates on our impact.
            </p>
            <div className="flex gap-2">
              <input
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 w-full text-white outline-none focus:border-emerald-500 transition-colors"
                placeholder="Email Address"
              />
              <button className="bg-emerald-600 text-white px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Reg No: 12064/RCS</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Arova Producers & Cooperative
            Sacco. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ArovaWebsite = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ArovaContent />
    </ThemeProvider>
  </BrowserRouter>
);

export default ArovaWebsite;
