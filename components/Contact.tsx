'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = 'd2e3a958-efc9-41e6-abfc-ceb3e8a498e7';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', "New quote request from Aernova website");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send message.');
      }

      setSubmitted(true);
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-8 lg:px-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-orange/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
            ◈ Get in Touch
          </span>
          <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] text-snow tracking-wide leading-none">
            REQUEST A<br />QUOTE
          </h2>
          <p className="font-body font-light text-frost/60 text-base mt-4 max-w-lg leading-relaxed">
            Tell us about your project and we'll get back to you within one business day with
            a tailored proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {[
              { icon: Mail, label: 'Email', value: 'sales@aernova.ca', href: 'mailto:sales@aernova.ca' },
              { icon: Phone, label: 'Phone', value: '+1 (647) 710-8581', href: 'tel:+16477108581' },
              { icon: MapPin, label: 'Serving', value: 'Toronto & Greater Toronto Area, ON', href: null },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-edge flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-cyan" />
                  </div>
                  <div>
                    <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="font-body text-frost hover:text-cyan transition-colors text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-body text-frost text-sm">{item.value}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Social / LinkedIn */}
            <div className="mt-4 pt-8 border-t border-edge">
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-3">
                Connect
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/aernova-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-cyan border border-cyan/30 px-4 py-2.5 inline-block hover:bg-cyan/10 transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.instagram.com/aernova.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-cyan border border-cyan/30 px-4 py-2.5 inline-block hover:bg-cyan/10 transition-colors"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center gap-5 border border-cyan/30 bg-panel p-12 text-center"
              >
                <CheckCircle size={40} className="text-cyan" />
                <h3 className="font-display text-3xl text-snow tracking-wide">MESSAGE SENT</h3>
                <p className="font-body font-light text-frost/60 text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out! We'll respond within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Smith', colSpan: 1 },
                  { name: 'company', label: 'Company', type: 'text', placeholder: 'ABC Contracting', colSpan: 1 },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@company.com', colSpan: 1 },
                  { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+1 (416) 000-0000', colSpan: 1 },
                ].map((field) => (
                  <div key={field.name} className={field.colSpan === 2 ? 'sm:col-span-2' : ''}>
                    <label className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.name !== 'phone'}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full bg-panel border border-edge text-frost font-body text-sm px-4 py-3 focus:outline-none focus:border-cyan/60 transition-colors placeholder:text-smoke/40"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your site, what you need measured or modeled, and your timeline..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-panel border border-edge text-frost font-body text-sm px-4 py-3 focus:outline-none focus:border-cyan/60 transition-colors resize-none placeholder:text-smoke/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-mono-dm text-[0.78rem] tracking-widest uppercase text-ink bg-cyan px-10 py-4 hover:bg-[#33ddff] transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-3"
                  >
                    <Send size={14} />
                    {submitting ? 'Sending...' : 'Send Request'}
                  </button>
                  {submitError && (
                    <p className="font-body text-sm text-orange mt-4">
                      {submitError}
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}