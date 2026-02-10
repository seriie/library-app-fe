import { useState } from "react";
import {
  FiMenu,
  FiBook,
  FiUsers,
  FiClipboard,
  FiHome,
} from "react-icons/fi";
import { FaRegFileLines } from "react-icons/fa6";

import General from "./tabs/General";
import BooksTab from "./tabs/BooksTab";
import UserManagement from "./tabs/UsersManagement";

const tabs = [
  { key: "general", label: "General", icon: <FiHome /> },
  { key: "loans", label: "Loans", icon: <FiClipboard /> },
  { key: "books", label: "Books", icon: <FiBook /> },
  { key: "users", label: "Users", icon: <FiUsers /> },
  { key: "logs", label: "Logs", icon: <FaRegFileLines /> }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`bg-indigo-950 text-indigo-100 transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"} flex flex-col`}
      >
        <div className="flex min-h-14 items-center justify-between px-4 py-4 border-b border-indigo-800">
          {!collapsed && (
            <h1 className="font-semibold text-md tracking-wide">
              Admin<span className="text-yellow-400">Panel</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-indigo-200 cursor-pointer hover:text-white"
          >
            <FiMenu />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm transition
              ${
                activeTab === tab.key
                  ? "bg-indigo-800 text-white"
                  : "hover:bg-indigo-900"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {!collapsed && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 capitalize">
            {activeTab}
          </h2>
          <p className="text-slate-500 text-sm">
            Manage {activeTab} section bimbimbam
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {activeTab === "general" && (
            <p className="text-slate-700">
              <General />
            </p>
          )}

          {activeTab === "loans" && (
            <p className="text-slate-700">
              📄 Data peminjaman buku (loans) blehblehbleh.
            </p>
          )}

          {activeTab === "books" && (
            <p className="text-slate-700">
              <BooksTab />
            </p>
          )}

          {activeTab === "users" && (
            <p className="text-slate-700">
              
              <UserManagement />
            </p>
          )}

          {activeTab === "logs" && (
            <p className="text-slate-700">
              📄 Activity logs blaababala.
            </p>
          )}
        </div>
      </main>
    </>
  );
}