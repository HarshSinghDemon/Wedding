import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function ContactSection({ contacts = [] }) {
  if (!contacts.length) return null;

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden">
      {/* Corner Mandalas */}
      <img
        src="/templates/royal-gateway/blue-mandala.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-10 w-96 opacity-30 select-none rotate-12"
      />
      <img
        src="/templates/royal-gateway/blue-mandala.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-10 w-96 opacity-30 select-none -rotate-12"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="font-great-vibes text-4xl md:text-5xl text-[#8d5a17] drop-shadow-sm">
            For any assistance
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl md:text-5xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm">
            CONTACT US
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#dea645]" />
            <div className="rotate-45 h-2 w-2 border border-[#dea645] bg-[#ffe4b3]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#dea645]" />
          </div>
        </motion.div>

        {/* Contacts Display */}
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          {contacts.map((contact, idx) => {
            const phoneList = contact.phones || (contact.phone ? [contact.phone] : []);

            return (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="w-full flex flex-col items-center text-center select-none"
              >
                <h3 className="font-cinzel-decorative text-3xl sm:text-4xl font-bold text-[#9e141e] tracking-wide">
                  {contact.name}
                </h3>
                <p className="mt-1 font-great-vibes text-2xl sm:text-3xl text-[#b16f23]">
                  {contact.relation}
                </p>

                {/* Phone Numbers List with Call & WhatsApp Buttons */}
                <div className="mt-6 w-full space-y-4 max-w-md">
                  {phoneList.map((phoneNum, pIdx) => {
                    const cleanPhone = phoneNum.replace(/[^0-9+]/g, '');
                    const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                      "Hi Harsh, I have a question regarding Kartikey & Rupshree's wedding celebration."
                    )}`;

                    return (
                      <div
                        key={pIdx}
                        className="flex flex-col sm:flex-row items-center justify-between gap-3.5 p-4 sm:p-4.5 rounded-2xl border border-[#dea645]/30 bg-white/90 shadow-sm backdrop-blur-sm"
                      >
                        <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.15em] text-[#8a5a12]">
                          {phoneNum}
                        </span>

                        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-[#dea645] bg-gradient-to-r from-[#dea645] to-[#c9973a] px-5 py-2.5 font-cinzel text-xs font-bold tracking-widest text-[#39150f] shadow-md transition-transform hover:scale-105 active:scale-95"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>CALL</span>
                          </a>

                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-[#dea645] bg-[#fff9eb] px-5 py-2.5 font-cinzel text-xs font-bold tracking-widest text-[#9e141e] shadow-md transition-transform hover:scale-105 hover:bg-[#ffe4b3] active:scale-95"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WHATSAPP</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
