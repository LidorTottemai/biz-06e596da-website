'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/components/ui/cn';
import { getWhatsAppUrl } from '@/lib/config';

type FormData = {
  name: string;
  phone: string;
  email: string;
  activity: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const activities = [
  'painting',
  'dance',
  'music',
  'ceramics',
  'theater',
  'yoga',
  'youth',
  'seniors',
  'events',
  'other',
] as const;

const times = ['morning', 'noon', 'afternoon', 'evening'] as const;

export default function BookingForm() {
  const t = useTranslations('booking');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tAny = t as any;
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const activityValue = watch('activity');

  const onSubmit = (data: FormData) => {
    const activityLabel = data.activity
      ? tAny(`form.activities.${data.activity}`)
      : '';

    const lines = [
      t('whatsappIntro'),
      '',
      `*שם:* ${data.name}`,
      `*טלפון:* ${data.phone}`,
      data.email ? `*דוא"ל:* ${data.email}` : '',
      activityLabel ? `*חוג:* ${activityLabel}` : '',
      data.preferredDate ? `*תאריך מועדף:* ${data.preferredDate}` : '',
      data.preferredTime
        ? `*שעה מועדפת:* ${tAny(`form.times.${data.preferredTime}`)}`
        : '',
      data.message ? `*הערות:* ${data.message}` : '',
    ].filter(Boolean);

    const message = lines.join('\n');
    const url = getWhatsAppUrl(message);

    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{t('success')}</h3>
        <p className="text-gray-500 text-sm max-w-sm">{t('note')}</p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2"
        >
          הגשת רישום נוסף
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          {t('form.name')}{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </Label>
        <Input
          id="name"
          placeholder={t('form.namePlaceholder')}
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name', { required: t('form.required') })}
          className={cn(errors.name && 'border-red-400 focus:ring-red-400')}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">
          {t('form.phone')}{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder={t('form.phonePlaceholder')}
          autoComplete="tel"
          dir="ltr"
          aria-invalid={!!errors.phone}
          {...register('phone', {
            required: t('form.required'),
            pattern: {
              value: /^[0-9+\-\s()]{7,15}$/,
              message: 'מספר טלפון לא תקין',
            },
          })}
          className={cn(errors.phone && 'border-red-400 focus:ring-red-400')}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t('form.email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t('form.emailPlaceholder')}
          autoComplete="email"
          dir="ltr"
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'כתובת דוא"ל לא תקינה',
            },
          })}
          className={cn(errors.email && 'border-red-400 focus:ring-red-400')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Activity */}
      <div className="space-y-2">
        <Label htmlFor="activity">
          {t('form.activity')}{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </Label>
        <select
          id="activity"
          aria-invalid={!!errors.activity}
          {...register('activity', { required: t('form.required') })}
          className={cn(
            'flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent',
            'transition-colors duration-200 cursor-pointer',
            errors.activity && 'border-red-400 focus:ring-red-400',
            !activityValue && 'text-gray-400'
          )}
        >
          <option value="" disabled>
            {t('form.activityPlaceholder')}
          </option>
          {activities.map((act) => (
            <option key={act} value={act}>
              {tAny(`form.activities.${act}`)}
            </option>
          ))}
        </select>
        {errors.activity && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {errors.activity.message}
          </p>
        )}
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">{t('form.preferredDate')}</Label>
          <Input
            id="preferredDate"
            type="date"
            dir="ltr"
            min={new Date().toISOString().split('T')[0]}
            {...register('preferredDate')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">{t('form.preferredTime')}</Label>
          <select
            id="preferredTime"
            {...register('preferredTime')}
            className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-colors duration-200 cursor-pointer"
          >
            <option value="">בחרו שעה</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {tAny(`form.times.${time}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">{t('form.message')}</Label>
        <Textarea
          id="message"
          placeholder={t('form.messagePlaceholder')}
          rows={3}
          {...register('message')}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        variant="whatsapp"
        disabled={isSubmitting}
        className="w-full gap-2 mt-2"
      >
        <MessageCircle className="h-5 w-5" />
        {isSubmitting ? t('form.sending') : t('form.submit')}
      </Button>

      <p className="text-center text-xs text-gray-400 mt-2">{t('note')}</p>
    </form>
  );
}
