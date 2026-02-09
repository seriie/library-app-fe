import { FaSignOutAlt, FaBook, FaBookmark, FaUser, FaCog } from "react-icons/fa";

export default function Aside({ user, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
    const menuItems = [
        { icon: FaBook, label: "LIBRARY", id: "LIBRARY" },
        { icon: FaBookmark, label: "MY LOANS", id: "MY LOANS" },
        { icon: FaUser, label: "PROFILE", id: "PROFILE" },
        { icon: FaCog, label: "SETTINGS", id: "SETTINGS" },
    ];

    const handleLogout = async (id) => {
        localStorage.removeItem("token");
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/sessions/${id}`
            );
        } catch (e) {
            console.error(e);
        } finally {
            window.location.reload();
        }
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static shadow-2xl ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="h-full flex flex-col">
                <div className="h-24 flex items-center px-8 border-b border-gray-800">
                    <h1 className="text-3xl font-black tracking-tighter italic">
                        ATLAS<span className="text-gray-500">_</span>LIB
                    </h1>
                </div>

                <nav className="flex-1 px-6 py-8 space-y-3">
                    {menuItems.map((item, index) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`flex cursor-pointer items-center w-full px-6 py-4 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-white text-gray-900 shadow-lg shadow-white/10 font-bold"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                <item.icon
                                    className={`mr-4 text-xl ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-500 group-hover:text-white"
                                        }`}
                                />
                                <span className="tracking-wide text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-800">
                    <div className="flex items-center gap-4 mb-6 px-4">
                        <div className="h-10 w-10 rounded-lg bg-gray-700 flex items-center justify-center font-bold text-white border border-gray-600">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-sm">{user.name}</p>
                            <p className="text-xs text-gray-400 capitalize">
                                {user.role.toLowerCase()}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleLogout(user.id)}
                        className="flex cursor-pointer items-center justify-center w-full px-4 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all font-bold text-sm tracking-wide border border-red-600/20 hover:border-red-600"
                    >
                        <FaSignOutAlt className="mr-2" />
                        LOGOUT
                    </button>
                </div>
            </div>
        </aside>
    );
}