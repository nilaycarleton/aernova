'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { cardReveal, sectionReveal, staggerGroup, viewportOnce } from './motionPresets';

const WEB3FORMS_ACCESS_KEY = 'd2e3a958-efc9-41e6-abfc-ceb3e8a498e7';

// Web3Forms hCaptcha site key for free plans
const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

export default function Contact() {
  const ref = useRef(null);
  const captchaRef = useRef<HCaptcha>(null);
  const inView = useInView(ref, viewportOnce);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onHCaptchaChange = (token: string) => {
    setCaptchaToken(token);
    setSubmitError('');
  };

  const resetCaptcha = () => {
    setCaptchaToken('');
    captchaRef.current?.resetCaptcha();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    if (!captchaToken) {
      setSubmitError('Please complete the captcha verification.');
      setSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set('access_key', WEB3FORMS_ACCESS_KEY);
    formData.set('subject', 'New quote request from Aernova website');
    formData.set('h-captcha-response', captchaToken);

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
      resetCaptcha();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );

      resetCaptcha();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-32 px-8 lg:px-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-orange/4 blur-[120px]" />
      </div>

      <div className="relative z-10" ref={ref}>
        <motion.div
          variants={sectionReveal}
          initial={false}
          animate="visible"
          className="mb-20"
        >
          <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
            Get in Touch
          </span>

          <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] text-snow tracking-wide leading-none">
            REQUEST A<br />QUOTE
          </h2>

          <p className="font-body font-light text-frost/64 text-base mt-4 max-w-lg leading-relaxed">
            Tell us about your project and we'll get back to you within one business day with
            a tailored proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            variants={staggerGroup}
            initial={false}
            animate="visible"
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'sales@aernova.ca',
                href: 'mailto:sales@aernova.ca',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+1 (647) 710-8581',
                href: 'tel:+16477108581',
              },
              {
                icon: MapPin,
                label: 'Serving',
                value: 'Greater Toronto Area & Ottawa, ON',
                href: null,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div key={item.label} variants={cardReveal} className="flex items-start gap-4">
                  <div className="w-11 h-11 border border-edge bg-panel flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-cyan" />
                  </div>

                  <div>
                    <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                      {item.label}
                    </span>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-frost hover:text-cyan transition-colors text-sm min-h-11 inline-flex items-center"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-body text-frost text-sm">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <motion.div variants={cardReveal} className="mt-4 pt-8 border-t border-edge">
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-3">
                Connect
              </span>

              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/aernova-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-cyan border border-cyan/30 px-4 py-3 min-h-11 inline-flex items-center hover:bg-cyan/10 transition-colors"
                >
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/aernova.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-cyan border border-cyan/30 px-4 py-3 min-h-11 inline-flex items-center hover:bg-cyan/10 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial={false}
            animate="visible"
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[340px] flex flex-col items-center justify-center gap-5 border border-cyan/30 industrial-panel p-12 text-center"
                role="status"
              >
                <CheckCircle size={40} className="text-cyan" />

                <h3 className="font-display text-3xl text-snow tracking-wide">
                  MESSAGE SENT
                </h3>

                <p className="font-body font-light text-frost/60 text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out! We'll respond within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-edge industrial-panel p-5 sm:p-7 corner-markers">
                {[
                  {
                    name: 'name',
                    label: 'Your Name',
                    type: 'text',
                    placeholder: 'Jane Smith',
                    colSpan: 1,
                  },
                  {
                    name: 'company',
                    label: 'Company',
                    type: 'text',
                    placeholder: 'ABC Contracting',
                    colSpan: 1,
                  },
                  {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'jane@company.com',
                    colSpan: 1,
                  },
                  {
                    name: 'phone',
                    label: 'Phone (optional)',
                    type: 'tel',
                    placeholder: '+1 (416) 000-0000',
                    colSpan: 1,
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
                  >
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
                      className="w-full bg-ink/55 border border-edge text-frost font-body text-sm px-4 py-3 min-h-11 focus:border-cyan/60 transition-colors placeholder:text-smoke/40"
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
                    className="w-full bg-ink/55 border border-edge text-frost font-body text-sm px-4 py-3 focus:border-cyan/60 transition-colors resize-none placeholder:text-smoke/40"
                  />
                </div>

                <div className="sm:col-span-2 overflow-hidden">
                  <input
                    type="hidden"
                    name="h-captcha-response"
                    value={captchaToken}
                    readOnly
                  />

                  <HCaptcha
                    ref={captchaRef}
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={onHCaptchaChange}
                    onExpire={() => {
                      setCaptchaToken('');
                      setSubmitError('Captcha expired. Please verify again.');
                    }}
                    onError={() => {
                      setCaptchaToken('');
                      setSubmitError('Captcha could not load. Please refresh and try again.');
                    }}
                    reCaptchaCompat={false}
                    theme="dark"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-mono-dm text-[0.78rem] tracking-widest uppercase text-ink bg-cyan px-10 py-4 min-h-11 hover:bg-[#33ddff] transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    {submitting ? 'Sending...' : 'Send Request'}
                  </button>

                  {submitError && (
                    <p className="font-body text-sm text-orange mt-4" role="alert" aria-live="polite">
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
