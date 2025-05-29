// modules/layouts/layout.tsx
"use client";

import React from 'react';
import Aside from '../components/aside.component';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayout } from '../hooks/useLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const { title, route } = useLayout(pathname);

  return (
    <main className='bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 min-h-screen font-sans'>
      <Aside />
      <section className="max-w-5xl mx-auto mt-16 p-10 bg-white shadow-2xl rounded-3xl border border-gray-200 transition-all">
        <header className='mb-10'>
          <nav className='flex flex-wrap gap-6 mb-6'>
            {route.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className={`text-base font-semibold transition duration-200 px-2 py-1 rounded-lg ${
                  pathname === r.path
                    ? "bg-yellow-400"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {r.name}
              </Link>
            ))}
          </nav>
          <div className='space-y-1'>
            <h1 className='text-4xl font-bold text-gray-900'>{title}</h1>
            <p className='text-gray-500 text-sm'>Sección actual: {title}</p>
          </div>
        </header>

        <div className='space-y-6'>{children}</div>
      </section>
    </main>
  );
}



