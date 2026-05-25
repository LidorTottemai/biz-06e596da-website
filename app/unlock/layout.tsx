import '@/app/globals.css';

export const metadata = {
  title: 'כניסה לאתר | מרכז קהילתי יבור',
};

export default function UnlockLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 flex items-center justify-center p-4 antialiased">
        {children}
      </body>
    </html>
  );
}
