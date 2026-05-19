import type { Metadata } from 'next';

import { ThemeProvider } from '../components/ThemeProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'modelicons — 300+ AI model brand icons for the web',
  description:
    'A zero-dependency icon library covering 300+ AI / LLM / image-gen / video-gen / agent brands. Available for React, Vue, and as raw SVG. ~5 KB per icon tree-shaken.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
