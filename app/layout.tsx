import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/function/Navbar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/function/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QueryProvider from '@/components/function/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'tasx',
  description: 'Task management for students',
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dark = false;

  return (
    <html lang="w-screen h-screen">
      <body
        className={cn(
          inter.className,
          'w-screen h-screen bg-background  text-foreground'
        )}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {/* navbar */}
            <Navbar />

            {/* <Sidebar /> */}
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
