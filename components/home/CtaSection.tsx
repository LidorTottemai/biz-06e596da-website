'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl, getPhoneUrl, phone } from '@/lib/config';

export default function CtaSection() {
  const t = useTranslations('cta');

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl gradient-brand p-8 md:p-16 text-center"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -end-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -start-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-lg text-white mb-4"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 mb-4 font-medium"
            >
              {t('subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/70 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/booking">
                <Button size="xl" variant="white" className="w-full sm:w-auto shadow-xl">
                  {t('ctaPrimary')}
                </Button>
              </Link>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  variant="whatsapp"
                  className="w-full sm:w-auto gap-2 shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('ctaWhatsapp')}
                </Button>
              </a>

              <a href={getPhoneUrl()}>
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5" />
                  {phone}
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
