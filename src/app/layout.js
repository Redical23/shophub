import { Inter } from 'next/font/google';
import './globals.css';
import { metadata } from './metadata';
import Sessionwarpper from './componets/Sessionwarpper';
import Contentwapper from './context/Contentwapper';
import ClientRootLayout from './layout.client'; // 👈 Import the client layout

export { metadata }; // ✅ Enable metadata for this layout

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-w-fit">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tuffy:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Sessionwarpper>
          <Contentwapper>
            <ClientRootLayout>{children}</ClientRootLayout>
          </Contentwapper>
        </Sessionwarpper>
      </body>
    </html>
  );
}
