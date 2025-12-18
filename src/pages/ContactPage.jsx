import { MapPin, Mail, Phone } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import RevealOnScroll from "../components/RevealOnScroll";

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

export default ContactPage;
