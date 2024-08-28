import React from 'react';
import { ModeToggle } from '../mode-toggle';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 dark:bg-[url('/LooperGroup2.png')] dark:bg-no-repeat dark:bg-cover" />
      <div className="relative mx-auto max-w-7xl py-12 px-4 md:px-8 lg:px-12">
        <h1 className="lg:text-3xl text-2xl text-center pb-8 font-bold">
          OBS Frontend Assignment - Naza Zulfiqi
        </h1>
        <ModeToggle />
        {children}
      </div>
    </main>
  );
};

export default Layout;
