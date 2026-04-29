import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Icon Components ────────────────────────────────────────────────────────
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// ─── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = ({ user = { name: "John Doe", username: "johndoe", avatar: null } }) => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifCount] = useState(3);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 bg-black bg-opacity-85 backdrop-blur-lg border-b border-purple-200 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate("/dashboard")}>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-lg">
          <BoltIcon />
        </div>
        <span className="text-white text-lg font-extrabold tracking-tight">Nexus</span>
      </div>

      {/* Search */}
      <div className={`relative flex-1 max-w-lg mx-auto ${searchFocused ? "focus-within:text-purple-400" : ""}`}>
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors">
          <SearchIcon />
        </span>
        <input
          className="w-full h-9 bg-opacity-5 border border-opacity-8 rounded-xl pl-10 pr-4 text-gray-300 font-medium focus:bg-purple-50 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-200"
          placeholder="Search for people, posts, reels..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notifications */}
        <div className="relative w-9 h-9 rounded-xl border border-opacity-7 bg-opacity-4 text-gray-400 flex items-center justify-center cursor-pointer transition-all hover:bg-purple-100 hover:border-purple-300 hover:text-purple-400" title="Notifications" onClick={() => navigate("/notifications")}>
          <BellIcon />
          {notifCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-purple-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-black">{notifCount}</span>}
        </div>

        {/* Messages */}
        <div className="relative w-9 h-9 rounded-xl border border-opacity-7 bg-opacity-4 text-gray-400 flex items-center justify-center cursor-pointer transition-all hover:bg-purple-100 hover:border-purple-300 hover:text-purple-400" title="Messages" onClick={() => navigate("/messages")}>
          <MessageIcon />
        </div>

        {/* Create Post */}
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white font-semibold text-sm border-none cursor-pointer transition-all hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-600 shadow-lg">
          <PlusIcon />
          Create Post
        </button>

        {/* Avatar / dropdown */}
        <div className="relative">
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border border-opacity-7 bg-opacity-4 cursor-pointer transition-all hover:bg-purple-100 hover:border-purple-300 ${dropdownOpen ? "bg-purple-200" : ""}`} onClick={() => setDropdownOpen(o => !o)}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden flex-shrink-0">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.name[0].toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-gray-300">{user.name.split(" ")[0]}</span>
            <span className="text-gray-400 transition-transform duration-200 transform">
              <ChevronDown />
            </span>
          </div>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-purple-300 rounded-lg py-2 px-3 shadow-xl z-10 animate__animated animate__fadeIn">
              <div className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-purple-100 hover:text-white cursor-pointer transition-all">
                👤 Profile
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-purple-100 hover:text-white cursor-pointer transition-all">
                🔖 Bookmarks
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-purple-100 hover:text-white cursor-pointer transition-all">
                ⚙️ Settings
              </div>
              <div className="h-px bg-opacity-10 bg-gray-700 my-2" />
              <div className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600 cursor-pointer transition-all">
                🚪 Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;