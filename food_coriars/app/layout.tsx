import './globals.css';
import { Outfit } from 'next/font/google';
import Providers from './providers';
import { ToastContainer } from 'react-toastify';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Foodie | Order Fresh Food',
  description: 'Best food delivery app',

  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50 text-gray-900`}>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}