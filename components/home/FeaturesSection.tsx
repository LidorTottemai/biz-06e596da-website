'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Paintbrush,
  Music2,
  Drama,
  Leaf,
  Users,
  Star,
  Cake,
  Layers,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  painting: Paintbrush,
  dance: Drama,
  music: Music2,
  ceramics: Layers,
  theater: Star,
  youth: Users,
  seniors: Leaf,
  events: Cake,
} as const;

const colorMap = {
  painting: 'text-brand-amber-500 bg-brand-amber-50',
  dance: 'text-brand-purple-500 bg-brand-purple-50',
  music: 'text-brand-teal-500 bg-brand-teal-50',
  ceramics: 'text-orange-500 bg-orange-50',
  theater: 'text-brand-blue-500 bg-brand-blue-50',
  youth: 'text-green-600 bg-green-50',
  seniors: 'text-rose-500 bg-rose-50',
  events: 'text-pink-500 bg-pink-50',
} as const;

const activities = Object.keys(iconMap) as (keyof typeof iconMap)[];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function FeaturesSection() {
  const t = useTranslations('features');

  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container-responsive">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge variant="default" className="mb-4">
            {t('title')}
          </Badge>
          <h2 className="heading-lg text-gray-900 mb-4">{t('subtitle')}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Activities grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activities.map((key) => {
            const Icon = iconMap[key];
            const colors = colorMap[key];
            return (
              <motion.div key={key} variants={cardVariants}>
                <Card className="h-full card-hover border-gray-100 hover:border-brand-blue-200">
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-base">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(t as any)(`items.${key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="px-6 pb-6">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(t as any)(`items.${key}.description`)}
                  </CardDescription>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Community link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm">
            למידע נוסף על פעילות המרכז בקרו באתר המרכזים הקהילתיים הרצליה{' '}
            <a
              href="http://www.herzliyacc.org.il"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue-500 hover:underline font-medium"
            >
              קרא עוד »
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
