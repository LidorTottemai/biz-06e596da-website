'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function UnlockPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/he');
        router.refresh();
      } else {
        setError('סיסמה שגויה. נסו שנית.');
        setPassword('');
      }
    } catch {
      setError('אירעה שגיאה. נסו שנית.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #0F2D52 0%, #1B4F8A 40%, #2D3B8C 70%, #4A2575 100%)',
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">מרכז קהילתי יבור</h1>
          <p className="text-white/70 text-sm mt-1">כניסה לאתר</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <p className="text-gray-500 text-sm text-center mb-6">
            אתר זה מוגן. הזינו את הסיסמה כדי להמשיך.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                סיסמה
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="הזינו את הסיסמה"
                  autoFocus
                  autoComplete="current-password"
                  required
                  className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm pe-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? 'בודק...' : 'כניסה'}
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-white/30 text-xs mt-6">
        © {new Date().getFullYear()} מרכז קהילתי יבור
      </p>
    </div>
  );
}
