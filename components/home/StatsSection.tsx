'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

const stats = [
  { key: 'years', Icon: Award, valueKey: 'yearsValue', color: 'text-brand-amber-400' },
  { key: 'students', Icon: Users, valueKey: 'studentsValue', color: 'text-brand-teal-400' },
  { key: 'courses', Icon: BookOpen, valueKey: 'coursesValue', color: 'text-brand-purple-300' },
  { key: 'community', Icon: Heart, valueKey: 'communityValue', color: 'text-rose-300' },
] as const;

export default function StatsSection() {
  const t = useTranslations('stats');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-20 gradient-hero relative overflow-hidden" id="stats">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-brand-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-responsive relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg text-white">{t('title')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map(({ key, Icon, valueKey, color }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
                <Icon className={`h-7 w-7 ${color}`} />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className={`text-4xl md:text-5xl font-bold ${color} mb-2`}
              >
                {t(valueKey)}
              </motion.p>
              <p className="text-white/70 text-sm md:text-base font-medium">
                {t(key)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 text-white/60 text-sm italic"
        >
          חיים רק פעם אחת
        </motion.p>
      </div>
    </section>
  );
}
