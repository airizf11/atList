// alis1f/src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-4">
          <Link
            href="/about"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Terms of Service
          </Link>
        </nav>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {currentYear} atList. All rights reserved.
        </p>
        {/* Bisa tambahkan ikon sosial media atau info lain di sini */}
      </div>
    </footer>
  );
}
