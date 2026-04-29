import React from "react";
import Navbar from "../component/navebar.jsx";
import Sidebar from "../component/sideBar.jsx";

/**
 * NexusLayout
 * Wraps any page with the Navbar + Sidebar.
 *
 * Usage:
 *   <NexusLayout user={currentUser}>
 *     <YourPageContent />
 *   </NexusLayout>
 *
 * Props:
 *   user   – { name, username, avatar? }  (passed to both Navbar & Sidebar)
 *   children – page content
 */
const NexusLayout = ({ user, children }) => {
  return (
    <>
      {/* Global styles */}
      <style>{`
        body {
          margin: 0;
          background: #0a0814;
          color: #e5e7eb;
        }
      `}</style>

      <Navbar user={user} />
      <Sidebar user={user} />
      <main className="ml-[240px] mt-[64px] min-h-screen px-8 py-6 box-border md:ml-0 md:px-4 md:py-4">
        {children}
      </main>
    </>
  );
};

export default NexusLayout;