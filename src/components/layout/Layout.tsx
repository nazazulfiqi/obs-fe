import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl text-center pb-8 font-bold">
          OBS Frontend Assignment
        </h1>
        {children}
      </div>
    </main>
  );
};

export default Layout;
