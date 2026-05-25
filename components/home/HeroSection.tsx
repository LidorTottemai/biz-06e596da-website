'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getWhatsAppUrl } from '@/lib/config';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -start-32 w-96 h-96 bg-brand-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -end-48 w-[600px] h-[600px] bg-brand-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 start-1/4 w-80 h-80 bg-brand-amber-500/15 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-responsive relative z-10 py-24 pt-32">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Badge variant="white" className="mb-6 text-sm px-4 py-1.5">
              {t('badge')}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="heading-xl text-white mb-4"
          >
            {t('title')}{' '}
            <span className="text-gradient">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl text-white/80 font-medium mb-6"
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-2xl"
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4"
          >
            <Link href="/booking">
              <Button
                size="xl"
                variant="amber"
                className="w-full xs:w-auto shadow-xl hover:shadow-2xl"
              >
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
                variant="white"
                className="w-full xs:w-auto gap-2"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                {t('ctaWhatsapp')}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 inset-x-0 flex justify-center"
      >
        <button
          type="button"
          onClick={() =>
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
          aria-label={t('scrollDown')}
        >
          <span className="text-xs">{t('scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64L60 58.7C120 53.3 240 42.7 360 42.7C480 42.7 600 53.3 720 56C840 58.7 960 53.3 1080 48C1200 42.7 1320 37.3 1380 34.7L1440 32V64H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
