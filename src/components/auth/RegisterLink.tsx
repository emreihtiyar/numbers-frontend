import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';

export default function RegisterLink() {
  return (
    <Link
      href="/register"
      className="flex items-center gap-2 hover:text-gray-600 transition-colors"
    >
      <UserCircle2 className="w-5 h-5" />
      <span>Kayıt Ol</span>
    </Link>
  );
} 