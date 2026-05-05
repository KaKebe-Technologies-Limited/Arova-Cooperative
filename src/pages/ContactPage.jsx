import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../ThemeContext";
import { MapPin, Mail, Phone } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { adjustColor } from "../ThemeContext";
import { contactSubmissionsAPI } from "../api";
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactSubmissionsAPI.submit(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Contact Us | Arova Cooperative</title>
      <meta name="description" content="Get in touch with Arova Cooperative — we'd love to hear from you. Reach us in Lira City, Uganda." />
    </Helmet>
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have a question, want to
              partner with us, or just say hello — reach out!
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <RevealOnScroll delay={100}>
            <div
              style={{ backgroundColor: primaryColor }}
              className="p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/20 -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-40 translate-y-40"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1 opacity-90">
                        Address
                      </p>
                      <p className="text-lg leading-relaxed">
                        Senior Quarters B Cell
                        <br />
                        Lira City, Uganda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Mail size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1 opacity-90">
                        Email
                      </p>
                      <p className="text-lg">info@arova.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Phone size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1 opacity-90">
                        Phone
                      </p>
                      <p className="text-lg">+256 700 000 000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-7">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    placeholder="How can we help you?"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-5 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = adjustColor(
                      primaryColor,
                      -40,
                    ))
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = primaryColor)
                  }
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
