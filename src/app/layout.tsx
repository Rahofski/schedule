import { QueryProvider } from '@/components/ui/QueryProvider/QueryProvider';
import { Toaster } from '@/components/ui/Toaster/Toaster';
// import { inter, montserrat } from '@/styles/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Школьное расписание',
    template: `%s | ${process.env.NEXT_PUBLIC_SERVICE_TITLE}`,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
