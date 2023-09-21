import React from "react";
import Head from "next/head";
import { Footer, Navbar } from ".";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Rof1yev - Shopping</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
