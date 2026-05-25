'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/cn';
import { getPhoneUrl } from '@/lib/config';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/#about' },
  { key: 'news', href: '/#news' },
  { key: 'gallery', href: '/#gallery' },
  { key: 'booking', href: '/booking' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const otherLocale = locale === 'he' ? 'en' : 'he';

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container-responsive">
        <div className="flex h-16 md:h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span
              className={cn(
                'font-bold text-lg leading-tight transition-colors',
                scrolled ? 'text-brand-blue-500' : 'text-white'
              )}
            >
              מרכז יבור
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors btn-touch flex items-center',
                    scrolled
                      ? 'text-gray-700 hover:text-brand-blue-500 hover:bg-brand-blue-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10',
                    pathname === href && scrolled && 'text-brand-blue-500 bg-brand-blue-50',
                    pathname === href && !scrolled && 'text-white bg-white/20'
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* Phone link */}
            <a
              href={getPhoneUrl()}
              className={cn(
                'hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors btn-touch',
                scrolled
                  ? 'text-gray-700 hover:text-brand-blue-500 hover:bg-brand-blue-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
              aria-label="טלפון"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">09-9543574</span>
            </a>

            {/* Language switcher */}
            <Link
              href={pathname}
              locale={otherLocale}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-semibold transition-colors btn-touch',
                scrolled
                  ? 'text-brand-blue-500 border border-brand-blue-200 hover:bg-brand-blue-50'
                  : 'text-white border border-white/30 hover:bg-white/10'
              )}
            >
              {t('switchLang')}
            </Link>

            {/* Booking CTA */}
            <Link href="/booking" className="hidden md:block">
              <Button
                size="sm"
                className={cn(
                  scrolled
                    ? ''
                    : 'bg-brand-amber-500 hover:bg-brand-amber-600 text-white border-0'
                )}
              >
                {t('booking')}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors btn-touch',
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 bg-white rounded-b-2xl shadow-lg border-t border-gray-100 mx-0">
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-blue-500 hover:bg-brand-blue-50 transition-colors btn-touch"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-100 mt-2">
                <Link href="/booking">
                  <Button className="w-full" size="default">
                    {t('booking')}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
