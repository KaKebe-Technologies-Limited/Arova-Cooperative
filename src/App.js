import React, { useState, useEffect, useRef } from "react";
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
  Save,
  Camera,
  XCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Upload,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

// --- CUSTOM STYLES FOR ANIMATIONS ---
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

// --- DATA FROM UPLOADED DOCS ---

// const seoData = {
//   title: "Arova Producers & Cooperative Sacco",
//   description:
//     "Eradicating poverty through agricultural value addition and low interest loans in Lango Sub-region.",
// };

// Statistics from Source [cite: 20-25]
const stats = [
  { number: 19441, label: "People Reached", icon: Users, suffix: "" },
  { number: 10, label: "Districts Served", icon: MapPin, suffix: "+" },
  { number: 2, label: "Billion UGX Donated", icon: TrendingUp, suffix: "Bn" },
  { number: 12, label: "Dedicated Staff", icon: Heart, suffix: "" },
];

// Placeholder Gallery Images (To be replaced with actual photos)
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80",
    caption: "Community Gathering in Oyam",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
    caption: "Harvest Season Success",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    caption: "Empowering Women Entrepreneurs",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    caption: "Agricultural Training",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
    caption: "New Members Registration",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
    caption: "Value Addition Workshop",
  },
];

// Core Values from Source [cite: 12-19]
const coreValues = [
  "Accountability",
  "Transparency",
  "Equity",
  "Democracy",
  "Self-responsibility",
  "Self help",
];

// Team from Source [cite: 26-37]
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
    img: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?w=400&h=400&fit=crop",
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

// --- HELPER COMPONENTS ---

// 1. ScrollToTop: Ensures page starts at top when clicking links
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. RevealOnScroll: Animation wrapper
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

// 3. AnimatedCounter: Counts numbers up
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

// 4. InteractiveGallery: Lightbox feature
const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Pictures
            </h2>
            <p className="text-gray-600">
              See how we are transforming the Lango Sub-region.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <RevealOnScroll key={img.id} delay={idx * 100}>
              <div
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg aspect-[4/3]"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Camera className="text-white mx-auto mb-2" size={32} />
                    <p className="text-white font-medium">{img.caption}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in-up">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors"
          >
            <XCircle size={40} />
          </button>
          <div className="max-w-5xl w-full text-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="w-auto max-h-[80vh] mx-auto rounded-lg mb-4"
            />
            <p className="text-white text-xl font-medium">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PAGES ---

