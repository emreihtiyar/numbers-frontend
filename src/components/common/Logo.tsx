import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Logo() {
  return (
    <Link href="/" className={`${roboto.className} text-2xl font-bold`}>
      Numbers
    </Link>
  );
} 