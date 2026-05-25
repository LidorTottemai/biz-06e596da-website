import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/booking/BookingForm';
import { Badge } from '@/components/ui/badge';
import { siteUrl } from '@/lib/config';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteUrl}/${locale}/booking`,
      languages: {
        he: `${siteUrl}/he/booking`,
        en: `${siteUrl}/en/booking`,
      },
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      url: `${siteUrl}/${locale}/booking`,
    },
    twitter: {
      card: 'summary',
      title: t('pageTitle'),
      description: t('pageDescription'),
    },
  };
}

export default async function BookingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'booking' });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Page header */}
        <section className="gradient-hero py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -start-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-10 -end-10 w-48 h-48 bg-white/5 rounded-full" />
          </div>
          <div className="container-responsive relative z-10 text-center">
            <Badge variant="white" className="mb-4">
              {t('title')}
            </Badge>
            <h1 className="heading-lg text-white mb-3">{t('title')}</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        {/* Form section */}
        <section className="container-responsive py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
              <p className="text-gray-500 text-sm mb-8 text-center">{t('description')}</p>
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
