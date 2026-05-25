import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { siteUrl, phone, fax, email, address, getWhatsAppUrl, getPhoneUrl } from '@/lib/config';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        he: `${siteUrl}/he/contact`,
        en: `${siteUrl}/en/contact`,
      },
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      url: `${siteUrl}/${locale}/contact`,
    },
    twitter: {
      card: 'summary',
      title: t('pageTitle'),
      description: t('pageDescription'),
    },
  };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const contactItems = [
    {
      icon: Phone,
      label: t('phone'),
      value: t('phoneValue'),
      href: getPhoneUrl(),
      color: 'text-brand-blue-500 bg-brand-blue-50',
    },
    {
      icon: Phone,
      label: t('fax'),
      value: t('faxValue'),
      href: null,
      color: 'text-gray-500 bg-gray-50',
    },
    {
      icon: Mail,
      label: t('email'),
      value: t('emailValue'),
      href: `mailto:${email}`,
      color: 'text-brand-purple-500 bg-brand-purple-50',
    },
    {
      icon: MapPin,
      label: t('address'),
      value: t('addressValue'),
      href: `https://maps.google.com/?q=${encodeURIComponent(address + ', הרצליה')}`,
      color: 'text-brand-teal-500 bg-brand-teal-50',
    },
  ] as const;

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

        {/* Content */}
        <section className="container-responsive py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="heading-md text-gray-900 mb-6">{t('description')}</h2>

                <ul className="space-y-5">
                  {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-4 group"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                            <p className="text-gray-700 font-medium group-hover:text-brand-blue-500 transition-colors">
                              {value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                            <p className="text-gray-700 font-medium">{value}</p>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                {/* WhatsApp CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3 px-6 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors btn-touch"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t('sendWhatsapp')}
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-amber-50 text-brand-amber-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{t('hours')}</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">ראשון - חמישי</span>
                    <span className="font-medium text-gray-700">08:00 - 20:00</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">שישי</span>
                    <span className="font-medium text-gray-700">08:00 - 13:00</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-500">שבת</span>
                    <span className="font-medium text-red-500">סגור</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Map embed */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">{t('mapTitle')}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t('addressValue')}</p>
                </div>
                <div className="h-72 sm:h-96 bg-gray-100 relative">
                  <iframe
                    title={t('mapTitle')}
                    src="https://maps.google.com/maps?q=בן+סרוק+12+הרצליה&output=embed&z=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(address + ', הרצליה')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue-500 hover:underline text-sm font-medium flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" />
                    פתחו ב-Google Maps
                  </a>
                </div>
              </div>

              {/* Community network link */}
              <div className="bg-brand-blue-50 rounded-2xl border border-brand-blue-100 p-6">
                <h3 className="font-semibold text-brand-blue-700 mb-2">
                  רשת המרכזים הקהילתיים הרצליה
                </h3>
                <p className="text-sm text-brand-blue-600 mb-4 leading-relaxed">
                  למידע נוסף על פעילות המרכז בקרו באתר המרכזים הקהילתיים הרצליה
                </p>
                <a
                  href="http://www.herzliyacc.org.il"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-blue-500 hover:text-brand-blue-700 font-semibold text-sm transition-colors"
                >
                  קרא עוד »
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
