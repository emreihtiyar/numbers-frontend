import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LoginLink() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 hover:text-gray-600 transition-colors"
    >
      <LogIn className="w-5 h-5" />
      <span>Giriş Yap</span>
    </Link>
  );
} 