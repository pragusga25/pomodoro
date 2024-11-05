import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import OgImage from '../public/banner.jpeg';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://pomodoro.pragusga.com'),
  title: 'Pomodoro Focus - Stay Productive',
  description:
    'Boost your productivity with this elegant Pomodoro timer featuring task management and progress analytics.',
  keywords: [
    'Pomodoro',
    'Focus Timer',
    'Productivity App',
    'Task Management',
    'Analytics',
    'Pomodoro Timer',
  ],
  openGraph: {
    title: 'Pomodoro Focus - Stay Productive',
    description:
      'Boost your productivity with this elegant Pomodoro timer featuring task management and progress analytics.',
    url: 'https://pomodoro.pragusga.com',
    type: 'website',
    images: [
      {
        url: OgImage.src,
        width: 1200,
        height: 630,
        alt: 'Pomodoro Focus App Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomodoro Focus - Stay Productive',
    description:
      'A Pomodoro timer with task tracking and analytics to keep you focused and productive.',
    images: [
      {
        url: OgImage.src,
        width: 1200,
        height: 630,
        alt: 'Pomodoro Focus App Preview',
      },
    ],
    creator: '@pragusga',
    site: 'https://pragusga.com',
  },
  viewport: 'width=device-width, initial-scale=1',
  category: 'Productivity',
  applicationName: 'Pomodoro Focus',
  themeColor: '#ffffff',
  abstract: 'A Pomodoro timer with task tracking and analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