const HomePage = ({ blogPosts, navigate }) => (
  <div className="overflow-x-hidden">
    {/* Hero Section */}
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
          <div className="inline-block mb-6 px-6 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md">
            <p className="text-emerald-300 font-medium tracking-wide uppercase text-sm">
              Established 2008 • Reg No: 12064/RCS
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Let's Change The World <br />
            <span className="text-emerald-400">With Humanity</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Eradicating poverty through agricultural value addition, low
            interest loans, and market linkages across the Lango Sub-region.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
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

    {/* Animated Stats Section */}
    <div className="py-20 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div className="text-center group p-6 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-emerald-100 text-emerald-600 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
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

    {/* About Preview */}
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1"
                alt="Community"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white text-lg font-medium">
                  Started by 15 women under a tree in 2008.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="pl-0 md:pl-10">
              <div className="d-inline-block rounded-full bg-emerald-100 text-emerald-600 py-1 px-4 mb-4 font-semibold text-sm">
                Who We Are
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We Help People In Need Around The Region
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Arova Producers and Cooperative Sacco started as a small savings
                group. Today, we serve a client base of over 19,000 clients in
                Lira City, Alebtong, Oyam, Otuke, Apac, Dokolo, Kwania, Kole,
                and the Acholi sub-region.
              </p>
              <div className="bg-white p-6 rounded-xl border-l-4 border-emerald-500 shadow-sm mb-8">
                <p className="text-gray-800 font-medium italic">
                  "Transforming the welfare of families through unity and
                  savings."
                </p>
              </div>
              <button
                onClick={() => navigate("/about")}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-all font-semibold shadow-lg shadow-emerald-200"
              >
                Read Our Story
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>

    {/* Vision & Mission Cards */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <RevealOnScroll>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be a leading producer of agricultural products nationally and
                internationally.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="bg-emerald-600 p-10 rounded-3xl shadow-xl h-full text-white transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 text-white">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-emerald-50 leading-relaxed">
                Eradicating poverty among members through value addition on
                agricultural products, providing low interest loans and linking
                members to markets.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Core Values
              </h3>
              <ul className="text-gray-600 space-y-2">
                {coreValues.slice(0, 4).map((v) => (
                  <li key={v} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>

    {/* Interactive Gallery */}
    <InteractiveGallery />

    {/* Latest Stories */}
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
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs font-bold uppercase tracking-wide">
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
                  <div className="flex items-center text-emerald-600 font-bold text-sm mt-auto">
                    READ MORE{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <div className="d-inline-block rounded-full bg-emerald-100 text-emerald-600 py-1 px-4 mb-4 font-semibold text-sm">
            History
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Inspiring Journey
          </h1>
        </div>
      </RevealOnScroll>

      <div className="space-y-12 border-l-2 border-emerald-100 ml-4 md:ml-0 md:pl-0">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="md:w-32 md:text-right shrink-0 relative z-10">
              <span className="text-3xl font-bold text-emerald-600 block bg-white md:pl-4 py-2">
                2008
              </span>
            </div>
            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white md:hidden"></div>
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-emerald-200 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The Beginning
              </h3>
              <p className="text-gray-700 leading-relaxed">
                In 2008, a group of 15 women who had a shared dream of
                transforming the welfare of their families came together. They
                decided to form a small savings group to pool funds together so
                that they could borrow at a low interest rate.{" "}
                <span className="font-semibold text-emerald-700">
                  They had all their activities under a tree
                </span>{" "}
                in one of the compounds of a member. [cite: 1-4]
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="md:w-32 md:text-right shrink-0 relative z-10">
              <span className="text-3xl font-bold text-gray-400 block bg-white md:pl-4 py-2">
                2010
              </span>
            </div>
            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-gray-300 border-4 border-white md:hidden"></div>
            <div className="flex-1 bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                First Milestone
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Arova got a temporal registration certificate to commence their
                formal activities since the membership had grown to over 200. We
                secured our first office in Oyam Town council. [cite: 5]
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="md:w-32 md:text-right shrink-0 relative z-10">
              <span className="text-3xl font-bold text-emerald-600 block bg-white md:pl-4 py-2">
                2024
              </span>
            </div>
            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white md:hidden"></div>
            <div className="flex-1 bg-gradient-to-br from-emerald-600 to-green-700 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4">Permanent Registration</h3>
              <p className="text-emerald-50 leading-relaxed">
                Arova was permanently registered with the Ministry of Trade,
                Industry and Cooperatives (Reg.No 12064/RCS). We now serve a
                client base of over 19,000 clients in the whole of Lango
                Sub-region. [cite: 6]
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Core Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {coreValues.map((val, i) => (
            <div
              key={i}
              className="bg-emerald-50 p-6 rounded-xl text-center font-semibold text-emerald-800 border border-emerald-100"
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TeamPage = () => (
  <div className="py-20 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <div className="d-inline-block rounded-full bg-emerald-100 text-emerald-600 py-1 px-4 mb-4 font-semibold text-sm">
            Team Members
          </div>
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
                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/60 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <button className="bg-white p-2 rounded-full text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="bg-white p-2 rounded-full text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="bg-white p-2 rounded-full text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-600 text-sm font-medium uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-20 bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
        <h3 className="text-2xl font-bold mb-8">Departments</h3>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-emerald-700">
              Management
            </h4>
            <p className="text-gray-600">Head: Brenda Komagum</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-emerald-700">
              Finance & Admin
            </h4>
            <p className="text-gray-600">Head: Denis Peter Odongo</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-emerald-700">
              Operations & Credit
            </h4>
            <p className="text-gray-600">Head: Susan Akello</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="py-20 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <div className="d-inline-block rounded-full bg-emerald-100 text-emerald-600 py-1 px-4 mb-4 font-semibold text-sm">
            Contact Us
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Get In Touch</h1>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-8">
          <RevealOnScroll>
            <div className="bg-emerald-600 p-8 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-6 border-b border-emerald-500 pb-4">
                Contact Info
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-emerald-100 text-sm uppercase">
                      Address
                    </p>
                    <p>
                      Senior Quarters B Cell, Lira City East Division, Lira City
                      [cite: 39]
                    </p>
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
          <RevealOnScroll delay={200}>
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Send us a message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                  Send Message
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </div>
);

const BlogPage = ({ blogPosts }) => (
  <div className="py-20 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <div className="d-inline-block rounded-full bg-emerald-100 text-emerald-600 py-1 px-4 mb-4 font-semibold text-sm">
            Our Blog
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Impact Stories</h1>
        </div>
      </RevealOnScroll>

      {blogPosts && blogPosts.length > 0 ? (
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
                  <div className="text-emerald-600 text-sm font-bold mb-2 uppercase tracking-wider">
                    {post.category || "News"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                    {post.date}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No stories published yet.
        </div>
      )}
    </div>
  </div>
);

// --- ADMIN PANEL WITH FILE UPLOAD ---

const AdminPanel = ({
  blogPosts,
  handleAddPost,
  handleLogout,
  editingPost,
  setEditingPost,
  handleSavePost,
  handleDeletePost,
}) => {
  // File Upload Handler (Converts file to Base64 for local display)
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

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Manage your website content</p>
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

        {editingPost ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">
              {editingPost.id && blogPosts.find((p) => p.id === editingPost.id)
                ? "Edit Post"
                : "Create New Post"}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  className="w-full border border-gray-200 p-4 rounded-xl focus:border-emerald-500 outline-none"
                  placeholder="Enter post title"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    className="w-full border border-gray-200 p-4 rounded-xl focus:border-emerald-500 outline-none"
                    placeholder="e.g. Success Story"
                    value={editingPost.category}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    className="w-full border border-gray-200 p-4 rounded-xl focus:border-emerald-500 outline-none"
                    placeholder="e.g. Dec 14, 2025"
                    value={editingPost.date}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Feature Image (Upload from Device)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer relative bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {editingPost.image ? (
                    <div className="relative h-48 w-full">
                      <img
                        src={editingPost.image}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition text-white font-bold rounded-lg">
                        Click to Change
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <Upload size={32} className="mb-2" />
                      <p>Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  className="w-full border border-gray-200 p-4 rounded-xl focus:border-emerald-500 outline-none"
                  rows="2"
                  placeholder="Short summary"
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Content
                </label>
                <textarea
                  className="w-full border border-gray-200 p-4 rounded-xl focus:border-emerald-500 outline-none"
                  rows="6"
                  placeholder="Write your story here..."
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSavePost}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-emerald-700 transition shadow-lg"
                >
                  <Save size={18} /> Save Post
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={post.image}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.date} • {post.category}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {blogPosts.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                No posts yet. Click "New Post" to create one.
              </div>
            )}
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

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("arova_blog_posts");
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      const defaultPosts = [
        {
          id: 1,
          title: "From 15 Women to 19,000+ Members",
          excerpt:
            "How a small savings group under a tree transformed the Lango region.",
          date: "Dec 14, 2024",
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
          category: "Success Story",
          content:
            "In 2008, a group of 15 women who had a shared dream of transforming the welfare of their families came together...",
        },
        {
          id: 2,
          title: "Breaking the Poverty Cycle",
          excerpt: "Low interest loans are changing lives across 10 districts.",
          date: "Nov 20, 2024",
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
          category: "Finance",
          content:
            "We provide low interest loans to help members overcome challenges...",
        },
      ];
      setBlogPosts(defaultPosts);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (blogPosts.length > 0) {
      localStorage.setItem("arova_blog_posts", JSON.stringify(blogPosts));
    }
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
    if (window.confirm("Are you sure you want to delete this post?")) {
      setBlogPosts(blogPosts.filter((p) => p.id !== id));
    }
  };

  const handleAddPost = () => {
    setEditingPost({
      id: Date.now(),
      title: "",
      excerpt: "",
      image: "",
      content: "",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      category: "News",
    });
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Inject Animation Styles */}
      <style>{animationStyles}</style>

      {/* Nav */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:rotate-12 transition-transform shadow-emerald-200 shadow-lg">
              <img src="./logo.png" alt="Arova Logo" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 leading-none block">
                Arova
              </span>
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                Producers Sacco
              </span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 items-center font-medium text-gray-600">
            {["Home", "About", "Team", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-emerald-600 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            {!isAdmin && (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center gap-2 text-sm font-bold bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-100"
              >
                <Lock size={14} /> Staff Login
              </button>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-white bg-emerald-600 px-5 py-2 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 space-y-4 shadow-xl h-screen">
            {["Home", "About", "Team", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-bold text-gray-800 py-2 border-b border-gray-50"
              >
                {item}
              </Link>
            ))}
            {!isAdmin && (
              <button
                onClick={() => {
                  setShowAdminLogin(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-3 font-bold text-emerald-600"
              >
                Staff Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
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
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Staff Access</h2>
              <p className="text-gray-500 text-sm">
                Enter your credentials to continue
              </p>
            </div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-xl mb-4 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Password"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              Secure System • Arova Sacco
            </p>
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Instagram size={18} />
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

// 5. Wrap App with Router
const ArovaWebsite = () => (
  <BrowserRouter>
    <ArovaContent />
  </BrowserRouter>
);

export default ArovaWebsite;
